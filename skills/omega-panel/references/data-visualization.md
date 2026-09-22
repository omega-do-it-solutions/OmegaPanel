# Data visualization reference

Read this reference when choosing, specifying, implementing, or reviewing charts.

## Match the display to the question

| User question | Prefer | Use cautiously |
| --- | --- | --- |
| What is the exact value? | number, compact comparison, table | gauge |
| How did it change over time? | line; area only when magnitude/part-to-whole matters | smoothed curve, dual axis |
| Which category is larger? | sorted horizontal bar, dot plot | pie/donut, unsorted columns |
| How do two values relate? | scatterplot with trend/context | bubble chart with two size encodings |
| What is the distribution? | histogram, box plot, strip/dot plot | averages alone |
| Where is the process losing items? | staged bars, funnel only for true sequential loss | decorative funnel shape |
| How is a whole composed? | 100% stacked bar for few categories; small multiples | stacked area with many series |
| Where is something located? | map only when geography is the analytical variable | maps for ranked categories |
| What needs attention? | exception list/table with thresholds and actions | color-only heatmap |

Use small multiples when direct comparison across segments matters more than overlaying many series.

## Specify every chart

Include:

1. Analytical question and user action.
2. Source, measure, dimensions, aggregation, grain, time zone, and missing-data rule.
3. Mark and encoding: position, length, color, shape, or size.
4. Axis scale, domain, baseline, tick/label formatting, and comparison period.
5. Series order, sorting, legend behavior, and maximum useful series count.
6. Tooltip/inspection content, keyboard interaction, selection, zoom, or drill-down.
7. Annotation, target, threshold, forecast, or uncertainty behavior.
8. Loading, empty, error, stale, partial, and permission states.
9. Text summary and data-table alternative.
10. Locale, time-zone, directionality, and export behavior.

For React implementations, use ApexCharts through the React wrapper. Default line/area charts and KPI sparklines to smooth curves, rounded caps, restrained gradients, and short animations, but preserve honest raw points and axes. Use straight/step/monotone-safe behavior when smoothing would imply false intermediate values, hide gaps, or overshoot discrete data. Disable/minimize animation for reduced-motion users, large datasets, or dashboards with many simultaneous charts.

## Integrity rules

- Start bar charts at zero unless the deviation is the explicit subject and the truncation is unmistakable.
- A line chart may use a non-zero domain when it improves resolution; disclose context and avoid exaggeration.
- Keep time intervals consistent. Mark missing intervals; do not silently connect gaps.
- Distinguish zero, null, unavailable, redacted, and not-yet-reported.
- Show uncertainty for forecasts and estimates.
- Avoid dual axes unless the relationship is essential and cannot be represented by indexing, small multiples, or separate charts.
- Do not encode ordered quantitative values with arbitrary hue.
- Keep precision aligned with data quality; avoid decimals that imply false accuracy.
- Place units next to the value or axis, not only in a tooltip.

## Color and labeling

Use color consistently across the dashboard. Reserve semantic colors for actual status or meaning. Pair color with text, icon, pattern, position, or shape.

Prefer direct series labels when space permits. If a legend is required, order it to match the chart and make focus/hover relationships bidirectional. Ensure labels survive translated text and different numeral widths.

Do not reverse good/bad color semantics merely because layout direction changes. Mirror spatial navigation icons where appropriate, not data axes whose direction represents time or increasing value unless the locale/product convention explicitly requires it.

## Locale and time

- Format ticks, tooltips, labels, percentages, currency, and compact notation with the selected locale.
- Decide whether compact notation is acceptable per locale; fall back to full values when ambiguous.
- State the chart time zone near the range when it can differ from the viewer's zone.
- Aggregate dates in the business-defined zone before formatting; changing display zone must not accidentally change metric semantics.
- Make week start, fiscal periods, calendar system, and comparison boundary explicit.
- Use bidi isolation for mixed-direction labels, identifiers, and values.
- Localize chart titles and accessible summaries, not raw series identifiers.

## Accessible alternative

Every chart needs a nearby plain-language summary of the main signal and an accessible data representation appropriate to the task. For simple charts this may be a concise list; for analytical charts provide a table or downloadable dataset.

Keyboard users must be able to reach meaningful interactive points without traversing thousands of marks. Prefer series-level navigation, summarized extrema, or a table for dense data. Announce selected values without flooding live regions.

ApexCharts' own accessibility options are a starting point, not the complete contract. Supply a localized description/key finding, verify keyboard navigation in the installed version, and retain the adjacent list/table alternative.

## Common corrections

- Replace a grid of sparklines with one comparison chart when cross-series differences matter.
- Replace a multi-slice donut with a sorted bar chart.
- Replace a gauge with a value, target, and trend.
- Replace an overloaded chart with small multiples or a filter.
- Add a clear baseline/comparison when a delta lacks context.
- Add a table and narrative when a chart relies entirely on visual inference.
