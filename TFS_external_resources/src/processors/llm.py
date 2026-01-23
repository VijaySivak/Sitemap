import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# Load .env file (if it exists)
# Use override=False to not override existing environment variables
try:
    load_dotenv(override=False)
except Exception:
    # If .env file doesn't exist or can't be loaded, continue without it
    pass

# Get API key from environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client (will be initialized when API key is available)
client = None
if openai_api_key:
    client = OpenAI(api_key=openai_api_key)

SYSTEM_PROMPT = """You are an assistant that classifies customer reviews into concise topic tags.

You must return ONLY a valid JSON object (no additional text or explanation) with the following fields:
- topic: one main topic as a string (e.g., "Customer Service", "Refund Process", "Payment Issues")
- subtopics: a list of more specific aspects (e.g., ["Response Time", "Staff Attitude", "Resolution Speed"])
- entities: a list of any company, product, service, or person mentioned (e.g., ["Toyota Financial", "Customer Support Team"])

Example response format:
{
  "topic": "Customer Service",
  "subtopics": ["Response Time", "Staff Attitude"],
  "entities": ["Toyota Financial", "Support Team"]
}

Keep it brief and structured. Return ONLY the JSON object, nothing else.
"""

def classify_review_with_gpt(review_content):
    """Classify a review using GPT and return structured data"""
    if not client:
        raise ValueError(
            "OPENAI_API_KEY not found in environment variables. "
            "Please create a .env file with your API key:\n"
            "1. Copy .env.example to .env\n"
            "2. Add your OPENAI_API_KEY to .env\n"
            "3. Get your API key from: https://platform.openai.com/api-keys"
        )
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": review_content},
            ],
            temperature=0.2,
            response_format={"type": "json_object"}  # Force JSON response format
        )
        content = response.choices[0].message.content
        
        # Parse JSON response
        try:
            result = json.loads(content)
            # Ensure required fields exist with default values
            return {
                "topic": result.get("topic", ""),
                "subtopics": result.get("subtopics", []),
                "entities": result.get("entities", [])
            }
        except json.JSONDecodeError as e:
            print(f"Warning: Failed to parse JSON response: {e}")
            print(f"Raw response: {content}")
            # If parsing fails, try to extract JSON from text
            import re
            json_match = re.search(r'\{.*\}', content, re.DOTALL)
            if json_match:
                try:
                    return json.loads(json_match.group(0))
                except:
                    pass
            # Fallback: return empty structure
            return {
                "topic": content[:100] if content else "",
                "subtopics": [],
                "entities": []
            }
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        raise
