# React dashboard implementation baseline

Read this reference only when implementing or reviewing a dashboard already using, or explicitly choosing, React, TypeScript, and Tailwind. It is a concrete profile rather than a framework requirement. For another stack, preserve the behavior and use ecosystem-native equivalents described in [package-selection.md](package-selection.md).

Before writing library-specific APIs, inspect the project's installed major versions. TanStack Table's feature registration and pinning terminology differ by major version. Preserve the behavioral contract below and follow the matching official documentation for the installed version.

## Required stack

- **Tables:** TanStack Table.
- **Server state:** TanStack Query.
- **HTTP:** a typed Axios instance used inside query/mutation functions.
- **Charts:** ApexCharts through its React wrapper.
- **Dates:** Day.js with `localizedFormat`, `utc`, and `timezone`; add other plugins only when the use case requires them.
- **Styles:** Tailwind plus logical CSS properties/utilities.
- **Fonts:** Inter for English and other Latin-script UI; Vazirmatn for Persian; add script-appropriate fallbacks for other locales.

For application-shell states and the required submit-first/input-after-submit form behavior, also follow [application-shell-and-forms.md](application-shell-and-forms.md). React forms may use React Hook Form with `mode: 'onSubmit'`, `reValidateMode: 'onChange'`, and a schema resolver such as Zod when the project uses schema validation.

Useful primary documentation:

- [TanStack Table overview](https://tanstack.com/table/latest/docs/overview)
- [TanStack Table server-side processing](https://tanstack.com/table/latest/docs/guide/client-side-vs-server-side)
- [TanStack Query cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)
- [Axios cancellation](https://axios-http.com/docs/cancellation)
- [ApexCharts stroke curves](https://apexcharts.com/docs/options/stroke/)
- [Day.js localized formats](https://day.js.org/docs/en/plugin/localized-format)
- [Day.js timezone plugin](https://day.js.org/docs/en/plugin/timezone)

## Table-card composition

Use one bordered surface for toolbar, table, and pagination:

```text
┌─────────────────────────────────────────────────────────────┐
│ Toolbar: search                Filter  Export  Primary action│
│ Applied filters: [Status: New ×] [Owner: None ×]  Clear all │
├─────────────────────────────────────────────────────────────┤
│ Column headers: sortable, pinnable, resizable               │
├─────────────────────────────────────────────────────────────┤
│ Rows                                                        │
├─────────────────────────────────────────────────────────────┤
│ Showing 21–40 of 238         Per page [20]   ‹ 1 2 3 … 12 ›│
└─────────────────────────────────────────────────────────────┘
```

“Gutterless” means the table reaches the card's inline edges with no card padding around the table grid. The toolbar and pagination footer keep their own responsive padding. Use the card border as the outer table border to avoid doubled lines; add subtle separators between toolbar, header, rows, and footer. Clip pinned backgrounds and hover states to the card radius.

Recommended visual treatment:

- white/default surface, subtle neutral border, 12–16 px radius, and little or no shadow;
- soft neutral header background with medium-weight labels;
- consistent row height and vertical alignment; do not shrink targets to create artificial density;
- horizontal scrolling inside the table region only, while toolbar and pagination remain visible;
- pinned columns use opaque backgrounds, correct stacking, and an inset divider/shadow at the pinned boundary;
- loading, empty, error, and filtered-empty states remain inside the table region without removing the toolbar or header context.

## Toolbar and filter drawer

Place the toolbar immediately above the table inside the same card.

### Toolbar anatomy

- Start side: labeled search input for the table's main searchable fields.
- End side: filter trigger with active-count badge, export, and primary create/add action.
- Second row when filters are active: “Active filters” label, removable chips, and Clear all.
- Optional table-view controls such as columns, density, or saved views belong near the filter/export actions but must not crowd the primary action.

Search requests should be debounced (roughly 250–400 ms) and trimmed. The accessible label must name what can be searched; a placeholder alone is insufficient. Clearing search or a chip resets page index to zero and runs the same state pipeline as other filter changes.

### Filter drawer

Open filters in an end-side drawer on wide screens and a full-screen sheet/dialog on narrow screens. The drawer uses draft state so closing/cancelling does not change the applied query. Its sticky footer contains **Clear all** and **Apply filters**. Apply commits one atomic filter change, resets the page, updates the URL, and returns focus to the trigger. Escape/close restores focus without committing.

Filter options use stable IDs; labels are localized presentation. Show current applied values as chips outside the drawer. Preserve useful facet counts from the server, but do not calculate “all results” facets from one fetched page.

## TanStack Table contract

Use TanStack Table as the headless state/behavior engine; keep semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` markup for ordinary tabular data.

Support where relevant:

- controlled global search and column filters;
- controlled sorting and pagination;
- column sizing and user resizing;
- logical **start/end** column pinning so RTL does not encode physical left/right assumptions;
- column visibility and ordering;
- row selection and bulk actions;
- stable backend row IDs;
- optional grouping/expansion/virtualization when the use case justifies them.

When the backend owns pagination, it must also own every filter, sort, facet, grouping, or aggregation intended to describe the full dataset. Enable the corresponding manual server-side modes and do not add client row models that would misleadingly transform only the loaded page. Pass the server `rowCount` or `pageCount` and reset/validate the page after query-shape changes.

Column resizing defaults to `onEnd` for rendering performance. Set the resize direction from the resolved UI direction. Persist column width/order/visibility/pinning as a user table preference when valuable, but do not put large transient sizing state in a share URL.

## Clearable three-state sorting

Every sortable header is a button inside its `<th>` and cycles:

```text
none → ascending → descending → none
```

Keep sorting removal enabled. Expose the current state with `aria-sort`, a visible icon, and an accessible next-action label such as “Sort ascending,” “Sort descending,” or “Clear sort.” Use the table library's next-order/toggle APIs instead of maintaining a second sorting state.

Choose and document whether the product supports one sort or Shift-assisted multi-sort. When multi-sort is enabled, show the sort priority number and let each sorted column return to `none`. Define null placement and the initial direction per data type explicitly; dates and numbers often begin descending, while names often begin ascending.

Sorting a server-backed table resets to page 1, updates the URL, and issues one new query. Do not sort only the currently loaded page.

## Pagination footer

Every paginated table footer contains:

1. localized metadata: “Showing 21–40 of 238” (or an honest unknown-total variant);
2. a labeled per-page select, normally `10`, `20`, `50`, and `100` subject to backend limits;
3. first, previous, numbered/current, next, and last controls when total pages are known;
4. disabled states at boundaries and during unsafe transitions, with visible and accessible current-page state.

The internal TanStack page index is zero-based; shared/API `page` is one-based unless the backend contract explicitly differs. Changing page size, search, filters, grouping, or sorting returns to the first page. Keep previous rows visible during background page transitions and show a restrained fetching indicator; initial loading may use table-shaped skeletons.

On narrow screens, preserve metadata, per-page choice, previous/current/next, and access to first/last when meaningful. Do not compress all page numbers into tiny targets.

## URL as shareable table state

Treat validated URL search parameters as the shareable source of truth for query-driving state:

```text
?q=allianz&page=2&perPage=20&sort=added.desc&status=new&owner=unassigned
```

Use stable canonical field IDs and values, ISO dates, and one deterministic serialization order. Never serialize localized labels or formatted numbers/dates. Omit default values to keep URLs readable. Allow-list keys and values, clamp page/page-size values, discard unauthorized filters, and canonicalize invalid URLs with a replace navigation.

At minimum synchronize:

- debounced/committed search;
- applied filters;
- sorting, including multi-sort order if supported;
- page and page size;
- grouping/view mode when it materially changes the dataset.

Back/forward navigation must rehydrate table state without loops. Prefer replace navigation for each debounced keystroke and canonical cleanup; use the project's routing convention for discrete changes so history remains useful rather than noisy. Reset page before serialization when search, filters, sort, or page size changes.

Column width, resize drag state, hover, open menus, and drawer drafts do not belong in the share URL. Persist durable personal table preferences separately in local/account settings.

## Axios + TanStack Query request flow

Use a typed Axios instance for base URL, credentials, headers, error normalization, and auth handling. TanStack Query owns caching, request lifecycle, retries, cancellation, background refresh, and invalidation; components must not duplicate fetched server data into local state.

Canonical flow:

```tsx
const queryState = {
  q,
  filters,
  sorting,
  pageIndex,
  pageSize,
}

const tableQuery = useQuery({
  queryKey: ['admin', 'letters', queryState],
  queryFn: async ({ signal }) => {
    const response = await api.get<TableResponse<Letter>>('/letters', {
      params: toApiParams(queryState),
      signal,
    })
    return response.data
  },
  placeholderData: keepPreviousData,
})
```

Every value read by the query function that changes the response belongs in the deterministic query key. Pass TanStack Query's `AbortSignal` directly to Axios so obsolete filter/sort/search requests cannot overwrite newer state. Treat cancellation as normal control flow, not a user-facing error.

Distinguish:

- `isPending`: no usable result yet—render table-shaped skeletons;
- background fetching: retain previous rows, show a small progress cue, and keep safe controls operable;
- partial/stale error: retain safe prior data with timestamp plus retry;
- terminal error with no data: render the in-table error state;
- mutation pending/success/failure: update or invalidate the exact affected query scopes and preserve selection/focus deliberately.

Retries must be bounded and appropriate to method/error class. Do not retry permission/validation failures. The backend response should return rows, total/known count, page metadata, and server facets when the filter UI needs whole-result counts.

## Stat-card system

Use a consistent KPI-card family rather than unrelated one-off cards. All variants share: label, primary value, optional icon, comparison context, clear semantics, responsive padding, subtle border/radius, and tabular numerals.

### Compact card

- Large value first, then short label and time scope.
- Small tinted icon tile aligned to the inline end.
- Best for a dense single-row overview.

### Standard comparison card

- Icon + label header.
- Large value on its own line.
- Delta chip plus explicit context such as “vs last month.”
- Positive/negative color reflects business meaning, not mathematical sign alone.

### Sparkline card

- Label, value, and comparison at the top.
- Small ApexCharts area/line/bar sparkline at the bottom.
- The sparkline is supplementary: provide a text trend and accessible description.

### Radial/progress card

- Label and delta at the top, primary percentage/value at the bottom start, compact radial indicator at the bottom end.
- Use only for a meaningful bounded ratio or progress measure; do not turn unbounded KPIs into gauges.

Keep heights consistent within each row, align values to a common baseline, and avoid overusing icons or saturated fills. A stat card may link to detail, but the whole card should be interactive only when that expectation is visually and semantically clear.

## ApexCharts contract

Use `react-apexcharts`/ApexCharts for full charts, sparklines, and radial indicators. The dashboard visual default is:

- line/area strokes with `curve: 'smooth'` and rounded line caps;
- restrained entrance and dynamic-data animations;
- subtle grids/gradients and semantic series colors;
- responsive height and localized axes/tooltips;
- `sparkline.enabled` for KPI microcharts.

Smooth curves must not hide gaps, overshoot discrete/step data, or imply observations between irregular samples. Use straight/step or monotone-safe behavior when the metric semantics demand it. Keep raw points/tooltips and honest axes.

Respect reduced motion: use ApexCharts' reduced-motion support when available in the installed version and disable or minimize animation through `prefers-reduced-motion`. Disable costly animation for large datasets or many simultaneous charts. Every chart still requires a localized title, plain-language finding, keyboard/screen-reader behavior, and a table/list alternative.

## Day.js date contract

Initialize once at the formatting boundary:

```ts
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
```

Load the resolved Day.js locale explicitly. For common human-facing formats use localized tokens:

- `ll` for compact table dates, such as `Sep 12, 2026` in English;
- `LT` for a separate table time line;
- `lll` for compact date-time;
- `LL`/`LLL` when a longer unambiguous display is useful.

Convert instants through the authoritative named time zone before display, for example `dayjs.utc(instant).tz(reportingTimeZone)`. Do not pass date-only business values through an instant conversion. Keep ISO dates/instants in APIs and URLs. Never use ambiguous numeric English formats as a universal display rule.

## Number formatting contract

Default English/Latin UI uses comma grouping: `1,145`, `12,480`, `$1,842.56`. Generate it with `Intl.NumberFormat('en-US', ...)`, not a regex or preformatted API string. Keep raw numbers for sorting, charting, math, and machine-readable export.

For any other resolved locale, use its locale-aware separators, digits, currency placement, sign, precision, and plural rules. A literal comma must not be forced into Persian, Arabic, German, or other localized output. Compact `K/M/B` values are allowed in stat cards when precision loss is acceptable; expose the full formatted value in accessible text or a tooltip.

## Typography contract

Self-host production WOFF2 fonts when licensing and product infrastructure allow. Use `font-display: swap` and only required weights/subsets.

```css
:lang(en), :lang(de), :lang(es), :lang(fr) {
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
}

:lang(fa) {
  font-family: "Vazirmatn", ui-sans-serif, system-ui, sans-serif;
}
```

Inter is the default for English and other Latin scripts, including German. Vazirmatn is the required Persian font. Add tested script-appropriate fallbacks for Arabic outside Persian, CJK, Devanagari, and any other supported script; do not route every non-Latin language through Vazirmatn.

Use tabular numerals for aligned metrics and table number columns. Do not fix text container heights around either font. Verify glyph coverage, weights, punctuation, currency symbols, line height, 50% expansion, and mixed-script identifiers.

## Acceptance checks

- Toolbar search, drawer draft/apply/clear, active chips, export, and primary action work by keyboard and on mobile.
- Table surface is gutterless/bordered, sort is `none → asc → desc → none`, and resizing/pinning work in LTR and RTL.
- Pagination shows accurate metadata, per-page selection, and boundary-safe controls.
- Copying a URL and opening it in another authorized admin session reproduces the query view.
- Rapid query changes cancel obsolete Axios requests; stale responses never replace newer results.
- Stat cards match one of the defined variants and communicate comparison context without color alone.
- ApexCharts are smooth/animated where semantically safe and become quiet under reduced motion.
- Day.js date/time output uses the authoritative zone and localized format; date-only values remain date-only.
- English numbers show comma grouping; other locales retain correct local formatting.
- Inter/Vazirmatn and other required script fallbacks render without clipping or missing glyphs.
