import json

def escape(text):
    """Escape quotes for Cypher."""
    return text.replace('"', '\\"')

def generate_kg_triples_and_cypher(input_file, output_cypher_file):
    with open(input_file, "r", encoding="utf-8") as f:
        reviews = json.load(f)

    triples = []
    cypher_statements = []

    for review in reviews:
        author = review.get("author", "Anonymous")
        topic = review.get("topic", "").strip().lower()
        subtopics = review.get("subtopics", [])
        entities = review.get("entities", [])

        # 1. (Customer) --> [has_opinion_about] --> (Topic)
        triples.append((f"Customer:{author}", "has_opinion_about", f"Topic:{topic}"))
        cypher_statements.append(
            f'MERGE (c:Customer {{name: "{escape(author)}"}})\n'
            f'MERGE (t:Topic {{name: "{escape(topic)}"}})\n'
            f'MERGE (c)-[:HAS_OPINION_ABOUT]->(t);'
        )

        # 2. (Topic) --> [has_subtopic] --> (Subtopic)
        for sub in subtopics:
            triples.append((f"Topic:{topic}", "has_subtopic", f"Subtopic:{sub}"))
            cypher_statements.append(
                f'MERGE (t:Topic {{name: "{escape(topic)}"}})\n'
                f'MERGE (s:Subtopic {{name: "{escape(sub)}"}})\n'
                f'MERGE (t)-[:HAS_SUBTOPIC]->(s);'
            )

        # 3. (Topic) --> [related_to] --> (Entity)
        for ent in entities:
            triples.append((f"Topic:{topic}", "related_to", f"Entity:{ent}"))
            cypher_statements.append(
                f'MERGE (t:Topic {{name: "{escape(topic)}"}})\n'
                f'MERGE (e:Entity {{name: "{escape(ent)}"}})\n'
                f'MERGE (t)-[:RELATED_TO]->(e);'
            )

    with open(output_cypher_file, "w", encoding="utf-8") as f:
        for stmt in cypher_statements:
            f.write(stmt + "\n")

    print(f"✅ Generated {len(triples)} triples and saved Cypher to {output_cypher_file}")

# Example usage:
generate_kg_triples_and_cypher(
    input_file="toyota_trustpilot_reviews_with_llm.json",
    output_cypher_file="trustpilot_kg.cypher"
)
