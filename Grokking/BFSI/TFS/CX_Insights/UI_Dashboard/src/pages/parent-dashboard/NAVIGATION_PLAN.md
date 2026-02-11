# Parent Dashboard — Navigation Plan

## Original Navigation (REJECTED)
The original `tfs_storyboard_v4.html` uses a **280px dark sidebar** with expandable tree nav.
This is explicitly rejected per PROJECT_GUIDE.md.

---

## New Navigation Design

### Approach: Single Dark Top Bar + Apple-Style Sectioned Page

Following the approved skeleton page design:

```
┌─────────────────────────────────────────────────────────────┐
│ [Toyota Logo] Toyota Financial Services    [section tabs]   │  ← Dark nav bar (48px)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              [Full-width section content]                    │  ← Scrollable content
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Items (8 sections → matches skeleton)

| # | ID | Label | Original View | Content |
|---|-----|-------|---------------|---------|
| 1 | overview | Overview | — (new) | Hero + metrics + product tiles + FAQ entry |
| 2 | products | Products | VIEW 1 | Product analysis cards |
| 3 | journeys | Journeys | VIEW 2 | Journey stages + paths |
| 4 | sentiment | Sentiment | VIEW 4 | Sentiment deep dive + platforms |
| 5 | friction | Friction | VIEW 5 | Friction layers + constraints |
| 6 | operating | Operating | VIEW 6 | Operating model + party flows |
| 7 | ontology | Ontology | VIEW 7 | Entity explorer |
| 8 | opportunities | Opportunities | VIEW 8 | Future state + capabilities |

### Merged/Relocated Content
- **Content Quality (VIEW 3)**: Merged into Overview section as metric highlights, full detail in FAQ Insights area
- **Filter Bar**: Removed as standalone bar. Filtering is contextual within sections (e.g., time filter in Sentiment)
- **Talk to Data**: Button in nav bar opens modal overlay
- **Quick Stats**: Integrated into Overview hero section metrics
- **FAQ Insights**: CTA card/button in Overview section → navigates to `/faq/*` routes

### Navigation Behavior
1. **Single sticky dark bar** at top (48px height, `#1d1d1f` with backdrop-blur)
2. **Toyota logo + brand** on left
3. **Section tabs** on right (text links, white when active, gray when inactive)
4. Clicking a tab **scrolls to that section** OR **switches view** (TBD based on content length)
5. **No sidebar, no dropdown menus**

### Section Rendering Strategy

**Option A: Single Scrollable Page** (Apple-style)
- All sections render on one page, separated by alternating backgrounds
- Nav tabs scroll to the corresponding section
- Pros: Apple-like feel, smooth scrolling, everything visible
- Cons: Heavy page with 9 charts

**Option B: Tab-Switched Views** (Dashboard-style)
- Each tab renders a different view component
- Only one view visible at a time
- Pros: Lighter renders, cleaner per-section focus
- Cons: Less Apple-like

**Recommended: Hybrid**
- Overview is always the landing (Apple-style hero + metrics + tiles)
- Clicking other tabs switches to dedicated section views
- Each section view is a full Apple-style page with its own flowing content
- Back-to-overview via logo click or Overview tab

### Mobile Behavior
- Nav bar collapses tabs into a hamburger or horizontal scroll
- Content stacks vertically
- Charts resize responsively

---

## FAQ Insights Entry Point

Located in the Overview section:
- Dark full-width CTA section (like the skeleton's "Go deeper with FAQ Insights")
- Red pill button → navigates to `/faq/`
- When in FAQ area, parent nav is hidden
- "Back to Dashboard" button in FAQ area nav

---

## Filter Strategy

Instead of a persistent filter bar, each section handles its own context:

| Section | Filter | Implementation |
|---------|--------|---------------|
| Products | — | All 4 always shown |
| Journeys | Stage selector | Inline stage flow (clickable stages) |
| Sentiment | Time period | Inline time selector within section |
| Friction | Type filter | Inline badge toggles |
| Operating | — | All parties always shown |
| Ontology | Entity type | Inline entity grid (clickable) |
| Opportunities | — | All shown |
