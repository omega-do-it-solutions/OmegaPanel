# Skeleton loading states

Read this reference whenever page regions, cards, charts, lists, or tables fetch data after the application has mounted. A skeleton is a structural preview of the exact content being fetched, not a generic gray rectangle or decorative delay.

## Fidelity requirement

The skeleton must be at least 90% geometrically faithful to the resolved component at the same viewport. Match the final component's:

- outer width, height or minimum height, aspect ratio, grid span, and responsive breakpoint behavior;
- card borders, radius, padding, internal gaps, header/body/footer divisions, and alignment;
- count and order of repeated items such as KPI cards, table columns, visible rows, legends, market bars, and pagination controls;
- stable icon/avatar/media footprints, value baselines, text-line count, pill/button dimensions, chart plot area, and footer height;
- narrow-screen reflow, horizontal overflow container, logical alignment, and RTL behavior.

Text bars may approximate content length, but their number, line height, placement, and maximum width should mirror likely real content. Use deterministic widths chosen from representative data; do not generate random widths on each render. When possible, share the final wrapper, grid, column definition, and spacing constants instead of maintaining an unrelated skeleton layout.

Treat a visible jump larger than roughly 10% in region height, major column width, or block position as a skeleton defect. The resolved content should replace the skeleton in place without moving surrounding sections.

## State ownership

- **Initial fetch with no usable data:** render the complete region skeleton, including every structural subregion that will appear when loaded.
- **User-initiated replacement of the same structure:** keep stable chrome such as the card title, toolbar, and table header; skeletonize only the data-dependent body and disable controls that would issue conflicting requests.
- **Background refresh with usable data:** normally retain the data and show a restrained refresh cue. Do not erase useful content for polling, window refocus, or silent cache revalidation.
- **Partial loading:** skeletonize only unresolved subregions. Do not cover independent content that is already usable.
- **Mutation pending:** preserve the current layout and use local pending/optimistic treatment; do not replace the whole page with a skeleton.

Do not add an artificial delay to make skeletons visible. Do not use a skeleton for actions whose duration and scope are better expressed by a disabled button, progress indicator, or status message.

## Table contract

### Initial table load

Render one skeleton table that includes:

1. the full table header row with the real column count, widths, alignments, and header height;
2. a body with the requested page-size number of rows, using final row heights and cell-specific shapes such as avatar + two text lines, badges, numeric bars, dates, and action buttons;
3. the complete pagination footer with metadata, per-page control, and first/previous/numbered/next/last control footprints.

Keep the real card title, description, toolbar, search field, filter/export/add controls, and applied-filter area when those are stable and already known. The table skeleton begins where the final table grid begins.

Use the same `min-width`, `colgroup` or column-sizing model, cell padding, border placement, overflow container, and pagination layout as the real table. A stack of full-width blank rows is not an acceptable table skeleton.

### Page, page-size, filter, search, or sort transition

When a request replaces the row set but table structure is already mounted:

- keep the real table header visible and in the same position;
- replace only `<tbody>` rows with cell-shaped skeleton rows;
- use the next requested page size for the skeleton row count when known;
- keep the pagination footer visible, but disable the per-page select and every page navigation control until the replacement data settles;
- mark the table region busy and announce one concise status such as “Loading table results”; do not expose individual skeleton bars to assistive technology;
- prevent stale row actions from remaining operable under the skeleton.

This body-only transition applies at minimum to page changes that request a new row set. It is also appropriate for search, filter, and page-size changes when they replace the complete server-owned row set. Client-side sorting is immediate and must not display skeletons or enter a loading state. Ordinary background refreshes that do not change the query retain existing rows.

## Charts, KPI cards, and other blocks

- KPI skeletons retain the real card count, grid, padding, label line, value line, delta/comparison row, and icon footprint.
- Chart skeletons retain the card header, subtitle, legend footprint, exact plot height, axis/grid region, annotation/summary block, and any disclosure/footer row.
- Ranked lists and market panels retain the final heading, icon, row count, label/value alignment, progress rails, spacing, and explanatory footer.
- Data-table skeletons inside analytics cards retain the real toolbar/header/body/footer composition, not just the card height.
- Images and media use the final aspect ratio and crop boundary.

Use a shared skeleton primitive for fill color and animation, but compose it into feature-specific skeletons. One universal rectangle component is useful; one universal rectangle layout is not.

## Accessibility and motion

- Put `aria-busy="true"` on the owning region and include one visually hidden `role="status"` message.
- Mark the decorative skeleton tree `aria-hidden="true"`; never announce every bar or row.
- Keep focus out of placeholder controls and disable still-visible conflicting controls during row-set transitions.
- Use a subtle pulse or shimmer that does not imply direction or progress. Respect `prefers-reduced-motion` by stopping the animation while keeping placeholders visible.
- Maintain sufficient placeholder contrast in light, dark, and forced-colors modes without resembling enabled controls.

## Acceptance checks

- At every supported breakpoint, the skeleton and resolved region share at least 90% of their geometry and the same outer footprint.
- Replacing a skeleton does not cause a material layout shift in adjacent regions.
- Initial table skeletons include header, cell-specific body rows, and pagination at the requested page size.
- Table query transitions replace only the body and disable per-page plus all pagination controls.
- Background refreshes preserve usable data unless the query is replacing that data set.
- Skeleton markup is deterministic, theme-aware, hidden from assistive technology, and quiet under reduced motion.
