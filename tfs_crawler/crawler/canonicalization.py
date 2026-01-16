from urllib.parse import urlparse, urlunparse, urlencode, parse_qsl

def canonicalize_url(url: str) -> str:
    """
    Canonicalize URLs so these are treated as the same:
    - Trailing slash vs no slash (remove trailing slash)
    - Query parameter ordering (sort them)
    - Ignore URL fragments (#section)
    """
    if not url:
        return ""
    
    parsed = urlparse(url)
    
    # 1. Scheme and netloc to lowercase
    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()

    # Force www.toyotafinancial.com
    if netloc == 'toyotafinancial.com':
        netloc = 'www.toyotafinancial.com'
    
    # 2. Path: remove trailing slash
    path = parsed.path
    if path.endswith('/') and len(path) > 1:
        path = path[:-1]
    
    # 3. Query: sort parameters
    query = parsed.query
    if query:
        params = parse_qsl(query)
        params.sort(key=lambda x: x[0])
        query = urlencode(params)
    
    # 4. Fragment: remove
    fragment = ''
    
    # Reconstruct
    return urlunparse((scheme, netloc, path, parsed.params, query, fragment))

def get_domain(url: str) -> str:
    """Extract domain from URL."""
    return urlparse(url).netloc.lower()
