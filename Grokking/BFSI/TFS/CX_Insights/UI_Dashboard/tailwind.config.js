import { colors, shadows, borderRadius, typography } from './src/styles/design-tokens.js';
import { keyframes, animation } from './src/styles/animations.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        entity: colors.entity,
        channel: colors.channel,
        'data-source': colors.dataSource,
      },

      // Typography
      fontFamily: {
        sans: typography.fontFamily.sans,
        mono: typography.fontFamily.mono,
      },
      fontSize: typography.fontSize,
      letterSpacing: typography.letterSpacing,

      // Shadows
      boxShadow: {
        xs: shadows.xs,
        sm: shadows.sm,
        DEFAULT: shadows.DEFAULT,
        md: shadows.md,
        lg: shadows.lg,
        xl: shadows.xl,
        '2xl': shadows['2xl'],
        inner: shadows.inner,
        glow: shadows.glow,
        glass: shadows.glass,
      },

      // Border Radius
      borderRadius: borderRadius,

      // Animations
      keyframes: keyframes,
      animation: animation,

      // Backdrop Blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },

      // Custom spacing for sections
      maxWidth: {
        container: '1280px',
      },

      // Transition timing functions
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
