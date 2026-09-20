---
name: dashboard-craft
description: Design, plan, implement, or review production dashboards and admin interfaces with information architecture, data visualization, responsive behavior, accessibility, and worldwide internationalization handled as one workflow. Use for analytics products, operations/admin tools, SaaS dashboards, and dashboard implementation reviews; do not use for generic marketing pages or a full component-library build.
---

# Dashboard Craft

Turn product requirements and available data into clear, implementation-ready dashboard guidance. Treat dashboard quality and worldwide readiness as one design problem from intake through QA. Never defer internationalization to a separate future phase.

## Choose the task mode

- **Plan:** turn a brief, requirements, or dataset into a dashboard specification.
- **Implement:** translate an approved plan into the user's existing or chosen stack. Keep behavior framework-neutral and use ecosystem-native equivalents; do not migrate a project to React merely to follow an example. Read [references/package-selection.md](references/package-selection.md) before adding dependencies. For React + TypeScript + Tailwind dashboards, [references/react-dashboard-stack.md](references/react-dashboard-stack.md) is one concrete implementation profile.
- **Review:** inspect a design or implementation, report evidence-backed findings by severity, and propose precise corrections. Do not rewrite unless requested.
- **Refine:** update an existing plan while preserving accepted product decisions and identifying changed assumptions.

## Use the unified input contract

Collect what the user already supplied, then infer only low-risk gaps. Do not block on a long questionnaire. Mark inferred values as assumptions and surface decisions that can materially change the result.

Always establish:

1. **Outcome and decisions:** the product outcome, questions the dashboard must answer, and actions users must take.
2. **Users and permissions:** roles, expertise, frequency of use, access boundaries, and sensitive data.
3. **Data contract:** metric definitions, dimensions, units, freshness, comparison periods, granularity, missing values, and trustworthy sources.
4. **Operating context:** dashboard archetype, devices, density, latency, real-time behavior, export/share needs, and technical constraints.
5. **Worldwide context:** supported or likely locales, languages, writing directions, calendars, numbering systems, currencies, measurement units, time zones, names/addresses, and locale switching.
6. **Quality constraints:** accessibility target, browser/platform support, performance budget, compliance needs, design system, and implementation stack.

When locale requirements are unknown, design for an open locale set: externalize user-facing messages, keep formatting locale-aware, reserve text expansion, avoid direction-dependent semantics, and state the assumption.

For a reusable intake form, read [templates/intake.md](templates/intake.md). For a prompt the user can fill in, read [prompts/dashboard-brief.md](prompts/dashboard-brief.md).

## Follow the integrated workflow

### 1. Frame the job

Define the dashboard's primary decision loop in one sentence: **observe → understand → act**. Choose the closest archetype and its dominant behavior:

- Executive/strategic: scan trends and exceptions.
- Analytical: explore, compare, and diagnose.
- Operational/admin: monitor queues and take frequent actions.
- Product/SaaS: manage objects, status, adoption, and configuration.

Reject vanity metrics that do not affect a decision. Separate confirmed requirements, assumptions, and open decisions.

### 2. Establish the data and message contracts

For every visible metric, field, filter, chart, notification, and action, define:

- semantic meaning, source, unit, aggregation, comparison, freshness, and missing-data behavior;
- stable message identifier, variables, plural/select behavior, and translator context;
- locale-aware display rules for dates, time, numbers, percentages, currencies, units, names, and time zones;
- whether values may be sorted, searched, exported, copied, or announced to assistive technology.

Keep raw values separate from display strings. Never concatenate translated fragments or store formatted numbers/dates as the source of truth.

### 3. Design information architecture before visuals

Order content by user decision priority, not by available widgets. For admin pages inside an application shell, default to:

1. breadcrumb and current scope, without a duplicate visible page title or description;
2. optional stat cards only when they support a decision;
3. the primary data/action surface such as a table, form, editor, map, or analysis;
4. diagnostics and secondary detail when needed.

Preserve one programmatic page heading, normally a visually hidden `h1` matching the current breadcrumb item. When the task requires explanatory copy or a different hierarchy, document the exception instead of mechanically suppressing useful content.

Give every region a purpose. Prefer fewer, stronger sections to a wall of cards. Preserve filter context in URLs when useful, and make the active scope visible in the breadcrumb or adjacent scope control.

Read [references/dashboard-design.md](references/dashboard-design.md) when choosing layout, stat cards, tables, filters, density, responsive behavior, or states. Read [references/application-shell-and-forms.md](references/application-shell-and-forms.md) for the page shell, sidebar, and form-validation contract. For a React implementation with interactive server-backed tables, also read [references/react-dashboard-stack.md](references/react-dashboard-stack.md).

### 4. Choose components and visualizations by task

Start from the question the user must answer, then choose the simplest representation that preserves the needed comparison. Specify chart encodings, axes, units, baselines, sorting, labels, missing values, annotations, interaction, and a non-visual alternative.

Do not use a chart when a value, sentence, compact comparison, or table is clearer. Avoid decorative variety, dual axes by default, color-only encoding, and pie/donut charts with many categories.

Read [references/data-visualization.md](references/data-visualization.md) for the question-to-chart matrix and integrity rules. In the React baseline, implement charts with ApexCharts: smooth line/area curves and restrained animations are the visual default, while reduced-motion preferences, data integrity, keyboard access, text summaries, and table alternatives remain mandatory.

### 5. Compose desktop and mobile together

Define layout behavior rather than merely naming breakpoints. Specify:

- desktop grid, maximum content width, region spans, alignment, and density;
- desktop sidebar behavior: expanded, collapsed icon rail, and collapsed hover/focus preview;
- intermediate reflow and control wrapping;
- mobile priority order, collapsed or summarized content, table transformation, sticky actions, and safe horizontal overflow;
- behavior under 30–50% text expansion and right-to-left direction;
- container-based behavior for embedded panels when relevant.

Preserve the primary decision and action on small screens. Do not shrink a desktop dashboard into unreadable miniatures.

The collapsed sidebar preview expands from logical inline-start as an overlay and must not reflow the main content or overwrite the persisted collapsed preference. Keyboard focus must provide an equivalent to hover. On narrow/touch layouts, use an accessible navigation drawer instead. Follow [references/application-shell-and-forms.md](references/application-shell-and-forms.md).

### 6. Specify the complete state model

Cover the page and each independently loaded region:

- initial loading, background refresh, and stale data;
- first-use empty, filtered empty, and genuinely zero values;
- recoverable error, partial-data error, offline or timeout, and retry;
- unauthorized, forbidden, redacted, and role-limited actions;
- success, destructive confirmation, optimistic update, conflict, and undo where appropriate.

Loading placeholders should preserve layout. Errors should retain safe context and offer a useful next step. Never confuse “0” with “not available.”

### 7. Integrate worldwide readiness into each decision

Apply the rules in [references/internationalization.md](references/internationalization.md) while defining data, copy, layout, components, states, and implementation—not afterward. Explicitly cover:

- message extraction, stable IDs, translator context, variables, plurals, gender/select only when required, and rich-text boundaries;
- locale-aware dates, time, numbers, currencies, units, relative time, calendars, numbering systems, and time-zone ownership;
- 30–50% text expansion, wrapping, truncation policy, font fallback, glyph coverage, and line-height resilience;
- logical layout properties, mirrored navigation/spatial icons, non-mirrored data/order/media, bidi isolation for mixed-direction content, and keyboard order;
- locale switching, persistence, URL or account scope, loading, fallback, and preservation of in-progress work;
- locale-aware collation, search, export, CSV delimiters/encoding, and QA with pseudo-locales plus representative scripts.

Do not assume English labels, Gregorian dates, Latin digits, one currency, left-to-right layout, or the viewer's local time zone.

### 8. Build accessibility into structure and interaction

Use [references/accessibility.md](references/accessibility.md) while designing landmarks, headings, focus order, controls, tables, charts, status announcements, contrast, target sizes, motion, and zoom/reflow. Provide keyboard behavior for every composite widget and a text/table alternative for charts.

### 9. Map the plan to implementation

Define component boundaries, typed data/view models, formatting adapters, message catalogs, authorization gates, query/filter state, error boundaries, loading boundaries, analytics events, performance risks, and test seams. Prefer platform-native semantics before custom ARIA behavior.

Keep business logic, authorization, translation, and formatting outside presentational components. Treat permissions as server-enforced even when the UI hides unavailable actions.

Follow the repository's framework, package manager, routing, data, and design-system conventions. The packages in [references/package-selection.md](references/package-selection.md) are a capability menu, not a required bundle. Add only the packages the feature needs and use established equivalents in Vue, Svelte, Angular, server-rendered, or other ecosystems.

Forms use two-phase validation: validate only on the first submit attempt, then revalidate changed fields on input while continuing to validate the whole form on submit. In React, React Hook Form can express this with `mode: 'onSubmit'` and `reValidateMode: 'onChange'`; in Vue, VeeValidate can use `submitCount` or an attempted flag to switch input validation on after the first attempt. The interaction contract, accessible error handling, and focus behavior apply in every framework; see [references/application-shell-and-forms.md](references/application-shell-and-forms.md).

For React + TypeScript + Tailwind implementations, use these profile defaults unless the existing project has a different approved standard:

- TanStack Table for tables, including server-controlled filtering, three-state removable sorting, pagination, column resizing, logical start/end pinning, visibility, ordering, selection, and stable row IDs;
- a toolbar directly above the table, with search, applied-filter chips, filter drawer, export, and primary actions;
- a gutterless bordered table card whose toolbar and pagination footer have their own padding while the table reaches the card edges;
- pagination containing range/total metadata, a per-page select, and first/previous/page/next/last controls;
- URL query parameters as the shareable source of truth for query-driving search, filters, sorting, page, and page size;
- Axios inside TanStack Query for server-backed tables, with the canonical table state in the query key and `AbortSignal` passed to Axios;
- ApexCharts for charts and KPI sparklines/radial indicators;
- Day.js with localized-format, UTC, and timezone support for display/manipulation while preserving date-only and instant semantics;
- Inter for Latin-script UI and Vazirmatn for Persian UI, plus script-appropriate fallbacks for other supported writing systems.

Format default English/Latin dashboard numbers with comma grouping (for example `12,480`) through `Intl.NumberFormat`; never hard-code separators into raw values, because other locales may require different grouping. Use localized Day.js formats (`ll`, `lll`, `LT`) for human display and ISO values for URLs/APIs.

### 10. Review before handoff

Run both [checklists/dashboard-review.md](checklists/dashboard-review.md) and [checklists/global-readiness.md](checklists/global-readiness.md). For formal evaluation, use the rubric in `evals/rubric.md` when it is available in the repository. Resolve critical failures before calling the output ready.

## Return the unified output contract

Use [templates/dashboard-plan.md](templates/dashboard-plan.md) for a full plan. Keep the response proportional to the request, but do not omit an entire concern silently. A complete handoff contains:

1. **Decision summary:** outcome, users, primary decision loop, archetype, and success criteria.
2. **Requirements ledger:** confirmed facts, assumptions, open decisions, constraints, and non-goals.
3. **Data and metric contract:** definitions, sources, units, freshness, comparisons, missing values, and display/formatting rules.
4. **Information architecture:** breadcrumb-led page structure, regions, priority, navigation, scope, optional stat cards, and filter model.
5. **Layout and responsive specification:** desktop, intermediate, mobile, sidebar states, expansion, and RTL behavior.
6. **Component and visualization specification:** purpose, content, interactions, alternatives, and rationale.
7. **State and permission matrix:** loading, empty, error, stale, success, and role behavior.
8. **Worldwide implementation contract:** messages, plurals, formatting, time zones, expansion, fonts, directionality, switching, fallback, search/sort/export, and locale QA.
9. **Accessibility contract:** semantics, keyboard, focus, contrast, reflow, announcements, and chart alternatives.
10. **Implementation plan:** component boundaries, types, data flow, selected ecosystem/packages, sidebar shell, two-phase form validation, table/toolbar/pagination behavior, URL-state schema, request/query ownership, chart library/options, date/number formatting, font strategy, tests, telemetry, and rollout.
11. **QA and acceptance criteria:** measurable checks across functions, viewport sizes, input methods, roles, locales, and failure states.
12. **Risks and open questions:** prioritized by implementation impact.

For reviews, use [templates/review-report.md](templates/review-report.md), rank findings as critical/high/medium/low, cite the affected area, and explain the user impact plus a concrete fix.

## Quality bar

The result is ready only when it is:

- decision-oriented, not a catalog of widgets;
- specific enough to implement without inventing core behavior;
- traceable from each metric and action to user need and data semantics;
- usable on desktop and mobile, with complete state and permission behavior;
- keyboard operable, semantically structured, perceivable, and robust under zoom/reflow;
- globally ready by construction, including messages, formatting, time zones, expansion, fonts, directionality, switching, and locale QA;
- framework-neutral in its behavior contracts; implementations preserve the user's stack and use the documented React profile or ecosystem-native equivalents with assumptions and tradeoffs made explicit.

## Boundaries

Do not split internationalization into another skill or optional workstream. Do not promise machine translation, a translation-management service, a hosted generator, a complete component library, or a framework lock-in. Do not invent authoritative business definitions, permissions, or locale requirements when they materially affect correctness; identify them as decisions.
