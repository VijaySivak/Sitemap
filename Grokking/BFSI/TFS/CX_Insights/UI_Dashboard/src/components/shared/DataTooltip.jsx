import { useState, useRef, useEffect } from 'react';
import { cn } from '@utils/cn';

/**
 * DataTooltip — Shows the data source of any piece of data.
 * Every data point (numeric or text) must indicate its source.
 * 
 * Used by: All pages — wraps any data-displaying element
 * 
 * Sources:
 *   'hardcoded' — Static data from tfs_storyboard_v4.html (purple)
 *   'json'      — Data from JSON files (blue)
 *   'sqlite'    — Data from SQLite database (amber)
 *   'none'      — Knowledge graph data (no tooltip, future)
 * 
 * @param {'hardcoded'|'json'|'sqlite'|'none'} source - Data source type
 * @param {React.ReactNode} children - The data element to wrap
 * @param {string} [className] - Additional CSS classes
 */

const sourceConfig = {
  hardcoded: {
    label: 'Hardcoded',
    color: 'bg-data-source-hardcoded',
    textColor: 'text-data-source-hardcoded',
    bgTint: 'bg-data-source-hardcoded/10',
  },
  json: {
    label: 'JSON',
    color: 'bg-data-source-json',
    textColor: 'text-data-source-json',
    bgTint: 'bg-data-source-json/10',
  },
  sqlite: {
    label: 'SQLite',
    color: 'bg-data-source-sqlite',
    textColor: 'text-data-source-sqlite',
    bgTint: 'bg-data-source-sqlite/10',
  },
};

export function DataTooltip({ source, children, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  // No tooltip for knowledge graph data
  if (source === 'none' || !source) {
    return <>{children}</>;
  }

  const config = sourceConfig[source];
  if (!config) return <>{children}</>;

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    setPosition({
      top: -tooltipRect.height - 6,
      left: (triggerRect.width - tooltipRect.width) / 2,
    });
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
    requestAnimationFrame(updatePosition);
  };

  return (
    <span
      ref={triggerRef}
      className={cn('relative inline-flex items-center', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {/* Tooltip */}
      <span
        ref={tooltipRef}
        className={cn(
          'absolute z-50 pointer-events-none',
          'flex items-center gap-1.5 px-2 py-1 rounded-md',
          'text-[11px] font-medium whitespace-nowrap',
          'shadow-lg border border-neutral-200/50',
          config.bgTint,
          config.textColor,
          'transition-all duration-200',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        )}
        style={{
          top: position.top || -32,
          left: position.left || 0,
        }}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full', config.color)} />
        {config.label}
      </span>
    </span>
  );
}

/**
 * DataWithTooltip — Convenience wrapper that displays a value with its source tooltip.
 * 
 * Used by: All data-displaying components
 * 
 * @param {string|number} value - The data value to display
 * @param {'hardcoded'|'json'|'sqlite'|'none'} source - Data source type
 * @param {string} [className] - Additional CSS classes for the value
 */
export function DataWithTooltip({ value, source, className }) {
  return (
    <DataTooltip source={source}>
      <span className={className}>{value}</span>
    </DataTooltip>
  );
}

export default DataTooltip;
