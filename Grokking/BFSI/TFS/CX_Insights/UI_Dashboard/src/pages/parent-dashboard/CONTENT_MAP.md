# Parent Dashboard — Content Map

Extracted from `tfs_storyboard_v4.html` (2889 lines, single HTML file with Plotly charts).

---

## Original Navigation (Sidebar — DO NOT REPLICATE)

```
ANALYSIS
├── Product Analysis       → VIEW 1
│   └── [4 product cards]
├── Journey Stages         → VIEW 2
│   ├── Stage Flow
│   └── Journey Paths
├── Content Quality        → VIEW 3
│   ├── Metric Cards
│   └── FAQ Analysis
├── Sentiment Deep Dive    → VIEW 4
│   ├── Trend Chart
│   ├── Platform Reviews
│   └── Trust Degradation
├── Friction Layers        → VIEW 5
│   ├── Constraint Badges
│   └── Friction Breakdown
├── Operating Model        → VIEW 6
│   ├── Party Flow
│   ├── Digital Gap
│   └── Handoff Impact
├── Ontology Explorer      → VIEW 7
│   └── 13 Entity Cards
└── Opportunities          → VIEW 8
    ├── Current vs Future
    ├── Capability Cards
    └── Opportunity Catalog
```

**Other UI Elements:**
- Sticky black header: Logo ("TFS") + "Customer Experience Intelligence Platform" + "Talk to Data" button
- Filter bar: Product dropdown, Sentiment dropdown, Journey Stage dropdown, Clear All
- Sidebar Quick Stats panel
- "Talk to Data" modal with recent queries

---

## Section 1: Product Analysis (VIEW 1)

### Data
| Product | Icon | Sentiment | Trend | Burden | Offline % | Source |
|---------|------|-----------|-------|--------|-----------|--------|
| Auto Leasing | 🚗 | Negative (-0.55) | ↓ Declining | 10 steps | 60% | hardcoded |
| Retail Finance | 💰 | Negative (-0.68) | ↓ Declining | 14 steps | 25% | hardcoded |
| Insurance Products | 🛡️ | Neutral (-0.15) | → Stable | 8 steps | 20% | hardcoded |
| Commercial Lending | 🏢 | Positive (+0.22) | ↑ Improving | 6 steps | 35% | hardcoded |

### Top Issues per Product
- **Auto Leasing**: Lease return process, Mileage disputes, Early termination confusion
- **Retail Finance**: Payment posting delays (2-3 day), Title release wait (10+ days), Payoff amount confusion
- **Insurance**: GAP claims process, VSA cancellation, Coverage confusion (38%)
- **Commercial**: Credit application complexity, Fleet management, Rate negotiations

### Visualizations
- Product cards grid (4 columns, responsive)
- Sentiment face indicators
- Trend arrows
- Insight box with ranked findings

### Interactions
- Click product card → "View Details"
- Hover → border color change

---

## Section 2: Journey Stages (VIEW 2)

### Stage Flow Data
| Stage | % of Actions | Burden Score | Hotspot? | Source |
|-------|-------------|--------------|----------|--------|
| Understand | 15% | 3.8 | No | hardcoded |
| Decide | 18% | 4.5 | No | hardcoded |
| Act | 45% | 8.2 | Yes | hardcoded |
| Confirm | 12% | 4.1 | No | hardcoded |
| Recover | 10% | 9.1 | Yes | hardcoded |
| Escalate | 15% | 7.5 | Yes | hardcoded |

### Journey Paths
**Primary: Lease End Process** (10 steps, 4 parties)
1. Check lease terms (Digital, Understand)
2. Review return options (Digital, Understand)
3. Call TFS for quote (Phone, Decide) ⚠️ condition
4. Schedule inspection (Phone, Act) ⚠️ condition
5. Get inspection quote (Mail, Act) ⏱️ 5-7 days
6. Visit dealer (In-Person, Act) ⚠️ condition
7. Turn in vehicle (In-Person, Act)
8. Get receipt (In-Person, Confirm)
9. Wait for final bill (Mail, Confirm) ⏱️ 60-120 days
10. Review and pay (Digital, Recover) ⚠️ condition

**Alternate: Early Payoff Request** (7 steps, 2 parties)
1. Login to account (Digital)
2. Request payoff quote (Digital)
3. Call for clarification (Phone) ⚠️ condition
4. Review payoff amount (Digital) ⏱️ 1-3 days
5. Send certified payment (Mail/Digital)
6. Wait for processing (—) ⏱️ 10 days
7. Confirm payoff (Digital)

**Exception: Payment Dispute** (5 steps, 3 parties)
1. Notice billing error (Digital)
2. Call TFS (Phone) ⚠️ escalation
3. Submit proof (Mail/Digital)
4. Wait for investigation (—) ⏱️ 30-45 days
5. Resolution notification (Mail)

### Visualizations
- Stage flow horizontal boxes with arrows
- Plotly dual-axis chart: bar (% actions) + line (burden score)
- Journey path cards (collapsible) with step-by-step flow
- Latency bars

### Interactions
- Click stage → filter journeys
- Click path header → collapse/expand steps
- Step hover → highlight

---

## Section 3: Content Quality (VIEW 3)

### Metric Cards
| Metric | Value | Severity | Source |
|--------|-------|----------|--------|
| FAQ Coverage | 68% | High (red border) | hardcoded |
| Self-Service Rate | 42% | High (red border) | hardcoded |
| Escalation Language | 35% | Medium (amber) | hardcoded |
| Answer Completeness | 73% | Good (green) | hardcoded |

### Charts
- Link Depth Distribution (bar): 1 level 23%, 2 levels 45%, 3 levels 22%, 4+ levels 10%
- Escalation by Product (bar): Leasing 35%, Retail 25%, Insurance 18%, Commercial 12%

### Interactions
- Static display only

---

## Section 4: Sentiment Deep Dive (VIEW 4)

### Time Period Data (Q1 2023 — Q4 2024)
| Quarter | Polarity | Annotation |
|---------|----------|------------|
| Q1 2023 | -0.10 | — |
| Q2 2023 | +0.20 | 📍 Mobile app launch |
| Q3 2023 | +0.15 | — |
| Q4 2023 | -0.30 | 📍 Payment issue |
| Q1 2024 | -0.25 | — |
| Q2 2024 | -0.35 | — |
| Q3 2024 | -0.42 | — |
| Q4 2024 | -0.38 | — |

### Platform Reviews
| Platform | Rating | Reviews | Source |
|----------|--------|---------|--------|
| App Store | 2.1/5 | 4,231 | hardcoded |
| Google Play | 1.8/5 | 12,847 | hardcoded |
| TrustPilot | 1.4/5 | 892 | hardcoded |
| BBB Complaints | 1.2/5 | 341 | hardcoded |

Each platform has sample review text and sentiment cards.

### Charts
- Sentiment trend line (8 quarters, with annotations)
- Trust degradation by stage (bar): Understand 8%, Decide 12%, Act 45%, Confirm 18%, Recover 17%

### Interactions
- Time period slider (8 positions)
- Previous/Next buttons

---

## Section 5: Friction Layers (VIEW 5)

### 13 Constraints
**Structural (3)** — Cannot change:
1. Title is physical document
2. DMV processing required
3. Bank clearing times

**Policy (5)** — TFS can change:
1. 2-3 day payment posting delay
2. 10 business day title release
3. Physical inspection required
4. Separate AutoPay cancellation step
5. 60-day notice period

**Design (5)** — TFS should change:
1. No real-time payment tracking
2. PDF-dependent processes
3. Phone-only scheduling
4. Customer must initiate everything
5. Invoice 60-120 day opacity

### Key Insight
**77% of friction points are policy or design choices** — within TFS control.

### Charts
- Stage heatmap (bar with burden color scale)
- Friction type pie: Structural 23%, Policy 38%, Design 38%

---

## Section 6: Operating Model (VIEW 6)

### Party Flow
| Party | Ownership | Icon | Key Metric | Source |
|-------|-----------|------|------------|--------|
| Customer | — (Forced Integrator) | 👤 | 90 days burden, 4.2 avg parties, -0.55 sentiment | hardcoded |
| Digital Platform | 42% | 💻 | Gap impact: 22% CC volume | hardcoded |
| Contact Center | 28% | ☎️ | 22% avoidable volume | hardcoded |
| Dealer Network | 15% | 🏢 | High variability risk | hardcoded |
| Back Office | 10% | ⚙️ | 15 days processing | hardcoded |

### Digital Platform Gap
- Current: 42%, Benchmark: 55-65%, Best-in-class: 75%+
- Top gaps: Payment status, Inspection scheduling, Title tracking, Payoff quote, Fee transparency

### Charts
- Ownership pie chart
- Burden by parties bar: 1→2.5, 2→4.8, 3→7.5, 4+→11.2

### Key Stat
- 27% of journeys require 3+ party coordination (34 journeys)
- Average parties per journey: 3.2 (vs 2.0-2.5 benchmark)

---

## Section 7: Ontology Explorer (VIEW 7)

### Entity Types
| Entity | Count | Icon | Source |
|--------|-------|------|--------|
| Product | 4 | 📦 | hardcoded |
| Customer Intent | 17 | 🎯 | hardcoded |
| Journey Path | 23 | 🛤️ | hardcoded |
| Instruction Step | 125 | 📝 | hardcoded |
| Condition | 13 | ⚠️ | hardcoded |
| Latency Window | 6 | ⏱️ | hardcoded |
| Channel | 5 | 📡 | hardcoded |
| Responsible Party | 5 | 👥 | hardcoded |
| Value Leakage | 8 | 💸 | hardcoded |
| Sentiment Signal | 24 | 🎭 | hardcoded |
| Content Asset | 247 | 📄 | hardcoded |
| Escalation Path | 12 | 🚨 | hardcoded |
| Evidence Anchor | 247 | 🔗 | hardcoded |

### Interactions
- Click entity card → detail panel (placeholder alert in original)

---

## Section 8: Opportunities (VIEW 8)

### Current vs Future State (Lease Return)
| Metric | Current | Future | Source |
|--------|---------|--------|--------|
| Burden | 14 | 4 | hardcoded |
| Offline % | 60% | 10% | hardcoded |
| Parties | 4 | 2 | hardcoded |
| Sentiment | -0.55 😟 | +0.25 😊 | hardcoded |
| Duration | 90-120 days | 5-7 days | hardcoded |

### 4 Capability Cards
1. **Proactive Agent**: Monitor state, trigger actions. Impact: -40% payment inquiries
2. **Predictive Assist**: Predict needs, pre-populate. Impact: removes surprise conditions
3. **Smart Orchestration**: Coordinate parties. Impact: 4.2→1.5 parties
4. **Conversational AI**: NL interface. Impact: removes decision complexity

### Opportunity Catalog
- **OPP_PAY_STATUS**: Real-Time Payment Visibility. Impact: -35% escalations, -0.68→+0.15 sentiment
- **OPP_LEASE_ORCH**: AI Lease Return Orchestration. Impact: 10→6 steps, 90-120→5-7 days, 4→2 parties

---

## All Charts (Plotly → Recharts migration)

| # | Chart ID | Type | View | Description |
|---|----------|------|------|-------------|
| 1 | stageChart | Bar + Line | Journey Stages | Stage % + Burden dual axis |
| 2 | linkDepthChart | Bar | Content Quality | Link depth distribution |
| 3 | escalationChart | Bar | Content Quality | Escalation % by product |
| 4 | sentimentTrendChart | Line | Sentiment | Sentiment over 8 quarters |
| 5 | trustChart | Bar | Sentiment | Trust degradation by stage |
| 6 | stageHeatmapChart | Bar (color) | Friction | Stage heatmap with burden |
| 7 | frictionPieChart | Pie | Friction | Structural/Policy/Design split |
| 8 | ownershipChart | Pie | Operating Model | Party ownership split |
| 9 | burdenByPartiesChart | Bar (color) | Operating Model | Burden vs party count |

All charts use Plotly in the original → will be rebuilt with **Recharts**.

---

## "Talk to Data" Modal
- Opens from header button
- Text input for natural language queries
- Recent queries list (4 examples)
- Context display showing active filters
- Placeholder — no actual backend
