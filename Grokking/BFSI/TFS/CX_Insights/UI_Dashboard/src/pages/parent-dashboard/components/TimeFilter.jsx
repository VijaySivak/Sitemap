import { cn } from '@utils/cn';

/**
 * TimeFilter — Apple-style inline time period selector.
 * 
 * @param {Array} periods - Period options [{id, label}]
 * @param {string} activePeriod - Currently selected period ID
 * @param {Function} onSelect - Callback when period is selected
 * @param {string} [className] - Additional CSS classes
 */

const defaultPeriods = [
  { id: 'q1-2023', label: 'Q1 \'23' },
  { id: 'q2-2023', label: 'Q2 \'23' },
  { id: 'q3-2023', label: 'Q3 \'23' },
  { id: 'q4-2023', label: 'Q4 \'23' },
  { id: 'q1-2024', label: 'Q1 \'24' },
  { id: 'q2-2024', label: 'Q2 \'24' },
  { id: 'q3-2024', label: 'Q3 \'24' },
  { id: 'q4-2024', label: 'Q4 \'24' },
];

export function TimeFilter({ periods = defaultPeriods, activePeriod, onSelect, className }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {periods.map((period) => (
        <button
          key={period.id}
          onClick={() => onSelect(period.id)}
          className={cn(
            'px-3 py-1.5 text-[12px] font-medium rounded-full transition-colors duration-200',
            activePeriod === period.id
              ? 'bg-[#1d1d1f] text-white'
              : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

export { defaultPeriods };
export default TimeFilter;
