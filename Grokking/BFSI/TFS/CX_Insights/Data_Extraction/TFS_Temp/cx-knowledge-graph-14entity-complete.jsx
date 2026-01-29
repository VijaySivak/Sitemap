import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// ============================================================
// CX KNOWLEDGE GRAPH - 14-ENTITY ONTOLOGY
// Product entity as anchor for product-specific journeys
// TFS examples from official sources, sentiment from external reviews
// ============================================================

const CXKnowledgeGraph = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedEntity, setSelectedEntity] = useState('Product');
  const [selectedIntent, setSelectedIntent] = useState('lease_return');
  const [selectedProduct, setSelectedProduct] = useState('PROD_LEASE');
  const [storyboardSlide, setStoryboardSlide] = useState(0);

  // Colors
  const entityColors = {
    Product: '#0EA5E9', CustomerIntent: '#3B82F6', ContentAsset: '#8B5CF6', Channel: '#10B981',
    JourneyPath: '#F59E0B', InstructionStep: '#EF4444', Condition: '#EC4899', LatencyWindow: '#6366F1',
    EscalationPath: '#14B8A6', ResponsibleParty: '#F97316', ValueLeakage: '#DC2626',
    OpportunitySignal: '#22C55E', EvidenceAnchor: '#64748B', SentimentSignal: '#A855F7'
  };
  const channelColors = { WEB: '#3B82F6', MOBILE: '#8B5CF6', PHONE: '#F59E0B', DEALER: '#EF4444', MAIL: '#6B7280', EXTERNAL: '#EC4899' };

  // ============================================================
  // ENTITY 1: PRODUCT (NEW!) - Anchor entity
  // ============================================================
  const products = {
    PROD_LEASE: { id: 'PROD_LEASE', name: 'Vehicle Lease', category: 'FINANCING', description: 'Lease financing through Toyota Lease Trust', complexity: 'HIGH', support_phone: '1-800-874-8822', lifecycle_stages: ['ORIGINATION', 'USAGE', 'RENEWAL_EXIT'], key_features: ['Fixed payments', 'Mileage allowance', 'Wear & use guidelines'] },
    PROD_RETAIL: { id: 'PROD_RETAIL', name: 'Retail Auto Loan', category: 'FINANCING', description: 'Retail installment financing through TMCC', complexity: 'MEDIUM', support_phone: '1-800-874-8822', lifecycle_stages: ['ORIGINATION', 'USAGE', 'RENEWAL_EXIT'], key_features: ['Own the vehicle', 'Build equity', 'Title at payoff'] },
    PROD_VSA: { id: 'PROD_VSA', name: 'Vehicle Service Agreement', category: 'PROTECTION', description: 'Extended mechanical breakdown protection', complexity: 'MEDIUM', support_phone: '1-800-228-8559', lifecycle_stages: ['ORIGINATION', 'USAGE'], key_features: ['Platinum/Gold/Powertrain plans', '$0 or $100 deductible', '24/7 roadside'] },
    PROD_GAP: { id: 'PROD_GAP', name: 'Guaranteed Auto Protection', category: 'PROTECTION', description: 'Covers gap between insurance and loan balance', complexity: 'LOW', support_phone: '1-800-255-8713', lifecycle_stages: ['ORIGINATION', 'USAGE'], key_features: ['Total loss coverage', 'Up to $1000 deductible', 'Purchase-time only'] },
    PROD_EWU: { id: 'PROD_EWU', name: 'Excess Wear & Use Protection', category: 'PROTECTION', description: 'Covers excess wear charges at lease end', complexity: 'LOW', support_phone: '1-800-874-8822', lifecycle_stages: ['ORIGINATION', 'USAGE', 'RENEWAL_EXIT'], key_features: ['Up to $7,500 coverage', 'Lease-only'] },
    PROD_TWP: { id: 'PROD_TWP', name: 'Tire & Wheel Protection', category: 'PROTECTION', description: 'Road hazard coverage for tires/wheels', complexity: 'LOW', support_phone: '1-800-228-8559', lifecycle_stages: ['ORIGINATION', 'USAGE'], key_features: ['Road hazard', 'No deductible option'] }
  };

  // ============================================================
  // ENTITY 2: CustomerIntent - Linked to products
  // ============================================================
  const customerIntents = {
    lease_return: { id: 'INT_LEASE_RETURN', name: 'Return Leased Vehicle', category: 'LEASE_END', product_refs: ['PROD_LEASE'], volume: 'HIGH', complexity: 'COMPLEX', stage: 'RENEWAL_EXIT', description: 'Return vehicle at lease end', metrics: { cbi: 42.4, cai: 4, hdi: 60 } },
    lease_purchase: { id: 'INT_LEASE_PURCHASE', name: 'Purchase Leased Vehicle', category: 'LEASE_END', product_refs: ['PROD_LEASE'], volume: 'MEDIUM', complexity: 'MODERATE', stage: 'RENEWAL_EXIT', description: 'Buy vehicle at lease end', metrics: { cbi: 25.0, cai: 2, hdi: 50 } },
    early_term: { id: 'INT_EARLY_TERM', name: 'Early Lease Termination', category: 'LEASE_END', product_refs: ['PROD_LEASE'], volume: 'LOW', complexity: 'COMPLEX', stage: 'SERVICE', description: 'End lease before maturity', metrics: { cbi: 38.0, cai: 3, hdi: 75 } },
    make_payment: { id: 'INT_MAKE_PAYMENT', name: 'Make a Payment', category: 'PAYMENT', product_refs: ['PROD_LEASE', 'PROD_RETAIL'], volume: 'HIGH', complexity: 'SIMPLE', stage: 'USAGE', description: 'Make one-time or recurring payment', metrics: { cbi: 10.5, cai: 1, hdi: 0 } },
    setup_autopay: { id: 'INT_SETUP_AUTOPAY', name: 'Set Up AutoPay', category: 'PAYMENT', product_refs: ['PROD_LEASE', 'PROD_RETAIL'], volume: 'MEDIUM', complexity: 'SIMPLE', stage: 'USAGE', description: 'Enroll in automatic payments', metrics: { cbi: 12.0, cai: 1, hdi: 0 } },
    get_title: { id: 'INT_GET_TITLE', name: 'Get Title After Payoff', category: 'LOAN_END', product_refs: ['PROD_RETAIL'], volume: 'MEDIUM', complexity: 'MODERATE', stage: 'RENEWAL_EXIT', description: 'Receive title after loan payoff', metrics: { cbi: 28.5, cai: 3, hdi: 50 } },
    account_access: { id: 'INT_ACCOUNT_ACCESS', name: 'Access Online Account', category: 'ACCOUNT', product_refs: ['PROD_LEASE', 'PROD_RETAIL', 'PROD_VSA'], volume: 'HIGH', complexity: 'SIMPLE', stage: 'USAGE', description: 'Log in or register online', metrics: { cbi: 8.0, cai: 1, hdi: 0 } },
    file_vsa_claim: { id: 'INT_VSA_CLAIM', name: 'File VSA Claim', category: 'CLAIMS', product_refs: ['PROD_VSA'], volume: 'MEDIUM', complexity: 'MODERATE', stage: 'USAGE', description: 'Submit mechanical repair claim', metrics: { cbi: 22.0, cai: 2, hdi: 50 } },
    file_gap_claim: { id: 'INT_GAP_CLAIM', name: 'File GAP Claim', category: 'CLAIMS', product_refs: ['PROD_GAP'], volume: 'LOW', complexity: 'COMPLEX', stage: 'USAGE', description: 'Submit GAP claim after total loss', metrics: { cbi: 35.0, cai: 3, hdi: 75 } },
    check_coverage: { id: 'INT_CHECK_COVERAGE', name: 'Check VSA Coverage', category: 'INQUIRY', product_refs: ['PROD_VSA'], volume: 'MEDIUM', complexity: 'SIMPLE', stage: 'USAGE', description: 'Verify what repairs are covered', metrics: { cbi: 10.0, cai: 1, hdi: 0 } }
  };

  // ============================================================
  // ENTITY 3: ContentAsset - From TFS Sitemap
  // ============================================================
  const contentAssets = [
    { id: 'CA_LEASE_FAQ', type: 'FAQ', url: 'toyotafinancial.com/.../faqs.html', title: 'End of Lease FAQs', questions: 24, products: ['PROD_LEASE'] },
    { id: 'CA_LEASE_RETURN', type: 'PAGE', url: 'toyotafinancial.com/.../return_your_vehicle.html', title: 'Return Your Vehicle', products: ['PROD_LEASE'] },
    { id: 'CA_WEAR_USE', type: 'PAGE', url: 'toyotafinancial.com/.../wear_and_use.html', title: 'Wear & Use Guidelines', products: ['PROD_LEASE'] },
    { id: 'CA_LEASE_GUIDE', type: 'DOCUMENT', url: 'toyotafinancial.com/.../Lease-End_Guide.pdf', title: 'Lease-End Guide', format: 'PDF', products: ['PROD_LEASE'] },
    { id: 'CA_PAYMENTS_FAQ', type: 'FAQ', url: 'toyotafinancial.com/.../payments.html', title: 'Payments FAQ', questions: 18, products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'CA_WAYS_TO_PAY', type: 'PAGE', url: 'toyotafinancial.com/.../ways_to_pay.html', title: 'Ways to Pay', products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'CA_LOGIN_FAQ', type: 'FAQ', url: 'toyotafinancial.com/.../login-faqs.html', title: 'Login FAQs', questions: 12, products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'CA_VSA_PAGE', type: 'PAGE', url: 'toyotafinancial.com/.../vehicle_service_agreements.html', title: 'Vehicle Service Agreements', products: ['PROD_VSA'] },
    { id: 'CA_GAP_PAGE', type: 'PAGE', url: 'toyotafinancial.com/.../guaranteed_auto_protection.html', title: 'Guaranteed Auto Protection', products: ['PROD_GAP'] },
    { id: 'CA_CLAIM_PAGE', type: 'PAGE', url: 'toyotafinancial.com/.../how_to_file_a_claim.html', title: 'How to File a Claim', products: ['PROD_VSA', 'PROD_GAP'] },
    { id: 'CA_CONTACT', type: 'PAGE', url: 'toyotafinancial.com/us/en/contact_us.html', title: 'Contact Us', products: ['ALL'] }
  ];

  // ============================================================
  // ENTITY 4: Channel - From TFS Contact page
  // ============================================================
  const channels = [
    { id: 'CH_WEB', type: 'WEB', name: 'TFS Web Portal', contact: 'toyotafinancial.com', is_offline: false, is_self_service: true, availability: '24/7', products: ['ALL'] },
    { id: 'CH_MOBILE', type: 'MOBILE', name: 'MyTFS Mobile App', contact: 'App Store/Play', is_offline: false, is_self_service: true, availability: '24/7', products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'CH_PHONE_MAIN', type: 'PHONE', name: 'Customer Service', contact: '1-800-874-8822', is_offline: true, is_self_service: false, availability: 'Mon-Fri 8am-5pm', products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'CH_PHONE_PAYOFF', type: 'PHONE', name: 'Payoff Line', contact: '1-800-286-0652', is_offline: true, is_self_service: false, availability: 'Mon-Fri 8am-8pm', products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'CH_PHONE_VSA', type: 'PHONE', name: 'Vehicle Protection', contact: '1-800-228-8559', is_offline: true, is_self_service: false, availability: 'Mon-Fri 8am-5pm', products: ['PROD_VSA', 'PROD_TWP'] },
    { id: 'CH_PHONE_GAP', type: 'PHONE', name: 'GAP Claims', contact: '1-800-255-8713', is_offline: true, is_self_service: false, availability: 'Mon-Fri 8am-5pm', products: ['PROD_GAP'] },
    { id: 'CH_DEALER', type: 'DEALER', name: 'Toyota/Lexus Dealer', contact: 'toyota.com/dealers', is_offline: true, is_self_service: false, availability: 'Business hours', products: ['PROD_LEASE', 'PROD_VSA'] },
    { id: 'CH_MAIL', type: 'MAIL', name: 'TFS Mail', contact: 'P.O. Box 22171, Tempe AZ', is_offline: true, is_self_service: true, availability: 'N/A', products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'CH_AUTOVIN', type: 'EXTERNAL', name: 'AutoVIN Inspection', contact: '1-855-406-9837', is_offline: true, is_self_service: false, availability: 'By appointment', products: ['PROD_LEASE'] },
    { id: 'CH_TMISVPP', type: 'WEB', name: 'TMISVPP Portal', contact: 'tmisvpp.com', is_offline: false, is_self_service: true, availability: '24/7', products: ['PROD_GAP'] }
  ];

  // ============================================================
  // ENTITY 5: JourneyPath
  // ============================================================
  const journeyPaths = {
    lease_return: [
      { id: 'PATH_LR_PRIMARY', type: 'PRIMARY', name: 'Return via Originating Dealer', is_digital: false, product: 'PROD_LEASE' },
      { id: 'PATH_LR_ALT', type: 'ALTERNATE', name: 'Return via Non-Originating Dealer', is_digital: false, product: 'PROD_LEASE' },
      { id: 'PATH_LR_PURCHASE', type: 'ALTERNATE', name: 'Purchase Leased Vehicle', is_digital: false, product: 'PROD_LEASE' },
      { id: 'PATH_LR_EARLY', type: 'EXCEPTION', name: 'Early Termination', is_digital: false, product: 'PROD_LEASE' }
    ],
    make_payment: [
      { id: 'PATH_PAY_ONLINE', type: 'PRIMARY', name: 'Pay Online (Web/App)', is_digital: true, product: 'BOTH' },
      { id: 'PATH_PAY_PHONE', type: 'ALTERNATE', name: 'Pay by Phone', is_digital: false, product: 'BOTH' },
      { id: 'PATH_PAY_MAIL', type: 'ALTERNATE', name: 'Pay by Mail', is_digital: false, product: 'BOTH' }
    ],
    get_title: [
      { id: 'PATH_TITLE_STD', type: 'PRIMARY', name: 'Standard Title Release', is_digital: false, product: 'PROD_RETAIL' },
      { id: 'PATH_TITLE_ELEC', type: 'ALTERNATE', name: 'Electronic Title (select states)', is_digital: true, product: 'PROD_RETAIL' }
    ],
    file_gap_claim: [
      { id: 'PATH_GAP_ONLINE', type: 'PRIMARY', name: 'File GAP Claim Online', is_digital: true, product: 'PROD_GAP' },
      { id: 'PATH_GAP_PHONE', type: 'ALTERNATE', name: 'File GAP Claim by Phone', is_digital: false, product: 'PROD_GAP' }
    ]
  };

  // ============================================================
  // ENTITY 6: InstructionStep
  // ============================================================
  const instructionSteps = {
    lease_return: [
      { id: 'STEP_LR_01', seq: 1, action: 'VIEW', verb: 'check', object: 'lease maturity date', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Log in to TFS account and check maturity date' },
      { id: 'STEP_LR_02', seq: 2, action: 'DOWNLOAD', verb: 'download', object: 'Lease-End Guide', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Download and review the Lease-End Guide PDF' },
      { id: 'STEP_LR_03', seq: 3, action: 'SCHEDULE', verb: 'schedule', object: 'pre-inspection', channel: 'PHONE', is_offline: true, is_manual: true, instruction: 'Contact dealer or AutoVIN (1-855-406-9837) to schedule inspection', has_condition: true },
      { id: 'STEP_LR_04', seq: 4, action: 'ATTEND', verb: 'complete', object: 'inspection', channel: 'DEALER', is_offline: true, is_manual: true, instruction: 'Meet inspector for vehicle assessment' },
      { id: 'STEP_LR_05', seq: 5, action: 'VIEW', verb: 'review', object: 'inspection report', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Review condition report online within 2 business days' },
      { id: 'STEP_LR_06', seq: 6, action: 'DECIDE', verb: 'make repairs', object: 'if needed', channel: 'EXTERNAL', is_offline: true, is_manual: true, instruction: 'Optionally make repairs to reduce charges' },
      { id: 'STEP_LR_07', seq: 7, action: 'CONTACT', verb: 'contact', object: 'dealer for turn-in', channel: 'PHONE', is_offline: true, is_manual: true, instruction: 'Schedule turn-in 30 days before maturity' },
      { id: 'STEP_LR_08', seq: 8, action: 'BRING', verb: 'bring', object: 'vehicle + items', channel: 'DEALER', is_offline: true, is_manual: true, instruction: 'Bring vehicle with Odometer Statement, keys, manuals' },
      { id: 'STEP_LR_09', seq: 9, action: 'SIGN', verb: 'sign', object: 'return documents', channel: 'DEALER', is_offline: true, is_manual: true, instruction: 'Sign Odometer Disclosure and return documents' },
      { id: 'STEP_LR_10', seq: 10, action: 'SUBMIT', verb: 'notify', object: 'TFS of return', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Log in and follow return notification prompts' },
      { id: 'STEP_LR_11', seq: 11, action: 'CANCEL', verb: 'cancel', object: 'auto payments', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Cancel recurring payments through TFS or bank' }
    ],
    make_payment: [
      { id: 'STEP_PAY_01', seq: 1, action: 'ACCESS', verb: 'log in', object: 'TFS account', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Log in at toyotafinancial.com' },
      { id: 'STEP_PAY_02', seq: 2, action: 'SUBMIT', verb: 'add', object: 'bank account', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Add bank routing and account number' },
      { id: 'STEP_PAY_03', seq: 3, action: 'SELECT', verb: 'choose', object: 'payment amount', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Select one-time or recurring, enter amount' },
      { id: 'STEP_PAY_04', seq: 4, action: 'CONFIRM', verb: 'confirm', object: 'payment', channel: 'WEB', is_offline: false, is_manual: false, instruction: 'Review and confirm payment' }
    ]
  };

  // ============================================================
  // ENTITY 7: Condition - From TFS FAQs
  // ============================================================
  const conditions = [
    { id: 'COND_GEO_HI', type: 'STATE', trigger: 'Customer in Hawaii', consequence: 'Pre-inspection NOT available', impact: 'HIGH', product: 'PROD_LEASE', source: 'customers who do not reside in Hawaii' },
    { id: 'COND_GEO_NH', type: 'STATE', trigger: 'Lease originated in NH', consequence: 'Pre-inspection NOT available', impact: 'HIGH', product: 'PROD_LEASE', source: 'did not originate in New Hampshire' },
    { id: 'COND_GEO_WI', type: 'STATE', trigger: 'Lease originated in WI', consequence: 'Pre-inspection NOT available', impact: 'HIGH', product: 'PROD_LEASE', source: 'or Wisconsin' },
    { id: 'COND_DEALER_ACCEPT', type: 'ELIGIBILITY', trigger: 'Non-originating dealer', consequence: 'Must confirm acceptance', impact: 'HIGH', product: 'PROD_LEASE', source: 'we recommend contacting them to confirm' },
    { id: 'COND_DEALER_REQ', type: 'ELIGIBILITY', trigger: 'Vehicle return', consequence: 'Originating dealer REQUIRED', impact: 'HIGH', product: 'PROD_LEASE', source: 'Your originating Dealer is required' },
    { id: 'COND_EARLY_FEE', type: 'FEE', trigger: 'Early return', consequence: 'Termination fees apply', impact: 'HIGH', product: 'PROD_LEASE', source: 'early termination fees may apply' },
    { id: 'COND_PAY_CUTOFF', type: 'TIME', trigger: 'After 6 PM CST', consequence: 'Posts next business day', impact: 'LOW', product: 'BOTH', source: 'edited before 6 PM CST' },
    { id: 'COND_BANK_POST', type: 'TIME', trigger: 'Any payment', consequence: '2-3 business days to post', impact: 'MEDIUM', product: 'BOTH', source: 'allow 2-3 business days' },
    { id: 'COND_NO_CASH', type: 'ELIGIBILITY', trigger: 'Payment method', consequence: 'Cash/credit/debit NOT accepted', impact: 'MEDIUM', product: 'BOTH', source: 'cannot process cash, credit, or debit' },
    { id: 'COND_TITLE_STATE', type: 'STATE', trigger: 'Title processing', consequence: 'Varies by state', impact: 'MEDIUM', product: 'PROD_RETAIL', source: 'it varies by state' },
    { id: 'COND_VSA_AUTH', type: 'ELIGIBILITY', trigger: 'VSA repair', consequence: 'Prior auth required', impact: 'HIGH', product: 'PROD_VSA', source: 'without prior authorization are excluded' },
    { id: 'COND_VSA_DEDUCT', type: 'FEE', trigger: 'Non-selling dealer', consequence: '$100 deductible applies', impact: 'LOW', product: 'PROD_VSA', source: 'selling dealer performs...deductible waived' },
    { id: 'COND_GAP_TIMING', type: 'ELIGIBILITY', trigger: 'GAP purchase', consequence: 'Only at vehicle purchase', impact: 'HIGH', product: 'PROD_GAP', source: 'only at time of financing' }
  ];

  // ============================================================
  // ENTITY 8: LatencyWindow
  // ============================================================
  const latencyWindows = [
    { id: 'LAT_BANK', desc: 'Bank payment posting', duration: '2-3', unit: 'BUS_DAYS', controllable: false, creates_inquiry: true, product: 'BOTH', source: 'allow 2-3 business days' },
    { id: 'LAT_INSPECT', desc: 'Inspection report', duration: '1-2', unit: 'BUS_DAYS', controllable: true, creates_inquiry: false, product: 'PROD_LEASE', source: 'Within two business days' },
    { id: 'LAT_LIEN', desc: 'Title/lien release', duration: '7-14', unit: 'CAL_DAYS', controllable: false, creates_inquiry: true, product: 'PROD_RETAIL', source: '7-14 days' },
    { id: 'LAT_INVOICE', desc: 'Lease-end invoice', duration: '60-120', unit: 'CAL_DAYS', controllable: true, creates_inquiry: true, product: 'PROD_LEASE', source: '60-120 days after return' },
    { id: 'LAT_SEC_DEP', desc: 'Security deposit', duration: '7-14', unit: 'CAL_DAYS', controllable: false, creates_inquiry: true, product: 'PROD_LEASE', source: 'returned via check' },
    { id: 'LAT_GAP_CLAIM', desc: 'GAP claim processing', duration: '30-60', unit: 'CAL_DAYS', controllable: false, creates_inquiry: true, product: 'PROD_GAP', source: 'GAP claim processing' },
    { id: 'LAT_VSA_CANCEL', desc: 'VSA cancellation refund', duration: '30', unit: 'CAL_DAYS', controllable: true, creates_inquiry: false, product: 'PROD_VSA', source: 'within first 30 days' }
  ];

  // ============================================================
  // ENTITY 9: EscalationPath - From Contact page
  // ============================================================
  const escalationPaths = [
    { id: 'ESC_MAIN', trigger: 'General questions', dest: 'Customer Service', phone: '1-800-874-8822', hours: 'Mon-Fri 8am-5pm', severity: 'INFO', avoidable: true, products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'ESC_PAYOFF', trigger: 'Payoff/early term', dest: 'Payoff Line', phone: '1-800-286-0652', hours: 'Mon-Fri 8am-8pm', severity: 'REQUIRED', avoidable: false, products: ['PROD_LEASE', 'PROD_RETAIL'] },
    { id: 'ESC_DEALER', trigger: 'Lease-end, return', dest: 'Dealer', phone: 'toyota.com/dealers', hours: 'Business hours', severity: 'INFO', avoidable: true, products: ['PROD_LEASE'] },
    { id: 'ESC_VSA', trigger: 'VSA claims', dest: 'Vehicle Protection', phone: '1-800-228-8559', hours: 'Mon-Fri 8am-5pm', severity: 'REQUIRED', avoidable: false, products: ['PROD_VSA'] },
    { id: 'ESC_GAP', trigger: 'GAP claims', dest: 'GAP Claims', phone: '1-800-255-8713', hours: 'Mon-Fri 8am-5pm', severity: 'REQUIRED', avoidable: false, products: ['PROD_GAP'] },
    { id: 'ESC_AUTOVIN', trigger: 'Pre-inspection', dest: 'AutoVIN', phone: '1-855-406-9837', hours: 'By appointment', severity: 'RECOMMENDED', avoidable: true, products: ['PROD_LEASE'] }
  ];

  // ============================================================
  // ENTITY 10: ResponsibleParty
  // ============================================================
  const responsibleParties = [
    { id: 'RP_CUSTOMER', name: 'Customer', type: 'CUSTOMER', role: 'Primary actor', controllability: 'HIGH', is_human: true },
    { id: 'RP_TFS_DIG', name: 'TFS Digital', type: 'INTERNAL', role: 'Web/mobile platform', controllability: 'HIGH', is_human: false },
    { id: 'RP_TFS_CC', name: 'TFS Contact Center', type: 'INTERNAL', role: 'Phone support', controllability: 'HIGH', is_human: true },
    { id: 'RP_TMIS', name: 'TMIS', type: 'INTERNAL', role: 'Protection products admin', controllability: 'HIGH', is_human: true },
    { id: 'RP_DEALER_O', name: 'Originating Dealer', type: 'EXTERNAL', role: 'Required for returns', controllability: 'MEDIUM', is_human: true },
    { id: 'RP_DEALER_X', name: 'Other Dealer', type: 'EXTERNAL', role: 'May decline returns', controllability: 'LOW', is_human: true },
    { id: 'RP_AUTOVIN', name: 'AutoVIN', type: 'EXTERNAL', role: '3rd party inspection', controllability: 'LOW', is_human: true },
    { id: 'RP_DMV', name: 'State DMV', type: 'EXTERNAL', role: 'Title processing', controllability: 'LOW', is_human: true },
    { id: 'RP_BANK', name: 'Customer Bank', type: 'EXTERNAL', role: 'Payment processing', controllability: 'LOW', is_human: false },
    { id: 'RP_INSURER', name: 'Auto Insurer', type: 'EXTERNAL', role: 'Total loss settlement', controllability: 'LOW', is_human: true }
  ];

  // ============================================================
  // ENTITY 11: ValueLeakage
  // ============================================================
  const valueLeakages = [
    { id: 'VL_PAY_INQ', type: 'COST', driver: '2-3 day posting creates status calls', proxy: 'Payment call volume', magnitude: 'MEDIUM', product: 'BOTH' },
    { id: 'VL_PAY_DOUBLE', type: 'COST', driver: 'App bugs cause double charges', proxy: 'Refund requests', magnitude: 'MEDIUM', product: 'BOTH' },
    { id: 'VL_TITLE_INQ', type: 'COST', driver: '7-14 day title wait creates calls', proxy: 'Title inquiry volume', magnitude: 'MEDIUM', product: 'PROD_RETAIL' },
    { id: 'VL_LEASE_TIME', type: 'TIME', driver: '90-day process with manual scheduling', proxy: 'Days to closure', magnitude: 'HIGH', product: 'PROD_LEASE' },
    { id: 'VL_DEALER_RISK', type: 'RISK', driver: 'Dealer discretion on returns', proxy: 'Dispute rate', magnitude: 'MEDIUM', product: 'PROD_LEASE' },
    { id: 'VL_OFFLINE', type: 'COST', driver: 'Phone/dealer for routine tasks', proxy: 'Avoidable contacts', magnitude: 'HIGH', product: 'PROD_LEASE' },
    { id: 'VL_GEO', type: 'RISK', driver: 'HI/NH/WI surprise charges', proxy: 'Excluded state disputes', magnitude: 'LOW', product: 'PROD_LEASE' },
    { id: 'VL_APP', type: 'REPUTATION', driver: 'Negative app reviews', proxy: 'App rating', magnitude: 'MEDIUM', product: 'BOTH' },
    { id: 'VL_LOGIN', type: 'TIME', driver: 'Auth code every login', proxy: 'Login failure rate', magnitude: 'MEDIUM', product: 'BOTH' },
    { id: 'VL_VSA_AUTH', type: 'COST', driver: 'Prior auth delays repairs', proxy: 'Auth denial rate', magnitude: 'MEDIUM', product: 'PROD_VSA' }
  ];

  // ============================================================
  // ENTITY 12: OpportunitySignal
  // ============================================================
  const opportunitySignals = [
    { id: 'OPP_ORCH', type: 'ORCHESTRATION', desc: 'Customer coordinates 4+ parties', readiness: 'HIGH', blockers: ['Dealer API', 'AutoVIN API'], product: 'PROD_LEASE', theme: 'Customer-as-Integrator' },
    { id: 'OPP_PROACT', type: 'PROACTIVE', desc: 'Milestone comms reduce inquiries', readiness: 'MEDIUM', blockers: ['Real-time data'], product: 'PROD_LEASE', theme: 'Unmanaged Latency' },
    { id: 'OPP_SCHED', type: 'SELF_SERVICE', desc: 'Online inspection/turn-in scheduling', readiness: 'MEDIUM', blockers: ['Dealer calendars'], product: 'PROD_LEASE', theme: 'Offline-First Design' },
    { id: 'OPP_PAY_ST', type: 'PROACTIVE', desc: 'Real-time payment status', readiness: 'HIGH', blockers: ['Bank integration'], product: 'BOTH', theme: 'Unmanaged Latency' },
    { id: 'OPP_TITLE', type: 'PROACTIVE', desc: 'Title tracking + notifications', readiness: 'MEDIUM', blockers: ['Mail tracking', 'DMV API'], product: 'PROD_RETAIL', theme: 'Unmanaged Latency' },
    { id: 'OPP_APP_FIX', type: 'SELF_SERVICE', desc: 'Fix app payment reliability', readiness: 'HIGH', blockers: ['Engineering'], product: 'BOTH', theme: 'Digital Experience' },
    { id: 'OPP_GAP_DIG', type: 'SELF_SERVICE', desc: 'Enhance digital GAP claims', readiness: 'MEDIUM', blockers: ['Insurer APIs'], product: 'PROD_GAP', theme: 'Offline-First Design' }
  ];

  // ============================================================
  // ENTITY 13: EvidenceAnchor - From TFS website
  // ============================================================
  const evidenceAnchors = [
    { id: 'EV_01', url: 'toyotafinancial.com/.../faqs.html', type: 'FAQ', text: 'Your originating Dealer is required to process the vehicle return', supports: ['COND_DEALER_REQ'] },
    { id: 'EV_02', url: 'toyotafinancial.com/.../faqs.html', type: 'FAQ', text: 'Courtesy pre-inspection available to lease customers who do not reside in Hawaii or whose leases did not originate in New Hampshire or Wisconsin', supports: ['COND_GEO_HI', 'COND_GEO_NH', 'COND_GEO_WI'] },
    { id: 'EV_03', url: 'toyotafinancial.com/.../payments.html', type: 'FAQ', text: 'Unfortunately, we cannot process cash, credit, or debit card payments', supports: ['COND_NO_CASH'] },
    { id: 'EV_04', url: 'toyotafinancial.com/.../ways_to_pay.html', type: 'PAGE', text: 'Please allow 2-3 business days for your bank to post the payment', supports: ['LAT_BANK'] },
    { id: 'EV_05', url: 'toyotafinancial.com/...Invoice.html', type: 'BLOG', text: 'expect to see the end-of-lease invoice about 60-120 days after you return', supports: ['LAT_INVOICE'] },
    { id: 'EV_06', url: 'toyotafinancial.com/.../vehicle_service_agreements.html', type: 'PAGE', text: 'Plans feature $0 or $100 deductible options', supports: ['COND_VSA_DEDUCT'] },
    { id: 'EV_07', url: 'toyotafinancial.com/.../How_to_file_a_GAP_claim.html', type: 'FAQ', text: 'Filing a GAP claim is quick and easy through our digital self-service process', supports: ['PATH_GAP_ONLINE'] }
  ];

  // ============================================================
  // ENTITY 14: SentimentSignal - External sources
  // ============================================================
  const sentimentSignals = [
    { id: 'SENT_APP_PAY', platform: 'APP_STORE', theme: 'Payment Failures', polarity: 'NEGATIVE', count: 78, product: 'BOTH', samples: ['Charged twice', 'Says failed but went through', 'Had to cancel and re-post'] },
    { id: 'SENT_APP_LOGIN', platform: 'APP_STORE', theme: 'Login Problems', polarity: 'NEGATIVE', count: 124, product: 'BOTH', samples: ['Auth code every time', 'App logs me out constantly', 'Fingerprint stopped working'] },
    { id: 'SENT_PLAY_ERR', platform: 'GOOGLE_PLAY', theme: 'App Errors', polarity: 'NEGATIVE', count: 89, product: 'BOTH', samples: ['Error on our end message', 'Cannot log on for 3 days', 'Baffling it hasnt been fixed'] },
    { id: 'SENT_TP_CS', platform: 'TRUSTPILOT', theme: 'Wait Times', polarity: 'NEGATIVE', count: 45, product: 'BOTH', samples: ['Over an hour every call', 'On hold for 20 minutes twice', 'Why does it take an hour'] },
    { id: 'SENT_TP_LEASE', platform: 'TRUSTPILOT', theme: 'Lease-End Complexity', polarity: 'NEGATIVE', count: 32, product: 'PROD_LEASE', samples: ['Nobody knew which dealer', 'Surprise charges 3 months later', 'Departments dont communicate'] },
    { id: 'SENT_BBB_TITLE', platform: 'BBB', theme: 'Title Delays', polarity: 'NEGATIVE', count: 28, product: 'PROD_RETAIL', samples: ['Impossible to get lien release', 'Phone tree impervious', 'Refuse to write letter'] },
    { id: 'SENT_POS_PAY', platform: 'APP_STORE', theme: 'Easy Payment', polarity: 'POSITIVE', count: 156, product: 'BOTH', samples: ['Love quick pay', 'Easy autopay', 'Far exceeded expectations'] },
    { id: 'SENT_POS_APP', platform: 'GOOGLE_PLAY', theme: 'Convenient App', polarity: 'POSITIVE', count: 89, product: 'BOTH', samples: ['Takes 2 minutes', 'App always worked for me', 'Dont know why rated low'] }
  ];

  // Metrics
  const productMetrics = {
    PROD_LEASE: { avg_cbi: 35.1, avg_cai: 3.0, avg_hdi: 62, intents: 3, sentiment: 2.1 },
    PROD_RETAIL: { avg_cbi: 16.8, avg_cai: 2.0, avg_hdi: 17, intents: 2, sentiment: 2.8 },
    PROD_VSA: { avg_cbi: 16.0, avg_cai: 1.5, avg_hdi: 25, intents: 2, sentiment: 3.2 },
    PROD_GAP: { avg_cbi: 35.0, avg_cai: 3.0, avg_hdi: 75, intents: 1, sentiment: 2.5 }
  };

  const rootCauses = [
    { id: 'RC1', name: 'Offline Pathways Are First-Class', severity: 'HIGH', evidence: ['60%+ offline steps', 'No digital lease-end', 'Phone scheduling required'] },
    { id: 'RC2', name: 'External Dependencies', severity: 'HIGH', evidence: ['4 external parties', 'Dealer discretion', 'DMV varies by state'] },
    { id: 'RC3', name: 'Channel Switching', severity: 'MEDIUM', evidence: ['4 switches in lease-return', 'No context transfer', 'Agents lack visibility'] },
    { id: 'RC4', name: 'Unmanaged Latency', severity: 'MEDIUM', evidence: ['2-3 day posting', '60-120 day invoice', 'No proactive updates'] },
    { id: 'RC5', name: 'Digital Experience Gaps', severity: 'MEDIUM', evidence: ['App payment bugs', 'Login issues', 'Low ratings'] }
  ];

  const allEntities = {
    Product: { data: Object.values(products), desc: 'What TFS sells/services' },
    CustomerIntent: { data: Object.values(customerIntents), desc: 'What customers want to do' },
    ContentAsset: { data: contentAssets, desc: 'Source content' },
    Channel: { data: channels, desc: 'How customers interact' },
    JourneyPath: { data: Object.values(journeyPaths).flat(), desc: 'Routes to accomplish intent' },
    InstructionStep: { data: Object.values(instructionSteps).flat(), desc: 'Individual instructions' },
    Condition: { data: conditions, desc: 'Branching logic' },
    LatencyWindow: { data: latencyWindows, desc: 'Wait times' },
    EscalationPath: { data: escalationPaths, desc: 'Routes to humans' },
    ResponsibleParty: { data: responsibleParties, desc: 'Who owns steps' },
    ValueLeakage: { data: valueLeakages, desc: 'Business impact' },
    OpportunitySignal: { data: opportunitySignals, desc: 'Improvement potential' },
    EvidenceAnchor: { data: evidenceAnchors, desc: 'Proof from sources' },
    SentimentSignal: { data: sentimentSignals, desc: 'External reviews' }
  };

  // ============================================================
  // RENDER: Home
  // ============================================================
  const renderHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">CX Knowledge Graph</h1>
        <p className="text-lg opacity-90">14-Entity Ontology with Product as Anchor</p>
        <div className="mt-4 flex gap-3 text-sm flex-wrap">
          <span className="bg-white/20 px-3 py-1 rounded-full">14 Entities</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">6 Products</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">10 Intents</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">13 Conditions</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-sky-500"></span>
          Product Landscape (NEW Entity)
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(products).slice(0, 6).map((p) => (
            <button key={p.id} onClick={() => { setSelectedProduct(p.id); setActiveSection('products'); }}
              className="p-4 rounded-xl text-left hover:shadow-lg transition-all border border-sky-200 bg-sky-50">
              <div className="font-bold text-sm">{p.name}</div>
              <div className="text-xs text-gray-500">{p.category}</div>
              <div className={`mt-2 px-2 py-0.5 rounded text-xs inline-block ${p.complexity === 'HIGH' ? 'bg-red-100 text-red-700' : p.complexity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                {p.complexity}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4">All 14 Building Blocks</h2>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(entityColors).map(([entity, color]) => (
            <button key={entity} onClick={() => { setSelectedEntity(entity); setActiveSection('entities'); }}
              className="p-2 rounded-lg text-left hover:shadow-md transition-all text-xs font-medium"
              style={{ backgroundColor: `${color}15`, color: color }}>
              {entity.split(/(?=[A-Z])/).join(' ').split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(productMetrics).map(([id, m]) => (
          <div key={id} className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="font-bold text-sm mb-2">{products[id]?.name}</div>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className={`p-2 rounded ${m.avg_cbi < 20 ? 'bg-green-100 text-green-700' : m.avg_cbi < 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                <div className="text-lg font-bold">{m.avg_cbi}</div>
                <div className="text-xs">CBI</div>
              </div>
              <div className={`p-2 rounded ${m.avg_cai <= 2 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <div className="text-lg font-bold">{m.avg_cai}</div>
                <div className="text-xs">CAI</div>
              </div>
              <div className={`p-2 rounded ${m.avg_hdi < 30 ? 'bg-green-100 text-green-700' : m.avg_hdi < 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                <div className="text-lg font-bold">{m.avg_hdi}%</div>
                <div className="text-xs">HDI</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4">Sentiment from External Sources</h2>
        <div className="grid grid-cols-4 gap-4">
          {['APP_STORE', 'GOOGLE_PLAY', 'TRUSTPILOT', 'BBB'].map((platform) => {
            const sigs = sentimentSignals.filter(s => s.platform === platform);
            const neg = sigs.filter(s => s.polarity === 'NEGATIVE').reduce((a, b) => a + b.count, 0);
            const pos = sigs.filter(s => s.polarity === 'POSITIVE').reduce((a, b) => a + b.count, 0);
            return (
              <div key={platform} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm">{platform.replace('_', ' ')}</div>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">{neg} neg</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{pos} pos</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ============================================================
  // RENDER: Products
  // ============================================================
  const renderProducts = () => {
    const product = products[selectedProduct];
    const relatedIntents = Object.values(customerIntents).filter(i => i.product_refs.includes(selectedProduct));
    const relatedChannels = channels.filter(c => c.products.includes(selectedProduct) || c.products.includes('ALL'));
    const relatedConditions = conditions.filter(c => c.product === selectedProduct || c.product === 'BOTH');

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Product Explorer</h2>
          <p className="opacity-90">The anchor entity for product-specific journeys</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {Object.values(products).map((p) => (
            <button key={p.id} onClick={() => setSelectedProduct(p.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedProduct === p.id ? 'bg-sky-600 text-white' : 'bg-white border'}`}>
              {p.name}
            </button>
          ))}
        </div>

        {product && (
          <>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-xs text-gray-500">{product.id}</div>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">{product.category}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${product.complexity === 'HIGH' ? 'bg-red-100 text-red-700' : product.complexity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {product.complexity} complexity
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Support</div>
                  <div className="font-mono text-lg text-sky-600">{product.support_phone}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Lifecycle Stages</div>
                <div className="flex gap-1">{product.lifecycle_stages.map((s) => <span key={s} className="px-2 py-1 bg-gray-100 rounded text-xs">{s}</span>)}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-3">Related Intents ({relatedIntents.length})</h4>
              <div className="grid grid-cols-2 gap-2">
                {relatedIntents.map((i) => (
                  <div key={i.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-sm">{i.name}</div>
                    <div className="flex gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs ${i.metrics.cbi < 20 ? 'bg-green-100 text-green-700' : i.metrics.cbi < 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>CBI {i.metrics.cbi}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">CAI {i.metrics.cai}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-3">Available Channels ({relatedChannels.length})</h4>
              <div className="grid grid-cols-3 gap-2">
                {relatedChannels.map((c) => (
                  <div key={c.id} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm">{c.name}</div>
                      <span className="px-2 py-0.5 rounded text-xs text-white" style={{ backgroundColor: channelColors[c.type] }}>{c.type}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{c.contact}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-3">Conditions ({relatedConditions.length})</h4>
              <div className="space-y-2">
                {relatedConditions.map((c) => (
                  <div key={c.id} className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-pink-200 text-pink-800 rounded text-xs">{c.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${c.impact === 'HIGH' ? 'bg-red-100 text-red-700' : c.impact === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{c.impact}</span>
                    </div>
                    <div className="text-sm mt-2"><strong>IF:</strong> {c.trigger}</div>
                    <div className="text-sm"><strong>THEN:</strong> {c.consequence}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // ============================================================
  // RENDER: Entities
  // ============================================================
  const renderEntities = () => {
    const current = allEntities[selectedEntity];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Entity Explorer</h2>
          <p className="opacity-90">All 14 building blocks with TFS examples</p>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Object.keys(entityColors).map((e) => (
            <button key={e} onClick={() => setSelectedEntity(e)}
              className={`p-2 rounded text-xs font-medium transition-all ${selectedEntity === e ? 'text-white ring-2' : ''}`}
              style={{ backgroundColor: selectedEntity === e ? entityColors[e] : `${entityColors[e]}20`, color: selectedEntity === e ? 'white' : entityColors[e] }}>
              {e.split(/(?=[A-Z])/).join(' ').split(' ')[0]}
            </button>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: entityColors[selectedEntity] }}></div>
            <h3 className="text-xl font-bold">{selectedEntity}</h3>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">{current.data.length} examples</span>
          </div>
          <p className="text-gray-600 mb-4">{current.desc}</p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {current.data.map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border text-sm">
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs">{JSON.stringify(item, null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // RENDER: Journeys
  // ============================================================
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
              className={`px-3 py-2 rounded-lg text-sm ${selectedIntent === k ? 'bg-green-600 text-white' : 'bg-white border'}`}>
              {v.name}
            </button>
          ))}
        </div>
        {intent && (
          <>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-xs text-gray-500">{intent.id}</div>
                  <h3 className="text-xl font-bold">{intent.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{intent.category}</span>
                    <span className={`px-2 py-1 rounded text-xs ${intent.complexity === 'COMPLEX' ? 'bg-red-100 text-red-700' : intent.complexity === 'MODERATE' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{intent.complexity}</span>
                    {intent.product_refs.map(p => <span key={p} className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs">{products[p]?.name}</span>)}
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
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h4 className="font-semibold mb-3">Journey Paths</h4>
                <div className="grid grid-cols-2 gap-2">
                  {paths.map((p) => (
                    <div key={p.id} className={`p-3 rounded-lg border-2 ${p.type === 'PRIMARY' ? 'border-green-500 bg-green-50' : p.type === 'ALTERNATE' ? 'border-blue-500 bg-blue-50' : 'border-orange-500 bg-orange-50'}`}>
                      <span className={`px-2 py-0.5 rounded text-xs ${p.type === 'PRIMARY' ? 'bg-green-200 text-green-800' : p.type === 'ALTERNATE' ? 'bg-blue-200 text-blue-800' : 'bg-orange-200 text-orange-800'}`}>{p.type}</span>
                      <div className="font-medium text-sm mt-1">{p.name}</div>
                      <div className="text-xs mt-1">{p.is_digital ? '✓ Digital' : '✗ Offline'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {steps.length > 0 && (
              <div className="bg-white p-6 rounded-xl border shadow-sm">
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
                          {s.has_condition && <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">⚠️ Condition</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // ============================================================
  // RENDER: Metrics
  // ============================================================
  const renderMetrics = () => {
    const cbiData = Object.entries(customerIntents).map(([k, v]) => ({
      name: v.name.split(' ').slice(0, 2).join(' '),
      CBI: v.metrics.cbi,
      fill: v.metrics.cbi < 20 ? '#22C55E' : v.metrics.cbi < 30 ? '#F59E0B' : '#EF4444'
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
          </div>
          <div className="bg-white p-4 rounded-xl border border-l-4 border-l-orange-500">
            <div className="text-2xl font-bold text-orange-600">CAI</div>
            <div className="font-medium">Customer-as-Integrator</div>
            <div className="text-xs text-gray-500 mt-2">COUNT(ResponsibleParty WHERE type≠CUSTOMER)</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-l-4 border-l-red-500">
            <div className="text-2xl font-bold text-red-600">HDI</div>
            <div className="font-medium">Human Dependency Index</div>
            <div className="text-xs text-gray-500 mt-2">(manual_steps / total_steps) × 100</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">CBI by Intent</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cbiData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 50]} />
              <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="CBI" radius={[0, 4, 4, 0]}>{cbiData.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Product Friction Index (PFI) - NEW</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(productMetrics).map(([id, m]) => (
              <div key={id} className={`p-4 rounded-xl border-2 ${m.avg_cbi > 30 ? 'border-red-500 bg-red-50' : m.avg_cbi > 20 ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}>
                <div className="font-bold">{products[id]?.name}</div>
                <div className="text-3xl font-bold mt-2">{m.avg_cbi}</div>
                <div className="text-xs text-gray-500">Avg CBI across {m.intents} intents</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Root Causes</h3>
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

  // ============================================================
  // RENDER: Storyboard
  // ============================================================
  const renderStoryboard = () => {
    const slides = [
      { title: 'Product Landscape', subtitle: 'What TFS Offers', content: <div className="grid grid-cols-3 gap-3">{Object.values(products).slice(0, 6).map((p) => <div key={p.id} className="p-3 bg-sky-50 rounded-lg border border-sky-200"><div className="font-bold text-sm">{p.name}</div><div className="text-xs text-gray-500">{p.category}</div><div className={`mt-2 px-2 py-0.5 rounded text-xs inline-block ${p.complexity === 'HIGH' ? 'bg-red-100 text-red-700' : p.complexity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{p.complexity}</div></div>)}</div> },
      { title: 'Top Customer Intents', subtitle: 'What Customers Want', content: <div className="space-y-2">{Object.values(customerIntents).slice(0, 6).map((v, i) => <div key={v.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded"><span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">{i + 1}</span><span className="flex-1 text-sm">{v.name}</span><span className={`px-2 py-1 rounded text-xs ${v.volume === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{v.volume}</span></div>)}</div> },
      { title: 'Friction Hotspots', subtitle: 'Where Customers Get Stuck', content: <div className="grid grid-cols-2 gap-3"><div className="p-4 bg-red-50 rounded-lg"><div className="text-3xl font-bold text-red-600">60%+</div><div className="text-sm">Offline Steps (Lease Return)</div></div><div className="p-4 bg-orange-50 rounded-lg"><div className="text-3xl font-bold text-orange-600">4</div><div className="text-sm">External Parties to Coordinate</div></div><div className="p-4 bg-yellow-50 rounded-lg"><div className="text-3xl font-bold text-yellow-600">3</div><div className="text-sm">Geographic Restrictions</div></div><div className="p-4 bg-purple-50 rounded-lg"><div className="text-3xl font-bold text-purple-600">120</div><div className="text-sm">Days Max Latency (Invoice)</div></div></div> },
      { title: 'Root Causes', subtitle: 'Why Friction Exists', content: <div className="space-y-2">{rootCauses.map((rc) => <div key={rc.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded"><div className={`w-3 h-3 rounded-full mt-1 ${rc.severity === 'HIGH' ? 'bg-red-500' : rc.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`}></div><div><div className="font-medium text-sm">{rc.name}</div><div className="text-xs text-gray-500">{rc.evidence[0]}</div></div></div>)}</div> },
      { title: 'Voice of Customer', subtitle: 'External Sentiment', content: <div className="space-y-2">{sentimentSignals.filter(s => s.polarity === 'NEGATIVE').slice(0, 4).map((s) => <div key={s.id} className="p-3 bg-red-50 rounded-lg border border-red-200"><div className="flex justify-between"><span className="font-medium text-sm">{s.theme}</span><span className="px-2 py-0.5 bg-purple-200 text-purple-800 rounded text-xs">{s.platform}</span></div><div className="text-xs text-gray-600 mt-1 italic">"{s.samples[0]}"</div><div className="text-xs text-red-600 mt-1">{s.count} mentions</div></div>)}</div> },
      { title: 'Priority Hotspots', subtitle: 'Ranked by Product Friction Index', content: <table className="w-full text-sm"><thead><tr className="border-b bg-gray-100"><th className="py-2 px-2 text-left">Product</th><th className="text-center">Avg CBI</th><th className="text-center">Avg CAI</th><th className="text-center">Avg HDI</th></tr></thead><tbody>{Object.entries(productMetrics).sort((a, b) => b[1].avg_cbi - a[1].avg_cbi).map(([id, m], i) => <tr key={id} className={`border-b ${i === 0 ? 'bg-red-50' : i === 1 ? 'bg-orange-50' : 'bg-yellow-50'}`}><td className="py-2 px-2 font-medium">{products[id]?.name}</td><td className="text-center"><span className="px-2 py-1 bg-red-200 rounded text-xs">{m.avg_cbi}</span></td><td className="text-center">{m.avg_cai}</td><td className="text-center">{m.avg_hdi}%</td></tr>)}</tbody></table> }
    ];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Storyboard</h2>
          <p className="opacity-90">6 slides for leadership - now with Product lens</p>
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

  // ============================================================
  // RENDER: Data Model
  // ============================================================
  const renderDataModel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold">Data Model</h2>
        <p className="opacity-90">14-Entity schemas with Product relationships</p>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold mb-3">Product Schema (NEW)</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">{`{
  "id": "PROD_LEASE",
  "name": "Vehicle Lease",
  "category": "FINANCING",           // FINANCING | PROTECTION
  "complexity": "HIGH",              // HIGH | MEDIUM | LOW
  "lifecycle_stages": ["ORIGINATION", "USAGE", "RENEWAL_EXIT"],
  "support_phone": "1-800-874-8822",
  "key_features": ["Fixed payments", "Mileage allowance", "Wear & use"]
}`}</pre>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold mb-3">CustomerIntent with Product Reference</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">{`{
  "id": "INT_LEASE_RETURN",
  "name": "Return Leased Vehicle",
  "product_refs": ["PROD_LEASE"],    // Links to Product entity
  "category": "LEASE_END",
  "volume_signal": "HIGH",
  "complexity_tier": "COMPLEX"
}`}</pre>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold mb-3">Updated Relationship Structure</h3>
        <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg text-xs overflow-x-auto">{`                    ┌─────────────────┐
                    │     PRODUCT     │  ← NEW ANCHOR ENTITY
                    │  (What we sell) │
                    └────────┬────────┘
                             │ ENABLES
                             ▼
                    ┌─────────────────┐
    ContentAsset ──▶│ CustomerIntent  │◀── SentimentSignal
                    │ (Customer goal) │
                    └────────┬────────┘
                             │ HAS_PATH
                             ▼
                    ┌─────────────────┐
                    │   JourneyPath   │
                    └────────┬────────┘
                             │ HAS_STEP
                             ▼
                    ┌─────────────────┐
                    │ InstructionStep │──VIA──▶ Channel
                    └────────┬────────┘
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          Condition      Latency       Escalation
              │          Window          Path
              └────┬─────────────────────┘
                   ▼
              ValueLeakage ◀── OpportunitySignal
                   ▲
                   │
              EvidenceAnchor`}</pre>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold mb-3">Cypher: Product Friction Index</h3>
        <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-xs overflow-x-auto">{`// Calculate PFI (Product Friction Index) - NEW METRIC
MATCH (p:Product)-[:ENABLES]->(i:CustomerIntent)
MATCH (i)-[:HAS_PATH]->(path:JourneyPath {path_type:'PRIMARY'})-[:HAS_STEP]->(s:InstructionStep)
WITH p, i, COUNT(DISTINCT s) AS steps, 
     SUM(CASE WHEN s.is_offline THEN 1 ELSE 0 END) AS offline
WITH p, AVG(steps + offline*2.5) AS avg_cbi
RETURN p.name AS Product, avg_cbi AS PFI
ORDER BY PFI DESC`}</pre>
      </div>
    </div>
  );

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">CX</div>
            <div><div className="font-bold">CX Knowledge Graph</div><div className="text-xs text-gray-500">14-Entity Ontology</div></div>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'home', icon: '🏠', label: 'Home' },
              { id: 'products', icon: '📦', label: 'Products' },
              { id: 'entities', icon: '🧩', label: 'Entities' },
              { id: 'journeys', icon: '🗺️', label: 'Journeys' },
              { id: 'metrics', icon: '📊', label: 'Metrics' },
              { id: 'storyboard', icon: '📈', label: 'Story' },
              { id: 'datamodel', icon: '💻', label: 'Data' }
            ].map((n) => (
              <button key={n.id} onClick={() => setActiveSection(n.id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${activeSection === n.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <span>{n.icon}</span><span className="hidden md:inline">{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'products' && renderProducts()}
        {activeSection === 'entities' && renderEntities()}
        {activeSection === 'journeys' && renderJourneys()}
        {activeSection === 'metrics' && renderMetrics()}
        {activeSection === 'storyboard' && renderStoryboard()}
        {activeSection === 'datamodel' && renderDataModel()}
      </div>
      <div className="bg-white border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between text-sm text-gray-500">
          <span>CX Knowledge Graph v2.0 - 14 Entity Ontology</span>
          <span>6 Products • 10 Intents • 13 Conditions • 7 Latencies • External Sentiment</span>
        </div>
      </div>
    </div>
  );
};

export default CXKnowledgeGraph;
