# Brief: global revenue and retention analytics

## Product and outcome

Northstar Commerce needs a dashboard that helps finance leaders and growth analysts detect material changes in net revenue and recurring-revenue retention, identify the segment responsible, and decide whether to investigate pricing, refunds, acquisition quality, or churn.

## Users and permissions

- **Finance lead:** all revenue, refund, conversion-rate, and export data.
- **Growth analyst:** revenue/retention aggregates and segment drill-down; no customer-level financial records.
- **Regional manager:** only assigned regions; native-currency data but not company-wide converted totals.

## Decisions and actions

1. Is net revenue above or below the comparable prior period and plan?
2. Is the change driven by new revenue, expansion, contraction, churn, or refunds?
3. Which region, plan, channel, or currency requires investigation?
4. Should the user open the filtered transaction/subscription explorer or export the current view?

## Data

- Daily gross revenue, refunds, net revenue, and transaction count.
- Monthly recurring revenue movements: new, expansion, contraction, churn, reactivation.
- Active subscriptions and logo churn.
- Dimensions: region, plan, acquisition channel, transaction currency.
- Data arrives hourly; the current hour may be incomplete.
- Company reporting currency is USD. Native-currency amounts and the conversion rate/rate timestamp remain available.
- Comparable prior period uses equal-length complete periods.

## Worldwide and experience constraints

- Initial locales: `en-US`, `de-DE`, `ar-SA`, `ja-JP`; future locales are expected.
- Support USD, EUR, SAR, and JPY with correct minor digits.
- Reports use the account reporting time zone; users may temporarily view another zone if permitted.
- Arabic uses RTL UI while identifiers and some merchant names remain LTR.
- Desktop is primary; executives check headline status on mobile.
- WCAG 2.2 AA baseline and complete keyboard use.
- React, TypeScript, and Tailwind are the example implementation stack.

## Required states

Initial loading, background refresh, first-use empty, filtered empty, zero movement, stale data, partial failure of retention data, full failure, offline, restricted region, export in progress/success/failure, and a locale-catalog load failure.

## Non-goals

- Editing transactions or subscriptions.
- Producing accounting statements.
- Performing currency conversion in the browser.
- Predictive forecasting in v0.1.
