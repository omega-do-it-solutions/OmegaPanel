# v0.1 baseline evaluation

Date: 2026-09-20
Skill version: 0.1.0
Method: manual evidence review of each worked plan against `rubric.md`. Scores are a release baseline, not a claim of independent model performance.

| Category | Max | Analytics | Operations | SaaS |
| --- | ---: | ---: | ---: | ---: |
| Decision clarity | 12 | 12 | 11 | 11 |
| Data and visualization integrity | 14 | 14 | 12 | 12 |
| Information architecture and usability | 12 | 12 | 12 | 11 |
| State and permission completeness | 10 | 10 | 10 | 10 |
| Responsive behavior | 10 | 10 | 10 | 10 |
| Accessibility | 14 | 14 | 14 | 13 |
| Worldwide readiness | 20 | 20 | 20 | 20 |
| Implementation consistency | 8 | 8 | 8 | 8 |
| **Total** | **100** | **100** | **97** | **95** |

All three reference outputs exceed the 80-point threshold, clear the accessibility/worldwide-readiness floors, and have no critical failure.

## Evidence notes

### Analytics

- Complete metric table, visual encoding, comparison, time-zone/currency model, chart alternatives, and React/TypeScript/Tailwind boundary.
- Explicit desktop/intermediate/mobile, partial-data, role, export, locale-switch, accessibility, bidi, pseudo-locale, currency, and DST behavior.

### Operations

- Strong real-time update buffering, concurrency, SLA-zone ownership, bulk partial-failure, role/redaction, keyboard/focus, bidi user data, and mobile route behavior.
- Two points withheld from data/visualization because the brief needs product data owners to define more aggregate trend/history metrics; one decision-clarity point withheld for the unresolved observer-name policy.

### SaaS

- Strong role-tailored information architecture, billing-date/currency semantics, state matrix, locale behavior, accessibility, and server-tailored permission model.
- Points withheld because activation is still an assumption, table/filter mechanics are less detailed than the other examples, and final chart data alternatives/manual test coverage require product confirmation.

## Release interpretation

The baseline proves the written v0.1 examples satisfy the published contract. A later behavioral release should run blind agent generations with multiple reviewers and record variance, failure patterns, and revisions rather than treating these authored examples as sufficient regression coverage.
