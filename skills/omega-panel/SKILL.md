---
name: omega-panel
description: Design, plan, implement, or review production dashboards and admin interfaces with information architecture, data visualization, responsive behavior, accessibility, and worldwide internationalization handled as one workflow. Use for analytics products, operations/admin tools, SaaS dashboards, and dashboard implementation reviews; do not use for generic marketing pages or a full component-library build.
---

# Omega Panel

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

1. breadcrumb and current scope, without a duplicate visible page title, eyebrow/kicker, slug-like label, description, or detached action row;
2. optional stat cards only when they support a decision;
3. the primary data/action surface such as a table, form, editor, map, or analysis;
4. diagnostics and secondary detail when needed.

Preserve one programmatic page heading, normally a visually hidden `h1` matching the current breadcrumb item. Do not generate a reusable authenticated-page hero/header made from an eyebrow or slug-like label, oversized title, generic description, and actions aligned at the opposite side. Breadcrumb-led dashboard/admin pages must omit that pattern by default. Put search, filters, export, add/create, and other content actions inside the card, table toolbar, form section, chart header, or other region they directly control. A visible page introduction is an explicit exception only when it conveys necessary task instructions or object identity that the breadcrumb and primary content cannot; document that reason and do not attach unrelated surface actions to it.

Give every region a purpose. Prefer fewer, stronger sections to a wall of cards. Preserve filter context in URLs when useful, and make the active scope visible in the breadcrumb or adjacent scope control.

Read [references/dashboard-design.md](references/dashboard-design.md) when choosing layout, stat cards, tables, filters, density, responsive behavior, or states. Read [references/application-shell-and-forms.md](references/application-shell-and-forms.md) for the page shell, sidebar, and form-validation contract. Read [references/initial-app-loader.md](references/initial-app-loader.md) when a branded loader must cover bootstrap through the first usable route. Read [references/skeleton-loaders.md](references/skeleton-loaders.md) whenever data-backed regions need post-mount loading placeholders. Read [references/form-controls.md](references/form-controls.md) whenever the product contains selects, checkboxes, radio groups, switches, or range sliders. For a React implementation with interactive server-backed tables, also read [references/react-dashboard-stack.md](references/react-dashboard-stack.md).

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

The collapsed sidebar preview expands from logical inline-start as an overlay and must not reflow the main content or overwrite the persisted collapsed preference. Keyboard focus must provide an equivalent to hover. Model sidebar navigation as a recursive `section | group | link` tree: groups may contain links, sections, or more groups at arbitrary depth, and the renderer must pass one shared active-route and disclosure controller through every recursive level. A deep active link opens every ancestor group unless the user explicitly collapses an active ancestor for the current route. Manual disclosure is exclusive among siblings at the same depth, not globally: one manually opened non-active group per depth may coexist with the automatically open active path. Route changes reset manual-open and active-collapse overrides and remove stale deeper branch state. Use a short height-only reveal, logical-start submenu padding without a branch line, and dot markers only on nested leaf destination links; expandable group rows never receive a dot. Keep nested active treatment visually subordinate to its ancestors. On narrow/touch layouts, replace the persistent sidebar with the existing shared drawer/sheet primitive, sliding from logical inline-start with its full entry/exit lifecycle; do not hand-roll another fixed aside and backdrop. Keep the mobile navigation drawer near the expanded-sidebar width (about 18rem) with a viewport-safe gutter rather than making it full width. Show only the drawer trigger in the mobile header and omit the desktop rail collapse/expand control. Follow [references/application-shell-and-forms.md](references/application-shell-and-forms.md).

Dialogs and drawers animate both entry and exit over about 250 ms. Drawer panels use transform-only sliding from and back to logical inline-end with the same linear timing function in both directions; never fade the drawer panel. Fade the drawer backdrop in over the same 250 ms on open, keep it visually steady during close, and remove it after slide-out. Centered dialogs fade and zoom between roughly 96% and 100% scale, with their modal backdrop fading on both open and close. Keep drawers compact by default (about 28 rem, with 24 rem small and 32 rem large variants) and use full width only on narrow screens. Keep exiting overlays mounted and non-interactive until motion completes, then restore focus and background scrolling. Reduced-motion mode completes the state change nearly instantly without spatial movement. Follow [references/application-shell-and-forms.md](references/application-shell-and-forms.md).

Treat destructive confirmation as a distinct compact alert-dialog variant rather than a content-modal layout. Use a centered title and short consequence message, no header divider or close icon, and equal-width Cancel/destructive actions; initially focus Cancel. Keep forms and multi-step decisions in the ordinary dialog pattern. Follow [references/application-shell-and-forms.md](references/application-shell-and-forms.md).

Keep the document cursor at the platform `auto` baseline; never force one cursor across the whole application. Assign cursors only where interaction semantics require them: `pointer` for enabled buttons, links, chips, navigation destinations, sortable headers, select triggers/options, and other explicit actions; text behavior for editable inputs; resize/drag cursors for their corresponding affordances; and an unavailable cursor for disabled actions when useful. The chosen cursor must remain consistent across the complete control and its nested label/icon descendants. Sortable table headers use a full-cell button so their pointer hit target has no dead padding. Follow [references/accessibility.md](references/accessibility.md).

### 6. Specify the complete state model

Cover the page and each independently loaded region:

- initial loading, background refresh, and stale data;
- first-use empty, filtered empty, and genuinely zero values;
- recoverable error, partial-data error, offline or timeout, and retry;
- unauthorized, forbidden, redacted, and role-limited actions;
- success, destructive confirmation, optimistic update, conflict, and undo where appropriate.

Loading placeholders must reproduce at least 90% of the resolved region's geometry, including responsive grid, padding, internal divisions, repeated-item count, and stable control footprints. Initial table skeletons include header, cell-shaped body rows, and pagination; page changes retain the header, skeletonize only the body, and disable page-size plus pagination controls. Errors should retain safe context and offer a useful next step. Never confuse “0” with “not available.” Follow [references/skeleton-loaders.md](references/skeleton-loaders.md).

When startup itself can be visible, use exactly one application boot surface. Render it in static HTML outside the framework root and keep it visible while required bootstrap work, session restoration, startup redirects, and the first lazy route resolve. Remove it only after the final initial route has committed; do not expose a second framework spinner between boot stages. Never simulate readiness with a timer. Follow [references/initial-app-loader.md](references/initial-app-loader.md).

### 7. Integrate worldwide readiness into each decision

Apply the rules in [references/internationalization.md](references/internationalization.md) while defining data, copy, layout, components, states, and implementation—not afterward. Explicitly cover:

- message extraction, stable IDs, translator context, variables, plurals, gender/select only when required, and rich-text boundaries;
- locale-aware dates, time, numbers, currencies, units, relative time, calendars, numbering systems, and time-zone ownership;
- 30–50% text expansion, wrapping, truncation policy, font fallback, glyph coverage, and line-height resilience;
- logical layout properties, mirrored navigation/spatial icons, non-mirrored data/order/media, bidi isolation for mixed-direction content, and keyboard order;
- locale switching, persistence, URL or account scope, loading, fallback, and preservation of in-progress work;
- locale-aware collation, search, export, CSV delimiters/encoding, and QA with pseudo-locales plus representative scripts.

For a small fixed locale set, prefer a compact global-header locale control: an uppercase current-locale code opens a flag-and-language menu with a clear selected state. Treat it as an accessible command menu rather than a form select, preserve route and in-progress state when switching, and move to a searchable selector when the supported set is too large to scan. Follow [references/internationalization.md](references/internationalization.md) for the complete behavior and the flag/language caveat.

Do not assume English labels, Gregorian dates, Latin digits, one currency, left-to-right layout, or the viewer's local time zone.

### 8. Build accessibility into structure and interaction

Use [references/accessibility.md](references/accessibility.md) while designing landmarks, headings, focus order, controls, tables, charts, status announcements, contrast, target sizes, motion, and zoom/reflow. Provide keyboard behavior for every composite widget and a text/table alternative for charts.

### 9. Map the plan to implementation

Define component boundaries, typed data/view models, formatting adapters, message catalogs, authorization gates, query/filter state, error boundaries, loading boundaries, analytics events, performance risks, and test seams. Prefer platform-native semantics before custom ARIA behavior.

Keep business logic, authorization, translation, and formatting outside presentational components. Treat permissions as server-enforced even when the UI hides unavailable actions.

Follow the repository's framework, package manager, routing, data, and design-system conventions. The packages in [references/package-selection.md](references/package-selection.md) are a capability menu, not a required bundle. Add only the packages the feature needs and use established equivalents in Vue, Svelte, Angular, server-rendered, or other ecosystems.

Forms use two-phase validation: validate only on the first submit attempt, then revalidate changed fields on input while continuing to validate the whole form on submit. In React, React Hook Form can express this with `mode: 'onSubmit'` and `reValidateMode: 'onChange'`; in Vue, VeeValidate can use `submitCount` or an attempted flag to switch input validation on after the first attempt. The interaction contract, accessible error handling, and focus behavior apply in every framework; see [references/application-shell-and-forms.md](references/application-shell-and-forms.md).

Product controls must not expose browser-default select, checkbox, radio, switch, or range styling. Use a maintained framework package behind one local design-system wrapper for select boxes; use locally styled semantic inputs or accessible headless primitives for checkbox, radio, switch, and single/dual range controls. Preserve native form and keyboard semantics behind the custom visuals. Follow the package defaults, state model, drawer/portal behavior, accessibility contract, and customization rules in [references/form-controls.md](references/form-controls.md).

For React + TypeScript + Tailwind implementations, use these profile defaults unless the existing project has a different approved standard:

- TanStack Table for tables, including server-controlled filtering where needed, client-side three-state removable sorting over the complete loaded filtered dataset, pagination, column resizing, logical start/end pinning, visibility, ordering, selection, and stable row IDs; interactive sort changes never call the server or show a loading state;
- a distinct card header retaining the table title/description, followed with deliberate spacing by a toolbar whose start side contains search and whose end side contains filter, server-owned full-result export, and primary add/create actions;
- a gutterless bordered table card whose toolbar and pagination footer have their own padding while the table reaches the card edges;
- pagination containing range/total metadata, a per-page select, and first/previous/page/next/last controls;
- URL query parameters as the shareable source of truth for search, filters, client sorting, page, and page size;
- Axios inside TanStack Query for server-backed table data, with only server-owned state in the query key, client sorting excluded from requests/query keys, and `AbortSignal` passed to Axios;
- ApexCharts for charts and KPI sparklines/radial indicators;
- Day.js with localized-format, UTC, and timezone support for display/manipulation while preserving date-only and instant semantics;
- Phosphor Icons for a new React dashboard unless the repository already has an established icon system; sortable headers use an up/down arrow pair when unsorted, a single up arrow when ascending, and a single down arrow when descending;
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
