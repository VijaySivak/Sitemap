import requests

# Test all APIs used by BusinessMetrics page
endpoints = [
    '/api/business-metrics',
    '/api/pdf-analysis', 
    '/api/external-forms',
    '/api/buried-page-paths'
]

for endpoint in endpoints:
    try:
        r = requests.get(f'http://localhost:8000{endpoint}', timeout=10)
        print(f"✓ {endpoint}: {r.status_code}")
    except Exception as e:
        print(f"✗ {endpoint}: {e}")
