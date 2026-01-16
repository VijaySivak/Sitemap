from bs4 import BeautifulSoup
from sitemap_crawler.extractors.faq_extractor import FAQExtractor
from sitemap_crawler.extractors.document_extractor import DocumentExtractor

def test_faq_extraction_simple():
    html = """
    <html>
        <body>
            <div class="faq-container">
                <details>
                    <summary>What is Example?</summary>
                    <p>Example Financial Services.</p>
                </details>
            </div>
        </body>
    </html>
    """
    extractor = FAQExtractor()
    soup = BeautifulSoup(html, 'lxml')
    faqs = extractor.extract(soup, "http://test.com")
    
    assert len(faqs) == 1
    assert faqs[0]['question_text'] == "What is Example?"
    assert "Example Financial Services" in faqs[0]['answer_text']
    assert faqs[0]['answer_mode'] == "DIRECT_TEXT"

def test_faq_extraction_with_link():
    html = """
    <html>
        <body>
            <dl>
                <dt>How to login?</dt>
                <dd>Go to <a href="/login">Login</a> page.</dd>
            </dl>
        </body>
    </html>
    """
    extractor = FAQExtractor()
    soup = BeautifulSoup(html, 'lxml')
    faqs = extractor.extract(soup, "http://test.com")
    
    assert len(faqs) == 1
    assert faqs[0]['question_text'] == "How to login?"
    assert faqs[0]['answer_mode'] == "PORTAL_REDIRECT"

def test_faq_extraction_portal_mode():
    html = """
    <html>
        <body>
            <details>
                <summary>Login help</summary>
                <p>Click <a href="/login">here</a>.</p>
            </details>
        </body>
    </html>
    """
    extractor = FAQExtractor()
    soup = BeautifulSoup(html, 'lxml')
    faqs = extractor.extract(soup, "http://test.com")
    assert faqs[0]['answer_mode'] == "PORTAL_REDIRECT"

def test_faq_extraction_custom_structure():
    html = """
    <html>
        <body>
            <div class="col-sm-12">
                <p class="faq_ques_text bold">How do I obtain a username?</p>
                <div class="col-sm-12 faq-ans">
                    <p>You must be a registered account holder.</p>
                </div>
            </div>
        </body>
    </html>
    """
    extractor = FAQExtractor()
    soup = BeautifulSoup(html, 'lxml')
    faqs = extractor.extract(soup, "http://test.com")
    
    assert len(faqs) == 1
    assert faqs[0]['question_text'] == "How do I obtain a username?"
    assert "registered account holder" in faqs[0]['answer_text']

def test_document_extraction_markdown(config):
    html = """
    <html>
        <head><title>Test Page</title></head>
        <body>
            <main>
                <h1>Welcome</h1>
                <p>This is a paragraph.</p>
                <ul>
                    <li>Item 1</li>
                </ul>
            </main>
            <footer>Footer content</footer>
        </body>
    </html>
    """
    extractor = DocumentExtractor(config)
    result = extractor.extract_content(html, "http://test.com")
    
    assert result['title'] == "Test Page"
    assert "Welcome" in result['extracted_text']
    assert "Footer content" not in result['extracted_text'] # Should prioritize main
    assert "# Welcome" in result['markdown_content']
    # Markdownify can use * or - for lists
    assert "- Item 1" in result['markdown_content'] or "* Item 1" in result['markdown_content']
