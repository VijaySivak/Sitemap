const DATA_BASE_URL = '/data';

export interface Stats {
  overview: {
    totalPages: number;
    totalFaqs: number;
    totalExternalLinks: number;
  };
  statusDistribution: { name: string; value: number }[];
  answerModes: { name: string; value: number }[];
}

export interface FAQ {
  id: number;
  question_text: string;
  answer_text: string;
  answer_mode: string;
  document_url: string;
}

export interface Page {
  url: string;
  status: string;
  content_type: string;
  crawled_at: string;
}

export interface ExternalStats {
  total_unique_domains: number;
  faq_unique_domains: number;
  top_domains: { domain: string; count: number }[];
  sensitive_domains: string[];
}

export interface RedundantItem {
  content_snippet: string;
  full_content: string;
  occurrences: number;
  source_urls: string[];
}

export interface RedundantContentStats {
  total_redundant_blocks: number;
  items: RedundantItem[];
}

export interface BusinessMetrics {
  content_health: {
    total_pages: number;
    successful_crawls: number;
    broken_pages: number;
    fetch_errors: number;
    blocked_by_robots: number;
    health_score: number;
  };
  navigation: {
    depth_distribution: { depth: number; count: number }[];
    deep_pages_count: number;
    orphan_pages: number;
  };
  faq_quality: {
    total_faqs: number;
    self_service_rate: number;
    direct_text_count: number;
    escalation_count: number;
    short_answers: number;
    pages_without_faqs: number;
    answer_modes: Record<string, number>;
  };
  dependencies: {
    pdf_count: number;
    pdf_pages: number;
    external_heavy_pages: { url: string; external_links: number }[];
  };
  issues: {
    broken_links: { url: string; status: string; depth: number }[];
  };
}

export const fetchStats = async (): Promise<Stats> => {
  const response = await fetch(`${DATA_BASE_URL}/stats.json`);
  return response.json();
};

export const fetchExternalStats = async (): Promise<ExternalStats> => {
  const response = await fetch(`${DATA_BASE_URL}/external-stats.json`);
  return response.json();
};

export const fetchFaqs = async (search: string = ''): Promise<FAQ[]> => {
  const response = await fetch(`${DATA_BASE_URL}/faqs.json`);
  const faqs: FAQ[] = await response.json();
  
  if (!search) return faqs;
  
  const searchLower = search.toLowerCase();
  return faqs.filter(faq => 
    faq.question_text.toLowerCase().includes(searchLower) ||
    faq.answer_text.toLowerCase().includes(searchLower)
  );
};

export const getFaqsExportUrl = () => `${DATA_BASE_URL}/faqs.json`;

export const fetchPages = async (): Promise<Page[]> => {
  return [];
};

export const fetchRedundantContent = async (): Promise<RedundantContentStats> => {
  const response = await fetch(`${DATA_BASE_URL}/redundant-content.json`);
  return response.json();
};

export const fetchBusinessMetrics = async (): Promise<BusinessMetrics> => {
  const response = await fetch(`${DATA_BASE_URL}/business-metrics.json`);
  return response.json();
};

export interface MetricUrlItem {
  url: string;
  extra?: string;
}

export interface MetricUrlsResponse {
  urls: MetricUrlItem[];
  count: number;
}

export const fetchMetricUrls = async (_metricType: string, _filterValue?: string): Promise<MetricUrlsResponse> => {
  return { urls: [], count: 0 };
};

export interface PdfAnalysis {
  total_pdfs: number;
  form_filling: {
    count: number;
    percentage: number;
    urls: { url: string; keyword_matches: number }[];
  };
  informational: {
    count: number;
    percentage: number;
    urls: { url: string; keyword_matches: number }[];
  };
}

export const fetchPdfAnalysis = async (): Promise<PdfAnalysis> => {
  const response = await fetch(`${DATA_BASE_URL}/pdf-analysis.json`);
  return response.json();
};

export const fetchExternalDomainUrls = async (_domain: string): Promise<MetricUrlsResponse> => {
  return { urls: [], count: 0 };
};
