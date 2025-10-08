from datetime import datetime
from common.types import Agent, AgentInput, AgentOutput

def generate_report(results, code_summary, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"# Java Trace/Span Analysis Report\n\n")
        f.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        if code_summary:
            f.write("## Code Structure Summary\n")
            f.write(f"{code_summary}\n\n")
        for file_result in results:
            f.write(f"## File: {file_result['file']}\n")
            for method in file_result['methods']:
                # handle both dict and pydantic dict-shaped methods
                method_name = method.get("method") if isinstance(method, dict) else getattr(method, "method", "UNKNOWN")
                has_trace = method.get("has_trace") if isinstance(method, dict) else getattr(method, "has_trace", False)
                suggestion = method.get("suggestion") if isinstance(method, dict) else getattr(method, "suggestion", "")
                modified_code = method.get("modified_code") if isinstance(method, dict) else getattr(method, "modified_code", "")

                f.write(f"### Method: {method_name}\n")
                f.write(f"- Has Trace: {has_trace}\n")
                f.write(f"#### Suggestion:\n")
                f.write(f"{suggestion}\n\n")
                if modified_code:
                    f.write(f"#### Modified Code Example:\n")
                    f.write("```java\n")
                    f.write(f"{modified_code}\n")
                    f.write("```\n\n")

class DocBuilderAgent:
    name = "docbuilder"

    def run(self, inp: AgentInput) -> AgentOutput:
        results = inp.context.get("results", [])
        code_summary = inp.context.get("code_summary")
        output_path = inp.context.get("output_path", "trace_report.md")
        generate_report(results, code_summary, output_path)
        return AgentOutput(result={"output_path": output_path}, meta={"agent": self.name})

agent: Agent = DocBuilderAgent()