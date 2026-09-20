# Dashboard review checklist

Use during planning and again before handoff. A checked item should be supported by the plan, design, implementation, or test evidence.

## Purpose and hierarchy

- [ ] The primary user, decision loop, action, and success measure are explicit.
- [ ] The page has one dominant archetype and clear active scope/freshness.
- [ ] The page order is breadcrumb → optional useful stat cards → primary data/action surface, without a duplicate visible title/description.
- [ ] A single programmatic page heading remains available when the breadcrumb is the visible page identity.
- [ ] Regions follow task priority rather than widget availability.
- [ ] Every metric supports a decision and has an owner/definition.
- [ ] Secondary detail uses progressive disclosure.

## Data integrity

- [ ] Metric formulas, source, grain, aggregation, comparison, unit, and precision are defined.
- [ ] Zero, null, delayed, partial, estimated, stale, and redacted values are distinct.
- [ ] Time-zone and reporting-boundary semantics are explicit.
- [ ] Raw values remain available for sorting, calculations, and machine-readable export.

## Components and visualization

- [ ] Each chart answers a named question better than a number, sentence, or table.
- [ ] Axes, baselines, domains, sorting, units, missing data, and uncertainty are honest.
- [ ] Color is not the only encoding and series remain distinguishable.
- [ ] Charts have concise summaries and accessible data alternatives.
- [ ] Tables define sorting, columns, row identity, actions, pagination/loading, and export.
- [ ] React charts use ApexCharts with semantically safe smooth curves, restrained animation, and reduced-motion behavior.

## Admin table and toolbar

- [ ] A toolbar sits directly above the table inside the same bordered card.
- [ ] Search, filter-count trigger, export, primary action, active chips, and Clear all have responsive and keyboard behavior.
- [ ] The filter drawer separates draft from applied values and has Apply, Clear all, cancel/close, and focus-return behavior.
- [ ] The card is gutterless around the bordered table grid; toolbar and pagination own their padding.
- [ ] Header sorting cycles none → ascending → descending → none and exposes current/next state accessibly.
- [ ] Pagination includes accurate range/total metadata, per-page selection, and boundary-safe navigation.
- [ ] TanStack Table provides stable IDs plus required resizing, logical pinning, visibility, ordering, selection, and server-manual modes.
- [ ] Query-driving search/filters/sort/page/page size are canonical URL parameters and survive copy, reload, Back, and Forward.
- [ ] Axios runs inside TanStack Query with complete query keys, cancellation, previous-data behavior, and distinct initial/background/error states.

## Interaction and states

- [ ] Global scope, local filters, and view controls are visually and behaviorally distinct.
- [ ] Loading, refresh, stale, partial, first-use empty, filtered empty, error, offline, and retry are defined.
- [ ] Unauthorized, forbidden, redacted, and role-limited actions are defined.
- [ ] Destructive actions, optimistic updates, conflicts, confirmation, and undo are handled.
- [ ] Errors preserve safe context and offer a useful next action.

## Responsive behavior

- [ ] Wide, intermediate, and narrow layouts define priority and reflow.
- [ ] Desktop navigation defines expanded, collapsed rail, and collapsed hover/focus preview states; preview overlays without changing content layout or the saved preference.
- [ ] Icon-only navigation has accessible names/tooltips, keyboard equivalence, active state, Escape behavior, logical RTL positioning, and a drawer replacement on narrow/touch layouts.
- [ ] Mobile preserves the primary decision and action.
- [ ] Dense tables/charts have an explicit narrow-screen pattern.
- [ ] Control wrapping, long identifiers, zoom/reflow, expansion, and RTL are tested.

## Accessibility

- [ ] Landmarks, headings, labels, table structure, and status messages are semantic.
- [ ] All actions work by keyboard with visible focus and correct focus return.
- [ ] Contrast, non-color cues, target sizes, reduced motion, and forced colors are covered.
- [ ] Results and dynamic updates are announced without excessive chatter.
- [ ] Automated checks are supplemented by manual keyboard and screen-reader verification.

## Implementation readiness

- [ ] Component boundaries, typed models, formatting/i18n adapters, and query state are defined.
- [ ] The implementation preserves the project's framework and installs only capability packages the feature needs; library versions and ecosystem adapters are verified.
- [ ] Forms validate on the first submit, then revalidate changed fields on input and the whole form on submit, with accessible error focus/announcements.
- [ ] Authorization is enforced outside visual hiding.
- [ ] Loading/error boundaries and performance risks are planned.
- [ ] Acceptance criteria are observable and assigned to relevant tests.
- [ ] Day.js uses localized/UTC/timezone plugins at the formatting boundary and never converts date-only values as instants.
- [ ] English numbers use `Intl` comma grouping while other locales retain their correct separators/digits.
- [ ] Inter covers Latin UI, Vazirmatn covers Persian, and other scripts have tested fallbacks.
