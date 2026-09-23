# Accessibility reference

Read this reference while defining dashboard structure, controls, data displays, responsive behavior, and review criteria. The v0.1 baseline is WCAG 2.2 AA, while legal or organizational requirements may be stricter.

## Structure and navigation

- Use one clear page heading and a logical heading hierarchy.
- When the breadcrumb is the only visible page identity, provide a visually hidden `h1` matching its current-page label instead of duplicating a visible title/description.
- Mark the current breadcrumb and current sidebar destination semantically; give the sidebar toggle an accessible name and expanded state.
- Name landmarks and repeated regions so users can navigate directly.
- Keep DOM reading order aligned with visual order across responsive layouts and RTL.
- Provide a skip path past persistent navigation and repetitive filter controls.
- Use native buttons, links, inputs, tables, details, dialogs, and headings before custom widgets.
- Give the page and major regions useful titles that include scope when relevant.

## Keyboard and focus

- Every action must be reachable and operable without a pointer.
- Preserve a visible focus indicator with adequate contrast.
- Move focus only for user-initiated context changes that require it; announce asynchronous updates instead of stealing focus.
- After dialogs close, return focus to the invoking control when it still exists.
- Define arrow-key, Home/End, Enter/Space, Escape, and typeahead behavior for composite widgets according to the chosen established pattern.
- For a compact locale menu, use a button with popup/expanded state and a single-select menu pattern such as checked menu items. Focus the selected locale on open; support wrapping arrows, Home/End, typeahead, Enter/Space, Escape, Tab/outside dismissal, and trigger-focus restoration. Flags are decorative because the visible language name and accessible name carry meaning.
- Keep focus order stable when filters, locale, permissions, or responsive layout change.
- Do not make every chart mark a tab stop; offer efficient grouped navigation and a table alternative.
- A collapsed sidebar's labeled preview must open for keyboard focus as well as pointer hover. `Escape` dismisses the preview, focus remains visible, and navigation never depends on hover alone.
- When mobile navigation opens as a drawer, trap focus, prevent background interaction, and restore focus to its trigger on close.

## Controls and forms

- Use persistent visible labels; placeholders are examples, not labels.
- Connect help and error text programmatically.
- Identify required fields and invalid values in text, not color alone.
- Make filter scope, defaults, applied/pending state, and clear behavior explicit.
- Use 44 by 44 CSS pixels as the normal minimum hit area for buttons, links presented as controls, icon actions, navigation rows, tabs, chips with actions, sort controls, and form-control labels. In an intentionally dense data surface, a smaller target may be used only when it still meets WCAG 2.2 AA's 24 by 24 CSS-pixel target rule or a documented spacing/inline exception, remains easy to acquire, and has no dead clickable-looking padding. Never shrink a primary or destructive action below the 44-pixel product baseline.
- Let the semantic control or link own its full visible hit area. Preserve the document's platform `auto` cursor and assign a cursor only to elements whose semantics require it: pointer for enabled actions and navigation, text for editable content, resize/drag cursors for their matching mechanics, and an unavailable cursor for disabled actions when useful. Keep the chosen cursor consistent across the control and every nested text/icon descendant. Sortable table headers use a full-cell button rather than a small inline target inside clickable-looking padding.
- Confirm destructive actions and support undo where feasible.
- Before the first submit, avoid premature validation errors. On the first invalid submit, associate inline errors with fields, announce the failure once, and focus or scroll to the first invalid field. After that attempt, revalidate changed fields on input and clear resolved errors promptly without repetitive announcements.

## Tables and grids

Use a native table for static or simply interactive tabular data. Associate headers correctly, include a caption or accessible name, expose sort state, and keep row actions named with row context.

Use an ARIA grid only when spreadsheet-like cell navigation is genuinely required and the team can implement its full keyboard, focus, selection, and screen-reader behavior. Virtualization must preserve meaningful position/count information and focus.

## Charts and metrics

- Give each chart a concise accessible name and an adjacent summary of its key finding.
- Provide the underlying values as a table/list or accessible download.
- Do not rely on color alone; use labels, shape, pattern, position, or icons.
- Ensure text, axes, focus indicators, and essential graphical objects meet applicable contrast requirements.
- Expose units, comparison periods, thresholds, uncertainty, missing data, and time zone in text.
- Keep tooltips available by keyboard and dismissible without moving the pointer.

## Dynamic states

- Mark busy regions without making the whole page inert during background refresh.
- Announce important completion, error, and result-count changes in a restrained live region.
- Keep error messages present long enough to perceive and associate them with the failed region/action.
- Do not announce skeleton content.
- Distinguish unavailable, hidden by permission, redacted, and empty in understandable text.

## Visual resilience

- Meet at least 4.5:1 contrast for normal text, 3:1 for large text, and 3:1 for essential control boundaries, focus indicators, and meaningful graphics; verify the actual rendered color pairs in light and dark themes and in every interactive state. Muted text is still text and may not be faded below AA merely to appear secondary.
- Keep routine body, label, helper, table, and navigation text readable at default zoom. Use about 14 CSS pixels or larger for operational copy; reserve 12-pixel text for genuinely secondary metadata, never primary labels, instructions, state, errors, or actions. Do not solve dense layouts by shrinking text and targets together.
- Support text zoom and reflow without two-dimensional scrolling except where the data structure genuinely requires it.
- Do not clip at 200% zoom or under 30–50% text expansion.
- Avoid fixed text heights. Allow translated labels and script-specific line heights to wrap.
- Respect reduced-motion preferences and avoid motion that is required to understand data.
- Keep status meaning when high-contrast/forced-colors modes replace authored colors.

## Review evidence

Record both automated and manual evidence. At minimum, verify:

1. semantic landmarks/headings and accessible names;
2. keyboard-only navigation and visible focus;
3. focus behavior through dialogs, filters, errors, and updates;
4. contrast and non-color status cues;
5. 200% zoom/reflow and narrow viewport behavior;
6. screen-reader interpretation of headline metrics, tables, charts, and state changes;
7. RTL plus keyboard order;
8. chart summaries and data alternatives.

Automated scans do not prove usability. Include manual keyboard and representative assistive-technology checks in acceptance criteria.
