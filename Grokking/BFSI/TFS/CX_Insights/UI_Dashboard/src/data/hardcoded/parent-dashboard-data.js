/**
 * Parent Dashboard — Hardcoded Data
 * 
 * ALL data extracted from tfs_storyboard_v4.html.
 * Every value is hardcoded (data source: 'hardcoded').
 * 
 * Used by: ParentDashboard and all section components.
 */

// =============================================================================
// PRODUCTS
// =============================================================================
export const products = [
  {
    id: 'retail-finance',
    name: 'Retail Financing',
    sentiment: { score: -0.10, label: 'Neutral', trend: 'stable', arrow: '→' },
    burden: { steps: 14, offlinePercent: 25 },
    stats: { intents: 18, faqs: 84, reviews: 512 },
    topIssues: [
      'Payment posting delays',
      'Payoff quote complexity',
      'Title release tracking',
    ],
    source: 'hardcoded',
  },
  {
    id: 'leasing',
    name: 'Leasing',
    sentiment: { score: -0.55, label: 'Negative', trend: 'declining', arrow: '↓' },
    burden: { steps: 10, offlinePercent: 60 },
    stats: { intents: 12, faqs: 67, reviews: 487 },
    topIssues: [
      'Return process complexity',
      'Hidden geographic fees',
      'Title delivery delays',
    ],
    source: 'hardcoded',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    sentiment: { score: 0.22, label: 'Positive', trend: 'improving', arrow: '↑' },
    burden: { steps: 8, offlinePercent: 20 },
    stats: { intents: 8, faqs: 34, reviews: 203 },
    topIssues: [
      'Claims processing speed',
      'Coverage clarity',
      'Policy documentation',
    ],
    source: 'hardcoded',
  },
  {
    id: 'commercial',
    name: 'Commercial',
    sentiment: { score: -0.05, label: 'Neutral', trend: 'stable', arrow: '→' },
    burden: { steps: 6, offlinePercent: 35 },
    stats: { intents: 4, faqs: 15, reviews: 52 },
    topIssues: [
      'Fleet management access',
      'Account setup time',
      'Multi-vehicle tracking',
    ],
    source: 'hardcoded',
  },
];

// =============================================================================
// JOURNEY STAGES
// =============================================================================
export const journeyStages = [
  { id: 'understand', name: 'Understand', pctActions: 15, burdenScore: 3.8, hotspot: false, source: 'hardcoded' },
  { id: 'decide', name: 'Decide', pctActions: 18, burdenScore: 4.5, hotspot: false, source: 'hardcoded' },
  { id: 'act', name: 'Act', pctActions: 45, burdenScore: 8.2, hotspot: true, source: 'hardcoded' },
  { id: 'confirm', name: 'Confirm', pctActions: 12, burdenScore: 4.1, hotspot: false, source: 'hardcoded' },
  { id: 'recover', name: 'Recover', pctActions: 10, burdenScore: 9.1, hotspot: true, source: 'hardcoded' },
  { id: 'escalate', name: 'Escalate', pctActions: 15, burdenScore: 7.5, hotspot: true, source: 'hardcoded' },
];

// =============================================================================
// JOURNEY PATHS
// =============================================================================
export const journeyPaths = [
  {
    id: 'lease-end',
    name: 'Lease End Process',
    type: 'primary', // primary | alternate | exception
    stepCount: 10,
    partyCount: 4,
    steps: [
      { num: 1, action: 'Check lease terms', channel: 'Digital', stage: 'Understand', type: 'digital' },
      { num: 2, action: 'Review return options', channel: 'Digital', stage: 'Understand', type: 'digital' },
      { num: 3, action: 'Call TFS for quote', channel: 'Phone', stage: 'Decide', type: 'offline', condition: true },
      { num: 4, action: 'Schedule inspection', channel: 'Phone', stage: 'Act', type: 'offline', condition: true },
      { num: 5, action: 'Get inspection quote', channel: 'Mail', stage: 'Act', type: 'manual', latency: '5-7 days' },
      { num: 6, action: 'Visit dealer', channel: 'In-Person', stage: 'Act', type: 'offline', condition: true },
      { num: 7, action: 'Turn in vehicle', channel: 'In-Person', stage: 'Act', type: 'offline' },
      { num: 8, action: 'Get receipt', channel: 'In-Person', stage: 'Confirm', type: 'offline' },
      { num: 9, action: 'Wait for final bill', channel: 'Mail', stage: 'Confirm', type: 'manual', latency: '60-120 days' },
      { num: 10, action: 'Review and pay', channel: 'Digital', stage: 'Recover', type: 'digital', condition: true },
    ],
    source: 'hardcoded',
  },
  {
    id: 'early-payoff',
    name: 'Early Payoff Request',
    type: 'alternate',
    stepCount: 7,
    partyCount: 2,
    steps: [
      { num: 1, action: 'Login to account', channel: 'Digital', stage: 'Understand', type: 'digital' },
      { num: 2, action: 'Request payoff quote', channel: 'Digital', stage: 'Decide', type: 'digital' },
      { num: 3, action: 'Call for clarification', channel: 'Phone', stage: 'Decide', type: 'offline', condition: true },
      { num: 4, action: 'Review payoff amount', channel: 'Digital', stage: 'Act', type: 'digital', latency: '1-3 days' },
      { num: 5, action: 'Send certified payment', channel: 'Mail/Digital', stage: 'Act', type: 'manual' },
      { num: 6, action: 'Wait for processing', channel: '—', stage: 'Confirm', type: 'manual', latency: '10 days' },
      { num: 7, action: 'Confirm payoff', channel: 'Digital', stage: 'Confirm', type: 'digital' },
    ],
    source: 'hardcoded',
  },
  {
    id: 'payment-dispute',
    name: 'Payment Dispute',
    type: 'exception',
    stepCount: 5,
    partyCount: 3,
    steps: [
      { num: 1, action: 'Notice billing error', channel: 'Digital', stage: 'Understand', type: 'digital' },
      { num: 2, action: 'Call TFS', channel: 'Phone', stage: 'Act', type: 'offline', condition: true },
      { num: 3, action: 'Submit proof', channel: 'Mail/Digital', stage: 'Act', type: 'manual' },
      { num: 4, action: 'Wait for investigation', channel: '—', stage: 'Confirm', type: 'manual', latency: '30-45 days' },
      { num: 5, action: 'Resolution notification', channel: 'Mail', stage: 'Recover', type: 'manual' },
    ],
    source: 'hardcoded',
  },
];

// =============================================================================
// CONTENT QUALITY METRICS
// =============================================================================
export const contentMetrics = [
  { id: 'faq-coverage', label: 'FAQ Coverage', value: '68%', numericValue: 68, severity: 'high', context: 'Products with FAQ support', source: 'hardcoded' },
  { id: 'self-service', label: 'Self-Service Rate', value: '42%', numericValue: 42, severity: 'high', context: 'FAQs fully self-serviceable', source: 'hardcoded' },
  { id: 'escalation', label: 'Escalation Language', value: '35%', numericValue: 35, severity: 'medium', context: 'FAQs requiring calls', source: 'hardcoded' },
  { id: 'completeness', label: 'Answer Completeness', value: '73%', numericValue: 73, severity: 'good', context: 'FAQs with complete answers', source: 'hardcoded' },
];

export const linkDepthData = [
  { depth: '1 level', pct: 23, source: 'hardcoded' },
  { depth: '2 levels', pct: 45, source: 'hardcoded' },
  { depth: '3 levels', pct: 22, source: 'hardcoded' },
  { depth: '4+ levels', pct: 10, source: 'hardcoded' },
];

export const escalationByProduct = [
  { product: 'Leasing', pct: 35, source: 'hardcoded' },
  { product: 'Retail', pct: 25, source: 'hardcoded' },
  { product: 'Insurance', pct: 18, source: 'hardcoded' },
  { product: 'Commercial', pct: 12, source: 'hardcoded' },
];

// =============================================================================
// SENTIMENT DATA
// =============================================================================
export const sentimentTrend = [
  { quarter: 'Q1 2023', polarity: -0.10, annotation: null, source: 'hardcoded' },
  { quarter: 'Q2 2023', polarity: 0.20, annotation: 'Mobile app launch', source: 'hardcoded' },
  { quarter: 'Q3 2023', polarity: 0.15, annotation: null, source: 'hardcoded' },
  { quarter: 'Q4 2023', polarity: -0.30, annotation: 'Payment issue', source: 'hardcoded' },
  { quarter: 'Q1 2024', polarity: -0.25, annotation: null, source: 'hardcoded' },
  { quarter: 'Q2 2024', polarity: -0.35, annotation: null, source: 'hardcoded' },
  { quarter: 'Q3 2024', polarity: -0.42, annotation: null, source: 'hardcoded' },
  { quarter: 'Q4 2024', polarity: -0.38, annotation: null, source: 'hardcoded' },
];

export const platformReviews = [
  { platform: 'App Store', icon: '🍎', rating: 2.1, maxRating: 5, reviewCount: 4231, source: 'hardcoded' },
  { platform: 'Google Play', icon: '🤖', rating: 1.8, maxRating: 5, reviewCount: 12847, source: 'hardcoded' },
  { platform: 'TrustPilot', icon: '⭐', rating: 1.4, maxRating: 5, reviewCount: 892, source: 'hardcoded' },
  { platform: 'BBB Complaints', icon: '🏛️', rating: 1.2, maxRating: 5, reviewCount: 341, source: 'hardcoded' },
];

export const trustDegradationByStage = [
  { stage: 'Understand', pct: 8, source: 'hardcoded' },
  { stage: 'Decide', pct: 12, source: 'hardcoded' },
  { stage: 'Act', pct: 45, source: 'hardcoded' },
  { stage: 'Confirm', pct: 18, source: 'hardcoded' },
  { stage: 'Recover', pct: 17, source: 'hardcoded' },
];

// =============================================================================
// FRICTION CONSTRAINTS
// =============================================================================
export const frictionConstraints = [
  // Structural (cannot change)
  { id: 'f1', label: 'Title is physical document', type: 'structural', source: 'hardcoded' },
  { id: 'f2', label: 'DMV processing required', type: 'structural', source: 'hardcoded' },
  { id: 'f3', label: 'Bank clearing times', type: 'structural', source: 'hardcoded' },
  // Policy (TFS can change)
  { id: 'f4', label: '2-3 day payment posting delay', type: 'policy', source: 'hardcoded' },
  { id: 'f5', label: '10 business day title release', type: 'policy', source: 'hardcoded' },
  { id: 'f6', label: 'Physical inspection required', type: 'policy', source: 'hardcoded' },
  { id: 'f7', label: 'Separate AutoPay cancellation step', type: 'policy', source: 'hardcoded' },
  { id: 'f8', label: '60-day notice period', type: 'policy', source: 'hardcoded' },
  // Design (TFS should change)
  { id: 'f9', label: 'No real-time payment tracking', type: 'design', source: 'hardcoded' },
  { id: 'f10', label: 'PDF-dependent processes', type: 'design', source: 'hardcoded' },
  { id: 'f11', label: 'Phone-only scheduling', type: 'design', source: 'hardcoded' },
  { id: 'f12', label: 'Customer must initiate everything', type: 'design', source: 'hardcoded' },
  { id: 'f13', label: 'Invoice 60-120 day opacity', type: 'design', source: 'hardcoded' },
];

export const frictionTypeSplit = [
  { type: 'Structural', count: 3, pct: 23, color: '#DC3545', source: 'hardcoded' },
  { type: 'Policy', count: 5, pct: 38, color: '#FFC107', source: 'hardcoded' },
  { type: 'Design', count: 5, pct: 38, color: '#FFE082', source: 'hardcoded' },
];

// =============================================================================
// OPERATING MODEL
// =============================================================================
export const parties = [
  {
    id: 'customer',
    name: 'Customer',
    icon: '👤',
    ownership: null,
    role: 'Forced Integrator',
    metrics: { burden: '90 days', avgParties: 4.2, sentiment: -0.55 },
    source: 'hardcoded',
  },
  {
    id: 'digital',
    name: 'Digital Platform',
    icon: '💻',
    ownership: 42,
    role: 'Primary Channel',
    metrics: { gapImpact: '22% CC volume', current: 42, benchmark: '55-65%', bestInClass: '75%+' },
    topGaps: ['Payment status', 'Inspection scheduling', 'Title tracking', 'Payoff quote', 'Fee transparency'],
    source: 'hardcoded',
  },
  {
    id: 'contact-center',
    name: 'Contact Center',
    icon: '☎️',
    ownership: 28,
    role: 'Escalation Handler',
    metrics: { avoidableVolume: '22%' },
    source: 'hardcoded',
  },
  {
    id: 'dealer',
    name: 'Dealer Network',
    icon: '🏢',
    ownership: 15,
    role: 'Physical Touchpoint',
    metrics: { variabilityRisk: 'High' },
    source: 'hardcoded',
  },
  {
    id: 'back-office',
    name: 'Back Office',
    icon: '⚙️',
    ownership: 10,
    role: 'Processing',
    metrics: { processingDays: 15 },
    source: 'hardcoded',
  },
];

export const burdenByParties = [
  { parties: '1 party', burden: 2.5, source: 'hardcoded' },
  { parties: '2 parties', burden: 4.8, source: 'hardcoded' },
  { parties: '3 parties', burden: 7.5, source: 'hardcoded' },
  { parties: '4+ parties', burden: 11.2, source: 'hardcoded' },
];

// =============================================================================
// ONTOLOGY ENTITIES
// =============================================================================
export const entityTypes = [
  { id: 'product', name: 'Product', icon: '📦', count: 4, source: 'hardcoded' },
  { id: 'customer-intent', name: 'Customer Intent', icon: '🎯', count: 17, source: 'hardcoded' },
  { id: 'journey-path', name: 'Journey Path', icon: '🛤️', count: 23, source: 'hardcoded' },
  { id: 'instruction-step', name: 'Instruction Step', icon: '📝', count: 125, source: 'hardcoded' },
  { id: 'condition', name: 'Condition', icon: '⚠️', count: 13, source: 'hardcoded' },
  { id: 'latency-window', name: 'Latency Window', icon: '⏱️', count: 6, source: 'hardcoded' },
  { id: 'channel', name: 'Channel', icon: '📡', count: 5, source: 'hardcoded' },
  { id: 'responsible-party', name: 'Responsible Party', icon: '👥', count: 5, source: 'hardcoded' },
  { id: 'value-leakage', name: 'Value Leakage', icon: '💸', count: 8, source: 'hardcoded' },
  { id: 'sentiment-signal', name: 'Sentiment Signal', icon: '🎭', count: 24, source: 'hardcoded' },
  { id: 'content-asset', name: 'Content Asset', icon: '📄', count: 247, source: 'hardcoded' },
  { id: 'escalation-path', name: 'Escalation Path', icon: '🚨', count: 12, source: 'hardcoded' },
  { id: 'evidence-anchor', name: 'Evidence Anchor', icon: '🔗', count: 247, source: 'hardcoded' },
];

// =============================================================================
// OPPORTUNITIES
// =============================================================================
export const currentVsFuture = {
  journey: 'Lease Return',
  current: {
    flow: 'Customer → Download PDF → Call to schedule → Wait → Get mail → Call dealer → Drive there → Sign → Wait for invoice → ...',
    burden: 14,
    offlinePercent: 60,
    parties: 4,
    sentiment: { score: -0.55, face: '😟' },
    duration: '90-120 days',
    source: 'hardcoded',
  },
  future: {
    flow: 'Agent proactively notifies → Schedule via app → AI coordinates dealer → Digital inspection → Auto-approval → Real-time status',
    burden: 4,
    offlinePercent: 10,
    parties: 2,
    sentiment: { score: 0.25, face: '😊' },
    duration: '5-7 days with full visibility',
    source: 'hardcoded',
  },
};

export const capabilities = [
  {
    id: 'proactive-agent',
    icon: '🤖',
    title: 'Proactive Agent',
    description: 'Agent monitors state and triggers actions before customer asks',
    examples: ['60-day lease notice', 'Payment posted alert', 'Title ready notify'],
    impact: '-40% payment inquiries',
    source: 'hardcoded',
  },
  {
    id: 'predictive-assist',
    icon: '🔮',
    title: 'Predictive Assist',
    description: 'AI predicts next need and pre-populates information',
    examples: ['Lease maturity → quote', 'Payment history → suggest AutoPay', 'Mileage tracking → overage warning'],
    impact: 'Removes surprise conditions',
    source: 'hardcoded',
  },
  {
    id: 'smart-orchestration',
    icon: '🎯',
    title: 'Smart Orchestration',
    description: 'AI coordinates between parties on customer\'s behalf',
    examples: ['Auto-schedule dealer', 'Coordinate inspection', 'Manage title release'],
    impact: '4.2 → 1.5 parties',
    source: 'hardcoded',
  },
  {
    id: 'conversational-ai',
    icon: '💬',
    title: 'Conversational AI',
    description: 'Natural language interface replaces complex forms',
    examples: ['"Schedule my lease return"', '"When will my title arrive?"', '"Make principal-only payment"'],
    impact: 'Removes decision complexity',
    source: 'hardcoded',
  },
];

export const opportunityCatalog = [
  {
    id: 'OPP_PAY_STATUS',
    title: 'Real-Time Payment Visibility',
    problem: '2-3 day posting delay creates "did it work?" calls',
    solution: [
      'Instant confirmation with tracking ID',
      'Bank integration shows real-time status',
      'Proactive alerts on posting completion',
    ],
    impact: { escalationReduction: '-35%', sentimentShift: '-0.68 → +0.15', stepsRemoved: 2 },
    addressesFaq: 'How do I know my payment went through?',
    source: 'hardcoded',
  },
  {
    id: 'OPP_LEASE_ORCH',
    title: 'AI Lease Return Orchestration',
    problem: '10 steps, 4 parties, 90-120 day opacity',
    solution: [
      '60-day proactive notification with pre-filled quote',
      'AI auto-schedules inspection based on availability',
      'Digital inspection via mobile app (photo + AI)',
      'Agent coordinates with dealer and DMV',
      'Real-time status dashboard throughout',
    ],
    impact: { stepsReduced: '10 → 6', durationReduced: '90-120 days → 5-7 days', partiesReduced: '4 → 2', sentimentShift: '-0.55 → +0.25' },
    source: 'hardcoded',
  },
];

// =============================================================================
// TALK TO DATA — Recent Queries
// =============================================================================
export const recentQueries = [
  'Which intents have the highest burden?',
  'Show me FAQs that mention calling',
  'Compare payment sentiment: mobile vs web',
  'What changed in Q3 2024 sentiment?',
];

// =============================================================================
// OVERVIEW METRICS (aggregated for hero section)
// =============================================================================
export const overviewMetrics = [
  { value: '4', label: 'Product categories', sublabel: 'Leasing, Retail, Insurance, Commercial', source: 'hardcoded' },
  { value: '17', label: 'Customer intents mapped', sublabel: 'Across all products', source: 'hardcoded' },
  { value: '23', label: 'Journey paths analyzed', sublabel: '8 identified as high-friction', source: 'hardcoded' },
  { value: '247', label: 'FAQ pages crawled', sublabel: 'From TFS sitemap', source: 'sqlite' },
  { value: '14', label: 'Entity types in ontology', sublabel: 'Knowledge graph schema', source: 'json' },
  { value: '6', label: 'Customer channels', sublabel: 'Web, mobile, phone, dealer, mail, external', source: 'hardcoded' },
];
