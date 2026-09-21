# Dashboard design reference

Read this reference when the task needs layout, information architecture, component, filter, table, density, responsive, or state decisions.

## Start with the decision loop

A dashboard is an instrument for repeated decisions. Write the dominant loop before choosing components:

> When **[signal or condition]** changes, **[role]** needs to understand **[cause/context]** and take **[action]** within **[time window]**.

If a proposed metric or region does not support that loop, remove it, demote it, or explain its separate audience.

## Archetypes and default emphasis

| Archetype | Primary behavior | Default emphasis | Common failure |
| --- | --- | --- | --- |
| Executive/strategic | Scan and compare | headline outcomes, trend, exceptions | ornamental KPIs without definitions |
| Analytical | Explore and diagnose | flexible filters, comparisons, detail | too many controls before orientation |
| Operational/admin | Monitor and act | queues, freshness, status, bulk/single actions | hiding priority and ownership |
| Product/SaaS | Manage and improve | object state, adoption, lifecycle, configuration | mixing analytics and settings without hierarchy |

Hybrid dashboards are acceptable, but identify one dominant mode per page. Separate incompatible rhythms into tabs or pages rather than overloading a single canvas.

## Information hierarchy

Use this sequence unless the user's decision loop demands another:

1. Breadcrumb, scope, time range, freshness, and global actions.
2. Optional current-health, urgent-exception, or queue stat cards.
3. The primary data/action surface.
4. Change, comparison, explanation, and secondary diagnostics when needed.

Prefer a strong reading order. A card is not a semantic unit by itself; use a card only when its boundary communicates grouping, interaction, or independent loading.

### Application page shell

For dashboard/admin pages, the breadcrumb is the visible page identity. Do not insert a generic page hero with an eyebrow/kicker or slug-like label, large repeated title, filler description, and detached right-side actions. Keep one programmatic page heading, normally a visually hidden `h1` that matches the current breadcrumb item. The main sequence is breadcrumb → optional useful stat cards → table/form/other primary content. Actions belong to the surface they operate on. Use a visible page introduction only when required task guidance or object identity cannot live in the breadcrumb or primary surface, and document the exception. Omit stat cards when they do not help a user decide or act.

The desktop navigation has an expanded persistent state, a collapsed icon rail, and a collapsed hover/focus preview that overlays content without reflow. The mobile equivalent is a drawer rather than a hover interaction. Follow the detailed semantics, persistence, focus, RTL, and responsive rules in [application-shell-and-forms.md](application-shell-and-forms.md).

### Headline metrics

Each metric needs:

- label and definition;
- current value, unit, and display precision;
- comparison target and period;
- direction semantics—an increase is not always good;
- freshness or cutoff when it matters;
- missing/unavailable behavior;
- drill path or no-interaction indication.

Keep comparison language explicit: “vs previous 30 days,” not “+8%” without a baseline. Use percentage points for rate deltas when that is the intended meaning.

## Layout and density

- Use a bounded content width for scanability unless dense tables genuinely benefit from the viewport.
- Align unrelated regions to a shared grid, but allow the primary chart/table more space than secondary cards.
- Use spacing and headings before boxes and dividers.
- Keep controls near the content they affect. Distinguish global scope from local filters.
- Provide compact density only when users work frequently with large datasets; preserve adequate targets and line height.
- Avoid masonry layouts for data comparison because shifting baselines impede scanning.

Define the layout in regions and behavior, not fixed pixels alone. A useful implementation note describes grid columns, minimum region widths, spanning rules, and the reflow order.

## Filters and scope

Classify each control:

- **Global scope:** account, workspace, date range, timezone, environment.
- **Analysis filter:** segment, channel, region, cohort, owner.
- **View control:** grouping, sort, density, comparison.

Show active filters in readable language. Make “clear,” default, and no-results behavior explicit. Preserve valuable state in the URL when safe and useful. Do not silently reset filters on locale or layout change.

For expensive queries, use an Apply action; otherwise provide immediate updates with visible progress and stable layout. Announce result-count changes to assistive technology without excessive chatter.

For table-heavy admin screens, use a toolbar directly above the table in the same bordered card. Put search at the start and filter/export/primary actions at the end; never relocate them to a page hero or shell-level title row. Show applied filters as removable chips on a second toolbar row. Use an end-side filter drawer with draft values plus Clear all and Apply actions. Keep the toolbar and column headers visible in filtered-empty and error states so users can recover without losing context.

## Tables

Use a table when users need precise values, multi-column comparison, scanning, selection, or row actions.

In the React baseline, build interactive tables with TanStack Table and the full contract in [react-dashboard-stack.md](react-dashboard-stack.md). The table, toolbar, and pagination share one bordered card. The table grid is gutterless inside that surface: toolbar/footer own padding, while header/rows reach the card edges with subtle separators.

Specify:

- row identity and default sort;
- sortable/filterable columns and their data semantics;
- column priority and responsive behavior;
- alignment by data type (text follows writing direction; numeric columns align consistently);
- sticky headers/identifiers only when they do not obscure content;
- pagination, virtual scrolling, or incremental loading;
- selection persistence across pages/filters;
- row and bulk actions, permissions, confirmation, undo, and failure behavior;
- empty, partial, stale, and redacted cells;
- export scope, raw/display value choice, locale, encoding, and timezone.

Sortable headers cycle through none, ascending, descending, and none again. Map those states to a vertical up/down arrow pair, a single upward arrow, and a single downward arrow respectively; do not use list-order icons for ascending or descending. Sorting must be clearable, visible, exposed through `aria-sort`, and performed in the client over the complete loaded filtered result before pagination—not merely the visible page. A sort change must be immediate and must not issue a request or replace rows with skeletons. If the complete sortable dataset cannot be loaded safely, surface that constraint and obtain an explicit product exception instead of silently switching to server sorting. Paginated tables include range/total metadata, a per-page selector, and first/previous/current/next/last controls. URL parameters preserve shareable search, applied filters, sorting, page, and page size without making client sorting part of the server query.

Support column resizing, logical start/end pinning, visibility, ordering, and row selection when useful. Persist personal column preferences separately from query-driving URL state. In RTL, pinned regions and resize direction follow logical direction rather than hard-coded left/right behavior.

On narrow screens, prefer one of these explicit patterns:

1. Keep the essential columns and move the rest into row detail.
2. Convert rows to labeled summaries when comparison is not primary.
3. Allow deliberate horizontal scrolling with a visible affordance and sticky identifier.

Never squeeze every desktop column into a mobile viewport.

## Stat cards

Use a coherent family with four supported patterns:

1. **Compact:** value, label, period, and a small tinted icon tile.
2. **Comparison:** icon/label, large value, semantic delta chip, and explicit comparison period.
3. **Sparkline:** label/value/delta with a small supplementary line, area, or bar trend.
4. **Radial/progress:** label/delta, primary value, and a compact bounded-ratio indicator.

Use subtle borders, generous but consistent padding, aligned value baselines, restrained colors, and tabular numerals. Delta color reflects business meaning—an increase in refunds or failures is not positive. Every delta names its comparison. Microcharts and radial indicators are supplementary and need text equivalents. Do not turn arbitrary unbounded values into gauges.

## Interaction and state model

Design state at two levels: page shell and independently loaded regions. Document:

- initial load vs background refresh;
- partial success when one source fails;
- stale-but-usable data with timestamp and refresh action;
- first-use empty vs filtered empty vs a true zero;
- recoverable vs terminal errors;
- permission-denied vs hidden capability;
- optimistic updates, conflicts, retries, confirmation, and undo.

Skeletons must reproduce at least 90% of the final region's geometry rather than merely approximate its outer rectangle. Share the final grid, padding, row heights, and structural divisions; use deterministic content-shaped bars. Follow [skeleton-loaders.md](skeleton-loaders.md), including its distinct initial-load, row-set-transition, and background-refresh behavior. Avoid indefinite spinners. Keep filter and navigation controls usable during background refresh when safe.

## Responsive behavior

Design from priority rather than device labels.

### Wide view

- Expose comparison and coordinated context.
- Use columns for related content, not to fill space.
- Keep the dominant chart/table visually primary.

### Intermediate view

- Wrap controls into coherent rows.
- Move secondary regions below the primary region.
- Avoid abrupt mode changes that lose context.

### Narrow view

- Keep the breadcrumb/current scope, relevant headline health, and primary action first.
- Collapse secondary filters behind a clearly labeled control with an active count.
- Replace multi-column KPI grids with a short ordered list or horizontal region only when the scroll is discoverable.
- Summarize complex charts and provide accessible details.
- Use bottom sheets or full-screen dialogs only when focus, dismissal, and browser history are handled.

Test 200% zoom/reflow, 30–50% longer labels, long unbroken identifiers, mixed scripts, and RTL. Prefer logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`) to physical left/right rules.

## Review questions

- Can the primary user identify the current scope and freshness within seconds?
- Does every headline metric have an unambiguous definition and comparison?
- Is the most important exception or action visually and semantically first?
- Can users recover from empty, stale, partial, error, and forbidden states?
- Does mobile preserve the decision loop rather than merely reflow widgets?
- Does the layout survive longer text, different scripts, and RTL without clipping or reordered meaning?
