import { X, ExternalLink } from 'lucide-react';

interface UrlItem {
  url: string;
  extra?: string;
}

interface UrlListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  urls: UrlItem[];
  loading?: boolean;
}

export function UrlListModal({ isOpen, onClose, title, description, urls, loading }: UrlListModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : urls.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No URLs found for this category
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-slate-500 mb-4">{urls.length} URLs found</p>
              {urls.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 group-hover:text-blue-600 truncate">
                      {item.url}
                    </p>
                    {item.extra && (
                      <p className="text-xs text-slate-400 mt-1">{item.extra}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
