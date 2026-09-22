# React + TypeScript + Tailwind implementation sketch

`AnalyticsDashboard.tsx` demonstrates the formatting and semantic boundary rather than the full application stack:

- typed raw values instead of formatted strings;
- memoized `Intl` formatters for currency, percent, and integer plus Day.js localized/UTC/timezone formatting for account-zone date/time;
- a small locale catalog and locale-aware plural selection;
- `dir`, logical alignment utilities, flexible height, wrapping, and `<bdi>` for mixed-direction content;
- semantic headings, regions, figure summary, accessible chart placeholder, status announcement, and native table;
- responsive Tailwind spacing without locking the planning skill to React.

A production integration must use the React baseline in `../../../skills/omega-panel/references/react-dashboard-stack.md`: TanStack Table for the interactive segment table, Axios inside TanStack Query, canonical URL-backed search/filter/sort/pagination state, ApexCharts for charts and stat-card microcharts, Day.js for localized zone-aware dates, and the Inter/Vazirmatn font strategy. It must also add catalog extraction/ICU-style messages, server-authorized queries/exports, loading/error boundaries, and the full state/QA matrix from `../plan.md`.
