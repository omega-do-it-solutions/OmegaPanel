# Contributing to Omega Panel

Thank you for improving Omega Panel. Contributions should strengthen one unified dashboard workflow; do not split worldwide readiness into a separate skill or optional package.

## Development principles

- Add guidance only when it changes an agent's decisions or the quality of its output.
- Keep `SKILL.md` focused on the essential workflow and route conditional detail to a relevant reference.
- Preserve framework neutrality in the core skill. Framework-specific material belongs in a clearly labeled example.
- Treat accessibility and worldwide readiness as design and implementation requirements, not final polish.
- Prefer observable acceptance criteria over stylistic rules.
- Keep examples realistic, internally consistent, and explicit about assumptions.

## Making a change

1. Open an issue or describe the user problem, affected workflow, and intended outcome.
2. Update the smallest appropriate file. Add a reference only when the detail is conditional or substantial.
3. Update at least one realistic evaluation prompt when behavior should change.
4. Run the repository validator:

   ```bash
   node scripts/validate-repository.mjs
   ```

   When working inside Codex's skill-development environment, also run its bundled `quick_validate.py` against `skills/omega-panel`.

5. Score the affected evaluation scenario with `evals/rubric.md`. Record evidence rather than awarding points from keyword presence.
6. Verify links and scan for unfinished placeholders outside intentional templates.
7. Add a changelog entry under `Unreleased` for user-visible changes.

## Example format

Each worked example should include:

- a brief with outcome, users, data, constraints, worldwide context, and non-goals;
- a plan that follows the unified output contract;
- desktop and mobile behavior;
- loading, empty, error, stale, and permission states;
- accessibility and localization acceptance criteria;
- implementation notes and, when useful, a small code sketch.

Do not include secrets, production data, or personal information in examples or evaluations.

## Versioning

This project uses semantic versioning for the skill package:

- patch: clarification or correction without a contract change;
- minor: backward-compatible workflow, reference, template, or example capability;
- major: incompatible input/output contract or package-structure change.

## Pull-request checklist

- [ ] The change solves a concrete dashboard-agent problem.
- [ ] The skill remains independently usable from `skills/omega-panel`.
- [ ] Internationalization remains embedded in intake, design, implementation, and review.
- [ ] Relevant examples, prompts, checks, and evaluations are updated.
- [ ] The skill validator passes.
- [ ] Cross-agent installation documentation remains accurate for Codex, Claude Code, Cursor, and the shared Agent Skills format.
- [ ] New scripts or code examples were executed or type-checked when feasible.
- [ ] Documentation and changelog are current.

By contributing, you agree that your contribution is licensed under the MIT License.
