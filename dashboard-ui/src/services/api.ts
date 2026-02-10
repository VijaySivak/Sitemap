import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

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
  const response = await axios.get(`${API_BASE_URL}/stats`);
  return response.data;
};

export const fetchExternalStats = async (): Promise<ExternalStats> => {
  const response = await axios.get(`${API_BASE_URL}/external-stats`);
  return response.data;
};

export const fetchFaqs = async (search: string = ''): Promise<FAQ[]> => {
  const response = await axios.get(`${API_BASE_URL}/faqs`, { params: { search, limit: 1000 } });
  return response.data;
};

export const getFaqsExportUrl = () => `${API_BASE_URL}/faqs/export`;

export const fetchPages = async (): Promise<Page[]> => {
  const response = await axios.get(`${API_BASE_URL}/pages`);
  return response.data;
};

export const fetchRedundantContent = async (): Promise<RedundantContentStats> => {
  const response = await axios.get(`${API_BASE_URL}/redundant-content`);
  return response.data;
};

export const fetchBusinessMetrics = async (): Promise<BusinessMetrics> => {
  const response = await axios.get(`${API_BASE_URL}/business-metrics`);
  return response.data;
};

export interface MetricUrlItem {
  url: string;
  extra?: string;
}

export interface MetricUrlsResponse {
  urls: MetricUrlItem[];
  count: number;
}

export const fetchMetricUrls = async (metricType: string, filterValue?: string): Promise<MetricUrlsResponse> => {
  const params: Record<string, string> = {};
  if (filterValue) params.filter_value = filterValue;
  const response = await axios.get(`${API_BASE_URL}/metric-urls/${metricType}`, { params });
  return response.data;
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
  const response = await axios.get(`${API_BASE_URL}/pdf-analysis`);
  return response.data;
};

export const fetchExternalDomainUrls = async (domain: string): Promise<MetricUrlsResponse> => {
  const response = await axios.get(`${API_BASE_URL}/external-domain-urls/${encodeURIComponent(domain)}`);
  return response.data;
};

export interface ExternalFormUrl {
  url: string;
  source_page: string;
  type: string;
}

export interface ExternalFormsData {
  total_external_urls: number;
  form_pattern_urls: {
    count: number;
    urls: ExternalFormUrl[];
  };
  external_pdfs: {
    count: number;
    urls: ExternalFormUrl[];
  };
  total_potential_forms: number;
}

export const fetchExternalForms = async (): Promise<ExternalFormsData> => {
  const response = await axios.get(`${API_BASE_URL}/external-forms`);
  return response.data;
};
