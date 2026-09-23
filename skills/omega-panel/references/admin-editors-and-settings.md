# Admin editors and settings reference

Read this reference whenever an authenticated admin experience contains a standalone create/edit page, CMS or rich-content editor, publish/schedule workflow, account or user administration, settings, multi-section form, tabbed configuration, or repeatable field collection.

## Keep the page task explicit

An editor or settings page is a mutation workflow, not a decorative dashboard. The user must be able to identify the object or settings domain, understand what will change, find the primary command, and leave without losing work.

- Keep the breadcrumb as the shell-level page identity. Show a visible object name or settings-domain heading only when it distinguishes the current record or task; do not repeat the breadcrumb with a generic title, eyebrow, filler description, or detached action row.
- Use one clear primary command per mutation scope. Save, Publish, Schedule, Invite, or Create may be primary; do not present several visually equal primaries.
- Put commands with the surface they mutate. Table actions belong to the table toolbar, editor commands to the editor command bar, field-level actions to their field/repeater, and account danger actions to a dedicated danger section.
- Do not render a redundant selected-state action such as an `Edit` button while the page is already in edit mode. Use mode labels only when they clarify a real read/edit transition.

## Long-form command bar

Use a standalone route for large, multi-section, rich-content, or high-consequence editing. Give it a persistent command area when the primary action would otherwise disappear during normal scrolling.

The command bar must define:

- one primary action and any secondary Preview, Cancel, Save draft, Publish, or Schedule actions in a stable order;
- dirty, saving, saved, validation-failed, server-failed, offline, and conflict states;
- whether save is explicit, automatic, or hybrid, and which fields share one transaction;
- the authoritative last-saved state when that information prevents uncertainty;
- responsive behavior that keeps the primary action reachable without covering fields or the software keyboard.

Do not claim “autosaved” until the server has accepted the exact revision. A failed autosave remains visibly dirty and offers retry. Guard route changes, locale/content-language switches, tab changes that unmount fields, and browser dismissal when unsaved work would be lost. For concurrent edits, detect a stale revision and offer an explicit reload/compare/overwrite path rather than silently applying last-write-wins.

## Mutation boundaries and action states

Document which changes:

1. save together as one form transaction;
2. apply immediately as isolated settings;
3. navigate to another workflow;
4. trigger an irreversible or high-risk operation.

Do not mix these boundaries without labels and feedback. Disable repeat submission only while the matching mutation is pending, keep the user's values after a recoverable failure, associate errors with the affected scope, and expose success without moving focus unnecessarily.

Render an action only when it is valid for the current record state and the user has permission. Hiding an action is not authorization: the server still enforces every mutation. When an unavailable action must remain visible for context, disable it with a concise reason; otherwise omit it. Never show mutually contradictory controls such as “resend invitation” for an active signed-in user or “force unlock” for an account that is not locked.

## Form composition and measure

- Organize fields around user decisions and save boundaries, not database columns.
- Use spacing, alignment, section headings, separator lines, or a subtle muted/slate section background before adding another bordered container. One containing surface may group a coherent form; do not wrap every field or short group in another card.
- Every border, radius, shadow, or background surface must communicate a real grouping, interaction boundary, independent loading state, or elevated layer. If removing a nested box leaves the hierarchy understandable, remove it.
- Avoid card-inside-card presentation. More than one visible nested bordered surface requires a documented interaction/state reason; three visible container layers is a design failure, not a hierarchy technique.
- Keep ordinary inputs to a readable measure based on expected content. Do not stretch email, role, date, status, or short-name controls across a wide desktop merely because the grid permits it. Reserve full-width fields for long text, code, rich editors, asset drop zones, and content that benefits from the space.
- Align labels, controls, helper text, and errors consistently. Helper text explains consequences or format; it must not expose framework names, internal constraints, code architecture, or implementation trivia.
- Mark required fields consistently in visible text or with an asterisk plus an accessible “required” indication. Color alone is insufficient.
- Keep validation quiet until the first submit, then revalidate changed fields on input as defined in [application-shell-and-forms.md](application-shell-and-forms.md).
- Use the design-system control contract in [form-controls.md](form-controls.md); browser-default-looking select, checkbox, radio, switch, and range controls are not acceptable finished UI.

## Read-only, derived, and system information

Read-only values are content, not disabled form fields. Present last sign-in, created time, immutable ID, source, current status, and computed values as labeled text, a description list, or a compact metadata row. Use a disabled control only when its position inside an otherwise editable form is important to understanding the workflow, and explain why it cannot be changed.

Keep internal IDs and operational metadata subordinate but readable. Provide Copy, Reveal, or Open actions only when users actually need them. Do not style historical facts like editable inputs or place a clear icon inside a value the user cannot clear.

## Editing and publishing workflows

For content editors, define the full lifecycle rather than only the fields:

- stable human-readable object identity; avoid lists of indistinguishable “Untitled” rows when a fallback identifier, content excerpt, type, author, state, or modified time can help;
- draft, review, scheduled, published, archived, and failed states that actually exist in the product;
- Save draft, Preview, Publish/Update, Unpublish, and Schedule actions only in states where they are valid;
- publishing validation, pending feedback, success destination, server failure, and revision conflict behavior;
- schedule date, time, authoritative named time zone, daylight-saving edge behavior, and cancel/reschedule behavior;
- revision/history access when the product supports it;
- media selection/upload progress, failure, replacement, alternative text, and permission behavior.

Do not expose editor-library names, storage mechanics, fixed-code limitations, or schema commentary as end-user instructions. Translate system constraints into the user consequence and the available action.

## UI locale and content locale are separate

The global locale selector changes the administration interface. A content-language selector changes the record being authored. Never use one control for both responsibilities.

For localized content, define:

- which locales the object supports and which is the source/default content locale;
- per-locale completion, validation, draft, and publish status;
- field-level or locale-level fallback behavior, including what customers see when translation is missing;
- whether publishing one locale affects the others;
- preservation or confirmation of unsaved work before changing content locale;
- a visible indication of the content locale near the editor, independent from the global UI locale;
- safe copying from another locale without silently overwriting existing work.

Switching the UI locale must not change the content locale. Switching content locale must not reset the route, global filters, or unrelated preferences. Follow [internationalization.md](internationalization.md) for formatting, bidi, message, and global locale-selector behavior.

## Tabs and section navigation

Use tabs only for peer views of the same object or settings domain. Use links or a local section navigation when each destination has its own route and browser-history meaning.

- The active item is distinct from hover and focus and is exposed semantically.
- Every target is normally at least 44 by 44 CSS pixels. Do not reduce navigation to tiny text floating in a thin strip.
- Keyboard behavior follows the selected tabs or navigation pattern; focus order matches visual order.
- At narrow widths or 200% zoom, wrap to a deliberate multi-row layout, use an accessible overflow menu, or permit a clearly discoverable horizontal scroller. Silent clipping is a failure.
- Changing sections must not discard dirty fields. Keep one form owner, persist the draft, or warn before unmounting unsaved content.

## Repeaters and ordered collections

For cards, promises, links, FAQs, addresses, or other repeated fields, define:

- the item identity shown to the user, current count, minimum/maximum, and empty state;
- Add placement and what the new item is called;
- expand/collapse behavior for long items;
- reorder controls with keyboard equivalents and a text announcement of the new position;
- remove behavior, consequence, confirmation or undo, and minimum-item protection;
- per-item errors and how the first invalid collapsed item is revealed and focused;
- stable keys that preserve input values and focus during reorder.

Do not rely on an unlabeled ellipsis as the only way to discover item actions.

## Account, role, and user administration

Model account state explicitly—for example invited, invitation expired, active, locked, disabled, and deleted—and derive visible actions from state plus permission.

- Invitation actions appear only while an invitation is relevant. Active users do not receive “resend invitation.”
- Unlock appears only for a locked account. Disable/enable reflects the current state and explains session impact.
- Last sign-in and invitation history are read-only facts, not editable date fields.
- Role controls explain effective access when needed and prevent removal of the last required owner/administrator. Enforce that invariant on the server as well as in the UI.
- Separate personal preferences from organization-admin mutations when their ownership, save behavior, or permissions differ.
- Put destructive or access-removing operations in a dedicated danger section with state/permission guards and the compact confirmation contract from [application-shell-and-forms.md](application-shell-and-forms.md).

## Overview and operational summaries

Admin overviews prioritize exceptions and next actions. Do not give every zero count, healthy state, and urgent issue equal card weight. Lead with the item that requires attention, show owner/deadline/context, and provide the next valid action. Avoid forcing neighboring regions to equal height when that creates large empty rectangles. A layout may be asymmetrical when the task priority is asymmetrical.

Recent-content or activity rows need enough identity to support recognition and action: title or safe fallback, type, state, owner when relevant, modified time, and the most likely row action. Repeated anonymous labels and duplicate zero summaries create noise rather than overview value.

## Empty and no-result states

Keep the surrounding surface, title, toolbar, columns, and applied-filter context stable. Then render the state that actually occurred:

- **First use:** explain what belongs here and offer the permitted create/import action.
- **Filtered empty:** say that no items match, show or retain applied filters, and offer Clear filters or edit-search recovery.
- **Permission-limited:** explain that results or actions are unavailable without implying the dataset is empty.
- **Load failure:** preserve safe context and offer retry; do not label it “No results.”
- **True zero:** show zero without a creation pitch when zero is a valid operational outcome.

Never combine first-use and filtered-empty copy into one ambiguous message. Do not offer both a toolbar Create action and a duplicate empty-state Create action unless the duplication materially improves first-use discovery.

## UX writing

- Use sentence case and direct, task-oriented labels.
- Keep persistent instructions short and local to the decision they support.
- State the consequence before implementation detail; usually omit implementation detail entirely.
- Replace vague actions such as “Submit,” “Continue,” or an unlabeled ellipsis with the actual outcome when space permits.
- Do not tell users facts the interface already makes obvious.

## Acceptance checks

- A keyboard user can find the primary command, complete the task, recover from validation/server failure, and leave without accidental data loss.
- Scrolling a long editor never strands the save/publish action or obscures the current save state.
- Every visible action is valid for the record state and role; invalid actions are absent or disabled with an explanation.
- Read-only facts cannot be mistaken for editable fields.
- First-use, filtered-empty, permission-limited, load-failure, and true-zero states are distinguishable and recoverable.
- UI locale and content locale can change independently without losing unsaved work.
- Tabs, repeaters, controls, helper text, and command bars pass keyboard, 200% zoom, text-expansion, contrast, target-size, mobile, and RTL checks.
- No screen uses nested bordered cards as its default hierarchy; any remaining nested surface has an explicit containment, interaction, or independent-state reason.
