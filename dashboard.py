import streamlit as st
import pandas as pd
import json
import plotly.express as px
import os
import re

st.set_page_config(page_title="Sitemap Crawler Analytics", layout="wide")

st.title("Sitemap Crawler Business Metrics")

# --- Data Loading ---
@st.cache_data
def load_data():
    faqs = []
    documents = []
    edges = []
    
    # Load FAQs
    faq_path = 'output/json/faq_items.jsonl'
    if os.path.exists(faq_path):
        with open(faq_path, 'r') as f:
            for line in f:
                if line.strip():
                    faqs.append(json.loads(line))
    
    # Load Documents
    doc_path = 'output/json/documents.jsonl'
    if os.path.exists(doc_path):
        with open(doc_path, 'r') as f:
            for line in f:
                if line.strip():
                    documents.append(json.loads(line))

    # Load Link Edges
    edge_path = 'output/json/link_edges.jsonl'
    if os.path.exists(edge_path):
        with open(edge_path, 'r') as f:
            for line in f:
                if line.strip():
                    edges.append(json.loads(line))
                    
    return pd.DataFrame(faqs), pd.DataFrame(documents), pd.DataFrame(edges)

try:
    df_faqs, df_docs, df_edges = load_data()
except Exception as e:
    st.error(f"Error loading data: {e}")
    st.stop()

if df_faqs.empty:
    st.warning("No FAQ data found in output/json/faq_items.jsonl")
    st.stop()

# --- Calculations ---
# External URLs in Sitemap
total_external_links = 0
if not df_edges.empty and 'is_external' in df_edges.columns:
    # Assuming is_external is 1 for external
    total_external_links = df_edges[df_edges['is_external'] == 1]['child_url'].nunique()

# External URLs in FAQs
def count_external_links_in_html(html_content):
    if not isinstance(html_content, str):
        return 0
    # Simple regex to find hrefs
    links = re.findall(r'href=[\'"](http[s]?://.*?)[\'"]', html_content)
    # Filter out internal domains (example.com)
    external = [l for l in links if 'example.com' not in l]
    return len(external)

faq_external_links_count = 0
if 'answer_raw_html' in df_faqs.columns:
    faq_external_links_count = df_faqs['answer_raw_html'].apply(count_external_links_in_html).sum()

# --- Key Metrics ---
st.subheader("Overview")
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric("Total FAQs", len(df_faqs))

with col2:
    st.metric("Total Pages Crawled", len(df_docs))

with col3:
    st.metric("Ext. URLs in Sitemap", total_external_links)

with col4:
    st.metric("Ext. URLs in FAQs", faq_external_links_count)

# Data Quality Row
col5, col6, col7, col8 = st.columns(4)

with col5:
    duplicate_count = len(df_faqs) - df_faqs['question_text'].nunique()
    st.metric("Duplicate FAQs", duplicate_count, help="Number of FAQs with identical questions")

with col6:
    if 'status' in df_docs.columns:
        failed_count = len(df_docs[df_docs['status'] != 'CRAWLED'])
        st.metric("Failed/Skipped Pages", failed_count, help="Pages that were not successfully crawled")
    else:
        st.metric("Failed Pages", 0)
        
with col7:
    # Empty Answers
    empty_answers = len(df_faqs[df_faqs['answer_text'].str.strip() == ''])
    st.metric("Empty Answers", empty_answers, help="FAQs with empty answer text")

st.divider()

# --- Answer Modes ---
st.subheader("Answer Mode Distribution")
if 'answer_mode' in df_faqs.columns:
    mode_counts = df_faqs['answer_mode'].value_counts().reset_index()
    mode_counts.columns = ['Mode', 'Count']
    fig_mode = px.pie(mode_counts, values='Count', names='Mode', title='FAQ Answer Types')
    st.plotly_chart(fig_mode, use_container_width=True)
else:
    st.info("No answer_mode data available.")

# --- Crawl Status ---
st.subheader("Crawl Status")
if not df_docs.empty and 'status' in df_docs.columns:
    status_counts = df_docs['status'].value_counts().reset_index()
    status_counts.columns = ['Status', 'Count']
    fig_status = px.bar(status_counts, x='Status', y='Count', title='Document Crawl Status')
    st.plotly_chart(fig_status, use_container_width=True)

# --- Data Explorer ---
st.subheader("FAQ Explorer")
search_term = st.text_input("Search FAQs", "")

if search_term:
    filtered_df = df_faqs[
        df_faqs['question_text'].str.contains(search_term, case=False, na=False) | 
        df_faqs['answer_text'].str.contains(search_term, case=False, na=False)
    ]
else:
    filtered_df = df_faqs

st.dataframe(filtered_df[['question_text', 'answer_text', 'answer_mode', 'document_url']], use_container_width=True)
