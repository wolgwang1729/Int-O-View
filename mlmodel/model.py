from groq import Groq


def chunk_text(text, chunk_size, overlap):
        # chunks = []
        # start = 0
        # while start < len(text):
        #     end = start + chunk_size
        #     chunks.append(text[start:end])
        #     start += chunk_size - overlap
        # return ''.join(chunks)
        return
        

chunk_size = 1000 
overlap = 200

client = Groq(api_key="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")

# about_DRDO="DRDO is the R&D wing of Ministry of Defence, Govt of India, with a vision to empower India with cutting-edge defence technologies and amission to achieve self-reliance in critical defence technologies and systems, while equipping our armed forces with state-of-the-art weapon systems andequipment in accordance with requirements laid down by the three Services. DRDO's pursuit of self-reliance and successful indigenous development andproduction of strategic systems and platforms such as Agni and Prithvi series of missiles; light combat aircraft, Tejas; multi-barrel rocket launcher,Pinaka; air defence system, Akash; a wide range of radars and electronic warfare systems; etc., have given quantum jump to India's military might,generating effective deterrence and providing crucial leverage.'Balasya Mulam Vigyanam'—the source of strength is science-drives the nation in peace andwar. DRDO has firm determination to make the nation strong and self-reliant in terms of science and technology, especially in the field of militarytechnologies.DRDO was formed in 1958 from the amalgamation of the then already functioning Technical Development Establishment (TDEs) of the Indian Armyand the Directorate of Technical Development & Production (DTDP) with the Defence Science Organisation (DSO). DRDO was then a small organisation with 10establishments or laboratories. Over the years, it has grown multi-directionally in terms of the variety of subject disciplines, number of laboratories,achievements and stature.Today, DRDO is a network of around 41 laboratories and 05 DRDO Young Scientist Laboratories (DYSLs) which are deeply engaged indeveloping defence technologies covering various disciplines, like aeronautics, armaments, electronics, combat vehicles, engineering systems,instrumentation, missiles, advanced computing and simulation, special materials, naval systems, life sciences, training, information systems andagriculture. Several major projects for the development of missiles, armaments, light combat aircrafts, radars, electronic warfare systems etc are onhand and significant achievements have already been made in several such technologies."
# about_DRDO_chunks = chunk_text(about_DRDO, chunk_size, overlap)

# job_advertisement_text="Junior Research Fellowship"
# about_job_chunks = chunk_text(job_advertisement_text, chunk_size, overlap)
# resume_text="My name is Karan. I have done. BTech from DTU in computer science and technology."
# resume_text_chunks = chunk_text(resume_text, chunk_size, overlap)



def chatbot(user_input, state):

    if(user_input == 'exit'):
        print("hello i am here")
        
        prompt = """Output the summary as a JSON object. Do not include any non-JSON text or special characters. The JSON object should follow this template:

                    {
                        "BasicDetails": {
                            "Name": "string",
                            "Vacancy": "string",
                            "SkillsNeeded": ["string"]
                        },
                        "Scores": {
                            "EducationalBackgroundScore": number,
                            "Experience": number,
                            "InterpersonalCommunication": number,
                            "TechnicalKnowledge": number,
                            "OverallScore": number
                        },
                        "InterviewSummary": {
                            "PositivePoints": "string",
                            "NegativePoints": "string",
                            "YourJudgement": "string"
                        }
                    }


                Instructions:
                
                Basic Details:
                Name: The name of the candidate.
                Vacancy: The position or role for which the interview was conducted.
                SkillsNeeded: List of skills required for the position.

                Scores :
                EducationalBackgroundScore: Score based on the candidate's educational qualifications.should be between 1-10.
                Experience: Score based on the candidate's relevant work experience.should be between 1-10.
                InterpersonalCommunication: Score based on the candidate's ability to communicate and interact effectively.should be between 1-10.
                TechnicalKnowledge: Score based on the candidate's technical skills and knowledge.should be between 1-10.
                OverallScore: Overall performance score of the candidate.should be between 1-10.
                
                InterviewSummary:
                PositivePoints: Key strengths or positive aspects observed during the interview.
                NegativePoints: Key weaknesses or areas of concern noted during the interview.
                yourJudgement: what is your opinion in how good the person was for the job.should we accept him or reject.
                Please ensure the output is strictly in the json format provided and reflects a professional evaluation of the interview. Avoid including any speculative or non-factual information.Please ensure the response is in raw JSON format, not as a string or escaped text.
                """
        state['messages'].append({"role": "system", "content": prompt})
        chat_completion = client.chat.completions.create(
                    messages=state['messages'],
                    model="llama3-8b-8192",
                )
        response_text = chat_completion.choices[0].message.content
        return response_text

    else:
        # state['messages'].append({'role': 'user', 'content': user_input})
        chat_completion = client.chat.completions.create(
        messages=state['messages'] +[
            {"role": "system", "content": state['resume_text_chunks']},
            # {"role": "system", "content": state['about_DRDO_chunks']},
            # {"role": "system", "content": state['about_job_chunks']}
        ],
        model="llama3-8b-8192",
    )
    response_text = chat_completion.choices[0].message.content
    # state['messages'].append({'role': 'assistant', 'content': response_text})
    return response_text

if __name__ == "__main__":

    while(True):
        print("You : ",end="")
        user_input = input()
        response_text=chatbot(user_input)
        print("Interviewer : ", response_text)