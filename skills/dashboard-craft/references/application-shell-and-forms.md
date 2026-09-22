# Application shell and form behavior

Read this reference when the dashboard includes persistent navigation, page framing, forms, or responsive shell behavior. The rules describe behavior, not a specific framework or component library.

When the application needs a branded pre-mount loading surface, follow [initial-app-loader.md](initial-app-loader.md). Keep that static boot lifecycle separate from page, route, table, and background-refresh loading states inside the mounted shell.

## Page structure

For dashboard and admin pages inside the product shell, use this default reading order:

1. breadcrumb and current scope;
2. optional stat cards, only when they help the user judge health, volume, or change;
3. the primary data or action surface, such as a table, form, editor, map, or chart-led analysis.

The breadcrumb is the visible page identity. In an authenticated dashboard/admin shell, do not add a default page hero composed of an eyebrow/kicker or slug-like label, oversized title, generic description, and right-aligned actions. Do not create a reusable `PageHeader`-style component that makes this pattern the default. Preserve a single programmatic page heading—normally a visually hidden `h1` matching the current breadcrumb label—so the document still has a clear accessible heading. Mark the current breadcrumb item with appropriate current-page semantics.

Keep global search and account/theme/locale actions in the application header. Keep page-specific search, filters, export, creation, range, and view actions inside the table/card/form/chart region they affect; never float table actions in a decorative page-introduction row. Preserve a card header's useful local title and concise description as a separate region from its toolbar. A visible page introduction is allowed only when it supplies necessary task instructions, onboarding, or object identity that cannot be carried by the breadcrumb and primary surface; record that exception rather than adding filler copy. Do not add stat cards merely to fill space; omit them when they do not change a decision.

For a small supported locale set, render the header locale action as a compact uppercase locale-code button opening a flag-and-language menu. Keep its footprint comparable to the adjacent theme/account actions, anchor the menu at logical inline-end, and preserve header layout when translated copy expands. Do not show a globe/translate icon as the only indication of the current locale. Follow [internationalization.md](internationalization.md) for menu semantics, keyboard behavior, label/flag policy, persistence, and the larger-locale-set fallback.

## Sidebar state model

The desktop shell supports three distinct states:

| State | Layout behavior | Required content |
| --- | --- | --- |
| Expanded | A persistent sidebar participates in layout, typically about 224–256 px wide. | Brand, grouped navigation labels, active state, nested-item affordances, and workspace/footer controls. |
| Collapsed | A compact rail participates in layout, typically about 56–72 px wide, giving the page more room. | Brand mark, icon-only navigation with accessible names/tooltips, active state, and compact footer actions. |
| Collapsed preview | Hovering the rail or focusing within it temporarily reveals the full sidebar as an overlay from logical inline-start. | The same navigable content as expanded state, without changing the stored preference or reflowing the main content. |

The explicit toggle changes and persists the user's expanded/collapsed preference. Hover preview must not change that preference. The preview overlays content with a clear surface boundary, correct stacking, and no main-content shift; dismiss it on pointer leave when safe, `Escape`, or focus leaving the preview. Do not hide a focused item during dismissal.

Hover is an enhancement, never the only discovery path. Keyboard focus within the collapsed rail must provide an equivalent labeled preview or another immediately understandable way to identify and operate every destination. Icon-only controls require accessible names and pointer tooltips. Use `aria-current="page"` for the active destination and expose the sidebar toggle's expanded state. Nested groups need a button with an accessible expanded state and predictable keyboard behavior.

Use logical inline-start positioning so the shell mirrors correctly in RTL. Direction changes must not reverse document order or keyboard order. Keep active-item styling and focus indicators distinct in every state.

On narrow screens, replace the persistent sidebar/rail with a labeled navigation trigger and modal drawer or sheet. Trap focus while open, lock background scrolling, support `Escape`, and restore focus to the trigger. Do not use the desktop hover-preview behavior on touch-only layouts.

Motion should be short and spatially consistent. Respect `prefers-reduced-motion` by removing or minimizing width/transform animation while keeping state changes understandable.

### Expandable navigation groups

Use a disclosure row for a destination family; do not render a nested group as a permanently indented tree with a branch line or repeat full-size destination icons by default.

- Represent the catalog as a recursive discriminated tree with `section`, `group`, and `link` nodes. A group may contain any navigation-node type, including another group, so supported depth is determined by content rather than a hard-coded one- or two-level component. Sections organize and label nodes without incrementing disclosure depth; groups increment it. Give nodes stable identifiers when identity cannot be guaranteed across renders.
- Resolve active state once for the whole tree, then pass the same navigation controller and disclosure controller through every recursive render. The active resolver must walk all descendants, support explicit match patterns for dynamic or index routes, ignore external links, select one current destination, and expose both `isActive(link)` and `hasActiveDescendant(node)`. When the router exposes a pending destination, use that pathname during navigation so the sidebar follows the destination being committed rather than lagging on the previous URL.
- The parent is a real button, not a placeholder link. Give it the same minimum height, padding, icon slot, label treatment, hover/focus behavior, and full-row hit area as first-level destinations. Put one downward caret at logical end and rotate it 180 degrees while open.
- Treat every ancestor group as active when it is open or contains the active destination. A deeply active link therefore opens and emphasizes the complete ancestor chain. Use the normal root active surface treatment for top-level destinations and groups; use a quieter ghost active treatment for nested links and nested groups so descendants do not compete with their root ancestor as multiple filled rows.
- Open each group in the active destination's ancestor chain automatically. The user may still collapse any active ancestor for the current route. Scope both manual-open and active-group-collapse overrides to the effective pathname and reset both collections when the route changes, so navigation follows the new context instead of restoring stale disclosure state.
- Own disclosure state once at the navigation root, keyed by depth, and share it with every group. At each depth, allow at most one manually opened non-active group. Opening a different manual group at that depth replaces the previous one and clears manual selections at deeper depths because their ancestor branch is no longer current. Toggling an active-path group records or clears a route-scoped collapsed override at that depth instead of changing the manual slot.
- Depth exclusivity is independent, not one global accordion: a manual group at depth 1 may remain open while a manual group inside it is open at depth 2. The automatically open active-path group may also coexist with the one manually opened non-active group at the same depth; this is intentional Hub behavior. Do not persist submenu disclosure in local storage by default—persist the sidebar's expanded/collapsed shell preference, not route-contextual tree state.
- Indent the submenu with logical start padding, typically about 1 rem, and a small top gap. Do not add a vertical branch border. Only nested leaf destination links use a small outlined dot in a fixed marker slot; fill the dot for the active destination. An expandable group is a disclosure control, not a destination, so an iconless group must conditionally omit the marker element and its adjacent gap entirely—do not hide a dot or render an empty placeholder. Keep full child icons only when the product taxonomy genuinely requires distinct recognition.
- Expand and collapse the submenu with a height-only reveal around 350 ms using a standard ease curve such as `cubic-bezier(.25,.1,.25,1)`; the caret can rotate over about 200 ms. Use overflow clipping, keep exit content mounted and non-focusable until collapse completes, and remove the transition under reduced motion. Do not fade or slide the entire nested list.
- Connect the button and submenu with `aria-controls` and expose `aria-expanded`. Collapsed content must be hidden from assistive technology and removed from keyboard navigation. In the compact rail, suppress the submenu; the labeled hover/focus preview restores the same expanded disclosure behavior.
- Use logical padding and insets so indentation mirrors in RTL without reversing DOM or keyboard order.

Do not implement each group with isolated component state. That permits several root groups to remain manually open, cannot coordinate sibling replacement, and loses the correct behavior when groups nest. Keep route matching and disclosure ownership at the recursive navigation root; individual group rows only ask the shared controllers whether they are active/open and request a toggle.

Test the navigation contract with behavior-level cases, not snapshots alone:

- a link nested under at least two groups activates the link and automatically opens every ancestor;
- an active ancestor can be collapsed for the current pathname and opens again after navigation changes;
- opening a second non-active sibling closes the first at that same depth and clears stale manual choices below it;
- manual groups at different depths can be open together, and the active path can coexist with one manual group at its depth;
- pending/current route matching, explicit dynamic match patterns, external links, compact rail suppression, hover/focus preview, keyboard operation, `aria-expanded`, and collapsed-child focusability behave correctly.

## Dialog and drawer motion

Animate overlay entry and exit; do not animate only the opening state and remove the node immediately on close.

- Use a 250 ms default duration for an animated panel and its backdrop animation. A narrow 200–300 ms adjustment is acceptable when an established product motion scale already exists, but avoid slow theatrical motion or abrupt sub-150 ms movement.
- A drawer slides along the inline axis from logical inline-end on entry and returns to inline-end on exit. Animate only the panel's transform and use the same `linear` timing function in both directions; do not fade the drawer panel. The direction therefore mirrors in RTL without changing DOM or keyboard order.
- A centered dialog/modal fades and zooms from approximately `scale(.96)` to `scale(1)` on entry, then reverses on exit. Do not use large zooms, bounce, overshoot, or rotation.
- Fade a drawer backdrop in over the same 250 ms as the entering panel. Do not fade it out: keep it visually steady while the panel closes, then remove it after slide-out completes.
- Fade a modal backdrop in and out over the same duration as the modal panel.
- Keep desktop drawers compact: use approximately 24 rem for a small drawer, 28 rem by default, and 32 rem for a larger bounded form. Use full viewport width on narrow screens, but do not let routine filters or small forms consume an oversized share of a desktop viewport.
- Keep the overlay mounted through its exit interval. Mark the closing tree non-interactive and hidden from assistive technology, then unmount it, unlock background scrolling, and restore focus to the invoking control after the exit completes.
- Route close-button, Cancel, backdrop, `Escape`, successful-submit, and programmatic dismissal through the same exit-presence path. Guard against duplicate close requests.
- Under `prefers-reduced-motion: reduce`, remove spatial transforms and finish the transition nearly immediately; never impose a 250 ms invisible wait before focus restoration.

Preserve the standard modal requirements throughout the animation: a labeled dialog, focus containment while open, `Escape` dismissal, blocked background interaction, and reliable focus restoration.

## Destructive confirmation dialogs

A destructive confirmation is a short blocking decision, not a content modal. Give it a dedicated compact treatment while preserving the same backdrop and modal entry/exit behavior:

- Use a bounded surface around 24 rem wide with generous rounding and no header/footer dividers.
- Center a concise question-style title and one short consequence message. Name the affected object in the message when that prevents ambiguity.
- Omit the header close icon. Provide exactly two prominent actions beneath the message: a quiet neutral Cancel action and a solid danger-colored confirm action, with equal width and a narrow gap.
- Use `role="alertdialog"`, label it from the title, describe it from the consequence text, and initially focus Cancel or the least destructive action. `Escape` and backdrop dismissal are equivalent to Cancel; only the explicit destructive button performs the action.
- Disable repeat submission and communicate the pending state on the destructive action. If the operation fails, retain the dialog and show a concise accessible error without replacing the consequence text.
- Keep localized labels short when possible. At high text expansion or when labels cannot fit safely side by side, allow the action row to stack without changing action order or initial focus.

Do not use this compact variant when the user must enter text, review substantial detail, select options, or complete multiple steps; use the ordinary content-dialog or standalone-page pattern instead.

## Two-phase form validation

Use a simple interaction state: `hasSubmitted = false` initially.

### Before the first submit attempt

- Update field values normally, but run user-correctable validation only when the form is submitted.
- Do not show validation errors while the user is typing for the first time.
- Preserve native input constraints and immediate safety-critical feedback when delaying it would cause harm or data loss.

### On the first submit attempt

- Set `hasSubmitted = true` before or as validation runs.
- Validate the complete form and block submission when invalid.
- Show concise inline errors, optionally add an error summary for long forms, and focus or scroll to the first invalid field without losing the user's data.
- Associate every error with its field and announce the failed submission once, without repeating every keystroke.

### After the first submit attempt

- Revalidate the changed field on input so errors clear as soon as the value becomes valid.
- Continue validating the complete form on every submit.
- Do not re-announce unchanged errors on each keystroke.
- Debounce and cancel asynchronous field validation; distinguish network/server failures from field-rule errors.

Do not permanently disable submission merely because an untouched form is currently invalid. The first submit attempt is what reveals actionable validation state.

### Ecosystem examples

React Hook Form directly expresses the required lifecycle:

```ts
useForm({
  mode: 'onSubmit',
  reValidateMode: 'onChange',
  resolver: zodResolver(schema),
})
```

For Vue, VeeValidate can use `submitCount > 0` (or an equivalent attempted flag) to enable per-field input validation only after the first submission while `handleSubmit` continues validating the whole form. Configure triggers per field/component when the global defaults would affect unrelated forms.

Other ecosystems should implement the same state machine with their established form and schema libraries. The behavioral contract is mandatory; React Hook Form, VeeValidate, and Zod are suggested implementations, not framework requirements.

## Custom controls

Forms must use design-system controls rather than visible browser-default selects, checkboxes, radios, switches, or range inputs. Preserve semantic inputs behind custom visuals where possible, and use a maintained framework package for select/combobox behavior. Read [form-controls.md](form-controls.md) for package selection, state styling, labels/errors, portal behavior, radio grouping, switch semantics, and single/dual slider interaction.

Primary documentation:

- [React Hook Form `useForm` types and options](https://github.com/react-hook-form/documentation/blob/master/src/content/ts.mdx)
- [VeeValidate submission behavior and `submitCount`](https://vee-validate.logaretm.com/v4/guide/components/handling-forms/)
- [VeeValidate validation triggers](https://vee-validate.logaretm.com/v4/guide/components/validation/)
- [Zod basics](https://zod.dev/basics)
