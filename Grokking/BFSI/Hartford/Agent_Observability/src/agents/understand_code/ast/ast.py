import javalang

def parse_ast_structure(java_code):
    tree = javalang.parse.parse(java_code)
    structure = []

    for path, node in tree:
        if isinstance(node, javalang.tree.ClassDeclaration):
            class_info = {
                "type": "class",
                "name": node.name,
                "methods": []
            }
            for child in node.body:
                if isinstance(child, javalang.tree.MethodDeclaration):
                    class_info["methods"].append(child.name)
            structure.append(class_info)
    return structure