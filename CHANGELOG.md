# Changelog

All notable changes to Omega Panel are documented here. The project follows semantic versioning.

## Unreleased

### Changed

- Renamed the project and primary Agent Skill from DashCraft / `dashboard-craft` to Omega Panel / `omega-panel`.
- Replaced the project logo and refreshed the README around a friendly quick start followed by advanced installation and maintainer guidance.

## 0.3.0 - 2026-09-22

### Added

- A recursive sidebar-navigation contract based on the Hub pattern: arbitrary `section | group | link` trees, a shared route/disclosure controller, pending and explicit route matching, deep active-ancestor opening, and behavioral coverage for navigation nested two or more group levels deep.

### Changed

- Expandable navigation now uses route-scoped active-collapse overrides, one manually open non-active group per depth, deeper-branch pruning, active/manual coexistence, compact-preview behavior, and accessible height-only transitions.
- Dot markers are restricted to nested leaf destination links. Iconless expandable groups conditionally omit the marker element and its spacing instead of hiding a dot or reserving an empty slot.
- The dashboard review checklist and planning template now require recursive navigation data, shared controller ownership, route-reset behavior, multi-level tests, and explicit disclosure-state acceptance criteria.

## 0.2.0 - 2026-09-22

### Added

- A compact locale-selector contract for small fixed language sets: uppercase current-code trigger, product-approved decorative flags plus visible names, selected-state menu semantics, complete keyboard/typeahead/dismissal behavior, RTL-safe logical positioning, persistence/state preservation, and a searchable fallback for larger catalogs.
- The independently installable `code-quality` skill for task-scoped decomposition, separation of concerns, project-fit placement, deliberate code splitting, and an Onomis-derived React/TypeScript fallback structure without unsolicited refactors.
- A single-surface startup-loader lifecycle that stays visible through session restoration, startup redirects, and the initial lazy route, suppresses duplicate framework loaders, keeps the application root busy/inert, and uses the Hub-style three-dot 0.6 s heartbeat.
- A stricter breadcrumb-led page-shell rule that prohibits generic eyebrow/title/description/action heroes and keeps table controls inside the table card that owns them.
- A client-owned table-sorting contract: load the complete filtered sortable dataset, sort before pagination, exclude sort from server requests/query keys, and never show a loading state for sort changes.
- A 250 ms overlay-motion contract: transform-only logical inline-end slide transitions for compact drawers, fade/zoom transitions and backdrop fading only for dialogs, exit-presence handling, focus/scroll restoration, RTL mirroring, and reduced-motion behavior.
- A strict skeleton-loader contract requiring at least 90% resolved-layout fidelity, complete initial table header/body/pagination skeletons, body-only row-set transitions, and disabled pagination during replacement requests.
- A framework-neutral initial-app-loader contract for static pre-mount branding, heartbeat indicators, theme-flash prevention, reduced motion, mount-time removal, and bootstrap failure handling.
- A cross-framework custom-control contract covering packaged select boxes (React Select, Vue Multiselect, Svelte Select, Kobalte Select, and ng-select), locally styled semantic checkboxes/radios/switches, accessible single/dual range sliders, theme tokens, and drawer/portal behavior.
- Explicit admin-table guidance for separate card headers and toolbars, server-owned complete-result CSV export, shared add/edit drawers for small forms versus standalone pages for large operations, fixed up/down-pair → up → down sort-state icons, and Phosphor Icons as the new-React-project default.

- Cross-agent installation and invocation guidance for Codex, Claude Code, Cursor, and compatible Agent Skills clients.
- One-command installation through the cross-agent `skills` CLI, plus native manual fallbacks.
- The original DashCraft logo, installable OpenAI UI metadata, a dependency-free repository validator, and GitHub Actions validation.
- A three-state application sidebar contract: expanded, collapsed icon rail, and hover/focus overlay preview, plus an accessible mobile drawer.
- A breadcrumb-first page structure with optional decision-useful stat cards, primary content, and no duplicate visible title/description.
- Submit-first form validation that switches to input revalidation after the first attempt, with React Hook Form and VeeValidate examples.
- A framework-neutral package capability map covering charts, tables/querying, editors, HTTP, dates, i18n, maps, motion, code highlighting, scrolling, notifications, carousels, schemas, forms, linting, and formatting.
- An opinionated React dashboard baseline using TanStack Table, TanStack Query, Axios, ApexCharts, Day.js, Inter, and Vazirmatn.
- Table toolbar/filter-drawer, gutterless bordered card, three-state sorting, complete pagination, advanced column features, and shareable URL-state contracts.
- Four reusable stat-card patterns: compact, comparison, sparkline, and radial/progress.
- Locale-safe interpretation of English comma grouping, localized dates, time zones, direction-aware table pinning/resizing, and script-specific font fallbacks.

## 0.1.0 - 2026-09-20

### Added

- The independently installable `dashboard-craft` Agent Skill, now named `omega-panel`.
- A unified input/output contract spanning dashboard UX, implementation, accessibility, and worldwide readiness.
- References for dashboard design, data visualization, internationalization, and accessibility.
- Reusable intake, plan, review, prompt, and release-checklist resources.
- Worked analytics, operations/admin, and SaaS product-management dashboard examples.
- A React, TypeScript, Tailwind, and `Intl` analytics implementation sketch.
- A realistic evaluation suite, published 100-point rubric, and v0.1 baseline scores.
- Installation, usage, contribution, release, and MIT license documentation.
