import { ChevronRight, Car, Wallet, Shield, Building2 } from 'lucide-react';
import {
  Section,
  FadeIn,
  DataTooltip,
  ToyotaLogo,
} from '@components/shared';
import { cn } from '@utils/cn';
import { overviewMetrics, products } from '@data/hardcoded/parent-dashboard-data';

/**
 * Overview — Landing section for the Parent Dashboard.
 * 
 * Apple-style hero with Toyota branding, key metrics,
 * product tiles, and FAQ Insights CTA.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */
export default function Overview({ onNavigate }) {
  return (
    <>
      {/* ================================================================= */}
      {/* HERO — Massive centered text on white */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-10 text-center">
          <FadeIn>
            <ToyotaLogo width={56} variant="color" className="mx-auto mb-6" />
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              Customer Experience
            </h1>
            <h2 className="mt-2 text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] leading-[1.1] tracking-[-0.04em]">
              Intelligence Platform
            </h2>
            <p className="mt-4 text-[21px] text-[#6e6e73] leading-[1.38] max-w-[600px] mx-auto">
              Powered by FAQ knowledge graph analytics for Toyota Financial Services.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                onClick={() => onNavigate('products')}
                className="text-[17px] text-[#0066cc] hover:underline flex items-center gap-0.5"
              >
                Explore products <ChevronRight className="w-3.5 h-3.5 mt-px" />
              </button>
              <button
                onClick={() => onNavigate('journeys')}
                className="text-[17px] text-[#0066cc] hover:underline flex items-center gap-0.5"
              >
                View journeys <ChevronRight className="w-3.5 h-3.5 mt-px" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hero image area */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn delay={100}>
            <div className="w-full h-[500px] bg-[#fbfbfd] rounded-[18px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbfbfd]/80" />
              <div className="text-center relative z-10">
                <p className="text-[15px] text-[#86868b] font-medium tracking-wide">
                  Dashboard preview will appear here
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================================================================= */}
      {/* METRICS — Big clean numbers, no card borders */}
      {/* ================================================================= */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              At a glance.
            </h2>
            <p className="mt-3 text-[21px] text-[#6e6e73] leading-[1.38]">
              Key metrics across the customer experience landscape.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {overviewMetrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <DataTooltip source={metric.source}>
                  <p className="text-[48px] md:text-[56px] font-semibold text-[#1d1d1f] leading-[1] tracking-[-0.04em]">
                    {metric.value}
                  </p>
                </DataTooltip>
                <p className="mt-2 text-[17px] font-medium text-[#1d1d1f]">
                  {metric.label}
                </p>
                <p className="mt-1 text-[14px] text-[#86868b]">
                  {metric.sublabel}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* PRODUCT TILES — 2×2 grid, Apple-style rounded cards */}
      {/* ================================================================= */}
      <Section bg="white">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Product Landscape</p>
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Explore products.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, i) => {
              const IconMap = { 'retail-finance': Wallet, 'leasing': Car, 'insurance': Shield, 'commercial': Building2 };
              const Icon = IconMap[product.id] || Car;
              const isAccent = i === 0 || i === 1;
              return (
                <button
                  key={product.id}
                  onClick={() => onNavigate('products')}
                  className="rounded-[20px] bg-[#f5f5f7] p-10 flex flex-col justify-end text-left transition-opacity duration-300 hover:opacity-80"
                >
                  {isAccent && (
                    <div className="w-8 h-[3px] rounded-full bg-[#EB0A1E] mb-4" />
                  )}
                  <Icon className="w-8 h-8 text-[#1d1d1f] mb-3" strokeWidth={1.5} />
                  <h3 className="text-[28px] font-semibold text-[#1d1d1f] leading-[1.14] tracking-[-0.02em]">
                    {product.name}
                  </h3>

                  {/* Sentiment + trend */}
                  <div className="mt-2 flex items-center gap-3">
                    <span className={cn(
                      'text-[15px] font-medium',
                      product.sentiment.label === 'Negative' ? 'text-[#EB0A1E]' : 'text-[#1d1d1f]'
                    )}>
                      {product.sentiment.label} {product.sentiment.arrow}
                    </span>
                  </div>

                  {/* Stats row: intents · FAQs · reviews */}
                  <div className="mt-3 flex items-center gap-4 text-[13px] text-[#86868b]">
                    <DataTooltip source={product.source}>
                      <span>{product.stats.intents} intents</span>
                    </DataTooltip>
                    <span>·</span>
                    <DataTooltip source={product.source}>
                      <span>{product.stats.faqs} FAQs</span>
                    </DataTooltip>
                    <span>·</span>
                    <DataTooltip source={product.source}>
                      <span>{product.stats.reviews} reviews</span>
                    </DataTooltip>
                  </div>

                  {/* Top 3 issues */}
                  <div className="mt-4 space-y-1.5">
                    <p className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide">Top Issues</p>
                    {product.topIssues.map((issue) => (
                      <div key={issue} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#EB0A1E] shrink-0" />
                        <span className="text-[14px] text-[#6e6e73] leading-[1.4]">{issue}</span>
                      </div>
                    ))}
                  </div>

                  <span className={cn(
                    'mt-5 text-[15px] hover:underline inline-flex items-center gap-0.5',
                    isAccent ? 'text-[#EB0A1E]' : 'text-[#0066cc]'
                  )}>
                    View Details <ChevronRight className="w-3 h-3 mt-px" />
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* JOURNEY PREVIEW — Quick snapshot */}
      {/* ================================================================= */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Customer Journeys</p>
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Every step, mapped.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="space-y-1">
            {[
              { stage: 'Understand', pct: 15, burden: 3.8, source: 'hardcoded' },
              { stage: 'Decide', pct: 18, burden: 4.5, source: 'hardcoded' },
              { stage: 'Act', pct: 45, burden: 8.2, source: 'hardcoded' },
              { stage: 'Confirm', pct: 12, burden: 4.1, source: 'hardcoded' },
              { stage: 'Recover', pct: 10, burden: 9.1, source: 'hardcoded' },
            ].map((stage) => (
              <div key={stage.stage} className="flex items-center gap-6 py-5 border-b border-[#d2d2d7]/40 last:border-0">
                <span className="text-[17px] font-semibold text-[#1d1d1f] w-28 shrink-0">
                  {stage.stage}
                </span>
                <div className="flex-1">
                  <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        stage.pct >= 40 ? 'bg-[#EB0A1E]' : 'bg-[#1d1d1f]'
                      )}
                      style={{ width: `${stage.pct}%` }}
                    />
                  </div>
                </div>
                <DataTooltip source={stage.source}>
                  <span className="text-[15px] font-medium text-[#1d1d1f] w-12 text-right shrink-0">
                    {stage.pct}%
                  </span>
                </DataTooltip>
                <span className="text-[13px] text-[#86868b] w-24 shrink-0 hidden lg:block">
                  Burden: {stage.burden}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('journeys')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              View all journeys <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* SENTIMENT SNAPSHOT */}
      {/* ================================================================= */}
      <Section bg="white">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Sentiment Analysis</p>
              <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
                What customers<br />are saying.
              </h2>
              <p className="mt-4 text-[15px] text-[#86868b] leading-[1.58] max-w-[380px]">
                Sentiment analysis reveals consistent themes around payment processing delays,
                lease-end confusion, and limited self-service options.
              </p>
              <button
                onClick={() => onNavigate('sentiment')}
                className="mt-6 text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5 self-start"
              >
                Deep dive <ChevronRight className="w-3.5 h-3.5 mt-px" />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center md:items-end">
              <DataTooltip source="hardcoded">
                <p className="text-[80px] font-semibold text-[#EB0A1E] leading-[1] tracking-[-0.05em]">
                  1.6
                </p>
              </DataTooltip>
              <p className="mt-2 text-[21px] text-[#6e6e73]">
                Average rating
              </p>
              <p className="mt-1 text-[15px] text-[#86868b]">
                Across 18,311 reviews
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* FAQ INSIGHTS CTA — Dark section */}
      {/* ================================================================= */}
      <section className="bg-[#1d1d1f]">
        <div className="max-w-[980px] mx-auto px-6 py-24 md:py-32 text-center">
          <FadeIn>
            <h2 className="text-[48px] md:text-[56px] font-semibold text-white leading-[1.08] tracking-[-0.04em]">
              Go deeper with<br />FAQ Insights.
            </h2>
            <p className="mt-4 text-[21px] text-[#86868b] leading-[1.38] max-w-[500px] mx-auto">
              Explore the knowledge graph, analyze entity relationships, and uncover customer journey patterns.
            </p>
            <div className="mt-8 flex items-center justify-center gap-6">
              <a href="/faq" className="inline-flex items-center gap-2 px-6 py-3 bg-[#EB0A1E] text-white text-[17px] font-medium rounded-full hover:bg-[#cc0918] transition-colors duration-300">
                Explore FAQ Insights <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER */}
      {/* ================================================================= */}
      <footer className="bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto px-6 py-5">
          <div className="border-t border-[#d2d2d7] pt-4">
            <div className="flex items-center gap-2 mb-3">
              <ToyotaLogo width={18} variant="gray" />
              <span className="text-[12px] text-[#86868b]">Toyota Financial Services</span>
            </div>
            <p className="text-[12px] text-[#6e6e73] leading-[1.33]">
              TFS Customer Experience Dashboard. Data sourced from FAQ knowledge graph, sitemap crawl, and storyboard analysis.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
