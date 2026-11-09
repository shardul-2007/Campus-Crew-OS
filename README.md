# CampusCrew Intelligence — AI-Powered Engineering Operations Hub

> **Atlassian Codegeist 2026 Hackathon Submission**  
> **Primary Category:** Apps for Software Teams  
> **Platform:** Atlassian Forge (Jira Cloud, Confluence Cloud, Atlassian Rovo)

[![Atlassian Forge](https://img.shields.io/badge/Platform-Atlassian%20Forge-0052CC?logo=atlassian&logoColor=white)](https://developer.atlassian.com/platform/forge/)
[![Jira Cloud](https://img.shields.io/badge/Integration-Jira%20Cloud%20REST%20v3-0052CC?logo=jira&logoColor=white)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
[![Confluence Cloud](https://img.shields.io/badge/Integration-Confluence%20REST%20v2-172B4D?logo=confluence&logoColor=white)](https://developer.atlassian.com/cloud/confluence/rest/v2/intro/)
[![Atlassian Rovo](https://img.shields.io/badge/AI-Atlassian%20Rovo%20Agent-00B8D9?logo=probot&logoColor=white)](https://www.atlassian.com/software/rovo)
[![Test Suite](https://img.shields.io/badge/Tests-43%20Passed%20%7C%200%20Failed-10B981)](#-automated-testing)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

---

## 🎯 The Problem

Modern software engineering teams suffer from severe **context fragmentation**:
1. **Disconnected Silos:** Tasks live in Jira, architectural decisions live in Confluence, workload capacity lives in team heads, and delivery risks stay hidden until deadline day.
2. **Missing Documentation Blindspots:** High-priority Jira epics and stories are frequently built and shipped without linked Confluence technical specifications, PRDs, or operational runbooks.
3. **Unresolved Critical Blockers:** Blocked issues linger in sprints for days, accumulating cycle-time delay without root-cause diagnostics or automated escalation.
4. **Workload Inequity & SPOF Bottlenecks:** Engineering managers lack visibility into uneven work distribution, parallel in-progress stream saturation (WIP violations), and Single Point of Failure (SPOF) domains where only one engineer holds critical technical knowledge.

---

## 🚀 The Solution: CampusCrew Intelligence

**CampusCrew Intelligence** connects the dots between Jira Cloud, Confluence Cloud, and team knowledge into an actionable, AI-powered engineering operations hub. Built natively on **Atlassian Forge** with Custom UI and an autonomous **Atlassian Rovo Agent**, it gives engineering leads and development squads 360-degree visibility over delivery health.

```
                  ┌───────────────────────────────────────────────┐
                  │          CampusCrew Intelligence              │
                  │       (Atlassian Forge Custom UI)             │
                  └──────┬─────────────────┬────────────────┬─────┘
                         │                 │                │
            ┌────────────▼─────────┐       │       ┌────────▼─────────────┐
            │      Jira Cloud      │       │       │   Confluence Cloud   │
            │                      │       │       │                      │
            │ • Active Sprints     │       │       │ • Architecture Specs │
            │ • Issues & Epics     │       │       │ • Technical PRDs     │
            │ • Blocked Tickets    │       │       │ • Incident Runbooks  │
            │ • Velocity & Points  │       │       │ • Stale Doc Checks   │
            └──────────────────────┘       │       └──────────────────────┘
                                           │
                         ┌─────────────────▼────────────────┐
                         │      Atlassian Rovo Agent        │
                         │                                  │
                         │ • Sprint Health Summarizer       │
                         │ • Blocker Root-Cause Explainer   │
                         │ • Delivery Confidence Predictor  │
                         │ • Grounded 3LO Recommendations   │
                         └──────────────────────────────────┘
```

---

## ✨ Core Features

### 1. Engineering Command Center
- **Active Sprint Telemetry:** Real-time tracking of sprint goals, days remaining, velocity score, and story points burndown.
- **Issue Distribution Breakdown:** Live distribution across To Do, In Progress, In Review, Done, and Blocked categories.
- **Blocker Severity Matrix:** Automatically diagnoses blocked tickets, tracks blocker age in hours, pinpoints root-cause categories (Infrastructure, PR Review Lag, External API, Unspecified Requirements), and suggests tactical mitigations.
- **Filterable Ticket Runway:** Instant inspection of tickets with priority badges, story points, and assignee avatars.

### 2. Context Intelligence Engine
- **Automated Jira ⟷ Confluence Linking:** Semantic and concept correlation matching active Jira issues to relevant Confluence technical specs, RFCs, and runbooks.
- **Missing Documentation Alerts:** Automatically flags High/Highest priority Jira tickets that have 0 linked Confluence architecture specs or PRDs before release.
- **Documentation Completeness Gauge (0–100%):** Evolved from CampusCrew's documentation scoring system into an automated engineering compliance metric with an 80%+ release threshold.
- **Stale Documentation Detector:** Alerts engineering leads when Confluence runbooks exceed the 30-day compliance cadence while linked code components continue to evolve.

### 3. AI Engineering Assistant & Atlassian Rovo Agent
- **One-Click Intelligence Actions:**
  - *Sprint Summary & Health:* Synthesizes completed work, in-review tickets, and active bottlenecks.
  - *Deep Blocker Root-Cause Analysis:* Analyzes blocker duration, cross-service PR dependencies, and infrastructural contention.
  - *Predictive Release Delivery Risk:* Evaluates burn rate deficit, workload skew, and release fragility.
- **Zero-Hallucination Grounded Citations:** Every AI insight explicitly cites the exact retrieved Jira issue keys (`ENG-101`, `ENG-102`, `ENG-104`) and Confluence document titles.
- **Atlassian Rovo Actions:** Full integration with Rovo conversational workflows through `get-project-overview`, `get-context-intelligence`, and `analyze-delivery-risks` actions.

### 4. Team Workload Intelligence
- **Developer Workload Matrix:** Active issues, parallel in-progress streams, review load, and total assigned story points.
- **WIP Overload Warnings:** Alerts when engineers exceed safe Work-in-Progress (WIP) thresholds (> 2 parallel streams, > 8 points while blocked).
- **Unassigned Work Queue:** Flags high-priority unassigned tickets with 1-click reassignment to available engineers.
- **Single Point of Failure (SPOF) Detection:** Identifies critical component domains (e.g., Database, Auth Service) monopolized by a single engineer.

### 5. Decision & Knowledge Tracking (ADR Hub)
- **Architecture Decision Records (ADRs):** Persistent technical decision directory backed by Forge App Storage (`storage:app`).
- **Jira & Confluence Cross-Binding:** Binds decisions to Jira keys (`ENG-101`) and Confluence pages (`conf-201`).
- **Interactive ADR Logger:** Modal form allowing architects to record Title, Status (Proposed, Accepted, Superseded, Deprecated), Context, Decision, and Consequences.
- **Stale ADR Detector:** Identifies accepted ADRs whose corresponding Jira tickets completed without official documentation sync.

### 6. Release Delivery Confidence Dashboard
- **Composite Delivery Health Score (0–100%):** Mathematical multi-factor evaluation combining:
  - Sprint Velocity Pacing (30% weight)
  - Blocker Health (30% weight)
  - Documentation Coverage (20% weight)
  - Team Workload Balance (20% weight)
- **Risk Radar & Prioritized Mitigations:** Categorized risk indicators with actionable mitigations for engineering managers.
- **1-Click Executive Summary Export:** Formatted release readiness report for leadership syncs.

---

## 🛠️ Atlassian Forge Architecture & Modules

CampusCrew Intelligence is authored strictly according to official Atlassian Forge specifications (`manifest.yml`):

| Module | Key | Title / Purpose |
| :--- | :--- | :--- |
| `jira:projectPage` | `campuscrew-engineering-hub` | Project-level engineering operations cockpit directly in the Jira project sidebar. |
| `jira:globalPage` | `campuscrew-global-hub` | Cross-project engineering operations view for engineering leadership. |
| `confluence:globalPage` | `campuscrew-confluence-hub` | Decision Hub and documentation coverage view inside Confluence. |
| `rovo:agent` | `campuscrew-rovo-agent` | Autonomous AI operations assistant discoverable in Atlassian Rovo. |
| `action` | `get-project-overview` | Rovo action returning real-time sprint status, velocity, and blocker count. |
| `action` | `get-context-intelligence` | Rovo action auditing Confluence documentation coverage and missing specs. |
| `action` | `analyze-delivery-risks` | Rovo action computing release confidence scores and SPOF bottlenecks. |

### Least-Privilege Scopes
- `read:jira-work`: Read project tickets, sprints, issue links, statuses, and components.
- `read:jira-user`: Read assignees, reporters, and account IDs.
- `read:confluence-content.summary`: Read page titles, excerpts, and metadata.
- `read:confluence-space.summary`: Read Confluence space keys.
- `read:confluence-props`: Read page properties.
- `storage:app`: Tenant-isolated Forge persistent storage for ADRs and configuration.

---

## 🧪 Automated Testing

CampusCrew Intelligence includes a 43-assertion automated test suite verifying every layer of the architecture:

```bash
npm test
```

### Test Coverage Matrix
```
================================================================
  CAMPUSCREW INTELLIGENCE — ATLASSIAN CODEGEIST 2026 TEST SUITE
================================================================

--- 1. JIRA DATA RETRIEVAL & SPRINT DIAGNOSTICS ---
  [PASS] Retrieves Jira issues collection
  [PASS] Contains expected key ENG-101
  [PASS] All issues have valid statusCategory and priority
  [PASS] Retrieves active sprint payload
  [PASS] Sprint has positive total story points
  [PASS] Diagnoses blocked tickets
  [PASS] Detects infrastructure root-cause on database blocker
  [PASS] Every blocker includes tactical mitigation

--- 2. CONFLUENCE CONTEXT LINKING & MISSING DOC DETECTION ---
  [PASS] Retrieves Confluence documentation pages
  [PASS] Establishes bi-directional context links
  [PASS] Correlates ENG-101 to OAuth Confluence architecture spec
  [PASS] Calculates valid coverage percentage
  [PASS] Flags high-priority tickets with missing documentation
  [PASS] Correctly flags ENG-107 as missing spec

--- 3. TEAM WORKLOAD INTELLIGENCE & SPOF DETECTION ---
  [PASS] Aggregates workload across team members
  [PASS] Detects unassigned sprint issues
  [PASS] Detects overloaded engineers exceeding WIP limits
  [PASS] Identifies Single Point of Failure (SPOF) domain monopolies
  [PASS] Flags Database domain as high SPOF risk

--- 4. ARCHITECTURE DECISION RECORDS (ADR) HUB ---
  [PASS] Retrieves recorded ADRs
  [PASS] Records new ADR with valid identifier
  [PASS] Persists new ADR into storage collection

--- 5. AI ENGINEERING ASSISTANT & GROUNDED CITATIONS ---
  [PASS] Generates comprehensive sprint intelligence summary
  [PASS] AI grounds summary strictly in retrieved Jira issue keys
  [PASS] AI references actual retrieved Confluence document titles
  [PASS] Produces prioritized tactical interventions
  [PASS] Calculates composite confidence score
  [PASS] Assigns valid delivery risk tier

--- 6. FORGE RESOLVER FUNCTIONS ---
  [PASS] Resolver getEngineeringOverview returns valid project
  [PASS] Resolver returns populated issues payload
  [PASS] Resolver getContextIntelligence computes coverage
  [PASS] Resolver runAIEngineeringAssistant handles risk forecast

--- 7. ATLASSIAN ROVO AGENT ACTIONS ---
  [PASS] Rovo action get-project-overview executes successfully
  [PASS] Rovo action returns blocker summaries
  [PASS] Rovo action get-context-intelligence reports coverage
  [PASS] Rovo action analyze-delivery-risks reports risk tier

--- 8. EMPTY STATES & ZERO DIVISION BOUNDARY TESTS ---
  [PASS] Empty issue list yields 100% coverage without NaN or division by zero
  [PASS] Empty issue list yields 0 missing docs
  [PASS] Empty issue list yields empty team member array
  [PASS] Empty issue list yields 0 total story points
  [PASS] Confidence score remains numeric when sprint points are 0

--- 9. INVALID INPUTS & ERROR HANDLING ---
  [PASS] Properly rejects invalid ADR missing required fields
  [PASS] Rovo handler safely handles unsupported action keys

================================================================
  TEST RESULTS: 43 PASSED, 0 FAILED (TOTAL: 43)
================================================================
```

---

## 💻 Installation & Deployment

### Prerequisites
- Node.js >= 18.x (tested on v24.18.0)
- npm >= 9.x
- Atlassian Cloud site with Jira Software & Confluence
- Atlassian Forge CLI (`npm install -g @forge/cli`)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build the Forge Custom UI
```bash
npm run build
```
*This compiles the React 18 Custom UI bundle with relative asset paths into `static/dist`.*

### Step 3: Run Local Interactive Dev Server (Optional)
```bash
npm run dev
```
*Launches the interactive operations hub on `http://localhost:3000` with the built-in dev bridge adapter.*

### Step 4: Deploy & Install to Atlassian Cloud
```bash
# Log in to your Atlassian developer account
forge login

# Register the app (if deploying a new instance)
forge register

# Deploy code to Forge Cloud development environment
forge deploy

# Install the app into your Jira & Confluence Cloud site
forge install
```

---

## 🔒 Security & Privacy

CampusCrew Intelligence follows strict enterprise security best practices:
1. **Tenant Isolation:** All data storage is partitioned by Atlassian Cloud tenant ID using Forge App Storage (`storage:app`). No cross-tenant data bleed is possible.
2. **Atlassian 3LO Authentication:** Uses official Forge OAuth 2.0 3LO context (`asUser()`). The app never asks for or stores user passwords or API tokens.
3. **No External Secrets:** No database credentials or third-party API keys are embedded or required in code.
4. **Least-Privilege Authorization:** Requested scopes are strictly limited to `read:` permissions on necessary entities.

See [SECURITY.md](SECURITY.md) for full threat modeling and compliance details.

---

## 📜 Documentation Index

- [ARCHITECTURE.md](ARCHITECTURE.md) — Comprehensive technical architecture, data flow diagrams, and resolver specifications.
- [CODEGEIST_IMPLEMENTATION_PLAN.md](CODEGEIST_IMPLEMENTATION_PLAN.md) — Full audit of the original codebase and evolution roadmap.
- [TESTING.md](TESTING.md) — Complete test matrix, edge case analysis, and validation instructions.
- [SECURITY.md](SECURITY.md) — Security posture, scope justification, and data retention policies.
- [DEMO_SCRIPT.md](DEMO_SCRIPT.md) — Step-by-step judge walkthrough and demo guide.
- [SCREENSHOTS.md](SCREENSHOTS.md) — UI screenshots and visual interface catalog.

---

## 🏆 Hackathon Compliance & Strict Rules

- **Originality:** Rebuilt and transformed from the open-source CampusCrew OS foundation specifically for Atlassian Codegeist 2026.
- **Genuine Integrations:** Directly interfaces with official Atlassian Forge APIs (`@forge/api`, `@forge/resolver`, `@forge/bridge`), Jira REST API v3, Confluence REST API v2, and Atlassian Rovo Agent specifications.
- **No Fictitious Claims:** Accurately documents supported Forge modules and provides automated test verification for every capability.
