# Package and ecosystem selection

Read this reference before adding dependencies. This is a capability menu, not an install-all list and not a React-only stack.

Inspect the repository first: framework, installed versions, package manager, design system, routing/data conventions, SSR/runtime constraints, bundle budget, license policy, and existing equivalents. Prefer a compatible package already in use. Add a dependency only when the requested feature needs it and the project's existing tools do not cover the requirement well.

## Suggested capability map

| Capability | Suggested package | Use when |
| --- | --- | --- |
| Charts and KPI microcharts | ApexCharts or the framework adapter | The page needs interactive line, area, bar, radial, or sparkline charts. |
| Headless tables | TanStack Table or the relevant adapter | The table needs controlled sorting/filtering, pagination, sizing, pinning, visibility, ordering, or selection. |
| Server state | TanStack Query or an ecosystem-native equivalent | Remote data needs caching, cancellation, retry, invalidation, or background refresh. |
| Rich-text editing | TipTap | The product needs a headless extensible editor rather than a plain textarea. |
| HTTP client | Axios | The project benefits from a shared typed client, interceptors, error normalization, and cancellation. |
| Dates and time | Day.js | The application needs parsing/manipulation plus localized and timezone-aware presentation. |
| Internationalization | i18next or the framework's established equivalent | Messages, plurals, locale fallback, and language switching need a maintained runtime. |
| Vector maps | jsVectorMap | A lightweight region/country vector map answers the question. |
| Geographic maps | Leaflet | The experience needs interactive tiles, markers, paths, or geographic layers. |
| Motion | Motion or the framework's established motion system | Purposeful transitions or direct-manipulation feedback exceed CSS needs. |
| Code highlighting | Shiki | Code or structured syntax must render with accurate token highlighting. |
| Custom scrolling | SimpleBar | A constrained region truly requires styled cross-browser scrollbars; prefer native scrolling otherwise. |
| Toasts | Sonner or an accessible ecosystem equivalent | Brief non-blocking success/status feedback is useful; errors still remain near the failed task. |
| Carousels | Swiper | Ordered swipeable media or cards are genuinely clearer than a static/list layout. |
| Runtime schemas | Zod or an ecosystem equivalent | API, form, URL, or environment data needs runtime validation and typed inference. |
| Form state | React Hook Form, VeeValidate, or ecosystem equivalent | The form needs submission state, field registration, validation, and accessible error handling. |
| Select boxes | React Select, Vue Multiselect, Svelte Select, Kobalte Select, or ng-select | The product needs custom single/multi select, typeahead, async options, grouping, or consistent non-native select presentation. Choose the adapter for the existing framework and wrap it locally. |
| Interface icons | Phosphor Icons or the repository's established icon system | React dashboard actions and navigation need a consistent, accessible vector icon family. |
| Static quality | ESLint and Prettier, or repository equivalents | The project needs consistent diagnostics and formatting. Follow existing repository configuration. |

TipTap is explicitly framework-agnostic and provides integrations for common frameworks, so select the adapter that matches the project rather than changing the project's stack. TanStack libraries likewise have multiple framework adapters; verify the package and version appropriate to the actual codebase.

For framework-specific select defaults and the customization/accessibility contract for select boxes, checkboxes, radio groups, switches, and range sliders, read [form-controls.md](form-controls.md). Do not expose browser-default control chrome or hand-roll combobox focus/typeahead behavior.

## Selection rules

- Treat every item above as suggested, not mandatory. Never install the entire list by default.
- Preserve the user's framework and architecture unless they explicitly ask to change it.
- Verify current official documentation and the installed major version before writing library-specific APIs.
- Check accessibility, keyboard behavior, SSR/hydration support, browser support, tree-shaking/bundle impact, maintenance, and licensing.
- Use one clear owner per concern. Do not add overlapping chart, form, request, or notification libraries without a migration reason.
- For a new React dashboard without an established icon system, prefer `@phosphor-icons/react`; use one family consistently, import individual icons, keep icons decorative when adjacent text already names the action, and give icon-only controls accessible names. Do not replace an existing product icon system solely to follow this default.
- Keep product behavior in framework-neutral contracts. Library examples demonstrate one implementation, not the only valid implementation.
- Pin or range versions according to repository policy; never invent dependency versions.
- Lazy-load heavy editors, maps, syntax highlighters, and charting modules when they are not needed for the first meaningful view.

Primary documentation:

- [ApexCharts documentation](https://apexcharts.com/docs/)
- [TanStack Table overview](https://tanstack.com/table/latest/docs/overview)
- [TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TipTap editor overview](https://tiptap.dev/docs/editor/getting-started/overview)
- [Axios documentation](https://axios-http.com/docs/intro)
- [Day.js documentation](https://day.js.org/docs/en/installation/installation)
- [i18next getting started](https://www.i18next.com/overview/getting-started)
- [Leaflet documentation](https://leafletjs.com/reference.html)
- [Motion documentation](https://motion.dev/docs)
- [Shiki installation](https://shiki.style/guide/install)
- [Swiper getting started](https://swiperjs.com/get-started)
- [Zod documentation](https://zod.dev/)
- [React Select documentation](https://react-select.com/)
- [Vue Multiselect package](https://www.npmjs.com/package/vue-multiselect)
- [Svelte Select package](https://www.npmjs.com/package/svelte-select)
- [Kobalte Select documentation](https://kobalte.dev/docs/core/components/select/)
- [ng-select package](https://www.npmjs.com/package/@ng-select/ng-select)
