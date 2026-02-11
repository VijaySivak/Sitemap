import { Loader2 } from 'lucide-react';
import { cn } from '@utils/cn';

/**
 * Loading — Spinner component with size variants.
 * 
 * Used by: All pages during data loading states
 * 
 * @param {'sm'|'md'|'lg'} [size='md'] - Spinner size
 * @param {string} [label] - Optional loading text
 * @param {boolean} [fullScreen=false] - Center in full viewport
 * @param {string} [className] - Additional CSS classes
 */

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Loading({
  size = 'md',
  label,
  fullScreen = false,
  className,
}) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn(sizeStyles[size], 'animate-spin text-primary-600')} />
      {label && (
        <p className="text-sm text-neutral-500 font-medium">{label}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        {content}
      </div>
    );
  }

  return content;
}

export default Loading;
