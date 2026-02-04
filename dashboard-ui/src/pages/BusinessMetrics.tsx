import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileText, 
  MessageCircle,
  Layers,
  FileWarning,
  TrendingUp,
  Phone,
  ExternalLink
} from 'lucide-react';
import { fetchBusinessMetrics, fetchMetricUrls, fetchPdfAnalysis } from '../services/api';
import type { BusinessMetrics as BusinessMetricsType, MetricUrlItem, PdfAnalysis } from '../services/api';
import { DashboardChart } from '../components/DashboardChart';
import { UrlListModal } from '../components/UrlListModal';

interface ModalState {
  isOpen: boolean;
  title: string;
  description?: string;
  metricType: string;
  filterValue?: string;
}

function BusinessMetrics() {
  const [metrics, setMetrics] = useState<BusinessMetricsType | null>(null);
  const [pdfAnalysis, setPdfAnalysis] = useState<PdfAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    metricType: ''
  });
  const [modalUrls, setModalUrls] = useState<MetricUrlItem[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [metricsData, pdfData] = await Promise.all([
          fetchBusinessMetrics(),
          fetchPdfAnalysis()
        ]);
        setMetrics(metricsData);
        setPdfAnalysis(pdfData);
      } catch (err) {
        setError('Failed to load business metrics. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const openModal = async (title: string, description: string, metricType: string, filterValue?: string) => {
    setModalState({ isOpen: true, title, description, metricType, filterValue });
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

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', metricType: '' });
    setModalUrls([]);
  };

  const handleChartClick = (data: { name: string; value: number }) => {
    // For FAQ answer modes pie chart
    if (data.name && metrics?.faq_quality.answer_modes[data.name] !== undefined) {
      openModal(
        `FAQs with ${data.name}`,
        `${data.value} FAQs found with this answer mode`,
        'faq_answer_mode',
        data.name
      );
    }
    // For depth distribution bar chart
    else if (data.name && data.name.startsWith('Depth ')) {
      const depth = data.name.replace('Depth ', '');
      openModal(
        `Pages at ${data.name}`,
        `${data.value} pages found at this navigation depth`,
        'depth_level',
        depth
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

  if (!metrics) return null;

  
  const depthChartData = metrics.navigation.depth_distribution.map(d => ({
    name: `Depth ${d.depth}`,
    value: d.count
  }));

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Back Link */}
        <header className="flex justify-between items-center">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Business Metrics</h1>
            <p className="text-slate-500 mt-1">Website health analysis and improvement opportunities</p>
          </div>
        </header>

        {/* Content Health Score - Hero Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold opacity-90">Content Health Score</h2>
              <p className="text-5xl font-bold mt-2">{metrics.content_health.health_score}%</p>
              <button 
                onClick={() => openModal('Successfully Crawled Pages', `${metrics.content_health.successful_crawls} pages crawled successfully`, 'successful_crawls')}
                className="mt-2 opacity-75 hover:opacity-100 hover:underline cursor-pointer text-left"
              >
                {metrics.content_health.successful_crawls} of {metrics.content_health.total_pages} pages successfully crawled
              </button>
            </div>
            <div className="text-right space-y-2">
              <button 
                onClick={() => openModal('Broken Pages', `${metrics.content_health.broken_pages} pages with HTTP errors`, 'broken_pages')}
                className="flex items-center gap-2 justify-end hover:bg-white/10 px-2 py-1 rounded cursor-pointer w-full"
              >
                <XCircle className="w-5 h-5 text-red-300" />
                <span>{metrics.content_health.broken_pages} broken pages</span>
              </button>
              <button 
                onClick={() => openModal('Fetch Errors', `${metrics.content_health.fetch_errors} pages that failed to load`, 'fetch_errors')}
                className="flex items-center gap-2 justify-end hover:bg-white/10 px-2 py-1 rounded cursor-pointer w-full"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                <span>{metrics.content_health.fetch_errors} fetch errors</span>
              </button>
              <button 
                onClick={() => openModal('Blocked by Robots', `${metrics.content_health.blocked_by_robots} pages blocked by robots.txt`, 'blocked_by_robots')}
                className="flex items-center gap-2 justify-end hover:bg-white/10 px-2 py-1 rounded cursor-pointer w-full"
              >
                <FileWarning className="w-5 h-5 text-orange-300" />
                <span>{metrics.content_health.blocked_by_robots} blocked by robots</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Self-Service Rate */}
          <button 
            onClick={() => openModal('FAQs with Direct Text Answers', `${metrics.faq_quality.direct_text_count} FAQs provide direct answers`, 'faq_answer_mode', 'DIRECT_TEXT')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-green-300 hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-700">Self-Service Rate</h3>
            </div>
            <p className={`text-3xl font-bold ${metrics.faq_quality.self_service_rate >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
              {metrics.faq_quality.self_service_rate}%
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {metrics.faq_quality.direct_text_count} FAQs with direct answers
            </p>
          </button>

          {/* Escalation FAQs */}
          <button 
            onClick={() => openModal('Escalation FAQs', `${metrics.faq_quality.escalation_count} FAQs require phone or portal redirect`, 'escalation_faqs')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-red-300 hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-slate-700">Escalation FAQs</h3>
            </div>
            <p className="text-3xl font-bold text-red-600">{metrics.faq_quality.escalation_count}</p>
            <p className="text-sm text-slate-500 mt-1">
              Require phone/portal redirect
            </p>
          </button>

          {/* Deep Pages */}
          <button 
            onClick={() => openModal('Deep Pages', `${metrics.navigation.deep_pages_count} pages at navigation depth > 3`, 'deep_pages')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Layers className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-700">Deep Pages</h3>
            </div>
            <p className="text-3xl font-bold text-amber-600">{metrics.navigation.deep_pages_count}</p>
            <p className="text-sm text-slate-500 mt-1">
              Pages at depth &gt; 3 (hard to find)
            </p>
          </button>

          {/* PDF Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-700">PDF Analysis</h3>
            </div>
            {pdfAnalysis ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Form-Filling</span>
                  <button 
                    onClick={() => {
                      setModalState({ isOpen: true, title: 'Form-Filling PDFs', description: `${pdfAnalysis.form_filling.count} PDFs with fillable fields`, metricType: 'pdf_form' });
                      setModalUrls(pdfAnalysis.form_filling.urls.map(u => ({ url: u.url, extra: `${u.keyword_matches} form keywords` })));
                    }}
                    className="text-lg font-bold text-purple-600 hover:underline cursor-pointer"
                  >
                    {pdfAnalysis.form_filling.percentage}%
                  </button>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${pdfAnalysis.form_filling.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Informational</span>
                  <button 
                    onClick={() => {
                      setModalState({ isOpen: true, title: 'Informational PDFs', description: `${pdfAnalysis.informational.count} brochures and guides`, metricType: 'pdf_info' });
                      setModalUrls(pdfAnalysis.informational.urls.map(u => ({ url: u.url, extra: `${u.keyword_matches} form keywords` })));
                    }}
                    className="text-lg font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    {pdfAnalysis.informational.percentage}%
                  </button>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${pdfAnalysis.informational.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">{pdfAnalysis.total_pdfs} total PDFs analyzed</p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Loading PDF analysis...</p>
            )}
          </div>
        </div>

        {/* Second Row Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Short Answers */}
          <button 
            onClick={() => openModal('Short FAQ Answers', `${metrics.faq_quality.short_answers} FAQs with answers under 100 characters`, 'short_answers')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-orange-300 hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-700">Short FAQ Answers</h3>
            </div>
            <p className="text-3xl font-bold text-orange-600">{metrics.faq_quality.short_answers}</p>
            <p className="text-sm text-slate-500 mt-1">
              Answers with &lt; 100 characters
            </p>
          </button>

          {/* Pages Without FAQs */}
          <button 
            onClick={() => openModal('Pages Without FAQs', `${metrics.faq_quality.pages_without_faqs} pages missing FAQ content`, 'pages_without_faqs')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="font-semibold text-slate-700">Pages Without FAQs</h3>
            </div>
            <p className="text-3xl font-bold text-slate-600">{metrics.faq_quality.pages_without_faqs}</p>
            <p className="text-sm text-slate-500 mt-1">
              Missed self-service opportunity
            </p>
          </button>

          {/* PDF Dependencies */}
          <button 
            onClick={() => openModal('PDF Files', `${metrics.dependencies.pdf_count} PDF documents found`, 'pdf_pages')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-rose-300 hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <FileWarning className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="font-semibold text-slate-700">PDF Dependencies</h3>
            </div>
            <p className="text-3xl font-bold text-rose-600">{metrics.dependencies.pdf_count}</p>
            <p className="text-sm text-slate-500 mt-1">
              PDFs (not mobile-friendly)
            </p>
          </button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Navigation Depth Chart */}
          <DashboardChart
            title="Navigation Depth Distribution"
            data={depthChartData}
            type="bar"
            onSegmentClick={handleChartClick}
          />

          {/* FAQ Answer Modes */}
          <DashboardChart
            title="FAQ Answer Mode Breakdown"
            data={Object.entries(metrics.faq_quality.answer_modes).map(([name, value]) => ({ name, value }))}
            type="pie"
            onSegmentClick={handleChartClick}
          />
        </div>

        {/* Issues Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Broken Links */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Broken Links ({metrics.issues.broken_links.length})
              </h3>
            </div>
            <div className="overflow-auto max-h-[300px]">
              {metrics.issues.broken_links.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">URL</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Depth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {metrics.issues.broken_links.map((link, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-2 text-sm max-w-xs truncate" title={link.url}>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {link.url}
                          </a>
                        </td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">
                            {link.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-500">{link.depth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No broken links detected</p>
                </div>
              )}
            </div>
          </div>

          {/* External Link Heavy Pages */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-amber-500" />
                External Link Heavy Pages
              </h3>
            </div>
            <div className="overflow-auto max-h-[300px]">
              {metrics.dependencies.external_heavy_pages.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Page URL</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">External Links</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {metrics.dependencies.external_heavy_pages.map((page, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-2 text-sm max-w-xs truncate" title={page.url}>
                          <a 
                            href={page.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {page.url}
                          </a>
                        </td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                            {page.external_links} links
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No pages with excessive external links</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Improvement Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Improvement Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.content_health.broken_pages > 0 && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <h4 className="font-semibold text-red-800">Fix Broken Links</h4>
                <p className="text-sm text-red-700 mt-1">
                  {metrics.content_health.broken_pages} broken pages hurt SEO and user experience
                </p>
              </div>
            )}
            {metrics.faq_quality.self_service_rate < 70 && (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <h4 className="font-semibold text-amber-800">Improve FAQ Quality</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Only {metrics.faq_quality.self_service_rate}% of FAQs provide direct answers. Target: 70%+
                </p>
              </div>
            )}
            {metrics.faq_quality.escalation_count > 0 && (
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                <h4 className="font-semibold text-orange-800">Reduce Escalations</h4>
                <p className="text-sm text-orange-700 mt-1">
                  {metrics.faq_quality.escalation_count} FAQs require phone/portal - potential cost savings
                </p>
              </div>
            )}
            {metrics.navigation.deep_pages_count > 10 && (
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                <h4 className="font-semibold text-purple-800">Flatten Navigation</h4>
                <p className="text-sm text-purple-700 mt-1">
                  {metrics.navigation.deep_pages_count} pages are buried deep - improve discoverability
                </p>
              </div>
            )}
            {metrics.dependencies.pdf_count > 5 && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg">
                <h4 className="font-semibold text-rose-800">Convert PDFs to Web</h4>
                <p className="text-sm text-rose-700 mt-1">
                  {metrics.dependencies.pdf_count} PDFs are not mobile-friendly or searchable
                </p>
              </div>
            )}
            {metrics.navigation.orphan_pages > 0 && (
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                <h4 className="font-semibold text-indigo-800">Link Orphan Pages</h4>
                <p className="text-sm text-indigo-700 mt-1">
                  {metrics.navigation.orphan_pages} pages have no internal links pointing to them
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* URL List Modal */}
      <UrlListModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        description={modalState.description}
        urls={modalUrls}
        loading={modalLoading}
      />
    </div>
  );
}

export default BusinessMetrics;
