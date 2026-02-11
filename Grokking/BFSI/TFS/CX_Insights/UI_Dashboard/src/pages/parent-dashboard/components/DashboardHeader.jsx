import { cn } from '@utils/cn';
import { ToyotaLogo } from '@components/shared';

/**
 * DashboardHeader — Sticky dark nav bar for the Parent Dashboard.
 * 
 * Apple-style: thin dark bar, Toyota logo + brand left, section tabs right.
 * Matches the approved skeleton page pattern.
 * 
 * @param {Array} navItems - Navigation items [{id, label}]
 * @param {string} activeSection - Currently active section ID
 * @param {Function} onNavigate - Callback when section is selected
 */

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'products', label: 'Products' },
  { id: 'journeys', label: 'Journeys' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'friction', label: 'Friction' },
  { id: 'operating', label: 'Operating' },
  { id: 'ontology', label: 'Ontology' },
  { id: 'opportunities', label: 'Opportunities' },
];

export function DashboardHeader({ activeSection, onNavigate }) {
  return (
    <nav className="sticky top-0 z-50 bg-[rgba(29,29,31,0.72)] backdrop-blur-xl saturate-[180%]">
      <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between h-12">
        <div className="flex items-center gap-3">
          <ToyotaLogo width={24} variant="white" />
          <span className="text-[13px] font-normal text-[#f5f5f7] tracking-[-0.01em] hidden sm:inline">
            Toyota Financial Services
          </span>
        </div>
        <div className="flex items-center gap-5 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'text-[12px] tracking-[-0.01em] transition-colors duration-300 py-1 whitespace-nowrap',
                activeSection === item.id
                  ? 'text-white font-medium'
                  : 'text-[#86868b] hover:text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export { navItems };
export default DashboardHeader;
