from __future__ import annotations
import argparse, json
from orchestrator.run import dispatch

def main():
    p = argparse.ArgumentParser(description="Run an agent task")
    p.add_argument("agent", help="agent name")
    p.add_argument("task", help="task string")
    p.add_argument("--context", help="JSON context", default="{}")
    args = p.parse_args()
    ctx = json.loads(args.context)
    out = dispatch(args.agent, args.task, ctx)
    print(json.dumps(out.model_dump(), indent=2))

if __name__ == "__main__":
    main()
