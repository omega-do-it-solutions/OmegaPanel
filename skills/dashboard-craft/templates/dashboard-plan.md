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

| Priority | Region | User question | Content/action | Scope/filter relationship |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Page shell

- Breadcrumb/current-page label:
- Programmatic `h1`:
- Visible title/description exception, if any:
- Optional stat cards and decision value:
- Primary data/action surface:

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

## 6. Components and visualizations

| Component | Purpose | Data/encoding | Interaction | Accessible alternative | Rationale |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### Stat cards

- Variant(s): compact / comparison / sparkline / radial
- Value, delta semantics, comparison period, icon, microchart, and accessible text:

### Admin table contract

- Toolbar search/actions/applied filters:
- Filter drawer draft/apply/clear/focus behavior:
- Gutterless bordered card composition:
- TanStack Table features and stable row ID:
- Three-state sorting and null policy:
- Pagination metadata, page sizes, and controls:
- Column resizing, logical pinning, visibility, ordering, selection:
- URL parameter schema and history behavior:
- Axios + TanStack Query key/cancellation/loading behavior:

## 7. State and permission matrix

| Region/action | Loading/refresh | Empty/zero | Error/stale | Permission/redaction | Success/conflict |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

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

-

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
- [ ] Keyboard, focus, semantics, contrast, and chart alternatives are verified.
- [ ] Expansion pseudo-locale, RTL pseudo-locale, and representative real locales pass.
- [ ] Formatting, time zones, fonts, mixed direction, switching, fallback, search/sort, and export pass.
- [ ] Roles and permission boundaries pass server and UI tests.

## 12. Risks and open questions

| Priority | Risk/question | Owner | Decision needed by | Fallback |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
