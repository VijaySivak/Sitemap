# TFS Customer Experience Storyboard - Feature Specification


## ARCHITECTURE

### Layout
```
┌────────────────────────────────────────────────┐
│ HEADER: [Logo] [Title] ......... [Talk 🔍]   │
├────────────────────────────────────────────────┤
│ FILTERS: [Product ▼] [Sentiment ▼] [Stage ▼] │
├─────────┬──────────────────────────────────────┤
│ SIDEBAR │ MAIN CONTENT (active view)          │
│ 280px   │                                      │
│ • Tree  │                                      │
│ • Views │                                      │
│ • Stats │                                      │
└─────────┴──────────────────────────────────────┘

### Navigation
- Explore-first 
- Sidebar always visible with product tree + view menu
- Filters persist globally


## DATA MODEL

Knowledge graph entities (counts data-driven):
1. Product, 2. CustomerIntent, 3. JourneyPath, 4. InstructionStep, 5. Condition, 6. LatencyWindow, 7. Channel, 8. ResponsibleParty, 9. ValueLeakage, 10. SentimentSignal, 11. ContentAsset, 12. EscalationPath, 13. EvidenceAnchor

**Relationships:** Product → Intent → Path → Step → Condition → Leakage/Sentiment


## GLOBAL COMPONENTS

### Header
- Left: TFS logo + platform title
- Right: Talk button → opens query modal

### Filter Bar
- **Product:** Dropdown populated from data
- **Sentiment:** All / Positive / Neutral / Negative  
- **Stage:** All / Understand / Decide / Act / Confirm / Recover / Escalate
- **Clear All** button
- Active filters highlighted in Toyota red

### Sidebar
**Products Tree:** Collapsible, click product → expand intents, click intent → filter + navigate to Journey view

**Views Menu:**
- Product Overview
- Journey Analysis  
- Content Quality
- Sentiment Insights
- Friction Heatmap
- Operating Model
- Ontology Explorer
- Opportunities

**Quick Stats:** Data counts + last sync time

### Talk to Data Modal
- Title + description
- Example queries (clickable)
- Text input for natural language
- Submit button
- Context indicator (shows active filters)
- Results: text + auto-generated chart

---

## VIEWS

### 1. PRODUCT OVERVIEW
**Purpose:** Executive entry showing product health

**Layout:**
- Grid of product cards
- Cross-product insights below

**Product Card:**
- Icon, name, sentiment (face + trend arrow), stats, top issues list, "View Details" button
- Border color by sentiment

**Insights:** Top friction patterns across products with prevalence

---

### 2. JOURNEY ANALYSIS
**Purpose:** Deep-dive into customer journeys

**Stage Flow:**
- 6 boxes showing stage name, % actions, burden score
- Click to filter by stage
- Hotspots highlighted

**Journey Paths:**
- Expandable accordions (PRIMARY/ALTERNATE/EXCEPTION)
- Header: title, counts, duration
- Content: horizontal scrolling step cards
  - Color: green (digital), red (offline), orange (manual)
  - Hover: shows details
  - Warning icon if conditions
- Latency bar below

**Chart:** Dual-axis (% actions + burden by stage)

---

### 3. FAQ CONTENT QUALITY (vijay dashboard)

**Purpose:** Analyze scraped data structure

**Metrics:** Cards showing link depth, escalation language %, redundancy %, ambiguity %, path visibility (red/amber/green indicators)

**Details:** Expandable sections with charts/lists for:
- External links (depth distribution, destinations)
- Escalation phrases (counts, by product)
- Redundancy (clusters)
- Time ambiguity (examples, by intent)
- Path visibility (clear/partial/none)

---

### 4. SENTIMENT INSIGHTS
**Purpose:** Review analysis over time/platform

**Time Control:** Period selector + draggable slider, updates charts

**Trend:** Line chart (time vs sentiment) with event markers

**Platform Split:** Side-by-side panels, each showing:
- Overall sentiment, review count
- Theme cards: score, count, phrases, maps to journey

**Advanced:**
- Uncertainty signals (count + phrases)
- Trust degradation (count + phrases, by stage)
- Emotional trajectory (line by stage)

---

### 5. FRICTION HEATMAP
**Purpose:** Visualize friction sources

**Stage Concentration:** Stacked bar by stage, color by burden

**Friction Layers:** 3 sections (structural/policy/design)
- Count, list, complexity indicators
- Pie chart showing distribution
- Key insight on controllable %

---

### 6. OPERATING MODEL
**Purpose:** Show organizational impact

**Party Flow:** Customer at center, parties flowing right with ownership %, metrics, leakage highlighting

**Analysis:**
- Leakage callout
- Handoff analysis (burden by party count, patterns)
- Digital gap (current vs benchmark, top gaps)

**Charts:** Ownership pie, burden bars, digital gauge

---

### 7. ONTOLOGY EXPLORER
**Purpose:** Understand data structure

**Entity Grid:** Cards with icon, name, count, "Explore" button + search

**Detail Panel:** Definition, properties, relationships (plain English), instances table, action buttons

---

### 8. OPPORTUNITIES
**Purpose:** Show improvement potential

**Before/After:** Two columns comparing current vs agentic state (journey viz + metrics) with slider

**Capabilities:** Cards showing agentic capability types with examples + impact

**Catalog:** Expandable opportunity cards (problem, solution, impact, addresses)

---

## INTERACTIONS

**Filtering:** Apply to all views, persist on navigation, highlight active

**Navigation:** Sidebar click → switch view, maintain scroll

**Journey:** Stage click → filter, step hover → tooltip, path header → expand

**Entity:** Card click → detail panel

**Time:** Drag/click → update period + charts

**Talk:** Query → answer + viz (backend TBD)

---

## DESIGN SYSTEM

### Colors
- Primary: #EB0A1E (red)
- Dark: #C00000, #000000, #1A1A1A
- Medium: #4A4A4A
- Light: #E5E5E5, #FFFFFF
- Accent: #0047AB (blue)
- Sentiment: #28A745 (green), #FFC107 (amber), #DC3545 (red)

### Typography
- Headings: Bold sans
- Body: Regular 16px
- Data: Monospace

### Spacing
- Sections: 40px
- Cards: 25-30px
- Internal: 15-20px

### Radius
- Cards: 12px
- Buttons: 8px
- Pills: 6px

---

## CHARTS 

**Common:** Transparent backgrounds, TFS colors, responsive

**Types:**
1. Stage Distribution: Dual-axis bar+line
2. Sentiment Trend: Line with markers
3. Friction: Pie (3-way split)
4. Ownership: Pie (party distribution)
5. Burden: Bar (by party count)
6. Platform: Grouped bars
7. Emotional: Line (by stage)
8. Digital Gap: Gauge

---

## SUCCESS CRITERIA

1. Understand health in <5 min
2. Drill into journeys + friction
3. Compare sentiment across platforms/time
4. Identify controllable friction
5. Professional, on-brand design
6. Intuitive navigation
7. Consistent filters
8. Fast load

