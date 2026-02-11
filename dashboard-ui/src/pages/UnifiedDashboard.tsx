import { useEffect, useState, useRef } from 'react';
import { 
  FileText, Globe, MessageCircle, Shield, Download, ExternalLink, Copy, 
  CheckCircle, Layers, FileWarning, Phone,
  ArrowRight, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { 
  fetchStats, fetchFaqs, fetchExternalStats, fetchRedundantContent, 
  getFaqsExportUrl, fetchExternalDomainUrls, fetchBusinessMetrics, 
  fetchMetricUrls, fetchPdfAnalysis, fetchExternalForms, fetchBuriedPagePaths 
} from '../services/api';
import type { 
  Stats, FAQ, ExternalStats, RedundantContentStats, MetricUrlItem,
  BusinessMetrics, PdfAnalysis, ExternalFormsData, BuriedPagePathsData 
} from '../services/api';
import { DashboardChart } from '../components/DashboardChart';
import { UrlListModal } from '../components/UrlListModal';

interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  accentColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

function UnifiedDashboard() {
  // Data states
  const [stats, setStats] = useState<Stats | null>(null);
  const [externalStats, setExternalStats] = useState<ExternalStats | null>(null);
  const [redundantContent, setRedundantContent] = useState<RedundantContentStats | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null);
  const [pdfAnalysis, setPdfAnalysis] = useState<PdfAnalysis | null>(null);
  const [externalForms, setExternalForms] = useState<ExternalFormsData | null>(null);
  const [buriedPaths, setBuriedPaths] = useState<BuriedPagePathsData | null>(null);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalUrls, setModalUrls] = useState<MetricUrlItem[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, faqsData, extData, redundantData, bizMetrics, pdfData, extForms, buriedData] = await Promise.all([
          fetchStats(),
          fetchFaqs(),
          fetchExternalStats(),
          fetchRedundantContent(),
          fetchBusinessMetrics(),
          fetchPdfAnalysis(),
          fetchExternalForms(),
          fetchBuriedPagePaths()
        ]);
        setStats(statsData);
        setFaqs(faqsData);
        setExternalStats(extData);
        setRedundantContent(redundantData);
        setBusinessMetrics(bizMetrics);
        setPdfAnalysis(pdfData);
        setExternalForms(extForms);
        setBuriedPaths(buriedData);
      } catch (err) {
        setError('Failed to load dashboard data. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Build metric cards
  const metricCards: MetricCard[] = stats && businessMetrics && externalStats ? [
    {
      id: 'total_pages',
      title: 'Total Pages',
      value: stats.overview.totalPages,
      subtitle: 'Pages crawled',
      accentColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      icon: <FileText className="w-7 h-7 text-blue-600" />
    },
    {
      id: 'total_faqs',
      title: 'Total FAQs',
      value: stats.overview.totalFaqs,
      subtitle: 'Questions found',
      accentColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      icon: <MessageCircle className="w-7 h-7 text-indigo-600" />
    },
    {
      id: 'health_score',
      title: 'Health Score',
      value: `${businessMetrics.content_health.health_score}%`,
      subtitle: `${businessMetrics.content_health.successful_crawls} successful`,
      accentColor: businessMetrics.content_health.health_score >= 80 ? 'text-green-600' : 'text-red-600',
      iconBg: businessMetrics.content_health.health_score >= 80 ? 'bg-green-100' : 'bg-red-100',
      icon: <CheckCircle className={`w-7 h-7 ${businessMetrics.content_health.health_score >= 80 ? 'text-green-600' : 'text-red-600'}`} />
    },
    {
      id: 'self_service_rate',
      title: 'Self-Service Rate',
      value: `${businessMetrics.faq_quality.self_service_rate}%`,
      subtitle: `${businessMetrics.faq_quality.direct_text_count} direct answers`,
      accentColor: businessMetrics.faq_quality.self_service_rate >= 70 ? 'text-green-600' : 'text-amber-600',
      iconBg: businessMetrics.faq_quality.self_service_rate >= 70 ? 'bg-green-100' : 'bg-amber-100',
      icon: <CheckCircle className={`w-7 h-7 ${businessMetrics.faq_quality.self_service_rate >= 70 ? 'text-green-600' : 'text-amber-600'}`} />
    },
    {
      id: 'external_domains',
      title: 'External Domains',
      value: externalStats.total_unique_domains,
      subtitle: 'Unique domains',
      accentColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      icon: <Globe className="w-7 h-7 text-emerald-600" />
    },
    {
      id: 'external_urls',
      title: 'External URLs',
      value: externalForms?.total_external_urls || 0,
      subtitle: 'Distinct links',
      accentColor: 'text-cyan-600',
      iconBg: 'bg-cyan-100',
      icon: <ExternalLink className="w-7 h-7 text-cyan-600" />
    },
    {
      id: 'escalation_faqs',
      title: 'Escalation FAQs',
      value: businessMetrics.faq_quality.escalation_count,
      subtitle: 'Require phone/portal',
      accentColor: 'text-red-600',
      iconBg: 'bg-red-100',
      icon: <Phone className="w-7 h-7 text-red-600" />
    },
    {
      id: 'buried_pages',
      title: 'Buried Pages',
      value: buriedPaths?.total_buried_pages || businessMetrics.navigation.deep_pages_count,
      subtitle: 'Depth > 3',
      accentColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      icon: <Layers className="w-7 h-7 text-purple-600" />
    },
    {
      id: 'pdf_count',
      title: 'PDF Documents',
      value: businessMetrics.dependencies.pdf_count,
      subtitle: pdfAnalysis ? `${pdfAnalysis.form_filling.count} form-filling` : 'Analyzed',
      accentColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      icon: <FileWarning className="w-7 h-7 text-orange-600" />
    },
    {
      id: 'redundant_content',
      title: 'Duplicate Content',
      value: redundantContent?.items.length || 0,
      subtitle: `${redundantContent?.total_redundant_blocks || 0} total occurrences`,
      accentColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      icon: <Copy className="w-7 h-7 text-amber-600" />
    },
    {
      id: 'short_answers',
      title: 'Short Answers',
      value: businessMetrics.faq_quality.short_answers,
      subtitle: '< 100 characters',
      accentColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      icon: <MessageCircle className="w-7 h-7 text-orange-600" />
    }
  ] : [];

  const visibleCards = 4;
  const cardWidth = 100 / visibleCards; // Each card takes 25% width
  const maxIndex = Math.max(0, metricCards.length - visibleCards);

  // Auto-slide carousel every 3 seconds, skip 2 cards at once
  useEffect(() => {
    if (isPaused || metricCards.length === 0) return;
    const maxIdx = Math.max(0, metricCards.length - visibleCards);
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const next = prev + 2;
        return next > maxIdx ? 0 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, metricCards.length, visibleCards]);

  const handleMetricClick = async (metricId: string) => {
    const newValue = expandedDetail === metricId ? null : metricId;
    setExpandedDetail(newValue);
    // Scroll to detail view after a short delay
    if (newValue) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const openUrlModal = async (title: string, description: string, metricType: string, filterValue?: string) => {
    setModalTitle(title);
    setModalDescription(description);
    setModalOpen(true);
    setModalLoading(true);
    setModalUrls([]);
    
    try {
      const response = await fetchMetricUrls(metricType, filterValue);
      setModalUrls(response.urls);
    } catch (err) {
      console.error('Failed to load URLs:', err);
    } finally {
      setModalLoading(false);
    }
  };

  const openDomainModal = async (domain: string, count: number) => {
    setModalTitle(`External Links to ${domain}`);
    setModalDescription(`${count} distinct URLs found`);
    setModalOpen(true);
    setModalLoading(true);
    setModalUrls([]);
    
    try {
      const response = await fetchExternalDomainUrls(domain);
      setModalUrls(response.urls);
    } catch (err) {
      console.error('Failed to load domain URLs:', err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await fetchFaqs(searchTerm);
      setFaqs(results);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-red-500 font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">CX Insights Dashboard</h1>
            <p className="text-slate-500 mt-1">Website health analysis and content metrics</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            System Online
          </span>
        </header>

        {/* Sliding Metric Cards Carousel */}
        <div 
          className="relative px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          {metricCards.length > visibleCards && (
            <>
              <button
                onClick={() => setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-blue-50 hover:scale-110 transition-all border border-slate-200"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <button
                onClick={() => setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-blue-50 hover:scale-110 transition-all border border-slate-200"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden rounded-2xl py-2">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${carouselIndex * cardWidth}%)` }}
            >
              {metricCards.map((metric) => (
                <div
                  key={metric.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${cardWidth}%` }}
                >
                  <button
                    onClick={() => handleMetricClick(metric.id)}
                    className={`w-full h-full p-6 rounded-2xl bg-white border-2 
                      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left
                      ${expandedDetail === metric.id ? 'border-blue-500 shadow-xl shadow-blue-100' : 'border-slate-100 shadow-lg'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl ${metric.iconBg}`}>
                        {metric.icon}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Details →</span>
                    </div>
                    <h3 className="font-medium text-slate-500 text-sm mb-1">{metric.title}</h3>
                    <p className={`text-4xl font-bold ${metric.accentColor} mb-1`}>{metric.value}</p>
                    {metric.subtitle && (
                      <p className="text-xs text-slate-400">{metric.subtitle}</p>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar + Dots */}
          {metricCards.length > visibleCards && (
            <div className="mt-6 flex flex-col items-center gap-3">
              {/* Auto-slide progress bar */}
              <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-blue-500 transition-all ${isPaused ? '' : 'animate-pulse'}`}
                  style={{ width: `${((carouselIndex + 1) / (maxIndex + 1)) * 100}%` }}
                />
              </div>
              {/* Dot indicators */}
              <div className="flex justify-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === carouselIndex ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Insights Summary */}
        {businessMetrics && stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Website Health Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Website Health
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Crawl Success Rate</span>
                  <span className={`font-bold ${businessMetrics.content_health.health_score >= 90 ? 'text-green-600' : businessMetrics.content_health.health_score >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                    {businessMetrics.content_health.health_score}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${businessMetrics.content_health.health_score >= 90 ? 'bg-green-500' : businessMetrics.content_health.health_score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${businessMetrics.content_health.health_score}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>{businessMetrics.content_health.successful_crawls} successful</span>
                  <span>{businessMetrics.content_health.broken_pages} broken</span>
                </div>
              </div>
            </div>

            {/* FAQ Quality Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-500" />
                FAQ Quality
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Self-Service Rate</span>
                  <span className={`font-bold ${businessMetrics.faq_quality.self_service_rate >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
                    {businessMetrics.faq_quality.self_service_rate}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${businessMetrics.faq_quality.self_service_rate >= 70 ? 'bg-green-500' : 'bg-amber-500'}`}
                    style={{ width: `${businessMetrics.faq_quality.self_service_rate}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>{businessMetrics.faq_quality.direct_text_count} direct answers</span>
                  <span>{businessMetrics.faq_quality.escalation_count} escalations</span>
                </div>
              </div>
            </div>

            {/* Navigation Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-500" />
                Navigation Depth
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Avg. Depth</span>
                  <span className="font-bold text-purple-600">
                    {(businessMetrics.navigation.depth_distribution.reduce((sum, d) => sum + d.depth * d.count, 0) / 
                      Math.max(1, businessMetrics.navigation.depth_distribution.reduce((sum, d) => sum + d.count, 0))).toFixed(1)} clicks
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <span className="block font-bold text-green-700">{businessMetrics.navigation.depth_distribution.filter(d => d.depth <= 2).reduce((sum, d) => sum + d.count, 0)}</span>
                    <span className="text-green-600">Easy Access</span>
                  </div>
                  <div className="bg-purple-50 p-2 rounded text-center">
                    <span className="block font-bold text-purple-700">{buriedPaths?.total_buried_pages || businessMetrics.navigation.deep_pages_count}</span>
                    <span className="text-purple-600">Buried Pages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expanded Detail View */}
        {expandedDetail && (
          <div ref={detailRef} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                {metricCards.find(m => m.id === expandedDetail)?.title} - Details
              </h2>
              <button 
                onClick={() => setExpandedDetail(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Detail content based on metric type */}
            {expandedDetail === 'external_domains' && externalStats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">Top 10 External Domains</h3>
                  <ul className="space-y-2">
                    {externalStats.top_domains.map((item, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => openDomainModal(item.domain, item.count)}
                          className="w-full flex justify-between items-center p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors text-left"
                        >
                          <span className="text-blue-600 font-medium truncate flex-1 hover:underline">{item.domain}</span>
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-sm font-semibold">{item.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Sensitive Domains
                  </h3>
                  {externalStats.sensitive_domains.length > 0 ? (
                    <ul className="space-y-2">
                      {externalStats.sensitive_domains.map((domain, idx) => (
                        <li key={idx} className="p-2 bg-red-50 border border-red-100 rounded text-red-700 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          {domain}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-400 text-sm">No sensitive domains detected</p>
                  )}
                </div>
              </div>
            )}

            {expandedDetail === 'redundant_content' && redundantContent && (
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Redundant Content Blocks</h3>
                <div className="max-h-[300px] overflow-y-auto space-y-3">
                  {redundantContent.items.slice(0, 15).map((item, idx) => (
                    <div key={idx} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <div className="flex justify-between items-start gap-3">
                        <p className="text-sm text-slate-700 flex-1 line-clamp-2">{item.content_snippet}</p>
                        <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                          {item.occurrences} times
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expandedDetail === 'total_pages' && stats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardChart
                  title="Document Status Distribution"
                  data={stats.statusDistribution}
                  type="bar"
                />
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">Navigation Depth</h3>
                  {businessMetrics && (
                    <DashboardChart
                      title="Navigation Depth Distribution"
                      data={businessMetrics.navigation.depth_distribution.map(d => ({
                        name: `Depth ${d.depth}`,
                        value: d.count
                      }))}
                      type="bar"
                    />
                  )}
                </div>
              </div>
            )}

            {expandedDetail === 'total_faqs' && stats && businessMetrics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardChart
                  title="FAQ Answer Types"
                  data={stats.answerModes}
                  type="pie"
                />
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-700">FAQ Quality Breakdown</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">{businessMetrics.faq_quality.direct_text_count}</p>
                      <p className="text-xs text-green-700">Direct Answers</p>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-600">{businessMetrics.faq_quality.escalation_count}</p>
                      <p className="text-xs text-red-700">Escalations</p>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-center">
                      <p className="text-2xl font-bold text-amber-600">{businessMetrics.faq_quality.short_answers}</p>
                      <p className="text-xs text-amber-700">Short Answers</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{businessMetrics.faq_quality.self_service_rate}%</p>
                      <p className="text-xs text-blue-700">Self-Service Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {expandedDetail === 'buried_pages' && buriedPaths && (
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Buried Pages - Navigation Paths</h3>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-100">
                  {buriedPaths.pages.map((page, idx) => (
                    <div key={idx} className="py-4">
                      <div className="flex items-start justify-between mb-2">
                        <a 
                          href={page.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm font-medium truncate max-w-lg"
                        >
                          {page.url.replace('https://www.toyotafinancial.com', '...')}
                        </a>
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded ml-2">
                          Depth {page.depth}
                        </span>
                      </div>
                      {page.paths.length > 0 ? (
                        <div className="space-y-2">
                          {page.paths.slice(0, expandedPath === `path-${idx}` ? undefined : 1).map((path, pathIdx) => (
                            <div key={pathIdx} className="flex items-center flex-wrap gap-1 text-xs">
                              {path.map((url, urlIdx) => (
                                <span key={urlIdx} className="flex items-center">
                                  <span 
                                    className={`px-2 py-1 rounded ${urlIdx === 0 ? 'bg-green-100 text-green-700' : urlIdx === path.length - 1 ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}
                                  >
                                    {url.replace('https://www.toyotafinancial.com', '').substring(0, 25) || '/'}
                                  </span>
                                  {urlIdx < path.length - 1 && <ArrowRight className="w-3 h-3 text-slate-400 mx-1" />}
                                </span>
                              ))}
                            </div>
                          ))}
                          {page.paths.length > 1 && (
                            <button 
                              onClick={() => setExpandedPath(expandedPath === `path-${idx}` ? null : `path-${idx}`)}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {expandedPath === `path-${idx}` ? 'Show less' : `+${page.paths.length - 1} more paths`}
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No path traced</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expandedDetail === 'pdf_count' && pdfAnalysis && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">Form-Filling PDFs ({pdfAnalysis.form_filling.count})</h3>
                  <div className="max-h-[250px] overflow-y-auto space-y-2">
                    {pdfAnalysis.form_filling.urls.map((pdf, idx) => (
                      <a key={idx} href={pdf.url} target="_blank" rel="noopener noreferrer" 
                        className="block p-2 bg-purple-50 rounded text-sm text-blue-600 hover:underline truncate">
                        {pdf.url.split('/').pop()}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">
                    Informational PDFs ({[...new Set(pdfAnalysis.informational.urls.map(p => p.url))].length} unique)
                  </h3>
                  <p className="text-xs text-slate-400 mb-2">Note: {pdfAnalysis.informational.count} total references, showing unique URLs</p>
                  <div className="max-h-[250px] overflow-y-auto space-y-2">
                    {[...new Set(pdfAnalysis.informational.urls.map(p => p.url))].map((url, idx) => (
                      <a key={idx} href={url} target="_blank" rel="noopener noreferrer" 
                        className="block p-2 bg-blue-50 rounded text-sm text-blue-600 hover:underline truncate">
                        {url.split('/').pop()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {expandedDetail === 'escalation_faqs' && businessMetrics && (
              <div>
                <button
                  onClick={() => openUrlModal('Escalation FAQs', `${businessMetrics.faq_quality.escalation_count} FAQs require escalation`, 'escalation_faqs')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Escalation FAQs
                </button>
              </div>
            )}

            {expandedDetail === 'self_service_rate' && businessMetrics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardChart
                  title="FAQ Answer Mode Breakdown"
                  data={Object.entries(businessMetrics.faq_quality.answer_modes).map(([name, value]) => ({ name, value }))}
                  type="pie"
                />
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                    <h4 className="font-semibold text-green-800">Direct Text Answers</h4>
                    <p className="text-2xl font-bold text-green-600">{businessMetrics.faq_quality.direct_text_count}</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                    <h4 className="font-semibold text-red-800">Escalation Required</h4>
                    <p className="text-2xl font-bold text-red-600">{businessMetrics.faq_quality.escalation_count}</p>
                  </div>
                </div>
              </div>
            )}

            {expandedDetail === 'external_urls' && businessMetrics && externalForms && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">Top 10 Pages with Most External Links</h3>
                  <div className="max-h-[300px] overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Page URL</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Links</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {businessMetrics.dependencies.external_heavy_pages.map((page, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-4 py-2 text-sm truncate max-w-md">
                              <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {page.url}
                              </a>
                            </td>
                            <td className="px-4 py-2">
                              <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">{page.external_links}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">All Distinct External URLs</h3>
                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-cyan-50 border border-cyan-100 rounded-lg text-center">
                      <p className="text-2xl font-bold text-cyan-600">{externalForms.total_external_urls}</p>
                      <p className="text-xs text-cyan-700">Total Distinct URLs</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openUrlModal('All External URLs', `${externalForms.total_external_urls} distinct external URLs`, 'external_urls')}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View All {externalForms.total_external_urls} External URLs
                  </button>
                </div>
              </div>
            )}

            {expandedDetail === 'health_score' && businessMetrics && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <button onClick={() => openUrlModal('Successful Crawls', `${businessMetrics.content_health.successful_crawls} pages`, 'successful_crawls')}
                  className="p-4 bg-green-50 border border-green-100 rounded-lg hover:bg-green-100 transition-colors text-left">
                  <h4 className="font-semibold text-green-800">Successful</h4>
                  <p className="text-2xl font-bold text-green-600">{businessMetrics.content_health.successful_crawls}</p>
                </button>
                <button onClick={() => openUrlModal('Fetch Errors', `${businessMetrics.content_health.fetch_errors} pages`, 'fetch_errors')}
                  className="p-4 bg-amber-50 border border-amber-100 rounded-lg hover:bg-amber-100 transition-colors text-left">
                  <h4 className="font-semibold text-amber-800">Fetch Errors</h4>
                  <p className="text-2xl font-bold text-amber-600">{businessMetrics.content_health.fetch_errors}</p>
                </button>
                <button onClick={() => openUrlModal('Blocked by Robots', `${businessMetrics.content_health.blocked_by_robots} pages`, 'blocked_by_robots')}
                  className="p-4 bg-orange-50 border border-orange-100 rounded-lg hover:bg-orange-100 transition-colors text-left">
                  <h4 className="font-semibold text-orange-800">Blocked</h4>
                  <p className="text-2xl font-bold text-orange-600">{businessMetrics.content_health.blocked_by_robots}</p>
                </button>
              </div>
            )}

            {expandedDetail === 'short_answers' && (
              <button
                onClick={() => openUrlModal('Short FAQ Answers', `FAQs with answers under 100 characters`, 'short_answers')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Short Answers
              </button>
            )}
          </div>
        )}

        {/* Actionable Recommendations - Below Drilldown */}
        {businessMetrics && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">🎯 Priority Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {businessMetrics.faq_quality.escalation_count > 5 && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold text-amber-800">Reduce Escalations</span>
                  </div>
                  <p className="text-sm text-amber-700">{businessMetrics.faq_quality.escalation_count} FAQs need phone/portal</p>
                  <p className="text-xs text-amber-500 mt-1">Impact: Cost Savings</p>
                </div>
              )}
              {businessMetrics.navigation.deep_pages_count > 5 && (
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-purple-800">Flatten Navigation</span>
                  </div>
                  <p className="text-sm text-purple-700">{buriedPaths?.total_buried_pages || businessMetrics.navigation.deep_pages_count} pages buried deep</p>
                  <p className="text-xs text-purple-500 mt-1">Impact: Discoverability</p>
                </div>
              )}
              {businessMetrics.dependencies.pdf_count > 5 && (
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileWarning className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-orange-800">Convert PDFs</span>
                  </div>
                  <p className="text-sm text-orange-700">{businessMetrics.dependencies.pdf_count} PDFs not mobile-friendly</p>
                  <p className="text-xs text-orange-500 mt-1">Impact: Accessibility</p>
                </div>
              )}
              {businessMetrics.faq_quality.short_answers > 10 && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-blue-800">Expand Answers</span>
                  </div>
                  <p className="text-sm text-blue-700">{businessMetrics.faq_quality.short_answers} FAQs too brief</p>
                  <p className="text-xs text-blue-500 mt-1">Impact: User Satisfaction</p>
                </div>
              )}
              {businessMetrics.content_health.health_score >= 90 && businessMetrics.faq_quality.self_service_rate >= 70 && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-800">Great Job!</span>
                  </div>
                  <p className="text-sm text-green-700">Website health is excellent</p>
                  <p className="text-xs text-green-500 mt-1">Keep monitoring regularly</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ Explorer Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col max-h-[600px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
            <h3 className="text-lg font-semibold text-slate-800">FAQ Explorer</h3>
            <div className="flex gap-2">
              <a 
                href={getFaqsExportUrl()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </a>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full relative">
              <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50">Answer Preview</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50">Mode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 max-w-xs truncate" title={faq.question_text}>
                      {faq.question_text}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-md truncate" title={faq.answer_text}>
                      {faq.answer_text}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                        {faq.answer_mode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm max-w-xs truncate" title={faq.document_url}>
                      <a 
                        href={faq.document_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {faq.document_url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* URL List Modal */}
      <UrlListModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setModalUrls([]); }}
        title={modalTitle}
        description={modalDescription}
        urls={modalUrls}
        loading={modalLoading}
      />
    </div>
  );
}

export default UnifiedDashboard;
