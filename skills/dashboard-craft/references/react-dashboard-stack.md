# React dashboard implementation baseline

Read this reference only when implementing or reviewing a dashboard already using, or explicitly choosing, React, TypeScript, and Tailwind. It is a concrete profile rather than a framework requirement. For another stack, preserve the behavior and use ecosystem-native equivalents described in [package-selection.md](package-selection.md).

Before writing library-specific APIs, inspect the project's installed major versions. TanStack Table's feature registration and pinning terminology differ by major version. Preserve the behavioral contract below and follow the matching official documentation for the installed version.

## Required stack

- **Tables:** TanStack Table.
- **Server state:** TanStack Query.
- **HTTP:** a typed Axios instance used inside query/mutation functions.
- **Charts:** ApexCharts through its React wrapper.
- **Dates:** Day.js with `localizedFormat`, `utc`, and `timezone`; add other plugins only when the use case requires them.
- **Select boxes:** React Select behind one typed local design-system wrapper.
- **Styles:** Tailwind plus logical CSS properties/utilities.
- **Fonts:** Inter for English and other Latin-script UI; Vazirmatn for Persian; add script-appropriate fallbacks for other locales.

For application-shell states and the required submit-first/input-after-submit form behavior, also follow [application-shell-and-forms.md](application-shell-and-forms.md). React forms may use React Hook Form with `mode: 'onSubmit'`, `reValidateMode: 'onChange'`, and a schema resolver such as Zod when the project uses schema validation.

For a branded first-load surface, follow [initial-app-loader.md](initial-app-loader.md): keep its markup and critical theme-aware CSS in the static HTML beside an inert, busy `#root`. Keep that overlay visible through session restoration, startup redirects, and the committed initial lazy route. During that interval React `Suspense` and auth-guard fallbacks render `null`, preventing a second loader; a route-ready effect removes the overlay and activates the root. Catch optional bootstrap failures so the loader cannot remain indefinitely. Later route transitions use contextual progress or skeletons, never the startup overlay.

Useful primary documentation:

- [TanStack Table overview](https://tanstack.com/table/latest/docs/overview)
- [TanStack Table server-side processing](https://tanstack.com/table/latest/docs/guide/client-side-vs-server-side)
- [TanStack Query cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)
- [Axios cancellation](https://axios-http.com/docs/cancellation)
- [ApexCharts stroke curves](https://apexcharts.com/docs/options/stroke/)
- [Day.js localized formats](https://day.js.org/docs/en/plugin/localized-format)
- [Day.js timezone plugin](https://day.js.org/docs/en/plugin/timezone)
- [React Select documentation](https://react-select.com/)
- [React Select styling APIs](https://react-select.com/styles)

## Form-control profile

Follow the complete [custom form-control contract](form-controls.md). In this React profile:

- import `react-select` only in one local `SelectBox` wrapper; feature forms consume the wrapper, not the package;
- use typed `{ value, label, isDisabled? }` options with stable raw values, `unstyled` or the documented styling APIs, theme tokens, and one shared menu-portal policy;
- integrate React Select with React Hook Form through `Controller`, keeping validation and dirty/reset state in the form owner;
- render locally owned checkboxes and radios with visually hidden native inputs plus custom marks so browser chrome is absent while form and keyboard semantics remain intact;
- render switches as labeled `role="switch"` buttons for immediate settings, with `aria-checked`, disabled/pending behavior, and track/thumb state cues;
- render single and dual range sliders over styled native range inputs, with normalized token-based rails/fill/thumbs, separately named dual values, clamped crossing behavior, and formatted `aria-valuetext`;
- keep select menus above drawers/dialogs without breaking anchoring or focus containment, and verify the wrapper in light, dark, RTL, forced-colors, zoomed, and narrow layouts.

Do not keep a fallback product `<select>` merely for short option lists. Searchability can be disabled while the same packaged wrapper preserves consistent visuals and interaction.

## Locale-selector profile

The compact global-header locale switcher is a command menu, not a form field, so it does not need React Select merely because ordinary select boxes do. For a small fixed locale set:

- define typed options such as `{ value, label, code, flag, direction }`, where `value` is the stable locale ID, `code` is the short uppercase trigger text, and the flag is decorative;
- render a local `LocaleSwitcher` component with a native trigger button and an accessible single-select popup menu; use checked menu items (or an equivalent established menu pattern), never a hidden native `<select>` plus a second visual tree;
- anchor with `end-0 top-full`, keep a compact token-based surface, highlight the selected item with semantic and non-color state, and layer it above the sticky shell without portal/focus surprises;
- use refs for selected-item focus, roving tab stop, Escape restoration, outside-pointer dismissal, and Arrow/Home/End/typeahead behavior; locale changes update the provider/document/persistence while the current route and feature state remain mounted;
- test trigger code/current accessible name, checked state, pointer selection, keyboard movement, Escape focus restoration, persistence, and LTR/RTL logical positioning.

For a large or searchable locale catalog, use the project's packaged select wrapper or a dedicated dialog instead. See [internationalization.md](internationalization.md) for the complete product and flag policy.

## Table-card composition

Use one bordered surface for toolbar, table, and pagination:

```text
┌─────────────────────────────────────────────────────────────┐
│ Card header: title                                             │
│              concise description                              │
│                                                              │
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

The card header and table toolbar are separate regions. Keep the table title and concise description in the card header; do not remove or replace them when moving search to the toolbar's start side. Give the header and toolbar a deliberate visual gap or boundary—normally 16–24 px of block spacing inside the padded card header/controls area—while keeping the toolbar clearly attached to the table it controls.

Recommended visual treatment:

- white/default surface, subtle neutral border, 12–16 px radius, and little or no shadow;
- soft neutral header background with medium-weight labels;
- consistent row height and vertical alignment; do not shrink targets to create artificial density;
- horizontal scrolling inside the table region only, while toolbar and pagination remain visible;
- pinned columns use opaque backgrounds, correct stacking, and an inset divider/shadow at the pinned boundary;
- loading, empty, error, and filtered-empty states remain inside the table region without removing the toolbar or header context.

## Toolbar and filter drawer

Place the toolbar immediately above the table inside the same card.

Do not put table search, filters, export, add/create, date/range, or view controls into a page-level eyebrow/title/description banner. The shell breadcrumb already identifies the page; the table card owns its local context and actions.

### Toolbar anatomy

- Start side: labeled search input for the table's main searchable fields.
- End side: filter trigger with active-count badge, export, and primary create/add action.
- Second row when filters are active: “Active filters” label, removable chips, and Clear all.
- Optional table-view controls such as columns, density, or saved views belong near the filter/export actions but must not crowd the primary action.

Search requests should be debounced (roughly 250–400 ms) and trimmed. The accessible label must name what can be searched; a placeholder alone is insufficient. Clearing search or a chip resets page index to zero and runs the same state pipeline as other filter changes.

### Filter drawer

Open filters in an end-side drawer on wide screens and a full-screen sheet/dialog on narrow screens. The drawer uses draft state so closing/cancelling does not change the applied query. Its sticky footer contains **Clear all** and **Apply filters**. Apply commits one atomic filter change, resets the page, updates the URL, and returns focus to the trigger. Escape/close restores focus without committing.

Filter options use stable IDs; labels are localized presentation. Show current applied values as chips outside the drawer. Preserve useful facet counts from the server, but do not calculate “all results” facets from one fetched page.

### Export behavior

Export is a server-owned operation for server-backed tables. Send the authorized search and applied filters to a dedicated export endpoint, but omit pagination and interactive client-sort state so the server exports the complete matching dataset—not only the visible page. Do not fetch every page into the browser and concatenate it. The server re-applies authorization, redaction, stable column definitions, locale/time-zone/currency metadata, CSV-injection protection, and any practical row limit before returning a file or asynchronous export job. Make an explicit distinction when the product offers both “Export filtered results” and “Export all data”; “all” must not silently inherit the current page or a hidden time filter.

Keep export available while paging when safe, communicate preparation/progress, preserve the table state, and surface server validation or permission failures beside the toolbar action.

### Add and edit surfaces

Use one shared form component and validation schema for add and edit; vary initial values, copy, permissions, and submit mutation rather than maintaining divergent forms.

- Small, bounded forms normally open in an end-side drawer (full-screen sheet on narrow screens) so users retain table context. The primary add action opens an empty instance; row edit opens the same surface populated with that record. Closing restores focus to the invoking control and successful save refreshes the affected query without losing valid table state.
- Large, multi-section, long-running, or route-worthy operations use standalone add/edit pages with stable URLs, navigation guards for unsaved changes, and an explicit return path to the preserved table view.
- Use a centered confirmation dialog only for destructive confirmation or a genuinely short blocking decision; do not use it as the default CRUD form container.

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

Interactive sorting is client-owned. Load the complete filtered dataset required by sortable columns, enable TanStack's client `getSortedRowModel`, and apply sorting before pagination. Never enable `manualSorting`, send `sort`/`orderBy` with the table-data request, include sorting in the query key, or sort only the currently visible server page. Search, filters, facets, and export may remain server-owned. If data volume makes the complete sortable dataset unsafe to load, report the constraint and require an explicit product decision rather than silently substituting server sorting.

Column resizing defaults to `onEnd` for rendering performance. Set the resize direction from the resolved UI direction. Persist column width/order/visibility/pinning as a user table preference when valuable, but do not put large transient sizing state in a share URL.

## Clearable three-state sorting

Every sortable header is a button inside its `<th>` and cycles:

```text
none → ascending → descending → none
```

Keep sorting removal enabled. Expose the current state with `aria-sort`, a visible state-specific icon, and an accessible next-action label such as “Sort ascending,” “Sort descending,” or “Clear sort.” Use this fixed visual mapping: a vertical up/down arrow pair for `none`, a single upward arrow for `ascending`, and a single downward arrow for `descending`. With Phosphor Icons, use `ArrowsDownUp`, `ArrowUp`, and `ArrowDown` respectively; do not substitute list-order glyphs such as `SortAscending`/`SortDescending`. Sort-direction icons describe data order, so they do not mirror in RTL. Use the table library's next-order/toggle APIs instead of maintaining a second sorting state.

Choose and document whether the product supports one sort or Shift-assisted multi-sort. When multi-sort is enabled, show the sort priority number and let each sorted column return to `none`. Define null placement and the initial direction per data type explicitly; dates and numbers often begin descending, while names often begin ascending.

Sorting updates the client row model immediately and may update the URL for shareability, but it must not issue a request, enter a fetching state, or render skeleton rows. Preserve the current page unless the product explicitly chooses a local page reset; either choice remains entirely client-side.

## Pagination footer

Every paginated table footer contains:

1. localized metadata: “Showing 21–40 of 238” (or an honest unknown-total variant);
2. a labeled per-page select, normally `10`, `20`, `50`, and `100` subject to backend limits;
3. first, previous, numbered/current, next, and last controls when total pages are known;
4. disabled states at boundaries and during unsafe transitions, with visible and accessible current-page state.

The internal TanStack page index is zero-based; shared/API `page` is one-based unless the backend contract explicitly differs. Changing page size, search, filters, or grouping normally returns to the first page. On a page or other server-owned row-set query transition, keep the real header, replace only `<tbody>` with page-size-matched cell skeletons, and disable the per-page select plus every pagination control. Client sorting is not a row-set request and never invokes that loading treatment. Initial loading renders header, body, and pagination skeletons using the real column and footer geometry. Ordinary same-query background refreshes retain previous rows with a restrained fetching indicator. Follow [skeleton-loaders.md](skeleton-loaders.md).

On narrow screens, preserve metadata, per-page choice, previous/current/next, and access to first/last when meaningful. Do not compress all page numbers into tiny targets.

## URL as shareable table state

Treat validated URL search parameters as the shareable source of truth for table state. Only server-owned values belong to the data request/query key; client sorting remains URL-shareable without becoming query-driving:

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

Back/forward navigation must rehydrate table state without loops. Prefer replace navigation for each debounced keystroke and canonical cleanup; use the project's routing convention for discrete changes so history remains useful rather than noisy. Reset page before serialization when search, filters, or page size changes. Client sorting may preserve the current page and must not trigger a server request when its URL value changes.

Column width, resize drag state, hover, open menus, and drawer drafts do not belong in the share URL. Persist durable personal table preferences separately in local/account settings.

## Axios + TanStack Query request flow

Use a typed Axios instance for base URL, credentials, headers, error normalization, and auth handling. TanStack Query owns caching, request lifecycle, retries, cancellation, background refresh, and invalidation; components must not duplicate fetched server data into local state.

Canonical flow:

```tsx
const serverQueryState = {
  q,
  filters,
  pageIndex,
  pageSize,
}

const tableQuery = useQuery({
  queryKey: ['admin', 'letters', serverQueryState],
  queryFn: async ({ signal }) => {
    const response = await api.get<TableResponse<Letter>>('/letters', {
      params: toApiParams(serverQueryState),
      signal,
    })
    return response.data
  },
  placeholderData: keepPreviousData,
})
```

Every value read by the query function that changes the response belongs in the deterministic query key. Client sorting is deliberately absent because it must not change the server response. Pass TanStack Query's `AbortSignal` directly to Axios so obsolete filter/search/page requests cannot overwrite newer state. Treat cancellation as normal control flow, not a user-facing error.

Distinguish:

- `isPending`: no usable result yet—render strict header/body/pagination skeletons using the real table geometry;
- `isPlaceholderData && isFetching`: a new query is using old cached rows—render body-only skeleton rows and disable pagination/per-page controls;
- same-query background fetching: retain previous rows, show a small progress cue, and keep safe controls operable;
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

- Data-backed skeletons reproduce at least 90% of final geometry; table initial load includes header/body/pagination, and row-set transitions skeletonize only the body while pagination is disabled.
- Toolbar search, drawer draft/apply/clear, active chips, export, and primary action work by keyboard and on mobile.
- Table surface is gutterless/bordered; client sorting covers the complete loaded filtered dataset with no request/loading state, cycles `none → asc → desc → none`, maps icons to up/down pair → up arrow → down arrow, and resizing/pinning work in LTR and RTL.
- Pagination shows accurate metadata, per-page selection, and boundary-safe controls.
- Copying a URL and opening it in another authorized admin session reproduces the query view.
- Rapid query changes cancel obsolete Axios requests; stale responses never replace newer results.
- Stat cards match one of the defined variants and communicate comparison context without color alone.
- ApexCharts are smooth/animated where semantically safe and become quiet under reduced motion.
- Day.js date/time output uses the authoritative zone and localized format; date-only values remain date-only.
- English numbers show comma grouping; other locales retain correct local formatting.
- Inter/Vazirmatn and other required script fallbacks render without clipping or missing glyphs.
