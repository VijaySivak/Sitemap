# import asyncio
# from agents.code_understanding.understand_code_agent import clone_repo, cleanup_repo, find_java_files, run_code_understanding
# from agents.instrumentation.instrumentation_advisor_agent import run_instrumentation_advisor
# from agents.observability.observability_inspector_agent import inspect_observability
# from agents.validation.validation_agent import validate_observability
# from agents.docbuilder.docbuilder_agent import generate_report

# async def main(repo_url, branch="main", output_path="trace_report.md"):
#     tmp_dir = clone_repo(repo_url, branch)
#     try:
#         java_files = find_java_files(tmp_dir)
#         methods, code_summary = await run_code_understanding(java_files, use_llm=True)
#         advisor_results = await run_instrumentation_advisor(methods)
#         results = [{"file": f, "methods": advisor_results} for f in java_files]
#         generate_report(results, code_summary, output_path)
#         print(f"[Done] Report saved: {output_path}")
#     finally:
#         cleanup_repo(tmp_dir)

# if __name__ == "__main__":
#     asyncio.run(main("https://github.com/jaygajera17/E-commerce-project-springBoot"))

import json
import os
import sys
import asyncio

from app.common.config import settings
from app.orchestrator.router import get_agent
from app.common.types import AgentInput

def dispatch(agent_name: str, task: str, context: dict | None = None):
    agent = get_agent(agent_name)
    return agent.run(AgentInput(task=task, context=context or {}))

async def main():
    repo = settings.TARGET_REPO_URL
    if not repo:
        print("ERROR: TARGET_REPO_URL is not set in the environment/.env.", file=sys.stderr)
        sys.exit(1)

    # Pipeline: understand code → instrumentation advice → report
    # 1) Understand code
    uc_out = dispatch("understand_code", "analyze_repo", {"repo_url": repo})
    methods = uc_out.result.get("methods", [])
    code_summary = uc_out.result.get("llm_summary")

    # 2) Instrumentation advice (async)
    # The instrumentation agent here expects a list of parsed methods
    ia_out = dispatch("instrumentation_advisor", "advise_methods", {"methods": methods})
    advisor_results = ia_out.result  # list of InstrumentationSuggestion models as dicts

    # 3) Build results shaped for report
    # understand_code already returns file paths inside methods; group by file
    file_map = {}
    for m in methods:
        file_map.setdefault(m.get("file", "UNKNOWN_FILE.java"), []).append(m)

    consolidated = []
    for fpath, meths in file_map.items():
        consolidated.append({"file": fpath, "methods": advisor_results})

    # 4) Generate report
    db_out = dispatch("docbuilder", "generate_report", {
        "results": consolidated,
        "code_summary": code_summary,
        "output_path": "trace_report.md"
    })

    print(json.dumps({
        "status": "ok",
        "report": db_out.result.get("output_path", "trace_report.md")
    }, indent=2))

if __name__ == "__main__":
    asyncio.run(main())


