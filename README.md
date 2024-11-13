# AI-Based Interviewer

This project is an AI-based interviewer application designed to simulate a professional interview environment. It leverages two Large Language Models (LLMs) to provide a comprehensive interview experience: Groq for faster inference and ChatGPT-4 for better reference. The application automatically converses with the interviewee and, at the end, provides a detailed dashboard with scores and summaries.

## Features

- **Automated Interview Process**: The AI conducts the interview by asking questions, evaluating responses, and providing feedback. This ensures a consistent and unbiased interview process.
- **Dual LLM Integration**: Utilizes Groq for quick responses and ChatGPT-4 for more detailed and nuanced interactions, combining speed with depth.
- **Real-Time Conversation**: The AI maintains a conversation history and adapts its questions based on the interviewee's responses, creating a dynamic and interactive interview experience.
- **AI Interviewer Tailored with Indian Accent**: For seamless interaction and to make the interviewee comfortable, the AI interviewer is tailored to speak with an Indian accent.
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

## Image Gallery

Here are some images related to the project:

![Image 1][1]

![Image 2][2]

![Image 3][3]

![Image 4][4]

![Image 5][5]

[1]: https://i.sstatic.net/mdahM6Ds.png
[2]: https://i.sstatic.net/MBS1ViFp.png
[3]: https://i.sstatic.net/BH8O4TCz.png
[4]: https://i.sstatic.net/82tl81uT.png
[5]: https://i.sstatic.net/3fXp4ZlD.png

## Video Demonstration

Watch the video demonstration of the project on YouTube:

[![Watch the video](https://img.youtube.com/vi/DihqVOpJFls/maxresdefault.jpg)](https://youtu.be/DihqVOpJFls)

## Recruiter Tools

### Recruiter-Friendly Dashboard

A recruiter-focused dashboard offers a comprehensive summary of the interview process, including candidate performance metrics such as overall score, confidence, emotional stability, and job compatibility. The dashboard incorporates bias detection tools that highlight any potential AI biases, allowing recruiters to intervene or adjust the evaluation process if needed. This transparency ensures that the evaluation remains fair and objective.

### Automated Resume Screening

Integrated with Applicant Tracking Systems (ATS), the platform automates resume screening to pre-filter candidates based on relevant skills and qualifications. This step significantly reduces the workload on recruiters by automatically identifying the most qualified candidates for further evaluation.

### Tailored Questionnaires

The system dynamically generates interview questions tailored to the specific job role and the candidate’s unique profile. Using insights from resume analysis and real-time interactions, the platform customises questions to focus on relevant skills, ensuring each candidate experiences a highly targeted and relevant interview process.

## Technical Workflow

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

## Dashboard Information

The final dashboard provides the following information:

- **Scores**:
  - `EducationalBackgroundScore`: Score based on the candidate's educational qualifications.
  - `Experience`: Score based on the candidate's relevant work experience.
  - `InterpersonalCommunication`: Score based on the candidate's ability to communicate and interact effectively.
  - `TechnicalKnowledge`: Score based on the candidate's technical skills and knowledge.
  - `OverallScore`: Overall performance score of the candidate.

- **Interview Summary**:
  - `PositivePoints`: Key strengths or positive aspects observed during the interview.
  - `NegativePoints`: Key weaknesses or areas of concern noted during the interview.

## Upcoming Features 
- **Facial Expression and Body Posture Analysis**: Integrating video feed to analyze facial expressions and body posture, providing insights into the interviewee's emotions and confidence levels.
- **Unfair Detection**: Implementing eyeball tracking to detect any unfair practices during the interview.
- **Audio Pitch Analysis**: Utilizing audio pitch to assess the interviewee's emotions and confidence.
- **Enhanced Scoring with React Technique**: Employing advanced LLM techniques for more consistent and accurate scoring.

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes. We appreciate your efforts to improve this project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgements

- [Groq](https://groq.com) for providing the LLM API.
- [OpenAI](https://openai.com) for ChatGPT-4 via [OnDemand](https://app.on-demand.io/).