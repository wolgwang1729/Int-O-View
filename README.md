# [AI-Based Interviewer](https://int-o-view.vercel.app/)

This project is an AI-based interviewer application designed to simulate a professional interview environment. It leverages two Large Language Models (LLMs) provided by Groq: Gemma2-9b for faster inference and reasoning model qwen qwq for better reference. The application automatically converses with the interviewee and, at the end, provides a detailed dashboard with scores and summaries.

## Features

- **Automated Interview Process**: The AI conducts the interview by asking questions, evaluating responses, and providing feedback. This ensures a consistent and unbiased interview process.
- **Dual LLM Integration**: Utilizes Groq's Gemma2-9b for quick responses and reasoning model qwen qwq for more detailed and nuanced interactions, combining speed with depth.
- **Real-Time Conversation**: The AI maintains a conversation history and adapts its questions based on the interviewee's responses, creating a dynamic and interactive interview experience.
- **AI Interviewer Tailored with Indian Voice**: For seamless interaction and to make the interviewee comfortable, the AI interviewer uses Eleven Labs for voice synthesis, tailored to speak with an Indian voice.
- **Dashboard Summary**: At the end of the interview, the application generates a detailed summary including scores and key points, providing a comprehensive overview of the candidate's performance.

## Workflow

1. **Home Page**
   - A user-friendly responsive homepage with a spectacular design.
   - Login option on the home page helps to authenticate the recruiter.

2. **Authentication**
   - Simplified verification process for the recruiter (admin) to access the admin dashboard via Email OTP Validation.

3. **Initializing Recruitment Opportunity**
   - A descriptive job & skill selection form for a specific vacancy for which the interview has to be taken.

4. **Interview Link Generation**
   - An individualized link will be sent to the candidate's Email ID that will redirect the candidate to the interview room.

5. **Interview Room**
   - The magical area where all interaction happens with the virtual interviewer. The AI asks questions, evaluates responses, and provides real-time feedback.

6. **Quantitative Metrics**
   - At the end of the interview, on the recruiter’s dashboard, quantitative metrics will be shown covering key scores, interview summary, and other key metrics for the recruiter to take the final call.

## [Agent](https://github.com/wolgwang1729/Int-O-View/blob/main/ml/Agent.py)

This AI interviewer agent is built using LangChain and LangGraph to orchestrate a multi-step conversational workflow:

1. **Framework & Graph Structure**
   - Uses `StateGraph` from LangGraph to define nodes and edges.
   - Orchestrates message flow through three main nodes: initializer, retriever, and assistant, plus a tools node.

2. **Nodes**
   - **Initializer**  
     Inserts the system prompt once at the start of the conversation if not already present.
   - **Retriever**  
     Queries a Supabase vector store (via sentence-transformers embeddings) to fetch past candidate questions or hints when semantic similarity is high (> 0.8).This gives the organisation the option to reduce randomness among various candidates and have more control over the interview process.
     This is done by storing the questions that can be asked in response to the candidate's response in a vector database.
   - **Assistant**  
     Invokes a bound LLM (OpenAI, Google Gemini, Groq Gemma2, or HuggingFace Llama-2) to generate interview questions.
   - **Tools**  
     Routes calls to external tool functions when the assistant requests them.

3. **LLM Providers**
   - **OpenAI** via `ChatOpenAI`
   - **Google Gemini** via `ChatGoogleGenerativeAI`
   - **Groq** via `ChatGroq`
   - **HuggingFace** via `ChatHuggingFace` endpoint  
   These can all be swapped by setting the `provider` argument in `build_graph()`.

4. **Tools**
   - **wiki_search(query)**  
     Fetches up to 1 result from Wikipedia for background or context.
   - **web_search(query)**  
     Retrieves up to 3 web snippets via Tavily for up-to-date information. This can be used to get the latest information about the candidate from various websites like linkedin, github, google scholar, etc.
   - **arxiv_search(query)**  
     Loads up to 3 Arxiv documents to ground technical questions and also to fetch the research papers of the candidate.
   - **resume_get()**  
     Accesses the candidate’s resume to focus on the resume. Traditionally, the resume is put in the system prompt and as the interview progresses it starts to get lost in the conversation. This function helps the model to get the resume whenever needed.
   - **exit_tool()**  
     Immediately ends the interview if non-serious or inappropriate behavior is detected. Traditionally, the model can't end the interview, if the user said something inappropriate and say quit, the model will not be able to quit as it always has to respond. But this function helps the model to end the interview if the user is not serious or is using some inappropriate language. 

5. **Interview Flow**
   - Messages start at the `initializer`, pass through the `retriever` to augment with relevant context, then go to `assistant` for LLM response.
   - If the LLM calls a tool, execution jumps to the `tools` node and returns to `assistant` with the result.
   - This cycle continues until the interview is complete or `exit_tool` is triggered.

## Image Gallery

Here are some images related to the project:

![Image 1][1]

![Image 2][2]

![Image 3][3]

![Image 4][4]

![Image 5][5]

![Model Workflow](https://i.sstatic.net/WWJt9AwX.png)

[1]: https://i.sstatic.net/mdahM6Ds.png
[2]: https://i.sstatic.net/MBS1ViFp.png
[3]: https://i.sstatic.net/BH8O4TCz.png
[4]: https://i.sstatic.net/zOF0VPy5.png
[5]: https://i.sstatic.net/Qs0kvUSn.jpg

## Note

The website is running on Render's free servers, so there might be a delay when it is opened after a long time.

## Video Demonstration

Watch the video demonstration of the project on YouTube:

[![Watch the video](https://img.youtube.com/vi/DihqVOpJFls/maxresdefault.jpg)](https://youtu.be/DPsmpPJPh4w)

## Recruiter Tools

### Recruiter-Friendly Dashboard

A recruiter-focused dashboard offers a comprehensive summary of the interview process, including candidate performance metrics such as overall score, confidence, emotional stability, and job compatibility. The dashboard incorporates bias detection tools that highlight any potential AI biases, allowing recruiters to intervene or adjust the evaluation process if needed. This transparency ensures that the evaluation remains fair and objective.

### Dashboard Information

The final dashboard provides the following information:

- **Basic Details**:
  - `Name`: Candidate's full name.
  - `Vacancy`: Position for which the candidate is interviewing.
  - `SkillsNeeded`: List of skills required for the position.

- **Scores**:
  - `EducationalBackgroundScore`: Score based on the candidate's educational qualifications.
  - `Experience`: Score based on the candidate's relevant work experience.
  - `InterpersonalCommunication`: Score based on the candidate's ability to communicate and interact effectively.
  - `TechnicalKnowledge`: Score based on the candidate's technical skills and knowledge.
  - `OverallScore`: Overall performance score of the candidate.

- **Interview Summary**:
  - `PositivePoints`: Detailed positive insights (150-200 words) with specific examples from the interview, highlighting strengths and accomplishments.
  - `NegativePoints`: Detailed areas for improvement (150-200 words) with specific examples from the interview, noting knowledge gaps or weaknesses.

- **Detailed Assessment**:
  - `RecommendationStatus`: Final recommendation (Recommended/Not Recommended/Consider).
  - `InterviewDuration`: Total duration of the interview.
  - `ConfidenceLevel`: Measure of the candidate's confidence during the interview.
  - `SkillMatchPercentage`: Percentage match between candidate's skills and job requirements.
  - `PersonalityTraits`: List of observed personality traits.
  - `TechnicalSkillsBreakdown`: Detailed assessment of individual technical skills with proficiency levels.

- **Recommended Learning Paths**:
  - List of suggested areas for improvement with specific learning resources.

- **Culture Fit Analysis**:
  - `TeamworkScore`: Assessment of candidate's teamwork abilities.
  - `AdaptabilityScore`: Assessment of candidate's adaptability to new environments.
  - `Summary`: Overview of the candidate's potential cultural fit with the organization.

### Automated Resume Screening

Integrated with Applicant Tracking Systems (ATS), the platform automates resume screening to pre-filter candidates based on relevant skills and qualifications. This step significantly reduces the workload on recruiters by automatically identifying the most qualified candidates for further evaluation.

### Tailored Questionnaires

The system dynamically generates interview questions tailored to the specific job role and the candidate’s unique profile. Using insights from resume analysis and real-time interactions, the platform customises questions to focus on relevant skills, ensuring each candidate experiences a highly targeted and relevant interview process.


## Upcoming Features 
- **Facial Expression and Body Posture Analysis**: Integrating video feed to analyze facial expressions and body posture, providing insights into the interviewee's emotions and confidence levels.
- **Unfair Detection**: Implementing eyeball tracking to detect any unfair practices during the interview.
- **Audio Pitch Analysis**: Utilizing audio pitch to assess the interviewee's emotions and confidence.
- **Enhanced Scoring with React Technique**: Employing advanced LLM techniques for more consistent and accurate scoring.

## Proposed Technical Workflow

The technical workflow comprises the integration of three key modalities—text, audio, and video—ensuring a comprehensive candidate evaluation during the interview.

### Text Analysis

The text analysis begins with the automated summarisation of the candidate’s resume, identifying key details such as education, work experience, skills, and projects. This summary serves as the foundation for generating personalised interview questions that delve into the candidate's specific qualifications. The system then dynamically adjusts the questions based on the candidate's responses, ensuring a conversational flow that probes deeper into areas of interest or skill gaps.

### Audio Interaction

The platform conducts real-time evaluation of audio inputs, focusing on the content of the responses and communication clarity. It assesses not only the semantic accuracy but also evaluates tone, articulation, and confidence. This allows the system to adapt the interview in real-time, increasing the complexity of questions as the candidate performs well or providing more guidance if needed.

### Video Analysis

Through real-time video analysis, the system monitors the candidate's non-verbal communication, such as body language and facial expressions. This analysis contributes to the emotional and confidence classifier, which assesses the candidate’s emotional state and how they handle the pressure of the interview. The video feed also contributes to the unfair activity detector, ensuring no external assistance is being used.

## Post-Interview Evaluation

### Ethics and Fairness Agent

Post-interview, an AI ethics agent reviews the entire process for any biases or inconsistencies. This agent ensures that the interview adhered to the defined guidelines, and no system-induced bias affected the candidate’s evaluation. It verifies that the questions were consistent with the job role and that the interview was conducted fairly.

### Similarity Agent

A dedicated similarity agent evaluates the candidate's soft skills and overall demeanour, measuring how well their personality aligns with the job requirements. This agent assesses critical qualities such as leadership, empathy, stress management, and communication skills, essential for roles in defence and high-pressure environments.

## Scoring and Evaluation

The platform’s final assessment is derived from a comprehensive scoring system that breaks down the candidate's evaluation into three key areas:

- Resume (25%) – Assesses the candidate’s qualifications, experience, and technical skills.
- Conversation (50%) – Evaluates the quality, depth, and clarity of the candidate’s responses, as well as language proficiency.
- Personality (25%) – Focuses on emotional stability, confidence, and non-verbal communication, including the input from the similarity agent.

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes. We appreciate your efforts to improve this project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgements
- This was a team project for SIH.
- [Groq](https://groq.com) for providing the LLM API.
- [Eleven Labs](https://elevenlabs.io) for providing the voice synthesis API tailored for an Indian voice.
- [Cloudinary](https://cloudinary.com) for providing media management and optimization services.
- [MongoDB](https://www.mongodb.com) for providing the database solution for efficient data storage and retrieval.
- [Supabase](https://supabase.com) for providing the vector store database for semantic retrieval capabilities.
- [LangGraph](https://github.com/langchain-ai/langgraph) for providing the framework to build and orchestrate the AI agent workflow.
