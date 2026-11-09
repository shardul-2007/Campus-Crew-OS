# CampusCrew Intelligence — Visual Interface & Screenshots Guide

> **Atlassian Codegeist 2026 UI/UX Showcase**  
> Visual hierarchy, design tokens, responsive states, and view catalog.

---

## 📸 Interface Views & Capabilities

### View 1: Engineering Command Center
- **Description:** Central operations dashboard showing active sprint telemetry, velocity pacing gauge, story points burndown, issue distribution cards, and the Blocker Root-Cause Matrix.
- **Design Tokens:** Dark slate background (`#020617`), emerald status accents (`#10b981`), rose blocker alert styling (`#e11d48`).
- **Key Elements:**
  - Sprint 42 Header Card: 71% Velocity Score, 5/37 points completed, 6 days remaining.
  - Distribution Counters: 8 Total, 2 In Progress, 1 In Review, 1 Done, 2 Blocked.
  - Blocker Matrix: `ENG-102` (52 hours blocked, Infrastructure cause) and `ENG-104` (28 hours blocked, PR dependency).
  - Filterable Issue Runway with priority badges and assignee avatars.

---

### View 2: Context Intelligence & Missing Documentation Engine
- **Description:** Bi-directional Jira ⟷ Confluence correlation graph and documentation coverage compliance engine.
- **Key Elements:**
  - Documentation Completeness Gauge: 62% coverage with target 80% threshold bar.
  - Missing Documentation Alerts: `ENG-107` (Blue/Green deployment) and `ENG-108` (Audit log compliance) flagged with Critical Risk.
  - Context Link Graph: Verified links with relevance match scores (e.g., `ENG-101` matched to OAuth 2.0 PKCE Architecture at 94% match).
  - Stale Documentation Detector: Highlights outdated runbooks exceeding the 30-day compliance cadence.

---

### View 3: AI Engineering Assistant & Atlassian Rovo Agent
- **Description:** Context-grounded conversational assistant and Rovo Agent interface.
- **Key Elements:**
  - Quick action prompt selector: Sprint Summary, Blocker Diagnostics, Delivery Risk Forecast.
  - Grounded References Box: Explicitly cites `ENG-101`, `ENG-102`, `ENG-104`, and Confluence page titles.
  - Tactical Interventions Table: Categorized by urgency (`[URGENT]`, `[HIGH]`, `[MEDIUM]`) with rationale and target owner designation.

---

### View 4: Team Workload & SPOF Knowledge Gaps
- **Description:** Developer workload balance, WIP limit saturation alarms, and Single Point of Failure (SPOF) warnings.
- **Key Elements:**
  - Engineer Cards: Workload gauges, points, in-progress streams, and role badges.
  - Overload Alarm: Sarah Jenkins marked `OVERLOADED` (13 story points, critical path blocked).
  - Unassigned Work Queue: High-priority unassigned tickets with 1-click reassignment dropdown.
  - SPOF Knowledge Gaps: Alerts identifying Database and Auth Service domain monopolies.

---

### View 5: Architecture Decision Records (ADR Hub)
- **Description:** Technical decision directory backed by Forge App Storage, linked to Jira epics and Confluence spaces.
- **Key Elements:**
  - ADR Cards: Title, Status (Accepted, Proposed, Superseded), Deciders, Context, Decision, and Consequences.
  - Interactive Modal: Form to author and save new ADRs with validation.
  - Direct Jira & Confluence pill links (`ENG-101`, `conf-201`).

---

### View 6: Release Delivery Confidence Dashboard
- **Description:** Comprehensive delivery health radar aggregating sprint velocity, blocker age, documentation coverage, and workload balance.
- **Key Elements:**
  - Delivery Confidence Gauge: Giant 68% score with `MODERATE RISK` tier badge.
  - Four Health Pillars: Sprint Velocity (30%), Blocker Health (30%), Doc Coverage (20%), Workload Balance (20%).
  - Key Hazards & Prioritized Mitigations.
  - 1-Click Executive Summary Export button.

---

## 🎨 UI/UX Design System Compliance

- **Typography:** Inter (body text) and JetBrains Mono (issue keys, story points, telemetry metrics).
- **Color Palette:** Atlassian-aligned dark palette with high-contrast accessibility:
  - Background: Deep slate (`#020617` / `#0f172a`)
  - Primary Accent: Atlassian Emerald (`#10b981`)
  - Warning Accent: Amber (`#f59e0b`)
  - Critical Accent: Rose / Red (`#f43f5e`)
  - Jira Brand Accent: Cyan / Blue (`#38bdf8` / `#0052cc`)
- **Responsive Layout:** Fluid grid layouts adapting from mobile screens (360px) to widescreen desktop monitors (1920px+).
- **State States:** Includes animated loading spinners, empty-state boundary guards, and inline error recovery banners.
