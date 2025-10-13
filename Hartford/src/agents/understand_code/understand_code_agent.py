# Your original code, wrapped with a class that exposes .name and .run()

import os
import shutil
import tempfile
import javalang
from git import Repo
from common.types import Agent, AgentInput, AgentOutput
from gcp.models import gemini_flash

from agents.understand_code.ast.ast import parse_ast_structure
from agents.understand_code.call_graph.call_graph import build_call_graph

# ==== 1. Init optional LLM ====
llm = gemini_flash()  # uses Vertex+ADC first, API-key fallback otherwise

# ==== 2. Repo operations ====
def clone_repo(repo_url, branch="main"):
    tmp_dir = tempfile.mkdtemp()
    print(f"[CodeUnderstanding] Cloning {repo_url} -> {tmp_dir}")
    Repo.clone_from(repo_url, tmp_dir, branch=branch)
    return tmp_dir

def cleanup_repo(path):
    print(f"[CodeUnderstanding] Cleanup {path}")
    shutil.rmtree(path, ignore_errors=True)

def find_java_files(root_path):
    java_files = []
    for root, _, files in os.walk(root_path):
        for f in files:
            if f.endswith(".java"):
                java_files.append(os.path.join(root, f))
    return java_files

# ==== 4. Analyze code structure ====
def parse_java_methods(java_code):
    tree = javalang.parse.parse(java_code)
    methods = []
    for _, node in tree.filter(javalang.tree.MethodDeclaration):
        body = node.body.__str__() if node.body else ""
        methods.append({
            "name": node.name,
            "has_trace": "tracer.spanBuilder" in body or "@WithSpan" in body,
            "content": java_code[node.position.line - 1:] if node.position else "",
        })
    return methods

# ==== 7. Optional LLM summary ====
def generate_code_summary_with_llm(methods):
    if not llm:
        return None
    snippet_names = [m["name"] for m in methods][:30]
    combined_code = "\n".join(snippet_names)
    prompt = f"""
Summarize the Java codebase structure briefly. Focus on:
1. A high-level call graph or component interaction summary.
2. Important classes and their roles.

Code:
{combined_code}

Return a concise description.
"""
    response = llm.invoke(prompt)
    return response.content

# ==== 8. Orchestration ====
def run_code_understanding(java_files, use_llm=True):
    all_methods = []
    ast_summary = []

    for file in java_files:
        with open(file, "r", encoding="utf-8") as f:
            java_code = f.read()

        methods = parse_java_methods(java_code)
        # Attach file path to each parsed method for later grouping
        for m in methods:
            m["file"] = file
        all_methods.extend(methods)

        ast_structure = parse_ast_structure(java_code)
        ast_summary.extend(ast_structure)

    call_graph = build_call_graph(all_methods)
    llm_summary = generate_code_summary_with_llm(all_methods) if use_llm else None

    return {
        "methods": all_methods,
        "ast_structure": ast_summary,
        "call_graph": call_graph,
        "llm_summary": llm_summary
    }

class UnderstandCodeAgent:
    name = "understand_code"

    def run(self, inp: AgentInput) -> AgentOutput:
        repo_url = inp.context.get("repo_url")
        branch = inp.context.get("branch", "main")
        use_llm = inp.context.get("use_llm", True)

        if not repo_url:
            return AgentOutput(result={}, meta={"agent": self.name, "error": "repo_url missing"})

        tmp_dir = clone_repo(repo_url, branch)
        try:
            java_files = find_java_files(tmp_dir)
            result = run_code_understanding(java_files, use_llm=use_llm)
            return AgentOutput(result=result, meta={"agent": self.name, "java_files": len(java_files)})
        finally:
            cleanup_repo(tmp_dir)

agent: Agent = UnderstandCodeAgent()
