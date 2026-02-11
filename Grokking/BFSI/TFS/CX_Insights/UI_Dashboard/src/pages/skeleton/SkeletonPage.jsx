import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  Section,
  WidgetGrid,
  Navigation,
  DataTooltip,
  DataWithTooltip,
  FadeIn,
  ToyotaLogo,
} from '@components/shared';
import { cn } from '@utils/cn';

/**
 * SkeletonPage — Design approval page.
 * 
 * Modeled directly after apple.com:
 * - Thin dark navigation bar
 * - Full-width sections separated by background color
 * - Massive centered typography
 * - No visible widget containers / card borders
 * - No hover bobbing
 * - Generous vertical spacing
 */

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'products', label: 'Products' },
  { id: 'journeys', label: 'Journeys' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'friction', label: 'Friction' },
  { id: 'insights', label: 'FAQ Insights' },
];

export default function SkeletonPage() {
  const [activeNav, setActiveNav] = useState('overview');

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================= */}
      {/* NAV — Single bar: brand left, section tabs right */}
      {/* ================================================================= */}
      <nav className="sticky top-0 z-50 bg-[rgba(29,29,31,0.72)] backdrop-blur-xl saturate-[180%]">
        <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between h-12">
          <div className="flex items-center gap-3">
            <ToyotaLogo width={24} variant="white" />
            <span className="text-[13px] font-normal text-[#f5f5f7] tracking-[-0.01em] hidden sm:inline">
              Toyota Financial Services
            </span>
          </div>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={cn(
                  'text-[12px] tracking-[-0.01em] transition-colors duration-300 py-1',
                  activeNav === item.id
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

      {/* ================================================================= */}
      {/* HERO — Full-width, massive centered text on white */}
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
              <a href="#overview" className="text-[17px] text-[#0066cc] hover:underline flex items-center gap-0.5">
                Explore overview <ChevronRight className="w-3.5 h-3.5 mt-px" />
              </a>
              <a href="#insights" className="text-[17px] text-[#0066cc] hover:underline flex items-center gap-0.5">
                FAQ Insights <ChevronRight className="w-3.5 h-3.5 mt-px" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hero image area — full bleed */}
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
      {/* METRICS — Apple-style, no card borders, just big clean numbers */}
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
            {[
              { value: '4', label: 'Product categories', sublabel: 'Leasing, Retail, Insurance, Commercial', source: 'hardcoded' },
              { value: '17', label: 'Customer intents mapped', sublabel: 'Across all products', source: 'json' },
              { value: '23', label: 'Journey paths analyzed', sublabel: '8 identified as high-friction', source: 'json' },
              { value: '247', label: 'FAQ pages crawled', sublabel: 'From TFS sitemap', source: 'sqlite' },
              { value: '14', label: 'Entity types in ontology', sublabel: 'Knowledge graph schema', source: 'json' },
              { value: '6', label: 'Customer channels', sublabel: 'Web, mobile, phone, dealer, mail, external', source: 'hardcoded' },
            ].map((metric) => (
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
      {/* JOURNEY — Full-width section, alternating background */}
      {/* ================================================================= */}
      <Section bg="white">
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
              { stage: 'Understand', pct: 15, desc: 'Customer researches options and requirements', source: 'hardcoded' },
              { stage: 'Decide', pct: 18, desc: 'Customer evaluates and selects a path forward', source: 'hardcoded' },
              { stage: 'Act', pct: 45, desc: 'Customer initiates and completes primary transactions', source: 'json' },
              { stage: 'Confirm', pct: 12, desc: 'Customer verifies outcomes and next steps', source: 'hardcoded' },
              { stage: 'Recover', pct: 10, desc: 'Customer resolves issues and seeks remediation', source: 'json' },
            ].map((stage) => (
              <div key={stage.stage} className="flex items-center gap-6 py-5 border-b border-[#d2d2d7]/40 last:border-0">
                <span className="text-[17px] font-semibold text-[#1d1d1f] w-28 shrink-0">
                  {stage.stage}
                </span>
                <div className="flex-1">
                  <div className="w-full bg-[#f5f5f7] rounded-full h-2 overflow-hidden">
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
                <span className="text-[13px] text-[#86868b] w-64 shrink-0 hidden lg:block">
                  {stage.desc}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* PRODUCT TILES — Apple-style 2-column grid with background fills */}
      {/* ================================================================= */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Explore products.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Auto Leasing', desc: 'End-of-lease friction, mileage disputes, return processes', bg: 'bg-white', accent: true },
              { name: 'Retail Finance', desc: 'Payment posting, title releases, payoff calculations', bg: 'bg-white', accent: false },
              { name: 'Insurance Products', desc: 'GAP claims, VSA coverage, cancellation flows', bg: 'bg-white', accent: false },
              { name: 'Commercial Lending', desc: 'Fleet management, dealer financing, credit applications', bg: 'bg-white', accent: true },
            ].map((product) => (
              <div
                key={product.name}
                className={cn(
                  'rounded-[20px] p-10 min-h-[280px] flex flex-col justify-end',
                  product.bg
                )}
              >
                {product.accent && (
                  <div className="w-8 h-[3px] rounded-full bg-[#EB0A1E] mb-4" />
                )}
                <h3 className="text-[28px] font-semibold text-[#1d1d1f] leading-[1.14] tracking-[-0.02em]">
                  {product.name}
                </h3>
                <p className="mt-2 text-[15px] text-[#6e6e73] leading-[1.47]">
                  {product.desc}
                </p>
                <a href="#" className={cn(
                  'mt-4 text-[15px] hover:underline inline-flex items-center gap-0.5',
                  product.accent ? 'text-[#EB0A1E]' : 'text-[#0066cc]'
                )}>
                  Learn more <ChevronRight className="w-3 h-3 mt-px" />
                </a>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* SENTIMENT — Clean section, no cards */}
      {/* ================================================================= */}
      <Section bg="white">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Sentiment Analysis</p>
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              What customers are saying.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-8">
                {[
                  { platform: 'App Store Reviews', score: '2.1', total: '4,231', source: 'hardcoded' },
                  { platform: 'Google Play Reviews', score: '1.8', total: '12,847', source: 'hardcoded' },
                  { platform: 'TrustPilot', score: '1.4', total: '892', source: 'hardcoded' },
                  { platform: 'BBB Complaints', score: '1.2', total: '341', source: 'hardcoded' },
                ].map((item) => (
                  <div key={item.platform}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[17px] font-medium text-[#1d1d1f]">{item.platform}</span>
                      <span className="text-[15px] text-[#86868b]">{item.total} reviews</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#f5f5f7] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1d1d1f]"
                          style={{ width: `${(parseFloat(item.score) / 5) * 100}%` }}
                        />
                      </div>
                      <DataTooltip source={item.source}>
                        <span className={cn(
                          'text-[28px] font-semibold tracking-[-0.02em] w-16 text-right',
                          parseFloat(item.score) < 1.5 ? 'text-[#EB0A1E]' : 'text-[#1d1d1f]'
                        )}>
                          {item.score}
                        </span>
                      </DataTooltip>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <DataTooltip source="hardcoded">
                <p className="text-[80px] font-semibold text-[#EB0A1E] leading-[1] tracking-[-0.05em]">
                  1.6
                </p>
              </DataTooltip>
              <p className="mt-2 text-[21px] text-[#6e6e73]">
                Average rating across all platforms
              </p>
              <p className="mt-6 text-[15px] text-[#86868b] leading-[1.58] max-w-[380px]">
                Sentiment analysis reveals consistent themes around payment processing delays,
                lease-end confusion, and limited self-service options.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ================================================================= */}
      {/* FAQ INSIGHTS CTA — Apple-style dark section */}
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
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#EB0A1E] text-white text-[17px] font-medium rounded-full hover:bg-[#cc0918] transition-colors duration-300">
                Explore FAQ Insights <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER — Apple-style minimal footer */}
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
            <div className="mt-3 flex items-center gap-4 text-[12px] text-[#424245]">
              <a href="#" className="hover:underline">Overview</a>
              <span className="text-[#d2d2d7]">|</span>
              <a href="#" className="hover:underline">Products</a>
              <span className="text-[#d2d2d7]">|</span>
              <a href="#" className="hover:underline">Journeys</a>
              <span className="text-[#d2d2d7]">|</span>
              <a href="#" className="hover:underline">Sentiment</a>
              <span className="text-[#d2d2d7]">|</span>
              <a href="#" className="hover:underline">FAQ Insights</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
