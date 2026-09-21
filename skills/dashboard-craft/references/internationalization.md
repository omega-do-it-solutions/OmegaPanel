# Worldwide readiness reference

Read this reference whenever designing, implementing, or reviewing dashboard content, data display, layout, interaction, export, or QA. Internationalization is part of the main workflow, not a release-stage checklist.

## Message architecture

### Use stable, semantic messages

- Externalize every user-facing label, heading, helper, status, error, empty-state message, notification, tooltip, accessible name, and chart summary.
- Use stable semantic IDs such as `analytics.revenue.change`, not the English sentence as the key.
- Store full messages, not fragments assembled at runtime.
- Provide translator context: where the message appears, what variables mean, character constraints only when real, and whether text is visible or assistive.
- Keep developer logs, API enums, metric IDs, and message IDs separate from localized copy.

### Variables, plurals, and selection

Use a message-format system that supports locale-specific plural categories and selection. A conceptual message is:

```text
orders.selection = {count, plural,
  =0 {No orders selected}
  one {# order selected}
  other {# orders selected}
}
```

Do not write `count + " orders"` or assume singular/other is sufficient for every locale. Pass raw values to the message/formatting layer. Use gender or grammatical selection only when the product data and locale genuinely require it.

For rich text, translate one coherent message and expose a small set of safe semantic placeholders; do not let markup force unnatural word order.

## Locale-aware formatting

Centralize formatting adapters rather than scattering calls across components. Use standards-based locale data (`Intl` in the React example stack) or the platform's equivalent.

### Numbers and percentages

- Preserve raw numeric values for calculations, sorting, chart scales, and exports.
- Format grouping, decimal separators, signs, percent scaling, numbering system, compact notation, and precision per locale and metric contract.
- In the default English/Latin admin UI, show three-digit comma grouping through `Intl.NumberFormat('en-US')`, for example `12,480`; never insert commas manually or force them into locales that use other separators/digits.
- Distinguish a ratio (`0.42`) from a percentage value (`42`) in the data model.
- Do not parse formatted display strings back into numbers.

### Currency

- Store amount and ISO currency code together.
- Do not assume currency from language or locale.
- Define conversion source, rate timestamp, rounding, and whether totals are native-currency or converted.
- Show currency code when symbols are ambiguous or multiple currencies appear together.

### Dates, time, and time zones

- Store instants in an unambiguous form and keep zone-aware business dates distinct from instants.
- Define the owner of each time zone: account, location, report, event, or viewer.
- Display the active zone when it can change interpretation.
- Aggregate daily/weekly metrics in the business-defined zone before formatting.
- Handle daylight-saving gaps/overlaps and calendar/week-start differences.
- Avoid ambiguous numeric-only dates in cross-locale exports or operational contexts.
- Do not infer an instant for date-only values such as billing dates.
- In the React baseline, use Day.js with `localizedFormat`, `utc`, and `timezone`. Prefer localized `ll`/`lll`/`LT` tokens for human display, convert instants through the authoritative named zone, and keep ISO values in URLs/APIs.

### Units and names

- Keep the quantity and unit separate; format measurement units through locale-aware APIs when supported.
- Never assume first-name/last-name structure, fixed address lines, or alphabetical order based on Latin characters.
- Use locale-aware collation for human-facing sorting and normalize search intentionally without destroying meaningful distinctions.

## Layout, expansion, and typography

- Test 30–50% text expansion, and more for short source labels.
- Allow controls and headings to wrap; avoid fixed heights around text.
- Reserve truncation for genuinely secondary content and provide access to the full value.
- Validate glyph coverage for all supported scripts, including numerals and punctuation.
- Choose a fallback stack by script and platform; a single font rarely covers every script well.
- Use Inter for English and other Latin-script UI, including German. Use Vazirmatn for Persian. Add tested script-appropriate fallbacks for other Arabic locales, CJK, Devanagari, and any other supported script rather than routing every non-Latin locale through one font.
- Let line height adapt to diacritics and script characteristics.
- Do not simulate unsupported glyphs or replace text with images.

Pseudo-locales should reveal unextracted strings, clipped text, concatenation, fragile spacing, and ASCII assumptions. Use one expansion pseudo-locale and one RTL pseudo-locale before testing representative real locales.

## Directionality and mixed content

- Set document/region direction from resolved locale, and permit local direction overrides for user content.
- Use logical CSS properties and logical start/end terminology.
- Mirror layout, navigation arrows, step/progress direction, and spatial icons when their meaning is directional.
- Do not mirror logos, media, play icons, charts, mathematical operators, or ordered data automatically.
- Apply bidi isolation to user-generated text, identifiers, file paths, email addresses, phone numbers, codes, timestamps, and numeric values embedded in opposite-direction sentences.
- Keep DOM/focus order logical; CSS visual reordering must not create a keyboard mismatch.
- Test LTR data inside RTL UI and RTL data inside LTR UI.

## Locale switching and fallback

Define:

- available locales and how display names are written (usually in their own language/script);
- account, workspace, URL, browser, or session ownership of the selection;
- whether switching is immediate and how catalogs/fonts load;
- preservation of filters, focus, unsaved edits, and current route;
- server/client rendering and hydration behavior;
- fallback chain for missing messages/content and how missing keys are detected;
- telemetry that records locale without collecting unnecessary personal data.

### Compact header locale selector

For a small fixed set—normally two to six locales—use a compact locale menu in the global header instead of a permanently wide select:

- The trigger displays the current uppercase language code, such as `EN`, `DE`, or `FA`, in a normal button-sized target. Its accessible name includes the current language, and it exposes popup/expanded state.
- The popup opens below the trigger at logical inline-end. Each row contains a decorative representative flag plus a readable product-approved language name, and the selected row uses both semantic checked/current state and a clear primary-soft visual treatment.
- A reference three-locale presentation is `🇺🇸 English`, `🇩🇪 German`, and `🇮🇷 Farsi`, with `EN`/`DE`/`FA` trigger codes, when those market associations and English display names are explicitly approved by the product.
- A flag never replaces the text label or accessible name. Languages and countries are not one-to-one: omit the flag, use a neutral language mark, or let the user choose region separately when a representative country would be misleading.
- On open, focus the selected row. Support Arrow Up/Down with wrapping, Home/End, typeahead, Enter/Space selection, Escape dismissal with trigger focus restoration, Tab dismissal, outside-pointer dismissal, and immediate persisted switching.
- Switching preserves the current route, filters, unsaved work, and useful focus context. It must update `lang`, `dir`, formatting, messages, and request locale without reloading the app.
- Position and spacing use logical properties so the popup mirrors in RTL; flags and letter codes do not mirror. Keep the popup within the viewport and above the application shell.

When the locale set is larger, user-configurable, searchable, or region-heavy, use a searchable packaged selector or dedicated locale dialog instead of stretching this compact menu pattern.

Never show a raw key to end users. A safe fallback is explicit and observable to developers. Do not silently fall back across writing direction without testing the resulting mixed UI.

## Search, sort, and export

- Collate human-readable strings with the resolved locale; keep stable secondary sorting.
- Define case, accents/diacritics, width, kana, and normalization behavior for search based on real user needs.
- Decide whether search matches localized labels, canonical IDs, or both.
- For CSV/export, define encoding (UTF-8), delimiter, decimal conflicts, column identifiers vs localized headings, raw vs formatted values, locale, currency, and time zone.
- Treat spreadsheet formula injection as a security concern for user-controlled exported fields.
- Preserve machine-readable values in API/JSON exports.

## React, TypeScript, and Tailwind notes

The packaged example uses `Intl` and typed formatting helpers. In production, choose a message library that supports extraction, ICU-style plurals/selects, catalog loading, and rich-message safety.

Prefer:

- a locale provider at the application boundary;
- typed message IDs and formatting functions;
- `dir` on the document or dashboard root;
- Tailwind logical utilities or custom logical-property classes rather than `ml-*`/`right-*` for structural layout;
- CSS grid/flex reflow without fixed text heights;
- server and client agreeing on resolved locale to avoid hydration mismatch.

## Minimum locale QA matrix

Use a compact but adversarial set based on supported markets:

- source/default locale;
- expansion pseudo-locale;
- RTL pseudo-locale and at least one real RTL locale;
- a non-Latin script with different glyph metrics;
- a locale with different grouping/decimal patterns;
- a locale/time zone that crosses date or daylight-saving boundaries;
- representative currencies with 0, 2, and 3 minor digits when the product handles them.

Test critical workflows on desktop and mobile with keyboard and screen reader coverage appropriate to the platform.
