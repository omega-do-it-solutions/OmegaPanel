# Dashboard plan: order-exception operations

## 1. Decision summary

- **Outcome:** resolve the highest-risk order exceptions before their service-level deadlines.
- **Archetype:** operational/admin.
- **Loop:** observe queue risk and freshness → understand exception/SLA/ownership → claim, assign, inspect, retry, or resolve.
- **Success:** an agent can reach and act on the next permitted case without losing place during live updates; a lead can detect queue risk by market.

## 2. Requirements and assumptions

- Confirmed: near-real-time events, concurrent agents, role-scoped markets/actions, four launch languages, center-zone SLA, desktop plus mobile triage.
- Assumption: backend returns a monotonic event/version ID and an authoritative `dueAt` instant plus fulfillment-center zone.
- Open: carrier retry rate limits, bulk-action maximum, and whether observer role may see customer names.
- Non-goals: order/address/payment-instrument editing.

## 3. Data contract

| Field/metric | Contract | Display/behavior |
| --- | --- | --- |
| Queue risk | count by severity and SLA band: breached, <15m, <1h, later | localized integer and complete message; clicking filters queue |
| SLA remaining | `dueAt - now`, recalculated from authoritative instant | localized relative duration plus absolute due time and named zone; never color-only |
| Exception | stable reason code plus localized label/context | code drives filtering/actions; label may wrap |
| Owner | stable user/team ID and display name | bidi-isolated; permissions resolved server-side |
| Version | record version/event ID | used for optimistic concurrency, not shown unless diagnosing conflict |

The client never calculates business calendars from locale alone. The server determines the SLA due instant from the center calendar and zone.

## 4. Information architecture and layout

1. Header: queue name, assigned markets, connection/live status, current instant and SLA zone.
2. Risk strip: breached and near-breach counts first, then unassigned and total open.
3. Control row: reason, severity, market, owner, SLA band, saved view, sort, density, pause/resume live updates.
4. Primary queue table: severity/status, order ID, exception, market, SLA, owner, updated, actions.
5. Side/detail panel after selection: full event history, customer-safe context, and permitted actions.

Wide view gives the table 8–9 of 12 columns and selected detail 3–4. Without selection the table spans the grid. Intermediate view overlays the detail as a focus-managed dialog. Mobile shows a risk summary, primary filters, and ordered case cards; selecting a case opens a full-screen detail route so browser Back restores the queue and scroll position.

The control row is the table toolbar inside the queue's gutterless bordered card: search on the start side, filter/count, export, column preferences, and primary action on the end side, with active-filter chips below. The table grid reaches the card edges and its footer contains localized range/total metadata, per-page selection, and full pagination controls.

Text expansion wraps filter labels and table headers; density never reduces hit targets below the accessibility target. RTL mirrors shell, filters, panel placement, and navigation icons while order IDs, timestamps, and event sequence remain isolated and ordered.

## 5. Components and interactions

- **Risk strip:** buttons with count, label, severity text/icon, and filter effect. No gauge or color-only heatmap.
- **Live queue:** native table unless spreadsheet-style navigation is proven necessary. New rows do not move keyboard focus or reorder the current viewport; a “7 updates available” control lets the user merge them.
- **SLA cell:** absolute due time/zone in accessible description and localized relative duration. Breach state uses text/icon/color.
- **Row actions:** primary permitted action visible, others in a named menu. Row name is included in each accessible action name.
- **Bulk action:** selection count uses locale plural rules; confirmation describes scope; result reports each success/failure and preserves failed selections.
- **Detail history:** semantic ordered list with localized event messages and raw identifiers isolated.

## 6. State and permission matrix

| Scenario | Behavior |
| --- | --- |
| Initial load | structural table/risk skeleton; current filters remain readable |
| Live refresh | buffer updates and expose merge control; `aria-live` announces only meaningful queue-risk changes |
| Paused/stale | persistent status with last event time, named zone, and Resume/Retry |
| Empty | first-use: explain source/setup; filtered: summarize filters and offer Clear; resolved-zero: positive queue-clear state |
| Carrier partial outage | keep safe queue data, mark affected reasons/rows, disable only retry action, show incident/retry guidance |
| Optimistic claim | mark pending without removing row; server confirms version/permission |
| Conflict | explain new owner/status, refresh row, preserve focus, offer next valid action |
| Forbidden/redacted | server omits forbidden action/data; UI says “Restricted” where existence may be revealed, otherwise does not hint |
| Bulk partial failure | results list names successful/failed cases without exposing unauthorized records; failed rows stay selected |

## 7. Worldwide implementation contract

- Message IDs use `ops.queue.*`, `ops.exception.<code>`, and `ops.action.*`; exception codes and user text are never used as translation keys.
- Counts, selection, update, and result messages use locale plural categories and full-message variants.
- `Intl.NumberFormat`, `Intl.DateTimeFormat`, and locale-aware duration/message helpers format display. Absolute time always states the fulfillment zone when viewer and center zones may differ.
- Customer names, addresses, order IDs, and carrier messages are user/external content: isolate direction, preserve original script, and never concatenate them into grammar-sensitive fragments.
- Fonts cover Arabic, Devanagari, Latin, symbols, and numerals at UI weights. Validate row height under script metrics and 50% expansion.
- Locale switch is a user preference, keeps selected case/filters/pending safe work, loads catalog before commit, and restores focus. The queue's business zone does not change with UI locale.
- Search matches canonical order IDs and normalized customer-facing text according to product rules. Sort by SLA uses raw instants; owner/reason labels use locale collation with stable ID tie-breakers.
- Export includes UTF-8, explicit zone/locale metadata, canonical reason/status codes, localized labels when requested, and formula-injection protection.
- QA covers expansion and RTL pseudo-locales, `ar`, `hi`, `fr`, and `en`; Arabic UI with Latin IDs; Hindi glyph/line metrics; DST overlap/gap; live updates during keyboard action; mobile and desktop.

## 8. Accessibility contract

- Named main/filter/status/queue/detail regions, one `h1`, and skip link to queue.
- Native controls and table; sort state on headers; selection and action names include the order identifier.
- Live events never steal focus. The buffered-update button is announced once, not per event.
- Dialog/detail focus is trapped only while modal, Escape closes, and focus/scroll return to the originating row.
- Severity, SLA, and connection state have text/icon cues and AA contrast; verify forced colors.
- Relative countdown does not announce every tick. Announce only threshold crossings that require action.
- Mobile case cards retain labeled fields and a logical heading/list structure.

## 9. Implementation and acceptance

- Components: `QueueHeader`, `RiskSummary`, `QueueFilters`, `UpdateBuffer`, `ExceptionTable`, `CaseDetail`, `BulkActionResult`.
- `ExceptionTable` uses TanStack Table with logical pinning, `onEnd` resizing, column visibility/order, selection, stable IDs, and clearable none→asc→desc→none server sorting.
- Applied search/filters/sort/page/page size are canonical URL parameters. Axios requests run inside TanStack Query with the entire query-driving state in the key and the query cancellation signal passed through.
- Day.js renders absolute/relative SLA time from the authoritative fulfillment zone; English numbers group with commas while localized views follow their locale. Inter is used for Latin UI and Vazirmatn for Persian if added, with Arabic/Devanagari fallbacks already planned.
- Server owns scope, action permissions, SLA/business calendars, concurrency, and exports. The client sends stable IDs and expected record versions.
- URL stores safe filters/sort/selection; buffered event state is local. Virtualization, if needed, must preserve focus and row position semantics.
- Tests cover role/market leakage, stale streams, version conflicts, bulk partial results, keyboard sorting/actions/dialogs, locale plurals, bidi content, font coverage, expansion, mobile routing, DST, and inaccessible high-frequency announcements.
- Pass when the highest-risk permitted case is reachable/actionable on desktop and mobile; live updates never disorient keyboard users; no unauthorized data/action leaks; and all locale/accessibility test matrices succeed.

## 10. Risks and open questions

1. **Critical:** action/field authorization must be server-derived for every row and bulk request.
2. **High:** event buffering behavior needs testing with high-volume queues.
3. **High:** carrier retry limits and failure semantics must be confirmed.
4. **Medium:** address/name visibility by observer role remains unresolved; default to redaction.
