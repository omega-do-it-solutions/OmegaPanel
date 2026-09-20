# Application shell and form behavior

Read this reference when the dashboard includes persistent navigation, page framing, forms, or responsive shell behavior. The rules describe behavior, not a specific framework or component library.

## Page structure

For dashboard and admin pages inside the product shell, use this default reading order:

1. breadcrumb and current scope;
2. optional stat cards, only when they help the user judge health, volume, or change;
3. the primary data or action surface, such as a table, form, editor, map, or chart-led analysis.

The breadcrumb is the visible page identity. Do not repeat it with a separate visible page title or descriptive paragraph unless the task genuinely needs explanatory content. Preserve a single programmatic page heading—normally a visually hidden `h1` matching the current breadcrumb label—so the document still has a clear accessible heading. Mark the current breadcrumb item with appropriate current-page semantics.

Keep global search and account/theme/locale actions in the application header. Keep page-specific search, filters, export, and creation actions with the content they affect. Do not add stat cards merely to fill space; omit them when they do not change a decision.

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

Primary documentation:

- [React Hook Form `useForm` types and options](https://github.com/react-hook-form/documentation/blob/master/src/content/ts.mdx)
- [VeeValidate submission behavior and `submitCount`](https://vee-validate.logaretm.com/v4/guide/components/handling-forms/)
- [VeeValidate validation triggers](https://vee-validate.logaretm.com/v4/guide/components/validation/)
- [Zod basics](https://zod.dev/basics)
