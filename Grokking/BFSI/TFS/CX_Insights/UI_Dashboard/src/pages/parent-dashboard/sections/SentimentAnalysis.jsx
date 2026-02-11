import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Label,
} from 'recharts';
import { Section, FadeIn, DataTooltip } from '@components/shared';
import { cn } from '@utils/cn';
import { TimeFilter } from '../components/TimeFilter';
import {
  sentimentTrend, platformReviews, trustDegradationByStage,
} from '@data/hardcoded/parent-dashboard-data';

/**
 * SentimentAnalysis — Sentiment deep dive section.
 * Implements VIEW 4 from tfs_storyboard_v4.html.
 * 
 * Includes: sentiment trend chart, platform reviews, trust degradation chart.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */

// Chart data
const trendData = sentimentTrend.map((d) => ({
  name: d.quarter.replace('20', "'"),
  polarity: d.polarity,
  annotation: d.annotation,
}));

const trustData = trustDegradationByStage.map((d) => ({
  name: d.stage,
  pct: d.pct,
}));

// Custom dot for annotations
function AnnotationDot(props) {
  const { cx, cy, payload } = props;
  if (!payload.annotation) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#EB0A1E" />
      <text x={cx} y={cy - 14} textAnchor="middle" fill="#EB0A1E" fontSize={10} fontWeight={600}>
        {payload.annotation}
      </text>
    </g>
  );
}

export default function SentimentAnalysis({ onNavigate }) {
  const [activePeriod, setActivePeriod] = useState('q3-2024');

  return (
    <>
      {/* HEADER */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-6 text-center">
          <FadeIn>
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Sentiment Analysis</p>
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              What customers<br />are saying.
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* TIME FILTER + TREND CHART */}
      <Section bg="light">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em]">
              Sentiment over time
            </h2>
            <TimeFilter activePeriod={activePeriod} onSelect={setActivePeriod} />
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d2d2d7" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#86868b', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[-0.6, 0.4]}
                  tick={{ fill: '#86868b', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                >
                  <Label value="Sentiment Polarity" angle={-90} position="insideLeft" fill="#86868b" fontSize={12} />
                </YAxis>
                <ReferenceLine y={0} stroke="#d2d2d7" strokeDasharray="3 3" />
                <Tooltip
                  contentStyle={{ background: '#1d1d1f', border: 'none', borderRadius: 8, color: '#f5f5f7', fontSize: 13 }}
                  labelStyle={{ color: '#86868b', marginBottom: 4 }}
                  formatter={(val) => [val.toFixed(2), 'Polarity']}
                />
                <Line
                  dataKey="polarity"
                  stroke="#EB0A1E"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: '#EB0A1E', stroke: '#EB0A1E' }}
                  activeDot={{ r: 7 }}
                />
                <Line dataKey="polarity" stroke="none" dot={<AnnotationDot />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </Section>

      {/* PLATFORM REVIEWS */}
      <Section bg="white">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              By platform.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-8">
                {platformReviews.map((item) => (
                  <div key={item.platform}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[17px] font-medium text-[#1d1d1f]">{item.platform}</span>
                      <DataTooltip source={item.source}>
                        <span className="text-[15px] text-[#86868b]">{item.reviewCount.toLocaleString()} reviews</span>
                      </DataTooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#f5f5f7] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1d1d1f]"
                          style={{ width: `${(item.rating / item.maxRating) * 100}%` }}
                        />
                      </div>
                      <DataTooltip source={item.source}>
                        <span className={cn(
                          'text-[28px] font-semibold tracking-[-0.02em] w-16 text-right',
                          item.rating < 1.5 ? 'text-[#EB0A1E]' : 'text-[#1d1d1f]'
                        )}>
                          {item.rating}
                        </span>
                      </DataTooltip>
                    </div>
                  </div>
                ))}
              </div>
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
                Across {platformReviews.reduce((sum, p) => sum + p.reviewCount, 0).toLocaleString()} reviews
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* TRUST DEGRADATION CHART */}
      <Section bg="light">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.04em]">
              Trust degradation.
            </h2>
            <p className="mt-3 text-[21px] text-[#6e6e73] leading-[1.38]">
              Where in the journey trust breaks down, measured by negative review concentration.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trustData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d2d2d7" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#86868b', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#86868b', fontSize: 12 }} axisLine={false} tickLine={false}>
                  <Label value="% of Trust Degradation" angle={-90} position="insideLeft" fill="#86868b" fontSize={12} />
                </YAxis>
                <Tooltip
                  contentStyle={{ background: '#1d1d1f', border: 'none', borderRadius: 8, color: '#f5f5f7', fontSize: 13 }}
                  formatter={(val) => [`${val}%`, 'Trust Degradation']}
                />
                <Bar dataKey="pct" fill="#EB0A1E" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('friction')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              Explore friction layers <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
