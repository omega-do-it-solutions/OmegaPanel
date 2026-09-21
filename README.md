<p align="center">
  <img src="skills/dashboard-craft/assets/dashcraft-logo.png" alt="DashCraft logo" width="176" height="176">
</p>

<h1 align="center">DashCraft</h1>

<p align="center">
  Portable Agent Skills for production dashboard craft and project-fitting code quality.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2563EB.svg" alt="MIT license"></a>
</p>

DashCraft packages dashboard information architecture, application shells, tables, filters, forms, charts, responsive behavior, accessibility, and worldwide readiness into a reusable workflow. Its companion `code-quality` skill keeps new implementation work cohesive without authorizing unsolicited refactors or forcing one folder structure onto established projects. Both follow the portable `SKILL.md` Agent Skills format for Codex, Claude Code, Cursor, and other compatible coding agents.

## Install

Install from GitHub with the cross-agent [`skills` CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add omega-do-it-solutions/DashCraft --skill dashboard-craft
```

Install the code-quality companion independently when a project needs implementation-boundary guidance without the dashboard workflow:

```bash
npx skills add omega-do-it-solutions/DashCraft --skill code-quality
```

The installer detects supported agents and lets you choose the destination. The default project installation is best for teams because the installed skill can be committed with the application.

If this GitHub repository is private, the user must have repository access and authenticated Git credentials (or a `GITHUB_TOKEN` available in their environment). If the repository is made public, the same command works without authentication and can also be listed on [skills.sh](https://skills.sh/).

Install globally for use across projects:

```bash
npx skills add omega-do-it-solutions/DashCraft \
  --skill dashboard-craft \
  --global
```

Install non-interactively for Codex, Claude Code, and Cursor:

```bash
npx skills add omega-do-it-solutions/DashCraft \
  --skill dashboard-craft \
  --global \
  --agent codex \
  --agent claude-code \
  --agent cursor \
  --yes
```

Preview or run the skill without installing it:

```bash
npx skills use omega-do-it-solutions/DashCraft \
  --skill dashboard-craft \
  --agent claude-code
```

The skill itself has no runtime dependency, API key, or framework requirement. Its package recommendations apply only when an agent is implementing a dashboard that needs those capabilities.

## Agent support

| Agent | Project location | Personal/global location | Explicit invocation |
| --- | --- | --- | --- |
| Codex | `.agents/skills/dashboard-craft/` | `~/.agents/skills/dashboard-craft/` | `$dashboard-craft` |
| Claude Code | `.claude/skills/dashboard-craft/` | `~/.claude/skills/dashboard-craft/` | `/dashboard-craft` |
| Cursor | `.agents/skills/dashboard-craft/` or `.cursor/skills/dashboard-craft/` | `~/.cursor/skills/dashboard-craft/` | `/dashboard-craft` or `@dashboard-craft` |
| Other Agent Skills clients | Usually `.agents/skills/dashboard-craft/` | Agent-specific | Agent-specific |

Each canonical skill uses only the required portable frontmatter fields, `name` and `description`. The optional `agents/openai.yaml` supplies Codex/ChatGPT presentation metadata and is safely ignored by other clients. Replace `dashboard-craft` with `code-quality` in the paths and invocation names above when using the companion skill.

- [OpenAI documentation: build and install skills](https://developers.openai.com/es-419/docs/build-skills)
- [Claude documentation: Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Cursor documentation: Agent Skills](https://cursor.com/docs/skills)

### Manual installation

If `npx` is unavailable, clone this repository and copy the complete skill directory to the agent's native project location:

```bash
git clone git@github.com:omega-do-it-solutions/DashCraft.git
cd DashCraft

# Codex, Cursor, and universal Agent Skills clients
mkdir -p /path/to/project/.agents/skills
cp -R skills/dashboard-craft /path/to/project/.agents/skills/dashboard-craft

# Claude Code
mkdir -p /path/to/project/.claude/skills
cp -R skills/dashboard-craft /path/to/project/.claude/skills/dashboard-craft
```

Copy the entire directory, not only `SKILL.md`; its references, templates, prompts, checklists, and logo are part of the package.

## Use

### Plan a dashboard

```text
$dashboard-craft Plan a worldwide revenue dashboard for finance leaders.
Cover desktop and mobile, permissions, loading and failure states,
accessibility, RTL, currencies, and reporting time zones.
```

### Implement in the current stack

```text
$dashboard-craft Implement an order-management dashboard in this repository.
Preserve the existing framework and design system. Add only the packages the
feature needs.
```

### Review an implementation

```text
$dashboard-craft Review this dashboard for information hierarchy, sidebar
behavior, tables, URL state, form validation, charts, accessibility, responsive
behavior, and internationalization. Rank findings by severity.
```

In Claude Code or Cursor, replace `$dashboard-craft` with `/dashboard-craft`. Compatible agents may also select the skill automatically when a request matches its description.

### Implement maintainable code without taking over the repository

```text
$code-quality Add this page using the project's current structure. Keep the
page readable as composition, extract meaningful components and behavior, and
do not refactor unrelated code.
```

The skill inspects the repository first, preserves established folders and conventions, and scopes quality improvements to the requested work. When a React/TypeScript project has no clear structure, it falls back to the feature-oriented `app`, `components/ui`, `components/shared`, `features`, `pages`, `hooks`, `lib`, `tokens`, and `types` model derived from the Onomis reference.

## What the skill covers

- decision-oriented information architecture and metric contracts;
- breadcrumb-led admin pages with optional stat cards and primary content, without generic eyebrow/title/description/action heroes;
- expanded, collapsed, and hover/focus-preview sidebar states;
- single-surface startup loaders that cover static boot through session restoration and the committed initial route, with theme-safe heartbeat indicators and no duplicate framework spinner;
- strict data skeletons with at least 90% layout fidelity and table-specific initial/transition behavior;
- table toolbars, filter drawers, complete-dataset client sorting with no sort requests, pagination, resizing, pinning, and URL state;
- server-backed request ownership, loading, stale, empty, error, permission, and conflict states;
- submit-first form validation followed by input revalidation;
- framework-appropriate packaged select boxes plus custom checkbox, radio, switch, and single/dual range-control rules;
- honest charts, accessible alternatives, and restrained motion;
- locale-aware messages, dates, time zones, numbers, currencies, units, fonts, RTL, search, sort, and export;
- compact global-header locale selectors for small fixed language sets, using current-code triggers, flag/name menus, accessible selected state, keyboard/typeahead behavior, persistence, and a scalable large-set fallback;
- desktop, intermediate, mobile, zoom/reflow, keyboard, screen-reader, and reduced-motion behavior.

The workflow is framework-neutral. ApexCharts, TanStack tools, TipTap, Axios, Day.js, i18next, jsVectorMap, Leaflet, Motion, Shiki, SimpleBar, Sonner, Swiper, Zod, React Hook Form, VeeValidate, React Select, Vue Multiselect, Svelte Select, Kobalte Select, ng-select, ESLint, and Prettier are a capability menu—not an install-all dependency list.

## Repository map

```text
skills/dashboard-craft/
  SKILL.md                 Portable workflow and input/output contract
  agents/openai.yaml       Optional OpenAI UI metadata
  assets/                  Installable brand assets
  references/              Detailed guidance loaded when relevant
  templates/               Intake, plan, and review structures
  checklists/              Dashboard and worldwide-readiness release gates
  prompts/                 Reusable planning and review prompts
skills/code-quality/
  SKILL.md                 Project-fit implementation and decomposition rules
  agents/openai.yaml       Optional OpenAI UI metadata
  references/              React/TypeScript fallback ownership structure
examples/                  Worked analytics, operations, and SaaS examples
evals/                     Scenarios, scoring rubric, and baseline
scripts/                   Repository validation
```

Only the skill directory selected during installation is installed. The examples and evaluation suite are maintainer resources.

## Validate

Run the dependency-free repository checks:

```bash
node scripts/validate-repository.mjs
```

The validator checks the skill entrypoint, portable frontmatter, required package files, logo, and relative Markdown links. CI runs the same command on pushes and pull requests.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow and evaluation requirements and [CHANGELOG.md](CHANGELOG.md) for release notes. DashCraft is available under the [MIT License](LICENSE).
