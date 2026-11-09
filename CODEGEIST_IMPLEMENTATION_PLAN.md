# CampusCrew Intelligence — Codegeist 2026 Implementation Plan

**Project:** CampusCrew Intelligence — AI-Powered Engineering Operations Hub  
**Hackathon:** Atlassian Codegeist 2026  
**Primary Category:** Apps for Software Teams  
**Platform:** Atlassian Forge (Jira Cloud, Confluence Cloud, Rovo AI Agent)

---

## 1. Executive Summary & Audit of Existing Codebase

### 1.1 Existing Architecture Overview
The existing repository (`Campus-Crew-OS`) was designed as a student chapter & campus hackathon event operations system with the following stack:
- **Framework:** Next.js 14.2.15 (App Router), React 18.3.1, TypeScript 5.5.4, Tailwind CSS 3.4.10.
- **Dependencies:** Framer Motion, Lucide React, Recharts, TanStack Table, Zod, React Hook Form, PDF-Lib, Canvas-Confetti, XLSX.
- **Database & State:** Dual approach — Supabase PostgreSQL schema with migrations (`supabase/migrations/20261005000000_campus_crew_os_init.sql`) and an in-memory mock store (`src/lib/db/store.ts` + `mock-data.ts`).
- **Authentication & RBAC:** Role-based access control (`crew_member`, `analyst`, `admin`, `program_manager`, `technical_lead`) in `src/lib/permissions/rbac.ts`.
- **Ancillary Assets:** Portfolio code (`src/data/portfolio.ts`, `src/components/sections/`, `imageshardul.png`, `Shardul-Portfolio.zip`) mixed into the repository.

### 1.2 Security Audit & Secret Assessment
- **Hardcoded Secrets Check:** Verified across all files using pattern matching for API keys, secret tokens, bearer auth, and credentials. Result: **Clean — no live API keys or database connection credentials exposed in code.**
- **Environment Files:** No active `.env` containing sensitive credentials committed to Git.
- **Permissions & Authentication Security:**
  - Previous system relied on simulated client-side or header-based user roles.
  - **Forge Upgrade:** Replaced with official Atlassian Forge OAuth 2.0 3LO context (`@forge/api` with `asUser()` and `asApp()`), adhering to Atlassian tenant boundary isolation and least-privilege permission scopes.

### 1.3 Functionality Retained vs. Replaced / Redesigned

| Existing Component / Feature | Decision | Rationale & Transformation |
| :--- | :--- | :--- |
| **Documentation Completeness Gauge** (`DocumentationScoreGauge.tsx`) | **Retained & Evolved** | Evolved into the **Software Engineering Documentation Coverage Engine**, evaluating Jira Epics and Stories against Confluence architectural specifications, ADRs, and runbooks. |
| **10-Stage Lifecycle Workflow** (`LifecycleBar.tsx`, `EventStage`) | **Retained & Evolved** | Evolved from campus event stages to **Software Engineering Delivery Lifecycle (SDLC)**: `SPEC` → `ARCH` → `BUILD` → `TEST` → `SEC_REVIEW` → `STAGING` → `DEPLOY` → `MONITOR` → `DOCS` → `RETRO`. |
| **Command Center Dashboard** (`EventCommandCenter.tsx`, `AppShell.tsx`) | **Redesigned for Jira/Confluence** | Redesigned into the **Engineering Command Center** with real-time Jira sprint telemetry, blocker matrices, milestone trackers, and workload distribution. |
| **Role-Based Access Control** (`rbac.ts`) | **Retained & Integrated** | Integrated with Atlassian Cloud Account IDs, Jira Project Roles (Administrators, Developers, Viewers), and Forge permission scopes. |
| **Proof & Verification System** (`ProofVerificationList.tsx`) | **Evolved into Quality Gates** | Transformed into Engineering Quality & Compliance Verification (linking pull requests, security audits, architecture reviews, and test coverage). |
| **Mock In-Memory Store** (`store.ts`) | **Retained as Local Dev Driver / Replaced with Forge APIs** | Preserved for offline unit testing and development preview; replaced in production with `@forge/api` calling Jira REST API v3, Confluence REST API v2, and Forge Storage (`storage.get/set/query`). |
| **Campus Event Management / Certificate Generation** | **Deprecated from Primary Navigation** | Documented and archived from the primary software team view to focus 100% on **Apps for Software Teams** for Codegeist 2026. Code retained in legacy archives without polluting the Forge app. |
| **Portfolio Assets** (`portfolio.ts`, `Shardul-Portfolio.zip`) | **Archived** | Unrelated personal portfolio files archived from active build path. |

---

## 2. Product Vision: CampusCrew Intelligence

### The Core Problem
Modern engineering teams suffer from severe **context fragmentation**:
1. **The Disconnect:** Tasks live in Jira, architectural decisions live in Confluence, workload details live in team heads, and delivery risks stay hidden until sprint deadlines.
2. **Missing Documentation:** Critical Jira tickets are built and deployed with zero linked Confluence technical specifications or runbooks.
3. **Blocker Blindspots:** Blocked tickets accumulate cycle-time delay without root-cause analysis or escalation.
4. **Team Overload:** Engineering managers lack automated visibility into uneven workload distribution and single points of failure (SPOFs).

### The Solution: CampusCrew Intelligence
A unified **Engineering Operations Hub** running natively on **Atlassian Forge**:
- **Engineering Command Center:** Unified dashboard across Jira active sprints, epics, blockers, and milestone burnup.
- **Context Intelligence Engine:** Automated bi-directional correlation between Jira issues and Confluence architecture pages, detecting documentation deficits before release.
- **AI Engineering Assistant & Rovo Agent:** Status summarizer, blocker root-cause diagnostics, sprint retro generation, and risk prediction grounded strictly in retrieved Atlassian context.
- **Team Workload Intelligence:** WIP limits, burnout warning indicators, unassigned task alerts, and domain ownership mapping.
- **Decision & Knowledge Tracking:** Architecture Decision Records (ADRs) linked directly to Jira epics and Confluence spaces with stale-documentation detectors.
- **Confidence Dashboard:** Composite project delivery health index (0–100) combining sprint velocity, blocker age, documentation coverage, and cycle risk.

---

## 3. Atlassian Forge Architecture & Modules

### 3.1 Forge Modules (`manifest.yml`)
1. **`jira:projectPage`**
   - Title: `CampusCrew Intelligence`
   - Key: `campuscrew-engineering-hub`
   - Target: Project-level engineering operations cockpit for development teams.
2. **`jira:globalPage`**
   - Title: `CampusCrew Ops Hub`
   - Key: `campuscrew-global-hub`
   - Target: Cross-project engineering leadership and resource allocation dashboard.
3. **`confluence:globalPage`**
   - Title: `CampusCrew Decision Hub`
   - Key: `campuscrew-confluence-hub`
   - Target: Documentation coverage and Architecture Decision Records (ADR) cockpit in Confluence.
4. **`rovo:agent` (Codegeist 2026 AI Innovation)**
   - Key: `campuscrew-ai-agent`
   - Name: `CampusCrew Engineering Agent`
   - Capabilities: Summarize sprint health, diagnose blockers, discover unlinked Confluence docs, evaluate team workload.
   - Actions: `getProjectHealth`, `getContextIntelligence`, `analyzeDeliveryRisks`.

### 3.2 Forge Backend Resolvers (`src/resolvers/`)
- `getEngineeringOverview`: Fetches Jira project issues, sprint state, blocker counts, and team assignments.
- `getContextIntelligence`: Discovers related Confluence documentation via CQL/text search, calculates documentation coverage, and identifies high-risk undocumented issues.
- `getTeamWorkload`: Aggregates active work per assignee, detects WIP violations, and unassigned work.
- `getDecisionsAndADRs`: Retrieves ADRs stored in Forge App Storage and correlates them to Jira tickets and Confluence pages.
- `runAIEngineeringAssistant`: AI-grounded inference producing sprint summaries, blocker root-cause analysis, and tactical recommendations based on live Atlassian payload.
- `recordDecision`: Persists new architectural decisions to Forge Storage with cross-links.

### 3.3 Security & Least-Privilege Scopes
- `read:jira-work`: Read project tickets, sprints, issue links, and statuses.
- `read:jira-user`: Read assignees and team members.
- `read:confluence-content.summary`: Read documentation titles, excerpts, and tags.
- `read:confluence-space.summary`: Read space keys and metadata.
- `storage:app`: Secure tenant-isolated storage for ADRs and configuration.

---

## 4. Implementation Steps & Verification Milestones

1. **Phase 1: Project Restructuring & Forge Manifest Configuration**
   - Configure clean Forge app structure with `manifest.yml`.
   - Setup `@forge/api`, `@forge/resolver`, `@forge/bridge`.
   - Setup hybrid bridge adapter supporting both live Forge Cloud runtime and local development preview.

2. **Phase 2: Core Engineering Backend Resolvers & Algorithms**
   - Implement Jira Data Retrieval & sprint metrics computation.
   - Implement Confluence Context Linker & Documentation Coverage scoring.
   - Implement Team Workload & WIP limit evaluator.
   - Implement Decision (ADR) storage and tracking.
   - Implement AI Engineering Intelligence Engine with Atlassian context grounding.

3. **Phase 3: High-Fidelity Custom UI Frontend**
   - Modern dark-mode engineering operations hub inspired by Atlassian Design tokens.
   - Command Center with sprint telemetry, blocker matrix, and milestone progress.
   - Context Intelligence tab with Jira-Confluence link graph and documentation gap alerts.
   - AI Assistant tab with interactive prompts (Sprint Summary, Blocker Root-Cause, Risk Forecast).
   - Team Workload tab with distribution gauges and SPOF risk cards.
   - Decisions & ADRs tab with interactive creation and Jira issue binding.
   - Confidence Dashboard with real-time composite score.

4. **Phase 4: Comprehensive Test Suite & Quality Verification**
   - Automated unit tests for all resolvers, context linking, health scoring, and edge cases.
   - Empty state, unauthorized access, and API error recovery tests.
   - Linting, TypeScript type-check, and build verification.

5. **Phase 5: Codegeist 2026 Hackathon Deliverables**
   - `README.md` (Compelling product story, installation guide, architecture).
   - `ARCHITECTURE.md` (Detailed system design, data flow diagrams, Forge modules).
   - `TESTING.md` (Test matrix, coverage, execution instructions).
   - `SECURITY.md` (Threat model, scopes, privacy, Atlassian compliance).
   - `DEMO_SCRIPT.md` (Step-by-step judge demonstration guide and screenshots checklist).
