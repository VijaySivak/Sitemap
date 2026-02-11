import { cn } from '@utils/cn';

/**
 * PageHeader — Consistent page/section header with title and description.
 * Apple-inspired: large bold title, subtle description, generous spacing.
 * 
 * Used by: All pages for top-level headers
 * 
 * @param {string} title - Page/section title
 * @param {string} [description] - Optional subtitle/description
 * @param {React.ReactNode} [actions] - Optional right-aligned actions (buttons, filters)
 * @param {'default'|'hero'} [variant='default'] - Size variant
 * @param {string} [className] - Additional CSS classes
 */
export function PageHeader({
  title,
  description,
  actions,
  variant = 'default',
  className,
}) {
  return (
    <div className={cn(
      'flex flex-col md:flex-row md:items-end md:justify-between gap-4',
      variant === 'hero' ? 'mb-12' : 'mb-8',
      className
    )}>
      <div>
        <h1 className={cn(
          'font-bold text-neutral-900 tracking-tight',
          variant === 'hero' ? 'text-5xl' : 'text-3xl'
        )}>
          {title}
        </h1>
        {description && (
          <p className={cn(
            'mt-2 text-neutral-500',
            variant === 'hero' ? 'text-lg' : 'text-base'
          )}>
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
