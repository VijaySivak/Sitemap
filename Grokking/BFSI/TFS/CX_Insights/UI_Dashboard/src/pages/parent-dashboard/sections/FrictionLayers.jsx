import { ChevronRight } from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { Section, FadeIn, DataTooltip } from '@components/shared';
import { cn } from '@utils/cn';
import {
  frictionConstraints, frictionTypeSplit, journeyStages,
} from '@data/hardcoded/parent-dashboard-data';

/**
 * FrictionLayers — Friction analysis section.
 * Implements VIEW 5 from tfs_storyboard_v4.html.
 * 
 * Includes: constraint badges, friction pie chart, stage heatmap.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */

const typeStyles = {
  structural: { bg: 'bg-[#1d1d1f]', text: 'text-white', label: 'Structural' },
  policy: { bg: 'bg-[#EB0A1E]', text: 'text-white', label: 'Policy' },
  design: { bg: 'bg-[#86868b]', text: 'text-white', label: 'Design' },
};

const pieColors = ['#1d1d1f', '#EB0A1E', '#86868b'];

// Stage heatmap data — burden mapped to color intensity
const heatmapData = journeyStages.map((s) => ({
  name: s.name,
  burden: s.burdenScore,
}));

export default function FrictionLayers({ onNavigate }) {
  return (
    <>
      {/* HEADER */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-6 text-center">
          <FadeIn>
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Friction Analysis</p>
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              Where friction lives.
            </h1>
            <p className="mt-4 text-[21px] text-[#6e6e73] leading-[1.38] max-w-[600px] mx-auto">
              13 friction constraints identified across structural, policy, and design categories.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* KEY INSIGHT — Full-width dark callout */}
      <section className="bg-[#1d1d1f]">
        <div className="max-w-[980px] mx-auto px-6 py-16 text-center">
          <FadeIn>
            <DataTooltip source="hardcoded">
              <p className="text-[56px] md:text-[80px] font-semibold text-white leading-[1.05] tracking-[-0.045em]">
                77%
              </p>
            </DataTooltip>
            <p className="mt-3 text-[21px] text-[#86868b] leading-[1.38]">
              of friction points are policy or design choices — <span className="text-white font-medium">within TFS control</span>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CONSTRAINT BADGES */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              All constraints.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          {['structural', 'policy', 'design'].map((type) => {
            const style = typeStyles[type];
            const items = frictionConstraints.filter((c) => c.type === type);
            return (
              <div key={type} className="mb-10 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn('w-3 h-3 rounded-full', style.bg)} />
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f]">
                    {style.label}
                  </h3>
                  <span className="text-[13px] text-[#86868b]">
                    {type === 'structural' ? 'Cannot change' : type === 'policy' ? 'TFS can change' : 'TFS should change'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((constraint) => (
                    <DataTooltip key={constraint.id} source={constraint.source}>
                      <span className={cn(
                        'inline-flex items-center px-4 py-2 rounded-full text-[14px] font-medium',
                        style.bg, style.text
                      )}>
                        {constraint.label}
                      </span>
                    </DataTooltip>
                  ))}
                </div>
              </div>
            );
          })}
        </FadeIn>
      </Section>

      {/* CHARTS — Pie + Heatmap side by side */}
      <Section bg="white">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Friction type pie */}
            <div>
              <h3 className="text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mb-6">
                By type
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={frictionTypeSplit}
                      dataKey="pct"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      innerRadius={60}
                      paddingAngle={2}
                      strokeWidth={0}
                    >
                      {frictionTypeSplit.map((entry, i) => (
                        <Cell key={entry.type} fill={pieColors[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1d1d1f', border: 'none', borderRadius: 8, color: '#f5f5f7', fontSize: 13 }}
                      formatter={(val, name) => [`${val}%`, name]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 13, color: '#86868b' }}
                      formatter={(value) => <span className="text-[#6e6e73]">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stage burden heatmap */}
            <div>
              <h3 className="text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mb-6">
                Stage burden
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={heatmapData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d2d2d7" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#86868b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#1d1d1f', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip
                      contentStyle={{ background: '#1d1d1f', border: 'none', borderRadius: 8, color: '#f5f5f7', fontSize: 13 }}
                      formatter={(val) => [val, 'Burden Score']}
                    />
                    <Bar dataKey="burden" radius={[0, 4, 4, 0]} barSize={24}>
                      {heatmapData.map((entry) => (
                        <Cell key={entry.name} fill={entry.burden >= 7 ? '#EB0A1E' : '#1d1d1f'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate('operating')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              View operating model <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
