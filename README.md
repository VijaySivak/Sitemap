# TFS Crawler

A specialized web crawler for Toyota Financial Services (TFS) that extracts content, FAQs, and assets from the sitemap.

## Features

- **Focused Crawling**: Starts exclusively from the TFS sitemap.
- **Strict Compliance**: Respects `robots.txt`, domain boundaries, and policy exclusions (Accounts, Payments, Investor Relations).
- **Smart Traversal**:
  - **FAQ Pages**: Deep traversal (up to depth 6) to capture all Q&A.
  - **General Pages**: Shallow traversal (up to depth 3) for main content.
- **Artifact Preservation**: Saves raw HTML, Markdown conversions, PDFs, and Videos.
- **Resumable**: Persists crawl state in SQLite; can be interrupted and resumed without losing progress.
- **Data Export**: Exports structured data to SQLite and JSONL formats.

## Quick Start

### Prerequisites

- Python 3.8+
- `pip`

### Installation

1. Clone the repository.
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Crawler

To start the crawl using the default configuration:

```bash
python -m tfs_crawler crawl --config config.yaml
```

To export the data to JSONL after crawling:

```bash
python -m tfs_crawler export --config config.yaml
```

To validate the configuration:

```bash
python -m tfs_crawler validate --config config.yaml
```

## Configuration

The behavior is controlled by `config.yaml`. See `example_config.yaml` for a template.

### Key Configuration Options

- **`seed_urls`**: Must contain only the sitemap URL.
- **`max_depth_faq`**: Max depth for FAQ-related traversal (default: 6).
- **`max_depth_general`**: Max depth for general content (default: 3).
- **`allowed_domains`**: Restricts crawling to specific domains.
- **`output_directories`**: Paths for storing artifacts and database.
- **`excluded_sitemap_sections`**: Keywords to identify sections to skip (e.g., "Accounts").

### Cloud Deployment

To deploy to cloud environments (GCP/AWS):
1. Update `output_directories` in `config.yaml` to point to mounted volumes or ephemeral paths (if uploading to S3/GCS post-crawl).
2. Ensure the VM/Container has write access to the output paths.
3. Run the CLI command as the entrypoint.

## Output Structure

The crawler produces the following structure:

```
artifacts/
  ├── html/          # Raw HTML files
  ├── md/            # HTML converted to Markdown
  ├── pdf/           # Downloaded PDFs
  ├── pdf_text/      # Extracted text from PDFs
  ├── video/         # Downloaded video/audio files
  └── transcripts/   # Video transcripts (if available)

output/
  ├── tfs_crawler.sqlite  # Authoritative SQLite Registry
  └── json/               # JSONL Exports
      ├── documents.jsonl
      ├── faq_items.jsonl
      ├── link_edges.jsonl
      ├── assets.jsonl
      ├── external_urls.json
      └── external_domains.json
```

## Resumability

The crawler automatically saves its state (queue and visited set) to the SQLite database. 
- If the process is interrupted (Ctrl+C or crash), simply run the `crawl` command again.
- It will pick up exactly where it left off, skipping already visited URLs.
- To restart from scratch, delete the `output/tfs_crawl.sqlite` file and the `artifacts/` directory.

## Tests

Run the unit test suite:

```bash
pytest tests
```
