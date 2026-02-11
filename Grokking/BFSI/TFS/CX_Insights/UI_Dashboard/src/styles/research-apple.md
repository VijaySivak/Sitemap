# Apple Design Research

## Navigation Patterns
- **Top navigation bar**: Fixed/sticky, minimal items, clean typography
- **NO sidebars**: Apple.com uses full-width layouts with top nav + section tabs
- **Tab-based sections**: Horizontal pill/tab navigation for sub-sections
- **Card-based navigation**: Large clickable cards to navigate between areas
- **Breadcrumb-style**: Minimal back arrows, not full breadcrumb trails
- **Scroll-based sections**: Long pages with distinct visual sections separated by whitespace

## Typography
- **Font family**: SF Pro (system font stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter')
- **Large hero text**: 48-80px bold headlines for section headers
- **Clean hierarchy**: Clear distinction between H1 (48px), H2 (32px), H3 (24px), body (16-17px), caption (12-14px)
- **Font weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Letter spacing**: Tight on large text (-0.02em), normal on body text
- **Line height**: 1.2 for headings, 1.5-1.6 for body text

## Color Usage
- **Predominantly white/light gray backgrounds** with strategic dark text
- **Minimal accent colors**: One primary color used sparingly for CTAs and highlights
- **Neutral palette dominates**: 90%+ of the page is neutrals (white, light gray, dark gray, black)
- **Dark text on light backgrounds**: High contrast, clean readability
- **Subtle gray tones**: Multiple grays for hierarchy (text, borders, backgrounds)

## Spacing & Layout
- **Generous whitespace**: 80-120px between major sections
- **Consistent padding**: 16px, 24px, 32px, 48px, 64px scale
- **Max content width**: 980-1200px centered
- **Full-bleed sections**: Some sections span full viewport width
- **Grid system**: 12-column grid with consistent gutters (16-24px)

## Animations & Interactions
- **Scroll-triggered reveals**: Content fades/slides in as user scrolls
- **Parallax depth**: Layered elements moving at different scroll speeds
- **Smooth transitions**: 300-500ms duration, ease-out timing
- **Micro-interactions**: Subtle scale (1.02-1.05x) on hover, color shifts
- **No jarring effects**: Everything feels natural and physics-based
- **Frosted glass (backdrop-blur)**: Used on overlays, headers, and floating elements
- **Sticky elements**: Headers and navigation that fix on scroll

## Component Patterns
- **Cards**: Large border-radius (16-20px), subtle shadows, generous padding
- **Buttons**: Rounded (full-radius pills or 12px radius), solid fills for primary, outline for secondary
- **Inputs**: Clean borders, subtle focus rings
- **Modals**: Backdrop blur, centered, rounded corners
- **Tooltips**: Minimal, dark background, small arrow

## Key Takeaways for This Project
1. Use system font stack (Inter as web equivalent of SF Pro)
2. Large, bold section headers with clean hierarchy
3. Generous whitespace between sections (64-96px)
4. Frosted glass effects for navigation/overlays
5. Scroll-based fade-in animations for content
6. Neutral color palette with TFS red as strategic accent
7. No sidebars — use top nav + tabs + cards
8. Rounded corners (12-16px) on all containers
9. Subtle shadows for depth, not heavy borders
10. Smooth 300ms transitions on all interactive elements
