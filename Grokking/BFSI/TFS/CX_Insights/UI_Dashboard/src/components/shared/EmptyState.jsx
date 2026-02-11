import { InboxIcon } from 'lucide-react';
import { cn } from '@utils/cn';

/**
 * EmptyState — Displayed when there is no data to show.
 * 
 * Used by: All pages when data is empty or filtered to zero results
 * 
 * @param {React.ReactNode} [icon] - Custom icon (defaults to InboxIcon)
 * @param {string} [title='No data'] - Empty state title
 * @param {string} [description] - Optional description text
 * @param {React.ReactNode} [action] - Optional action button/link
 * @param {string} [className] - Additional CSS classes
 */
export function EmptyState({
  icon,
  title = 'No data',
  description,
  action,
  className,
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-6 text-center',
      className
    )}>
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-100 mb-4">
        {icon || <InboxIcon className="w-7 h-7 text-neutral-400" />}
      </div>
      <h3 className="text-lg font-semibold text-neutral-700">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-neutral-500 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
