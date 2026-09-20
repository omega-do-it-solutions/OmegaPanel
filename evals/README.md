# Dashboard Craft evaluation suite

The suite checks whether the skill produces repeatable, implementation-ready dashboard guidance rather than generic UI advice.

## Run an evaluation

1. Start with a clean agent conversation and make the repository available.
2. Give the agent one prompt from `prompts/` and explicitly invoke the skill if the environment does not auto-select it: `$dashboard-craft` in Codex or `/dashboard-craft` in Claude Code and Cursor.
3. Save the complete response. Do not supply the rubric during generation.
4. Have a reviewer score observable evidence with `rubric.md`. Record missing evidence as zero; do not award points for merely naming a topic.
5. A second reviewer resolves any category disagreement greater than two points.
6. Record the score, critical failures, reviewer notes, skill revision, and date.

The three repository worked examples are the v0.1 reference outputs for these prompts. They are not golden wording. Alternative outputs pass when they satisfy the contract and rubric with internally consistent decisions.

## Pass rule

- At least **80/100** overall.
- No critical failure.
- At least **10/14** for Accessibility.
- At least **16/20** for Worldwide readiness.
- At least **8/12** for Implementation consistency.

These floors prevent a visually polished but inaccessible or locale-fragile plan from passing.

## Evaluation record shape

```yaml
scenario: analytics
skill_version: 0.1.0
date: 2026-09-20
reviewer: reviewer-id
score: 0
category_scores: {}
critical_failures: []
evidence: []
notes: ""
```
