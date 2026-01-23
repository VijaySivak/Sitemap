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
