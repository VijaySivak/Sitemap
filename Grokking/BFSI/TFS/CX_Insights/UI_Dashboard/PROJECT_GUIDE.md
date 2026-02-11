# TFS Customer Experience Dashboard - Complete Project Guide

## **Project Overview**
Build a **completely new, from-scratch ReactJS dashboard application** located in `CX_Insights/UI_Dashboard/` that consolidates multiple existing HTML and React prototypes into one unified, beautifully styled web application. This is NOT about reusing existing code—it's about extracting the **content and data** from existing demos and rebuilding everything with a completely new, modern, consistent design system.

---

## **Visual Design Requirements**

### **Design Philosophy**
- **90% Apple-inspired aesthetic**: Clean, minimalist, borderless designs with abundant whitespace, smooth interactions, and engaging scroll effects
- **10% Best-of-web dashboard design**: Research and incorporate what the internet considers aesthetically pleasing for data-rich dashboards
- **NO sidebars**: Apple's website doesn't use sidebars—reimagine navigation in a modern way (top nav, tabs, cards, etc.)
- **macOS/iOS design language**: Frosted glass effects (backdrop blur), rounded corners, modern UI patterns, smooth transitions
- **Toyota Financial Services colors**: Extract color palette from the actual Toyota Financial Services website, but use dark colors (black/red) **sparingly** as accents and highlights only—NOT for entire widgets or large areas

### **Modern Animations & Interactions**
- **NOT just hover effects**: Go beyond simple hover animations
- **Scroll-based interactions**: Content that responds to scrolling (parallax, fade-ins, scroll-triggered animations)
- **Smooth transitions**: Page transitions, content reveals, state changes
- **Micro-interactions**: Subtle feedback on user actions
- **Examples to inspire**:
  - Apple's scroll-based product reveals where content stays but elements animate
  - Smooth page transitions between sections
  - Content that fades/slides in as you scroll
  - Interactive elements that respond naturally to user input
- **Goal**: Make the website feel smooth, modern, and engaging—not just functional

### **Widget System Architecture**
- All content organized in **widget-based layout** with consistent sizing
- **Responsive sizing system** (similar to iOS widget grid):
  - Small, Medium, Large predefined sizes
  - Multiple small widgets can align to equal one large widget
  - Widgets scale responsively based on screen resolution/device size
  - NOT fixed pixel dimensions—must adapt to different viewports
- **Developer-friendly modularity**: Easy to add/remove widgets programmatically (NOT drag-and-drop for end users)
- **Visual consistency**: All widgets share the same design language, spacing, shadows, borders, etc.

### **Data Source Tooltips**
- **Every piece of data** (numeric or text) must have a small, minimal tooltip indicating its source:
  - **"Hardcoded"** - for static data in code
  - **"JSON"** - for data from JSON files
  - **"SQLite"** - for data from database files
  - **NO TOOLTIP** - for Knowledge Graph data (future default, not implemented yet)
- Tooltip design: Minimal, non-obstructive, aligns with overall aesthetic
- Current implementation: NO knowledge graph exists yet, so all data will be Hardcoded, JSON, or SQLite

---

## **Critical Design Principle: Complete Styling Independence**

### **ABSOLUTELY NO REUSE OF EXISTING STYLES**
- The existing sample sources (`tfs_storyboard_v4.html`, `Sitemap_CX/dashboard-ui`, `Temporary_test`) were created by different developers
- They are **wildly inconsistent** with each other
- **DO NOT** carry over any of their styling, structure, or layout patterns
- **ONLY** extract: content, data, functionality, features

### **Create Your Own Design System**
- Research Apple's design language
- Research best dashboard designs on the web
- Extract Toyota Financial Services color palette
- **Create a completely new, unified design system** that will be applied consistently across the ENTIRE application
- Every page, every component, every widget should feel like it came from the same designer

### **Consistency is Key**
- Once the design system is established, maintain it religiously
- Same spacing, same typography, same colors, same shadows, same animations
- The final product should look like a cohesive, professional application—not a collection of different prototypes

---

## **Directory Structure & Code Organization**

### **Root Location**
- All code lives in: `CX_Insights/UI_Dashboard/`
- **CRITICAL**: No code references to anything outside `UI_Dashboard/` directory
- All dependencies, data files, assets must be copied INTO this directory

### **Modular Structure**
```
UI_Dashboard/
├── src/
│   ├── pages/
│   │   ├── parent-dashboard/      # Parent dashboard page
│   │   ├── faq-dashboard/         # FAQ combined dashboard
│   │   ├── faq-graph/             # FAQ graph section
│   │   ├── faq-home/              # FAQ home section
│   │   ├── faq-products/          # FAQ products section
│   │   ├── faq-entities/          # FAQ entities section
│   │   ├── faq-journeys/          # FAQ journeys section
│   │   ├── faq-metrics/           # FAQ metrics section
│   │   ├── faq-story/             # FAQ story section
│   │   └── faq-data/              # FAQ data section
│   ├── components/
│   │   ├── shared/                # Shared components
│   │   │   ├── Widget.tsx         # Base widget component
│   │   │   ├── DataTooltip.tsx    # Data source tooltip
│   │   │   ├── Navigation.tsx     # Navigation components
│   │   │   └── ...
│   │   └── [page-specific]/       # Page-specific components
│   ├── data/                      # All data files
│   │   ├── json/                  # JSON files
│   │   ├── sqlite/                # SQLite databases
│   │   └── hardcoded/             # Hardcoded data constants
│   ├── styles/
│   │   ├── design-tokens.ts       # Colors, spacing, typography
│   │   └── animations.ts          # Animation configurations
│   ├── utils/                     # Utility functions
│   └── App.tsx                    # Main app component
├── public/
└── package.json
```

- Each page = separate directory with its own assets
- Shared components = dedicated shared directory with **comments indicating where they're used**
- Clean, navigable structure for developers

---

## **Technology Stack**
- **Framework**: Lightweight ReactJS
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Graph Visualization**: react-force-graph-2d (for FAQ graph section)
- **Backend**: None—static file serving only

---

## **Content Sources & Data Integration**

### **Source 1: Parent Dashboard**
- **File**: `CX_Insights/UI_Dashboard/tfs_storyboard_v4.html`
- **Type**: Single HTML file with hardcoded data
- **Content to Extract**:
  - Product cards with sentiment indicators
  - Journey stage flows
  - Friction layers analysis
  - Operating model party flows
  - Entity exploration
  - Sentiment analysis (App Store, Google Play, TrustPilot, BBB)
  - Time-based filtering
  - All navigation sections and hierarchy (but reimagine WITHOUT sidebar)
  - All views and functionality
- **Data Source**: All data is **Hardcoded** (mark with tooltips)
- **Current Structure**: Has a sidebar navigation—**DO NOT REPLICATE THIS**
- **New Structure**: Reimagine navigation in a modern, Apple-inspired way (top nav, tabs, cards, sections, etc.)
- **Implementation**: Extract ALL content and functionality; rebuild from scratch with completely new design

### **Source 2: Sitemap Analytics Dashboard**
- **Location**: `CX_Insights/Data_Extraction/Cooking/Sitemap_CX/dashboard-ui/`
- **Type**: React + TypeScript + Vite application
- **Tech Stack**: React, TypeScript, TailwindCSS, Recharts, Lucide React, React Router
- **Pages**:
  1. **Main Dashboard** (`App.tsx`): 
     - Sitemap Analytics header
     - Stats cards (Total Pages, Total FAQs, Unique External Domains, Domains in FAQ Pages)
     - Top 10 External Domains (clickable)
     - Sensitive Domains Detection
     - Redundant Content Analysis
     - FAQ search functionality
  2. **Business Metrics** (`BusinessMetrics.tsx`):
     - Content Health metrics (total pages, successful crawls, broken pages, health score)
     - Navigation depth distribution
     - FAQ Quality metrics (self-service rate, answer modes)
     - PDF Dependencies
     - Broken links issues
- **Data Sources**: 
  - JSON files in `/public/data/`: 
    - `stats.json`
    - `faqs.json`
    - `external-stats.json`
    - `business-metrics.json`
    - `redundant-content.json`
    - `pdf-analysis.json`
  - SQLite database in `CX_Insights/Data_Extraction/Cooking/Sitemap_CX/output/` (locate and copy)
- **Data Source Tooltips**: Mark JSON data as "JSON", SQLite data as "SQLite"
- **Current Styling**: DO NOT REUSE—rebuild with new design system
- **Implementation**: Copy data files to `UI_Dashboard/data/`, extract content structure, rebuild with new styling

### **Source 3: FAQ Knowledge Graph Viewer**
- **Location**: `CX_Insights/UI_Dashboard/Temporary_test/`
- **Type**: React + Vite application
- **Tech Stack**: React, Vite, TailwindCSS, Recharts, react-force-graph-2d
- **Sections** (8 total):
  1. **Graph**: 
     - Interactive force-directed graph visualization
     - 14-entity ontology (Product, CustomerIntent, InstructionStep, Condition, LatencyWindow, EscalationPath, ValueLeakage, ResponsibleParty, EvidenceAnchor, ContentAsset)
     - Layer toggles (Steps, Rules, Details, Evidence, Leakage)
     - Node selection and zoom
     - Color-coded entity types
  2. **Home**: 
     - Overview banner with stats
     - Product landscape grid (6 products)
     - All 14 building blocks
     - Product metrics (CBI, CAI, HDI)
     - Sentiment from external sources (App Store, Google Play, TrustPilot, BBB)
  3. **Products**: 
     - Product selector
     - Product details (description, category, complexity, support phone, lifecycle stages)
     - Related intents
     - Related channels
     - Related conditions
  4. **Entities**: 
     - Entity type selector (14 types)
     - Entity list for selected type
     - Entity details
     - Related connections
  5. **Journeys**: 
     - Intent selector
     - Journey paths for selected intent
     - Step-by-step breakdown
     - Channel indicators
     - Latency windows
     - Escalation paths
  6. **Metrics**: 
     - Product Friction Index (PFI)
     - Customer Burden Index (CBI)
     - Customer Agency Index (CAI)
     - Human Dependency Index (HDI)
     - Charts and visualizations
     - Root cause analysis
  7. **Story**: 
     - Storyboard presentation
     - Slide-based navigation
     - Key insights and findings
  8. **Data**: 
     - Data model visualization
     - Entity relationship diagram
     - Cypher query examples
     - Schema documentation
- **Data Sources**: 
  - JSON file: `faq_data_gemini.json` (1.3MB file with products, intents, steps, conditions, latencies, escalations, value_leakages, evidence_anchors, channels, responsible_parties, content_assets)
- **Data Source Tooltips**: Mark as "JSON"
- **Current Styling**: DO NOT REUSE—rebuild with new design system
- **Implementation**: Copy JSON file to `UI_Dashboard/data/`, extract all content and functionality, rebuild with new styling

---

## **Application Structure & Navigation**

### **Level 1: Parent Dashboard**
- **Source**: Adapted from `tfs_storyboard_v4.html`
- **Purpose**: Main landing page for entire application
- **Contains**:
  - All original functionality from HTML file (product analysis, sentiment, journeys, etc.)
  - All original content sections
  - All original pages and views
  - **NEW**: "FAQ Insights" button/card/section to access FAQ area
- **Navigation**: 
  - **NO SIDEBAR** (original has sidebar—do NOT replicate)
  - Reimagine in modern way: top navigation, tab system, card-based navigation, section anchors, etc.
  - Take inspiration from Apple's website navigation patterns
- **Styling**: Completely rebuilt with new design system
- **Data**: Hardcoded (with tooltips)

### **Level 2: FAQ Insights Area**
Accessed by clicking "FAQ Insights" button/card from Parent Dashboard

#### **Default Landing Page: FAQ Dashboard (Section 1 of 9)**
- **Source**: Combination of `Sitemap_CX/dashboard-ui/App.tsx` + `BusinessMetrics.tsx`
- **Layout**: Single scrollable page with:
  - **Top Section**: Sitemap Analytics content
    - Header
    - Stats cards
    - Domain analysis
    - Sensitive domains
    - Redundant content
  - **Visual Separator**: Clear line/divider with text indicating "Business Metrics" or similar
  - **Bottom Section**: Business Metrics content
    - Content health
    - Navigation depth
    - FAQ quality
    - Dependencies
    - Issues
- **Data**: JSON + SQLite (with tooltips)
- **Navigation**: This is the default landing page when entering FAQ Insights

#### **Additional FAQ Sections (Sections 2-9)**
Navigation tabs/buttons/menu to access:
1. **Dashboard** (default - described above)
2. **Graph** - Interactive knowledge graph
3. **Home** - Overview and product landscape
4. **Products** - Product explorer
5. **Entities** - Entity type browser
6. **Journeys** - Journey path viewer
7. **Metrics** - Business metrics and friction analysis
8. **Story** - Storyboard presentation
9. **Data** - Data model and schema

**Navigation Design**:
- Modern navigation system (top tabs, side menu, card grid, etc.)—NOT a traditional sidebar
- Consistent with overall design system
- Easy to switch between sections
- Clear indication of current section

**Navigation Behavior**:
- When in FAQ Insights area, user sees ONLY FAQ section navigation (9 sections above)
- Parent Dashboard navigation is HIDDEN
- "Back to Dashboard" or "Home" button to return to Parent Dashboard
- Once back on Parent Dashboard, FAQ navigation is hidden again
- Smooth transitions between areas

---

## **Data Migration & Management**

### **Files to Copy INTO `UI_Dashboard/data/`**:

1. **From `CX_Insights/Data_Extraction/Cooking/Sitemap_CX/dashboard-ui/public/data/`**:
   - `stats.json`
   - `faqs.json`
   - `external-stats.json`
   - `business-metrics.json`
   - `redundant-content.json`
   - `pdf-analysis.json`

2. **From `CX_Insights/Data_Extraction/Cooking/Sitemap_CX/output/`**:
   - SQLite database file(s) - locate and copy

3. **From `CX_Insights/UI_Dashboard/Temporary_test/`**:
   - `faq_data_gemini.json`

### **Data Source Tracking**:
- Maintain clear mapping of which data comes from which source
- Implement tooltip system to display source on hover/click
- Ensure tooltips are visually consistent and non-intrusive
- Create utility functions to wrap data with source metadata

---

## **Implementation Approach**

### **Phase 0: Research & Design System Creation**
1. **Research Apple's Design Language**:
   - Study apple.com navigation patterns (NO sidebars)
   - Analyze spacing, typography, color usage
   - Note animation and interaction patterns
   - Identify scroll-based effects and micro-interactions

2. **Research Best Dashboard Designs**:
   - Look for aesthetically pleasing data-rich dashboards
   - Identify modern patterns for displaying metrics, charts, cards
   - Note innovative navigation solutions
   - Find inspiration for widget layouts

3. **Extract Toyota Financial Services Colors**:
   - Visit Toyota Financial Services website
   - Extract primary, secondary, accent colors
   - Create color palette with usage guidelines
   - Ensure dark colors (black/red) are used sparingly

4. **Create Design System**:
   - Define color tokens (primary, secondary, accent, neutral, semantic)
   - Define spacing scale (consistent margins, padding, gaps)
   - Define typography scale (headings, body, captions, etc.)
   - Define shadow/elevation system
   - Define border radius values
   - Define animation/transition timings
   - Document widget sizing system (small, medium, large)

### **Phase 1: Project Setup**
1. Create new React + Vite project in `UI_Dashboard/`
2. Install dependencies:
   - TailwindCSS
   - Lucide React
   - Recharts
   - react-force-graph-2d
   - Any other needed libraries
3. Set up directory structure (pages, components, data, styles, utils)
4. Copy all data files into project:
   - JSON files from Sitemap_CX
   - SQLite database from Sitemap_CX/output
   - faq_data_gemini.json from Temporary_test
5. Create design tokens file with color palette, spacing, typography
6. Set up TailwindCSS with custom theme based on design system

### **Phase 2: Core Components**
1. **Widget System**:
   - Create base Widget component with size variants (small, medium, large)
   - Implement responsive sizing logic
   - Add consistent styling (shadows, borders, padding, etc.)

2. **Data Tooltip System**:
   - Create DataTooltip component
   - Implement tooltip positioning logic
   - Style tooltips to be minimal and non-obtrusive
   - Create wrapper components/utilities for data with source metadata

3. **Navigation Components**:
   - Create modern navigation component (NO sidebar)
   - Implement smooth transitions between sections
   - Create "Back to Dashboard" button component

4. **Animation Utilities**:
   - Set up scroll-based animation utilities
   - Create reusable transition components
   - Implement micro-interaction patterns

### **Phase 2.5: Skeleton/Demo Page for Approval**
**Purpose**: Create a demonstration page using the actual core components built in Phase 2 to get approval on the design direction before populating with real content.

1. **Build Skeleton Page**:
   - Use the actual Widget components created in Phase 2
   - Use the actual Navigation components created in Phase 2
   - Use the actual DataTooltip components created in Phase 2
   - Include sample text for headers, titles, labels
   - Show the structure of how the website will be laid out
   - Demonstrate the widget sizing system (small, medium, large widgets arranged together)

2. **What to Include**:
   - Navigation structure (top nav, tabs, or whatever pattern was chosen)
   - Widget grid layout with empty/placeholder widgets
   - Sample headers and section titles
   - Working animations and interactions (scroll effects, hover states, transitions)
   - Sample tooltips on placeholder data
   - "Back to Dashboard" button example
   - Any other interactive components

3. **What NOT to Include**:
   - Real data from the sources
   - Fully populated content
   - All the detailed charts and visualizations
   - Complete functionality

4. **Think of it as**:
   - Like viewing Apple's website but all images are empty placeholders
   - Interactive components exist but are empty
   - Structure and layout are visible
   - Animations and interactions work
   - Gives a clear feel for the final design direction

5. **Get Approval**:
   - Review the skeleton page
   - Test interactions and animations
   - Verify design system is applied correctly
   - Make any necessary adjustments before proceeding
   - **Only move to Phase 3 after approval**

### **Phase 3: Parent Dashboard**
1. **Content Analysis**:
   - Read through `tfs_storyboard_v4.html` thoroughly
   - Map out all sections, views, and functionality
   - Extract all data points and mark as "Hardcoded"
   - List all navigation items and hierarchy

2. **Navigation Redesign**:
   - Reimagine sidebar navigation in modern format
   - Design top navigation or tab system
   - Create section anchor links or card-based navigation
   - Ensure all original navigation items are accessible

3. **Build Sections**:
   - Product cards with sentiment indicators
   - Journey stage flows
   - Friction layers analysis
   - Operating model party flows
   - Entity exploration
   - Sentiment analysis (App Store, Google Play, TrustPilot, BBB)
   - Time-based filtering
   - All other views and functionality

4. **Add FAQ Insights Entry Point**:
   - Create prominent "FAQ Insights" button/card
   - Position appropriately within dashboard
   - Implement navigation to FAQ area

5. **Apply Design System**:
   - Use widget components consistently
   - Apply design tokens throughout
   - Add animations and interactions
   - Ensure responsive behavior

### **Phase 4: FAQ Dashboard (Combined)**
1. **Sitemap Analytics Section**:
   - Header with title and description
   - Stats cards (Total Pages, FAQs, External Domains, etc.)
   - Domain analysis table/list with clickable domains
   - Modal/popup for domain URL details
   - Sensitive domains alert section
   - Redundant content analysis
   - FAQ search functionality

2. **Visual Separator**:
   - Clear divider between sections
   - Text label indicating "Business Metrics" section

3. **Business Metrics Section**:
   - Content health metrics with health score
   - Navigation depth distribution chart
   - FAQ quality metrics (self-service rate, answer modes)
   - PDF dependencies analysis
   - Broken links issues table

4. **Data Integration**:
   - Load JSON files (stats, faqs, external-stats, business-metrics, etc.)
   - Load SQLite database
   - Implement data fetching/loading logic
   - Add tooltips to all data points (JSON/SQLite)

5. **Apply Design System**:
   - Use widget components
   - Apply consistent styling
   - Add animations
   - Ensure responsive layout

### **Phase 5: FAQ Knowledge Graph Sections**

#### **Section 2: Graph**
1. Set up react-force-graph-2d
2. Load data from faq_data_gemini.json
3. Build node/link data structure (14 entity types)
4. Implement layer toggles (Steps, Rules, Details, Evidence, Leakage)
5. Add node selection and zoom functionality
6. Apply color coding for entity types
7. Style controls and UI elements
8. Add tooltips to data (JSON)

#### **Section 3: Home**
1. Create overview banner with stats
2. Build product landscape grid (6 products)
3. Display all 14 building blocks
4. Show product metrics (CBI, CAI, HDI)
5. Display sentiment from external sources
6. Add tooltips to all data (JSON)
7. Apply design system

#### **Section 4: Products**
1. Create product selector
2. Display product details (description, category, complexity, etc.)
3. Show related intents
4. Show related channels
5. Show related conditions
6. Add tooltips to data (JSON)
7. Apply design system

#### **Section 5: Entities**
1. Create entity type selector (14 types)
2. Display entity list for selected type
3. Show entity details
4. Display related connections
5. Add tooltips to data (JSON)
6. Apply design system

#### **Section 6: Journeys**
1. Create intent selector
2. Display journey paths for selected intent
3. Show step-by-step breakdown
4. Add channel indicators
5. Display latency windows
6. Show escalation paths
7. Add tooltips to data (JSON)
8. Apply design system

#### **Section 7: Metrics**
1. Display Product Friction Index (PFI)
2. Show Customer Burden Index (CBI)
3. Show Customer Agency Index (CAI)
4. Show Human Dependency Index (HDI)
5. Create charts and visualizations
6. Display root cause analysis
7. Add tooltips to data (JSON)
8. Apply design system

#### **Section 8: Story**
1. Create storyboard presentation layout
2. Implement slide-based navigation
3. Display key insights and findings
4. Add tooltips to data (JSON)
5. Apply design system

#### **Section 9: Data**
1. Create data model visualization
2. Display entity relationship diagram
3. Show Cypher query examples
4. Add schema documentation
5. Add tooltips to data (JSON)
6. Apply design system

### **Phase 6: Navigation & Integration**
1. **FAQ Section Navigation**:
   - Implement navigation between all 9 FAQ sections
   - Make Dashboard the default landing page
   - Add smooth transitions between sections
   - Ensure current section is clearly indicated

2. **Parent ↔ FAQ Navigation**:
   - Implement "FAQ Insights" button on Parent Dashboard
   - Implement "Back to Dashboard" button in FAQ area
   - Handle navigation state properly
   - Show/hide appropriate navigation based on current area

3. **State Management**:
   - Manage current section state
   - Preserve scroll position when appropriate
   - Handle browser back/forward buttons
   - Ensure smooth user experience

### **Phase 7: Animations & Interactions**
1. **Scroll-Based Animations**:
   - Implement parallax effects where appropriate
   - Add fade-in/slide-in animations on scroll
   - Create scroll-triggered reveals
   - Add sticky headers or sections

2. **Micro-Interactions**:
   - Button hover/click feedback
   - Card hover effects
   - Loading states
   - Transition animations

3. **Page Transitions**:
   - Smooth transitions between Parent and FAQ areas
   - Smooth transitions between FAQ sections
   - Fade/slide effects

4. **Interactive Elements**:
   - Chart interactions (hover, click)
   - Graph interactions (zoom, pan, select)
   - Modal/popup animations
   - Tooltip animations

### **Phase 8: Responsive Design & Polish**
1. **Responsive Behavior**:
   - Test on desktop, tablet, mobile
   - Ensure widget system scales properly
   - Adjust layouts for different screen sizes
   - Test navigation on mobile

2. **Cross-Browser Testing**:
   - Test on Chrome, Firefox, Safari, Edge
   - Fix any browser-specific issues

3. **Performance Optimization**:
   - Optimize large data files (faq_data_gemini.json is 1.3MB)
   - Lazy load sections/components
   - Optimize images and assets
   - Minimize bundle size

4. **Final Polish**:
   - Review all tooltips
   - Check all animations
   - Verify design consistency
   - Test all navigation flows
   - Ensure all data sources are properly marked
   - Final design review against requirements

---

## **Key Design Principles to Maintain**

1. **No code references outside `UI_Dashboard/`** - Everything self-contained
2. **90% Apple aesthetic, 10% best-of-web dashboards** - Clean, minimal, smooth, modern, data-rich
3. **NO sidebars** - Modern navigation patterns only
4. **Toyota colors as accents** - Dark colors used sparingly
5. **Widget consistency** - Uniform sizing system, easy to modify
6. **Data source transparency** - Every data point has tooltip (except future knowledge graph)
7. **Responsive design** - Works on all screen sizes
8. **Developer-friendly** - Modular, well-organized, easy to maintain
9. **Complete rebuild** - NOT reusing existing styling, only content/data
10. **Smooth navigation** - Clear hierarchy between Parent and FAQ areas
11. **No backend dependency** - Static file serving only
12. **Modern animations** - Scroll effects, micro-interactions, smooth transitions—not just hover effects
13. **Design system consistency** - Same design language throughout entire application
14. **Skeleton-first approach** - Build and approve design system before populating with content

---

## **Success Criteria**

The project will be considered successful when:

1. ✅ All content from three sources is integrated
2. ✅ Completely new design system is applied consistently
3. ✅ NO styling from original sources is carried over
4. ✅ Navigation works smoothly between Parent and FAQ areas
5. ✅ All 9 FAQ sections are accessible and functional
6. ✅ All data sources are properly marked with tooltips
7. ✅ Widget system is responsive and consistent
8. ✅ Modern animations and interactions are implemented
9. ✅ NO sidebars—modern navigation patterns used
10. ✅ Application looks cohesive and professionally designed
11. ✅ Toyota Financial Services colors are used appropriately
12. ✅ Apple-inspired aesthetic is achieved (90%)
13. ✅ Best-of-web dashboard patterns are incorporated (10%)
14. ✅ All code is self-contained in `UI_Dashboard/`
15. ✅ Application is responsive across devices
16. ✅ Skeleton/demo page approved after Phase 2 before building full content

---

## **Development Workflow**

1. **Start with Research**: Don't skip Phase 0—proper research is critical
2. **Build Core Components**: Complete Phase 1 and Phase 2 to create the foundation
3. **Get Approval on Skeleton**: Build demo page in Phase 2.5 using actual components and get feedback before proceeding to content implementation
4. **Build Incrementally**: Complete one phase before moving to next
5. **Test Continuously**: Test navigation, responsiveness, and interactions as you build
6. **Maintain Consistency**: Constantly refer back to design system
7. **Document as You Go**: Comment code, especially shared components
8. **Review Regularly**: Step back and review overall cohesiveness

---

## **Notes & Reminders**

- This is a **complete rebuild**, not a refactor
- The existing samples are **reference for content only**, not design
- **Consistency** is more important than individual feature perfection
- **User experience** should feel smooth and modern
- **Design system** is the foundation—establish it properly first
- **Skeleton approval** prevents wasted effort on wrong direction
- **No shortcuts**—build it right the first time

---

This guide represents the complete vision for the TFS Customer Experience Dashboard. Follow it systematically, and the result will be a world-class, cohesive, beautifully designed application.
