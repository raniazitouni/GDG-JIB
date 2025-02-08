from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import google.generativeai as genai


# Set your OpenAI API key

GEMINI_API_KEY ="AIzaSyD055AQ1iV7f0uiirQ6KA7n2Rhw4kocMiA"
genai.configure(api_key=GEMINI_API_KEY)

@csrf_exempt
def chatbot_view(request):  
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "")

            # Create a chat session with Gemini
            chat = genai.GenerativeModel("gemini-1.5-pro").start_chat()
            response = chat.send_message(user_message)

            bot_message = response.text  # Extract the response

            return JsonResponse({"message": bot_message})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)
