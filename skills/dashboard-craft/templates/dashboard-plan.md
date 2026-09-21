# Dashboard plan: [name]

## 1. Decision summary

- Outcome:
- Primary roles:
- Archetype:
- Observe → understand → act loop:
- Success criteria:

## 2. Requirements ledger

### Confirmed

-

### Assumptions

-

### Open decisions

-

### Constraints and non-goals

-

## 3. Data and metric contract

| Metric/field | Meaning and formula | Source/grain | Unit and display | Comparison | Freshness | Zero/null/error behavior |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 4. Information architecture

- Breadcrumb/current scope used as visible page identity:
- Visible page introduction exception and required-content justification (normally none):
- Ownership of page/content actions by table, card, form, chart, or shell region:

| Priority | Region | User question | Content/action | Scope/filter relationship |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Page shell

- Breadcrumb/current-page label:
- Programmatic `h1`:
- Visible title/description exception, if any:
- Optional stat cards and decision value:
- Primary data/action surface:
- Initial loader brand/three-dot beat, static HTML ownership, busy/inert root, session/redirect/lazy-route readiness signal, single-surface fallback behavior, reduced motion, and fatal-bootstrap fallback:

## 5. Layout and responsive specification

### Wide

-

### Sidebar shell

- Expanded state:
- Collapsed icon rail:
- Collapsed hover/focus overlay preview:
- Persisted preference, toggle, dismissal, and active/nested navigation:
- RTL and mobile drawer behavior:

### Intermediate

-

### Narrow/mobile

-

### Expansion and directionality

-

### Overlay motion

- Drawer entry/exit direction, transform-only panel motion, matched linear timing, backdrop entry fade/steady exit, compact width, duration, and RTL behavior:
- Dialog entry/exit scale, opacity, duration, and easing:
- Destructive confirmation variant: compact alert-dialog layout, consequence copy, safe initial focus, Cancel/confirm actions, pending/error behavior, and text-expansion fallback:
- Exit-presence ownership, interaction lock, focus restoration, scroll unlock, and reduced-motion behavior:

## 6. Components and visualizations

| Component | Purpose | Data/encoding | Interaction | Accessible alternative | Rationale |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### Stat cards

- Variant(s): compact / comparison / sparkline / radial
- Value, delta semantics, comparison period, icon, microchart, and accessible text:

### Form-control contract

- Framework-specific select package and compatibility evidence:
- Local select wrapper, option/value model, form integration, menu portal, async/no-results, and RTL behavior:
- Checkbox and radio custom visuals, semantic inputs, labels, grouping, indeterminate/required/error states:
- Switch semantics, immediate-effect behavior, pending/disabled states, and optional icon treatment:
- Single/dual range bounds, step, formatting, keyboard behavior, thumb collision policy, and RTL geometry:
- Light/dark tokens, focus, forced colors, target sizes, and non-color state cues:

### Admin table contract

- Toolbar search/actions/applied filters:
- Card header vs toolbar spacing and hierarchy:
- Filter drawer draft/apply/clear/focus behavior:
- Export endpoint, complete-result scope, authorization, and large-export behavior:
- Shared add/edit form surface: drawer/sheet for small forms or standalone route for large operations:
- Gutterless bordered card composition:
- TanStack Table features and stable row ID:
- Client-side three-state sorting, complete loaded data scope, null policy, URL state, and no-request/no-skeleton behavior:
- Sort icons (required mapping: up/down pair = none, up = ascending, down = descending; no RTL mirroring):
- Pagination metadata, page sizes, and controls:
- Column resizing, logical pinning, visibility, ordering, selection:
- URL parameter schema and history behavior:
- Axios + TanStack Query key/cancellation/loading behavior:

## 7. State and permission matrix

| Region/action | Loading/refresh | Empty/zero | Error/stale | Permission/redaction | Success/conflict |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### Skeleton fidelity contract

- Region-by-region final geometry and shared layout primitives:
- Initial-load skeleton: block count, dimensions, responsive grid, internal sections, and accessible status:
- Table initial skeleton: columns/widths, requested row count/heights, cell shapes, and pagination footprint:
- Table row-set transition: body-only skeleton, disabled per-page/navigation controls, and busy announcement:
- Background/partial refresh behavior and usable-data retention:
- Reduced-motion, light/dark, forced-colors, RTL, and layout-shift checks:

## 8. Worldwide implementation contract

### Messages and plurals

- Message ID convention:
- Variable/plural rules:
- Translator context:

### Formatting and time

- Locale resolution:
- Number/percentage/currency/unit rules:
- Date/time/calendar/time-zone rules:

### Layout, typography, and bidi

- Expansion behavior:
- Font/fallback coverage:
- Logical layout/mirroring rules:
- Mixed-direction isolation:

### Switching, fallback, search, sort, and export

- Locale ownership, detection, persistence, and fallback:
- Locale-selector pattern and scale threshold:
- Trigger codes, visible language names, representative flags, and ambiguity policy:
- Menu positioning, selected state, keyboard/typeahead/dismissal/focus behavior, and RTL rules:
- Route, filter, focus, and unsaved-work preservation during switching:
- Search/collation and export behavior:

### Locale QA matrix

-

## 9. Accessibility contract

- Semantics/landmarks/headings:
- Keyboard/focus:
- Contrast/non-color cues:
- Zoom/reflow/target sizes:
- Dynamic announcements:
- Chart/table alternatives:

## 10. Implementation plan

- Component boundaries:
- Typed domain/view models:
- Query/filter/URL state:
- Existing framework/ecosystem and installed major versions:
- Selected capability packages, existing equivalents, and reasons:
- Application shell/sidebar ownership:
- Two-phase form validation and error-focus behavior:
- React/Vue/other form and schema adapter, when needed:
- React profile libraries, only when applicable:
- Table/query/API ownership:
- ApexCharts curve/animation/reduced-motion configuration:
- Day.js locale/time-zone formatting:
- Number grouping and compact-value policy:
- Inter/Vazirmatn/script fallback loading:
- Message catalogs and formatting adapters:
- Authorization gates:
- Loading/error boundaries:
- Performance strategy:
- Telemetry:
- Test seams and rollout:

## 11. QA and acceptance criteria

- [ ] Functional checks cover success and failure paths.
- [ ] Desktop, intermediate, and mobile behaviors are verified.
- [ ] Expanded/collapsed/preview sidebar states and mobile navigation are verified by pointer and keyboard without unexpected reflow.
- [ ] Breadcrumb/current-page semantics, hidden heading, optional stats, and main-content order are verified.
- [ ] Form validation is quiet before the first submit and responsive on input afterward.
- [ ] The initial branded loader appears before framework startup, remains the only startup surface through session/redirect/initial-route readiness, matches both themes, announces once, respects reduced motion, and atomically leaves an active root with no stale overlay.
- [ ] Data skeletons match at least 90% of resolved geometry; initial tables include header/body/pagination and page transitions skeletonize only the body while pagination is disabled.
- [ ] Packaged selects and locally customized checkbox, radio, switch, and range controls pass keyboard, form-state, drawer/dialog, theme, and RTL checks without browser-default chrome.
- [ ] Keyboard, focus, semantics, contrast, and chart alternatives are verified.
- [ ] Expansion pseudo-locale, RTL pseudo-locale, and representative real locales pass.
- [ ] Formatting, time zones, fonts, mixed direction, switching, fallback, search/sort, and export pass.
- [ ] The locale selector passes pointer, keyboard, focus-restoration, persistence, expansion, narrow-screen, and LTR/RTL checks; flags are never the only language label.
- [ ] Roles and permission boundaries pass server and UI tests.

## 12. Risks and open questions

| Priority | Risk/question | Owner | Decision needed by | Fallback |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
