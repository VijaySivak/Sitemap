/**
 * Design Tokens - TFS Customer Experience Dashboard
 * 
 * Comprehensive design system based on:
 * - 90% Apple-inspired aesthetic (clean, minimal, frosted glass, generous whitespace)
 * - 10% Best dashboard design patterns (bold metrics, widget grid, data viz)
 * - Toyota Financial Services brand colors (used sparingly as accents)
 * 
 * Reference: research-apple.md, research-dashboards.md, research-toyota.md
 */

// =============================================================================
// COLORS
// =============================================================================
export const colors = {
  // Toyota Financial Services brand — USE SPARINGLY (accents, CTAs, highlights only)
  primary: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#EB0A1E',   // TFS Red — DEFAULT
    700: '#C00000',   // TFS Dark Red (hover)
    800: '#991B1B',
    900: '#7F1D1D',
    DEFAULT: '#EB0A1E',
  },

  // Neutral palette — PRIMARY palette (90% of UI)
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',    // Page background
    100: '#F1F5F9',   // Section backgrounds
    200: '#E2E8F0',   // Borders, dividers
    300: '#CBD5E1',   // Disabled states
    400: '#94A3B8',   // Placeholder text
    500: '#64748B',   // Secondary text
    600: '#475569',   // Body text
    700: '#334155',   // Strong body text
    800: '#1E293B',   // Headings
    900: '#0F172A',   // Primary text (softer than pure black)
    950: '#020617',   // Near-black
  },

  // Semantic colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    400: '#4ADE80',
    500: '#22C55E',   // DEFAULT
    600: '#16A34A',
    700: '#15803D',
    DEFAULT: '#22C55E',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    400: '#FACC15',
    500: '#F59E0B',   // DEFAULT
    600: '#D97706',
    700: '#B45309',
    DEFAULT: '#F59E0B',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    400: '#F87171',
    500: '#EF4444',   // DEFAULT (distinct from brand red)
    600: '#DC2626',
    700: '#B91C1C',
    DEFAULT: '#EF4444',
  },
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    400: '#60A5FA',
    500: '#3B82F6',   // DEFAULT
    600: '#2563EB',
    700: '#1D4ED8',
    DEFAULT: '#3B82F6',
  },

  // Knowledge graph entity colors (from Temporary_test source)
  entity: {
    product: '#0EA5E9',
    customerIntent: '#A855F7',
    instructionStep: '#94A3B8',
    condition: '#EA580C',
    latencyWindow: '#FACC15',
    escalationPath: '#2DD4BF',
    valueLeakage: '#EF4444',
    responsibleParty: '#22C55E',
    evidenceAnchor: '#64748B',
    contentAsset: '#EC4899',
  },

  // Channel colors (from Temporary_test source)
  channel: {
    web: '#3B82F6',
    mobile: '#8B5CF6',
    phone: '#F59E0B',
    dealer: '#EF4444',
    mail: '#6B7280',
    external: '#EC4899',
  },

  // Data source tooltip colors
  dataSource: {
    hardcoded: '#8B5CF6',   // Purple
    json: '#3B82F6',        // Blue
    sqlite: '#F59E0B',      // Amber
  },
};

// =============================================================================
// SPACING (based on 4px base unit, Apple-style generous scale)
// =============================================================================
export const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  // Apple-style section spacing
  section: '96px',        // Between major page sections
  sectionMobile: '64px',  // Section spacing on mobile
  container: '1280px',    // Max content width
};

// =============================================================================
// TYPOGRAPHY (Inter as web equivalent of SF Pro)
// =============================================================================
export const typography = {
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
    mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],           // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],        // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],           // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],        // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],         // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],          // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],     // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],       // 36px
    '5xl': ['3rem', { lineHeight: '1.2' }],             // 48px — Hero headings
    '6xl': ['3.75rem', { lineHeight: '1.1' }],          // 60px — Large hero
    '7xl': ['4.5rem', { lineHeight: '1.1' }],           // 72px — Extra large hero
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  letterSpacing: {
    tighter: '-0.03em',    // Large headlines
    tight: '-0.02em',      // Section headers
    normal: '0em',         // Body text
    wide: '0.025em',       // Small caps, labels
    wider: '0.05em',       // Uppercase labels
    widest: '0.1em',       // Decorative
  },
};

// =============================================================================
// SHADOWS (Apple-style soft, diffused shadows)
// =============================================================================
export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
  md: '0 8px 16px -4px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
  lg: '0 16px 32px -8px rgba(0, 0, 0, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.03)',
  xl: '0 24px 48px -12px rgba(0, 0, 0, 0.12)',
  '2xl': '0 32px 64px -16px rgba(0, 0, 0, 0.16)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  // Colored shadows for cards on hover
  glow: '0 8px 32px -8px rgba(235, 10, 30, 0.15)',     // TFS red glow
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',        // Glass shadow
};

// =============================================================================
// BORDER RADIUS (Apple-style rounded corners)
// =============================================================================
export const borderRadius = {
  none: '0px',
  sm: '6px',
  DEFAULT: '8px',
  md: '10px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

// =============================================================================
// WIDGET SIZES (responsive, not fixed pixels)
// =============================================================================
export const widgetSizes = {
  small: {
    minWidth: '280px',
    minHeight: '180px',
    gridColumn: 'span 1',
    description: 'Single metric card, stat display, small chart',
  },
  medium: {
    minWidth: '400px',
    minHeight: '280px',
    gridColumn: 'span 2',
    description: 'Multi-metric card, chart with legend, list widget',
  },
  large: {
    minWidth: '600px',
    minHeight: '380px',
    gridColumn: 'span 3',
    description: 'Full-width chart, detailed analysis, flow diagram',
  },
  full: {
    minWidth: '100%',
    minHeight: '400px',
    gridColumn: '1 / -1',
    description: 'Full-width section, hero, knowledge graph',
  },
};

// =============================================================================
// TRANSITIONS (Apple-style smooth, natural)
// =============================================================================
export const transitions = {
  fast: '150ms ease',
  DEFAULT: '300ms ease',
  slow: '500ms ease',
  slower: '700ms ease',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// =============================================================================
// BACKDROP BLUR (Apple frosted glass)
// =============================================================================
export const backdropBlur = {
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
};
