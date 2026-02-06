import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ForceGraph2D from 'react-force-graph-2d';

// Make sure this path matches your file structure
import faqData from './faq_data_gemini.json';

// ============================================================
// CX KNOWLEDGE GRAPH - 14-ENTITY ONTOLOGY (FIXED)
// ============================================================

const CXKnowledgeGraph = () => {
  const [activeSection, setActiveSection] = useState('graph');
  const [selectedEntity, setSelectedEntity] = useState('Product');
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('PROD_LEASE');
  const [storyboardSlide, setStoryboardSlide] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // REFS FOR GRAPH & SIZING
  const fgRef = useRef();
  const graphContainerRef = useRef(null);
  const [graphDimensions, setGraphDimensions] = useState({ width: 800, height: 600 });

  // GRAPH VISIBILITY CONTROLS
  const [showSteps, setShowSteps] = useState(true); 
  const [showRules, setShowRules] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showEvidence, setShowEvidence] = useState(true);
  const [showLeakage, setShowLeakage] = useState(false);

  // Colors
  const entityColors = {
    Product: '#0EA5E9',         // Sky Blue
    CustomerIntent: '#A855F7',  // Purple
    InstructionStep: '#94A3B8', // Silver/Gray
    Condition: '#EA580C',       // Dark Orange
    LatencyWindow: '#FACC15',   // Yellow
    EscalationPath: '#2DD4BF',  // Turquoise
    ValueLeakage: '#EF4444',    // Red
    ResponsibleParty: '#22C55E',// Green
    EvidenceAnchor: '#64748B',  // Slate Blue
    ContentAsset: '#EC4899'     // Pink
  };
  const channelColors = { WEB: '#3B82F6', MOBILE: '#8B5CF6', PHONE: '#F59E0B', DEALER: '#EF4444', MAIL: '#6B7280', EXTERNAL: '#EC4899' };

  // ============================================================
  // 1. DATA PROCESSING (ETL Layer)
  // ============================================================
  const processedData = useMemo(() => {
    const rawNodes = faqData.nodes || [];
    
    const buckets = {
      products: {},
      intents: {},
      channels: [],
      responsible_parties: [],
      journey_paths: [],
      steps: [],
      conditions: [],
      latencies: [],
      escalations: [],
      value_leakages: [],
      evidence_anchors: [],
      content_assets: []
    };

    rawNodes.forEach(node => {
      if (node.id.startsWith('PROD_')) buckets.products[node.id] = { ...node, name: node.label || node.name };
      else if (node.id.startsWith('INT_')) buckets.intents[node.id] = node;
      else if (node.id.startsWith('CH_')) buckets.channels.push(node);
      else if (node.id.startsWith('RP_')) buckets.responsible_parties.push(node);
      else if (node.id.startsWith('PATH_')) buckets.journey_paths.push(node);
      else if (node.id.startsWith('STEP_')) buckets.steps.push(node);
      else if (node.id.startsWith('COND_')) buckets.conditions.push(node);
      else if (node.id.startsWith('LAT_')) buckets.latencies.push(node);
      else if (node.id.startsWith('ESC_')) buckets.escalations.push(node);
      else if (node.id.startsWith('VL_')) buckets.value_leakages.push(node);
      else if (node.id.startsWith('EV_')) buckets.evidence_anchors.push(node);
      else if (node.id.startsWith('CA_') || node.id.startsWith('DOC_')) buckets.content_assets.push(node);
    });

    // AUTO-REPAIR: If Intents/Paths missing
    if (Object.keys(buckets.intents).length === 0 && buckets.steps.length > 0) {
        const DEFAULT_INTENT_ID = "INT_GENERATED";
        const DEFAULT_PATH_ID = "PATH_GENERATED";
        buckets.intents[DEFAULT_INTENT_ID] = {
            id: DEFAULT_INTENT_ID,
            name: "Extracted FAQ Process",
            product_refs: Object.keys(buckets.products),
            category: "GENERAL",
            complexity: "MODERATE"
        };
        buckets.journey_paths.push({
            id: DEFAULT_PATH_ID,
            intent_ref: DEFAULT_INTENT_ID,
            name: "Default Extraction Path",
            type: "PRIMARY"
        });
        buckets.steps = buckets.steps.map(s => ({
            ...s,
            journey_path_ref: DEFAULT_PATH_ID
        }));
    }

    return buckets;
  }, [faqData]);

  const products = processedData.products || {};
  const customerIntents = processedData.intents || {};
  const channels = processedData.channels || [];
  const responsibleParties = processedData.responsible_parties || [];
  const conditions = processedData.conditions || [];
  const latencyWindows = processedData.latencies || [];
  const escalationPaths = processedData.escalations || [];
  const valueLeakages = processedData.value_leakages || [];
  const evidenceAnchors = processedData.evidence_anchors || [];
  const contentAssets = processedData.content_assets || [];

  const journeyPaths = useMemo(() => {
    const grouped = {};
    (processedData.journey_paths || []).forEach(path => {
      const intentId = path.intent_ref;
      if (!grouped[intentId]) grouped[intentId] = [];
      grouped[intentId].push({
        ...path,
        name: path.name || "Standard Path",
        is_digital: (path.name || "").toLowerCase().includes('online')
      });
    });
    return grouped;
  }, [processedData.journey_paths]);

  const instructionSteps = useMemo(() => {
    const grouped = {};
    (processedData.steps || []).forEach(step => {
      const pathId = step.journey_path_ref || step.path_ref;
      const path = (processedData.journey_paths || []).find(p => p.id === pathId);
      
      if (path) {
        const intentId = path.intent_ref || "INT_UNKNOWN"; 
        if (!grouped[intentId]) grouped[intentId] = [];
        grouped[intentId].push({
          ...step,
          seq: step.sequence,
          action: step.action_type || 'VIEW', 
          verb: step.verb || 'Act',
          object: step.object || 'Process',
          text: step.instruction
        });
      }
    });
    Object.keys(grouped).forEach(k => grouped[k].sort((a,b) => a.seq - b.seq));
    return grouped;
  }, [processedData.steps, processedData.journey_paths]);

  // RESTORED STATIC DATA
  const opportunitySignals = [
    { id: 'OPP_ORCH', type: 'ORCHESTRATION', desc: 'Customer coordinates 4+ parties', readiness: 'HIGH', blockers: ['Dealer API', 'AutoVIN API'], product: 'PROD_LEASE', theme: 'Customer-as-Integrator' },
    { id: 'OPP_PROACT', type: 'PROACTIVE', desc: 'Milestone comms reduce inquiries', readiness: 'MEDIUM', blockers: ['Real-time data'], product: 'PROD_LEASE', theme: 'Unmanaged Latency' }
  ];

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

  const productMetrics = useMemo(() => {
    const metrics = {};
    Object.keys(products).forEach(pid => {
        metrics[pid] = { avg_cbi: 0, avg_cai: 0, avg_hdi: 0, intents: 0, sentiment: 0 };
    });

    Object.values(customerIntents).forEach(intent => {
        const pRef = (intent.product_refs || [])[0] || 'PROD_GENERAL';
        if (!metrics[pRef]) return;
        metrics[pRef].intents += 1;
        
        const steps = instructionSteps[intent.id] || [];
        let cbi = steps.length;
        let cai_parties = new Set();
        let manual_steps = 0;

        steps.forEach(s => {
            if (s.is_offline) cbi += 2.5;
            if (s.responsible_party_ref) cai_parties.add(s.responsible_party_ref);
            if (s.responsible_party_ref !== 'RP_TFS_DIG') manual_steps++;
        });

        metrics[pRef].avg_cbi += cbi;
        metrics[pRef].avg_cai += cai_parties.size;
        metrics[pRef].avg_hdi += (steps.length > 0 ? (manual_steps / steps.length) * 100 : 0);
    });

    Object.keys(metrics).forEach(pid => {
        if (metrics[pid].intents > 0) {
            metrics[pid].avg_cbi = Math.round((metrics[pid].avg_cbi / metrics[pid].intents) * 10) / 10;
            metrics[pid].avg_cai = Math.round((metrics[pid].avg_cai / metrics[pid].intents) * 10) / 10;
            metrics[pid].avg_hdi = Math.round(metrics[pid].avg_hdi / metrics[pid].intents);
        }
    });
    return metrics;
  }, [products, customerIntents, instructionSteps]);

  // ============================================================
  // 3. GRAPH DATA & PHYSICS (FIXED CRASHES & SCALING)
  // ============================================================
  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];
    const nodeIds = new Set();
    const addNode = (node) => {
        if (!nodeIds.has(node.id)) {
            nodes.push(node);
            nodeIds.add(node.id);
        }
    };
    const nodeExists = (id) => nodeIds.has(id);
    
    // SAFE LINK HELPER - Prevents white screen of death
    const addLink = (source, target, color, dist) => {
        if (nodeExists(source) && nodeExists(target)) {
            links.push({ source, target, color, distance: dist });
        }
    };

    // 1. PRODUCTS
    Object.values(products).forEach(p => {
        addNode({ id: p.id, name: p.name, type: 'Product', val: 50, color: '#0EA5E9' });
    });

    // 2. INTENTS
    Object.values(customerIntents).forEach(i => {
        addNode({ id: i.id, name: i.name, type: 'CustomerIntent', val: 20, color: '#A855F7' });
        (i.product_refs || []).forEach(prodId => {
             addLink(i.id, prodId, '#e9d5ff', 150);
        });
    });

    // 3. STEPS
    if (showSteps) {
        Object.values(instructionSteps).flat().forEach(s => {
             const label = s.instruction || "Step";
             addNode({ 
                id: s.id, 
                name: label.substring(0, 25) + "...", 
                full_text: label,
                type: 'InstructionStep', 
                val: 5, 
                color: '#94A3B8' 
            });
            const pathRef = s.journey_path_ref || s.path_ref;
            if (pathRef) {
                const path = (processedData.journey_paths || []).find(p => p.id === pathRef);
                if (path) {
                     const intentTarget = path.intent_ref || path.product;
                     addLink(intentTarget, s.id, '#cbd5e1', 50);
                }
            }
        });

        // 4. RESPONSIBLE PARTIES
        responsibleParties.forEach(rp => {
            addNode({ id: rp.id, name: rp.name, type: 'ResponsibleParty', val: 10, color: '#22C55E' });
            const relevantSteps = (processedData.steps || []).filter(s => s.responsible_party_ref === rp.id);
            relevantSteps.forEach(s => {
                 addLink(s.id, rp.id, 'rgba(34, 197, 94, 0.4)');
            });
        });

        // 5. DETAILS
        if (showDetails) {
            escalationPaths.forEach(e => {
                if (nodeExists(e.step_ref)) {
                    addNode({ id: e.id, name: "Call: " + e.contact_info, type: 'EscalationPath', val: 7, color: '#2DD4BF' });
                    addLink(e.step_ref, e.id, '#5eead4');
                }
            });
            latencyWindows.forEach(l => {
                if (nodeExists(l.step_ref)) {
                    addNode({ id: l.id, name: "Wait: " + l.duration + " " + l.unit, type: 'LatencyWindow', val: 6, color: '#FACC15' });
                    addLink(l.step_ref, l.id, '#fde047');
                }
            });
        }

        // 6. RULES
        if (showRules) {
            conditions.forEach(c => {
                if (nodeExists(c.step_ref)) {
                    addNode({ id: c.id, name: "IF: " + c.trigger, type: 'Condition', val: 6, color: '#EA580C' });
                    addLink(c.step_ref, c.id, '#fdba74');
                }
            });
        }
        
        // 7. EVIDENCE & ASSETS (Crash Prone Area - Fixed)
        if (showEvidence) {
            evidenceAnchors.forEach(e => {
                const relatedStep = (processedData.steps || []).find(s => s.evidence_ref === e.id);
                const relatedCond = conditions.find(c => c.evidence_ref === e.id);
                const relatedEsc = escalationPaths.find(esc => esc.evidence_ref === e.id);

                let sourceId = null;
                if (relatedStep && nodeExists(relatedStep.id)) sourceId = relatedStep.id;
                else if (relatedCond && nodeExists(relatedCond.id)) sourceId = relatedCond.id;
                else if (relatedEsc && nodeExists(relatedEsc.id)) sourceId = relatedEsc.id;

                if (sourceId) {
                    addNode({ id: e.id, name: "SOURCE", full_text: e.extracted_text, type: 'EvidenceAnchor', val: 3, color: '#64748B' });
                    addLink(sourceId, e.id, '#e2e8f0');
                }
            });

            contentAssets.forEach(asset => {
                 const relatedEvidence = evidenceAnchors.filter(e => e.source_url === asset.url && nodeExists(e.id));
                 const ownerProduct = (asset.products && asset.products[0]) || 'PROD_LEASE';
                 
                 if (relatedEvidence.length > 0 || nodeExists(ownerProduct)) {
                     addNode({ id: asset.id, name: "DOC: " + (asset.title || "Asset"), type: 'ContentAsset', val: 12, color: '#EC4899' });
                     relatedEvidence.forEach(e => {
                        addLink(e.id, asset.id, 'rgba(236, 72, 153, 0.4)');
                     });
                     if (relatedEvidence.length === 0) {
                        addLink(asset.id, ownerProduct, 'rgba(236, 72, 153, 0.15)', 300);
                     }
                 }
            });
        }
        
        // 8. LEAKAGE
        if (showLeakage) {
            valueLeakages.forEach(vl => {
                if (nodeExists(vl.step_ref)) {
                    addNode({ id: vl.id, name: "Leakage: " + vl.driver, type: 'ValueLeakage', val: 6, color: '#EF4444' });
                    addLink(vl.step_ref, vl.id, '#f87171');
                }
            });
        }
    }

    return { nodes, links };
  }, [showSteps, showRules, showDetails, showEvidence, showLeakage, processedData, products, customerIntents, instructionSteps, faqData]);

  // Handle Container Sizing (Auto-Resize for Graph)
  useEffect(() => {
    if (!graphContainerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setGraphDimensions({
            width: entry.contentRect.width, 
            height: entry.contentRect.height 
        });
      }
    });
    resizeObserver.observe(graphContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Handle Physics Re-Heating (For 400 Nodes)
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-400).distanceMax(800);
      fgRef.current.d3Force('link').distance(70);
      setTimeout(() => {
          if (fgRef.current) fgRef.current.zoomToFit(800, 50);
      }, 500);
    }
  }, [graphData, activeSection]);

  // ============================================================
  // RENDER: Graph
  // ============================================================
  const renderGraph = () => (
    <div className="h-[700px] border rounded-xl overflow-hidden bg-gray-900 relative flex flex-col">
        {/* CONTROLS OVERLAY */}
        <div className="absolute top-4 left-4 z-10 bg-black/60 text-white p-4 rounded-lg backdrop-blur-sm border border-gray-700 w-64">
            <h3 className="font-bold border-b border-gray-600 pb-2 mb-3">Graph Layers</h3>
            <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer hover:text-sky-300">
                    <input type="checkbox" checked={showSteps} onChange={e => setShowSteps(e.target.checked)} />
                    <span className="text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#94A3B8]"></span>
                        Show Steps
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-orange-300">
                    <input type="checkbox" checked={showRules} onChange={e => setShowRules(e.target.checked)} disabled={!showSteps} className="disabled:opacity-50" />
                    <span className="text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                        Show Rules
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-yellow-300">
                    <input type="checkbox" checked={showDetails} onChange={e => setShowDetails(e.target.checked)} disabled={!showSteps} className="disabled:opacity-50" />
                    <span className="text-sm flex items-center gap-2">
                        <span className="flex gap-0.5">
                            <span className="w-2 h-2 rounded-full bg-[#FACC15]"></span>
                            <span className="w-2 h-2 rounded-full bg-[#2DD4BF]"></span>
                        </span>
                        Show Details
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-pink-300">
                    <input type="checkbox" checked={showEvidence} onChange={e => setShowEvidence(e.target.checked)} disabled={!showSteps} className="disabled:opacity-50" />
                    <span className="text-sm flex items-center gap-2">
                        <span className="flex gap-0.5">
                            <span className="w-2 h-2 rounded-full bg-[#64748B] border border-gray-500"></span>
                            <span className="w-2 h-2 rounded-full bg-[#EC4899]"></span>
                        </span>
                        Show Evidence
                    </span>
                </label>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
                Nodes: {graphData.nodes.length} | Links: {graphData.links.length}
            </div>
        </div>
        
        <div ref={graphContainerRef} className="flex-1 w-full h-full">
            <ForceGraph2D
            ref={fgRef}
            width={graphDimensions.width}
            height={graphDimensions.height}
            graphData={graphData}
            nodeLabel="full_text"
            nodeColor="color"
            nodeVal={val => Math.pow(val, 0.7)} // Normalize node sizes
            nodeRelSize={4} 
            linkWidth={1}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            d3AlphaDecay={0.02} 
            d3VelocityDecay={0.3}
            warmupTicks={200}
            cooldownTicks={0}
            onNodeClick={node => {
                setSelectedNode(node);
                fgRef.current.centerAt(node.x, node.y, 400);
                fgRef.current.zoom(4, 400);
            }}
            onBackgroundClick={() => setSelectedNode(null)}
            />
        </div>

        {/* SELECTED NODE POPUP */}
        {selectedNode && (
            <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-xl z-10 max-w-lg mx-auto border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{selectedNode.type}</div>
                        <div className="text-lg font-bold text-gray-900">{selectedNode.full_text || selectedNode.name}</div>
                    </div>
                    <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none">&times;</button>
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded font-mono mb-2 inline-block">{selectedNode.id}</div>
                <div className="space-y-1 border-t pt-2 mt-2">
                    {Object.entries(selectedNode).map(([key, value]) => {
                        if (['id', 'name', 'full_text', 'type', 'val', 'color', 'x', 'y', 'vx', 'vy', 'index', '__indexColor'].includes(key)) return null;
                        return (
                            <div key={key} className="text-xs">
                                <span className="font-semibold text-gray-600">{key}: </span>
                                <span className="text-gray-800">{String(value).substring(0, 100)}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
    </div>
  );

  const renderHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">CX Knowledge Graph</h1>
        <p className="text-lg opacity-90">14-Entity Ontology with Product as Anchor</p>
        <div className="mt-4 flex gap-3 text-sm flex-wrap">
          <span className="bg-white/20 px-3 py-1 rounded-full">{Object.keys(allEntities).length} Entities</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">{Object.keys(products).length} Products</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">{Object.keys(customerIntents).length} Intents</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">{conditions.length} Rules</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-sky-500"></span>
          Product Landscape (NEW Entity)
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(products).map((p) => (
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
        <h2 className="text-xl font-bold mb-4">All 14 Building Blocks - Click to View Data</h2>
        <p className="text-xs text-gray-500 mb-2">Note: Clicking these will switch to List View.</p>
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

  const renderProducts = () => {
    const product = products[selectedProduct];
    const relatedIntents = Object.values(customerIntents).filter(i => i.product_refs && i.product_refs.includes(selectedProduct));
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
                      <span className={`px-2 py-0.5 rounded text-xs ${i.metrics?.cbi < 20 ? 'bg-green-100 text-green-700' : i.metrics?.cbi < 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>CBI {i.metrics?.cbi || 10}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">CAI {i.metrics?.cai || 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-3">Available Channels ({relatedChannels.length})</h4>
              <div className="grid grid-cols-3 gap-2">
                {relatedChannels.map((c) => (
                  <div key={c.id} className="p-3 bg-gray-5 rounded-lg border">
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
                    {intent.product_refs?.map(p => <span key={p} className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs">{products[p]?.name}</span>)}
                  </div>
                </div>
                <div className="flex gap-3 text-center">
                  <div><div className="text-2xl font-bold text-blue-600">{intent.metrics?.cbi || 10}</div><div className="text-xs">CBI</div></div>
                  <div><div className="text-2xl font-bold text-orange-600">{intent.metrics?.cai || 1}</div><div className="text-xs">CAI</div></div>
                  <div><div className="text-2xl font-bold text-red-600">{intent.metrics?.hdi || 0}%</div><div className="text-xs">HDI</div></div>
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
                        <div className="text-xs text-gray-600 mt-1">{s.instruction || s.text}</div>
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

  const renderMetrics = () => {
    const cbiData = Object.entries(customerIntents).map(([k, v]) => ({
      name: v.name.split(' ').slice(0, 2).join(' '),
      CBI: v.metrics?.cbi || 10,
      fill: (v.metrics?.cbi || 10) < 20 ? '#22C55E' : (v.metrics?.cbi || 10) < 30 ? '#F59E0B' : '#EF4444'
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
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'graph', icon: '🕸️', label: 'Graph' },
              { id: 'home', icon: '🏠', label: 'Home' },
              { id: 'products', icon: '📦', label: 'Products' },
              { id: 'entities', icon: '🧩', label: 'Entities' },
              { id: 'journeys', icon: '🗺️', label: 'Journeys' },
              { id: 'metrics', icon: '📊', label: 'Metrics' },
              { id: 'storyboard', icon: '📈', label: 'Story' },
              { id: 'datamodel', icon: '💻', label: 'Data' }
            ].map((n) => (
              <button key={n.id} onClick={() => setActiveSection(n.id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${activeSection === n.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <span>{n.icon}</span><span className="hidden md:inline">{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeSection === 'graph' && renderGraph()}
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