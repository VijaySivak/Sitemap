from langchain_google_vertexai import ChatVertexAI

# Keep your coworker's interface exactly the same
llm = ChatVertexAI(model_name="gemini-2.5-pro", temperature=0.2)

def get_llm():
    return llm
