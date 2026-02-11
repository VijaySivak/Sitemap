import { ChevronRight } from 'lucide-react';
import { Section, FadeIn, DataTooltip } from '@components/shared';
import { ProductCard } from '../components/ProductCard';
import { products } from '@data/hardcoded/parent-dashboard-data';

/**
 * ProductAnalysis — Full product analysis section (VIEW 1 from original).
 * 
 * Displays all 4 product cards in a 2×2 grid with the
 * Cross-Product Friction Patterns insight box.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */

const crossProductInsights = [
  { num: 1, text: 'Latency opacity (no status visibility) appears in 67% of negative reviews' },
  { num: 2, text: 'Forced phone escalations occur in 28% of all journeys analyzed' },
  { num: 3, text: 'Multi-party coordination required in 27% of high-burden paths' },
  { num: 4, text: 'Document/PDF dependency creates offline friction in 18% of actions' },
  { num: 5, text: 'Geographic policy variations (HI/AK/NH/WI) mentioned in 42 reviews as surprise charges' },
];

export default function ProductAnalysis({ onNavigate }) {
  return (
    <>
      {/* ================================================================= */}
      {/* HEADER */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-6 text-center">
          <FadeIn>
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Product Landscape</p>
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              Product Analysis.
            </h1>
            <p className="mt-4 text-[21px] text-[#6e6e73] leading-[1.38] max-w-[600px] mx-auto">
              Four product categories analyzed across sentiment, journey complexity, and customer friction.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PRODUCT GRID — 2×2 Apple-style tiles */}
      {/* ================================================================= */}
      <Section bg="light">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                accent={i === 0 || i === 1}
              />
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* CROSS-PRODUCT INSIGHT BOX */}
      {/* ================================================================= */}
      <Section bg="white">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Cross-product patterns.
            </h2>
            <p className="mt-3 text-[21px] text-[#6e6e73] leading-[1.38]">
              Friction themes that appear across all product categories.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="space-y-6">
            {crossProductInsights.map((insight) => (
              <div key={insight.num} className="flex items-start gap-5">
                <div className="w-8 h-8 rounded-full bg-[#EB0A1E] text-white flex items-center justify-center text-[14px] font-semibold shrink-0">
                  {insight.num}
                </div>
                <DataTooltip source="hardcoded">
                  <p className="text-[17px] text-[#1d1d1f] leading-[1.47] pt-1">
                    {insight.text}
                  </p>
                </DataTooltip>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate('journeys')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              Explore journey stages <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
