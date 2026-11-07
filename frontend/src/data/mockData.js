// Inkloom Guard Seeded Mock Data & Initial State
// Developed for Hackathon Submission - Team: CTRL+ She
// Team Members: Aditi Choudhary, Khushi Chouhan, Sanskrati Yadav, Shruti Jadon

export const DEMO_USERS = [
  {
    id: "user-1",
    name: "Aditi Choudhary",
    email: "aditi@ctrlshe.org",
    role: "Creator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    title: "Lead Content Strategist"
  },
  {
    id: "user-2",
    name: "Khushi Chouhan",
    email: "khushi@ctrlshe.org",
    role: "Brand Manager",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    title: "Head of Global Brand Governance"
  },
  {
    id: "user-3",
    name: "Sanskrati Yadav",
    email: "sanskrati@ctrlshe.org",
    role: "Legal Compliance Reviewer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    title: "Senior Legal Counsel"
  },
  {
    id: "user-4",
    name: "Shruti Jadon",
    email: "shruti@ctrlshe.org",
    role: "Legal Compliance Reviewer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    title: "Regulatory Compliance Lead"
  }
];

export const INITIAL_GUIDELINES = [
  {
    id: "rule-01",
    title: "RULE 01: Professional Communication & Brand Voice",
    category: "Tone & Messaging",
    severity: "MEDIUM",
    description: "All customer-facing promotional content must maintain a professional, confident, and approachable tone. Avoid sensational slang, excessive punctuation (e.g. '!!', '???'), hyperbolic buzzwords, or colloquial shouting.",
    source: "Brand Style Guide §3.2",
    section: "Section 3.2 (Tone & Register)",
    lastUpdated: "2026-10-15",
    status: "Active",
    tags: ["Tone", "Punctuation", "Style", "Voice"]
  },
  {
    id: "rule-02",
    title: "RULE 02: Forbidden Terminology & Competitor References",
    category: "Terminology & Glossary",
    severity: "HIGH",
    description: "Competitor names, unapproved comparative claims, and unvetted slang ('craziest deal', 'insane opportunity') must not appear in promotional content. Use standardized product vocabulary approved in the Brand Glossary.",
    source: "Brand Terminology Policy §2.1",
    section: "Section 2.1 (Competitive References)",
    lastUpdated: "2026-10-18",
    status: "Active",
    tags: ["Terminology", "Glossary", "Competitors", "Blacklist"]
  },
  {
    id: "rule-03",
    title: "RULE 03: Verified Claims & Empirical Guarantees",
    category: "Factual Claims",
    severity: "HIGH",
    description: "All numerical, performance, or absolute claims (such as '100% guaranteed', 'beat every competitor', 'zero latency') must be supported by verifiable third-party benchmark evidence or approved legal source citations before public release.",
    source: "Legal Compliance Guide §4.5",
    section: "Section 4.5 (Substantiation of Claims)",
    lastUpdated: "2026-10-20",
    status: "Active",
    tags: ["Legal", "Factual", "Claims", "Substantiation"]
  },
  {
    id: "rule-04",
    title: "RULE 04: Visual Identity & Color Specification",
    category: "Visual Identity",
    severity: "MEDIUM",
    description: "Only approved primary brand colors (Electric Violet #8B5CF6, Cyber Cyan #06B6D4) and dark UI tokens may be applied to visual elements. Unauthorized neon tones (#FF0055, hot pink) or distorted badge assets violate visual consistency.",
    source: "Visual Identity Guide §1.3",
    section: "Section 1.3 (Primary Palette & Badges)",
    lastUpdated: "2026-09-28",
    status: "Active",
    tags: ["Visual", "Colors", "Logos", "Branding"]
  },
  {
    id: "rule-05",
    title: "RULE 05: Accessibility & Descriptive Alt Text",
    category: "Accessibility",
    severity: "HIGH",
    description: "All meaningful promotional images, diagrams, banners, and infographics must include descriptive alternative text (WCAG 2.1 AA compliant) ensuring screen reader compatibility and semantic accessibility.",
    source: "Accessibility Policy §2.4",
    section: "Section 2.4 (Alt Text & Visual Contrast)",
    lastUpdated: "2026-10-02",
    status: "Active",
    tags: ["Accessibility", "WCAG", "Alt-Text", "Screen-Reader"]
  },
  {
    id: "rule-06",
    title: "RULE 06: Regulatory Risk & Consumer Disclaimers",
    category: "Legal & Compliance",
    severity: "HIGH",
    description: "Promotional offers with limited windows or conditional pricing must explicitly link to terms and conditions. Statements guaranteeing financial or definitive outcomes are strictly prohibited.",
    source: "Legal Compliance Guide §5.1",
    section: "Section 5.1 (Consumer Protection Disclaimers)",
    lastUpdated: "2026-10-12",
    status: "Active",
    tags: ["Legal", "Compliance", "Disclaimers"]
  },
  {
    id: "rule-07",
    title: "RULE 07: Consistent Product Naming Architecture",
    category: "Terminology & Glossary",
    severity: "MEDIUM",
    description: "Refer to the platform as 'Inkloom Guard' or 'Inkloom Guard AI Platform'. Variations such as 'InkLoom', 'InkloomGuard', or generic 'the guard tool' are forbidden in external marketing collateral.",
    source: "Brand Terminology Policy §1.1",
    section: "Section 1.1 (Trademark & Nomenclature)",
    lastUpdated: "2026-09-14",
    status: "Active",
    tags: ["Nomenclature", "Naming", "Trademarks"]
  },
  {
    id: "rule-08",
    title: "RULE 08: Inclusion & Non-Discriminatory Language",
    category: "Tone & Messaging",
    severity: "LOW",
    description: "Use inclusive, gender-neutral, and universally accessible expressions across all campaign copy. Avoid idioms that may not translate well across global regional audiences.",
    source: "Brand Style Guide §2.3",
    section: "Section 2.3 (Inclusive Communication)",
    lastUpdated: "2026-08-30",
    status: "Active",
    tags: ["Tone", "Inclusion", "Global"]
  }
];

export const INITIAL_DOCUMENT = {
  id: "doc-sample-01",
  title: "Q4 HyperGrowth Product Launch Campaign",
  campaignName: "Project Falcon - Global Rollout",
  contentType: "Advertisement",
  status: "Draft",
  author: "Aditi Choudhary",
  authorRole: "Creator",
  createdAt: "2026-11-04 10:15 AM",
  updatedAt: "2026-11-04 11:30 AM",
  content: `OMG!! Our new product is INSANELY FAST! It is 100% guaranteed to beat every competitor. Get the craziest deal NOW! Don't miss this insane opportunity!

[Image: banner_hero_promo_q3.png - missing alt text]
[Logo: Brand Icon rendered in unauthorized #FF0055 Neon Red]`,
  metadata: {
    missingAltText: true,
    incorrectLogoColor: true,
    unsupportedClaims: true,
    unapprovedTerms: true
  }
};

export const INITIAL_VIOLATIONS = [
  {
    id: "viol-01",
    category: "Tone & Style",
    severity: "MEDIUM",
    detectedText: "OMG!!",
    suggestedFix: "Introducing",
    explanation: "Informal sensationalized acronyms and double exclamation marks violate the professional, confident brand tone requirement.",
    sourceCitation: "Brand Style Guide §3.2 (Tone & Register)",
    confidenceScore: 98,
    status: "Open"
  },
  {
    id: "viol-02",
    category: "Tone & Style",
    severity: "MEDIUM",
    detectedText: "INSANELY FAST",
    suggestedFix: "industry-leading performance",
    explanation: "Hyperbolic, aggressive promotional language lacks technical credibility and deviates from brand communication standards.",
    sourceCitation: "Brand Style Guide §3.2 (Tone & Register)",
    confidenceScore: 96,
    status: "Open"
  },
  {
    id: "viol-03",
    category: "Factual Claims",
    severity: "HIGH",
    detectedText: "100% guaranteed to beat every competitor",
    suggestedFix: "engineered for peak performance across key industry benchmarks",
    explanation: "Absolute guarantee and unqualified comparative superiority claims violate advertising regulations without third-party substantiation evidence.",
    sourceCitation: "Legal Compliance Guide §4.5 (Substantiation of Claims)",
    confidenceScore: 99,
    status: "Open"
  },
  {
    id: "viol-04",
    category: "Terminology & Glossary",
    severity: "MEDIUM",
    detectedText: "craziest deal",
    suggestedFix: "exclusive enterprise promotion",
    explanation: "Slang term 'craziest deal' undermines premium SaaS market positioning and is flagged under forbidden colloquialisms.",
    sourceCitation: "Brand Terminology Policy §2.1 (Approved Sales Vocabulary)",
    confidenceScore: 94,
    status: "Open"
  },
  {
    id: "viol-05",
    category: "Tone & Style",
    severity: "LOW",
    detectedText: "NOW!",
    suggestedFix: "today",
    explanation: "Capitalized urgency shouts at enterprise prospects; recommend subtle call-to-action phrasing.",
    sourceCitation: "Brand Style Guide §3.2 (Tone & Register)",
    confidenceScore: 91,
    status: "Open"
  },
  {
    id: "viol-06",
    category: "Terminology & Glossary",
    severity: "MEDIUM",
    detectedText: "insane opportunity",
    suggestedFix: "strategic milestone opportunity",
    explanation: "Colloquial term 'insane' is blacklisted in brand communication guidelines.",
    sourceCitation: "Brand Terminology Policy §2.1 (Competitive References)",
    confidenceScore: 93,
    status: "Open"
  },
  {
    id: "viol-07",
    category: "Visual & Accessibility",
    severity: "HIGH",
    detectedText: "[Image: banner_hero_promo_q3.png - missing alt text]",
    suggestedFix: "[Image: banner_hero_promo_q3.png - alt: 'Inkloom Guard dashboard interface displaying compliance metrics and audit studio']",
    explanation: "Promotional image asset lacks accessible alternative text, failing WCAG 2.1 AA compliance guidelines.",
    sourceCitation: "Accessibility Policy §2.4 (Alt Text & Visual Contrast)",
    confidenceScore: 97,
    status: "Open"
  },
  {
    id: "viol-08",
    category: "Visual & Accessibility",
    severity: "HIGH",
    detectedText: "[Logo: Brand Icon rendered in unauthorized #FF0055 Neon Red]",
    suggestedFix: "[Logo: Brand Icon rendered in official Electric Violet #8B5CF6]",
    explanation: "Logo icon uses non-approved neon hue (#FF0055) which conflicts with official Electric Violet #8B5CF6 brand color tokens.",
    sourceCitation: "Visual Identity Guide §1.3 (Primary Palette & Badges)",
    confidenceScore: 99,
    status: "Open"
  }
];

export const INITIAL_AUDIT_TRAIL = [
  {
    id: "audit-001",
    documentId: "doc-sample-01",
    documentName: "Q4 HyperGrowth Product Launch Campaign",
    user: "Aditi Choudhary",
    role: "Creator",
    action: "Document Created",
    previousState: "None",
    updatedState: "Draft",
    complianceScore: 42,
    timestamp: "2026-11-04 10:15:22",
    auditHash: "8f4b23c91e0a9d82e176b94c34a123df658b432a90e32b45cf0912ab7364d901"
  },
  {
    id: "audit-002",
    documentId: "doc-sample-01",
    documentName: "Q4 HyperGrowth Product Launch Campaign",
    user: "System (AI Diagnostic Engine)",
    role: "System",
    action: "Audit Initiated",
    previousState: "Draft",
    updatedState: "Scanning",
    complianceScore: 42,
    timestamp: "2026-11-04 10:16:04",
    auditHash: "7a9e34c982312fb44901abdc2193f54817a23efbc01289de349281ab8912ef02"
  },
  {
    id: "audit-003",
    documentId: "doc-sample-01",
    documentName: "Q4 HyperGrowth Product Launch Campaign",
    user: "System (AI Diagnostic Engine)",
    role: "System",
    action: "Violations Detected (8)",
    previousState: "Scanning",
    updatedState: "Issues Flagged",
    complianceScore: 42,
    timestamp: "2026-11-04 10:16:18",
    auditHash: "19ab840e9271ac820f845d098e213bfa76210ef89a0123cb9845720deaf18243"
  },
  {
    id: "audit-004",
    documentId: "doc-prev-09",
    documentName: "Annual Sustainability Whitepaper",
    user: "Khushi Chouhan",
    role: "Brand Manager",
    action: "Document Approved",
    previousState: "In Review",
    updatedState: "Approved",
    complianceScore: 98,
    timestamp: "2026-11-03 04:45:10",
    auditHash: "32fd891e45cb6701a2389e023847acff8910243bcda9018274ef901235678129"
  },
  {
    id: "audit-005",
    documentId: "doc-prev-09",
    documentName: "Annual Sustainability Whitepaper",
    user: "Aditi Choudhary",
    role: "Creator",
    action: "Document Published",
    previousState: "Approved",
    updatedState: "Published",
    complianceScore: 98,
    timestamp: "2026-11-03 05:12:00",
    auditHash: "45ac78091ef2345bc098712aef891234bce091823746fa091283746501928471"
  },
  {
    id: "audit-006",
    documentId: "doc-legal-02",
    documentName: "SOC2 Compliance Press Announcement",
    user: "Sanskrati Yadav",
    role: "Legal Compliance Reviewer",
    action: "Claim Locked",
    previousState: "Pending Substantiation",
    updatedState: "Legally Locked",
    complianceScore: 91,
    timestamp: "2026-11-02 02:20:19",
    auditHash: "67df89012345acbe8912736450192837465acb09182736450192837465acbd02"
  }
];

export const INITIAL_COMMENTS = [
  {
    id: "comm-1",
    documentId: "doc-sample-01",
    user: "Khushi Chouhan",
    role: "Brand Manager",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    timestamp: "2026-11-04 10:25 AM",
    content: "Aditi, please replace the aggressive hype language ('INSANELY FAST') and check the logo color hex token before we forward this to legal.",
    replies: [
      {
        id: "comm-1-1",
        user: "Aditi Choudhary",
        role: "Creator",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-11-04 10:32 AM",
        content: "Working on it now! Using the AI auto-fix to convert to 'industry-leading performance'."
      }
    ]
  },
  {
    id: "comm-2",
    documentId: "doc-sample-01",
    user: "Sanskrati Yadav",
    role: "Legal Compliance Reviewer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    timestamp: "2026-11-04 10:40 AM",
    content: "The claim '100% guaranteed to beat every competitor' cannot pass compliance without third-party lab benchmark citation. Applying legal lock until substantiated.",
    replies: []
  }
];

export const ANALYTICS_DATA = {
  kpis: {
    brandHealthScore: 87,
    totalAudited: 248,
    activeViolations: 36,
    autoFixRate: 78,
    pendingApprovals: 12,
    avgResolutionTime: "14.2 min"
  },
  categoryDistribution: [
    { name: "Tone & Style", value: 38, color: "#8B5CF6" },
    { name: "Terminology", value: 24, color: "#06B6D4" },
    { name: "Factual Claims", value: 20, color: "#F43F5E" },
    { name: "Visual Identity", value: 10, color: "#F59E0B" },
    { name: "Accessibility", value: 8, color: "#10B981" }
  ],
  trends30Days: [
    { day: "Oct 6", violations: 28, autoFixed: 19 },
    { day: "Oct 10", violations: 34, autoFixed: 24 },
    { day: "Oct 14", violations: 42, autoFixed: 33 },
    { day: "Oct 18", violations: 31, autoFixed: 25 },
    { day: "Oct 22", violations: 26, autoFixed: 22 },
    { day: "Oct 26", violations: 22, autoFixed: 18 },
    { day: "Oct 30", violations: 18, autoFixed: 16 },
    { day: "Nov 4", violations: 14, autoFixed: 13 }
  ],
  guidelineClarityIndex: [
    { rule: "RULE 01: Professional Voice", violations: 64, clarityScore: 72 },
    { rule: "RULE 02: Forbidden Terms", violations: 51, clarityScore: 68 },
    { rule: "RULE 03: Verified Claims", violations: 43, clarityScore: 61 },
    { rule: "RULE 04: Visual Identity", violations: 29, clarityScore: 84 },
    { rule: "RULE 05: Accessibility", violations: 22, clarityScore: 89 },
    { rule: "RULE 06: Regulatory Terms", violations: 19, clarityScore: 92 }
  ],
  autoFixPerformance: [
    { category: "Tone & Style", suggested: 85, accepted: 72, rejected: 8, manual: 5 },
    { category: "Terminology", suggested: 60, accepted: 52, rejected: 5, manual: 3 },
    { category: "Factual Claims", suggested: 45, accepted: 28, rejected: 12, manual: 5 },
    { category: "Visual & A11y", suggested: 35, accepted: 31, rejected: 2, manual: 2 }
  ]
};

export const PIPELINE_DOCUMENTS = [
  {
    id: "doc-sample-01",
    title: "Q4 HyperGrowth Product Launch Campaign",
    campaign: "Project Falcon - Global Rollout",
    type: "Advertisement",
    author: "Aditi Choudhary",
    stage: "In Review",
    score: 88,
    unresolvedHigh: 0,
    totalIssues: 8,
    fixedIssues: 7,
    lastUpdated: "10 mins ago"
  },
  {
    id: "doc-pipe-02",
    title: "Enterprise AI Security Datasheet",
    campaign: "CyberSec Conference 2026",
    type: "Website",
    author: "Aditi Choudhary",
    stage: "Scanning",
    score: 72,
    unresolvedHigh: 2,
    totalIssues: 5,
    fixedIssues: 2,
    lastUpdated: "1 hour ago"
  },
  {
    id: "doc-pipe-03",
    title: "Global Partner Ecosystem Invitation",
    campaign: "Q4 Partner Summit",
    type: "Email",
    author: "Khushi Chouhan",
    stage: "Approved",
    score: 96,
    unresolvedHigh: 0,
    totalIssues: 4,
    fixedIssues: 4,
    lastUpdated: "3 hours ago"
  },
  {
    id: "doc-pipe-04",
    title: "Zero-Trust Brand Compliance Press Release",
    campaign: "Brand Protection PR",
    type: "Social Media",
    author: "Aditi Choudhary",
    stage: "Published",
    score: 100,
    unresolvedHigh: 0,
    totalIssues: 6,
    fixedIssues: 6,
    lastUpdated: "Yesterday"
  }
];
