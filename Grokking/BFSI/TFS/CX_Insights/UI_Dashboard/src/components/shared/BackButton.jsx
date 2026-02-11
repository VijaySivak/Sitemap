import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@utils/cn';

/**
 * BackButton — Navigate to a specific path or browser back.
 * 
 * Used by: FaqArea (back to Parent Dashboard), detail views (back to list)
 * 
 * @param {string} [to] - Path to navigate to (if omitted, uses browser back)
 * @param {string} [label='Back'] - Button label
 * @param {'default'|'minimal'|'icon'} [variant='default'] - Visual variant
 * @param {string} [className] - Additional CSS classes
 */

const variantStyles = {
  default: 'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200',
  minimal: 'flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors duration-200',
  icon: 'flex items-center justify-center w-10 h-10 rounded-xl text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-all duration-200',
};

export function BackButton({
  to,
  label = 'Back',
  variant = 'default',
  className,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(variantStyles[variant], className)}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4" />
      {variant !== 'icon' && <span>{label}</span>}
    </button>
  );
}

export default BackButton;
