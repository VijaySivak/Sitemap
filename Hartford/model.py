from langchain_google_vertexai import ChatVertexAI

# ==== 1. Init optional LLM ====
llm = ChatVertexAI(model_name="gemini-2.5-pro", temperature=0.2)

def get_llm():
    return llm
