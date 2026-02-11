# Skeleton Page — Design Approval

## Purpose
This page demonstrates the complete design system and all core components before real content implementation begins. It serves as a visual contract for the look, feel, and interaction patterns of the final dashboard.

## What It Demonstrates

### 1. Frosted Glass Header
- Sticky top navigation with `backdrop-blur`
- TFS branding (red dot + name)
- BackButton component

### 2. Hero Section
- Dark gradient background with subtle red radial accent
- Large bold typography (Apple-inspired)
- Primary CTA (red) + Secondary CTA (glass)
- Rounded 2xl corners

### 3. Navigation (NO Sidebar)
- All three variants: tabs, pills, underline
- Parent Dashboard nav (8 sections)
- FAQ Insights nav (9 sections with icons)
- Interactive variant switcher

### 4. Widget Grid
- **Small widgets**: Single metrics with bold numbers, trend indicators, data tooltips
- **Medium widgets**: Sentiment list + chart placeholder
- **Large widgets**: Bar chart visualization spanning full row
- Consistent spacing, shadows, hover effects

### 5. Data Source Tooltips
- Hardcoded (purple) — from tfs_storyboard_v4.html
- JSON (blue) — from faq_data_gemini.json
- SQLite (amber) — from tfs_crawl.sqlite
- Hover to reveal, minimal and non-obtrusive

### 6. Animations
- FadeIn scroll-triggered reveals with staggered delays
- Widget hover lift effect (-1px + shadow increase)
- Button press scale (0.97)
- Smooth 300ms transitions

### 7. Utility Components
- Loading spinner with label
- EmptyState with icon, title, description

### 8. FAQ Insights Entry Point
- Dark gradient card with CTA button
- Preview of the Parent → FAQ navigation flow

## Design Decisions
- **No sidebars**: All navigation is top-level tabs/pills
- **Neutral-dominant palette**: 90%+ neutrals, red only on CTAs and highlights
- **Generous whitespace**: 96px between major sections
- **Soft shadows**: Elevation through shadow, not borders
- **Inter font**: Web equivalent of SF Pro
- **Rounded corners**: 16px on widgets, 20px on hero sections

## Route
Accessible at `/skeleton`
