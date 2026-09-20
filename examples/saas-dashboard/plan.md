# Dashboard plan: workspace adoption and plan management

## 1. Decision summary

- **Outcome:** help authorized workspace roles improve adoption, avoid seat/billing disruption, and reach the correct management workflow.
- **Archetype:** SaaS product-management dashboard with analytical health signals.
- **Loop:** observe workspace/plan health → understand adoption or billing cause → invite, manage seats, assist a team, resolve billing, or review a setting.
- **Success:** users see only relevant health/actions, understand the denominator and data age, and can enter the right workflow on any supported layout.

## 2. Requirements and assumptions

- Confirmed: three roles, adoption + billing + security domains, subscription-owned currency and renewal date semantics, four launch locales.
- Assumption: activation means a member completed two named core actions within 14 days of joining; this requires product-owner approval.
- Assumption: “weekly active” uses the workspace reporting zone and a rolling seven complete days.
- Open: whether security status belongs on this page for non-owner roles and how seat overages are billed.
- Non-goals: payment entry, checkout, and complete settings.

## 3. Data and metric contract

| Metric/object | Definition | Display/permission |
| --- | --- | --- |
| Seat use | assigned licensed seats / purchased seats | localized integers and percent; billing/owner only for plan limit; zero purchased handled as trial state |
| Weekly active | distinct members performing a qualifying event in seven complete account-zone days | localized count and explicit period/zone; product admin and owner |
| Activation | eligible new members completing both core actions within 14 days / eligible new members | percent plus numerator/denominator; “insufficient cohort” is not zero |
| Feature adoption | distinct active members using feature / weekly active members | sorted bar/table; suppress or explain tiny cohorts per policy |
| Renewal | subscription billing date and business zone | localized date; never converted as a viewer-local instant |
| Invoice amount | minor-unit amount + ISO currency | owner/billing only; currency never inferred from locale |
| Security check | stable check ID, state, severity, last evaluated | owner by default; product admin sees no hidden count |

## 4. Information architecture and layout

1. Header: workspace, reporting range/zone, freshness, role-aware primary action.
2. Priority notice: overdue payment, seat-limit risk, trial end, or security blocker—at most one dominant notice, with an “all notices” list when needed.
3. Health summary: seat use, weekly active, activation, and renewal/plan status, with role-aware substitutions rather than blank cards.
4. Adoption trend and feature adoption; each includes denominators and chart/table alternatives.
5. Team opportunity table: team, members, activity, activation, onboarding stage, recommended next step.
6. Plan/billing and security panels for permitted roles, linking to dedicated flows rather than embedding complex settings.

Wide layout uses a 12-column grid: priority notice full width; four health items; adoption trend 8 and feature adoption 4; team table full width; billing/security split when both exist. Tablet stacks analytics before management. Mobile keeps the dominant notice, seat/active health, and role-aware action first; charts become concise summaries with details, and team rows become labeled cards.

Health values use the standard comparison/sparkline stat-card family. The team table sits in a gutterless bordered card with search/filter/export/action toolbar, applied-filter chips, clearable header sorting, resize/pin/visibility controls, and a pagination footer with metadata plus per-page selection.

Expansion allows notices/actions to wrap without fixed heights. RTL mirrors page/navigation/management affordances but not trend axes, logos, plan artwork, or ordered event data. Long workspace/team names use wrapping first, truncation only with full accessible disclosure.

## 5. Components, charts, states, and permissions

- **Priority notice:** semantic status/alert only when urgency justifies interruption; heading, impact, next step, and permission-aware action.
- **Health metrics:** value, definition, denominator/comparison, freshness, and drill link. No unexplained percentages.
- **Adoption trend:** unsmoothed weekly line for active and eligible/activated cohorts as appropriate; explicit account zone and complete weeks; narrative + table.
- **Feature adoption:** sorted horizontal bars for a limited feature set, direct labels, percentage plus numerator/denominator; keyboard and table access.
- **Team opportunities:** server-sorted table/cards with stable team IDs; recommended action is explainable, not an opaque score.

| Scenario | Behavior |
| --- | --- |
| Trial/new workspace | onboarding progress and invitation action replace meaningless trend comparisons |
| No activity | explain qualifying activity and link to onboarding, not a blank zero chart |
| Analytics delayed | keep safe last result, show cutoff/stale message, isolate retry |
| No billing permission | omit billing amounts/actions and avoid disclosing hidden invoice/plan details; show adoption content |
| Overdue payment | urgent notice for permitted roles; non-billing roles see only operational impact if policy allows |
| Seat limit reached | prevent invitation at authoritative server boundary; explain limit and permission-aware next step |
| Invitation | pending/success/error states retain entered addresses safely and report per-invite results |
| Plan conflict | reload current subscription/version and explain that another admin changed it; no silent overwrite |
| Locale failure | retain current complete locale; announce unavailable selection; never mix raw keys |

## 6. Worldwide implementation contract

- IDs follow `workspace.dashboard.*`, `workspace.notice.<code>`, and `workspace.action.*`. Full messages own product/plan variables and plural/select logic.
- Seat/member/invitation messages use locale plural categories. Avoid assumptions about word order or address/name format.
- Format counts/percentages/currency through the resolved locale while keeping raw values. Subscription currency is authoritative; display ISO code when symbol ambiguity matters.
- Renewal is modeled as a billing date with subscription zone/calendar semantics. Activity instants are aggregated in the workspace reporting zone and display that zone near the range.
- Locale switch is user-scoped, catalog-first, route-preserving, focus-preserving, and must not reset invite forms or selected teams without warning.
- UI tolerates 50% expansion, Japanese glyph metrics, Arabic RTL, mixed-direction workspace names, and locale-specific numeral widths. Use logical properties and bidi isolation.
- Human label sorting uses locale collation plus stable ID. Search supports canonical workspace/team IDs and localized labels according to product rules.
- Billing exports state locale, ISO currency, subscription zone, and raw vs formatted values; UTF-8 and spreadsheet-injection protections are required.
- Fallback chain is requested locale → language default → product default; missing keys are monitored. Test fallback that crosses directionality.
- QA uses expansion and RTL pseudo-locales plus Arabic, Japanese, Spanish, and English; 0/1/2/many counts; JPY/USD; month/year boundary; very long workspace/plan names; mobile and 200% zoom.

## 7. Accessibility contract

- One `h1`, named health/adoption/team/management regions, and logical role-dependent heading order.
- Notices do not overuse alert semantics; only new urgent changes interrupt.
- Native links/buttons/tables, visible focus, correct dialog focus return, and clear disabled/action explanations.
- Charts include a key finding and data table; color never solely communicates adoption or risk.
- Role-dependent omission does not leave empty focus targets or unexplained gaps.
- Validate keyboard invitation flow, team table sorting, chart alternative, notice actions, zoom/reflow, forced colors, and LTR/RTL screen-reader reading order.

## 8. Implementation and acceptance

- Boundaries: `WorkspaceHeader`, `PriorityNotice`, `HealthSummary`, `AdoptionTrend`, `FeatureAdoption`, `TeamOpportunities`, `PlanPanel`, `SecurityPanel`.
- `TeamOpportunities` uses TanStack Table with server-controlled search/filter/sort/pagination, stable IDs, column resize/logical pin/visibility/order, and canonical URL state. Axios runs inside TanStack Query and receives its cancellation signal.
- ApexCharts renders adoption charts and stat-card sparklines with semantically safe smoothing, restrained animation, and reduced-motion behavior. Day.js owns localized zone-aware date display; `Intl` owns locale number/currency grouping. Inter covers Latin UI and Vazirmatn Persian, with explicit Arabic/Japanese fallbacks.
- Server returns a role-tailored view model and authoritative actions; the client does not infer permissions from role names.
- Formatting/message adapters receive raw typed values. Billing dates and instants are separate types. URL state stores report filters but not sensitive invite data.
- Analytics, billing, and security use independent load/error boundaries; skeletons match authorized regions to avoid briefly revealing shape/count of hidden data.
- Acceptance: every role gets a coherent page, not blank restricted cards; zero/insufficient/delayed/restricted are distinct; primary action survives mobile; renewal/currency semantics remain correct across locales; keyboard, assistive-tech, expansion, pseudo-locale, RTL, and representative-real-locale checks pass.

## 9. Risks and open questions

1. **High:** activation definition and denominator require approval before building charts.
2. **High:** server-tailored view models are required to prevent billing/security inference.
3. **High:** seat-overage behavior affects notice/action wording and invitation blocking.
4. **Medium:** mixed-role page hierarchy should be tested with real workspace owners and admins.
