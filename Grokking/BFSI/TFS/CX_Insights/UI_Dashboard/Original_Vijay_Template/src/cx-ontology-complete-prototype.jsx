import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CXOntologyPrototype = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedEntity, setSelectedEntity] = useState('CustomerIntent');
  const [selectedIntent, setSelectedIntent] = useState('lease_return');
  const [storyboardSlide, setStoryboardSlide] = useState(0);

  // Entity Colors
  const entityColors = {
    CustomerIntent: '#3B82F6', ContentAsset: '#8B5CF6', Channel: '#10B981',
    JourneyPath: '#F59E0B', InstructionStep: '#EF4444', Condition: '#EC4899',
    LatencyWindow: '#6366F1', EscalationPath: '#14B8A6', ResponsibleParty: '#F97316',
    ValueLeakage: '#DC2626', OpportunitySignal: '#22C55E', EvidenceAnchor: '#64748B',
    SentimentSignal: '#A855F7'
  };

  const channelColors = { WEB: '#3B82F6', MOBILE: '#8B5CF6', PHONE: '#F59E0B', DEALER: '#EF4444', MAIL: '#6B7280', EXTERNAL: '#EC4899' };

  // ENTITY 1: CustomerIntent
  const customerIntents = {
    lease_return: { id: 'INT_LEASE_RETURN', name: 'Return Leased Vehicle', category: 'LEASE_END', product_context: 'LEASE', volume_signal: 'HIGH', complexity_tier: 'COMPLEX', journey_stage: 'RENEWAL_EXIT', description: 'Customer wants to return their leased vehicle at end of lease term', metrics: { cbi: 42.4, cai: 4, hdi: 62.5 } },
    make_payment: { id: 'INT_MAKE_PAYMENT', name: 'Make a Payment', category: 'PAYMENT', product_context: 'BOTH', volume_signal: 'HIGH', complexity_tier: 'SIMPLE', journey_stage: 'USAGE', description: 'Customer wants to make a one-time or recurring payment', metrics: { cbi: 10.5, cai: 1, hdi: 0 } },
    get_title: { id: 'INT_GET_TITLE', name: 'Get Title After Payoff', category: 'LOAN_END', product_context: 'RETAIL_LOAN', volume_signal: 'MEDIUM', complexity_tier: 'MODERATE', journey_stage: 'RENEWAL_EXIT', description: 'Customer wants to receive vehicle title after paying off loan', metrics: { cbi: 28.5, cai: 3, hdi: 50 } },
    setup_autopay: { id: 'INT_SETUP_AUTOPAY', name: 'Set Up AutoPay', category: 'PAYMENT', product_context: 'BOTH', volume_signal: 'MEDIUM', complexity_tier: 'SIMPLE', journey_stage: 'USAGE', description: 'Customer wants to enroll in automatic recurring payments', metrics: { cbi: 12.0, cai: 1, hdi: 0 } },
    early_termination: { id: 'INT_EARLY_TERM', name: 'Early Lease Termination', category: 'LEASE_END', product_context: 'LEASE', volume_signal: 'LOW', complexity_tier: 'COMPLEX', journey_stage: 'SERVICE', description: 'Customer wants to end lease before maturity date', metrics: { cbi: 38.0, cai: 3, hdi: 75 } },
    account_access: { id: 'INT_ACCOUNT_ACCESS', name: 'Access Online Account', category: 'ACCOUNT', product_context: 'BOTH', volume_signal: 'HIGH', complexity_tier: 'SIMPLE', journey_stage: 'USAGE', description: 'Customer wants to log in or register for online account', metrics: { cbi: 8.0, cai: 1, hdi: 0 } }
  };

  // ENTITY 2: ContentAsset
  const contentAssets = [
    { id: 'CA_LEASE_END_FAQ', type: 'FAQ', url: 'toyotafinancial.com/.../faqs.html', title: 'End of Lease FAQs', questions: 24 },
    { id: 'CA_PAYMENTS_FAQ', type: 'FAQ', url: 'toyotafinancial.com/.../payments.html', title: 'Payments FAQ', questions: 18 },
    { id: 'CA_WAYS_TO_PAY', type: 'PAGE', url: 'toyotafinancial.com/.../ways_to_pay.html', title: 'Ways to Pay', questions: null },
    { id: 'CA_LEASE_GUIDE', type: 'DOCUMENT', url: 'toyotafinancial.com/.../Lease-End_Guide.pdf', title: 'Lease-End Guide', format: 'PDF' },
    { id: 'CA_ODOMETER', type: 'DOCUMENT', url: 'toyotafinancial.com/.../odometer_statement.pdf', title: 'Odometer Statement', format: 'PDF' },
    { id: 'CA_DEALER_LOCATOR', type: 'TOOL', url: 'toyota.com/dealers/', title: 'Dealer Locator', tool_type: 'SEARCH' },
    { id: 'CA_TITLE_FAQ', type: 'FAQ', url: 'toyotafinancial.com/.../title_lien.html', title: 'Title/Lien Release FAQ', questions: 8 },
    { id: 'CA_LOGIN_FAQ', type: 'FAQ', url: 'toyotafinancial.com/.../login_faqs.html', title: 'Login FAQs', questions: 12 }
  ];

  // ENTITY 3: Channel
  const channels = [
    { id: 'CH_WEB', type: 'WEB', name: 'TFS Web Portal', contact: 'toyotafinancial.com', is_offline: false, is_self_service: true, availability: '24/7' },
    { id: 'CH_MOBILE', type: 'MOBILE', name: 'MyTFS Mobile App', contact: 'App Store/Play', is_offline: false, is_self_service: true, availability: '24/7' },
    { id: 'CH_PHONE_MAIN', type: 'PHONE', name: 'Customer Service', contact: '1-800-874-8822', is_offline: true, is_self_service: false, availability: 'Mon-Fri 8am-8pm' },
    { id: 'CH_PHONE_PAYOFF', type: 'PHONE', name: 'Payoff Line', contact: '1-800-286-0652', is_offline: true, is_self_service: false, availability: 'Mon-Fri 8am-8pm' },
    { id: 'CH_DEALER', type: 'DEALER', name: 'Toyota/Lexus Dealer', contact: 'toyota.com/dealers', is_offline: true, is_self_service: false, availability: 'Business hours' },
    { id: 'CH_MAIL', type: 'MAIL', name: 'TFS Mail', contact: 'P.O. Box 94305, Palatine IL', is_offline: true, is_self_service: true, availability: 'N/A' },
    { id: 'CH_AUTOVIN', type: 'EXTERNAL', name: 'AutoVIN Inspection', contact: '1-855-406-9837', is_offline: true, is_self_service: false, availability: 'By appointment' }
  ];

  // ENTITY 4: JourneyPath
  const journeyPaths = {
    lease_return: [
      { id: 'PATH_LR_PRIMARY', path_type: 'PRIMARY', name: 'Standard Return via Originating Dealer', is_digital_contained: false },
      { id: 'PATH_LR_ALT', path_type: 'ALTERNATE', name: 'Return via Non-Originating Dealer', is_digital_contained: false },
      { id: 'PATH_LR_EARLY', path_type: 'EXCEPTION', name: 'Early Termination', is_digital_contained: false },
      { id: 'PATH_LR_PURCHASE', path_type: 'ALTERNATE', name: 'Purchase Leased Vehicle', is_digital_contained: false }
    ],
    make_payment: [
      { id: 'PATH_PAY_ONLINE', path_type: 'PRIMARY', name: 'Pay Online (Web/App)', is_digital_contained: true },
      { id: 'PATH_PAY_PHONE', path_type: 'ALTERNATE', name: 'Pay by Phone', is_digital_contained: false },
      { id: 'PATH_PAY_MAIL', path_type: 'ALTERNATE', name: 'Pay by Mail', is_digital_contained: false }
    ],
    get_title: [
      { id: 'PATH_TITLE_STD', path_type: 'PRIMARY', name: 'Standard Title Release', is_digital_contained: false },
      { id: 'PATH_TITLE_ELEC', path_type: 'ALTERNATE', name: 'Electronic Title (select states)', is_digital_contained: true }
    ]
  };

  // ENTITY 5: InstructionStep
  const instructionSteps = {
    lease_return: [
      { id: 'STEP_LR_01', seq: 1, action: 'VIEW', verb: 'check', object: 'lease maturity date', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Log in to your TFS account and check your lease maturity date' },
      { id: 'STEP_LR_02', seq: 2, action: 'DOWNLOAD', verb: 'download', object: 'Lease-End Guide', channel: 'WEB', is_offline: false, is_manual: false, auth: false, instruction: 'Download and review the Lease-End Guide PDF' },
      { id: 'STEP_LR_03', seq: 3, action: 'SCHEDULE', verb: 'schedule', object: 'pre-inspection', channel: 'PHONE', is_offline: true, is_manual: true, auth: false, instruction: 'Contact dealer or AutoVIN (1-855-406-9837) to schedule pre-inspection', has_condition: true },
      { id: 'STEP_LR_04', seq: 4, action: 'WAIT', verb: 'complete', object: 'inspection', channel: 'DEALER', is_offline: true, is_manual: true, auth: false, instruction: 'Meet inspector for vehicle assessment' },
      { id: 'STEP_LR_05', seq: 5, action: 'VIEW', verb: 'review', object: 'inspection report', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Review condition report online within 2 business days' },
      { id: 'STEP_LR_06', seq: 6, action: 'CONTACT', verb: 'contact', object: 'dealer for turn-in', channel: 'PHONE', is_offline: true, is_manual: true, auth: false, instruction: 'Contact originating dealer to schedule turn-in (30 days before maturity)' },
      { id: 'STEP_LR_07', seq: 7, action: 'BRING', verb: 'bring', object: 'vehicle + items', channel: 'DEALER', is_offline: true, is_manual: true, auth: false, instruction: 'Bring clean vehicle with: Odometer Statement, all keys, manuals, equipment' },
      { id: 'STEP_LR_08', seq: 8, action: 'SIGN', verb: 'sign', object: 'return documents', channel: 'DEALER', is_offline: true, is_manual: true, auth: false, instruction: 'Sign Odometer Disclosure Statement and return documents at dealer' },
      { id: 'STEP_LR_09', seq: 9, action: 'SUBMIT', verb: 'notify', object: 'TFS of return', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Log in to TFS and follow return notification prompts' },
      { id: 'STEP_LR_10', seq: 10, action: 'CANCEL', verb: 'cancel', object: 'auto payments', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Cancel recurring payments through TFS or your bank' }
    ],
    make_payment: [
      { id: 'STEP_PAY_01', seq: 1, action: 'ACCESS', verb: 'log in', object: 'TFS account', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Log in to your TFS online account' },
      { id: 'STEP_PAY_02', seq: 2, action: 'SUBMIT', verb: 'add', object: 'bank account', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Add bank account (routing + account number)' },
      { id: 'STEP_PAY_03', seq: 3, action: 'SUBMIT', verb: 'select', object: 'payment amount', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Choose one-time or recurring, enter amount' },
      { id: 'STEP_PAY_04', seq: 4, action: 'SUBMIT', verb: 'confirm', object: 'payment', channel: 'WEB', is_offline: false, is_manual: false, auth: true, instruction: 'Review and confirm payment' }
    ]
  };

  // ENTITY 6: Condition
  const conditions = [
    { id: 'COND_GEO_HI_AK', type: 'STATE', trigger: 'Customer resides in Hawaii or Alaska', consequence: 'Pre-inspection NOT available', impact: 'HIGH', source: 'Courtesy pre-inspection available to lease customers who do not reside in Hawaii' },
    { id: 'COND_GEO_NH_WI', type: 'STATE', trigger: 'Lease originated in NH or WI', consequence: 'Pre-inspection NOT available', impact: 'HIGH', source: 'whose leases did not originate in New Hampshire or Wisconsin' },
    { id: 'COND_DEALER_ACCEPT', type: 'ELIGIBILITY', trigger: 'Return to non-originating dealer', consequence: 'Must confirm acceptance first', impact: 'HIGH', source: 'Most dealers will process...but we recommend contacting them to confirm' },
    { id: 'COND_ORIG_REQ', type: 'ELIGIBILITY', trigger: 'Vehicle return processing', consequence: 'Originating dealer REQUIRED', impact: 'HIGH', source: 'Your originating Dealer is required to process the vehicle return' },
    { id: 'COND_EARLY_FEE', type: 'FEE', trigger: 'Return before maturity', consequence: 'Early termination fees apply', impact: 'HIGH', source: 'early termination fees may apply' },
    { id: 'COND_SEC_DEP', type: 'ACCOUNT_TYPE', trigger: 'Security deposit on file', consequence: 'Returned via mail after charges', impact: 'LOW', source: 'Security deposit will be returned via check' },
    { id: 'COND_PAY_CUTOFF', type: 'TIME', trigger: 'Payment after 6 PM CST', consequence: 'Posts next business day', impact: 'LOW', source: 'Same day payment may be edited before 6 PM CST' },
    { id: 'COND_BANK_POST', type: 'TIME', trigger: 'Any payment', consequence: '2-3 business days to post', impact: 'MEDIUM', source: 'Please allow 2-3 business days for your bank to post' },
    { id: 'COND_TITLE_STATE', type: 'STATE', trigger: 'Title processing', consequence: 'Varies by state', impact: 'MEDIUM', source: 'Great question - it varies by state' },
    { id: 'COND_NO_CASH', type: 'ELIGIBILITY', trigger: 'Payment method', consequence: 'Cash/credit/debit NOT accepted', impact: 'MEDIUM', source: 'we can\'t process cash, credit, or debit card payments' }
  ];

  // ENTITY 7: LatencyWindow
  const latencyWindows = [
    { id: 'LAT_BANK', desc: 'Bank payment posting', duration: '2-3', unit: 'BUS_DAYS', type: 'POSTING', controllable: false, creates_inquiry: true, source: 'Please allow 2-3 business days' },
    { id: 'LAT_INSPECT', desc: 'Inspection report', duration: '1-2', unit: 'BUS_DAYS', type: 'PROCESSING', controllable: true, creates_inquiry: false, source: 'Within two business days...report will be available' },
    { id: 'LAT_SEC_DEP', desc: 'Security deposit mail', duration: '7-14', unit: 'CAL_DAYS', type: 'MAILING', controllable: false, creates_inquiry: true, source: 'Security deposit will be returned via check' },
    { id: 'LAT_LIEN', desc: 'Title/lien release', duration: '7-14', unit: 'CAL_DAYS', type: 'MAILING', controllable: false, creates_inquiry: true, source: 'Lien release within 7-14 days' },
    { id: 'LAT_INVOICE', desc: 'Lease-end invoice', duration: '60-120', unit: 'CAL_DAYS', type: 'PROCESSING', controllable: true, creates_inquiry: true, source: 'end-of-lease invoice about 60-120 days after return' },
    { id: 'LAT_AUTOCHEQUE', desc: 'AutoCheque enrollment', duration: '1-2', unit: 'BILL_CYCLES', type: 'PROCESSING', controllable: true, creates_inquiry: false, source: 'After receiving...we will process your enrollment' }
  ];

  // ENTITY 8: EscalationPath
  const escalationPaths = [
    { id: 'ESC_MAIN', trigger: 'General questions', dest: 'Customer Service', phone: '1-800-874-8822', hours: 'Mon-Fri 8am-8pm', severity: 'INFORMATIONAL', avoidable: true, cue: 'call us at' },
    { id: 'ESC_PAYOFF', trigger: 'Payoff/early termination', dest: 'Payoff Line', phone: '1-800-286-0652', hours: 'Mon-Fri 8am-8pm', severity: 'REQUIRED', avoidable: false, cue: 'contact TFS at' },
    { id: 'ESC_DEALER', trigger: 'Lease-end, vehicle return', dest: 'Dealer', phone: 'toyota.com/dealers', hours: 'Business hours', severity: 'INFORMATIONAL', avoidable: true, cue: 'give your dealer a call' },
    { id: 'ESC_VSA', trigger: 'Vehicle Service Agreement', dest: 'VSA Claims', phone: '1-800-445-8154', hours: 'Mon-Fri 8am-5pm', severity: 'REQUIRED', avoidable: false, cue: 'call us with inquiries' },
    { id: 'ESC_AUTOVIN', trigger: 'Pre-inspection', dest: 'AutoVIN', phone: '1-855-406-9837', hours: 'By appointment', severity: 'RECOMMENDED', avoidable: true, cue: 'contact AutoVIN' }
  ];

  // ENTITY 9: ResponsibleParty
  const responsibleParties = [
    { id: 'RP_CUSTOMER', name: 'Customer', type: 'CUSTOMER', role: 'Primary actor', controllability: 'HIGH', is_human: true },
    { id: 'RP_TFS_DIG', name: 'TFS Digital', type: 'INTERNAL', role: 'Web/mobile platform', controllability: 'HIGH', is_human: false },
    { id: 'RP_TFS_CC', name: 'TFS Contact Center', type: 'INTERNAL', role: 'Phone support', controllability: 'HIGH', is_human: true },
    { id: 'RP_TFS_OPS', name: 'TFS Back Office', type: 'INTERNAL', role: 'Processing', controllability: 'HIGH', is_human: true },
    { id: 'RP_DEALER_O', name: 'Originating Dealer', type: 'EXTERNAL', role: 'Required for returns', controllability: 'MEDIUM', is_human: true },
    { id: 'RP_DEALER_X', name: 'Other Dealer', type: 'EXTERNAL', role: 'May decline returns', controllability: 'LOW', is_human: true },
    { id: 'RP_AUTOVIN', name: 'AutoVIN', type: 'EXTERNAL', role: 'Third-party inspection', controllability: 'LOW', is_human: true },
    { id: 'RP_DMV', name: 'State DMV', type: 'EXTERNAL', role: 'Title processing', controllability: 'LOW', is_human: true },
    { id: 'RP_BANK', name: 'Customer Bank', type: 'EXTERNAL', role: 'Payment processing', controllability: 'LOW', is_human: false }
  ];

  // ENTITY 10: ValueLeakage
  const valueLeakages = [
    { id: 'VL_PAY_INQ', type: 'COST', driver: '2-3 day posting creates status calls', proxy: 'Payment call volume', magnitude: 'MEDIUM' },
    { id: 'VL_TITLE_INQ', type: 'COST', driver: '7-14 day wait creates title calls', proxy: 'Title inquiry volume', magnitude: 'MEDIUM' },
    { id: 'VL_LEASE_TIME', type: 'TIME', driver: '90-day process with manual steps', proxy: 'Days to closure', magnitude: 'HIGH' },
    { id: 'VL_DEALER_RISK', type: 'RISK', driver: 'Dealer discretion creates disputes', proxy: 'Dispute rate', magnitude: 'MEDIUM' },
    { id: 'VL_OFFLINE', type: 'COST', driver: 'Phone/dealer for routine tasks', proxy: 'Avoidable contacts', magnitude: 'HIGH' },
    { id: 'VL_GEO', type: 'RISK', driver: 'HI/AK/NH/WI surprise charges', proxy: 'Excluded state disputes', magnitude: 'LOW' },
    { id: 'VL_APP', type: 'REPUTATION', driver: 'Negative reviews on payment/login', proxy: 'App rating', magnitude: 'MEDIUM' },
    { id: 'VL_CONTEXT', type: 'TIME', driver: 'Channel switching loses context', proxy: 'Handle time', magnitude: 'MEDIUM' }
  ];

  // ENTITY 11: OpportunitySignal
  const opportunitySignals = [
    { id: 'OPP_ORCH', type: 'ORCHESTRATION', desc: 'Customer coordinates 4+ parties', readiness: 'HIGH', blockers: ['Dealer API', 'AutoVIN API'], theme: 'Customer-as-Integrator' },
    { id: 'OPP_PROACT', type: 'PROACTIVE', desc: 'Milestone comms reduce inquiries', readiness: 'MEDIUM', blockers: ['Real-time data'], theme: 'Unmanaged Latency' },
    { id: 'OPP_SCHED', type: 'SELF_SERVICE', desc: 'Online scheduling for inspection/turn-in', readiness: 'MEDIUM', blockers: ['Dealer calendars'], theme: 'Offline-First Design' },
    { id: 'OPP_PAY_ST', type: 'PROACTIVE', desc: 'Real-time payment status', readiness: 'HIGH', blockers: ['Bank integration'], theme: 'Unmanaged Latency' },
    { id: 'OPP_TITLE', type: 'PROACTIVE', desc: 'Title tracking + notifications', readiness: 'MEDIUM', blockers: ['Mail tracking', 'DMV API'], theme: 'Unmanaged Latency' },
    { id: 'OPP_POLICY', type: 'AUTOMATION', desc: 'Automate complex conditions', readiness: 'LOW', blockers: ['Policy engine'], theme: 'Humans as Policy Engines' }
  ];

  // ENTITY 12: EvidenceAnchor
  const evidenceAnchors = [
    { id: 'EV_01', url: 'toyotafinancial.com/.../faqs.html', type: 'FAQ', text: 'The vehicle must be returned to an authorized Toyota or Lexus Dealer', supports: ['STEP_LR_07'] },
    { id: 'EV_02', url: 'toyotafinancial.com/.../faqs.html', type: 'FAQ', text: 'Courtesy pre-inspection available to lease customers who do not reside in Hawaii or whose leases did not originate in New Hampshire or Wisconsin', supports: ['COND_GEO_HI_AK', 'COND_GEO_NH_WI'] },
    { id: 'EV_03', url: 'toyotafinancial.com/.../payments.html', type: 'FAQ', text: 'Unfortunately, we can\'t process cash, credit, or debit card payments', supports: ['COND_NO_CASH'] },
    { id: 'EV_04', url: 'toyotafinancial.com/.../ways_to_pay.html', type: 'PAGE', text: 'Please allow 2-3 business days for your bank to post the payment', supports: ['LAT_BANK'] },
    { id: 'EV_05', url: 'toyotafinancial.com/.../Invoice.html', type: 'PAGE', text: 'expect to see the end-of-lease invoice about 60-120 days after you return', supports: ['LAT_INVOICE'] }
  ];

  // ENTITY 13: SentimentSignal
  const sentimentSignals = [
    { id: 'SENT_PAY', platform: 'APP_STORE', theme: 'Payment Failures', polarity: 'NEGATIVE', count: 78, samples: ['Charged twice', 'Says failed but went through'] },
    { id: 'SENT_LOGIN', platform: 'APP_STORE', theme: 'Login Problems', polarity: 'NEGATIVE', count: 124, samples: ['Auth code every time', 'Logs me out'] },
    { id: 'SENT_LEASE', platform: 'TRUSTPILOT', theme: 'Lease-End Complexity', polarity: 'NEGATIVE', count: 45, samples: ['No one knew which dealer', 'Surprise charges'] },
    { id: 'SENT_TITLE', platform: 'BBB', theme: 'Title Delays', polarity: 'NEGATIVE', count: 32, samples: ['2 months, no title', 'Called 3 times'] },
    { id: 'SENT_POS', platform: 'GOOGLE_PLAY', theme: 'Easy Payment', polarity: 'POSITIVE', count: 156, samples: ['Love quick pay', 'Easy autopay'] }
  ];

  // Metrics
  const metricsBreakdown = {
    lease_return: { steps: 10, offline: 6, manual: 6, conditions: 4, switches: 4, external: 4, cbi: 42.4, cai: 4, hdi: 60, formula: '10+(4×1.5)+(6×2.5)+(4×2)+(4×2)=42' },
    make_payment: { steps: 4, offline: 0, manual: 0, conditions: 2, switches: 0, external: 1, cbi: 10.5, cai: 1, hdi: 0, formula: '4+(2×1.5)+(0)+(0)+(1×2)=9' },
    get_title: { steps: 4, offline: 3, manual: 1, conditions: 2, switches: 2, external: 2, cbi: 28.5, cai: 3, hdi: 25, formula: '4+(2×1.5)+(3×2.5)+(2×2)+(2×2)=22' }
  };

  // Root Causes
  const rootCauses = [
    { id: 'RC1', name: 'Offline Pathways First-Class', severity: 'HIGH', evidence: ['62.5% offline steps', 'No digital lease-end path'] },
    { id: 'RC2', name: 'External Dependencies', severity: 'HIGH', evidence: ['4 external parties', 'Dealer discretion'] },
    { id: 'RC3', name: 'Channel Switching', severity: 'MEDIUM', evidence: ['4 switches', 'No context transfer'] },
    { id: 'RC4', name: 'Unmanaged Latency', severity: 'MEDIUM', evidence: ['2-3 day posting', '60-120 day invoice'] },
    { id: 'RC5', name: 'Humans as Policy Engines', severity: 'LOW', evidence: ['Geographic rules', 'State variations'] }
  ];

  // All entity data for explorer
  const allEntities = {
    CustomerIntent: { data: Object.values(customerIntents), desc: 'What customers are trying to accomplish' },
    ContentAsset: { data: contentAssets, desc: 'Source content that instructs customers' },
    Channel: { data: channels, desc: 'How customers interact with TFS' },
    JourneyPath: { data: Object.values(journeyPaths).flat(), desc: 'Routes to accomplish an intent' },
    InstructionStep: { data: Object.values(instructionSteps).flat(), desc: 'Single instruction given to customer' },
    Condition: { data: conditions, desc: 'Branching logic and exceptions' },
    LatencyWindow: { data: latencyWindows, desc: 'Wait times customers experience' },
    EscalationPath: { data: escalationPaths, desc: 'Routes to human assistance' },
    ResponsibleParty: { data: responsibleParties, desc: 'Who owns each step' },
    ValueLeakage: { data: valueLeakages, desc: 'Business impact of friction' },
    OpportunitySignal: { data: opportunitySignals, desc: 'Improvement potential' },
    EvidenceAnchor: { data: evidenceAnchors, desc: 'Proof from official sources' },
    SentimentSignal: { data: sentimentSignals, desc: 'External validation from reviews' }
  };

  // RENDER: Home
  const renderHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">CX Knowledge Graph</h1>
        <p className="text-lg opacity-90">Complete Ontology with TFS Examples</p>
        <div className="mt-4 flex gap-3 text-sm flex-wrap">
          <span className="bg-white/20 px-3 py-1 rounded-full">13 Entity Types</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">6 Intents</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">10 Conditions</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">6 Latencies</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-bold mb-4">The 13 Building Blocks</h2>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(entityColors).map(([entity, color]) => (
            <button key={entity} onClick={() => { setSelectedEntity(entity); setActiveSection('entities'); }}
              className="p-3 rounded-lg text-left hover:shadow-md transition-all text-sm font-medium"
              style={{ backgroundColor: `${color}15`, color: color }}>
              {entity}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(customerIntents).slice(0, 3).map(([k, v]) => (
          <div key={k} className="bg-white p-4 rounded-xl border">
            <h3 className="font-bold mb-2">{v.name}</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className={`p-2 rounded text-center ${v.metrics.cbi < 15 ? 'bg-green-100 text-green-700' : v.metrics.cbi < 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                <div className="text-lg font-bold">{v.metrics.cbi}</div><div className="text-xs">CBI</div>
              </div>
              <div className={`p-2 rounded text-center ${v.metrics.cai <= 1 ? 'bg-green-100 text-green-700' : v.metrics.cai <= 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                <div className="text-lg font-bold">{v.metrics.cai}</div><div className="text-xs">CAI</div>
              </div>
              <div className={`p-2 rounded text-center ${v.metrics.hdi === 0 ? 'bg-green-100 text-green-700' : v.metrics.hdi < 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                <div className="text-lg font-bold">{v.metrics.hdi}%</div><div className="text-xs">HDI</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // RENDER: Entities
  const renderEntities = () => {
    const current = allEntities[selectedEntity];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Entity Explorer</h2>
          <p className="opacity-90">All 13 entities with TFS examples</p>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Object.keys(entityColors).map((e) => (
            <button key={e} onClick={() => setSelectedEntity(e)}
              className={`p-2 rounded text-xs font-medium transition-all ${selectedEntity === e ? 'text-white ring-2' : ''}`}
              style={{ backgroundColor: selectedEntity === e ? entityColors[e] : `${entityColors[e]}20`, color: selectedEntity === e ? 'white' : entityColors[e] }}>
              {e.replace(/([A-Z])/g, ' $1').trim().split(' ')[0]}
            </button>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: entityColors[selectedEntity] }}></div>
            <h3 className="text-xl font-bold">{selectedEntity}</h3>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">{current.data.length} examples</span>
          </div>
          <p className="text-gray-600 mb-4">{current.desc}</p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {current.data.map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border text-sm">
                <pre className="overflow-x-auto whitespace-pre-wrap">{JSON.stringify(item, null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // RENDER: Journeys
  const renderJourneys = () => {
    const intent = customerIntents[selectedIntent];
    const paths = journeyPaths[selectedIntent] || [];
    const steps = instructionSteps[selectedIntent] || [];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Journey Explorer</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(customerIntents).map(([k, v]) => (
            <button key={k} onClick={() => setSelectedIntent(k)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedIntent === k ? 'bg-green-600 text-white' : 'bg-white border'}`}>
              {v.name}
            </button>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="font-mono text-xs text-gray-500">{intent.id}</div>
              <h3 className="text-xl font-bold">{intent.name}</h3>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{intent.category}</span>
                <span className={`px-2 py-1 rounded text-xs ${intent.complexity_tier === 'COMPLEX' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{intent.complexity_tier}</span>
              </div>
            </div>
            <div className="flex gap-3 text-center">
              <div><div className="text-2xl font-bold text-blue-600">{intent.metrics.cbi}</div><div className="text-xs">CBI</div></div>
              <div><div className="text-2xl font-bold text-orange-600">{intent.metrics.cai}</div><div className="text-xs">CAI</div></div>
              <div><div className="text-2xl font-bold text-red-600">{intent.metrics.hdi}%</div><div className="text-xs">HDI</div></div>
            </div>
          </div>
        </div>
        {paths.length > 0 && (
          <div className="bg-white p-6 rounded-xl border">
            <h4 className="font-semibold mb-3">Journey Paths</h4>
            <div className="grid grid-cols-2 gap-2">
              {paths.map((p) => (
                <div key={p.id} className={`p-3 rounded-lg border-2 ${p.path_type === 'PRIMARY' ? 'border-green-500 bg-green-50' : p.path_type === 'ALTERNATE' ? 'border-blue-500 bg-blue-50' : 'border-orange-500 bg-orange-50'}`}>
                  <span className={`px-2 py-0.5 rounded text-xs ${p.path_type === 'PRIMARY' ? 'bg-green-200 text-green-800' : p.path_type === 'ALTERNATE' ? 'bg-blue-200 text-blue-800' : 'bg-orange-200 text-orange-800'}`}>{p.path_type}</span>
                  <div className="font-medium text-sm mt-1">{p.name}</div>
                  <div className="text-xs mt-1">{p.is_digital_contained ? '✓ Digital' : '✗ Offline Required'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {steps.length > 0 && (
          <div className="bg-white p-6 rounded-xl border">
            <h4 className="font-semibold mb-3">Steps ({steps.length})</h4>
            <div className="space-y-2">
              {steps.map((s) => (
                <div key={s.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{s.seq}</div>
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <span className="px-2 py-0.5 bg-gray-200 rounded text-xs">{s.action}</span>
                      <span className="font-medium text-sm">{s.verb} {s.object}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{s.instruction}</div>
                    <div className="flex gap-1 mt-2">
                      <span className="px-2 py-0.5 rounded text-xs text-white" style={{ backgroundColor: channelColors[s.channel] }}>{s.channel}</span>
                      {s.is_offline && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Offline</span>}
                      {s.is_manual && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">Manual</span>}
                      {s.auth && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Auth</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // RENDER: Metrics
  const renderMetrics = () => {
    const cbiData = Object.entries(customerIntents).map(([k, v]) => ({
      name: v.name.split(' ').slice(0, 2).join(' '),
      CBI: v.metrics.cbi,
      fill: v.metrics.cbi < 15 ? '#22C55E' : v.metrics.cbi < 30 ? '#F59E0B' : '#EF4444'
    }));
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Metrics Dashboard</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-l-4 border-l-blue-500">
            <div className="text-2xl font-bold text-blue-600">CBI</div>
            <div className="font-medium">Customer Burden Index</div>
            <div className="text-xs text-gray-500 mt-2">steps + conditions×1.5 + offline×2.5 + switches×2 + external×2</div>
            <div className="text-xs mt-2"><span className="text-green-600">Good:&lt;15</span> | <span className="text-yellow-600">Med:15-30</span> | <span className="text-red-600">Bad:&gt;30</span></div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-l-4 border-l-orange-500">
            <div className="text-2xl font-bold text-orange-600">CAI</div>
            <div className="font-medium">Customer-as-Integrator</div>
            <div className="text-xs text-gray-500 mt-2">COUNT(ResponsibleParty WHERE type≠CUSTOMER)</div>
            <div className="text-xs mt-2"><span className="text-green-600">Good:1</span> | <span className="text-yellow-600">Med:2</span> | <span className="text-red-600">Bad:3+</span></div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-l-4 border-l-red-500">
            <div className="text-2xl font-bold text-red-600">HDI</div>
            <div className="font-medium">Human Dependency Index</div>
            <div className="text-xs text-gray-500 mt-2">(manual_steps / total_steps) × 100</div>
            <div className="text-xs mt-2"><span className="text-green-600">Good:0%</span> | <span className="text-yellow-600">Med:&lt;50%</span> | <span className="text-red-600">Bad:&gt;50%</span></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">CBI by Intent</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cbiData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 50]} />
              <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="CBI" radius={[0, 4, 4, 0]}>{cbiData.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">Breakdown</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Intent</th><th className="text-center">Steps</th><th className="text-center">Offline</th><th className="text-center">Cond</th><th className="text-center">CBI</th><th className="text-center">CAI</th><th className="text-center">HDI</th></tr></thead>
            <tbody>
              {Object.entries(metricsBreakdown).map(([k, m]) => (
                <tr key={k} className="border-b">
                  <td className="py-2">{customerIntents[k].name}</td>
                  <td className="text-center">{m.steps}</td>
                  <td className="text-center">{m.offline}</td>
                  <td className="text-center">{m.conditions}</td>
                  <td className="text-center"><span className={`px-2 py-1 rounded text-xs ${m.cbi < 15 ? 'bg-green-100 text-green-700' : m.cbi < 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{m.cbi}</span></td>
                  <td className="text-center">{m.cai}</td>
                  <td className="text-center">{m.hdi}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">Root Cause Themes</h3>
          <div className="space-y-2">
            {rootCauses.map((rc) => (
              <div key={rc.id} className="p-3 bg-gray-50 rounded-lg flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 ${rc.severity === 'HIGH' ? 'bg-red-500' : rc.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <div>
                  <div className="font-medium">{rc.name}</div>
                  <div className="text-xs text-gray-500">{rc.evidence.join(' • ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // RENDER: Storyboard
  const renderStoryboard = () => {
    const slides = [
      { title: 'What Customers Want', subtitle: 'Top Intents', content: <div className="space-y-2">{Object.values(customerIntents).map((v, i) => <div key={v.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded"><span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">{i + 1}</span><span className="flex-1">{v.name}</span><span className={`px-2 py-1 rounded text-xs ${v.volume_signal === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{v.volume_signal}</span></div>)}</div> },
      { title: 'Where They Get Stuck', subtitle: 'Friction Hotspots', content: <div className="grid grid-cols-2 gap-3"><div className="p-4 bg-red-50 rounded-lg"><div className="text-3xl font-bold text-red-600">4</div><div className="text-sm">Geographic Restrictions</div></div><div className="p-4 bg-orange-50 rounded-lg"><div className="text-3xl font-bold text-orange-600">62.5%</div><div className="text-sm">Offline Steps</div></div><div className="p-4 bg-yellow-50 rounded-lg"><div className="text-3xl font-bold text-yellow-600">4</div><div className="text-sm">External Parties</div></div><div className="p-4 bg-purple-50 rounded-lg"><div className="text-3xl font-bold text-purple-600">120</div><div className="text-sm">Days Max Latency</div></div></div> },
      { title: 'Why It Happens', subtitle: 'Root Causes', content: <div className="space-y-2">{rootCauses.map((rc) => <div key={rc.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded"><div className={`w-3 h-3 rounded-full mt-1 ${rc.severity === 'HIGH' ? 'bg-red-500' : rc.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`}></div><div><div className="font-medium text-sm">{rc.name}</div><div className="text-xs text-gray-500">{rc.evidence[0]}</div></div></div>)}</div> },
      { title: 'Business Impact', subtitle: 'Value Leakage', content: <div className="grid grid-cols-2 gap-3">{valueLeakages.slice(0, 4).map((v) => <div key={v.id} className={`p-3 rounded-lg border-l-4 ${v.type === 'COST' ? 'bg-red-50 border-red-500' : v.type === 'TIME' ? 'bg-orange-50 border-orange-500' : v.type === 'RISK' ? 'bg-yellow-50 border-yellow-500' : 'bg-purple-50 border-purple-500'}`}><div className="font-medium text-sm">{v.type}</div><div className="text-xs text-gray-600">{v.driver}</div></div>)}</div> },
      { title: 'Top Hotspots', subtitle: 'Ranked by CBI', content: <table className="w-full text-sm"><thead><tr className="border-b bg-gray-100"><th className="py-2 px-2 text-left">Rank</th><th className="py-2 px-2 text-left">Intent</th><th className="py-2 px-2 text-center">CBI</th><th className="py-2 px-2 text-center">CAI</th><th className="py-2 px-2 text-center">HDI</th></tr></thead><tbody>{Object.entries(customerIntents).sort((a, b) => b[1].metrics.cbi - a[1].metrics.cbi).slice(0, 3).map(([k, v], i) => <tr key={k} className={`border-b ${i === 0 ? 'bg-red-50' : i === 1 ? 'bg-orange-50' : 'bg-yellow-50'}`}><td className="py-2 px-2">{['🥇', '🥈', '🥉'][i]}</td><td className="py-2 px-2">{v.name}</td><td className="py-2 px-2 text-center"><span className="px-2 py-1 bg-red-200 rounded text-xs">{v.metrics.cbi}</span></td><td className="py-2 px-2 text-center">{v.metrics.cai}</td><td className="py-2 px-2 text-center">{v.metrics.hdi}%</td></tr>)}</tbody></table> }
    ];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Storyboard</h2>
          <p className="opacity-90">5 slides for leadership</p>
        </div>
        <div className="flex gap-2">{slides.map((_, i) => <button key={i} onClick={() => setStoryboardSlide(i)} className={`px-4 py-2 rounded-lg text-sm ${storyboardSlide === i ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>Slide {i + 1}</button>)}</div>
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="bg-gray-900 text-white p-4">
            <div className="text-xs opacity-60">Slide {storyboardSlide + 1}/{slides.length}</div>
            <h3 className="text-xl font-bold">{slides[storyboardSlide].title}</h3>
            <p className="opacity-80 text-sm">{slides[storyboardSlide].subtitle}</p>
          </div>
          <div className="p-4">{slides[storyboardSlide].content}</div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setStoryboardSlide(Math.max(0, storyboardSlide - 1))} disabled={storyboardSlide === 0} className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50">← Prev</button>
          <button onClick={() => setStoryboardSlide(Math.min(slides.length - 1, storyboardSlide + 1))} disabled={storyboardSlide === slides.length - 1} className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50">Next →</button>
        </div>
      </div>
    );
  };

  // RENDER: Data Model
  const renderDataModel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold">Data Model</h2>
        <p className="opacity-90">Schemas & queries for developers</p>
      </div>
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-semibold mb-3">CustomerIntent Schema</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">{`{
  "id": "INT_LEASE_RETURN",
  "name": "Return Leased Vehicle",
  "category": "LEASE_END",        // PAYMENT | LEASE_END | ACCOUNT
  "product_context": "LEASE",     // LEASE | RETAIL_LOAN | BOTH
  "volume_signal": "HIGH",        // HIGH | MEDIUM | LOW
  "complexity_tier": "COMPLEX",   // SIMPLE | MODERATE | COMPLEX
  "journey_stage": "RENEWAL_EXIT" // USAGE | SERVICE | RENEWAL_EXIT
}`}</pre>
      </div>
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-semibold mb-3">InstructionStep Schema</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">{`{
  "step_id": "STEP_LR_03",
  "action_type": "SCHEDULE",  // ACCESS|VIEW|DOWNLOAD|CONTACT|SCHEDULE|SUBMIT|BRING|SIGN|CANCEL|WAIT
  "verb": "schedule",
  "object": "pre-inspection",
  "sequence": 3,
  "channel_ref": "CH_PHONE",
  "requires_auth": false,
  "is_offline": true,
  "is_manual": true
}`}</pre>
      </div>
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-semibold mb-3">Cypher: Calculate CBI</h3>
        <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-xs overflow-x-auto">{`MATCH (i:CustomerIntent)-[:HAS_PATH]->(p:JourneyPath {path_type:'PRIMARY'})-[:HAS_STEP]->(s:InstructionStep)
OPTIONAL MATCH (s)-[:HAS_CONDITION]->(c:Condition)
WITH i, COUNT(DISTINCT s) AS steps, COUNT(DISTINCT c) AS conditions,
     SUM(CASE WHEN s.is_offline THEN 1 ELSE 0 END) AS offline
RETURN i.name, (steps + conditions*1.5 + offline*2.5) AS CBI
ORDER BY CBI DESC`}</pre>
      </div>
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-semibold mb-3">Relationship Structure</h3>
        <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg text-xs overflow-x-auto">{`CustomerIntent ──[HAS_ASSET]──▶ ContentAsset
                                    │
                              [EXPRESSES_PATH]
                                    ▼
                              JourneyPath ──[HAS_STEP]──▶ InstructionStep
                                                              │
                                              ┌───────────────┼───────────────┐
                                              ▼               ▼               ▼
                                          Channel        Condition      ResponsibleParty
                                                              │
                                                        [CAUSES]
                                                              ▼
                                                        ValueLeakage`}</pre>
      </div>
    </div>
  );

  // MAIN
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">CX</div>
            <div><div className="font-bold">CX Knowledge Graph</div><div className="text-xs text-gray-500">Complete Ontology</div></div>
          </div>
          <div className="flex gap-2">
            {[{ id: 'home', icon: '🏠', label: 'Home' }, { id: 'entities', icon: '🧩', label: 'Entities' }, { id: 'journeys', icon: '🗺️', label: 'Journeys' }, { id: 'metrics', icon: '📊', label: 'Metrics' }, { id: 'storyboard', icon: '📈', label: 'Storyboard' }, { id: 'datamodel', icon: '💻', label: 'Data' }].map((n) => (
              <button key={n.id} onClick={() => setActiveSection(n.id)} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${activeSection === n.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <span>{n.icon}</span><span className="hidden md:inline">{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'entities' && renderEntities()}
        {activeSection === 'journeys' && renderJourneys()}
        {activeSection === 'metrics' && renderMetrics()}
        {activeSection === 'storyboard' && renderStoryboard()}
        {activeSection === 'datamodel' && renderDataModel()}
      </div>
      <div className="bg-white border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between text-sm text-gray-500">
          <span>CX Knowledge Graph v1.0</span>
          <span>13 Entities • 6 Intents • 10 Conditions • 6 Latencies</span>
        </div>
      </div>
    </div>
  );
};

export default CXOntologyPrototype;
