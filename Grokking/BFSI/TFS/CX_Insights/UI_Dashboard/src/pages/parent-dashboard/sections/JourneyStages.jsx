import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Section, FadeIn, DataTooltip } from '@components/shared';
import { cn } from '@utils/cn';
import { journeyStages, journeyPaths } from '@data/hardcoded/parent-dashboard-data';

/**
 * JourneyStages — Journey stage flow + dual-axis chart + collapsible journey paths.
 * Implements VIEW 2 from tfs_storyboard_v4.html.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */

// Prepare chart data
const chartData = journeyStages.map((s) => ({
  name: s.name,
  pctActions: s.pctActions,
  burdenScore: s.burdenScore,
}));

// Channel type colors
const channelColor = {
  digital: 'bg-[#1d1d1f] text-white',
  offline: 'bg-[#EB0A1E] text-white',
  manual: 'bg-[#86868b] text-white',
};

export default function JourneyStages({ onNavigate }) {
  const [expandedPath, setExpandedPath] = useState('lease-end');

  return (
    <>
      {/* HEADER */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-6 text-center">
          <FadeIn>
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Customer Journeys</p>
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              Every step, mapped.
            </h1>
            <p className="mt-4 text-[21px] text-[#6e6e73] leading-[1.38] max-w-[600px] mx-auto">
              Journey stages analyzed across burden scores, action distribution, and friction hotspots.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* STAGE FLOW — Horizontal bars */}
      <Section bg="light">
        <FadeIn>
          <div className="space-y-1">
            {journeyStages.map((stage) => (
              <div key={stage.id} className="flex items-center gap-6 py-5 border-b border-[#d2d2d7]/40 last:border-0">
                <span className="text-[17px] font-semibold text-[#1d1d1f] w-28 shrink-0">
                  {stage.name}
                </span>
                <div className="flex-1">
                  <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        stage.hotspot ? 'bg-[#EB0A1E]' : 'bg-[#1d1d1f]'
                      )}
                      style={{ width: `${stage.pctActions}%` }}
                    />
                  </div>
                </div>
                <DataTooltip source={stage.source}>
                  <span className="text-[15px] font-medium text-[#1d1d1f] w-12 text-right shrink-0">
                    {stage.pctActions}%
                  </span>
                </DataTooltip>
                <DataTooltip source={stage.source}>
                  <span className={cn(
                    'text-[13px] w-24 shrink-0 hidden lg:block',
                    stage.hotspot ? 'text-[#EB0A1E] font-medium' : 'text-[#86868b]'
                  )}>
                    Burden: {stage.burdenScore}
                  </span>
                </DataTooltip>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* DUAL-AXIS CHART — % Actions bar + Burden line */}
      <Section bg="white">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Stage distribution.
            </h2>
            <p className="mt-3 text-[21px] text-[#6e6e73] leading-[1.38]">
              Action concentration vs. burden score by journey stage.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d2d2d7" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#86868b', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: '#86868b', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: '% of Actions', angle: -90, position: 'insideLeft', fill: '#86868b', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#EB0A1E', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: 'Burden Score', angle: 90, position: 'insideRight', fill: '#EB0A1E', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: '#1d1d1f', border: 'none', borderRadius: 8, color: '#f5f5f7', fontSize: 13 }}
                  labelStyle={{ color: '#86868b', marginBottom: 4 }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: '#86868b' }} />
                <Bar yAxisId="left" dataKey="pctActions" name="% of Actions" fill="#1d1d1f" radius={[4, 4, 0, 0]} barSize={40} />
                <Line yAxisId="right" dataKey="burdenScore" name="Burden Score" stroke="#EB0A1E" strokeWidth={2.5} dot={{ r: 5, fill: '#EB0A1E' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </Section>

      {/* JOURNEY PATHS — Collapsible cards */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Journey paths.
            </h2>
            <p className="mt-3 text-[21px] text-[#6e6e73] leading-[1.38]">
              Primary, alternate, and exception paths with step-by-step breakdowns.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="space-y-4">
            {journeyPaths.map((path) => {
              const isExpanded = expandedPath === path.id;
              const typeColors = {
                primary: 'border-l-[#0066cc]',
                alternate: 'border-l-[#86868b]',
                exception: 'border-l-[#EB0A1E]',
              };
              return (
                <div key={path.id} className={cn('bg-white rounded-[16px] border-l-4 overflow-hidden', typeColors[path.type])}>
                  {/* Path header */}
                  <button
                    onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div>
                      <h3 className="text-[21px] font-semibold text-[#1d1d1f]">{path.name}</h3>
                      <div className="mt-1 flex items-center gap-4 text-[13px] text-[#86868b]">
                        <span className="capitalize">{path.type}</span>
                        <span>·</span>
                        <DataTooltip source={path.source}>
                          <span>{path.stepCount} steps</span>
                        </DataTooltip>
                        <span>·</span>
                        <DataTooltip source={path.source}>
                          <span>{path.partyCount} parties</span>
                        </DataTooltip>
                      </div>
                    </div>
                    <ChevronDown className={cn(
                      'w-5 h-5 text-[#86868b] transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )} />
                  </button>

                  {/* Expanded steps */}
                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-[#d2d2d7]/40 pt-4 space-y-3">
                        {path.steps.map((step) => (
                          <div key={step.num} className="flex items-center gap-4">
                            <span className="text-[12px] text-[#86868b] w-6 shrink-0 text-right">{step.num}</span>
                            <div className={cn('text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0', channelColor[step.type] || channelColor.manual)}>
                              {step.channel}
                            </div>
                            <span className="text-[15px] text-[#1d1d1f] flex-1">{step.action}</span>
                            {step.condition && (
                              <span className="text-[11px] text-[#EB0A1E] font-medium">⚠ condition</span>
                            )}
                            {step.latency && (
                              <span className="text-[11px] text-[#86868b] font-medium">⏱ {step.latency}</span>
                            )}
                            <span className="text-[11px] text-[#86868b] uppercase w-20 shrink-0 text-right">{step.stage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('sentiment')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              View sentiment analysis <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
