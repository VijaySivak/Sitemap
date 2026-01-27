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
  Link2Off,
  FileWarning,
  TrendingUp,
  Phone,
  ExternalLink
} from 'lucide-react';
import { fetchBusinessMetrics } from '../services/api';
import type { BusinessMetrics as BusinessMetricsType } from '../services/api';
import { DashboardChart } from '../components/DashboardChart';

function BusinessMetrics() {
  const [metrics, setMetrics] = useState<BusinessMetricsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBusinessMetrics();
        setMetrics(data);
      } catch (err) {
        setError('Failed to load business metrics. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold opacity-90">Content Health Score</h2>
              <p className="text-5xl font-bold mt-2">{metrics.content_health.health_score}%</p>
              <p className="mt-2 opacity-75">
                {metrics.content_health.successful_crawls} of {metrics.content_health.total_pages} pages successfully crawled
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 justify-end">
                <XCircle className="w-5 h-5 text-red-300" />
                <span>{metrics.content_health.broken_pages} broken pages</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                <span>{metrics.content_health.fetch_errors} fetch errors</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <FileWarning className="w-5 h-5 text-orange-300" />
                <span>{metrics.content_health.blocked_by_robots} blocked by robots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Self-Service Rate */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
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
          </div>

          {/* Escalation FAQs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
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
          </div>

          {/* Deep Pages */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
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
          </div>

          {/* Orphan Pages */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Link2Off className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-700">Orphan Pages</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">{metrics.navigation.orphan_pages}</p>
            <p className="text-sm text-slate-500 mt-1">
              No inbound internal links
            </p>
          </div>
        </div>

        {/* Second Row Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Short Answers */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
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
          </div>

          {/* Pages Without FAQs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
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
          </div>

          {/* PDF Dependencies */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
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
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Navigation Depth Chart */}
          <DashboardChart
            title="Navigation Depth Distribution"
            data={depthChartData}
            type="bar"
          />

          {/* FAQ Answer Modes */}
          <DashboardChart
            title="FAQ Answer Mode Breakdown"
            data={Object.entries(metrics.faq_quality.answer_modes).map(([name, value]) => ({ name, value }))}
            type="pie"
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
                        <td className="px-4 py-2 text-sm text-slate-700 max-w-xs truncate" title={link.url}>
                          {link.url}
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
                        <td className="px-4 py-2 text-sm text-slate-700 max-w-xs truncate" title={page.url}>
                          {page.url}
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
    </div>
  );
}

export default BusinessMetrics;
