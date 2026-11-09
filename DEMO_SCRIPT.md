# CampusCrew Intelligence — Hackathon Demo Script & Presentation Guide

> **Atlassian Codegeist 2026 Walkthrough**  
> *A 3-minute guided tour demonstrating how CampusCrew Intelligence resolves context fragmentation across Jira Cloud, Confluence Cloud, and team knowledge.*

---

## ⏱️ Quick Start: Run the Interactive Demo in 10 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Run the test suite
npm test

# 3. Launch the interactive operations hub
npm run dev
```

Open your browser to **`http://localhost:3000`**.  
The application loads with the active **`ENG`** software platform project, displaying live sprint telemetry, context graphs, and AI diagnostics.

---

## 🎬 3-Minute Hackathon Presentation Script

### **Act 1: The Hook — Context Fragmentation in Software Teams (0:00 - 0:35)**
- **Speaker:**  
  *"Every software engineering squad faces the same silent killer: context fragmentation. Tasks live in Jira, architectural specs live in Confluence, workload capacity lives in team heads, and delivery risks only reveal themselves the day of release. Today, we are proud to introduce **CampusCrew Intelligence**, the AI-powered engineering operations hub built natively on **Atlassian Forge**."*
- **Visual:**  
  Show the top navigation with the project selector (`ENG`), the **Codegeist 2026** badge, and the real-time **Release Delivery Confidence Index** pill displaying `68% (MODERATE RISK)`.

---

### **Act 2: The Command Center & Blocker Root-Cause Matrix (0:35 - 1:15)**
- **Action:** Click on the **Command Center** tab.
- **Narrative:**  
  *"Here in the Command Center, engineering leads get an instant heartbeat of their active sprint: Sprint 42 - Cloud Scale. We see 37 story points on the board, 6 days remaining, and a velocity score of 71%."*
- **Highlighting the Blocker Matrix:**  
  *"Look below at the Blocker Severity Matrix. Instead of a generic 'Blocked' flag, CampusCrew Intelligence diagnoses the root cause. We see **ENG-102** has been stalled for 52 hours due to PostgreSQL connection pool starvation. It pinpoints the exact infrastructure cause and recommends deploying RDS PgBouncer."*
- **Visual:**  
  Point to the red-tinted critical blocker card for `ENG-102` with Sarah Jenkins as the owner and 52 hours duration.

---

### **Act 3: Context Intelligence — Catching the Missing Documentation Blindspot (1:15 - 1:55)**
- **Action:** Click on the **Context Intelligence** tab.
- **Narrative:**  
  *"Now let's switch to Context Intelligence. Here is where the magic of Atlassian integration shines. The engine performs real-time conceptual correlation between Jira issues and Confluence pages."*
- **Highlighting the Documentation Coverage Engine:**  
  *"Notice our Documentation Completeness Gauge: 62%. We retain and evolve CampusCrew's documentation scoring into an engineering compliance gate. The system immediately flags a **Critical Missing Documentation Alert** on **ENG-107** (Blue/Green deployment pipeline). Engineers are about to deploy an 8-story-point Kubernetes traffic shift without a single Confluence architecture spec or runbook!"*
- **Visual:**  
  Hover over the verified link cards (`ENG-101` connected to `OAuth 2.0 PKCE & Forge Custom UI Architecture` with 94% relevance match).

---

### **Act 4: AI Engineering Assistant & Atlassian Rovo Agent (1:55 - 2:35)**
- **Action:** Click on the **AI Assistant & Rovo** tab.
- **Narrative:**  
  *"Engineering managers don't have time to sift through dozens of tabs. With our AI Assistant—also exposed directly as an autonomous **Atlassian Rovo Agent**—leads can ask grounded questions."*
- **Action:** Click the **'Blocker Root-Cause Diagnostics'** prompt pill.
- **Narrative:**  
  *"Watch how the AI responds. It provides a zero-hallucination analysis grounded strictly in retrieved Atlassian context. Notice the **Grounded References Box**: it explicitly cites `ENG-102`, `ENG-104`, and the exact Confluence Runbook. Below, it generates prioritized tactical interventions for Sarah Jenkins and Alex Chen."*
- **Visual:**  
  Show the Grounded References box and the prioritized `[URGENT]` recommendation card.

---

### **Act 5: Team Workload, SPOF Detection & Architecture Decisions (2:35 - 3:00)**
- **Action:** Quick tour through **Team Workload** and **Decisions & ADRs**.
- **Narrative:**  
  *"In Team Workload, the system detects that Sarah Jenkins is carrying 13 story points and is overloaded, while also identifying a Single Point of Failure (SPOF) in the Database domain. In Decisions & ADRs, technical choices are saved persistently in Forge App Storage, linked directly to Jira tickets."*
- **Conclusion:**  
  *"In Confidence Dashboard, everything rolls up into a mathematically verifiable 68% Delivery Confidence Index with an exportable leadership summary. CampusCrew Intelligence turns fragmented Atlassian data into unified engineering superpower. Thank you!"*

---

## 📋 Evaluation Checklist for Judges

| Feature | How to Verify in Demo | Expected Behavior |
| :--- | :--- | :--- |
| **Forge Manifest** | Inspect `manifest.yml` | Valid modules: `jira:projectPage`, `jira:globalPage`, `confluence:globalPage`, `rovo:agent`. |
| **Automated Tests** | Run `npm test` | 43 passed assertions with 0 failures across all services. |
| **Custom UI Build** | Run `npm run build` | Fast Vite compilation into `static/dist` with relative asset paths. |
| **Active Sprints** | Check Command Center tab | Displays active sprint goal, velocity pacing, and story points burndown. |
| **Blocker Diagnostics** | Check Blocker Matrix | Displays blocker age in hours and categorized root cause (Infrastructure, PR lag). |
| **Context Correlation** | Check Context Intelligence tab | Links Jira issues to Confluence pages with match percentage and excerpt. |
| **Missing Doc Detection** | Check Context Intelligence alerts | Flags high-priority tickets with missing architecture specs. |
| **AI Grounding** | Run prompt in AI Assistant tab | AI output explicitly cites retrieved Jira keys and Confluence doc titles. |
| **WIP Limits & SPOF** | Check Team Workload tab | Highlights overloaded engineers and domain SPOF monopolies. |
| **ADR Storage** | Check Decisions tab & Log ADR | Records new decision with Forge Storage persistence. |
| **Confidence Formula** | Check Confidence Dashboard | Displays multi-factor weighted score (0–100%) and export summary. |
