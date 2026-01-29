import re

def build_call_graph(methods):
    # placeholder; extend as needed
    graph = {}
    method_names = [m["name"] for m in methods]
    for method in methods:
        calls = []
        for target in method_names:
            if target != method["name"]:
                if re.search(rf'\b{target}\s*\(', method["content"]):
                    calls.append(target)
        graph[method["name"]] = calls
    return graph
