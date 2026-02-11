import { cn } from '@utils/cn';

/**
 * Widget — Content container component.
 * 
 * Apple-inspired: Seamless by default. Content sections blend into the page.
 * Use variant='card' only when you specifically need a contained card look
 * (e.g., small data tiles in a grid).
 * 
 * @param {'small'|'medium'|'large'|'full'} size - Grid column span
 * @param {'seamless'|'card'|'tile'} [variant='seamless'] - Visual style
 * @param {string} [header] - Optional header text
 * @param {React.ReactNode} [headerRight] - Optional right-aligned header content
 * @param {React.ReactNode} [footer] - Optional footer content
 * @param {Function} [onClick] - Click handler
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Widget content
 */

const sizeStyles = {
  small: 'col-span-1',
  medium: 'col-span-1 md:col-span-2',
  large: 'col-span-1 md:col-span-2 lg:col-span-3',
  full: 'col-span-full',
};

const variantStyles = {
  // Default: no borders, no shadows, blends into page
  seamless: '',
  // Subtle card: very light background, soft rounding, no shadow
  card: 'bg-white rounded-2xl p-6',
  // Tile: Apple-style tile with background fill, used in grids
  tile: 'rounded-2xl p-8 overflow-hidden',
};

export function Widget({
  size = 'small',
  variant = 'seamless',
  header,
  headerRight,
  footer,
  onClick,
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        sizeStyles[size],
        variantStyles[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Header */}
      {header && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">{header}</h3>
          {headerRight && <div className="flex items-center">{headerRight}</div>}
        </div>
      )}

      {/* Content */}
      <div>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-6 pt-4 border-t border-neutral-200/60">
          {footer}
        </div>
      )}
    </div>
  );
}

/**
 * WidgetGrid — Responsive grid for arranging content tiles.
 * Apple-style: generous gaps, clean grid.
 * 
 * @param {number} [cols=3] - Number of columns on large screens
 * @param {string} [gap='gap-5'] - Gap size
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Widget components
 */
export function WidgetGrid({ cols = 3, gap, className, children }) {
  const colStyles = {
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn(colStyles[cols] || colStyles[3], gap || 'gap-5', className)}>
      {children}
    </div>
  );
}

/**
 * Section — Apple-style full-width content section.
 * Separated by background color, not borders.
 * 
 * @param {'white'|'light'|'dark'} [bg='white'] - Background color
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Section content
 */
const bgStyles = {
  white: 'bg-white',
  light: 'bg-[#f5f5f7]',
  dark: 'bg-[#1d1d1f] text-white',
};

export function Section({ bg = 'white', className, children }) {
  return (
    <section className={cn(bgStyles[bg], className)}>
      <div className="max-w-[980px] mx-auto px-6 py-20 md:py-28">
        {children}
      </div>
    </section>
  );
}

export default Widget;
