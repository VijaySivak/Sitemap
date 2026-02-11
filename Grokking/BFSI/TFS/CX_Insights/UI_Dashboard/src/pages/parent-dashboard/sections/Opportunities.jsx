import { ChevronRight } from 'lucide-react';
import { Section, FadeIn, DataTooltip } from '@components/shared';
import { cn } from '@utils/cn';
import {
  currentVsFuture, capabilities, opportunityCatalog,
} from '@data/hardcoded/parent-dashboard-data';

/**
 * Opportunities — Current vs Future state, capabilities, and opportunity catalog.
 * Implements VIEW 8 from tfs_storyboard_v4.html.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */

const comparisonMetrics = [
  { label: 'Burden', current: currentVsFuture.current.burden, future: currentVsFuture.future.burden, unit: ' steps' },
  { label: 'Offline', current: `${currentVsFuture.current.offlinePercent}%`, future: `${currentVsFuture.future.offlinePercent}%` },
  { label: 'Parties', current: currentVsFuture.current.parties, future: currentVsFuture.future.parties },
  { label: 'Sentiment', current: currentVsFuture.current.sentiment.score, future: `+${currentVsFuture.future.sentiment.score}` },
  { label: 'Duration', current: currentVsFuture.current.duration, future: currentVsFuture.future.duration },
];

export default function Opportunities({ onNavigate }) {
  return (
    <>
      {/* HEADER */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-6 text-center">
          <FadeIn>
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Future State</p>
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              The agentic future.
            </h1>
            <p className="mt-4 text-[21px] text-[#6e6e73] leading-[1.38] max-w-[600px] mx-auto">
              What the {currentVsFuture.journey} experience looks like with AI-powered orchestration.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CURRENT VS FUTURE — Side by side comparison */}
      <Section bg="light">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current */}
            <div className="rounded-[20px] bg-white p-10">
              <p className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide mb-2">Current State</p>
              <h3 className="text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mb-6">
                {currentVsFuture.journey}
              </h3>
              <div className="space-y-4">
                {comparisonMetrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between border-b border-[#d2d2d7]/40 pb-3 last:border-0">
                    <span className="text-[15px] text-[#86868b]">{m.label}</span>
                    <DataTooltip source="hardcoded">
                      <span className="text-[21px] font-semibold text-[#EB0A1E]">
                        {m.current}{m.unit || ''}
                      </span>
                    </DataTooltip>
                  </div>
                ))}
              </div>
            </div>

            {/* Future */}
            <div className="rounded-[20px] bg-[#1d1d1f] p-10">
              <p className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide mb-2">Agentic Future</p>
              <h3 className="text-[28px] font-semibold text-white tracking-[-0.02em] mb-6">
                {currentVsFuture.journey}
              </h3>
              <div className="space-y-4">
                {comparisonMetrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between border-b border-[#86868b]/20 pb-3 last:border-0">
                    <span className="text-[15px] text-[#86868b]">{m.label}</span>
                    <DataTooltip source="hardcoded">
                      <span className="text-[21px] font-semibold text-white">
                        {m.future}{m.unit || ''}
                      </span>
                    </DataTooltip>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* CAPABILITY CARDS */}
      <Section bg="white">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Four capabilities.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <div key={cap.id} className="rounded-[20px] bg-[#f5f5f7] p-10">
                {i < 2 && <div className="w-8 h-[3px] rounded-full bg-[#EB0A1E] mb-4" />}
                <h3 className="text-[28px] font-semibold text-[#1d1d1f] leading-[1.14] tracking-[-0.02em]">
                  {cap.title}
                </h3>
                <p className="mt-2 text-[15px] text-[#6e6e73] leading-[1.47]">
                  {cap.description}
                </p>
                <div className="mt-4 space-y-1.5">
                  {cap.examples.map((ex) => (
                    <div key={ex} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#86868b] shrink-0" />
                      <span className="text-[13px] text-[#86868b]">{ex}</span>
                    </div>
                  ))}
                </div>
                <DataTooltip source={cap.source}>
                  <p className="mt-4 text-[17px] font-semibold text-[#EB0A1E]">
                    {cap.impact}
                  </p>
                </DataTooltip>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* OPPORTUNITY CATALOG */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Opportunity catalog.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="space-y-6">
            {opportunityCatalog.map((opp) => (
              <div key={opp.id} className="rounded-[20px] bg-white p-10">
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div>
                    <span className="text-[12px] font-mono text-[#86868b]">{opp.id}</span>
                    <h3 className="text-[28px] font-semibold text-[#1d1d1f] leading-[1.14] tracking-[-0.02em]">
                      {opp.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[15px] text-[#6e6e73] leading-[1.47] mb-4">
                  <span className="font-medium text-[#1d1d1f]">Problem:</span> {opp.problem}
                </p>

                <div className="mb-4">
                  <p className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide mb-2">Solution</p>
                  {opp.solution.map((step) => (
                    <div key={step} className="flex items-center gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] shrink-0" />
                      <span className="text-[14px] text-[#1d1d1f] leading-[1.4]">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-[13px]">
                  {Object.entries(opp.impact).map(([key, val]) => (
                    <DataTooltip key={key} source={opp.source}>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f5f5f7] rounded-full">
                        <span className="text-[#86868b]">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-semibold text-[#1d1d1f]">{val}</span>
                      </span>
                    </DataTooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate('overview')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              Back to overview <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
