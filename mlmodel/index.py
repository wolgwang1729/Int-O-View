from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

client = Groq(api_key='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')


@app.route("/predict",methods = ['POST'])
def predict():


    data = request.get_json()
    query = data.get('query')

    chat_completion = client.chat.completions.create(
                messages=[
                    {                            
                        "role": "user",
                        "content": query,        
                    }
                ],
                model="llama3-8b-8192",
            )

    response_text = chat_completion.choices[0].message.content

    return jsonify({
        'message' : response_text
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)