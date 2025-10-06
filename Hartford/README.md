# Java Agent Test – Observability & Multi-Agent Orchestration

## Overview
This project demonstrates a **multi-agent system** designed to enhance Java application observability, validation, and documentation through LLM-based code analysis and static inspection tools. It is designed to work with enterprise environments, CI/CD pipelines, and future integrations with external systems like Slack, Jira, and ServiceNow.

---

## Key Features

### 1. Observability Inspector Agent
- Detects missing instrumentation (e.g., missing `Trace`/`Span`) in Java code.
- Uses rule engines (Checkstyle, SpotBugs) and future OpenTelemetry rule integrations.
- Standardizes evaluation based on enterprise observability rules.

### 2. Validation Agent
- Validates code changes for observability and documentation compliance.
- Designed for CI/CD integration with pass/fail scoring.

### 3. DocBuilder Agent
- Generates human-friendly documentation:
  - Mermaid diagrams
  - UML call relationship diagrams
  - Auto-updated `README.md`
- Future integration with enterprise knowledge bases (e.g., internal wiki).

### 4. Orchestrator Agent
- Manages scheduling and execution of multiple agents.
- Supports context memory for multi-file analysis.
- Planned task queue and async execution support.

### 5. Tool Integration (Future)
- Integration with enterprise tools:
  - Jira / ServiceNow (ticketing)
  - Slackbot (notifications)
  - CI/CD hooks


---

## Directory Structure

your-project/
├─ README.md
├─ requirements.txt
├─ .env.example
├─ .env
├─ scripts/
│  ├─ setup_venv.sh
│  └─ run_local.sh
└─ src/
   └─ app/
      ├─ __init__.py
      ├─ orchestrator/
      │  ├─ __init__.py
      │  ├─ router.py
      │  └─ run.py
      ├─ agents/
      │  ├─ __init__.py
      │  ├─ understand_code/
      │  │  ├─ __init__.py
      │  │  └─ understand_code.py
      │  ├─ docbuilder/
      │  │  ├─ __init__.py
      │  │  └─ docbuilder.py
      │  ├─ instrumentation_advisor/
      │  │  ├─ __init__.py
      │  │  └─ instrumentation_advisor.py
      │  ├─ observability_inspector/
      │  │  ├─ __init__.py
      │  │  └─ observability_inspector.py
      │  └─ validation/
      │     ├─ __init__.py
      │     └─ validation.py
      ├─ common/
      │  ├─ __init__.py
      │  ├─ config.py
      │  ├─ types.py
      │  └─ db/
      │     ├─ __init__.py
      │     ├─ firestore.py
      │     ├─ redis_kv.py
      │     ├─ neo4j_db.py
      │     └─ template_db.py
      └─ gcp/
         ├─ __init__.py
         └─ vertex.py

---

## Purpose of Each Directory

- orchestrator/
  - router.py — single explicit registry where all agents are imported and registered. Add one import and one dict entry to include a new agent.
  - run.py — main entrypoint. Reads TARGET_REPO_URL from the environment, dispatches agents in order, and writes a markdown report.

- agents/
  - Each agent lives in its own folder and single file named after the agent, for example:
    - understand_code/understand_code.py
    - instrumentation_advisor/instrumentation_advisor.py
    - docbuilder/docbuilder.py
    - observability_inspector/observability_inspector.py
    - validation/validation.py
  - Each agent exports a module-level object named `agent` that exposes:
    - name: str
    - run(AgentInput) -> AgentOutput

- common/
  - types.py — shared Pydantic models:
    - AgentInput: contains task and context
    - AgentOutput: contains result and meta
    - Agent protocol with `.name` and `.run()`
  - config.py — loads .env and provides env-backed settings (e.g., TARGET_REPO_URL, GCP settings, optional DB settings).
  - db/ — centralized database adapters used by any agent. Only create the clients you need at runtime:
    - firestore.py — get_firestore_client()
    - redis_kv.py — get_redis_client()
    - neo4j_db.py — get_neo4j_driver()
    - template_db.py — copy to add another DB connector

- gcp/
  - vertex.py — Gemini / VertexAI helpers (renamed from model.py). If you have an existing get_llm() from your coworker, keep it here so agents can import it.

- scripts/
  - setup_venv.sh — creates a virtualenv and installs requirements.
  - run_local.sh — runs the orchestrator locally.

---

## Quickstart

1) Create environment file
- Copy `.env.example` to `.env` and fill values.
- TARGET_REPO_URL is mandatory; the orchestrator exits if it is missing.

2) Create and activate a virtual environment, then install dependencies
- macOS/Linux:
  ```
  ./scripts/setup_venv.sh
  ```
- Windows PowerShell:
  ```
  py -m venv .venv
  .\.venv\Scripts\Activate.ps1
  pip install --upgrade pip
  pip install -r requirements.txt
  ```

3) Run locally
```
./scripts/run_local.sh
```
`run.py` will:
- read TARGET_REPO_URL
- run the understand_code agent to analyze the repo
- run the instrumentation_advisor agent to produce method-level suggestions
- run the docbuilder agent to write a markdown report (`trace_report.md` by default)

---

## Environment Variables

(Mandatory)
- TARGET_REPO_URL — GitHub repository URL to analyze.

(GCP / Vertex)
- GCP_PROJECT_ID
- GCP_LOCATION (default: us-central1)
- GOOGLE_APPLICATION_CREDENTIALS
- GEMINI_MODEL (default: gemini-1.5-flash)

(Redis)
- REDIS_URL (e.g., redis://localhost:6379/0)

(Neo4j)
- NEO4J_URI (e.g., bolt://localhost:7687)
- NEO4J_USER
- NEO4J_PASSWORD

No logging variables are included per project scope.

---

## Minimal CLI Usage Guidelines

For quick one-off runs, you can call the orchestrator directly:
```
# activate venv first, then:
export PYTHONPATH=src
python -m app.orchestrator.run
```

To target a specific agent programmatically in a Python shell:
```
export PYTHONPATH=src
python
>>> from app.orchestrator.router import get_agent
>>> from app.common.types import AgentInput
>>> agent = get_agent("understand_code")
>>> out = agent.run(AgentInput(task="analyze_repo", context={"repo_url":"https://github.com/..."}))
>>> out.model_dump()
```

---

## How to Add a New Agent

1) Create a new folder and file under `src/app/agents/`:
```
src/app/agents/my_new_agent/my_new_agent.py
```

2) Implement a module-level `agent` object with the standard interface:
```
from app.common.types import Agent, AgentInput, AgentOutput

class MyNewAgent:
    name = "my_new_agent"
    def run(self, inp: AgentInput) -> AgentOutput:
        return AgentOutput(result={"ok": True}, meta={"agent": self.name})

agent: Agent = MyNewAgent()
```

3) Register it in `src/app/orchestrator/router.py` by adding:
```
from app.agents.my_new_agent.my_new_agent import agent as my_new_agent
REGISTRY["my_new_agent"] = my_new_agent
```

No other files need to change.

---

## Requirements

The project keeps dependencies lean for fast setup. Optional DB drivers are commented out and can be installed later as needed.

Core:
- pydantic
- python-dotenv

Repo/code parsing:
- javalang
- GitPython

LangChain / Vertex:
- langchain
- langchain-google-vertexai
- google-cloud-aiplatform

Optional (uncomment and install when needed):
- google-cloud-firestore
- redis
- neo4j

---

## Notes

- Target Python version: 3.11
- `from __future__ import annotations` is not required in Python 3.11.
- Logging, tests, and CI pipelines are intentionally out of scope to keep the repository simple for now.


