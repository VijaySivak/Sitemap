import { ChevronRight } from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { Section, FadeIn, DataTooltip } from '@components/shared';
import { cn } from '@utils/cn';
import { parties, burdenByParties } from '@data/hardcoded/parent-dashboard-data';

/**
 * OperatingModel — Party flow, ownership, and burden analysis.
 * Implements VIEW 6 from tfs_storyboard_v4.html.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */

const ownershipData = parties
  .filter((p) => p.ownership !== null)
  .map((p) => ({ name: p.name, value: p.ownership }));

const pieColors = ['#1d1d1f', '#86868b', '#EB0A1E', '#d2d2d7'];

export default function OperatingModel({ onNavigate }) {
  const customer = parties.find((p) => p.id === 'customer');
  const digitalPlatform = parties.find((p) => p.id === 'digital');

  return (
    <>
      {/* HEADER */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-6 text-center">
          <FadeIn>
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Operating Model</p>
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              The operating model.
            </h1>
            <p className="mt-4 text-[21px] text-[#6e6e73] leading-[1.38] max-w-[600px] mx-auto">
              Party ownership, handoff patterns, and the customer-as-integrator problem.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CUSTOMER-AS-INTEGRATOR CALLOUT */}
      <section className="bg-[#1d1d1f]">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <DataTooltip source={customer.source}>
                  <p className="text-[56px] font-semibold text-white leading-[1] tracking-[-0.04em]">
                    {customer.metrics.burden}
                  </p>
                </DataTooltip>
                <p className="mt-2 text-[15px] text-[#86868b]">Total burden (days)</p>
              </div>
              <div>
                <DataTooltip source={customer.source}>
                  <p className="text-[56px] font-semibold text-[#EB0A1E] leading-[1] tracking-[-0.04em]">
                    {customer.metrics.avgParties}
                  </p>
                </DataTooltip>
                <p className="mt-2 text-[15px] text-[#86868b]">Avg parties per journey</p>
              </div>
              <div>
                <DataTooltip source={customer.source}>
                  <p className="text-[56px] font-semibold text-white leading-[1] tracking-[-0.04em]">
                    {customer.metrics.sentiment}
                  </p>
                </DataTooltip>
                <p className="mt-2 text-[15px] text-[#86868b]">Avg sentiment score</p>
              </div>
            </div>
            <p className="mt-10 text-center text-[21px] text-[#86868b]">
              The customer is the <span className="text-white font-semibold">forced integrator</span> across all parties.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PARTY FLOW */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Party ownership.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {parties.filter((p) => p.ownership !== null).map((party) => (
              <div key={party.id} className="rounded-[16px] bg-white p-6 text-center">
                <p className="text-[32px] mb-2">{party.icon}</p>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f]">{party.name}</h3>
                <DataTooltip source={party.source}>
                  <p className="mt-2 text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em]">
                    {party.ownership}%
                  </p>
                </DataTooltip>
                <p className="mt-1 text-[12px] text-[#86868b]">{party.role}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* CHARTS — Ownership pie + Burden by parties */}
      <Section bg="white">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Ownership pie */}
            <div>
              <h3 className="text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mb-6">
                Ownership split
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ownershipData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      innerRadius={60}
                      paddingAngle={2}
                      strokeWidth={0}
                    >
                      {ownershipData.map((_, i) => (
                        <Cell key={i} fill={pieColors[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1d1d1f', border: 'none', borderRadius: 8, color: '#f5f5f7', fontSize: 13 }}
                      formatter={(val, name) => [`${val}%`, name]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 13 }}
                      formatter={(value) => <span className="text-[#6e6e73]">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Burden by party count */}
            <div>
              <h3 className="text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mb-6">
                Burden by party count
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={burdenByParties} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d2d2d7" vertical={false} />
                    <XAxis dataKey="parties" tick={{ fill: '#86868b', fontSize: 13 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#86868b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#1d1d1f', border: 'none', borderRadius: 8, color: '#f5f5f7', fontSize: 13 }}
                      formatter={(val) => [val, 'Burden Score']}
                    />
                    <Bar dataKey="burden" radius={[4, 4, 0, 0]} barSize={50}>
                      {burdenByParties.map((entry) => (
                        <Cell key={entry.parties} fill={entry.burden >= 7 ? '#EB0A1E' : '#1d1d1f'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* DIGITAL PLATFORM GAP */}
      <Section bg="light">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
                Digital platform gap.
              </h2>
              <p className="mt-4 text-[15px] text-[#86868b] leading-[1.58] max-w-[380px]">
                Current digital platform handles only 42% of customer interactions.
                Industry benchmark is 55-65%, best-in-class is 75%+.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                {[
                  { label: 'Current', value: 42, color: 'bg-[#EB0A1E]' },
                  { label: 'Benchmark', value: 60, color: 'bg-[#86868b]' },
                  { label: 'Best-in-class', value: 75, color: 'bg-[#1d1d1f]' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[15px] text-[#1d1d1f] font-medium">{item.label}</span>
                      <DataTooltip source="hardcoded">
                        <span className="text-[15px] text-[#86868b]">{item.value}%</span>
                      </DataTooltip>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                      <div className={cn('h-full rounded-full', item.color)} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide mb-3">Top Gaps</p>
                {digitalPlatform.topGaps.map((gap) => (
                  <div key={gap} className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EB0A1E] shrink-0" />
                    <span className="text-[14px] text-[#6e6e73]">{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate('ontology')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              Explore ontology <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
