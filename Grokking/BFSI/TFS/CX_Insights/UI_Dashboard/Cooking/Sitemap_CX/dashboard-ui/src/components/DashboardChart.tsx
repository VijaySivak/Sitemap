import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ChartProps {
  data: { name: string; value: number }[];
  title: string;
  type: 'pie' | 'bar';
  onSegmentClick?: (data: { name: string; value: number }) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const DashboardChart: React.FC<ChartProps> = ({ data, title, type, onSegmentClick }) => {
  const handleClick = (entry: { name: string; value: number }) => {
    if (onSegmentClick) {
      onSegmentClick(entry);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      {onSegmentClick && (
        <p className="text-xs text-slate-400 -mt-2 mb-2">Click on segments to view URLs</p>
      )}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                onClick={(entry) => handleClick(entry)}
                style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          ) : (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar 
                dataKey="value" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]} 
                onClick={(entry) => handleClick(entry)}
                style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
