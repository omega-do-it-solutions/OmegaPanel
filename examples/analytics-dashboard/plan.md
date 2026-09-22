# Dashboard plan: global revenue and retention analytics

## 1. Decision summary

- **Outcome:** detect material net-revenue/retention changes, explain the driver, and enter a filtered investigation.
- **Primary roles:** finance lead, growth analyst, regional manager.
- **Archetype:** analytical dashboard with an executive scan layer.
- **Decision loop:** observe revenue/retention against prior period and plan → identify movement and segment → open the relevant explorer/export.
- **Success:** a user can identify whether a change is material, its leading driver, the data cutoff, currency, and time zone within one minute.

## 2. Requirements ledger

### Confirmed

- Hourly data, four launch locales/currencies, account reporting zone, mobile scan use, three permission levels, WCAG 2.2 AA.
- The server owns aggregation, currency conversion, and authorization.

### Assumptions

- “Plan” values are supplied by the finance system at the same daily grain.
- Revenue is recognized at capture for this product view; this is not an accounting statement.
- Locale switching is a user preference; time-zone overrides are report URL state.

### Open decisions

- Whether regional managers may export native-currency aggregates.
- Rate-source name and retention period for conversion audit data.
- Fiscal-calendar rules per account.

### Non-goals

Transaction editing, formal accounting statements, browser-side conversion, and forecasting.

## 3. Data and metric contract

| Metric | Meaning and formula | Source/grain | Display | Comparison/freshness | Missing behavior |
| --- | --- | --- | --- | --- | --- |
| Gross revenue | Captured amount before refunds | Payments, hourly by currency | Reporting currency plus native value in detail | prior equal complete period and plan; cutoff shown | unavailable if conversion rate is missing; do not treat as zero |
| Refunds | Refunds issued during period, shown as positive magnitude | Payments, hourly | currency | prior period; hourly | `0` is valid; delayed source is stale |
| Net revenue | gross revenue − refunds | server semantic layer | currency | prior period and plan | partial badge if either input incomplete |
| Net revenue change | `(current - prior) / prior` when prior ≠ 0 | derived server-side | signed percent; “new” when prior is zero | complete-period comparison | unavailable if prior missing |
| MRR movement | new + expansion − contraction − churn + reactivation | Billing, daily account zone | currency by movement | current complete month vs prior comparable dates | partial error if billing feed fails |
| Logo churn | churned subscriptions / opening active subscriptions | Billing, daily | percent with one decimal | current vs prior comparable period | unavailable if opening base is zero |

All API values are raw numbers with ISO currency, time-zone, and cutoff metadata. The UI never sorts or computes from formatted strings. Conversion records include source currency, rate, rate instant, and reporting currency.

## 4. Information architecture

1. **Header:** page title, account, date range, comparison, reporting currency, time zone, “updated” cutoff, export (permission-gated).
2. **Health summary:** net revenue, change vs prior, change vs plan, refunds, MRR, and churn using consistent comparison/sparkline stat cards. Net revenue is visually/semantically first.
3. **Revenue trend:** current and prior-period lines with plan reference; summary sentence and table alternative.
4. **MRR movement:** signed horizontal bars for new/expansion/reactivation and contraction/churn; link to subscription explorer.
5. **Segment drivers:** sorted table by region/plan/channel with net revenue, delta, contribution, refund rate, and churn; row opens the filtered explorer.
6. **Method and freshness:** metric definitions, conversion source, incomplete-hour explanation, and data-quality notices.

Global scope controls change every region. Segment tabs/filter chips affect trend, movements, and table but not account/currency authorization. URL parameters store date, comparison, segment, group, and time-zone override.

The segment table is one gutterless bordered card: toolbar at the top, table grid edge-to-edge, and pagination footer at the bottom. Its toolbar contains search, a filter-drawer trigger with active count, export, column/view controls, and active-filter chips. The drawer retains draft values until Apply commits status/region/plan/channel/currency filters atomically.

## 5. Layout and responsive specification

### Wide (≥ 1200 px container)

- Twelve-column grid, bounded at roughly 1440 px.
- Header/filter band spans all columns.
- Net revenue summary spans four columns; four supporting metrics use two columns each across the remaining grid and wrap to a second row when needed.
- Revenue trend spans eight columns; MRR movement spans four.
- Segment table spans all columns.

### Intermediate

- Controls wrap by semantic group; date/comparison stay together and currency/time-zone stay together.
- Summary becomes a two-column grid. Charts stack, preserving revenue trend first.

### Narrow/mobile

- Order: title/scope/cutoff → net revenue/change → primary investigation action → compact supporting metrics → revenue summary/chart → MRR summary → segment cards.
- Secondary filters open a labeled full-screen panel; its trigger shows the active count. Apply/cancel preserve focus and browser history.
- Segment table becomes labeled row summaries with net revenue and delta always visible; other values use disclosure. No compressed six-column table.
- Export moves to the overflow menu but remains keyboard reachable.

### Expansion and RTL

- Controls wrap; no text container has a fixed height. Test 50% expansion.
- Grid and icon placement use logical properties. Navigation/chevrons mirror; time-series direction, logos, and trend arrows do not mirror automatically.
- Merchant/plan identifiers and formatted values are wrapped in bidi isolation.

## 6. Components and visualizations

| Component | Purpose | Specification | Interaction/alternative |
| --- | --- | --- | --- |
| Primary metric | Establish current net revenue and comparison | raw amount + ISO currency, signed prior delta, explicit plan delta, cutoff | link opens explorer; definition in accessible description |
| Revenue trend | Compare current, prior, and plan over time | ApexCharts line with semantically safe smooth curves, raw points, consistent intervals, missing gaps, plan reference; account-zone aggregation | focusable series summary, point inspection, narrative and data table |
| MRR movement | Diagnose recurring-revenue driver | zero-based signed horizontal bars sorted by business flow; direct labels | keyboard selects category; adjacent list/table repeats values |
| Segment table | Find responsible region/plan/channel | TanStack Table with server sort/filter/page, contribution and rate columns, stable segment ID, resize/pin/visibility/order support | clearable none→asc→desc→none headers; rows link to filtered explorer; URL reproduces view |

Color distinguishes current/prior/plan and positive/negative only with labels, dash/pattern, icons, or position. Trend summary example: “Net revenue is 7.2% below the previous 30 complete days; EMEA refunds explain 61% of the decline.”

## 7. State and permission matrix

| Area | Loading/refresh | Empty/zero | Error/stale | Permission/success |
| --- | --- | --- | --- | --- |
| Page | structural skeleton; controls disabled only until scope resolves | first-use setup guidance | full-page retry only when no safe data exists; offline retains cached cutoff | region managers see assigned scope without disclosing other regions |
| Metric/chart | region skeleton; background refresh keeps prior value and marks busy | `0` is formatted as zero; no transactions explains why | partial inline error keeps other regions; stale timestamp and retry | redacted metrics show “Restricted,” not blank or zero |
| Filtered result | stable prior layout during request | “No results for these filters” plus clear action | filter error retains selections | unauthorized filter options are absent from server response |
| Export | button progress with non-blocking status | empty export requires confirmation/clear explanation | retry with stable request ID | success announcement and download; server rechecks scope |
| Locale load | current locale remains usable | not applicable | toast/status: requested locale unavailable; no raw keys | successful switch preserves filters, focus target, and route |

## 8. Worldwide implementation contract

- Message IDs use `analytics.<region>.<purpose>`, e.g. `analytics.revenue.changePrior`. Complete messages own variables and plural behavior.
- Use locale plural rules for counts such as selected segments, results, and hours delayed. No concatenated fragments.
- Amount model: `{ amountMinor, currency, convertedAmountMinor?, reportingCurrency?, rate?, rateAt? }`; the server supplies minor-unit semantics.
- `Intl.NumberFormat` formats currency, percent, decimal, and units. JPY shows no forced decimals; codes appear when currencies can be confused.
- API sends instants plus `reportingTimeZone`. Daily aggregation is already performed in that zone. The range/cutoff repeats the visible zone.
- Date-only range boundaries remain date-only; they are not converted through the viewer's local zone.
- Fonts must cover Latin, Arabic, and Japanese at required weights; use script-aware system/fallback stacks and validate numeral alignment.
- Set `dir` from resolved locale. Use `<bdi>`/isolation for plan names, IDs, currencies, and timestamps embedded in sentences.
- Locale preference persists to the user profile; switch loads the catalog before committing, preserves route/filter/unsaved export configuration, and restores focus to the switcher/status.
- Missing catalog/message falls back to English with developer telemetry; never show a raw ID. RTL fallback combinations receive explicit visual tests.
- Collation uses the resolved locale with stable ID as a secondary sort. Search matches localized label and canonical segment ID.
- CSV is UTF-8 with a defined delimiter, localized headings, ISO currency/time-zone metadata, and raw machine-safe values in a separate export option. User-controlled fields are protected from spreadsheet formula execution.
- QA: `en-XA`-style expansion, RTL pseudo-locale, `ar-SA`, `ja-JP`, `de-DE`, `en-US`; USD/EUR/SAR/JPY; DST boundary in `America/New_York`; cross-date comparison with `Asia/Tokyo`.

## 9. Accessibility contract

- `<main>` with one `h1`; named filter, summary, trend, movement, and segment regions.
- Native select/buttons/links and a native table. Sort buttons state the active direction.
- Skip link targets results. Applying filters announces the result count/cutoff without moving focus.
- Charts have headings, narrative summaries, keyboard-accessible high-level inspection, and full tables.
- Focus returns after filter panel/dialog. Export progress/success uses a restrained status region.
- Text and essential graphics meet AA contrast; positive/negative and series differences do not rely on color.
- Verify 200% zoom, 320 CSS-pixel reflow, reduced motion, forced colors, keyboard-only use, and representative screen readers in LTR and RTL.

## 10. Implementation plan

- Domain models: `ReportScope`, `Money`, `MetricValue`, `SeriesPoint`, `SegmentRow`, `PermissionSet`, `Freshness`.
- Boundaries: `DashboardHeader`, `GlobalFilters`, `MetricSummary`, `RevenueTrend`, `MrrMovement`, `SegmentDrivers`, `DataNotice`, each with independent loading/error state.
- `SegmentDrivers` uses TanStack Table with a toolbar/filter drawer, logical column pinning, `onEnd` resizing, tri-state sorting, stable row IDs, and a pagination footer containing range/total metadata, per-page selection, and first/previous/current/next/last controls.
- Search, applied filters, sort order, page, and page size use canonical URL parameters. Search is debounced; query-shape changes reset page to 1; Back/Forward and copied URLs rehydrate stable IDs rather than labels.
- Axios is called inside TanStack Query functions. The canonical table state is part of the query key, the query `AbortSignal` is passed to Axios, and previous rows remain visible during background fetches.
- ApexCharts renders full charts and KPI microcharts with semantically safe smooth curves, restrained animations, reduced-motion support, localized tooltips/axes, narrative summaries, and table alternatives.
- Day.js (`localizedFormat`, `utc`, `timezone`) renders `ll`/`lll`/`LT` in the account reporting zone; API/URL dates remain ISO. English numbers use `Intl` comma grouping, while other locales use their own formatting.
- Inter is the Latin UI font and Vazirmatn is the Persian UI font; Arabic, Japanese, and future scripts receive explicit tested fallbacks.
- A locale provider resolves `locale`, `dir`, messages, number/date formatters, and locale-aware collator. Presentational components receive raw values plus formatter/message functions.
- Query state is URL-backed and validated. Data requests use canonical IDs, ISO dates, zone, and server permission context—not localized labels.
- Server owns aggregation, conversion, permission filtering, and export generation.
- Cache prior safe results during refresh; lazy-load chart implementation and message catalogs; cap high-cardinality segment results with server pagination.
- Test semantic metric fixtures, DST boundaries, currency minor digits, plural categories, catalog fallback, bidi identifiers, permissions, partial responses, keyboard interactions, and responsive/visual states.

See `react-tailwind/AnalyticsDashboard.tsx` for a deliberately small formatting/semantic shell sketch. Production table/query/chart behavior follows `skills/omega-panel/references/react-dashboard-stack.md`; the sketch is not a substitute for that full contract.

## 11. QA and acceptance criteria

- A finance lead can trace a net-revenue delta to one segment and open the correctly filtered explorer.
- A regional manager cannot request, infer, export, or navigate to unauthorized regions.
- Current/prior periods use equal complete intervals in the visible account zone, including DST boundaries.
- Zero, unavailable, delayed, partial, restricted, and error values remain distinct visually and to assistive technology.
- At desktop, intermediate, mobile, 200% zoom, 50% expansion, and RTL, the decision loop and primary action remain intact.
- Keyboard and screen-reader checks cover filters, chart alternatives, sorting, dialogs, refresh, partial failure, and export status.
- Expansion/RTL pseudo-locales plus Arabic, Japanese, German, and English pass formatting, glyph, direction, mixed-content, switching, and fallback checks.

## 12. Risks and open questions

1. **High:** finance must approve revenue recognition and conversion semantics before implementation.
2. **High:** regional export permission is unresolved; default to no export until decided.
3. **Medium:** plan data may not align with daily grain; the UI must not invent interpolation.
4. **Medium:** chart library accessibility must be verified; retain the table even if interactive SVG behavior falls short.
