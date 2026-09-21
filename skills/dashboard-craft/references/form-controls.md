# Custom form controls

Read this reference whenever a dashboard contains select boxes, checkboxes, radio groups, switches, or range sliders. The visible controls must belong to the product design system; do not ship browser-default control chrome. Preserve native form semantics behind the custom presentation whenever doing so improves accessibility or form submission.

## Control ownership

| Control | Default implementation | Why |
| --- | --- | --- |
| Select box / combobox | A maintained framework package wrapped by the local design system | Popup focus, typeahead, filtering, portals, async options, multi-value behavior, and assistive-technology support are expensive to reimplement correctly. |
| Checkbox | Local design-system component with a visually hidden checkbox input | The interaction is small enough to style locally while retaining checked, required, disabled, name/value, label, and form behavior. |
| Radio group | Local design-system component with visually hidden radio inputs inside `fieldset`/`legend` | Native grouping and keyboard behavior remain reliable while the visible circle is fully custom. |
| Switch | Local design-system component, normally a button with `role="switch"` or a visually hidden checkbox | A switch represents an immediate on/off setting and needs a custom track/thumb rather than browser checkbox chrome. |
| Range slider | Local design-system component over one or two visually hidden/styled range inputs | Native range inputs preserve keyboard and pointer mechanics; the rail, fill, thumbs, labels, and output are product-owned. |

“Custom” means custom visual presentation and a stable component API, not removing semantic inputs. Do not add `role="checkbox"`, `role="radio"`, or keyboard emulation to a generic `div` when a hidden native input can carry the behavior. Never render a product select as an unstyled native `<select>` merely because its option list is short.

## Select package defaults by framework

Treat these as the default candidates for a new project, not permission to replace a repository's established accessible select. Before installation, confirm the current framework major, package peer range, maintenance, license, SSR behavior, and bundle constraints.

| Framework | Default candidate | Selection rule |
| --- | --- | --- |
| React | `react-select` | Prefer for single, multi, searchable, async, or creatable selects. Wrap it once with typed `Option` values and the product theme; use `unstyled` or the documented `styles`/`classNames` APIs rather than styling individual call sites. |
| Vue 3 | `vue-multiselect` | Prefer the maintained Vue 3-compatible line for single/multiple selection, tagging, filtering, slots, and async options. Use `@vueform/multiselect` only when its Vue 2/3 bridge or built-in infinite/async configuration is a better project fit. |
| Svelte 5 | `svelte-select` | Prefer for autocomplete/typeahead, multi-select, async loading, groups, and floating positioning. Use the Svelte-major-compatible release and wrap its CSS variables or no-styles entrypoint. |
| SolidJS | `@kobalte/core/select` | Prefer the actively maintained accessible headless primitive. Compose product visuals around its trigger, listbox, portal, items, descriptions, errors, single/multiple values, and typeahead behavior. |
| Angular | `@ng-select/ng-select` | Prefer for searchable single/multi select, virtual scrolling, templates, and Angular forms integration. Match the library major to the Angular major before installation. |

Popularity is only a tie-breaker. Do not select an abandoned or framework-incompatible package because it has a larger historical download count. Re-check official package/repository information when a new project is created; if the repository already uses Radix, Headless UI, Ark UI, Material, Prime, or another accessible system, keep that system unless the requested behavior is missing.

Primary package references:

- [React Select documentation](https://react-select.com/) and [styling APIs](https://react-select.com/styles)
- [Vue Multiselect package](https://www.npmjs.com/package/vue-multiselect)
- [Vueform Multiselect package](https://www.npmjs.com/package/@vueform/multiselect)
- [Svelte Select package](https://www.npmjs.com/package/svelte-select)
- [Kobalte Select documentation](https://kobalte.dev/docs/core/components/select/)
- [ng-select package](https://www.npmjs.com/package/@ng-select/ng-select)

## Shared visual and state contract

Use theme tokens rather than hard-coded light-only values. Every control needs visible default, hover, focus-visible, checked/selected, disabled, read-only when applicable, required, invalid, and high-contrast/forced-color behavior. Keep the minimum pointer target at 44 by 44 CSS pixels even when the visible mark is smaller.

Use the product primary color for active rails, selected rings, checks, switch tracks, and slider fill. Keep unchecked rails and outlines neutral. A white thumb/check can sit on the primary fill when contrast passes. State must never depend on color alone: use checkmarks, inner radio dots, thumb position, text, or icons. Support light and dark themes without inverting semantic colors.

Labels are clickable. Put the label first in the accessible name, connect helper or error text with `aria-describedby`, set `aria-invalid` only for an error, and expose required state both semantically and visually. Do not put interactive links inside a label that toggles the control.

## Checkbox

- Render a square visual with a distinct outline, selected fill, checkmark, optional indeterminate dash, and visible focus ring.
- Support checked, unchecked, and indeterminate states in the component API. Set the native input's `indeterminate` property when using a hidden input.
- Keep label, optional description, and optional error in one field component. Use a compact check-only variant only in data grids where the column header explains the action.
- For a group, provide a group label and group-level error. “Select all” must become indeterminate when only some children are selected.

## Radio group

- Put related options in a `fieldset` with a `legend`, one shared `name`, and one selected value.
- Render an outlined circular mark and a clear inner dot or filled ring for the selected option.
- Keep native arrow-key movement by using visually hidden radio inputs. If a headless primitive replaces them, implement the WAI-ARIA radio-group keyboard pattern completely.
- Use radios when one visible option must be chosen from a small set. Use a select when the list is long, dynamic, searchable, or space constrained.

## Switch

- Use switches for settings that take effect immediately. Use a checkbox for consent, acknowledgement, batch selection, or a value submitted with other form changes.
- Expose `role="switch"`, `aria-checked`, a stable accessible name, disabled/pending state, and Space/Enter activation when implemented as a button.
- The track and thumb must both change state; optional icons may reinforce the state but cannot replace the accessible name.
- Place the text label beside the switch and helper/error text beneath the label region. Avoid ambiguous standalone switches.

## Range sliders

- Render a thin neutral rail, primary filled segment, and high-contrast thumb with a primary border/ring. Display minimum and maximum labels when their meaning is not obvious and show the current formatted value near the field.
- Support `min`, `max`, `step`, formatter, disabled, required, helper/error text, and keyboard operation. Arrow keys move one step; Page Up/Down move a larger step; Home/End move to bounds.
- A single-value slider fills from the logical start to the thumb. A dual-value slider fills between thumbs and exposes separately named minimum and maximum controls.
- Define whether dual thumbs may cross. Prefer clamping the lower value at or below the upper value and the upper value at or above the lower value. Preserve the active thumb when values meet.
- Calculate fill from normalized numeric values rather than pixel offsets. Mirror visual direction in RTL while keeping announced numeric meaning stable.
- Provide text/numeric inputs instead of a slider when users need exact, high-precision, or very large-range entry.

## Select customization contract

Wrap the chosen package in one local component; feature code must not import the third-party select directly. The wrapper owns:

- typed option shape and stable raw IDs rather than localized labels as values;
- label, description, required, invalid, disabled, read-only, loading, empty, and no-results states;
- single and multi value presentation, clear behavior, selected chips, option groups, async loading, and creatable behavior only when requested;
- theme tokens for control, placeholder, value, indicators, menu, option hover/focus/selected/disabled states, multi-value chips, and errors;
- keyboard/typeahead behavior, screen-reader status text, locale-aware option text, and RTL direction;
- integration with the project's form controller and schema validation;
- menu portal placement and stacking. A select inside a dialog or drawer must remain above that surface, stay anchored while scrolling, and not escape focus containment;
- responsive menu sizing, collision handling, long-label wrapping, and touch targets.

Do not use placeholder text as the only label. Do not force filtering for a tiny option list, but keep the same packaged component so visual and accessibility behavior remain consistent. Debounce and cancel remote option loading, announce loading/no-results states, and keep API errors distinct from an empty result.

## Acceptance checks

- No browser-default checkbox, radio, switch, range, or product select chrome is visible.
- Every control is operable with keyboard only and retains a visible focus indicator.
- Labels, descriptions, required state, and errors are programmatically associated.
- Select menus work inside drawers/dialogs and in light, dark, RTL, zoomed, and narrow layouts.
- Checkbox/radio/switch state is perceivable without color.
- Single and dual sliders announce useful values and remain operable when thumbs meet.
- Form reset, default values, dirty state, submission, and server-error mapping work through the local wrapper APIs.
