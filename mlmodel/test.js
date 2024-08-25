const res = {
    "message": "I think our conversation has come to an end. I hope you found it informative and engaging. We've discussed your background, experience, and skills, as well as your interests and goals.\n\nAs we wrap things up, I just want to thank you again for considering Microsoft as a potential employer. We'll be in touch soon to let you know the next steps in our process.\n\nRemember, don't hesitate to reach out if you have any further questions or concerns. We're always here to help. Good luck with your future endeavors, and I hope we'll have the chance to work together in the future.\n\nHere's a summary of our conversation:\n\n```json\n{\n  \"BasicDetails\": {\n    \"Name\": \"Manav\",\n    \"Vacancy\": \"Software Development Engineer 1\",\n    \"SkillsNeeded\": [\"MERN\", \"Web Sockets\", \"FFmpeg\", etc.]\n  },\n  \"Scores\": {\n    \"EducationalBackgroundScore\": 0.9,\n    \"Experience\": 0.8,\n    \"InterpersonalCommunication\": 0.7,\n    \"TechnicalKnowledge\": 0.9,\n    \"OverallScore\": 0.85\n  },\n  \"InterviewSummary\": {\n    \"PositivePoints\": \"Aptitude for learning, willingness to take on new challenges.\",\n    \"NegativePoints\": \"Limited experience with ML frameworks and libraries.\"\n  }\n}\n`\n\nI hope this summary does justice to our conversation. Let's hope you score high on the overall score!"
}

const initialIndex = res["message"].indexOf("{")
const lastIndex = res["message"].lastIndexOf("}")+1
res["message"] = res["message"].substring(initialIndex,lastIndex)
const jsonifiedResponse = JSON.parse(res["message"]) 

console.log(jsonifiedResponse)