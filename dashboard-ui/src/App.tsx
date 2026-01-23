import React, { useEffect, useState } from 'react';
import { Activity, FileText, Globe, MessageCircle, Shield, Download, ExternalLink } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { DashboardChart } from './components/DashboardChart';
import { fetchStats, fetchFaqs, fetchExternalStats, getFaqsExportUrl } from './services/api';
import type { Stats, FAQ, ExternalStats } from './services/api';

function App() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [externalStats, setExternalStats] = useState<ExternalStats | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, faqsData, extData] = await Promise.all([
          fetchStats(),
          fetchFaqs(),
          fetchExternalStats()
        ]);
        setStats(statsData);
        setFaqs(faqsData);
        setExternalStats(extData);
      } catch (err) {
        setError('Failed to load dashboard data. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Sitemap Analytics</h1>
            <p className="text-slate-500 mt-1">Real-time crawl insights and content metrics</p>
          </div>
          <div className="flex items-center space-x-4">
             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
               System Online
             </span>
          </div>
        </header>

        {/* Stats Grid */}
        {stats && externalStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Pages"
              value={stats.overview.totalPages}
              icon={FileText}
              color="bg-blue-500"
            />
            <StatsCard
              title="Total FAQs"
              value={stats.overview.totalFaqs}
              icon={MessageCircle}
              color="bg-indigo-500"
            />
            <StatsCard
              title="Unique External Domains"
              value={externalStats.total_unique_domains}
              icon={Globe}
              color="bg-emerald-500"
            />
             <StatsCard
              title="Domains in FAQ Pages"
              value={externalStats.faq_unique_domains}
              icon={ExternalLink}
              color="bg-teal-500"
            />
          </div>
        )}

        {/* Domain Analysis Section */}
        {externalStats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Top Domains */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Top 10 External Domains</h3>
                <div className="overflow-y-auto flex-1">
                  <ul className="space-y-3">
                    {externalStats.top_domains.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded">
                        <span className="text-slate-700 font-medium truncate flex-1" title={item.domain}>{item.domain}</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-sm font-semibold">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
             </div>

             {/* Sensitive Domains */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  Sensitive Domains Detected
                </h3>
                <div className="overflow-y-auto flex-1">
                  {externalStats.sensitive_domains.length > 0 ? (
                    <ul className="space-y-2">
                      {externalStats.sensitive_domains.map((domain, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-2 bg-red-50 border border-red-100 rounded text-red-700">
                          <Shield className="w-4 h-4" />
                          <span className="font-medium">{domain}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <Shield className="w-12 h-12 mb-2 opacity-20" />
                      <p>No sensitive domains detected</p>
                    </div>
                  )}
                </div>
             </div>
          </div>
        )}

        {/* Charts Section */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardChart
              title="Document Status Distribution"
              data={stats.statusDistribution}
              type="bar"
            />
            <DashboardChart
              title="FAQ Answer Types"
              data={stats.answerModes}
              type="pie"
            />
          </div>
        )}

        {/* FAQ Explorer Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col max-h-[800px]">
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
                    <td className="px-6 py-4 text-sm text-blue-600 max-w-xs truncate">
                      <a href={faq.document_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {faq.document_url}
                      </a>
                    </td>
                  </tr>
                ))}
                {faqs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No FAQs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
