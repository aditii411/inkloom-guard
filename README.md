# INKLOOM GUARD
## AI-Powered Brand Governance & Pre-Publication Compliance Platform

**Team Name:** CTRL+ She  
**Team Members:**
- **Aditi Choudhary** 
- **Khushi Chouhan** 

---

### EXECUTIVE SUMMARY

**Inkloom Guard** is an enterprise-grade AI Brand Governance and Pre-Publication Compliance platform that prevents brand inconsistency, hyperbolic claims, unapproved terminology, WCAG accessibility gaps, and legal non-compliance **before** marketing and product collateral goes public.

The platform provides a dual-pane **Pre-Publish Audit Studio**, interactive explainable AI diagnostics, one-click deterministic auto-fixes, a **RAG Brand Guidelines Vault**, role-based approvals (Creator, Brand Manager, Legal Reviewer), dynamic telemetry charts, and an immutable SHA-256 state-anchored audit trail.

---

### KEY PLATFORM MODULES

1. **Overview Dashboard**
   - Live Brand Health Score gauge (87% baseline)
   - Real-time Pillar Breakdown: Tone, Terminology, Factual Claims, Visual Identity, WCAG Accessibility
   - KPI Cards: Total Audited Documents (248), Active Violations (36), Auto-Fix Acceptance (78%), Pending Approvals (12)
   - Recent activity stream & high-severity flagged violation shortcuts

2. **Pre-Publish Audit Studio (FLAGSHIP FEATURE)**
   - **Left Panel (Interactive Editor):** Document title, campaign initiative, content type selector (Social Media, Ad, Email, Web), live word/character counters, editable content with interactive inline violation highlights, and visual asset metadata inspection.
   - **Right Panel (AI Compliance Diagnostics):** Filter by pillar (Tone & Style, Terminology, Factual Claims, Visual & Accessibility) and severity (High, Medium, Low).
   - **Interactive Auto-Fix Engine:** 1-Click single replacement, batch "Apply All Suggested Fixes", multi-level Undo history, and Legal Claim Locks.
   - **Pre-Publication Governance Gate:** Explicitly blocks automatic approval if unresolved high-risk or unsubstantiated claims exist.

3. **Brand Guidelines Knowledge Base (RAG Vault)**
   - Centralized policy registry with 8+ initial rules (Style Guides §3.2, Terminology §2.1, Claims §4.5, Visual Identity §1.3, WCAG §2.4)
   - Interactive CRUD operations (Add Rule Modal, Edit, Toggle Active/Inactive, Delete)
   - **RAG Semantic Retrieval Playground:** Test semantic vector retrieval against embedded policy passages with cosine similarity scoring.
   - Simulated policy ingestion for PDF and DOCX files.

4. **Approval Center & Governance Pipeline**
   - Visual lifecycle pipeline: `Draft ➔ Scanning ➔ In Review ➔ Approved ➔ Published`
   - Strict role-based permission enforcement:
     - **Creator:** Author, run audits, apply auto-fixes, submit for review, reply to comments.
     - **Brand Manager:** Review, approve, request changes, verify brand consistency.
     - **Legal Reviewer:** Lock/unlock unsubstantiated claims, grant legal clearance.
   - Document collaboration thread with avatars, replies, and mentions.
   - **Approve & Publish Modal:** Generates a real SHA-256 cryptographic audit hash of the document snapshot and approver credentials.

5. **Governance & Analytics Dashboard**
   - Chart 1: Donut Chart — Violation Distribution by Category
   - Chart 2: 30-Day Recurring Violation Trends (Line / Area)
   - Chart 3: Guideline Clarity Index (Identifies ambiguous policy rules)
   - Chart 4: Auto-Fix Performance (Suggested vs Accepted vs Rejected vs Manual)
   - Export analytics dataset as CSV & Download Executive Compliance Summary Report.

6. **Verifiable Audit Trail**
   - Searchable, filterable audit log tracking every document change, audit run, auto-fix, claim lock, and approval.
   - SHA-256 integrity hash for each event with one-click clipboard copy.
   - Historical state snapshot modal.

7. **Platform Settings & AI Configuration**
   - Dual-engine architecture:
     - **Rule-Based Deterministic Engine:** 100% offline, verified demo mode with zero external dependency.
     - **Google Gemini API:** Live semantic analysis integration via `gemini-1.5-flash`.
   - Security toggles (Strict Publication Gate, Legal Dual-Signoff, Auto-Fix Confidence Threshold).
   - 1-Click "Reset Demo Data" button for fresh hackathon demonstration walkthroughs.

---

### PROJECT STRUCTURE

```
inkloom-guard/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # ToastContainer, UI components
│   │   ├── context/         # AppContext (Role, Document, Violations, Guidelines, Logs)
│   │   ├── data/            # Seeded demo data, initial violations, users, rules
│   │   ├── layouts/         # Sidebar, TopNavbar, AppLayout
│   │   ├── pages/           # Overview, AuditStudio, Guidelines, Approvals, Analytics, AuditTrail, Settings, Login
│   │   ├── utils/           # SHA-256 crypto helper
│   │   ├── App.jsx          # Route configurations
│   │   ├── main.jsx         # React DOM root
│   │   └── index.css        # Tailwind directives & dark glassmorphism
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── app/
│   │   ├── ai/              # rule_engine.py (deterministic fallback), gemini_service.py
│   │   ├── api/             # auth, documents, audit, guidelines, approvals, analytics, audit_trail
│   │   ├── core/            # config.py
│   │   ├── rag/             # rag_engine.py (vector chunks & semantic matching)
│   │   ├── schemas/         # schemas.py (Pydantic request/response models)
│   │   ├── utils/           # hasher.py (SHA-256 hashing)
│   │   └── main.py          # FastAPI application entry point
│   ├── tests/               # test_audit.py
│   └── requirements.txt
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

### RUNNING LOCALLY

#### 1. Frontend (React + Vite + Tailwind CSS)

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at **http://localhost:5173**.

To build for production:
```bash
npm run build
```

#### 2. Backend (FastAPI + Python)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The backend API will run at **http://localhost:8000** with interactive Swagger documentation at **http://localhost:8000/docs**.

---

### HACKATHON LIVE DEMO SCRIPT (3–5 MINUTES)

1. **Step 1: Login & Persona**
   - Go to `/login` and click **"Creator Persona (Aditi Choudhary)"**.
2. **Step 2: Pre-Publish Audit Studio**
   - Click **"Pre-Publish Audit Studio"** in the sidebar.
   - Note the loaded non-compliant copy: *"OMG!! Our new product is INSANELY FAST! It is 100% guaranteed to beat every competitor. Get the craziest deal NOW! Don't miss this insane opportunity!"*
3. **Step 3: Run AI Audit**
   - Click **"Run AI Audit"**. Watch the animated multi-stage scanning overlay (tokenization, RAG guideline retrieval, claim verification, accessibility check).
4. **Step 4: Inspect Categorized Diagnostics**
   - Explore the flagged cards: Tone & Style, Terminology, Factual Claims, and Visual/Accessibility.
   - Notice the high-severity alert: *"Publication Blocked: Unresolved critical claims."*
5. **Step 5: Apply Auto-Fix**
   - Click **"Apply Auto-Fix"** on individual cards (e.g. replacing "OMG!!" with "Introducing", "INSANELY FAST" with "industry-leading performance") or click **"Apply All Fixes"**.
   - Watch the editor text update live and the Compliance Score animate from **42% to 100%**!
6. **Step 6: Submit for Review**
   - Click **"Submit for Review"**.
7. **Step 7: Switch Role to Brand Manager**
   - In the top navbar, switch role to **"Brand Manager (Khushi Chouhan)"**.
   - Navigate to the **Approval Center** and see the document in the review queue.
8. **Step 8: Switch Role to Legal Reviewer**
   - Switch role to **"Legal Reviewer (Sanskrati Yadav)"**. Show how legal reviewers can inspect claims and apply legal holds/clearances.
9. **Step 9: Approve & Publish with Cryptographic Hash**
   - Click **"Approve & Publish"**. Inspect the generated **SHA-256 Audit Hash**, and observe the confetti celebration!
10. **Step 10: Show Analytics & Audit Trail**
    - Open **Analytics** to view the live charts and export the CSV/Executive report.
    - Open **Audit Trail** to view the immutable append-only event log with verifiable hashes.
11. **Reset Demo:**
    - Click **"Reset Demo"** in the top navigation at any time to instantly restore the initial 8 violations for another judge.
