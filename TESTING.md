# CampusCrew Intelligence — Testing & Verification Guide

> **Atlassian Codegeist 2026 Hackathon Test Documentation**  
> Comprehensive validation of Jira integration, Confluence context linking, AI grounding, Forge resolvers, and edge cases.

---

## 1. Test Philosophy & Strategy

To satisfy the rigorous technical requirements of **Atlassian Codegeist 2026**, CampusCrew Intelligence implements multi-tier test automation covering:
- **Contract & Protocol Testing:** Validates that resolvers and the bridge conform to official `@forge/resolver` and `@forge/bridge` invocation specs.
- **Data Integration & Mapping:** Validates schema parsing of Jira issues, agile sprints, blockers, and Confluence pages.
- **Algorithmic Accuracy:** Validates the mathematics behind the composite Confidence Score, WIP limit evaluator, and context similarity scoring.
- **Zero-Hallucination Grounding:** Verifies that AI insights cite only retrieved Jira keys and Confluence titles.
- **Edge Case & Boundary Hardening:** Validates that empty projects, zero story points, and network degradation do not produce `NaN`, division-by-zero, or unhandled exceptions.

---

## 2. Running Automated Tests

Execute the complete test suite with:

```bash
npm test
```

### Complete Test Execution Output (43/43 Passed)
```
> campuscrew-intelligence@2026.1.0 test
> tsx tests/forge-integration.test.ts

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
[RovoAction] Invoked action: get-project-overview for project: ENG
  [PASS] Rovo action get-project-overview executes successfully
  [PASS] Rovo action returns blocker summaries
[RovoAction] Invoked action: get-context-intelligence for project: ENG
  [PASS] Rovo action get-context-intelligence reports coverage
[RovoAction] Invoked action: analyze-delivery-risks for project: ENG
  [PASS] Rovo action analyze-delivery-risks reports risk tier

--- 8. EMPTY STATES & ZERO DIVISION BOUNDARY TESTS ---
  [PASS] Empty issue list yields 100% coverage without NaN or division by zero
  [PASS] Empty issue list yields 0 missing docs
  [PASS] Empty issue list yields empty team member array
  [PASS] Empty issue list yields 0 total story points
  [PASS] Confidence score remains numeric when sprint points are 0

--- 9. INVALID INPUTS & ERROR HANDLING ---
  [PASS] Properly rejects invalid ADR missing required fields
[RovoAction] Invoked action: unknown-nonexistent-action for project: ENG
  [PASS] Rovo handler safely handles unsupported action keys

================================================================
  TEST RESULTS: 43 PASSED, 0 FAILED (TOTAL: 43)
================================================================
```

---

## 3. Test Coverage Breakdown

| Test Category | Target Component | Assertions | Result |
| :--- | :--- | :--- | :--- |
| **Jira Telemetry** | `JiraService` | 8 | **PASS** |
| **Context Linking** | `ConfluenceService` | 6 | **PASS** |
| **Workload & SPOF** | `WorkloadService` | 5 | **PASS** |
| **ADR Storage** | `DecisionService` | 3 | **PASS** |
| **AI Grounding & Citations** | `AIAssistantService` | 6 | **PASS** |
| **Forge Resolvers** | `index.handler` | 4 | **PASS** |
| **Rovo Actions** | `rovo.handler` | 5 | **PASS** |
| **Empty States** | All Services | 4 | **PASS** |
| **Input Validation** | All Services | 2 | **PASS** |
| **Total** | | **43** | **100% PASS** |

---

## 4. Frontend Build Check

The React 18 Custom UI frontend is validated using Vite's production compiler:

```bash
npm run build
```

**Build Output:**
```
> campuscrew-intelligence@2026.1.0 build
> vite build static

vite v8.3.7 building client environment for production...
transforming...
✓ 1695 modules transformed.
rendering chunks...
computing gzip size...
static/dist/index.html                             1.17 kB │ gzip:  0.66 kB
static/dist/assets/index-BbExFX9v.css             38.43 kB │ gzip:  7.32 kB
static/dist/assets/index-DH0-ulz7.js             240.62 kB │ gzip: 69.04 kB

✓ built in 2.42s
```
*Verification: Relative asset paths (`./assets/...`) confirmed for Forge sandbox iframe compatibility.*
