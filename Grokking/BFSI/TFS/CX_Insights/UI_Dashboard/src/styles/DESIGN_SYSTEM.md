# TFS Customer Experience Dashboard - Design System

## Design Philosophy

**90% Apple-inspired + 10% Best Dashboard Patterns**

This design system prioritizes:
- **Clean minimalism**: Abundant whitespace, no visual clutter
- **Frosted glass effects**: Backdrop blur on navigation and overlays
- **Rounded corners**: 12-16px on all containers and cards
- **Soft shadows**: Diffused, not hard — elevation through shadow not borders
- **Smooth animations**: 300-500ms, ease-out, scroll-triggered reveals
- **Bold metrics**: Large numbers front-and-center for dashboard data
- **Widget consistency**: Uniform sizing system across all pages

---

## Color Palette

### Primary (TFS Brand) — USE SPARINGLY
| Token | Hex | Usage |
|-------|-----|-------|
| `primary-600` | `#EB0A1E` | CTAs, active states, key highlights |
| `primary-700` | `#C00000` | Hover/pressed states |
| `primary-50` | `#FEF2F2` | Light tint backgrounds |

**Rule**: Red and black are ACCENT colors only. Never use for large background areas, full widgets, or dominant elements.

### Neutrals — PRIMARY PALETTE (90% of UI)
| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-0` | `#FFFFFF` | Widget/card backgrounds |
| `neutral-50` | `#F8FAFC` | Page background |
| `neutral-100` | `#F1F5F9` | Section backgrounds |
| `neutral-200` | `#E2E8F0` | Borders, dividers |
| `neutral-300` | `#CBD5E1` | Disabled states |
| `neutral-400` | `#94A3B8` | Placeholder text |
| `neutral-500` | `#64748B` | Secondary text |
| `neutral-600` | `#475569` | Body text |
| `neutral-800` | `#1E293B` | Headings |
| `neutral-900` | `#0F172A` | Primary text |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `success-500` | `#22C55E` | Positive sentiment, good metrics |
| `warning-500` | `#F59E0B` | Warnings, medium severity |
| `error-500` | `#EF4444` | Errors, negative (NOT brand red) |
| `info-500` | `#3B82F6` | Informational, links |

### Data Source Tooltip Colors
| Source | Hex | Token |
|--------|-----|-------|
| Hardcoded | `#8B5CF6` (Purple) | `data-source-hardcoded` |
| JSON | `#3B82F6` (Blue) | `data-source-json` |
| SQLite | `#F59E0B` (Amber) | `data-source-sqlite` |

---

## Typography

### Font
**Inter** (web equivalent of SF Pro) with system font fallbacks.

### Scale
| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Hero | 48-72px | 700-800 | Page hero headlines |
| H1 | 36px | 700 | Page titles |
| H2 | 30px | 700 | Section headers |
| H3 | 24px | 600 | Sub-section headers |
| H4 | 20px | 600 | Widget titles |
| Body | 16px | 400 | Paragraph text |
| Body Small | 14px | 400 | Secondary text |
| Caption | 12px | 500 | Labels, tooltips |

### Rules
- Large headlines: `letter-spacing: -0.02em` (tight)
- Body text: `letter-spacing: 0em` (normal)
- Uppercase labels: `letter-spacing: 0.05em` (wider)
- Line height: 1.2 for headings, 1.5 for body

---

## Spacing

Based on 4px base unit. Key values:
- **4px** (1): Tight spacing (icon gaps)
- **8px** (2): Element spacing
- **16px** (4): Standard padding
- **24px** (6): Card padding
- **32px** (8): Section internal spacing
- **48px** (12): Between widget groups
- **96px** (24): Between major page sections

---

## Shadows

| Level | Usage |
|-------|-------|
| `shadow-xs` | Subtle borders replacement |
| `shadow-sm` | Default card resting state |
| `shadow` | Slightly elevated elements |
| `shadow-md` | Card hover state |
| `shadow-lg` | Prominent cards, modals |
| `shadow-xl` | Floating elements, dropdowns |
| `shadow-glow` | TFS red glow on primary hover |
| `shadow-glass` | Frosted glass shadow |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 6px | Small elements, badges |
| `rounded` | 8px | Buttons, inputs |
| `rounded-lg` | 12px | Cards, widgets |
| `rounded-xl` | 16px | Large cards, sections |
| `rounded-2xl` | 20px | Hero sections |
| `rounded-full` | 9999px | Pills, avatars |

---

## Widget System

### Size Variants
| Size | Grid Span | Min Width | Usage |
|------|-----------|-----------|-------|
| Small | 1 column | 280px | Single metric, stat card |
| Medium | 2 columns | 400px | Chart with legend, list |
| Large | 3 columns | 600px | Detailed analysis, flows |
| Full | Full width | 100% | Hero, graph, full sections |

### Widget Grid
- Base grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Gap: 24px (6)
- Widget padding: 24px (6)
- Widget background: white (`neutral-0`)
- Widget shadow: `shadow-sm` resting, `shadow-md` hover
- Widget border-radius: `rounded-xl` (16px)

---

## Animations

### Scroll-Triggered
- **Fade In Up**: Content appears from below as user scrolls (600ms, ease-out)
- **Stagger**: Grid items appear with 100ms delay between each
- **Trigger**: 10% visibility threshold

### Micro-Interactions
- **Card hover**: Lift -1px + shadow-lg (300ms)
- **Button press**: Scale 0.97 (150ms)
- **Link hover**: Color transition (200ms)

### Page Transitions
- **Fade**: 500ms between pages
- **Scale In**: 300ms for modals/overlays

### Timing
- Fast: 150ms (button press, toggle)
- Default: 300ms (color, shadow, position)
- Slow: 500ms (page transitions, reveals)
- Easing: `ease-out` for entrances, `ease-in` for exits

---

## Navigation

### Rules
- **NO SIDEBARS** — Apple-inspired navigation only
- Top navigation bar: sticky, frosted glass effect
- Tab-based sub-navigation: pills or underline style
- Card-based section navigation on overview pages
- Back button: simple arrow + text, not breadcrumbs

### Patterns
- Parent Dashboard: Top nav with section tabs
- FAQ Area: Tab bar with 9 sections
- Transition: Smooth fade between Parent ↔ FAQ areas

---

## Data Source Tooltips

Every data point (numeric or text) must show source:
- **Hardcoded**: Purple dot + "Hardcoded" label
- **JSON**: Blue dot + "JSON" label
- **SQLite**: Amber dot + "SQLite" label
- **None**: No tooltip (future knowledge graph data)

Tooltip design: Small, appears on hover, positioned above element, non-obtrusive.

---

## Do's and Don'ts

### Do
- Use generous whitespace between sections
- Lead with bold, large numbers for metrics
- Use frosted glass for overlays and sticky nav
- Apply consistent shadows (not borders) for elevation
- Use TFS red sparingly — only for CTAs and key highlights
- Animate content in on scroll
- Keep widgets consistently sized

### Don't
- Use sidebars for navigation
- Use heavy borders instead of shadows
- Make entire sections or widgets red/black
- Use inconsistent border radius values
- Skip data source tooltips on any data point
- Use jarring or fast animations
- Mix design patterns from the source prototypes
