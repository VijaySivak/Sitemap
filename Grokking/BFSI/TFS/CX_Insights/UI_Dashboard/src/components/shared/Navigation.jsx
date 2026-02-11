import { cn } from '@utils/cn';

/**
 * Navigation — Modern navigation component (NO sidebar).
 * Supports tabs, pills, and underline variants.
 * 
 * Used by: ParentDashboard (section tabs), FaqArea (9-section tabs),
 *          SkeletonPage (demo)
 * 
 * @param {Array<{id: string, label: string, icon?: React.ReactNode}>} items - Navigation items
 * @param {string} activeId - Currently active item ID
 * @param {Function} onSelect - Callback when item is selected (receives id)
 * @param {'tabs'|'pills'|'underline'} [variant='tabs'] - Visual variant
 * @param {string} [className] - Additional CSS classes
 */

const variantStyles = {
  tabs: {
    container: 'flex items-center gap-1 p-1 bg-neutral-100 rounded-xl',
    item: 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
    active: 'bg-white text-neutral-900 shadow-sm',
    inactive: 'text-neutral-500 hover:text-neutral-700 hover:bg-white/50',
  },
  pills: {
    container: 'flex items-center gap-2 flex-wrap',
    item: 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
    active: 'bg-primary-600 text-white border-primary-600 shadow-sm',
    inactive: 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-800',
  },
  underline: {
    container: 'flex items-center gap-6',
    item: 'pb-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px',
    active: 'border-[#EB0A1E] text-[#1d1d1f]',
    inactive: 'border-transparent text-[#86868b] hover:text-[#1d1d1f] hover:border-[#d2d2d7]',
  },
};

export function Navigation({
  items,
  activeId,
  onSelect,
  variant = 'tabs',
  className,
}) {
  const styles = variantStyles[variant];

  return (
    <nav className={cn(styles.container, className)} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={activeId === item.id}
          onClick={() => onSelect(item.id)}
          className={cn(
            styles.item,
            activeId === item.id ? styles.active : styles.inactive
          )}
        >
          <span className="flex items-center gap-2">
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default Navigation;
