# Dashboard Craft scoring rubric (100 points)

Score evidence and internal coherence, not the presence of keywords. Give partial credit only when the output makes a useful but incomplete decision.

## 1. Decision clarity — 12 points

- **4:** Names the primary users, outcome, repeated decision loop, and dashboard archetype.
- **4:** Prioritizes content/actions around that loop and rejects or demotes irrelevant metrics.
- **4:** Separates confirmed facts, assumptions, open decisions, constraints, and non-goals.

## 2. Data and visualization integrity — 14 points

- **5:** Defines metric meaning/formula, source or grain, units, comparisons, freshness, and zero/null/partial behavior.
- **4:** Selects tables/charts from user questions and specifies encoding, axes/baselines, sorting, missing data, and rationale.
- **3:** States time-zone/aggregation and raw-vs-display semantics.
- **2:** Provides a text/data alternative for each chart.

## 3. Information architecture and usability — 12 points

- **4:** Gives a purposeful ordered information architecture with breadcrumb-led page identity, optional decision-useful stats, primary content, visible scope/freshness, and no redundant title block.
- **3:** Distinguishes global scope, analysis filters, and view controls with clear/reset/URL behavior.
- **3:** Defines useful actions and drill paths without overloading the page.
- **2:** Tables/dense regions specify toolbar/filter flow, clearable sorting, identity, actions, advanced columns, pagination metadata/page size, URL state, loading, and export as relevant.

## 4. State and permission completeness — 10 points

- **4:** Covers initial loading, background refresh/stale, first-use/filtered empty/true zero, partial/full error, and retry.
- **3:** Covers success, optimistic/pending, conflict, destructive confirmation, or undo where relevant.
- **3:** Defines role/permission/redaction behavior without implying that UI hiding is authorization.

## 5. Responsive behavior — 10 points

- **4:** Specifies wide, intermediate, and narrow priority/reflow behavior plus expanded/collapsed/hover-or-focus sidebar states rather than breakpoint names alone.
- **3:** Preserves the primary decision/action and gives a usable mobile pattern for tables/charts/filters.
- **3:** Covers zoom/reflow, long text, expansion, and RTL without relying on fixed heights or visual reordering.

## 6. Accessibility — 14 points

- **4:** Defines semantic landmarks/headings, labels, tables, chart alternatives, and status semantics.
- **4:** Defines keyboard behavior, visible focus, dialog/menu patterns, and focus restoration for relevant interactions.
- **3:** Covers AA contrast, non-color cues, target size, zoom/reflow, forced colors, and reduced motion as relevant.
- **3:** Includes restrained dynamic announcements plus manual keyboard and assistive-technology acceptance tests.

## 7. Worldwide readiness — 20 points

- **4:** Defines message extraction, stable IDs, translator context, variables, full messages, plurals/selects, and fallback.
- **4:** Defines locale-aware numbers, percentages, currencies, units, dates/calendars, time, and time-zone ownership.
- **3:** Defines expansion, wrapping/truncation, font fallback/glyph coverage, and script-aware typography.
- **3:** Defines direction source, logical layout, mirroring rules, bidi isolation, and logical DOM/focus order.
- **2:** Defines locale switching, persistence, catalog loading, route/form/focus preservation, and failure behavior.
- **2:** Defines locale-aware search/collation plus safe, explicit export behavior.
- **2:** Provides an adversarial QA matrix with pseudo-locales and representative real scripts, formats, currencies, and time zones.

## 8. Implementation consistency — 8 points

- **3:** Maps the plan to coherent component/data/view-model boundaries and query/state ownership.
- **2:** Centralizes message/formatting behavior, defines submit-first then input form validation, selects only justified ecosystem packages, and, for React tables, defines TanStack Table/Query + Axios ownership, URL state, table toolbar/pagination, ApexCharts, Day.js, and font behavior while keeping business logic/permissions outside presentational components.
- **2:** Defines meaningful functional, accessibility, permission, locale, and failure tests.
- **1:** Stays framework-agnostic unless a stack is requested and makes performance risks/rollout explicit where relevant.

## Critical failures

Any one causes failure regardless of total score:

1. Treats internationalization as a later, separate, or optional phase.
2. Omits either accessibility or responsive/mobile behavior entirely.
3. Formats or aggregates time/currency without defining the authoritative zone/currency semantics when they affect the scenario.
4. Uses UI visibility as the only permission control or exposes restricted data/actions.
5. Recommends color-only meaning or a chart with no non-visual alternative.
6. Produces no implementation-ready structure—only aesthetic inspiration or a widget list.
7. Invents a material business metric/permission as confirmed fact without labeling the assumption or open decision.
8. Locks the implementation to React or installs the suggested package list despite an existing compatible stack and no requirement to migrate.

## Reviewer calibration

- **Full points:** decisions are specific, internally consistent, and verifiable.
- **About half:** the concern is acknowledged and partially specified, but implementation still requires important invention.
- **Zero:** absent, contradictory, unsafe, or only named without a usable decision.
