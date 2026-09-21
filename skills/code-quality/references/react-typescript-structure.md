# React and TypeScript fallback structure

Read this reference only when a React/TypeScript repository does not already have a clear ownership model. It is based on the feature-oriented structure used by the supplied Onomis reference, but it is a fallback—not a migration target.

## Decision order

Use locations in this order:

1. repository instructions;
2. the existing folder and import conventions;
3. the nearest comparable implementation;
4. the narrowest real owner of the new code;
5. this fallback only when the preceding evidence is absent or genuinely undecided.

Never create empty folders to match the diagram. A responsibility earns a folder only when code for that responsibility exists.

## Fallback source map

```text
src/
  app/                 application bootstrap and global policy
    authorization/
    bootstrap/
    config/
    http/              shared transport boundary
    layouts/
    providers/
    query/
    router/
    session/
    shell/
  components/
    ui/                business-neutral primitives and compound controls
    shared/            proven cross-feature compositions
  features/
    <domain>/          removable domain capability and its private modules
  pages/
    <area>/            route-specific screen composition
  hooks/               domain-independent reusable hooks
  lib/                 domain-independent pure utilities
  tokens/              shared behavior, size, motion, and option tokens
  types/               global declarations and truly cross-cutting contracts
  mocks/               development API handlers and deterministic fixtures
  assets/
    styles/            application-wide theme/base/integration styles
```

Use `app` for application-wide infrastructure and policy, not ordinary feature code. Examples include bootstrap, providers, router construction, authentication/session boundaries, the shared HTTP client, query defaults, layouts, and the global shell.

Use `pages` for routed screen composition. A page names the major workspaces and route-owned overlays, connects route parameters, and wires feature boundaries. Keep the page readable as a screen outline.

Use `features/<domain>` for business capability ownership. Keep domain components, forms, hooks, queries, mappings, and state together until cross-feature reuse is proven.

Use `components/ui` for business-neutral primitives. These components own their visual and accessibility contract but do not know routes, endpoints, storage, or domain rules.

Use `components/shared` only for stable compositions consumed by multiple unrelated features. “Might be reused” is not enough.

Use root `hooks` and `lib` only for domain-independent contracts. Feature-specific hooks and helpers remain inside their feature.

## Grow a feature only as needed

A small feature can remain shallow:

```text
features/billing/
  BillingSummary.tsx
  billingTypes.ts
```

Add technical subfolders only when each group has a real responsibility:

```text
features/billing/
  api/                 named transport operations when a service layer helps
  components/          feature-owned visual compositions
  form/                schemas, defaults, mappers, and form components
  hooks/               cohesive feature behavior
  lib/                 domain calculations and transformations
  queries/             query keys, options, mutations, and invalidation
  store/               justified feature-local shared client state
  BillingFeature.tsx   feature-level composition when needed
  billingTypes.ts
  public.ts            deliberate external feature API only when needed
```

Do not add every subfolder by default. Do not create a folder plus barrel for one private file. Use a public barrel only when consumers need a stable feature or component-family boundary.

## Page decomposition

A routed page should normally contain:

- route parameters and route-level permissions;
- the high-level layout of named sections;
- composition of feature workspaces;
- route-owned dialogs or drawers when no narrower owner exists.

Move these concerns out when they become substantial:

- query keys, endpoint calls, cache invalidation, and response adaptation;
- table column factories, filter parsing, pagination helpers, and export logic;
- form schemas, defaults, field arrays, value conversion, and submit mutations;
- chart options, series derivation, and metric calculations;
- complex overlay lifecycles;
- repeated options, status maps, formatting rules, or design tokens;
- independently testable calculations and state machines.

Prefer a handful of meaningful section components over dozens of wrappers. A component boundary should make ownership clearer, not merely move JSX to another filename.

## Complex component decomposition

For a control such as a range slider, separate responsibilities only when they are meaningful:

```text
components/ui/RangeSlider/
  RangeSlider.tsx           public composition and semantics
  useRangeSlider.ts         pointer/keyboard/control behavior when substantial
  rangeSliderMath.ts        clamping, normalization, collision, percentages
  RangeSliderTrack.tsx      meaningful visual subpart when independently complex
  RangeSliderThumb.tsx      meaningful visual subpart when independently complex
  types.ts                  shared family types when more than local props
  index.ts                  intentional public component-family API
```

A simple slider does not need all of these files. Start cohesive and extract when behavior, testability, or change ownership warrants it. Keep pure math free of React so it can be tested directly. Keep accessibility semantics and the public controlled/uncontrolled contract in the owning component or hook.

## Dependency direction

Use this direction unless the established project defines a compatible equivalent:

```text
app/router/pages/features
  -> shared compositions
    -> UI primitives
      -> domain-independent hooks/lib/tokens
```

Feature-to-feature imports go through a deliberate public contract when truly necessary. UI primitives never import features or pages. Shared compositions do not depend on one page's private modules. Avoid circular imports and convenience re-exports that erase ownership.

## Code splitting

- Lazy-load route pages through the existing router convention.
- Split genuinely heavy optional capabilities near their owner.
- Keep frequently co-used small components together in the same route chunk.
- Do not move state or data ownership merely to create a chunk boundary.
- Do not add bundler configuration until ordinary route/component dynamic imports are insufficient and measurements justify it.

## Project-fit checklist

- No existing top-level source folder was renamed or duplicated.
- New files follow current naming, alias, export, and test conventions.
- The page reads as a composition rather than a complete implementation dump.
- Stateful behavior, pure calculations, remote data, forms, and tokens have clear owners.
- Existing primitives and packages were reused before adding equivalents.
- New abstractions are justified by responsibility, reuse, or testability—not line count alone.
- Route/heavy-feature code splitting follows the existing runtime.
- No unrelated refactor was performed merely because this skill was active.
