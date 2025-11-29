'use client';

import React, { useState, useEffect, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════════
// DATA - ALL ORIGINAL CONTENT WITH EMBEDDED LINKS
// ═══════════════════════════════════════════════════════════════════

const VISION_PILLARS = [
  { icon: '👥', title: 'Clients', desc: 'Personalized experiences & seamless interactions' },
  { icon: '💼', title: 'Staff', desc: 'AI-powered productivity & automation' },
  { icon: '🏢', title: 'Company Operations', desc: 'Intelligent workflows & insights' },
  { icon: '🤝', title: 'Business Partners', desc: 'Connected ecosystem & collaboration' },
  { icon: '🏗️', title: 'Projects & Buildings', desc: 'Smart construction & AI buildings' },
];

const ECOSYSTEM_CARDS = [
  { icon: '🏨', title: 'AI Buildings & Hotel', desc: 'Smart building management, energy optimization, and guest experience automation powered by IoT sensors and predictive analytics.' },
  { icon: '📱', title: 'AI Apps & Solutions', desc: 'Intelligent applications for clients, brokers, vendors, and staff with predictive capabilities and real-time insights.' },
  { icon: '📊', title: 'AI in CRM & Sales', desc: 'Predictive insights, client profiling, market forecasting, and automated follow-up systems with ML-driven recommendations.' },
  { icon: '⚙️', title: 'AI in Operations', desc: 'Policy automation, HR assistance, finance validations, reporting, and business bots streamlining every process.' },
];

const ONEAPP_SPOKES = [
  { label: '👥 Staff', desc: 'HR, dashboards, workflows' },
  { label: '🏠 Clients', desc: 'Payments, amenities, services' },
  { label: '🤝 Brokers', desc: 'Availability, commissions' },
  { label: '🏢 Buildings', desc: 'AI control, automation' },
  { label: '🏛️ Company', desc: 'Operations, analytics, insights' },
];

const KPI_DATA = [
  { icon: '🚀', value: '26+', label: 'Platforms Live by Dec 2026' },
  { icon: '⚡', value: '60%+', label: 'Process Automation' },
  { icon: '👥', value: '90%+', label: 'User Adoption Rate' },
  { icon: '🔗', value: '100%', label: 'Data Integration' },
  { icon: '🤖', value: '80%+', label: 'AI-Enhanced Decisions' },
];

// INITIATIVES WITH ALL ORIGINAL LINKS
const INITIATIVES = {
  delivered: [
    {
      name: 'Power BI Dashboards Suite',
      tag: 'Analytics',
      owner: 'DJ',
      desc: 'Collections, KPIs, Project SAR, Sales Performance',
      status: 'live',
      link: 'https://app.powerbi.com/groups/f2d2c1a5-2e7e-4c1c-97f3-013fff2d87b0/reports/3278c9ea-41c8-4213-9448-cbd2a0c64783/63eb043cb8daa3255755?experience=power-bi'
    },
    {
      name: 'Projects Live Stack Diagram',
      tag: 'Visualization',
      owner: 'DJ',
      desc: 'Live unit visualization & inventory management',
      status: 'live',
    },
    {
      name: 'Digital Discount Calculator',
      tag: 'Pricing',
      owner: 'DJ',
      desc: 'NPV-linked payment & discount calculations',
      status: 'live',
      link: 'https://deal-deal-evaluator.lovable.app/'
    },
    {
      name: 'Sales Gateway',
      tag: 'Sales',
      owner: 'DJ',
      desc: 'Discount control linked to targets',
      status: 'live',
      link: 'https://app.powerbi.com/groups/f2d2c1a5-2e7e-4c1c-97f3-013fff2d87b0/reports/3cd280c3-fccf-46be-a8cb-9eec987c6140/da2b24b799db8b5bcc01?experience=power-bi'
    },
    {
      name: 'Plots Pricing Benchmark Map',
      tag: 'Pricing',
      owner: 'Ahmed',
      desc: 'Interactive land pricing visualization',
      status: 'live',
      link: 'https://ahmedaliabdelfattaah-spec.github.io/land-psf-map/'
    },
    {
      name: 'Interactive Strategy Map',
      tag: 'Strategy',
      owner: 'Ahmed',
      desc: '2026 Projects Plan - Prezi Version',
      status: 'live',
      link: 'https://prezi.com/view/fcITITqI0kMERYYL6eZI/'
    },
    {
      name: 'Land Tracker',
      tag: 'Analytics',
      owner: 'DJ/Ahmed',
      desc: 'Power BI Report - Completed',
      status: 'live',
      link: 'https://app.powerbi.com/groups/f2d2c1a5-2e7e-4c1c-97f3-013fff2d87b0/reports/2025813c-add7-4c90-b1ca-ebfeafd94dab/f3a68492efbfd4d89eec?experience=power-bi'
    },
    {
      name: 'LOI Tracker',
      tag: 'Analytics',
      owner: 'DJ/Ahmed',
      desc: 'Power BI Report - Completed',
      status: 'live',
      link: 'https://app.powerbi.com/groups/f2d2c1a5-2e7e-4c1c-97f3-013fff2d87b0/reports/ec980ea8-cec6-4dc7-9cca-300c5c98ae3c/e9fb6805dce00d5148d0?experience=power-bi'
    },
  ],
  inProgress: [
    { name: 'HR Chatbot (MVP)', tag: 'AI/HR', owner: 'DJ', date: 'Jan 6 → Jan 31', priority: 'medium' },
    { name: 'Salesforce Implementation', tag: 'CRM', owner: 'Team', date: 'Jan 6 → Mar 31', priority: 'critical' },
    {
      name: 'Price Prism Builder',
      tag: 'Pricing Strategy',
      owner: 'DJ',
      date: 'Jan 6 → Feb 28',
      priority: 'high',
      link: 'https://price-prism-builder.lovable.app/'
    },
    { name: 'iLeads App', tag: 'Sales', owner: 'Jason/Amr', date: 'Jan 6 → Mar 31', priority: 'high' },
    { name: 'Sales & Inventory Chatbot', tag: 'AI/Sales', owner: 'DJ', date: 'Jan 15 → Feb 28', priority: 'high' },
    { name: 'Customer Portal v1', tag: 'Customer', owner: 'Team', date: 'Feb 1 → Apr 30', priority: 'high' },
    { name: 'Broker Commission Portal', tag: 'Finance', owner: 'DJ', date: 'Feb 15 → Mar 31', priority: 'medium' },
    { name: 'Document Management System', tag: 'Operations', owner: 'Team', date: 'Jan 15 → Mar 15', priority: 'medium' },
    { name: 'Inventory Allocation Engine', tag: 'Sales', owner: 'DJ', date: 'Feb 1 → Mar 31', priority: 'high' },
  ],
  q1q2: [
    { name: 'AI Commission Engine', tag: 'Finance', priority: 'high', desc: 'Automated commission calculations with ML-based validation' },
    { name: 'AI Feasibility + Cashflow Engine', tag: 'Strategy', priority: 'high', desc: 'Predictive financial modeling for project viability' },
    { name: 'VR Integration', tag: 'Sales', priority: 'medium', desc: 'Virtual reality property tours' },
    { name: 'Advanced Analytics Dashboard', tag: 'Analytics', priority: 'high', desc: 'Executive-level insights and forecasting' },
    { name: 'Predictive Lead Scoring', tag: 'CRM', priority: 'medium', desc: 'ML-based lead qualification' },
  ],
  q2q3: [
    { name: 'HR Tool (Comprehensive)', tag: 'HR', priority: 'high', desc: 'Full HRMS with AI assistance' },
    { name: 'Vendor Portal', tag: 'Operations', priority: 'medium', desc: 'Supplier management and procurement' },
    { name: 'Finance Automation Suite', tag: 'Finance', priority: 'high', desc: 'End-to-end financial workflows' },
    { name: 'Construction Progress Tracker', tag: 'Projects', priority: 'medium', desc: 'Real-time project monitoring' },
  ],
  q3q4: [
    { name: 'Client Portal', tag: 'Customer', priority: 'high', desc: 'Full-featured client self-service' },
    { name: 'Broker Portal', tag: 'Sales', priority: 'high', desc: 'Comprehensive broker management' },
    { name: 'Building Management System', tag: 'Operations', priority: 'high', desc: 'IoT-enabled facility management' },
    { name: 'AI Concierge Service', tag: 'Customer', priority: 'medium', desc: 'Intelligent customer support' },
    { name: 'Market Intelligence Platform', tag: 'Strategy', priority: 'high', desc: 'Competitive analysis and trends' },
    { name: 'Mobile App Suite', tag: 'Technology', priority: 'high', desc: 'Native apps for all stakeholders' },
  ],
  oneApp: [
    { name: 'Staff Module', tag: 'HR', priority: 'medium', desc: 'Employee self-service and workflows' },
    { name: 'Client Module', tag: 'Customer', priority: 'medium', desc: 'Payment tracking and services' },
    { name: 'Broker Module', tag: 'Sales', priority: 'medium', desc: 'Inventory and commission access' },
    { name: 'Building Module', tag: 'Operations', priority: 'medium', desc: 'Smart building controls' },
    { name: 'Company Module', tag: 'Analytics', priority: 'medium', desc: 'Enterprise dashboards' },
    { name: 'Visitor Module', tag: 'Customer', priority: 'low', desc: 'Guest management and access' },
    { name: 'Vendor Module', tag: 'Operations', priority: 'low', desc: 'Supplier collaboration' },
  ],
};

const PHASE_TABS = [
  { id: 'delivered', label: 'Delivered (8)', icon: '✓' },
  { id: 'inProgress', label: 'In Progress (9)', icon: '⚡' },
  { id: 'q1q2', label: 'Q1-Q2: AI & Pricing (5)', icon: '🤖' },
  { id: 'q2q3', label: 'Q2-Q3: Infrastructure (4)', icon: '🏗️' },
  { id: 'q3q4', label: 'Q3-Q4: Portals (6)', icon: '🌐' },
  { id: 'oneApp', label: 'ONE App (7)', icon: '📱' },
];

// LEADERSHIP TEAM DATA
const LEADERSHIP_TEAM = [
  { initial: 'J', name: "Jason D'Costa", role: 'Strategic Operations, Platforms, Solutions & AI Concepts' },
  { initial: 'D', name: 'Dhananjay Shembekar', role: 'MIS, Platforms & AI Integrations' },
  { initial: 'A', name: 'Ahmed Saad', role: 'Financials, Project Control & Opportunity Analysis' },
  { initial: 'T', name: 'Tamara Strygun', role: 'Coordination, Solution Funnel Management & Requirements Monitoring' },
  { initial: 'N', name: 'Norton Araujo', role: 'Inventory Control & Management' },
];

// ═══════════════════════════════════════════════════════════════════
// FLOATING PARTICLES COMPONENT
// ═══════════════════════════════════════════════════════════════════

const FloatingParticles: React.FC = () => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${15 + Math.random() * 10}s`,
    })), []
  );

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// PROJECT BRIEF MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface ProjectBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewBrief: () => void;
}

const ProjectBriefModal: React.FC<ProjectBriefModalProps> = ({ isOpen, onClose, onViewBrief }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-badge">Current Launch</div>
        <h2 className="modal-title">
          One <span className="gradient-text">Residence</span>
        </h2>
        <p className="modal-subtitle">
          Al Reem Island&apos;s most anticipated luxury development. 196 premium units across 31 floors
          with Abu Dhabi&apos;s first residential Hyperbaric Oxygen Therapy facility. A new standard in
          wellness-focused living.
        </p>
        <div className="modal-stats">
          <div className="modal-stat">
            <div className="modal-stat-value">196</div>
            <div className="modal-stat-label">Units</div>
          </div>
          <div className="modal-stat">
            <div className="modal-stat-value">452M</div>
            <div className="modal-stat-label">AED Revenue</div>
          </div>
          <div className="modal-stat">
            <div className="modal-stat-value">2028</div>
            <div className="modal-stat-label">Completion</div>
          </div>
        </div>
        <button className="modal-button" onClick={onViewBrief}>
          View Full Project Brief →
        </button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MAIN HOME COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function Home() {
  const [activePhase, setActivePhase] = useState('delivered');
  const [currentPage, setCurrentPage] = useState('home');
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenProjectModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowProjectModal(true);
        sessionStorage.setItem('hasSeenProjectModal', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleViewBrief = () => {
    setShowProjectModal(false);
    setCurrentPage('project');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderInitiatives = () => {
    const items = INITIATIVES[activePhase as keyof typeof INITIATIVES] || [];
    const phaseInfo = PHASE_TABS.find(t => t.id === activePhase);

    const getCategoryTitle = () => {
      switch (activePhase) {
        case 'delivered': return 'Delivered Platforms - 8 Live Systems';
        case 'inProgress': return 'In Progress - 9 Active Initiatives';
        case 'q1q2': return 'Q1-Q2 2026 - AI & Pricing Focus';
        case 'q2q3': return 'Q2-Q3 2026 - Infrastructure';
        case 'q3q4': return 'Q3-Q4 2026 - Portal Launches';
        case 'oneApp': return 'ONE App Modules - Phased Rollout';
        default: return '';
      }
    };

    return (
      <div className="initiative-category">
        <div className="category-header">
          <div className="category-icon">{phaseInfo?.icon}</div>
          <h3>{getCategoryTitle()}</h3>
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="initiative-card">
            <h4>
              {item.name}
              {'link' in item && item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="view-link">
                  View →
                </a>
              )}
            </h4>
            <div className="meta">
              <span className="tag">🏷️ {item.tag}</span>
              {'owner' in item && <span>👤 {item.owner}</span>}
              {'date' in item && <span>📅 {item.date}</span>}
              {'status' in item && <span className="status-badge live">LIVE</span>}
              {'priority' in item && (
                <span className={`priority-badge ${item.priority}`}>{item.priority.toUpperCase()}</span>
              )}
            </div>
            {'desc' in item && <div className="desc">📊 {item.desc}</div>}
          </div>
        ))}
      </div>
    );
  };

  if (currentPage === 'project') {
    return <ProjectBriefPage onNavigate={setCurrentPage} />;
  }

  return (
    <div className="App">
      <div className="bg-animation" />
      <div className="grid-overlay" />
      <FloatingParticles />

      <nav className="nav">
        <div className="logo">ONE <span>DEVELOPMENT</span></div>
        <div className="nav-links">
          <a onClick={() => scrollToSection('vision')}>Vision</a>
          <a onClick={() => scrollToSection('ecosystem')}>Ecosystem</a>
          <a onClick={() => scrollToSection('oneapp')}>ONE App</a>
          <a onClick={() => scrollToSection('roadmap')}>Roadmap</a>
          <a onClick={() => scrollToSection('team')}>Team</a>
          <a onClick={() => setCurrentPage('project')}>Project Brief</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">2026 Strategic Blueprint</div>
        <h1><span className="gradient-text">Digital</span> Transformation</h1>
        <p className="hero-subtitle">
          MIS, Platforms & AI Integrations powering ONE Development&apos;s vision
          for intelligent real estate operations across the UAE.
        </p>
        <div className="stats-row">
          <div className="stat"><div className="stat-value">8</div><div className="stat-label">Platforms Delivered</div></div>
          <div className="stat"><div className="stat-value">9</div><div className="stat-label">In Development</div></div>
          <div className="stat"><div className="stat-value">14+</div><div className="stat-label">Upcoming Initiatives</div></div>
        </div>
      </section>

      <section id="vision" className="section">
        <div className="section-header">
          <div className="section-tag">The AI Vision</div>
          <h2 className="section-title">Five Pillars of Intelligence</h2>
          <p className="section-subtitle">A comprehensive AI strategy touching every aspect of our business ecosystem</p>
        </div>
        <div className="vision-grid">
          {VISION_PILLARS.map((pillar, idx) => (
            <div key={idx} className="vision-card">
              <div className="vision-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="section">
        <div className="section-header">
          <div className="section-tag">AI Ecosystem</div>
          <h2 className="section-title">Transformations</h2>
          <p className="section-subtitle">Four key domains driving our digital evolution</p>
        </div>
        <div className="ecosystem-grid">
          {ECOSYSTEM_CARDS.map((card, idx) => (
            <div key={idx} className="ecosystem-card">
              <div className="ecosystem-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="oneapp" className="oneapp-section">
        <div className="section-header">
          <div className="section-tag">The Ultimate Platform</div>
          <h2 className="section-title">The ONE App</h2>
          <p className="section-subtitle">A unified, intelligent ecosystem connecting every stakeholder under one digital umbrella.</p>
        </div>
        <div className="oneapp-visual">
          <div className="oneapp-spoke" style={{ top: '5%', left: '50%', transform: 'translateX(-50%)' }}>
            {ONEAPP_SPOKES[0].label}<small>{ONEAPP_SPOKES[0].desc}</small>
          </div>
          <div className="oneapp-spoke" style={{ top: '30%', right: '8%' }}>
            {ONEAPP_SPOKES[1].label}<small>{ONEAPP_SPOKES[1].desc}</small>
          </div>
          <div className="oneapp-center"><span>ONE</span><span>APP</span></div>
          <div className="oneapp-spoke" style={{ bottom: '30%', right: '8%' }}>
            {ONEAPP_SPOKES[2].label}<small>{ONEAPP_SPOKES[2].desc}</small>
          </div>
          <div className="oneapp-spoke" style={{ bottom: '5%', left: '50%', transform: 'translateX(-50%)' }}>
            {ONEAPP_SPOKES[3].label}<small>{ONEAPP_SPOKES[3].desc}</small>
          </div>
          <div className="oneapp-spoke" style={{ top: '30%', left: '8%' }}>
            {ONEAPP_SPOKES[4].label}<small>{ONEAPP_SPOKES[4].desc}</small>
          </div>
        </div>
      </section>

      <section id="roadmap" className="section action-plan-section">
        <div className="section-header">
          <div className="section-tag">2026 Digital Transformation</div>
          <h2 className="section-title">Strategic Execution Roadmap</h2>
        </div>
        <div className="timeline-container">
          <div className="timeline-bar">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => (
              <div key={idx} className="timeline-quarter">
                <div className="quarter-label">{q}</div>
                <div className="quarter-date">{['Jan - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Dec'][idx]} 2026</div>
              </div>
            ))}
          </div>
        </div>
        <div className="kpi-dashboard">
          {KPI_DATA.map((kpi, idx) => (
            <div key={idx} className="kpi-card">
              <div className="kpi-icon">{kpi.icon}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-label">{kpi.label}</div>
            </div>
          ))}
        </div>
        <div className="phase-navigation">
          {PHASE_TABS.map(tab => (
            <button
              key={tab.id}
              className={`phase-tab ${activePhase === tab.id ? 'active' : ''}`}
              onClick={() => setActivePhase(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="initiatives-grid">{renderInitiatives()}</div>
      </section>

      {/* Leadership Team Section */}
      <section id="team" className="section">
        <div className="section-header">
          <div className="section-tag">The Team</div>
          <h2 className="section-title">Transformation Leaders</h2>
          <p className="section-subtitle">Strategy & Digital Transformation Department</p>
        </div>
        <div className="team-grid">
          {LEADERSHIP_TEAM.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-avatar">{member.initial}</div>
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">ONE <span>DEVELOPMENT</span></div>
        <p>Strategy Team led by Amr Kandeel & Jason D&apos;Costa | Presented to Mr. Ali – Chairman</p>
        <p>Strategy & Digital Transformation Department</p>
        <div className="footer-meta">
          <span>Version: Final – 2026 Strategy</span>
          <span>www.oneuae.com</span>
        </div>
      </footer>

      <ProjectBriefModal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} onViewBrief={handleViewBrief} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROJECT BRIEF PAGE - GOD-TIER CHAIRMAN EXPERIENCE
// ═══════════════════════════════════════════════════════════════════

const PROJECT_TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'units', label: 'Unit Mix', icon: '🏠' },
  { id: 'floors', label: 'Interactive View', icon: '🏗️' },
  { id: 'financials', label: 'Financials', icon: '💰' },
  { id: 'timeline', label: 'Timeline', icon: '📈' },
  { id: 'amenities', label: 'Amenities', icon: '✨' },
];

const ProjectBriefPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tabKey, setTabKey] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedUnitType, setSelectedUnitType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'night'>('night');

  const handleTabChange = (tab: string) => {
    if (tab !== activeTab) {
      setTabKey(prev => prev + 1);
      setActiveTab(tab);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // REAL PROJECT DATA FROM PROJECT BRIEF V10
  // ═══════════════════════════════════════════════════════════════════

  const PROJECT = {
    name: 'One Residence',
    location: 'Al Reem Island, Abu Dhabi',
    masterDev: 'ADGM',
    developer: 'One Development',
    consultant: 'Terra PMC',
    contractor: 'TBD',
    landTitle: 'Private',
    projectType: 'Mixed-Use Residential + Retail',
    furniture: 'Premium Finishing',
    completion: 'June 2028',
    launchDate: '09 December 2025',
    plot: 'P57',
    zone: 'RM (Residential Mixed)',
    sector: 'C7',
    // Land & GFA
    landArea: '51,772 ft²',
    landAreaSqm: '4,809 sqm',
    totalBUA: '482,000 ft²',
    totalGFA: '305,837 ft²',
    sellableArea: '290,066 ft²',
    efficiency: '94.85%',
    parking: 244,
    height: 'G+31',
    floors: 32,
    units: 196,
    totalUnits: 196,
    totalRevenue: 452228756,
    avgUnitPrice: 2307290,
  };

  // Unit types with REAL data from Excel (26.11.25)
  const UNIT_TYPES = [
    { type: '1BR Simplex', subtype: 'Simplex', units: 63, sizeRange: '875 - 1,300', avgSize: 985, priceRange: '1.41M - 2.14M', avgPrice: 1578158, color: '#3b82f6', features: ['Store', 'Simplex'], parking: 1 },
    { type: '1BR Duplex', subtype: 'Duplex', units: 13, sizeRange: '968 - 1,309', avgSize: 994, priceRange: '1.63M - 2.33M', avgPrice: 1756495, color: '#22c55e', features: ["Maid's Room", 'Store', 'Duplex'], parking: 1 },
    { type: '2BR Simplex', subtype: 'Simplex', units: 74, sizeRange: '1,371 - 1,867', avgSize: 1496, priceRange: '1.97M - 2.76M', avgPrice: 2229205, color: '#eab308', features: ["Maid's Room", 'Store', 'Simplex'], parking: 1 },
    { type: '2BR Duplex', subtype: 'Duplex', units: 11, sizeRange: '1,935 - 2,421', avgSize: 2038, priceRange: '3.06M - 3.93M', avgPrice: 3264474, color: '#f97316', features: ["Maid's Room", 'Store', 'Duplex'], parking: 1 },
    { type: '3BR Simplex', subtype: 'Simplex', units: 20, sizeRange: '1,926 - 2,485', avgSize: 2232, priceRange: '2.82M - 3.67M', avgPrice: 3325911, color: '#a855f7', features: ["Maid's Room", 'Store', 'Simplex'], parking: 2 },
    { type: '3BR Duplex', subtype: 'Duplex', units: 12, sizeRange: '2,275 - 2,786', avgSize: 2361, priceRange: '3.28M - 4.57M', avgPrice: 3653361, color: '#c084fc', features: ["Maid's Room", 'Store', 'Duplex'], parking: 2 },
    { type: '4BR Duplex', subtype: 'Duplex', units: 2, sizeRange: '3,196 - 3,352', avgSize: 3274, priceRange: '5.68M - 5.88M', avgPrice: 5777111, color: '#ec4899', features: ["Maid's Room", 'Store', 'Corner Unit', 'Duplex'], parking: 2 },
    { type: 'Retail', subtype: 'Ground Floor', units: 1, sizeRange: '2,368', avgSize: 2368, priceRange: '7.19M', avgPrice: 7187111, color: '#6366f1', features: ['Commercial Space', '15 Parking Spots'], parking: 15 },
  ];

  // Aggregated unit summary
  const UNIT_SUMMARY = [
    { type: '1 Bedroom', units: 76, color: '#3b82f6', simplex: 63, duplex: 13 },
    { type: '2 Bedroom', units: 85, color: '#eab308', simplex: 74, duplex: 11 },
    { type: '3 Bedroom', units: 32, color: '#a855f7', simplex: 20, duplex: 12 },
    { type: '4 Bedroom', units: 2, color: '#ec4899', simplex: 0, duplex: 2 },
    { type: 'Retail', units: 1, color: '#6366f1', simplex: 0, duplex: 0 },
  ];

  // Floor distribution with real data from Excel (26.11.25)
  const FLOOR_DATA = [
    { floor: 'GF', units: 1, types: { 'retail': 1 }, price: 7187111 },
    { floor: '1', units: 8, types: { '2BD': 7, '1BD': 1 }, price: 24070888 },
    { floor: '3', units: 10, types: { '1BS': 9, '2BS': 1 }, price: 16295110 },
    { floor: '4', units: 10, types: { '1BS': 9, '2BS': 1 }, price: 16335110 },
    { floor: '5', units: 10, types: { '1BS': 9, '2BS': 1 }, price: 16272110 },
    { floor: '6', units: 10, types: { '1BS': 9, '2BS': 1 }, price: 16454110 },
    { floor: '7', units: 10, types: { '1BS': 9, '2BS': 1 }, price: 16597110 },
    { floor: '8', units: 10, types: { '1BS': 9, '2BS': 1 }, price: 16674110 },
    { floor: '9', units: 15, types: { '1BD': 11, '2BD': 4 }, price: 32879665 },
    { floor: '11', units: 9, types: { '2BS': 6, '1BS': 3 }, price: 17920999 },
    { floor: '12', units: 9, types: { '2BS': 6, '1BS': 3 }, price: 17966999 },
    { floor: '13', units: 9, types: { '2BS': 6, '1BS': 3 }, price: 18157999 },
    { floor: '14', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 17279777 },
    { floor: '15', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 17256777 },
    { floor: '16', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 17228777 },
    { floor: '17', units: 8, types: { '3BD': 7, '1BD': 1 }, price: 29052888 },
    { floor: '19', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 18013777 },
    { floor: '20', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 17602777 },
    { floor: '21', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 18054777 },
    { floor: '22', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 18003777 },
    { floor: '23', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 18078777 },
    { floor: '24', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 18271777 },
    { floor: '25', units: 7, types: { '3BS': 2, '2BS': 5 }, price: 18438777 },
    { floor: '26', units: 7, types: { '4BD': 2, '3BD': 5 }, price: 28134777 },
  ];

  // Detailed unit data for grid stack visualization
  interface FloorUnit {
    id: string;
    unit: string;
    type: string;
    bedrooms: string;
    area: number;
    price: number;
    status: 'available' | 'reserved' | 'sold' | 'blocked';
    view: string;
    features: string[];
  }

  // Complete inventory of all 196 units from Excel data (26.11.25)
  const INVENTORY_UNITS: Record<string, FloorUnit[]> = {
    'GF': [
      { id: 'GF-01', unit: 'G01', type: 'retail', bedrooms: 'Retail', area: 2368, price: 7187111, status: 'blocked' as const, view: 'City Wind', features: ["Commercial Space", "15 Parking Spots"] },
    ],
    '1': [
      { id: '1-01', unit: '101', type: '2BD', bedrooms: '2BR', area: 2421, price: 3901111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '1-02', unit: '102', type: '2BD', bedrooms: '2BR', area: 1942, price: 3059111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '1-03', unit: '103', type: '1BD', bedrooms: '1BR', area: 970, price: 1631111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '1-04', unit: '104', type: '2BD', bedrooms: '2BR', area: 1941, price: 3057111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '1-05', unit: '105', type: '2BD', bedrooms: '2BR', area: 1941, price: 3057111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '1-06', unit: '106', type: '2BD', bedrooms: '2BR', area: 1941, price: 3057111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '1-07', unit: '107', type: '2BD', bedrooms: '2BR', area: 2030, price: 3147111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '1-08', unit: '108', type: '2BD', bedrooms: '2BR', area: 2041, price: 3161111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
    ],
    '3': [
      { id: '3-01', unit: '301', type: '1BS', bedrooms: '1BR', area: 1107, price: 1805111, status: 'blocked' as const, view: 'Canal East', features: ["Store", "Simplex"] },
      { id: '3-02', unit: '302', type: '1BS', bedrooms: '1BR', area: 962, price: 1506111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '3-03', unit: '303', type: '1BS', bedrooms: '1BR', area: 963, price: 1508111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '3-04', unit: '304', type: '1BS', bedrooms: '1BR', area: 960, price: 1504111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '3-05', unit: '305', type: '1BS', bedrooms: '1BR', area: 962, price: 1506111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '3-06', unit: '306', type: '1BS', bedrooms: '1BR', area: 962, price: 1506111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '3-07', unit: '307', type: '2BS', bedrooms: '2BR', area: 1687, price: 2334111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '3-08', unit: '308', type: '1BS', bedrooms: '1BR', area: 999, price: 1543111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '3-09', unit: '309', type: '1BS', bedrooms: '1BR', area: 998, price: 1541111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '3-10', unit: '310', type: '1BS', bedrooms: '1BR', area: 998, price: 1541111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
    ],
    '4': [
      { id: '4-01', unit: '401', type: '1BS', bedrooms: '1BR', area: 1228, price: 1992111, status: 'blocked' as const, view: 'Canal East', features: ["Store", "Simplex"] },
      { id: '4-02', unit: '402', type: '1BS', bedrooms: '1BR', area: 962, price: 1518111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '4-03', unit: '403', type: '1BS', bedrooms: '1BR', area: 961, price: 1517111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '4-04', unit: '404', type: '1BS', bedrooms: '1BR', area: 961, price: 1517111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '4-05', unit: '405', type: '1BS', bedrooms: '1BR', area: 961, price: 1517111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '4-06', unit: '406', type: '1BS', bedrooms: '1BR', area: 961, price: 1517111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '4-07', unit: '407', type: '2BS', bedrooms: '2BR', area: 1604, price: 2251111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '4-08', unit: '408', type: '1BS', bedrooms: '1BR', area: 963, price: 1503111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '4-09', unit: '409', type: '1BS', bedrooms: '1BR', area: 961, price: 1501111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '4-10', unit: '410', type: '1BS', bedrooms: '1BR', area: 961, price: 1501111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
    ],
    '5': [
      { id: '5-01', unit: '501', type: '1BS', bedrooms: '1BR', area: 1232, price: 2010111, status: 'blocked' as const, view: 'Canal East', features: ["Store", "Simplex"] },
      { id: '5-02', unit: '502', type: '1BS', bedrooms: '1BR', area: 964, price: 1529111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '5-03', unit: '503', type: '1BS', bedrooms: '1BR', area: 964, price: 1529111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '5-04', unit: '504', type: '1BS', bedrooms: '1BR', area: 963, price: 1528111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '5-05', unit: '505', type: '1BS', bedrooms: '1BR', area: 890, price: 1427111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '5-06', unit: '506', type: '1BS', bedrooms: '1BR', area: 961, price: 1526111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '5-07', unit: '507', type: '2BS', bedrooms: '2BR', area: 1619, price: 2284111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '5-08', unit: '508', type: '1BS', bedrooms: '1BR', area: 963, price: 1514111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '5-09', unit: '509', type: '1BS', bedrooms: '1BR', area: 891, price: 1414111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '5-10', unit: '510', type: '1BS', bedrooms: '1BR', area: 961, price: 1510111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
    ],
    '6': [
      { id: '6-01', unit: '601', type: '1BS', bedrooms: '1BR', area: 1232, price: 2023111, status: 'blocked' as const, view: 'Canal East', features: ["Store", "Simplex"] },
      { id: '6-02', unit: '602', type: '1BS', bedrooms: '1BR', area: 892, price: 1439111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '6-03', unit: '603', type: '1BS', bedrooms: '1BR', area: 961, price: 1535111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '6-04', unit: '604', type: '1BS', bedrooms: '1BR', area: 961, price: 1536111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '6-05', unit: '605', type: '1BS', bedrooms: '1BR', area: 961, price: 1536111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '6-06', unit: '606', type: '1BS', bedrooms: '1BR', area: 961, price: 1536111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '6-07', unit: '607', type: '2BS', bedrooms: '2BR', area: 1683, price: 2381111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '6-08', unit: '608', type: '1BS', bedrooms: '1BR', area: 892, price: 1425111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '6-09', unit: '609', type: '1BS', bedrooms: '1BR', area: 961, price: 1521111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '6-10', unit: '610', type: '1BS', bedrooms: '1BR', area: 961, price: 1521111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
    ],
    '7': [
      { id: '7-01', unit: '701', type: '1BS', bedrooms: '1BR', area: 1300, price: 2135111, status: 'blocked' as const, view: 'Canal East', features: ["Store", "Simplex"] },
      { id: '7-02', unit: '702', type: '1BS', bedrooms: '1BR', area: 964, price: 1549111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '7-03', unit: '703', type: '1BS', bedrooms: '1BR', area: 964, price: 1549111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '7-04', unit: '704', type: '1BS', bedrooms: '1BR', area: 892, price: 1448111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '7-05', unit: '705', type: '1BS', bedrooms: '1BR', area: 961, price: 1545111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '7-06', unit: '706', type: '1BS', bedrooms: '1BR', area: 961, price: 1546111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '7-07', unit: '707', type: '2BS', bedrooms: '2BR', area: 1550, price: 2232111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '7-08', unit: '708', type: '1BS', bedrooms: '1BR', area: 963, price: 1532111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '7-09', unit: '709', type: '1BS', bedrooms: '1BR', area: 961, price: 1530111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '7-10', unit: '710', type: '1BS', bedrooms: '1BR', area: 961, price: 1530111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
    ],
    '8': [
      { id: '8-01', unit: '801', type: '1BS', bedrooms: '1BR', area: 1232, price: 2048111, status: 'blocked' as const, view: 'Canal East', features: ["Store", "Simplex"] },
      { id: '8-02', unit: '802', type: '1BS', bedrooms: '1BR', area: 964, price: 1559111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '8-03', unit: '803', type: '1BS', bedrooms: '1BR', area: 964, price: 1559111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '8-04', unit: '804', type: '1BS', bedrooms: '1BR', area: 892, price: 1457111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '8-05', unit: '805', type: '1BS', bedrooms: '1BR', area: 961, price: 1554111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '8-06', unit: '806', type: '1BS', bedrooms: '1BR', area: 961, price: 1556111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '8-07', unit: '807', type: '2BS', bedrooms: '2BR', area: 1683, price: 2414111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '8-08', unit: '808', type: '1BS', bedrooms: '1BR', area: 892, price: 1444111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '8-09', unit: '809', type: '1BS', bedrooms: '1BR', area: 961, price: 1541111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '8-10', unit: '810', type: '1BS', bedrooms: '1BR', area: 961, price: 1541111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
    ],
    '9': [
      { id: '9-01', unit: '901', type: '1BD', bedrooms: '1BR', area: 1309, price: 2327111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-02', unit: '902', type: '1BD', bedrooms: '1BR', area: 969, price: 1710111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-03', unit: '903', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-04', unit: '904', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-05', unit: '905', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-06', unit: '906', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-07', unit: '907', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-08', unit: '908', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-09', unit: '909', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-10', unit: '910', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-11', unit: '911', type: '1BD', bedrooms: '1BR', area: 968, price: 1708111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-12', unit: '912', type: '2BD', bedrooms: '2BR', area: 2356, price: 3929111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-13', unit: '913', type: '2BD', bedrooms: '2BR', area: 1935, price: 3180111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-14', unit: '914', type: '2BD', bedrooms: '2BR', area: 1935, price: 3180111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '9-15', unit: '915', type: '2BD', bedrooms: '2BR', area: 1935, price: 3180111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
    ],
    '11': [
      { id: '11-01', unit: '1101', type: '2BS', bedrooms: '2BR', area: 1641, price: 2439111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '11-02', unit: '1102', type: '2BS', bedrooms: '2BR', area: 1460, price: 2088111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '11-03', unit: '1103', type: '1BS', bedrooms: '1BR', area: 1093, price: 1774111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '11-04', unit: '1104', type: '2BS', bedrooms: '2BR', area: 1431, price: 2052111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '11-05', unit: '1105', type: '2BS', bedrooms: '2BR', area: 1517, price: 2158111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '11-06', unit: '1106', type: '2BS', bedrooms: '2BR', area: 1492, price: 2196111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '11-07', unit: '1107', type: '1BS', bedrooms: '1BR', area: 998, price: 1622111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '11-08', unit: '1108', type: '1BS', bedrooms: '1BR', area: 996, price: 1620111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '11-09', unit: '1109', type: '2BS', bedrooms: '2BR', area: 1384, price: 1971111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '12': [
      { id: '12-01', unit: '1201', type: '2BS', bedrooms: '2BR', area: 1867, price: 2751111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '12-02', unit: '1202', type: '2BS', bedrooms: '2BR', area: 1450, price: 2090111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '12-03', unit: '1203', type: '1BS', bedrooms: '1BR', area: 928, price: 1547111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '12-04', unit: '1204', type: '2BS', bedrooms: '2BR', area: 1459, price: 2100111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '12-05', unit: '1205', type: '2BS', bedrooms: '2BR', area: 1538, price: 2200111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '12-06', unit: '1206', type: '2BS', bedrooms: '2BR', area: 1371, price: 2054111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '12-07', unit: '1207', type: '1BS', bedrooms: '1BR', area: 962, price: 1580111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '12-08', unit: '1208', type: '1BS', bedrooms: '1BR', area: 960, price: 1578111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '12-09', unit: '1209', type: '2BS', bedrooms: '2BR', area: 1449, price: 2066111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '13': [
      { id: '13-01', unit: '1301', type: '2BS', bedrooms: '2BR', area: 1862, price: 2764111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '13-02', unit: '1302', type: '2BS', bedrooms: '2BR', area: 1450, price: 2105111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '13-03', unit: '1303', type: '1BS', bedrooms: '1BR', area: 1174, price: 1914111, status: 'blocked' as const, view: 'Canal View', features: ["Store", "Simplex"] },
      { id: '13-04', unit: '1304', type: '2BS', bedrooms: '2BR', area: 1386, price: 2024111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '13-05', unit: '1305', type: '2BS', bedrooms: '2BR', area: 1538, price: 2216111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '13-06', unit: '1306', type: '2BS', bedrooms: '2BR', area: 1383, price: 2085111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '13-07', unit: '1307', type: '1BS', bedrooms: '1BR', area: 875, price: 1465111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '13-08', unit: '1308', type: '1BS', bedrooms: '1BR', area: 963, price: 1592111, status: 'blocked' as const, view: 'City Sun', features: ["Store", "Simplex"] },
      { id: '13-09', unit: '1309', type: '2BS', bedrooms: '2BR', area: 1378, price: 1992111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '14': [
      { id: '14-01', unit: '1401', type: '3BS', bedrooms: '3BR', area: 2485, price: 3541111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '14-02', unit: '1402', type: '2BS', bedrooms: '2BR', area: 1457, price: 2128111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '14-03', unit: '1403', type: '2BS', bedrooms: '2BR', area: 1457, price: 2129111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '14-04', unit: '1404', type: '2BS', bedrooms: '2BR', area: 1538, price: 2232111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '14-05', unit: '1405', type: '3BS', bedrooms: '3BR', area: 2175, price: 3089111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '14-06', unit: '1406', type: '2BS', bedrooms: '2BR', area: 1486, price: 2142111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '14-07', unit: '1407', type: '2BS', bedrooms: '2BR', area: 1386, price: 2018111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '15': [
      { id: '15-01', unit: '1501', type: '3BS', bedrooms: '3BR', area: 2383, price: 3435111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '15-02', unit: '1502', type: '2BS', bedrooms: '2BR', area: 1457, price: 2144111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '15-03', unit: '1503', type: '2BS', bedrooms: '2BR', area: 1457, price: 2144111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '15-04', unit: '1504', type: '2BS', bedrooms: '2BR', area: 1487, price: 2181111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '15-05', unit: '1505', type: '3BS', bedrooms: '3BR', area: 2115, price: 3037111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '15-06', unit: '1506', type: '2BS', bedrooms: '2BR', area: 1486, price: 2158111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '15-07', unit: '1507', type: '2BS', bedrooms: '2BR', area: 1486, price: 2157111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '16': [
      { id: '16-01', unit: '1601', type: '3BS', bedrooms: '3BR', area: 2298, price: 3350111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '16-02', unit: '1602', type: '2BS', bedrooms: '2BR', area: 1404, price: 2090111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '16-03', unit: '1603', type: '2BS', bedrooms: '2BR', area: 1457, price: 2158111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '16-04', unit: '1604', type: '2BS', bedrooms: '2BR', area: 1538, price: 2262111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '16-05', unit: '1605', type: '3BS', bedrooms: '3BR', area: 1926, price: 2820111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '16-06', unit: '1606', type: '2BS', bedrooms: '2BR', area: 1486, price: 2173111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '16-07', unit: '1607', type: '2BS', bedrooms: '2BR', area: 1644, price: 2375111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '17': [
      { id: '17-01', unit: '1701', type: '3BD', bedrooms: '3BR', area: 2615, price: 4351111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '17-02', unit: '1702', type: '3BD', bedrooms: '3BR', area: 2275, price: 3680111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '17-03', unit: '1703', type: '1BD', bedrooms: '1BR', area: 971, price: 1793111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '17-04', unit: '1704', type: '3BD', bedrooms: '3BR', area: 2276, price: 3680111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '17-05', unit: '1705', type: '3BD', bedrooms: '3BR', area: 2277, price: 3682111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '17-06', unit: '1706', type: '3BD', bedrooms: '3BR', area: 2786, price: 4568111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '17-07', unit: '1707', type: '3BD', bedrooms: '3BR', area: 2279, price: 3649111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '17-08', unit: '1708', type: '3BD', bedrooms: '3BR', area: 2279, price: 3649111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
    ],
    '19': [
      { id: '19-01', unit: '1901', type: '3BS', bedrooms: '3BR', area: 2409, price: 3566111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '19-02', unit: '1902', type: '2BS', bedrooms: '2BR', area: 1448, price: 2191111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '19-03', unit: '1903', type: '2BS', bedrooms: '2BR', area: 1448, price: 2191111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '19-04', unit: '1904', type: '2BS', bedrooms: '2BR', area: 1448, price: 2191111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '19-05', unit: '1905', type: '3BS', bedrooms: '3BR', area: 2430, price: 3528111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '19-06', unit: '1906', type: '2BS', bedrooms: '2BR', area: 1451, price: 2173111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '19-07', unit: '1907', type: '2BS', bedrooms: '2BR', area: 1451, price: 2173111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '20': [
      { id: '20-01', unit: '2001', type: '3BS', bedrooms: '3BR', area: 2294, price: 3438111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '20-02', unit: '2002', type: '2BS', bedrooms: '2BR', area: 1404, price: 2148111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '20-03', unit: '2003', type: '2BS', bedrooms: '2BR', area: 1457, price: 2218111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '20-04', unit: '2004', type: '2BS', bedrooms: '2BR', area: 1538, price: 2325111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '20-05', unit: '2005', type: '3BS', bedrooms: '3BR', area: 2092, price: 3115111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '20-06', unit: '2006', type: '2BS', bedrooms: '2BR', area: 1487, price: 2235111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '20-07', unit: '2007', type: '2BS', bedrooms: '2BR', area: 1401, price: 2123111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '21': [
      { id: '21-01', unit: '2101', type: '3BS', bedrooms: '3BR', area: 2294, price: 3462111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '21-02', unit: '2102', type: '2BS', bedrooms: '2BR', area: 1385, price: 2136111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '21-03', unit: '2103', type: '2BS', bedrooms: '2BR', area: 1457, price: 2234111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '21-04', unit: '2104', type: '2BS', bedrooms: '2BR', area: 1538, price: 2341111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '21-05', unit: '2105', type: '3BS', bedrooms: '3BR', area: 1926, price: 2919111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '21-06', unit: '2106', type: '2BS', bedrooms: '2BR', area: 1487, price: 2250111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '21-07', unit: '2107', type: '2BS', bedrooms: '2BR', area: 1837, price: 2712111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '22': [
      { id: '22-01', unit: '2201', type: '3BS', bedrooms: '3BR', area: 2426, price: 3661111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '22-02', unit: '2202', type: '2BS', bedrooms: '2BR', area: 1457, price: 2249111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '22-03', unit: '2203', type: '2BS', bedrooms: '2BR', area: 1406, price: 2179111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '22-04', unit: '2204', type: '2BS', bedrooms: '2BR', area: 1538, price: 2357111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '22-05', unit: '2205', type: '3BS', bedrooms: '3BR', area: 1994, price: 3028111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '22-06', unit: '2206', type: '2BS', bedrooms: '2BR', area: 1487, price: 2265111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '22-07', unit: '2207', type: '2BS', bedrooms: '2BR', area: 1486, price: 2264111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '23': [
      { id: '23-01', unit: '2301', type: '3BS', bedrooms: '3BR', area: 2205, price: 3388111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '23-02', unit: '2302', type: '2BS', bedrooms: '2BR', area: 1457, price: 2263111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '23-03', unit: '2303', type: '2BS', bedrooms: '2BR', area: 1457, price: 2263111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '23-04', unit: '2304', type: '2BS', bedrooms: '2BR', area: 1487, price: 2303111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '23-05', unit: '2305', type: '3BS', bedrooms: '3BR', area: 2185, price: 3302111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '23-06', unit: '2306', type: '2BS', bedrooms: '2BR', area: 1487, price: 2280111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '23-07', unit: '2307', type: '2BS', bedrooms: '2BR', area: 1486, price: 2279111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '24': [
      { id: '24-01', unit: '2401', type: '3BS', bedrooms: '3BR', area: 2394, price: 3667111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '24-02', unit: '2402', type: '2BS', bedrooms: '2BR', area: 1457, price: 2278111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '24-03', unit: '2403', type: '2BS', bedrooms: '2BR', area: 1457, price: 2278111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '24-04', unit: '2404', type: '2BS', bedrooms: '2BR', area: 1486, price: 2317111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '24-05', unit: '2405', type: '3BS', bedrooms: '3BR', area: 2143, price: 3268111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '24-06', unit: '2406', type: '2BS', bedrooms: '2BR', area: 1487, price: 2296111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '24-07', unit: '2407', type: '2BS', bedrooms: '2BR', area: 1391, price: 2167111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '25': [
      { id: '25-01', unit: '2501', type: '3BS', bedrooms: '3BR', area: 2294, price: 3555111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '25-02', unit: '2502', type: '2BS', bedrooms: '2BR', area: 1404, price: 2220111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '25-03', unit: '2503', type: '2BS', bedrooms: '2BR', area: 1457, price: 2293111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '25-04', unit: '2504', type: '2BS', bedrooms: '2BR', area: 1538, price: 2404111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '25-05', unit: '2505', type: '3BS', bedrooms: '3BR', area: 2185, price: 3347111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '25-06', unit: '2506', type: '2BS', bedrooms: '2BR', area: 1487, price: 2310111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
      { id: '25-07', unit: '2507', type: '2BS', bedrooms: '2BR', area: 1486, price: 2309111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Simplex"] },
    ],
    '26': [
      { id: '26-01', unit: '2601', type: '4BD', bedrooms: '4BR', area: 3196, price: 5679111, status: 'blocked' as const, view: 'Canal East', features: ["Maid's Room", "Store", "Corner Unit", "Duplex"] },
      { id: '26-02', unit: '2602', type: '3BD', bedrooms: '3BR', area: 2300, price: 3315111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '26-03', unit: '2603', type: '3BD', bedrooms: '3BR', area: 2302, price: 3317111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '26-04', unit: '2604', type: '3BD', bedrooms: '3BR', area: 2302, price: 3317111, status: 'blocked' as const, view: 'Canal View', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '26-05', unit: '2605', type: '4BD', bedrooms: '4BR', area: 3352, price: 5875111, status: 'blocked' as const, view: 'City Wind + City West', features: ["Maid's Room", "Store", "Corner Unit", "Duplex"] },
      { id: '26-06', unit: '2606', type: '3BD', bedrooms: '3BR', area: 2300, price: 3280111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
      { id: '26-07', unit: '2607', type: '3BD', bedrooms: '3BR', area: 2349, price: 3351111, status: 'blocked' as const, view: 'City Sun', features: ["Maid's Room", "Store", "Duplex"] },
    ],
  };

  // Get floor units from actual inventory data
  const getFloorUnits = (floorData: typeof FLOOR_DATA[0]): FloorUnit[] => {
    return INVENTORY_UNITS[floorData.floor] || [];
  };

  // State for selected unit popup
  const [selectedUnit, setSelectedUnit] = useState<FloorUnit | null>(null);

  // Payment plan - detailed monthly breakdown
  const PAYMENT_PLAN_DETAILED = [
    { period: 'Spot', label: 'Down Payment', pct: 10, cumulative: 10 },
    { period: 'M1', label: '1st Instalment', pct: 1, cumulative: 11 },
    { period: 'M2', label: '2nd Instalment', pct: 1, cumulative: 12 },
    { period: 'M3', label: '3rd Instalment', pct: 1, cumulative: 13 },
    { period: 'M4', label: '4th Instalment', pct: 1, cumulative: 14 },
    { period: 'M5', label: '5th Instalment', pct: 1, cumulative: 15 },
    { period: 'M6', label: '6th Instalment', pct: 5, cumulative: 20 },
    { period: 'M7', label: '7th Instalment', pct: 1, cumulative: 21 },
    { period: 'M8', label: '8th Instalment', pct: 1, cumulative: 22 },
    { period: 'M9', label: '9th Instalment', pct: 1, cumulative: 23 },
    { period: 'M10', label: '10th Instalment', pct: 1, cumulative: 24 },
    { period: 'M11', label: '11th Instalment', pct: 1, cumulative: 25 },
    { period: 'M12', label: '12th Instalment', pct: 5, cumulative: 30 },
    { period: 'M13', label: '13th Instalment', pct: 1, cumulative: 31 },
    { period: 'M14', label: '14th Instalment', pct: 1, cumulative: 32 },
    { period: 'M15', label: '15th Instalment', pct: 1, cumulative: 33 },
    { period: 'M16', label: '16th Instalment', pct: 1, cumulative: 34 },
    { period: 'M17', label: '17th Instalment', pct: 1, cumulative: 35 },
    { period: 'M18', label: '18th Instalment', pct: 5, cumulative: 40 },
    { period: 'M19', label: '19th Instalment', pct: 1, cumulative: 41 },
    { period: 'M20', label: '20th Instalment', pct: 1, cumulative: 42 },
    { period: 'M21', label: '21st Instalment', pct: 1, cumulative: 43 },
    { period: 'M22', label: '22nd Instalment', pct: 1, cumulative: 44 },
    { period: 'M23', label: '23rd Instalment', pct: 1, cumulative: 45 },
    { period: 'M24', label: '24th Instalment', pct: 5, cumulative: 50 },
    { period: 'Handover', label: 'Final Payment', pct: 50, cumulative: 100 },
  ];

  // Sales absorption rate
  const SALES_TIMELINE = [
    { month: 'Dec 2025', units: 18, pct: 9, value: 41531212, cumUnits: 18, cumPct: 9 },
    { month: 'Jan 2026', units: 20, pct: 10, value: 46145791, cumUnits: 38, cumPct: 19 },
    { month: 'Feb 2026', units: 16, pct: 8, value: 36916633, cumUnits: 54, cumPct: 28 },
    { month: 'Mar 2026', units: 10, pct: 5, value: 23072896, cumUnits: 64, cumPct: 33 },
    { month: 'Apr 2026', units: 14, pct: 7, value: 32302054, cumUnits: 78, cumPct: 40 },
    { month: 'May 2026', units: 14, pct: 7, value: 32302054, cumUnits: 92, cumPct: 47 },
    { month: 'Jun 2026', units: 12, pct: 6, value: 27687475, cumUnits: 104, cumPct: 53 },
    { month: 'Jul 2026', units: 8, pct: 4, value: 18458317, cumUnits: 112, cumPct: 57 },
    { month: 'Aug 2026', units: 8, pct: 4, value: 18458317, cumUnits: 120, cumPct: 61 },
    { month: 'Sep 2026', units: 12, pct: 6, value: 27687475, cumUnits: 132, cumPct: 67 },
    { month: 'Oct 2026', units: 12, pct: 6, value: 27687475, cumUnits: 144, cumPct: 73 },
    { month: 'Nov 2026', units: 9, pct: 5, value: 20765606, cumUnits: 153, cumPct: 78 },
    { month: 'Dec 2026', units: 9, pct: 5, value: 20765606, cumUnits: 162, cumPct: 83 },
    { month: 'Jan 2027', units: 7, pct: 4, value: 16151027, cumUnits: 169, cumPct: 86 },
    { month: 'Feb 2027', units: 7, pct: 4, value: 16151027, cumUnits: 176, cumPct: 90 },
    { month: 'Mar 2027', units: 8, pct: 4, value: 18458317, cumUnits: 184, cumPct: 94 },
    { month: 'Apr 2027', units: 6, pct: 3, value: 13843737, cumUnits: 190, cumPct: 97 },
    { month: 'May 2027', units: 6, pct: 3, value: 13843737, cumUnits: 196, cumPct: 100 },
  ];

  // Milestones
  const MILESTONES = [
    { milestone: 'Marketing Renders & Collateral', status: 'In Progress', date: '28-Nov-2025', icon: '🎨' },
    { milestone: 'Sales Strategy Finalization', status: 'In Progress', date: '01-Dec-2025', icon: '📋' },
    { milestone: 'Availability & Inventory Release', status: 'Pending', date: '09-Dec-2025', icon: '📦' },
    { milestone: 'Official Launch', status: 'Confirmed', date: '09-Dec-2025', icon: '🚀' },
    { milestone: 'Construction Start', status: 'Planned', date: 'Q1 2026', icon: '🏗️' },
    { milestone: 'Project Handover', status: 'Target', date: 'June 2028', icon: '🎉' },
  ];

  const AMENITIES = [
    { icon: '🫁', name: 'HBOT Facility', desc: 'First residential HBOT in Abu Dhabi', premium: true },
    { icon: '🏊', name: 'Swimming Pool', desc: 'Main pool + dedicated kids pool' },
    { icon: '🏋️', name: 'Fitness Center', desc: 'Indoor & outdoor gym facilities' },
    { icon: '🧘', name: 'Yoga Studio', desc: 'Yoga & Pilates dedicated space' },
    { icon: '🧖', name: 'Wellness Spa', desc: 'Sauna & treatment rooms' },
    { icon: '🏢', name: 'Multi-Purpose Hall', desc: 'Events & gatherings' },
    { icon: '👶', name: 'Kids Playground', desc: 'Outdoor play area' },
    { icon: '⛳', name: 'Mini Golf', desc: 'Putting green course' },
    { icon: '🏀', name: 'Sports Court', desc: 'Multi-purpose court' },
    { icon: '🎬', name: 'Outdoor Theatre', desc: 'Open-air cinema experience' },
    { icon: '🍖', name: 'BBQ Area', desc: 'Family barbecue facilities' },
    { icon: '🛒', name: 'Retail Space', desc: 'Café, pharmacy & services' },
  ];

  const LOCATIONS = [
    { icon: '🏙️', place: 'Central Business District', time: '5-7 min' },
    { icon: '🌊', place: 'Abu Dhabi Waterfront', time: '15 min' },
    { icon: '✈️', place: 'International Airport', time: '25-30 min' },
    { icon: '🌳', place: 'Reem Central Park', time: '5 min' },
    { icon: '🛍️', place: 'Reem Mall', time: '5 min' },
  ];

  const PAYMENT_PLAN = [
    { label: 'Down Payment', pct: '10%', timing: 'Booking', color: '#22c55e' },
    { label: 'Year 1', pct: '20%', timing: '12 Monthly', color: '#3b82f6' },
    { label: 'Year 2', pct: '20%', timing: '12 Monthly', color: '#8b5cf6' },
    { label: 'Handover', pct: '50%', timing: 'June 2028', color: '#D86DCB' },
  ];

  return (
    <div className="project-brief-container">
      <div className="bg-animation" />
      <div className="grid-overlay" />
      <FloatingParticles />

      {/* Header */}
      <header className="nav">
        <div className="project-brief-header">
          <button className="back-button" onClick={() => onNavigate('home')}>
            <span>←</span> Back to Strategy
          </button>
          <div className="logo">ONE <span>RESIDENCE</span></div>
        </div>
        <div className="header-stats">
          <div className="header-stat">
            <div className="header-stat-value gradient-text">196</div>
            <div className="header-stat-label">Units</div>
          </div>
          <div className="header-stat">
            <div className="header-stat-value gradient-text">452M</div>
            <div className="header-stat-label">AED</div>
          </div>
          <div className="header-stat highlight">
            <div className="header-stat-value">Jun 2028</div>
            <div className="header-stat-label">Completion</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="project-brief-content">
        {/* Tab Navigation */}
        <div className="project-tabs">
          {PROJECT_TABS.map(tab => (
            <button
              key={tab.id}
              className={`project-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="project-tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content with Animation */}
        <div className="tab-content-wrapper">
          <div className="tab-content" key={tabKey}>
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '28px' }}>
                {/* Project Profile */}
                <div className="project-card">
                  <h3 className="project-card-title"><span>📋</span> Project Profile</h3>
                  {[
                    ['Master Developer', PROJECT.masterDev],
                    ['Developer', PROJECT.developer],
                    ['Consultant', PROJECT.consultant],
                    ['Plot', PROJECT.plot],
                    ['Zone', `${PROJECT.zone} (${PROJECT.sector})`],
                    ['Completion', PROJECT.completion]
                  ].map(([k, v], i) => (
                    <div key={i} className="info-row">
                      <span className="info-label">{k}</span>
                      <span className="info-value">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Building Specs */}
                <div className="project-card">
                  <h3 className="project-card-title"><span>🏢</span> Building Specs</h3>
                  <div className="spec-grid">
                    {[
                      ['Floors', PROJECT.floors],
                      ['Units', PROJECT.units],
                      ['Height', PROJECT.height],
                      ['Parking', PROJECT.parking]
                    ].map(([k, v], i) => (
                      <div key={i} className="spec-item">
                        <div className="spec-value">{v}</div>
                        <div className="spec-label">{k}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="project-card">
                  <h3 className="project-card-title"><span>📍</span> Prime Location</h3>
                  {LOCATIONS.map((loc, i) => (
                    <div key={i} className="location-item">
                      <div className="location-icon">{loc.icon}</div>
                      <span className="location-name">{loc.place}</span>
                      <span className="location-time">{loc.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'units' && (
              <div style={{ display: 'grid', gap: '32px' }}>
                {/* Unit Summary Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  {UNIT_SUMMARY.map((u, i) => (
                    <div key={i} className="financial-kpi" style={{ borderTop: `4px solid ${u.color}` }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: u.color }}>{u.units}</span>
                      <div className="financial-label">{u.type}</div>
                      {u.simplex > 0 || u.duplex > 0 ? (
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                          {u.simplex > 0 && <span>Simplex: {u.simplex}</span>}
                          {u.simplex > 0 && u.duplex > 0 && <span> | </span>}
                          {u.duplex > 0 && <span>Duplex: {u.duplex}</span>}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* Unit Type Filter */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    className={`project-tab ${selectedUnitType === null ? 'active' : ''}`}
                    onClick={() => setSelectedUnitType(null)}
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <span>All Types</span>
                  </button>
                  {['1BR', '2BR', '3BR', '4BR', 'Retail'].map(type => (
                    <button
                      key={type}
                      className={`project-tab ${selectedUnitType === type ? 'active' : ''}`}
                      onClick={() => setSelectedUnitType(type)}
                      style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                      <span>{type}</span>
                    </button>
                  ))}
                </div>

                {/* Detailed Unit Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {UNIT_TYPES
                    .filter(u => !selectedUnitType || u.type.startsWith(selectedUnitType))
                    .map((u, i) => (
                    <div
                      key={i}
                      className="unit-card"
                      style={{ '--unit-color': u.color } as React.CSSProperties}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: u.color, borderRadius: '4px 0 0 4px' }} />
                      <div className="unit-header">
                        <div className="unit-color-bar" style={{ background: u.color, color: u.color }} />
                        <div>
                          <h3 className="unit-type">{u.type}</h3>
                          <span style={{ fontSize: '12px', color: '#9ca3af', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{u.subtype}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className="unit-count" style={{ color: u.color }}>{u.units}</span>
                          <span className="unit-count-label">units</span>
                        </div>
                      </div>
                      <div className="unit-details">
                        <div className="unit-detail">
                          <div className="unit-detail-label">Size Range</div>
                          <div className="unit-detail-value">{u.sizeRange} ft²</div>
                        </div>
                        <div className="unit-detail">
                          <div className="unit-detail-label">Avg Size</div>
                          <div className="unit-detail-value">{u.avgSize.toLocaleString()} ft²</div>
                        </div>
                        <div className="unit-detail">
                          <div className="unit-detail-label">Price Range</div>
                          <div className="unit-detail-value" style={{ color: '#22c55e' }}>AED {u.priceRange}</div>
                        </div>
                        <div className="unit-detail">
                          <div className="unit-detail-label">Avg Price</div>
                          <div className="unit-detail-value" style={{ color: '#fbbf24' }}>AED {(u.avgPrice / 1000000).toFixed(2)}M</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        {u.features.map((f, fi) => (
                          <span key={fi} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px', color: '#9ca3af' }}>{f}</span>
                        ))}
                        <span style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.15)', padding: '3px 8px', borderRadius: '4px', color: '#60a5fa' }}>🚗 {u.parking} parking</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div style={{ display: 'grid', gap: '32px' }}>
                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                  {[
                    { icon: '💵', label: 'Total Revenue', value: 'AED 452M' },
                    { icon: '📊', label: 'Average PSF', value: 'AED 1,566' },
                    { icon: '🏠', label: 'Residential', value: 'AED 445M' },
                    { icon: '🏪', label: 'Retail', value: 'AED 7.19M' }
                  ].map((kpi, i) => (
                    <div key={i} className="financial-kpi">
                      <span className="financial-icon">{kpi.icon}</span>
                      <div className="financial-value">{kpi.value}</div>
                      <div className="financial-label">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                {/* Payment Plan */}
                <div className="project-card">
                  <h3 className="project-card-title"><span>💳</span> Payment Plan</h3>
                  <div className="payment-plan-grid">
                    {PAYMENT_PLAN.map((p, i) => (
                      <div
                        key={i}
                        className="payment-step"
                        style={{
                          background: `${p.color}12`,
                          borderTop: `4px solid ${p.color}`,
                        }}
                      >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: p.color }} />
                        <div className="payment-percentage" style={{ color: p.color }}>{p.pct}</div>
                        <div className="payment-label">{p.label}</div>
                        <div className="payment-timing">{p.timing}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'floors' && (
              <div className="tower-experience">
                {/* Tower Container with Real Renders */}
                <div className="tower-container">
                  {/* Image Holder */}
                  <div className="tower-image-holder">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/tower-day.jpeg"
                      alt="One Residence - Day View"
                      className={`tower-image ${viewMode === 'day' ? 'visible' : 'hidden'}`}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/tower-night.jpeg"
                      alt="One Residence - Night View"
                      className={`tower-image ${viewMode === 'night' ? 'visible' : 'hidden'}`}
                    />

                    {/* Holographic Overlay */}
                    <div className="holo-overlay" />
                    <div className="glow-ring" />

                    {/* Day/Night Toggle - Left Side */}
                    <div className="mode-toggle">
                      <button
                        className={`mode-btn ${viewMode === 'day' ? 'active' : ''}`}
                        onClick={() => setViewMode('day')}
                      >
                        ☀️ Day
                      </button>
                      <button
                        className={`mode-btn ${viewMode === 'night' ? 'active' : ''}`}
                        onClick={() => setViewMode('night')}
                      >
                        🌙 Night
                      </button>
                    </div>

                    {/* Floor Markers Overlay */}
                    <div className="floor-markers">
                      {[...FLOOR_DATA].reverse().map((floor, i) => {
                        const totalFloors = FLOOR_DATA.length;
                        const topPercent = 8 + (i * (75 / totalFloors));
                        const isSelected = selectedFloor === i;

                        return (
                          <div
                            key={i}
                            className={`floor-marker ${isSelected ? 'active' : ''}`}
                            style={{ top: `${topPercent}%` }}
                            onClick={() => setSelectedFloor(isSelected ? null : i)}
                          >
                            <span className="floor-marker-label">
                              {floor.floor === 'GF' ? 'GF' : `F${floor.floor}`} • {floor.units}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tower Stats Badge - Below Image */}
                  <div className="tower-stats-badge">
                    <div className="tower-stats-row">
                      <div className="tower-stat">
                        <div className="tower-stat-value">G+31</div>
                        <div className="tower-stat-label">Height</div>
                      </div>
                      <div className="tower-stat">
                        <div className="tower-stat-value">196</div>
                        <div className="tower-stat-label">Units</div>
                      </div>
                      <div className="tower-stat">
                        <div className="tower-stat-value">452M</div>
                        <div className="tower-stat-label">AED</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Panel with Grid Stack */}
                <div className="tower-details-panel">
                  {selectedFloor !== null ? (
                    (() => {
                      const floor = [...FLOOR_DATA].reverse()[selectedFloor];
                      const floorUnits = getFloorUnits(floor);
                      const typeColors: Record<string, string> = {
                        '1BR': '#3b82f6', '2BR': '#eab308', '3BR': '#a855f7', '4BR': '#ec4899', 'Retail': '#6366f1'
                      };
                      const blockedCount = floorUnits.filter(u => u.status === 'blocked').length;
                      const totalValue = floorUnits.reduce((sum, u) => sum + u.price, 0);

                      return (
                        <div className="grid-stack-container" key={selectedFloor}>
                          {/* Header */}
                          <div className="grid-stack-header">
                            <div>
                              <h2 className="grid-stack-title">
                                {floor.floor === 'GF' ? 'Ground Floor' : `Floor ${floor.floor}`}
                              </h2>
                              <div className="grid-stack-subtitle">
                                Interactive Unit Grid • Click any unit for details
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedFloor(null)}
                              style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '12px',
                                padding: '10px 20px',
                                color: '#9ca3af',
                                cursor: 'pointer',
                                fontSize: '13px',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              ← Back to Overview
                            </button>
                          </div>

                          {/* Stats Bar */}
                          <div className="grid-stats-bar">
                            <div className="grid-stat">
                              <div className="grid-stat-value">{floor.units}</div>
                              <div className="grid-stat-label">Total Units</div>
                            </div>
                            <div className="grid-stat">
                              <div className="grid-stat-value" style={{ background: 'linear-gradient(135deg, #6b7280, #4b5563)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{blockedCount}</div>
                              <div className="grid-stat-label">Blocked</div>
                            </div>
                            <div className="grid-stat">
                              <div className="grid-stat-value" style={{ background: 'linear-gradient(135deg, #D86DCB, #5B8DEF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {(totalValue / 1000000).toFixed(1)}M
                              </div>
                              <div className="grid-stat-label">Total Value</div>
                            </div>
                          </div>

                          {/* Legend */}
                          <div className="grid-legend">
                            <span style={{ fontWeight: 600, color: '#fff', marginRight: '12px' }}>Unit Types:</span>
                            {Object.entries(typeColors).map(([type, color]) => (
                              <div key={type} className="grid-legend-item">
                                <div className="grid-legend-color" style={{ background: color }} />
                                <span>{type}</span>
                              </div>
                            ))}
                            <span style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '16px', marginLeft: '8px', fontWeight: 600, color: '#fff' }}>Status:</span>
                            <div className="grid-legend-item">
                              <div className="grid-legend-color" style={{ background: '#6b7280' }} />
                              <span>Blocked</span>
                            </div>
                          </div>

                          {/* Units Grid */}
                          <div className="units-grid-wrapper">
                            <div className="units-grid">
                              {floorUnits.map((unit) => (
                                <div
                                  key={unit.id}
                                  className={`unit-cell ${unit.status} ${selectedUnit?.id === unit.id ? 'selected' : ''}`}
                                  data-type={unit.bedrooms}
                                  onClick={() => setSelectedUnit(unit)}
                                  style={{
                                    background: `linear-gradient(145deg, ${typeColors[unit.bedrooms]}40, ${typeColors[unit.bedrooms]}20)`,
                                    borderColor: `${typeColors[unit.bedrooms]}80`
                                  }}
                                >
                                  <div className={`unit-cell-status ${unit.status}`} />
                                  <div className="unit-cell-number">{unit.unit}</div>
                                  <div className="unit-cell-type">{unit.bedrooms}</div>
                                  <div className="unit-cell-price">{(unit.price / 1000000).toFixed(2)}M</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Floor Summary */}
                          <div className="grid-floor-summary">
                            {Object.entries(floor.types).map(([type, count]) => {
                              const typeNames: Record<string, string> = {
                                retail: 'Retail', '1BS': '1BR Simplex', '1BD': '1BR Duplex',
                                '2BS': '2BR Simplex', '2BD': '2BR Duplex', '3BS': '3BR Simplex',
                                '3BD': '3BR Duplex', '4BD': '4BR Duplex'
                              };
                              const bedroomType = type.startsWith('1') ? '1BR' : type.startsWith('2') ? '2BR' : type.startsWith('3') ? '3BR' : type.startsWith('4') ? '4BR' : 'Retail';

                              return (
                                <div key={type} className="grid-summary-card" style={{ borderTop: `3px solid ${typeColors[bedroomType]}` }}>
                                  <div className="grid-summary-value" style={{ color: typeColors[bedroomType] }}>{count}</div>
                                  <div className="grid-summary-label">{typeNames[type] || type}</div>
                                </div>
                              );
                            })}
                            <div className="grid-summary-card" style={{ borderTop: '3px solid #22c55e' }}>
                              <div className="grid-summary-value" style={{ color: '#22c55e' }}>AED {(floor.price / 1000000).toFixed(1)}M</div>
                              <div className="grid-summary-label">Floor Value</div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="tower-empty-state">
                      <div className="tower-empty-icon">🏢</div>
                      <h3 className="tower-empty-title">Select a Floor</h3>
                      <p className="tower-empty-desc">
                        Click on any floor marker on the tower<br />to view interactive unit grid
                      </p>

                      {/* Quick Stats While No Floor Selected */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '32px', width: '100%', maxWidth: '400px' }}>
                        {[
                          { label: 'Residential Floors', value: '24', color: '#3b82f6' },
                          { label: 'Ground Floor Retail', value: '1', color: '#6366f1' },
                          { label: 'Amenity Floors', value: '2', color: '#22c55e' },
                          { label: 'Peak Floor Value', value: 'F26', color: '#ec4899' },
                        ].map((stat, i) => (
                          <div key={i} style={{
                            background: `${stat.color}15`,
                            padding: '16px',
                            borderRadius: '12px',
                            textAlign: 'center',
                            borderTop: `3px solid ${stat.color}`
                          }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Unit Detail Popup */}
                <div className={`unit-popup-backdrop ${selectedUnit ? 'open' : ''}`} onClick={() => setSelectedUnit(null)} />
                <div className={`unit-detail-popup ${selectedUnit ? 'open' : ''}`}>
                  {selectedUnit && (
                    <>
                      <button className="unit-popup-close" onClick={() => setSelectedUnit(null)}>×</button>
                      <div className="unit-popup-header">
                        <div className="unit-popup-title">Unit {selectedUnit.unit}</div>
                        <div className="unit-popup-subtitle">
                          {selectedUnit.bedrooms} • {selectedUnit.view}
                        </div>
                      </div>
                      <div className="unit-popup-body">
                        <div className="unit-popup-grid">
                          <div className="unit-popup-item">
                            <div className="unit-popup-label">Unit Type</div>
                            <div className="unit-popup-value">{selectedUnit.bedrooms}</div>
                          </div>
                          <div className="unit-popup-item">
                            <div className="unit-popup-label">Status</div>
                            <div className="unit-popup-value" style={{
                              color: selectedUnit.status === 'available' ? '#22c55e' : selectedUnit.status === 'reserved' ? '#fbbf24' : selectedUnit.status === 'blocked' ? '#6b7280' : '#ef4444'
                            }}>
                              {selectedUnit.status.charAt(0).toUpperCase() + selectedUnit.status.slice(1)}
                            </div>
                          </div>
                          <div className="unit-popup-item">
                            <div className="unit-popup-label">Area</div>
                            <div className="unit-popup-value">{selectedUnit.area.toLocaleString()} ft²</div>
                          </div>
                          <div className="unit-popup-item">
                            <div className="unit-popup-label">View</div>
                            <div className="unit-popup-value">{selectedUnit.view}</div>
                          </div>
                          <div className="unit-popup-item unit-popup-price">
                            <div className="unit-popup-label">Price</div>
                            <div className="unit-popup-value">AED {selectedUnit.price.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="unit-popup-features">
                          {selectedUnit.features.map((feature, i) => (
                            <span key={i} className="unit-popup-feature">{feature}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div style={{ display: 'grid', gap: '32px' }}>
                {/* Sales Absorption Chart */}
                <div className="project-card" style={{ padding: '32px' }}>
                  <h3 className="project-card-title"><span>📈</span> Sales Absorption Timeline</h3>
                  <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '14px' }}>18-month sellout projection: December 2025 - May 2027</p>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#9ca3af', fontSize: '13px' }}>Target: 196 Units</span>
                      <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: 'bold' }}>100% Sellout by May 2027</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #22c55e, #3b82f6, #D86DCB)',
                        width: '100%',
                        borderRadius: '4px',
                        animation: 'shimmer 2s infinite linear'
                      }} />
                    </div>
                  </div>

                  {/* Monthly Breakdown */}
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '200px', marginBottom: '16px' }}>
                    {SALES_TIMELINE.map((month, i) => {
                      const maxUnits = 20;
                      const height = (month.units / maxUnits) * 180;
                      const isHighMonth = month.units >= 14;
                      return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <div style={{ fontSize: '10px', color: isHighMonth ? '#22c55e' : '#6b7280', fontWeight: isHighMonth ? 'bold' : 'normal' }}>
                            {month.units}
                          </div>
                          <div style={{
                            width: '100%',
                            height: `${height}px`,
                            background: isHighMonth
                              ? 'linear-gradient(180deg, #22c55e, #16a34a)'
                              : 'linear-gradient(180deg, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.4))',
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                          }}
                            title={`${month.month}: ${month.units} units (${month.pct}%)`}
                          />
                          <div style={{
                            fontSize: '8px',
                            color: '#6b7280',
                            transform: 'rotate(-45deg)',
                            whiteSpace: 'nowrap',
                            marginTop: '8px'
                          }}>
                            {month.month.split(' ')[0].slice(0, 3)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Timeline Summary */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' }}>
                    {[
                      { period: 'Launch Phase', months: 'Dec-Jan', units: '38', value: '87.7M', color: '#22c55e' },
                      { period: 'Growth Phase', months: 'Feb-Jun', units: '66', value: '152.3M', color: '#3b82f6' },
                      { period: 'Steady Phase', months: 'Jul-Dec', units: '58', value: '133.8M', color: '#8b5cf6' },
                      { period: 'Completion', months: 'Jan-May', units: '34', value: '78.4M', color: '#D86DCB' },
                    ].map((phase, i) => (
                      <div key={i} style={{
                        background: `${phase.color}15`,
                        padding: '16px',
                        borderRadius: '12px',
                        borderLeft: `4px solid ${phase.color}`
                      }}>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: phase.color, marginBottom: '8px' }}>{phase.period}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>{phase.months}</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{phase.units} units</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>AED {phase.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div className="project-card" style={{ padding: '32px' }}>
                  <h3 className="project-card-title"><span>🎯</span> Project Milestones</h3>
                  <div style={{ position: 'relative', paddingLeft: '40px' }}>
                    {/* Timeline Line */}
                    <div style={{
                      position: 'absolute',
                      left: '15px',
                      top: '10px',
                      bottom: '10px',
                      width: '2px',
                      background: 'linear-gradient(180deg, #22c55e, #3b82f6, #D86DCB)'
                    }} />

                    {MILESTONES.map((m, i) => {
                      const statusColors: Record<string, string> = {
                        'In Progress': '#fbbf24',
                        'Pending': '#6b7280',
                        'Confirmed': '#22c55e',
                        'Planned': '#3b82f6',
                        'Target': '#D86DCB'
                      };
                      return (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          marginBottom: '24px',
                          position: 'relative'
                        }}>
                          {/* Dot */}
                          <div style={{
                            position: 'absolute',
                            left: '-32px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: statusColors[m.status],
                            border: '3px solid #0f172a',
                            boxShadow: `0 0 12px ${statusColors[m.status]}60`
                          }} />

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '20px' }}>{m.icon}</span>
                              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{m.milestone}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <span style={{
                                fontSize: '11px',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                background: `${statusColors[m.status]}22`,
                                color: statusColors[m.status],
                                fontWeight: 'bold'
                              }}>
                                {m.status}
                              </span>
                              <span style={{ fontSize: '13px', color: '#9ca3af' }}>{m.date}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                {/* HBOT Feature - Premium Highlight First */}
                <div className="hbot-feature" style={{ marginBottom: '32px' }}>
                  <div className="hbot-header">
                    <span className="hbot-icon">🏆</span>
                    <div>
                      <div className="hbot-badge">FIRST IN ABU DHABI</div>
                      <h3 className="hbot-title">Hyperbaric Oxygen Therapy (HBOT)</h3>
                    </div>
                  </div>
                  <p className="hbot-description">
                    Abu Dhabi&apos;s first residential HBOT facility - cutting-edge wellness technology for therapeutic oxygen treatments.
                    Proven benefits include accelerated healing, enhanced cognitive function, anti-aging effects, and sports recovery.
                    Experience medical-grade wellness in the comfort of your home.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' }}>
                    {[
                      { icon: '🩺', label: 'Accelerated Healing' },
                      { icon: '🧠', label: 'Cognitive Enhancement' },
                      { icon: '✨', label: 'Anti-Aging Benefits' },
                      { icon: '🏃', label: 'Sports Recovery' },
                    ].map((benefit, i) => (
                      <div key={i} style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>{benefit.icon}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>{benefit.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Amenities Grid */}
                <div className="amenity-grid">
                  {AMENITIES.filter(a => !a.premium).map((a, i) => (
                    <div key={i} className="amenity-card">
                      <span className="amenity-icon">{a.icon}</span>
                      <h3 className="amenity-name">{a.name}</h3>
                      <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
