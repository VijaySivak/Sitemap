/**
 * Animation Definitions - TFS Customer Experience Dashboard
 * 
 * Apple-inspired animation system:
 * - Scroll-triggered reveals (fade-in, slide-up)
 * - Micro-interactions (hover scale, press feedback)
 * - Page transitions (fade, slide)
 * - Staggered list animations
 * 
 * Reference: research-apple.md
 */

// =============================================================================
// KEYFRAME ANIMATIONS (for tailwind.config.js)
// =============================================================================
export const keyframes = {
  // Fade animations
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  fadeInUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInDown: {
    '0%': { opacity: '0', transform: 'translateY(-20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInLeft: {
    '0%': { opacity: '0', transform: 'translateX(-20px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  fadeInRight: {
    '0%': { opacity: '0', transform: 'translateX(20px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },

  // Scale animations
  scaleIn: {
    '0%': { opacity: '0', transform: 'scale(0.95)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  scaleOut: {
    '0%': { opacity: '1', transform: 'scale(1)' },
    '100%': { opacity: '0', transform: 'scale(0.95)' },
  },

  // Slide animations
  slideInUp: {
    '0%': { transform: 'translateY(100%)' },
    '100%': { transform: 'translateY(0)' },
  },
  slideInDown: {
    '0%': { transform: 'translateY(-100%)' },
    '100%': { transform: 'translateY(0)' },
  },

  // Shimmer for loading states
  shimmer: {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },

  // Pulse for attention
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },

  // Spin for loading
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  // Count up number animation helper
  countUp: {
    '0%': { opacity: '0', transform: 'translateY(8px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
};

// =============================================================================
// ANIMATION DEFINITIONS (for tailwind.config.js)
// =============================================================================
export const animation = {
  'fade-in': 'fadeIn 500ms ease-out forwards',
  'fade-out': 'fadeOut 300ms ease-in forwards',
  'fade-in-up': 'fadeInUp 600ms ease-out forwards',
  'fade-in-down': 'fadeInDown 600ms ease-out forwards',
  'fade-in-left': 'fadeInLeft 600ms ease-out forwards',
  'fade-in-right': 'fadeInRight 600ms ease-out forwards',
  'scale-in': 'scaleIn 300ms ease-out forwards',
  'scale-out': 'scaleOut 200ms ease-in forwards',
  'slide-in-up': 'slideInUp 500ms ease-out forwards',
  'slide-in-down': 'slideInDown 500ms ease-out forwards',
  'shimmer': 'shimmer 2s infinite linear',
  'pulse-slow': 'pulse 3s ease-in-out infinite',
  'spin-slow': 'spin 2s linear infinite',
  'count-up': 'countUp 400ms ease-out forwards',
};

// =============================================================================
// SCROLL ANIMATION CONFIG (used by FadeIn component)
// =============================================================================
export const scrollAnimationConfig = {
  threshold: 0.1,           // Trigger when 10% visible
  rootMargin: '0px 0px -50px 0px',  // Start slightly before fully in view
  triggerOnce: true,         // Only animate once
};

// =============================================================================
// STAGGER CONFIG (for list/grid animations)
// =============================================================================
export const staggerConfig = {
  fast: 50,    // 50ms between items
  DEFAULT: 100, // 100ms between items
  slow: 150,   // 150ms between items
};

// =============================================================================
// MICRO-INTERACTION CLASSES (Apple-style: NO hover bobbing or lifting)
// =============================================================================
export const microInteractions = {
  // Link hover — subtle underline or color shift only
  linkHover: 'transition-colors duration-300 hover:underline',
  // Link color — Apple blue
  linkColor: 'text-[#0066cc] hover:underline',
  // Opacity hover — for interactive tiles
  tileHover: 'transition-opacity duration-300 hover:opacity-80',
};
