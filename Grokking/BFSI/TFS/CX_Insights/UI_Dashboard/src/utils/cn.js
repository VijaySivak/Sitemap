import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging Tailwind CSS classes with clsx.
 * Combines conditional class logic (clsx) with Tailwind conflict resolution (twMerge).
 * 
 * @param {...(string|object|array)} inputs - Class names, objects, or arrays
 * @returns {string} Merged class string
 * 
 * Used by: All components across the application
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
