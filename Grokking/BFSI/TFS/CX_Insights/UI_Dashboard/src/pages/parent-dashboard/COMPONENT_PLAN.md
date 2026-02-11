# Parent Dashboard — Component Plan

## Main Container

### `ParentDashboard.jsx`
- Top-level route component for `/*`
- Manages active section state
- Renders nav bar + current section view
- Contains "Talk to Data" modal state

---

## Section Components (one per view)

### `sections/Overview.jsx`
- Hero section: Toyota logo, headline, subtitle, CTA links
- Metrics row: 6 key numbers (products, intents, paths, pages, entities, channels)
- Product tiles: 2×2 grid linking to Products section
- Journey preview: horizontal bar chart summary
- Sentiment snapshot: average rating + trend indicator
- FAQ Insights CTA: dark full-width section with red button → `/faq/`
- **Shared components used**: Section, FadeIn, DataTooltip, ToyotaLogo

### `sections/Products.jsx`
- Section header: "Explore products."
- 4 product tiles (Apple-style rounded cards on `#f5f5f7`)
- Each tile: name, sentiment indicator, trend, burden, offline %, top 3 issues
- Product detail expand/view (inline or modal)
- Insight callout with ranked findings
- **Data**: 4 products with stats + issues
- **Shared components used**: Section, FadeIn, DataTooltip

### `sections/Journeys.jsx`
- Section header: "Every step, mapped."
- Stage flow: horizontal row with 6 stages (progress bars, burden scores)
- Recharts dual-axis chart: bar (% actions) + line (burden)
- Journey paths: collapsible cards for Primary, Alternate, Exception
- Each path: step-by-step flow with channel indicators + latency bars
- **Data**: 6 stages, 3 journey paths with steps
- **Shared components used**: Section, FadeIn, DataTooltip

### `sections/Sentiment.jsx`
- Section header: "What customers are saying."
- Time period selector (inline, Apple-style)
- Recharts line chart: 8-quarter sentiment trend with annotations
- Platform breakdown: 4 platforms with ratings, review counts, sample text
- Trust degradation chart (bar by stage)
- Cross-platform insight callout
- **Data**: 8 quarters trend, 4 platforms, trust data
- **Shared components used**: Section, FadeIn, DataTooltip

### `sections/Friction.jsx`
- Section header: "Where friction lives."
- Constraint badges: 13 badges in 3 categories (Structural/Policy/Design)
- Key insight callout: "77% within TFS control"
- Recharts stage heatmap (bar with color scale)
- Recharts pie chart (friction type breakdown)
- **Data**: 13 constraints, stage heatmap data, pie data
- **Shared components used**: Section, FadeIn, DataTooltip

### `sections/Operating.jsx`
- Section header: "The operating model."
- Party flow: horizontal layout showing 5 parties with ownership %
- Customer-as-Integrator callout
- Recharts pie: ownership distribution
- Recharts bar: burden by party count
- Digital platform gap analysis
- **Data**: 5 parties with metrics, gap data
- **Shared components used**: Section, FadeIn, DataTooltip

### `sections/Ontology.jsx`
- Section header: "The knowledge graph."
- Entity grid: 13 entity type tiles
- Each tile: icon, name, count, "Explore →" link
- Entity detail panel (expand inline or navigate)
- **Data**: 13 entity types with counts
- **Shared components used**: Section, FadeIn, DataTooltip

### `sections/Opportunities.jsx`
- Section header: "The agentic future."
- Current vs Future state comparison (side-by-side)
- 4 capability cards: Proactive Agent, Predictive Assist, Smart Orchestration, Conversational AI
- Opportunity catalog: detailed entries with impact metrics
- **Data**: comparison metrics, 4 capabilities, 2+ opportunities
- **Shared components used**: Section, FadeIn, DataTooltip

---

## Dashboard-Level Components

### `components/DashboardHeader.jsx`
- Reuses the approved skeleton nav bar pattern
- Toyota logo (white variant) + "Toyota Financial Services" on left
- Section tabs on right (text links, active = white, inactive = gray)
- Sticky, dark, frosted (`#1d1d1f` 72% opacity + backdrop-blur)
- "Talk to Data" trigger (optional, could be icon button)

### `components/TimeFilter.jsx`
- Inline time period selector for Sentiment section
- Apple-style segmented control or minimal dropdown
- Options: Q1 2023 through Q4 2024 (8 periods)
- Previous/Next navigation

### `components/StageFlow.jsx`
- Horizontal stage visualization (Understand → Decide → Act → Confirm → Recover → Escalate)
- Each stage: name, %, burden score
- Highlight hotspot stages (Act, Recover)
- Clickable for filtering

### `components/JourneyPath.jsx`
- Collapsible journey path card
- Header: path name, type badge (primary/alternate/exception), step count, party count
- Expanded: step-by-step horizontal flow with channel indicators
- Latency bars between steps

### `components/ConstraintBadge.jsx`
- Pill-shaped badge for friction constraints
- Color-coded: Structural (red), Policy (amber), Design (yellow)

### `components/PartyCard.jsx`
- Party box in operating model flow
- Icon, name, ownership %, key metrics

### `components/EntityCard.jsx`
- Entity type tile for ontology grid
- Icon, name, count, explore link

### `components/ComparisonCard.jsx`
- Side-by-side Current vs Future state display
- Metric rows with color-coded values

### `components/CapabilityCard.jsx`
- Apple-style tile for capabilities section
- Icon, title, description, examples, impact metric

---

## Shared Components Used (from Chapter 2)

| Component | Usage |
|-----------|-------|
| Section | Every section (alternating white/light/dark backgrounds) |
| FadeIn | All content sections (scroll-triggered reveal) |
| DataTooltip | Every data point (all marked as `hardcoded`) |
| ToyotaLogo | Nav bar (white), overview hero (color) |
| Navigation | Not needed — nav is custom in dark bar |
| Widget | Minimal use — only for small card-like elements if needed |
| WidgetGrid | For product tiles, entity grid, capability grid |
| Loading | During any async operations |
| EmptyState | If filtering yields no results |

---

## Chart Components (Recharts)

All 9 original Plotly charts → Recharts:

| Chart | Recharts Component | Section |
|-------|-------------------|---------|
| Stage distribution + burden | `<ComposedChart>` with `<Bar>` + `<Line>` | Journeys |
| Link depth | `<BarChart>` | Content (merged into Overview) |
| Escalation by product | `<BarChart>` | Content (merged into Overview) |
| Sentiment trend | `<LineChart>` with annotations | Sentiment |
| Trust degradation | `<BarChart>` | Sentiment |
| Stage heatmap | `<BarChart>` with color scale | Friction |
| Friction types | `<PieChart>` | Friction |
| Ownership | `<PieChart>` | Operating |
| Burden by parties | `<BarChart>` with color scale | Operating |

### Chart Styling
- No grid lines (Apple-clean)
- `#1d1d1f` for primary data colors
- `#EB0A1E` for highlighted/negative data
- `#86868b` for axis labels
- `#d2d2d7` for subtle grid if needed
- Generous padding, rounded bars
- Custom tooltip matching DataTooltip style
