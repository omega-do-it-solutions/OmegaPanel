# Worldwide readiness checklist

Worldwide readiness is a release gate within dashboard quality, not a separate optional pass.

## Messages

- [ ] All visible and assistive user-facing text is externalized with stable semantic IDs.
- [ ] Full messages replace concatenated fragments.
- [ ] Variables have names and translator context.
- [ ] Plural/select logic supports locale categories; counts are not concatenated.
- [ ] Rich messages expose safe semantic placeholders.
- [ ] Missing messages follow an observable fallback policy and never expose raw keys.

## Numbers, currency, dates, and time

- [ ] Raw values are separate from localized display strings.
- [ ] Numbers, percentages, compact notation, signs, and precision use the resolved locale.
- [ ] English/Latin defaults use comma grouping through `Intl`, without forcing literal commas into other locales.
- [ ] Currency amount and ISO code are stored together; conversion/rounding is defined.
- [ ] Date-only values, instants, durations, and recurring local times are modeled distinctly.
- [ ] Account/report/event/viewer time-zone ownership and DST behavior are explicit.
- [ ] Calendar, week start, fiscal periods, numbering system, and units are supported as required.

## Layout and typography

- [ ] UI survives 30–50% expansion and longer short labels without clipped actions.
- [ ] Text containers wrap and do not rely on fixed heights.
- [ ] Font fallback covers every supported script, numeral, symbol, and weight.
- [ ] Inter is used for Latin UI and Vazirmatn for Persian; other scripts have explicit tested fallbacks.
- [ ] Line height and controls accommodate script-specific metrics.
- [ ] Truncated content remains available through an accessible mechanism.

## Directionality

- [ ] Root/region direction follows the resolved locale or content.
- [ ] Structural CSS uses logical properties and DOM/focus order remains meaningful.
- [ ] Spatial icons/layout mirror while logos, media, charts, and ordered data do not mirror blindly.
- [ ] Mixed-direction names, identifiers, paths, timestamps, and numbers use bidi isolation.
- [ ] LTR data in RTL UI and RTL data in LTR UI are tested.
- [ ] Table pinning uses logical start/end and column resizing follows the resolved direction.

## Switching, search, sort, and export

- [ ] Locale selection, persistence, route/account scope, loading, and fallback are defined.
- [ ] A small fixed locale set uses the compact code-trigger plus flag/name menu pattern; a large/searchable locale set uses a scalable selector instead.
- [ ] The locale trigger exposes its current language and popup state; the menu has semantic selected state, full keyboard/typeahead behavior, outside/Escape dismissal, and focus restoration.
- [ ] Representative flags are decorative and product-approved; language names remain visible, and language/country ambiguity has an explicit fallback.
- [ ] Table URL parameters store stable IDs/ISO values rather than localized labels or formatted dates/numbers.
- [ ] Switching preserves focus, filters, unsaved work, and route where appropriate.
- [ ] Search normalization and locale-aware collation match user expectations.
- [ ] CSV/export defines UTF-8 encoding, delimiter, headings, raw/display values, currency, locale, and time zone.
- [ ] User-controlled spreadsheet exports are protected from formula injection.

## QA

- [ ] Expansion and RTL pseudo-locales expose hard-coded strings and layout fragility.
- [ ] Representative real RTL, non-Latin, number-format, currency, and time-zone locales pass.
- [ ] Desktop and mobile critical workflows pass with keyboard and assistive technology.
- [ ] Screenshots or visual regression cover expansion, RTL, empty/error states, and dense data.
- [ ] Server/client locale agreement avoids hydration or first-render mismatch.
