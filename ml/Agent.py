from PyPDF2 import PdfReader
from groq import Groq
from dotenv import load_dotenv
import os
from langgraph.graph import START, StateGraph, MessagesState
from langgraph.prebuilt import tools_condition
from langgraph.prebuilt import ToolNode
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint, HuggingFaceEmbeddings
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.document_loaders import WikipediaLoader
from langchain_community.document_loaders import ArxivLoader
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.tools import tool
from supabase.client import Client, create_client
from datetime import datetime

load_dotenv() 

# Variables for PDF resume and vacancy details
uploaded_file = ""
text = ""
resumeText = ""
vacancy = ""
conversation_history = []
dashboardData=""
system_prompt= ""
messages=[]
graph=None
sys_msg = None
startTime = None
endTime = None

client=Groq(api_key=os.getenv('GROQ_API_KEY'))

@tool
def wiki_search(query: str) -> str:
    """Search Wikipedia for a query and return maximum 1 results.
    
    Args:
        query: The search query."""
    search_docs = WikipediaLoader(query=query, load_max_docs=1).load()
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document source="{doc.metadata["source"]}" page="{doc.metadata.get("page", "")}"/>\n{doc.page_content}\n</Document>'
            for doc in search_docs
        ])
    return {"wiki_results": formatted_search_docs}

@tool
def web_search(query: str) -> str:
    """Search Tavily for a query and return maximum 3 results.
    
    Args:
        query: The search query."""
    search_docs = TavilySearchResults(max_results=3).invoke(input=query)
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document source="{doc["url"]}" title="{doc["title"]}"/>\n{doc["content"]}\n</Document>'
            for doc in search_docs
        ])
    return {"web_results": formatted_search_docs}

@tool
def arxiv_search(query: str) -> str:
    """Search Arxiv for a query and return maximum 3 result.
    
    Args:
        query: The search query."""
    search_docs = ArxivLoader(query=query, load_max_docs=3).load()
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document source="{doc.metadata.get("entry_id") or doc.metadata.get("arxiv_id") or doc.metadata.get("url") or ""}"/>\n{doc.page_content[:1000]}\n</Document>'
            for doc in search_docs
        ])
    return {"arvix_results": formatted_search_docs}


@tool
def resume_get() -> str:
    """Retrieve the candidate’s resume when you need to reference their background.
    Args:
        None
    """
    global resumeText
    return {"resume": resumeText }

@tool
def exit_tool() -> str:
    """End the interview immediately when the candidate uses inappropriate language or consistently provides non-serious responses.

    Args:
        None
    """
    return {"exit": "Exiting the program."}

# build a retriever
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2") #  dim=768
supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"), 
    os.environ.get("SUPABASE_SERVICE_KEY"))
vector_store = SupabaseVectorStore(
    client=supabase,
    embedding= embeddings,
    table_name="documents",
    query_name="match_documents",
)


tools = [
    wiki_search,
    web_search,
    arxiv_search,
    resume_get,
    exit_tool
]

# Build graph function
def build_graph(provider: str = "groq"):
    if provider == "google":
        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0)
    elif provider == "groq":
        llm = ChatGroq(model="gemma2-9b-it", temperature=0) 
    elif provider == "huggingface":
        llm = ChatHuggingFace(
            llm=HuggingFaceEndpoint(
                url="https://api-inference.huggingface.co/models/Meta-DeepLearning/llama-2-7b-chat-hf",
                temperature=0,
            ),
        )
    else:
        raise ValueError("Invalid provider. Choose 'google', 'groq' or 'huggingface'.")
    llm_with_tools = llm.bind_tools(tools)

    def initializer(state: MessagesState):
        msgs = state["messages"]
        if len(msgs)==1:
            return {"messages": [sys_msg]}
        return {"messages": msgs}

    def retriever(state: MessagesState):
        """Retriever node"""
        last_message = state["messages"][-1].content
        similar_question = vector_store.similarity_search_with_relevance_scores(last_message)
        if similar_question and similar_question[0][1]>0.8:
            example_msg = HumanMessage(
                content=f"[Helper] You can ask the interviewee about \n\n{similar_question[0][0].page_content}"
            )
            return {"messages": state["messages"] + [example_msg]}
        else:
            return {"messages": state["messages"]}
    
    def assistant(state: MessagesState):
        """Assistant node"""
        return {"messages": [llm_with_tools.invoke(state["messages"])]}
    

    builder = StateGraph(MessagesState)
    # Nodes
    builder.add_node("initializer", initializer)
    builder.add_node("retriever", retriever)
    builder.add_node("assistant", assistant)
    builder.add_node("tools", ToolNode(tools))

    # Edges
    builder.add_edge(START, "initializer")
    builder.add_edge("initializer", "retriever")
    builder.add_edge("retriever", "assistant")
    builder.add_conditional_edges(
        "assistant",
        tools_condition,
    )
    builder.add_edge("tools", "assistant")

    # Compile graph
    return builder.compile()

def thinkRemover(text):
    while("</think>" in text):
        text = text.split("</think>")[-1]
    while("<think>" in text):
        text = text.split("<think>")[-1]
    return text

# File Uploader for PDF Resumes
def upload_Resume(path):
    global resumeText
    uploaded_file = path
    text = ""

    if uploaded_file:
        with open(str(uploaded_file), 'rb') as file:
            pdf_reader = PdfReader(file)
            num_pages = len(pdf_reader.pages)
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()

        resumeText = text

# Set up interview context
def intitializeInterviewee(post):
    global vacancy
    vacancy = post
    build_conversation()

def build_conversation():
    global vacancy, resumeText, graph, sys_msg, messages, conversation_history,startTime
    system_prompt = f'''
You are Shreya, a female officer responsible for conducting a high-level professional interview for the job vacancy of {vacancy}. These questions will be fed into a text-to-voice model, so do not include any asterisks, numbering, or prefixes like "first question." Ask only one clear, concise question at a time (20-25 words), balancing technical and psychological topics. Maintain a formal professional tone. If the candidate gives irrelevant responses, politely but firmly redirect them to the interview focus. If they remain unproductive, inform them the interview cannot proceed without serious engagement and conclude if necessary. You can use a set of tools. Resume: {resumeText}.
'''
    sys_msg = SystemMessage(content=system_prompt)
    messages = [sys_msg]
    conversation_history = [{"role": "system", "content": system_prompt}]
    graph = build_graph(provider="groq")
    startTime = datetime.now()


# Final dashboard JSON response
def final_dashboard_json():
    global dashboardData,messages, startTime, endTime
    endTime = datetime.now()
    totalTime = (endTime - startTime).seconds
    print(totalTime)
    print(messages)
    for m in messages:
        m.pretty_print()
    if(dashboardData):
        return dashboardData
    prompt = """Please provide a comprehensive summary of the interview using the following JSON format:

    {
        "BasicDetails": {
            "Name": "",
            "Vacancy": "",
            "SkillsNeeded": []
        },
        "Scores": {
            "EducationalBackgroundScore": 0,
            "Experience": 0,
            "InterpersonalCommunication": 0,
            "TechnicalKnowledge": 0,
            "OverallScore": 0
        },
        "InterviewSummary": {
            "PositivePoints": "Provide DETAILED positive insights (at least 150-200 words) with SPECIFIC EXAMPLES from the interview. For instance: 'The candidate demonstrated strong problem-solving skills when they correctly explained the implementation of X algorithm, providing time complexity analysis. They also showed excellent communication by clearly articulating their past project experiences, specifically when discussing their role in developing Y feature at their previous company...'",
            "NegativePoints": "Provide DETAILED areas for improvement (at least 150-200 words) with SPECIFIC EXAMPLES from the interview. For instance: 'The candidate struggled with explaining the core concepts of X technology despite listing it as a key skill. When asked about their approach to problem Y, they provided a solution that didn't consider edge cases. Their response to the question about Z lacked depth and demonstrated limited understanding of the fundamental principles...'"
        },
        "DetailedAssessment": {
            "RecommendationStatus": "Recommended/Not Recommended/Consider",
            "InterviewDuration": 0,
            "ConfidenceLevel": 0,
            "SkillMatchPercentage": 0,
            "PersonalityTraits": ["trait1", "trait2"],
            "TechnicalSkillsBreakdown": [
                {"skill": "skill1", "proficiency": 0},
                {"skill": "skill2", "proficiency": 0}
            ]
        },
        "RecommendedLearningPaths": [
            {"area": "area to improve", "resources": ["resource1", "resource2"]}
        ],
        "CultureFitAnalysis": {
            "TeamworkScore": 0,
            "AdaptabilityScore": 0,
            "Summary": ""
        }
    }

    Instructions:

    Name: Candidate's name.
    Vacancy: Position for which the interview was conducted.
    SkillsNeeded: Skills required for the position.
    Scores: Score details (strict marking).
    InterviewSummary: Provide EXTENSIVE feedback with SPECIFIC EXAMPLES from the conversation. Each point should be thorough and cite actual responses or moments from the interview.
    DetailedAssessment: In-depth analysis with confidence level (0-100), skill match (0-100), key personality traits, and breakdown of technical skills.
    RecommendedLearningPaths: Areas where candidate should improve with suggested resources.
    CultureFitAnalysis: Analysis of teamwork and adaptability scores (0-100) with a brief summary.
    """+f"Also consider that the interview duration was {totalTime} seconds."
    # Create a temporary conversation history
    temp_conversation = conversation_history.copy()
    temp_conversation.append({"role": "user", "content": prompt})
    
    completion = client.chat.completions.create(model="qwen/qwen3-32b", messages=temp_conversation)
    response_text = thinkRemover(completion.choices[0].message.content)
    print(response_text)
    dashboardData = response_text
    # Not adding to the original conversation history
    return dashboardData

# Function to get interview responses
def get_response(user_input):
    global graph, messages, conversation_history
    if user_input.lower() == "exit":
        return final_dashboard_json()
    else:
        conversation_history.append({"role": "user", "content": user_input})
        messages.append(HumanMessage(content=user_input))

    try:
        messages = graph.invoke({"messages": messages})["messages"]
        for msg in messages[-3:]:
            if hasattr(msg, "tool_calls"):
                for call in msg.tool_calls:
                    if call.get("name") == "exit_tool":
                        return final_dashboard_json()
        response_text= messages[-1].content
        conversation_history.append({"role": "assistant", "content": response_text})
        return response_text
    except Exception as e:
        print(f"Error: {str(e)}")
        return "oops error"

