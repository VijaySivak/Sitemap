import { useEffect, useRef, useState } from 'react';
import { cn } from '@utils/cn';

/**
 * FadeIn — Scroll-triggered fade-in animation wrapper.
 * Uses IntersectionObserver for performant scroll detection.
 * 
 * Used by: All pages — wraps sections and widgets for scroll-based reveal
 * 
 * @param {'up'|'down'|'left'|'right'|'none'} [direction='up'] - Slide direction
 * @param {number} [delay=0] - Animation delay in ms
 * @param {number} [duration=600] - Animation duration in ms
 * @param {number} [threshold=0.1] - Visibility threshold (0-1)
 * @param {boolean} [once=true] - Only animate once
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Content to animate
 */

const directionTransforms = {
  up: 'translateY(20px)',
  down: 'translateY(-20px)',
  left: 'translateX(-20px)',
  right: 'translateX(20px)',
  none: 'none',
};

export function FadeIn({
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
  className,
  children,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : directionTransforms[direction],
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * StaggerChildren — Wraps children with staggered FadeIn delays.
 * 
 * Used by: Widget grids, card lists for sequential reveal
 * 
 * @param {'up'|'down'|'left'|'right'} [direction='up'] - Slide direction
 * @param {number} [staggerDelay=100] - Delay between each child in ms
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Items to stagger
 */
export function StaggerChildren({
  direction = 'up',
  staggerDelay = 100,
  className,
  children,
}) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <FadeIn key={index} direction={direction} delay={index * staggerDelay}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
}

export default FadeIn;
