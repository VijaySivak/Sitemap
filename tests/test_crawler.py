import pytest
from unittest.mock import MagicMock, patch
from tfs_crawler.crawler.engine import Crawler
from tfs_crawler.crawler.robots import RobotsParser
from tfs_crawler.storage.sqlite_store import SqliteStore

@pytest.fixture
def mock_fetcher():
    with patch('tfs_crawler.crawler.engine.Fetcher') as MockFetcher:
        fetcher_instance = MockFetcher.return_value
        fetcher_instance.fetch.return_value = (MagicMock(status_code=200, text="<html></html>", headers={'Content-Type': 'text/html'}), None)
        yield fetcher_instance

@pytest.fixture
def mock_robots():
    with patch('tfs_crawler.crawler.engine.RobotsParser') as MockRobots:
        robots_instance = MockRobots.return_value
        robots_instance.can_fetch.return_value = True
        yield robots_instance

def test_crawler_initialization(config, store):
    crawler = Crawler(config)
    
    # Mock run_loop to prevent actual processing
    with patch.object(crawler, 'run_loop') as mock_loop:
        crawler.start()
        
        # Check seed is queued
        queue_item = store.get_next_url()
        assert queue_item is not None
        assert queue_item['url'] == config['seed_urls'][0]
        assert queue_item['depth'] == 0
        
        # Verify loop was called
        mock_loop.assert_called_once()

def test_robots_blocking(config, store, mock_fetcher):
    # Setup crawler with mocked robots that blocks everything
    with patch('tfs_crawler.crawler.engine.RobotsParser') as MockRobots:
        robots = MockRobots.return_value
        robots.can_fetch.return_value = False
        
        crawler = Crawler(config)
        crawler.process_url("https://toyotafinancial.com/blocked", 1, None)
        
        doc = store.get_document("https://toyotafinancial.com/blocked")
        assert doc['status'] == 'BLOCKED_BY_ROBOTS'
        
        # Ensure fetcher was NOT called
        mock_fetcher.fetch.assert_not_called()

def test_domain_restriction(config, store, mock_fetcher, mock_robots):
    crawler = Crawler(config)
    # External URL
    url = "https://google.com/search"
    crawler.process_url(url, 1, None)
    
    # Should not be in documents table as it should be skipped before fetch
    # Actually code says: "Skipping external domain: {url}" and returns. 
    # Does not insert into documents? 
    # "External links must never be fetched."
    # "All external URLs encountered are recorded with anchor text + source page." (This happens at edge discovery time)
    # If process_url is called with external URL (e.g. from queue if it got there by mistake), it should skip.
    
    doc = store.get_document(url)
    assert doc is None 
    mock_fetcher.fetch.assert_not_called()

def test_excluded_sections(config, store, mock_fetcher, mock_robots):
    crawler = Crawler(config)
    url = "https://toyotafinancial.com/us/en/accounts/login"
    crawler.process_url(url, 1, None)
    
    doc = store.get_document(url)
    assert doc['status'] == 'SKIPPED_BY_POLICY'
    mock_fetcher.fetch.assert_not_called()

def test_depth_enforcement_general(config, store, mock_fetcher, mock_robots):
    # Config has max_depth_general = 3
    crawler = Crawler(config)
    
    # Process a page at depth 3 (General)
    # It should NOT queue children at depth 4
    
    # Mock response with links
    mock_response = MagicMock(status_code=200, text="""
        <html>
            <body>
                <a href="https://toyotafinancial.com/depth4">Link</a>
            </body>
        </html>
    """, headers={'Content-Type': 'text/html'})
    mock_fetcher.fetch.return_value = (mock_response, None)
    
    crawler.process_url("https://toyotafinancial.com/depth3", 3, None)
    
    # Check if child was queued
    # Logic: next_depth = depth + 1 = 4. 
    # effective_limit = 3 (since not FAQ page).
    # 4 <= 3 is False. Should not queue.
    
    assert not store.is_url_visited_or_queued("https://toyotafinancial.com/depth4")

def test_depth_enforcement_faq_context(config, store, mock_fetcher, mock_robots):
    # Config has max_depth_faq = 6
    crawler = Crawler(config)
    
    # Process a page at depth 3 that HAS FAQs
    mock_response = MagicMock(status_code=200, text="""
        <html>
            <body>
                <details><summary>Q</summary>A</details>
                <a href="https://toyotafinancial.com/depth4">Link</a>
            </body>
        </html>
    """, headers={'Content-Type': 'text/html'})
    mock_fetcher.fetch.return_value = (mock_response, None)
    
    crawler.process_url("https://toyotafinancial.com/depth3_faq", 3, None)
    
    # Logic: is_faq_page = True. effective_limit = 6.
    # next_depth = 4. 4 <= 6 is True. Should queue.
    
    assert store.is_url_visited_or_queued("https://toyotafinancial.com/depth4")

def test_resumability(config, store):
    # Add items to queue
    store.queue_url("https://toyotafinancial.com/pending1", 1)
    store.queue_url("https://toyotafinancial.com/pending2", 1)
    
    # Initialize crawler
    crawler = Crawler(config)
    
    # Check if it picks up from queue
    item = store.get_next_url()
    assert item['url'] in ["https://toyotafinancial.com/pending1", "https://toyotafinancial.com/pending2"]

