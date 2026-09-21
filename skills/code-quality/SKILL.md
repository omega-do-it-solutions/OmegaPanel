---
name: code-quality
description: Implement new coding tasks with cohesive components, hooks, helpers, tokens, and clear ownership while preserving the repository's existing architecture. Use for feature, page, component, or behavior changes; do not use it as authorization for unsolicited refactors, folder migrations, or repository-wide cleanup.
---

# Code Quality

Build the requested change so it is easy to understand, test, extend, and remove. Fit the codebase that exists instead of imposing a preferred architecture on it.

## Scope is a hard boundary

Activating this skill does not authorize a refactor. Do not rename or reorganize existing folders, migrate unrelated modules, replace established libraries, introduce a parallel architecture, or clean up the repository broadly unless the user explicitly requests that work.

Refactor only the touched slice when an extraction is necessary to implement the requested behavior safely or prevents the new code from deepening an existing problem. Preserve public contracts where possible. If the necessary refactor becomes materially larger than the requested task, explain the dependency and ask before expanding scope.

For reviews or explanations, inspect and report; do not mutate code unless the user also asks for a change.

## Let the project decide the structure

Before adding files:

1. Read repository instructions and inspect the current source tree, aliases, package choices, naming, exports, and test conventions.
2. Find the nearest comparable page, feature, component, hook, and data boundary.
3. Search for an existing primitive or shared composition before creating another.
4. Place new code in the narrowest existing owner. Do not create a new top-level source hierarchy or duplicate an established layer.
5. Use the fallback in [references/react-typescript-structure.md](references/react-typescript-structure.md) only when a React/TypeScript project has no clear convention.

Existing project conventions win unless they are unsafe, conflict with the user's request, or make the requested change impossible. Do not copy a visibly broken local pattern merely for consistency; make the smallest compatible improvement and keep it local.

## Decompose by responsibility

A route page should read like an outline of the screen. It composes major sections and owns only route-level coordination. It should not contain the full markup, data access, forms, dialogs, table configuration, formatting, and business rules for every section.

Extract a unit when it has one or more of these signals:

- its own state, effects, request lifecycle, form lifecycle, or interaction contract;
- a meaningful domain or UI name;
- logic that can be tested independently from rendering;
- repeated use or a stable public contract;
- a different reason to change from its parent;
- enough markup or branching that the parent no longer reads as a clear composition.

Choose the boundary that matches the responsibility:

- **component:** cohesive UI and its local interaction;
- **hook:** reusable or independently meaningful stateful behavior, not a place to hide an entire page controller;
- **helper/library function:** pure calculation, parsing, normalization, formatting, or transformation;
- **schema/defaults/mapper:** form validation and conversion outside presentation markup;
- **query/service/API module:** remote operations, query identity, cache policy, and transport adaptation;
- **constant/options/token module:** stable domain options or repeated behavior/sizing values;
- **type module:** shared contracts with a real owner; keep one-off prop types beside their component.

Do not extract trivial one-use fragments, one-line operations, or speculative abstractions solely to reduce line count. File length is a diagnostic, not a target: when a page grows beyond roughly 250–350 lines, or a component/hook beyond roughly 150–250 lines, stop and review its responsibilities. A larger file needs a genuinely cohesive reason; splitting into meaningless wrapper files is not an improvement.

Complex controls such as range sliders, data tables, editors, or uploaders must not become monoliths. Separate pure geometry/value logic, reusable behavior, and meaningful visual subparts when those concerns can change or be tested independently. Keep their public API focused and avoid boolean-prop explosions.

## Preserve ownership and dependency direction

Keep state with the smallest suitable owner:

- server state in the project's query/data layer;
- form state in the established form boundary;
- shared feature state in a feature-local owner only when multiple independent children need it;
- ephemeral interaction state in the closest component;
- persisted global state only for genuinely global preferences or session concerns.

Presentational components do not call endpoints, import mock fixtures, read storage, or know router internals. Pages and features may depend on shared patterns and UI primitives; primitives must not import business features or pages. Promote code upward only after reuse or a stable cross-feature contract is real.

Avoid oversized “controller” hooks that return large bags of unrelated props. Keep collection behavior with the collection, form behavior with the form, and overlay behavior with the overlay. Prefer named operations and explicit data flow over hidden side effects.

## Reuse before adding

Use existing primitives, shared components, hooks, helpers, tokens, and packages before creating equivalents. Extend an established public API when the behavior is genuinely shared; otherwise keep the addition feature-owned. Do not create a new dependency for behavior already covered by the platform or installed stack.

Avoid broad barrels that hide ownership or create cycles. Add a public barrel only for a deliberate component family or feature API. Private modules may be imported directly according to the repository's existing import style.

## Split runtime code deliberately

Follow the router's established lazy-loading convention for new route pages. Dynamically load heavy optional capabilities such as editors, charts, maps, or media tooling when doing so materially reduces the initial path. Do not create microscopic chunks for small components or introduce a second code-splitting system.

Keep providers at the narrowest scope that satisfies their consumers. Do not make feature-local concerns global for convenience.

## Finish the touched slice

Before handoff, inspect the changed files for:

- one recognizable responsibility per module;
- clear names and explicit types;
- no dead imports, obsolete branches, commented-out code, unchecked casts, or suppression comments used as shortcuts;
- no duplicated primitive, helper, query, or token already available in the project;
- complete loading, error, empty, disabled, accessibility, cleanup, and responsive behavior relevant to the task;
- focused verification using the repository's existing commands.

Stop when the requested outcome and its necessary local quality work are complete. Do not continue into unrelated cleanup.
