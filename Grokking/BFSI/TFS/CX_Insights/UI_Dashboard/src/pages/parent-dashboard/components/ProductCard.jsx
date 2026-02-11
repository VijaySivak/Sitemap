import { Car, Wallet, Shield, Building2 } from 'lucide-react';
import { DataTooltip } from '@components/shared';
import { cn } from '@utils/cn';

/**
 * ProductCard — Apple-style product tile for the Product Analysis section.
 * 
 * Displays product name, sentiment, stats (intents/FAQs/reviews),
 * top issues, and a "View Details" action.
 * 
 * @param {Object} product - Product data object
 * @param {boolean} [accent=false] - Whether to show Toyota red accent
 * @param {Function} [onClick] - Click handler
 */

const IconMap = {
  'retail-finance': Wallet,
  'leasing': Car,
  'insurance': Shield,
  'commercial': Building2,
};

export function ProductCard({ product, accent = false, onClick }) {
  const Icon = IconMap[product.id] || Car;

  return (
    <button
      onClick={onClick}
      className="rounded-[20px] bg-[#f5f5f7] p-10 flex flex-col text-left transition-opacity duration-300 hover:opacity-80"
    >
      {accent && (
        <div className="w-8 h-[3px] rounded-full bg-[#EB0A1E] mb-4" />
      )}
      <Icon className="w-8 h-8 text-[#1d1d1f] mb-3" strokeWidth={1.5} />
      <h3 className="text-[28px] font-semibold text-[#1d1d1f] leading-[1.14] tracking-[-0.02em]">
        {product.name}
      </h3>

      {/* Sentiment + trend */}
      <div className="mt-3 flex items-center gap-3">
        <span className={cn(
          'text-[17px] font-medium',
          product.sentiment.label === 'Negative' ? 'text-[#EB0A1E]' : 'text-[#1d1d1f]'
        )}>
          {product.sentiment.label} {product.sentiment.arrow}
        </span>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <DataTooltip source={product.source}>
            <p className="text-[28px] font-semibold text-[#1d1d1f] leading-[1] tracking-[-0.02em]">
              {product.stats.intents}
            </p>
          </DataTooltip>
          <p className="mt-1 text-[12px] text-[#86868b]">Intents</p>
        </div>
        <div>
          <DataTooltip source={product.source}>
            <p className="text-[28px] font-semibold text-[#1d1d1f] leading-[1] tracking-[-0.02em]">
              {product.stats.faqs}
            </p>
          </DataTooltip>
          <p className="mt-1 text-[12px] text-[#86868b]">FAQs</p>
        </div>
        <div>
          <DataTooltip source={product.source}>
            <p className="text-[28px] font-semibold text-[#1d1d1f] leading-[1] tracking-[-0.02em]">
              {product.stats.reviews}
            </p>
          </DataTooltip>
          <p className="mt-1 text-[12px] text-[#86868b]">Reviews</p>
        </div>
      </div>

      {/* Burden stats */}
      <div className="mt-4 flex items-center gap-4 text-[13px] text-[#86868b]">
        <DataTooltip source={product.source}>
          <span>{product.burden.steps} steps avg burden</span>
        </DataTooltip>
        <span>·</span>
        <DataTooltip source={product.source}>
          <span>{product.burden.offlinePercent}% offline</span>
        </DataTooltip>
      </div>

      {/* Top 3 issues */}
      <div className="mt-5 space-y-2">
        <p className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide">Top Issues</p>
        {product.topIssues.map((issue) => (
          <div key={issue} className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EB0A1E] shrink-0" />
            <span className="text-[15px] text-[#1d1d1f] leading-[1.4]">{issue}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

export default ProductCard;
