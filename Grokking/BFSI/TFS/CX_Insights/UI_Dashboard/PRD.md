# TFS Customer Experience Dashboard - Product Requirements Document (PRD)

## Document Information
- **Project Name**: TFS Customer Experience Dashboard
- **Version**: 1.0
- **Last Updated**: February 10, 2026
- **Project Location**: `CX_Insights/UI_Dashboard/`
- **Reference Document**: `PROJECT_GUIDE.md` (for detailed context)

---

## Table of Contents

1. [Overview & How to Use](#overview--how-to-use)
2. [Critical Principles](#critical-principles)
3. [Chapter 0: Project Setup](#chapter-0-project-setup--environment-configuration)
4. [Chapter 1: Design System](#chapter-1-design-system-research--definition)
5. [Chapter 2: Core Components](#chapter-2-core-component-library)
6. [Chapter 3: Skeleton Page](#chapter-3-skeleton-page--design-approval)
7. [Chapter 4: Parent Dashboard Planning](#chapter-4-parent-dashboard---content-analysis--planning)
8. [Chapter 5: Parent Dashboard Navigation](#chapter-5-parent-dashboard---navigation-system)
9. [Chapter 6: Product Analysis](#chapter-6-parent-dashboard---product-analysis-section)
10. [Chapter 7: Journey & Sentiment](#chapter-7-parent-dashboard---journey--sentiment-analysis)
11. [Chapter 8: Parent Dashboard Integration](#chapter-8-parent-dashboard---additional-views--integration)
12. [Chapter 9: FAQ Sitemap Analytics](#chapter-9-faq-dashboard---sitemap-analytics-section)
13. [Chapter 10: FAQ Business Metrics](#chapter-10-faq-dashboard---business-metrics-section)
14. [Chapter 11: FAQ Dashboard Integration](#chapter-11-faq-dashboard---integration--navigation)
15. [Chapter 12: FAQ Graph Visualization](#chapter-12-faq-section---graph-visualization)
16. [Chapter 13: FAQ Home & Products](#chapter-13-faq-section---home--products)
17. [Chapter 14: FAQ Entities & Journeys](#chapter-14-faq-section---entities--journeys)
18. [Chapter 15: FAQ Metrics & Story](#chapter-15-faq-section---metrics-story--data)
19. [Chapter 16: Navigation Integration](#chapter-16-navigation-integration--state-management)
20. [Chapter 17: Animations](#chapter-17-animations--interactions)
21. [Chapter 18: Responsive Design](#chapter-18-responsive-design--cross-browser-testing)
22. [Chapter 19: Final Polish](#chapter-19-performance-optimization--final-polish)

---

## Overview & How to Use

This PRD provides implementation instructions for building the TFS Customer Experience Dashboard. Each chapter is designed to be implementable in one session with clear objectives and acceptance criteria.

**Important**: Read `PROJECT_GUIDE.md` first for comprehensive design philosophy, detailed requirements, and overall vision.

### How to Use
1. Read PROJECT_GUIDE.md for full context
2. Complete chapters sequentially (they build on each other)
3. Check off acceptance criteria as you complete tasks
4. Reference design system (Chapter 1) throughout
5. Use core components (Chapter 2) in all subsequent chapters
6. Update CHANGELOG.md to track progress

### Chapter Dependencies
- **Chapters 0-1**: No dependencies
- **Chapter 2**: Requires Chapter 1 (design system)
- **Chapter 3**: Requires Chapters 1-2 (design + components)
- **Chapters 4-15**: Require Chapters 0-3 (foundation)
- **Chapters 16-19**: Require all previous chapters

---

## Critical Principles

**Apply to ALL chapters:**

### Design Consistency
- NO reuse of existing styling from source files
- Apply design system consistently
- 90% Apple aesthetic + 10% best dashboard patterns
- Use Toyota Financial Services colors appropriately (dark colors sparingly)
- NO sidebars - modern navigation only

### Data Source Transparency
Every data point must have tooltip:
- **Hardcoded**: From `tfs_storyboard_v4.html`
- **JSON**: From JSON files
- **SQLite**: From database files
- **No tooltip**: Knowledge graph (not implemented yet)

### Code Organization
- All code in `UI_Dashboard/` - no external references
- Modular structure with clear separation
- Shared components in `src/components/shared/`
- Page-specific components in respective directories

### Animation & Interaction
- Smooth transitions (not just hover effects)
- Scroll-based animations where appropriate
- Micro-interactions for feedback
- Performance-conscious - no jank

---

# Chapter 0: Project Setup & Environment Configuration

## Overview
Initialize React + Vite project, install dependencies, configure TailwindCSS, create directory structure, and copy data files.

**Reference**: PROJECT_GUIDE.md "Phase 1: Project Setup"

## Objectives
- [x] Create Vite React project
- [x] Install all dependencies
- [x] Configure TailwindCSS
- [x] Create directory structure
- [x] Copy all data files
- [x] Set up routing and utilities

## Key Tasks

### 1. Initialize Project
```bash
cd CX_Insights
npm create vite@latest UI_Dashboard -- --template react
cd UI_Dashboard
npm install
```

### 2. Install Dependencies
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react recharts react-force-graph-2d react-router-dom clsx tailwind-merge
```

### 3. Configure TailwindCSS
- Update `tailwind.config.js` with content paths
- Add Tailwind directives to `src/index.css`
- Test with utility classes

### 4. Create Directory Structure
```
src/
├── pages/ (parent-dashboard, faq-dashboard, faq-graph, faq-home, faq-products, faq-entities, faq-journeys, faq-metrics, faq-story, faq-data)
├── components/shared/
├── data/ (json, sqlite, hardcoded)
├── styles/
├── utils/
└── hooks/
```

### 5. Copy Data Files
**To `src/data/json/`:**
- From `Sitemap_CX/dashboard-ui/public/data/`: stats.json, faqs.json, external-stats.json, business-metrics.json, redundant-content.json, pdf-analysis.json
- From `Temporary_test/`: faq_data_gemini.json

**To `src/data/sqlite/`:**
- From `Sitemap_CX/output/`: SQLite database file(s)

### 6. Set Up Routing & Utilities
- Create basic `App.jsx` with React Router
- Configure path aliases in `vite.config.js`
- Create `src/utils/cn.js` for className utility

## Acceptance Criteria
- [x] Project runs with `npm run dev`
- [x] All dependencies installed
- [x] TailwindCSS working
- [x] Directory structure complete
- [x] All data files copied
- [x] Routing configured
- [x] Path aliases working

## Deliverables
- Working Vite React project
- Configured `package.json`, `tailwind.config.js`, `vite.config.js`
- Complete directory structure
- All data files in `src/data/`
- Basic routing and utilities

---

# Chapter 1: Design System Research & Definition

## Overview
Research Apple's design, best dashboards, and Toyota branding to create comprehensive design system.

**Reference**: PROJECT_GUIDE.md "Phase 0: Research & Design System Creation"

## Objectives
- [x] Research Apple design patterns (NO sidebars)
- [x] Research best dashboard designs
- [x] Extract Toyota Financial Services colors
- [x] Define complete design tokens
- [x] Configure TailwindCSS theme
- [x] Create design documentation

## Key Tasks

### 1. Research Apple Design
Visit apple.com and document:
- Navigation patterns (top nav, NO sidebars)
- Color usage, typography, spacing
- Animations and scroll effects
Create `src/styles/research-apple.md`

### 2. Research Dashboard Designs
Search "best dashboard designs 2024" and document:
- Widget layouts, data visualization patterns
- Metric display styles, color usage
Create `src/styles/research-dashboards.md`

### 3. Extract Toyota Colors
Visit toyotafinancial.com and extract:
- Primary colors (reds, blacks)
- Neutral colors, usage patterns
Create `src/styles/research-toyota.md`

### 4. Define Design Tokens
Create `src/styles/design-tokens.js` with:
```javascript
export const colors = {
  primary: { 50-900 scale, DEFAULT: '#EB0A1E' },
  neutral: { 50-900 scale },
  success, warning, error, info
};
export const spacing = { 0-64 scale };
export const typography = { fontFamily, fontSize, fontWeight };
export const shadows = { sm, DEFAULT, md, lg, xl };
export const widgetSizes = { small, medium, large };
```

### 5. Configure TailwindCSS Theme
Update `tailwind.config.js` to extend theme with design tokens

### 6. Create Animation Definitions
Create `src/styles/animations.js` with scroll animations and micro-interactions

### 7. Document Design System
Create `src/styles/DESIGN_SYSTEM.md` with:
- Design philosophy (90% Apple, 10% dashboards)
- Color palette, typography, spacing
- Widget sizing, animation guidelines
- Do's and Don'ts

## Acceptance Criteria
- [x] Apple design research documented
- [x] Dashboard design research documented
- [x] Toyota colors extracted
- [x] Complete design tokens defined
- [x] TailwindCSS theme configured
- [x] Animations defined
- [x] Design system documented
- [x] Custom Tailwind classes work

## Deliverables
- Research documents (apple, dashboards, toyota)
- `src/styles/design-tokens.js`
- `src/styles/animations.js`
- Updated `tailwind.config.js`
- `src/styles/DESIGN_SYSTEM.md`

---

# Chapter 2: Core Component Library

## Overview
Build foundational components: Widget system, DataTooltip, Navigation, and animation wrappers.

**Reference**: PROJECT_GUIDE.md "Phase 2: Core Components"

## Objectives
- [x] Create Widget component with size variants
- [x] Create DataTooltip component
- [x] Create Navigation component (NO sidebar)
- [x] Create BackButton component
- [x] Create animation wrappers
- [x] Create utility components

## Key Tasks

### 1. Widget Component
Create `src/components/shared/Widget.jsx`:
- Props: size (small/medium/large), header, footer, hoverable, onClick
- Responsive sizing with consistent styling
- Support for header/footer sections

### 2. DataTooltip Component
Create `src/components/shared/DataTooltip.jsx`:
- Show data source (hardcoded/json/sqlite)
- Color-coded by source type
- Minimal, non-obtrusive design
- No tooltip for 'none' (knowledge graph)
- Export `DataWithTooltip` wrapper

### 3. Navigation Component
Create `src/components/shared/Navigation.jsx`:
- Modern navigation (NO sidebar)
- Variants: tabs, pills, underline
- Active state detection
- Icon support

### 4. BackButton Component
Create `src/components/shared/BackButton.jsx`:
- Navigate to specific path or browser back
- Variants: default, minimal, icon

### 5. Animation Wrappers
Create `src/components/shared/FadeIn.jsx`:
- Intersection observer for scroll-based fade-in
- Configurable delay and duration

### 6. Utility Components
Create:
- `Loading.jsx` - Spinner with size variants
- `EmptyState.jsx` - Empty state with icon, title, description

### 7. Export All Components
Create `src/components/shared/index.js` to export all

## Acceptance Criteria
- [x] Widget works with all size variants
- [x] DataTooltip shows correct source indicators
- [x] Navigation works (NO sidebar design)
- [x] BackButton navigates correctly
- [x] FadeIn animation works
- [x] Loading and EmptyState work
- [x] All follow design system
- [x] Well-documented with JSDoc
- [x] Importable from `@components/shared`

## Deliverables
- Widget, DataTooltip, Navigation, BackButton components
- FadeIn, Loading, EmptyState components
- `src/components/shared/index.js` export file

---

# Chapter 3: Skeleton Page & Design Approval

## Overview
Create skeleton page using actual components to showcase design system and get approval.

**Reference**: PROJECT_GUIDE.md "Phase 2.5: Skeleton/Demo Page for Approval"

## Objectives
- [x] Create skeleton page with actual components
- [x] Demonstrate navigation (NO sidebar)
- [x] Show widget grid with empty widgets
- [x] Implement working animations
- [x] Get approval before content implementation

## Key Tasks

### 1. Create Skeleton Page
Create `src/pages/skeleton/SkeletonPage.jsx`:
- Header with branding and BackButton
- Navigation using Navigation component (tabs variant)
- Hero section with gradient background
- Metrics row with small widgets
- Widget grid with various sizes
- All using actual components from Chapter 2

### 2. Demonstrate Features
- Navigation structure (tabs, NO sidebar)
- Widget sizing (small, medium, large in grid)
- Data tooltips on placeholder data
- Hover effects on widgets
- Fade-in animations on scroll
- Responsive layout

### 3. Add Skeleton Route
Update `src/App.jsx` to include `/skeleton` route

### 4. Test All Interactions
- Navigation works
- BackButton functions
- Widget hover effects
- Tooltips appear
- Animations trigger on scroll
- Responsive on different screens

### 5. Create Documentation
Create `src/pages/skeleton/README.md` documenting:
- Purpose of skeleton
- What it demonstrates
- Design decisions

## Acceptance Criteria
- [x] Skeleton page created with actual components
- [x] Navigation demonstrated (NO sidebar)
- [x] Widget grid works with different sizes
- [x] Animations work on scroll
- [x] Data tooltips work
- [x] Hover effects work
- [x] Responsive layout works
- [x] Design system consistently applied
- [x] Looks polished and professional
- [x] Ready for approval

## Deliverables
- `src/pages/skeleton/SkeletonPage.jsx`
- Updated `src/App.jsx`
- `src/pages/skeleton/README.md`
- Working skeleton at `/skeleton`

**STOP**: Get approval before Chapter 4

---

# Chapter 4: Parent Dashboard - Content Analysis & Planning

## Overview
Analyze `tfs_storyboard_v4.html` to extract content, functionality, and plan modern navigation.

**Reference**: PROJECT_GUIDE.md "Phase 3: Parent Dashboard"

## Objectives
- [x] Analyze HTML file thoroughly
- [x] Extract all content sections
- [x] Map navigation structure
- [x] Plan modern navigation (NO sidebar)
- [x] Document implementation plan

## Key Tasks

### 1. Analyze HTML File
Read `CX_Insights/UI_Dashboard/tfs_storyboard_v4.html` and document:
- All navigation sections and hierarchy
- All views/pages and content
- All data points (mark as hardcoded)
- All visualizations and charts
- All interactive features

### 2. Extract Content Sections
Document in `src/pages/parent-dashboard/CONTENT_MAP.md`:
- Product Analysis (product cards, sentiment)
- Journey Stage Flows
- Friction Layers Analysis
- Operating Model (party flows)
- Entity Explorer
- Sentiment Analysis (platforms)
- Time-based Filtering
- Content Quality Metrics

For each: section name, data, visualizations, interactions, data source

### 3. Map Original Navigation
Document sidebar navigation structure:
- All navigation items
- Hierarchy and grouping
- Sub-navigation patterns

### 4. Design Modern Navigation
Plan navigation WITHOUT sidebar:
- Choose approach (top nav with dropdowns, tabs, cards, or combination)
- Document in `src/pages/parent-dashboard/NAVIGATION_PLAN.md`
- Ensure all original items accessible

### 5. Plan Component Structure
Document components needed:
- Main container, section components
- Shared widgets and visualizations
- Navigation components

### 6. Plan Data Extraction
Create structure for `src/data/hardcoded/parent-dashboard-data.js`:
- Product data, journey data, friction data
- Party data, entity data, sentiment data
- All marked as hardcoded source

## Acceptance Criteria
- [x] HTML file fully analyzed
- [x] All content sections documented
- [x] All data points identified
- [x] Navigation mapped
- [x] Modern navigation designed (NO sidebar)
- [x] Component structure planned
- [x] Data extraction plan created

## Deliverables
- `src/pages/parent-dashboard/CONTENT_MAP.md`
- `src/pages/parent-dashboard/NAVIGATION_PLAN.md`
- `src/pages/parent-dashboard/COMPONENT_PLAN.md`
- Data structure plan

---

# Chapter 5: Parent Dashboard - Navigation System

## Overview
Implement modern navigation system (NO sidebar) and main dashboard container.

**Reference**: Chapter 4 planning documents

## Objectives
- [x] Implement modern navigation
- [x] Create main dashboard container
- [x] Implement section routing
- [x] Add FAQ Insights entry point
- [x] Apply design system

## Key Tasks

### 1. Create Main Container
Create `src/pages/parent-dashboard/ParentDashboard.jsx`:
- Main container with Routes
- Navigation component (tabs/pills variant)
- Routes for all sections
- FAQ Insights link

### 2. Create Dashboard Header
Create `src/pages/parent-dashboard/components/DashboardHeader.jsx`:
- Sticky header with branding
- Platform title and description
- "Talk to AI" button

### 3. Create Time Filter
Create `src/pages/parent-dashboard/components/TimeFilter.jsx`:
- Dropdown for time range selection
- Options: 7d, 30d, 90d, YTD

### 4. Create Overview Section
Create `src/pages/parent-dashboard/sections/Overview.jsx`:
- Hero section with gradient
- Navigation cards to all sections
- Links to Products, Journeys, Sentiment, FAQ Insights

### 5. Update App Routing
Update `src/App.jsx`:
- Route `/*` to ParentDashboard
- Route `/faq/*` to FAQ area (placeholder)

## Acceptance Criteria
- [x] Modern navigation implemented (NO sidebar)
- [x] Dashboard header created
- [x] Time filter works
- [x] Overview with navigation cards
- [x] Routing between sections works
- [x] FAQ Insights entry point visible
- [x] Design system applied
- [x] Responsive layout
- [x] Smooth transitions

## Deliverables
- `ParentDashboard.jsx`, `DashboardHeader.jsx`
- `TimeFilter.jsx`, `Overview.jsx`
- Updated `App.jsx`

---

# Chapter 6: Parent Dashboard - Product Analysis Section

## Overview
Implement Product Analysis with product cards, sentiment indicators, and metrics.

**Reference**: Chapter 4 content map, `tfs_storyboard_v4.html`

## Objectives
- [x] Extract product data
- [x] Create product card components
- [x] Implement sentiment indicators
- [x] Display metrics with tooltips
- [x] Add insights section

## Key Tasks

### 1. Extract Product Data
Create `src/data/hardcoded/products.js`:
- Product objects with: id, name, icon, sentiment, sentimentScore, trend
- Stats: totalReviews, avgRating, topIssues
- All data from HTML file

### 2. Create Product Card
Create `src/pages/parent-dashboard/components/ProductCard.jsx`:
- Display product with icon and name
- Sentiment indicator with color coding
- Trend arrow (up/down/stable)
- Stats grid (reviews, rating)
- Top issues list
- "View Details" button
- DataTooltip on all metrics (hardcoded source)

### 3. Create Product Analysis Section
Create `src/pages/parent-dashboard/sections/ProductAnalysis.jsx`:
- Header with title and TimeFilter
- Product grid with FadeIn animations
- Insights box with key findings
- All using Widget components

## Acceptance Criteria
- [x] Product data extracted from HTML
- [x] Product cards display correctly
- [x] Sentiment colors work
- [x] Trend indicators work
- [x] All metrics have tooltips (hardcoded)
- [x] Insights section displays
- [x] Responsive grid layout
- [x] Animations work
- [x] Design system applied

## Deliverables
- `src/data/hardcoded/products.js`
- `ProductCard.jsx`
- `ProductAnalysis.jsx` section

---

# Chapter 7: Parent Dashboard - Journey & Sentiment Analysis

## Overview
Implement Journey Stage Flows and Sentiment Analysis sections.

**Reference**: Chapter 4 content map, `tfs_storyboard_v4.html`

## Objectives
- [x] Extract journey and sentiment data
- [x] Create journey flow visualization
- [x] Create sentiment analysis section
- [x] Add platform-specific sentiment
- [x] Apply tooltips to all data

## Key Tasks

### 1. Extract Journey Data
Create `src/data/hardcoded/journeys.js`:
- Journey stages with percentages
- Burden scores, hotspots
- Path data with steps

### 2. Create Journey Flow Component
Create `src/pages/parent-dashboard/components/JourneyFlow.jsx`:
- Stage boxes in horizontal flow
- Percentage and burden display
- Hotspot highlighting
- Arrows between stages
- DataTooltips on all metrics

### 3. Create Journey Section
Create `src/pages/parent-dashboard/sections/JourneyFlow.jsx`:
- Header with description
- Journey flow visualization
- Path details
- Insights

### 4. Extract Sentiment Data
Create `src/data/hardcoded/sentiment.js`:
- Platform data (App Store, Google Play, TrustPilot, BBB)
- Themes with polarity and counts
- Sample reviews

### 5. Create Sentiment Components
Create `src/pages/parent-dashboard/components/SentimentCard.jsx`:
- Platform name and icon
- Theme with polarity indicator
- Review count
- Sample reviews
- DataTooltips

### 6. Create Sentiment Section
Create `src/pages/parent-dashboard/sections/SentimentAnalysis.jsx`:
- Platform grid
- Sentiment cards
- Positive/negative breakdown
- Insights

## Acceptance Criteria
- [x] Journey data extracted
- [x] Journey flow displays correctly
- [x] Stage percentages and burdens shown
- [x] Sentiment data extracted
- [x] Sentiment cards display by platform
- [x] Polarity indicators work
- [x] All data has tooltips (hardcoded)
- [x] Responsive layouts
- [x] Animations applied

## Deliverables
- `src/data/hardcoded/journeys.js`
- `src/data/hardcoded/sentiment.js`
- `JourneyFlow.jsx` component and section
- `SentimentCard.jsx`, `SentimentAnalysis.jsx`

---

# Chapter 8: Parent Dashboard - Additional Views & Integration

## Overview
Implement remaining sections (Friction Layers, Operating Model, Entity Explorer) and integrate all Parent Dashboard sections.

**Reference**: Chapter 4 content map

## Objectives
- [x] Implement Friction Layers section
- [x] Implement Operating Model section
- [x] Implement Entity Explorer section
- [x] Integrate all sections
- [x] Test complete Parent Dashboard

## Key Tasks

### 1. Extract Remaining Data
Create data files:
- `src/data/hardcoded/friction.js` - Friction layers, conditions
- `src/data/hardcoded/parties.js` - Responsible parties, ownership
- `src/data/hardcoded/entities.js` - Entity types, counts

### 2. Create Friction Layers Section
Create `src/pages/parent-dashboard/sections/FrictionLayers.jsx`:
- Layer cards with complexity indicators
- Condition badges
- Impact metrics
- DataTooltips

### 3. Create Operating Model Section
Create `src/pages/parent-dashboard/sections/OperatingModel.jsx`:
- Party flow visualization
- Ownership percentages
- Leakage indicators
- DataTooltips

### 4. Create Entity Explorer Section
Create `src/pages/parent-dashboard/sections/EntityExplorer.jsx`:
- Entity grid
- Entity details
- Relationship indicators
- DataTooltips

### 5. Integrate All Sections
Update `ParentDashboard.jsx`:
- Add routes for all sections
- Ensure navigation works
- Test transitions

### 6. Add FAQ Insights Link
Create prominent link/button to FAQ area:
- In Overview section
- In navigation
- Styled as call-to-action

## Acceptance Criteria
- [x] All data extracted from HTML
- [x] Friction Layers section works
- [x] Operating Model section works
- [x] Entity Explorer section works
- [x] All sections integrated
- [x] Navigation between all sections works
- [x] FAQ Insights link prominent
- [x] All data has tooltips (hardcoded)
- [x] Responsive layouts
- [x] Design system consistent

## Deliverables
- Remaining data files (friction, parties, entities)
- `FrictionLayers.jsx`, `OperatingModel.jsx`, `EntityExplorer.jsx`
- Updated `ParentDashboard.jsx` with all routes
- FAQ Insights link/button

---

# Chapter 9: FAQ Dashboard - Sitemap Analytics Section

## Overview
Implement Sitemap Analytics section (first part of FAQ Dashboard) using data from `Sitemap_CX/dashboard-ui`.

**Reference**: PROJECT_GUIDE.md "Phase 4: FAQ Dashboard", `Sitemap_CX/dashboard-ui/src/App.tsx`

## Objectives
- [ ] Create FAQ Dashboard container
- [ ] Implement stats cards
- [ ] Create domain analysis section
- [ ] Add sensitive domains detection
- [ ] Display redundant content analysis
- [ ] Load JSON data with tooltips

## Key Tasks

### 1. Create FAQ Dashboard Container
Create `src/pages/faq-dashboard/FaqDashboard.jsx`:
- Main container for combined dashboard
- Two sections: Sitemap Analytics + Business Metrics
- Visual separator between sections

### 2. Load JSON Data
Create data loading utilities:
- Load stats.json, faqs.json, external-stats.json, redundant-content.json
- Mark all as JSON source for tooltips

### 3. Create Stats Cards
Create `src/pages/faq-dashboard/components/StatsCard.jsx`:
- Display metric with icon
- Large number with DataTooltip (json source)
- Color-coded by type

### 4. Create Domain Analysis
Create `src/pages/faq-dashboard/components/DomainList.jsx`:
- Top 10 external domains
- Clickable domains (modal for URLs)
- Count badges
- DataTooltips

### 5. Create Sensitive Domains Section
Create `src/pages/faq-dashboard/components/SensitiveDomains.jsx`:
- Alert-style display
- List of sensitive domains
- Warning indicators

### 6. Create Redundant Content Section
Create `src/pages/faq-dashboard/components/RedundantContent.jsx`:
- Content blocks with occurrence count
- Source URLs list
- DataTooltips

### 7. Assemble Sitemap Analytics
Create `src/pages/faq-dashboard/sections/SitemapAnalytics.jsx`:
- Header with title
- Stats cards grid
- Domain analysis
- Sensitive domains
- Redundant content
- All with FadeIn animations

## Acceptance Criteria
- [ ] FAQ Dashboard container created
- [ ] JSON data loaded successfully
- [ ] Stats cards display with tooltips (json)
- [ ] Domain analysis works
- [ ] Sensitive domains display
- [ ] Redundant content shows
- [ ] All data has tooltips (json source)
- [ ] Responsive layout
- [ ] Design system applied

## Deliverables
- `FaqDashboard.jsx` container
- Stats, domain, sensitive, redundant components
- `SitemapAnalytics.jsx` section
- Data loading utilities

---

# Chapter 10: FAQ Dashboard - Business Metrics Section

## Overview
Implement Business Metrics section (second part of FAQ Dashboard) using data from `Sitemap_CX/dashboard-ui`.

**Reference**: `Sitemap_CX/dashboard-ui/src/pages/BusinessMetrics.tsx`

## Objectives
- [ ] Load business metrics JSON data
- [ ] Create content health section
- [ ] Create navigation depth section
- [ ] Create FAQ quality section
- [ ] Create dependencies section
- [ ] Add visual separator from Sitemap Analytics

## Key Tasks

### 1. Load Business Metrics Data
- Load business-metrics.json, pdf-analysis.json
- Mark as JSON source for tooltips

### 2. Create Content Health Section
Create `src/pages/faq-dashboard/components/ContentHealth.jsx`:
- Health score with progress indicator
- Metrics: total pages, successful crawls, broken pages
- DataTooltips on all metrics

### 3. Create Navigation Depth Section
Create `src/pages/faq-dashboard/components/NavigationDepth.jsx`:
- Depth distribution chart (Recharts)
- Deep pages count
- Orphan pages indicator
- DataTooltips

### 4. Create FAQ Quality Section
Create `src/pages/faq-dashboard/components/FaqQuality.jsx`:
- Self-service rate
- Answer mode distribution
- Short answers count
- DataTooltips

### 5. Create Dependencies Section
Create `src/pages/faq-dashboard/components/Dependencies.jsx`:
- PDF count and analysis
- External link dependencies
- DataTooltips

### 6. Assemble Business Metrics
Create `src/pages/faq-dashboard/sections/BusinessMetrics.jsx`:
- Visual separator with label
- Content health
- Navigation depth
- FAQ quality
- Dependencies
- All with FadeIn animations

### 7. Integrate Both Sections
Update `FaqDashboard.jsx`:
- SitemapAnalytics section
- Visual separator
- BusinessMetrics section
- Single scrollable page

## Acceptance Criteria
- [ ] Business metrics data loaded
- [ ] Content health displays with score
- [ ] Navigation depth chart works
- [ ] FAQ quality metrics show
- [ ] Dependencies section displays
- [ ] Visual separator between sections
- [ ] All data has tooltips (json)
- [ ] Charts render correctly
- [ ] Responsive layout
- [ ] Design system applied

## Deliverables
- Content health, navigation, FAQ quality, dependencies components
- `BusinessMetrics.jsx` section
- Updated `FaqDashboard.jsx` with both sections
- Visual separator component

---

# Chapter 11: FAQ Dashboard - Integration & Navigation

## Overview
Integrate FAQ Dashboard into main app with navigation to FAQ sections and back to Parent Dashboard.

**Reference**: PROJECT_GUIDE.md "Phase 4: FAQ Dashboard"

## Objectives
- [ ] Create FAQ area navigation
- [ ] Add FAQ Dashboard as default section
- [ ] Create navigation to other FAQ sections
- [ ] Add BackButton to Parent Dashboard
- [ ] Test complete FAQ area

## Key Tasks

### 1. Create FAQ Area Container
Create `src/pages/faq-area/FaqArea.jsx`:
- Main container for all FAQ sections
- Navigation for 9 sections
- Routes for all sections
- BackButton to Parent Dashboard

### 2. Create FAQ Navigation
Create `src/pages/faq-area/components/FaqNavigation.jsx`:
- 9 navigation items: Dashboard, Graph, Home, Products, Entities, Journeys, Metrics, Story, Data
- Use Navigation component (tabs or pills)
- Active state for current section

### 3. Set Up FAQ Routes
In `FaqArea.jsx`:
- Route `/faq` → FaqDashboard (default)
- Route `/faq/graph` → placeholder
- Route `/faq/home` → placeholder
- (Other routes added in Chapters 12-15)

### 4. Add BackButton
In FAQ area header:
- BackButton component
- Navigate to `/` (Parent Dashboard)
- Clear "Back to Dashboard" label

### 5. Update App Routing
Update `src/App.jsx`:
- Route `/faq/*` to FaqArea
- Ensure Parent Dashboard at `/`

### 6. Test Navigation Flow
- Navigate from Parent Dashboard to FAQ Insights
- Navigate between FAQ sections
- Navigate back to Parent Dashboard
- Verify state management

## Acceptance Criteria
- [ ] FAQ area container created
- [ ] FAQ navigation works (9 sections)
- [ ] FAQ Dashboard is default section
- [ ] BackButton navigates to Parent Dashboard
- [ ] All routes configured
- [ ] Navigation state works correctly
- [ ] Smooth transitions
- [ ] Design system applied

## Deliverables
- `FaqArea.jsx` container
- `FaqNavigation.jsx` component
- Updated `App.jsx` routing
- Working navigation between Parent and FAQ areas

---

# Chapter 12: FAQ Section - Graph Visualization

## Overview
Implement interactive force-directed graph visualization using data from `faq_data_gemini.json`.

**Reference**: PROJECT_GUIDE.md "Phase 5: FAQ Knowledge Graph Sections", `Temporary_test/src/App.jsx` graph section

## Objectives
- [ ] Load FAQ data from JSON
- [ ] Create graph visualization
- [ ] Implement layer toggles
- [ ] Add node selection
- [ ] Apply tooltips to data

## Key Tasks

### 1. Load FAQ Data
- Load `faq_data_gemini.json`
- Parse products, intents, steps, conditions, etc.
- Mark as JSON source for tooltips

### 2. Create Graph Component
Create `src/pages/faq-graph/components/KnowledgeGraph.jsx`:
- Use react-force-graph-2d
- Build node/link data structure
- 14 entity types with color coding
- Node labels and sizing

### 3. Create Layer Toggles
Create `src/pages/faq-graph/components/LayerToggles.jsx`:
- Checkboxes for: Steps, Rules, Details, Evidence, Leakage
- Update graph data based on toggles
- Color indicators for each layer

### 4. Implement Node Selection
- Click node to select
- Show node details in popup
- Zoom to selected node
- Click background to deselect

### 5. Create Graph Page
Create `src/pages/faq-graph/FaqGraph.jsx`:
- Graph container
- Layer toggles
- Selected node popup
- Instructions/legend

### 6. Add Route
Update `FaqArea.jsx`:
- Route `/faq/graph` to FaqGraph

## Acceptance Criteria
- [ ] FAQ data loaded from JSON
- [ ] Graph renders with nodes and links
- [ ] 14 entity types color-coded
- [ ] Layer toggles work
- [ ] Node selection works
- [ ] Zoom and pan work
- [ ] Node details popup displays
- [ ] All data has tooltips (json)
- [ ] Performance is good
- [ ] Design system applied

## Deliverables
- `KnowledgeGraph.jsx` component
- `LayerToggles.jsx` component
- `FaqGraph.jsx` page
- Updated FAQ area routing

---

# Chapter 13: FAQ Section - Home & Products

## Overview
Implement FAQ Home overview and Products explorer sections.

**Reference**: `Temporary_test/src/App.jsx` home and products sections

## Objectives
- [ ] Create FAQ Home overview
- [ ] Display product landscape
- [ ] Show metrics (CBI, CAI, HDI)
- [ ] Create Products explorer
- [ ] Display product details

## Key Tasks

### 1. Create FAQ Home Section
Create `src/pages/faq-home/FaqHome.jsx`:
- Hero banner with stats
- Product landscape grid (6 products)
- All 14 building blocks display
- Product metrics cards (CBI, CAI, HDI)
- Sentiment from external sources
- DataTooltips on all metrics (json)

### 2. Create Product Landscape Component
Create `src/pages/faq-home/components/ProductLandscape.jsx`:
- Product cards with icon, name, category
- Complexity indicator
- Click to navigate to Products section

### 3. Create Metrics Cards
Create `src/pages/faq-home/components/MetricsCards.jsx`:
- CBI, CAI, HDI for each product
- Color-coded by value (green/yellow/red)
- DataTooltips

### 4. Create Products Section
Create `src/pages/faq-products/FaqProducts.jsx`:
- Product selector
- Product details (description, category, complexity, support, lifecycle)
- Related intents
- Related channels
- Related conditions
- DataTooltips on all data

### 5. Create Product Details Component
Create `src/pages/faq-products/components/ProductDetails.jsx`:
- Detailed product information
- Related entities display
- DataTooltips

### 6. Add Routes
Update `FaqArea.jsx`:
- Route `/faq/home` to FaqHome
- Route `/faq/products` to FaqProducts

## Acceptance Criteria
- [ ] FAQ Home displays overview
- [ ] Product landscape shows all products
- [ ] Metrics cards display correctly
- [ ] Products section shows details
- [ ] Product selector works
- [ ] Related entities display
- [ ] All data has tooltips (json)
- [ ] Responsive layouts
- [ ] Design system applied

## Deliverables
- `FaqHome.jsx` page
- `ProductLandscape.jsx`, `MetricsCards.jsx`
- `FaqProducts.jsx` page
- `ProductDetails.jsx` component
- Updated FAQ area routing

---

# Chapter 14: FAQ Section - Entities & Journeys

## Overview
Implement Entities browser and Journeys viewer sections.

**Reference**: `Temporary_test/src/App.jsx` entities and journeys sections

## Objectives
- [ ] Create Entities browser
- [ ] Display entity types and lists
- [ ] Create Journeys viewer
- [ ] Show journey paths and steps
- [ ] Apply tooltips to all data

## Key Tasks

### 1. Create Entities Section
Create `src/pages/faq-entities/FaqEntities.jsx`:
- Entity type selector (14 types)
- Entity list for selected type
- Entity details display
- Related connections
- DataTooltips on all data (json)

### 2. Create Entity Type Selector
Create `src/pages/faq-entities/components/EntityTypeSelector.jsx`:
- Grid or list of 14 entity types
- Color-coded by type
- Active state for selected type

### 3. Create Entity List
Create `src/pages/faq-entities/components/EntityList.jsx`:
- List of entities for selected type
- Entity cards with key info
- Click to view details

### 4. Create Journeys Section
Create `src/pages/faq-journeys/FaqJourneys.jsx`:
- Intent selector
- Journey paths for selected intent
- Step-by-step breakdown
- Channel indicators
- Latency windows
- Escalation paths
- DataTooltips on all data

### 5. Create Journey Path Component
Create `src/pages/faq-journeys/components/JourneyPath.jsx`:
- Path visualization
- Steps in sequence
- Channel and latency indicators
- DataTooltips

### 6. Add Routes
Update `FaqArea.jsx`:
- Route `/faq/entities` to FaqEntities
- Route `/faq/journeys` to FaqJourneys

## Acceptance Criteria
- [ ] Entities section displays all types
- [ ] Entity type selector works
- [ ] Entity lists display correctly
- [ ] Entity details show
- [ ] Journeys section displays paths
- [ ] Intent selector works
- [ ] Steps display in sequence
- [ ] Channel and latency indicators work
- [ ] All data has tooltips (json)
- [ ] Responsive layouts
- [ ] Design system applied

## Deliverables
- `FaqEntities.jsx` page
- Entity type selector, list, details components
- `FaqJourneys.jsx` page
- Journey path component
- Updated FAQ area routing

---

# Chapter 15: FAQ Section - Metrics, Story & Data

## Overview
Implement Metrics dashboard, Storyboard presentation, and Data model sections.

**Reference**: `Temporary_test/src/App.jsx` metrics, storyboard, datamodel sections

## Objectives
- [ ] Create Metrics dashboard
- [ ] Display PFI, CBI, CAI, HDI
- [ ] Create Storyboard presentation
- [ ] Create Data model viewer
- [ ] Complete all FAQ sections

## Key Tasks

### 1. Create Metrics Section
Create `src/pages/faq-metrics/FaqMetrics.jsx`:
- Product Friction Index (PFI) display
- Customer Burden Index (CBI)
- Customer Agency Index (CAI)
- Human Dependency Index (HDI)
- Charts and visualizations (Recharts)
- Root cause analysis
- DataTooltips on all metrics (json)

### 2. Create Metrics Cards
Create `src/pages/faq-metrics/components/MetricsCards.jsx`:
- Large metric displays
- Color-coded by value
- Trend indicators
- DataTooltips

### 3. Create Story Section
Create `src/pages/faq-story/FaqStory.jsx`:
- Storyboard presentation layout
- Slide-based navigation
- Key insights and findings
- Previous/Next buttons
- DataTooltips on data points

### 4. Create Slide Component
Create `src/pages/faq-story/components/Slide.jsx`:
- Slide content display
- Consistent styling
- Animations between slides

### 5. Create Data Model Section
Create `src/pages/faq-data/FaqData.jsx`:
- Entity relationship diagram
- Schema documentation
- Cypher query examples
- Data model visualization
- DataTooltips

### 6. Add Routes
Update `FaqArea.jsx`:
- Route `/faq/metrics` to FaqMetrics
- Route `/faq/story` to FaqStory
- Route `/faq/data` to FaqData

## Acceptance Criteria
- [ ] Metrics section displays all indices
- [ ] Charts render correctly
- [ ] Root cause analysis shows
- [ ] Storyboard navigation works
- [ ] Slides display with animations
- [ ] Data model displays schema
- [ ] Cypher examples show
- [ ] All data has tooltips (json)
- [ ] All 9 FAQ sections complete
- [ ] Responsive layouts
- [ ] Design system applied

## Deliverables
- `FaqMetrics.jsx` page with metrics cards
- `FaqStory.jsx` page with slide component
- `FaqData.jsx` page
- Updated FAQ area routing (all 9 sections)

---

# Chapter 16: Navigation Integration & State Management

## Overview
Integrate all navigation flows, implement state management, and ensure smooth transitions.

**Reference**: PROJECT_GUIDE.md "Phase 6: Navigation & Integration"

## Objectives
- [ ] Integrate Parent ↔ FAQ navigation
- [ ] Implement state management
- [ ] Handle browser navigation
- [ ] Test all navigation flows
- [ ] Ensure smooth transitions

## Key Tasks

### 1. Review All Navigation
- Parent Dashboard navigation (all sections)
- FAQ area navigation (9 sections)
- Parent → FAQ transition
- FAQ → Parent transition

### 2. Implement State Management
Create `src/hooks/useNavigationState.js`:
- Track current section
- Preserve scroll position
- Handle navigation history

### 3. Enhance Transitions
- Add page transition animations
- Smooth fade between sections
- Loading states during transitions

### 4. Handle Browser Navigation
- Back button works correctly
- Forward button works
- URL reflects current section
- Deep linking works

### 5. Test All Flows
- Navigate through all Parent Dashboard sections
- Navigate to FAQ Insights
- Navigate through all FAQ sections
- Navigate back to Parent Dashboard
- Test browser back/forward
- Test deep links

### 6. Add Breadcrumbs (Optional)
Create breadcrumb component:
- Show current location
- Allow navigation to parent sections

## Acceptance Criteria
- [ ] All navigation flows work
- [ ] State management implemented
- [ ] Browser navigation works
- [ ] Scroll position preserved where appropriate
- [ ] Transitions are smooth
- [ ] Deep linking works
- [ ] No navigation bugs
- [ ] Performance is good

## Deliverables
- `useNavigationState.js` hook
- Page transition components
- Updated navigation components
- Tested navigation flows

---

# Chapter 17: Animations & Interactions

## Overview
Implement comprehensive animations and interactions throughout the application.

**Reference**: PROJECT_GUIDE.md "Phase 7: Animations & Interactions"

## Objectives
- [ ] Implement scroll-based animations
- [ ] Add micro-interactions
- [ ] Create page transitions
- [ ] Add interactive elements
- [ ] Ensure performance

## Key Tasks

### 1. Enhance Scroll Animations
- Add parallax effects where appropriate
- Implement scroll-triggered reveals
- Add sticky elements
- Stagger animations for lists

### 2. Add Micro-Interactions
- Button hover/click feedback
- Card hover effects
- Input focus states
- Loading states
- Success/error feedback

### 3. Implement Page Transitions
- Fade transitions between pages
- Slide transitions where appropriate
- Loading indicators during transitions

### 4. Add Interactive Visualizations
- Hover states on charts
- Click interactions on graphs
- Tooltip animations
- Modal animations

### 5. Optimize Performance
- Use CSS transforms for animations
- Debounce scroll handlers
- Lazy load heavy animations
- Test on lower-end devices

### 6. Test All Animations
- Verify smooth 60fps
- Test on different devices
- Check accessibility
- Ensure no jank

## Acceptance Criteria
- [ ] Scroll animations work smoothly
- [ ] Micro-interactions feel responsive
- [ ] Page transitions are smooth
- [ ] Interactive elements respond well
- [ ] Performance is good (60fps)
- [ ] No animation jank
- [ ] Animations enhance UX
- [ ] Accessible (respects prefers-reduced-motion)

## Deliverables
- Enhanced animation components
- Micro-interaction utilities
- Page transition system
- Performance optimizations

---

# Chapter 18: Responsive Design & Cross-Browser Testing

## Overview
Ensure application works perfectly across all devices and browsers.

**Reference**: PROJECT_GUIDE.md "Phase 8: Responsive Design & Polish"

## Objectives
- [ ] Test responsive layouts
- [ ] Fix mobile issues
- [ ] Test cross-browser
- [ ] Optimize for different screens
- [ ] Ensure accessibility

## Key Tasks

### 1. Test Responsive Layouts
Test on:
- Mobile (320px, 375px, 414px)
- Tablet (768px, 1024px)
- Desktop (1280px, 1440px, 1920px)

Fix issues:
- Widget sizing and stacking
- Navigation on mobile
- Text readability
- Touch targets (44px minimum)

### 2. Optimize Mobile Experience
- Hamburger menu if needed
- Touch-friendly interactions
- Optimized images
- Reduced animations on mobile

### 3. Cross-Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Fix:
- CSS compatibility issues
- JavaScript compatibility
- Layout differences

### 4. Test Accessibility
- Keyboard navigation works
- Screen reader compatible
- Color contrast meets WCAG AA
- Focus indicators visible
- ARIA labels where needed

### 5. Performance Testing
- Lighthouse scores
- Page load times
- Time to interactive
- First contentful paint

## Acceptance Criteria
- [ ] Works on all mobile sizes
- [ ] Works on tablets
- [ ] Works on desktop sizes
- [ ] Works in all major browsers
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA
- [ ] Performance scores good
- [ ] No layout issues

## Deliverables
- Responsive fixes
- Cross-browser compatibility fixes
- Accessibility improvements
- Performance optimizations

---

# Chapter 19: Performance Optimization & Final Polish

## Overview
Optimize performance, polish UI, and prepare for deployment.

**Reference**: PROJECT_GUIDE.md "Phase 8: Responsive Design & Polish"

## Objectives
- [ ] Optimize bundle size
- [ ] Optimize data loading
- [ ] Polish UI details
- [ ] Fix remaining bugs
- [ ] Prepare documentation

## Key Tasks

### 1. Optimize Bundle Size
- Code splitting by route
- Lazy load heavy components
- Tree shake unused code
- Optimize images
- Minimize CSS/JS

### 2. Optimize Data Loading
- Lazy load JSON files
- Cache loaded data
- Optimize SQLite queries
- Implement loading states

### 3. Polish UI Details
- Consistent spacing
- Consistent colors
- Smooth animations
- Error states
- Empty states
- Loading states

### 4. Final Testing
- Test all features
- Test all data sources
- Test all tooltips
- Test all navigation
- Test all animations
- Test error handling

### 5. Create Documentation
Update:
- README.md with setup instructions
- DEVELOPMENT.md with guidelines
- Component documentation
- Data source documentation

### 6. Prepare for Deployment
- Build production bundle
- Test production build
- Optimize assets
- Set up deployment config

## Acceptance Criteria
- [ ] Bundle size optimized
- [ ] Data loading optimized
- [ ] UI polished and consistent
- [ ] All features tested
- [ ] All bugs fixed
- [ ] Documentation complete
- [ ] Production build works
- [ ] Ready for deployment

## Deliverables
- Optimized production build
- Complete documentation
- Deployment configuration
- Final tested application

---

## Completion Checklist

### Foundation (Chapters 0-3)
- [x] Chapter 0: Project Setup
- [x] Chapter 1: Design System
- [x] Chapter 2: Core Components
- [x] Chapter 3: Skeleton Page (GET APPROVAL)

### Parent Dashboard (Chapters 4-8)
- [x] Chapter 4: Content Analysis
- [x] Chapter 5: Navigation System
- [x] Chapter 6: Product Analysis
- [x] Chapter 7: Journey & Sentiment
- [x] Chapter 8: Additional Views

### FAQ Dashboard (Chapters 9-11)
- [ ] Chapter 9: Sitemap Analytics
- [ ] Chapter 10: Business Metrics
- [ ] Chapter 11: Integration & Navigation

### FAQ Sections (Chapters 12-15)
- [ ] Chapter 12: Graph Visualization
- [ ] Chapter 13: Home & Products
- [ ] Chapter 14: Entities & Journeys
- [ ] Chapter 15: Metrics, Story & Data

### Final Integration (Chapters 16-19)
- [ ] Chapter 16: Navigation Integration
- [ ] Chapter 17: Animations & Interactions
- [ ] Chapter 18: Responsive Design
- [ ] Chapter 19: Performance & Polish

---

## Success Criteria

The project is complete when:
- ✅ All 19 chapters completed
- ✅ All acceptance criteria met
- ✅ Design system consistently applied
- ✅ NO styling from source files reused
- ✅ All data has source tooltips
- ✅ Navigation works smoothly (NO sidebars)
- ✅ All animations smooth and performant
- ✅ Responsive across all devices
- ✅ Cross-browser compatible
- ✅ Accessible (WCAG AA)
- ✅ Performance optimized
- ✅ Documentation complete
- ✅ Ready for deployment

---

**Remember**: Reference `PROJECT_GUIDE.md` for detailed context, design philosophy, and additional requirements throughout implementation.
