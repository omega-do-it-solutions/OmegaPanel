# Brief: SaaS workspace adoption and plan-management dashboard

## Product and outcome

A B2B collaboration product needs a workspace dashboard that helps owners understand adoption, find teams that need onboarding help, manage seats and billing risk, and control high-impact workspace settings.

## Users and permissions

- Workspace owner: adoption, seats, plan, invoices, security status, and settings.
- Billing admin: seats, plan, invoices, and payment status; no security configuration.
- Product admin: adoption and team details; no billing amounts or plan changes.

## Data and workflow

- Licensed, assigned, invited, and active seats.
- Weekly active members, activation rate, feature adoption, team activity, and onboarding stage.
- Plan, renewal date, billing interval, invoices, payment status, and amount/currency.
- Security/configuration checks such as SSO enforcement and domain verification.
- Actions: invite, open team, manage seats, update payment method, compare plan, review security setting.

## Worldwide and experience constraints

- Global product with unknown future locale set; launch locales are English, Spanish, Japanese, and Arabic.
- Billing currency belongs to the subscription and must not be inferred from locale.
- Renewal is a billing date in the subscription's business zone, not a viewer-local instant.
- Desktop and tablet are common; owners use mobile for health checks.
- WCAG 2.2 AA baseline. Framework is not prescribed.

## Required states and non-goals

Cover trial/new workspace, no activity, no billing permission, overdue payment, partial analytics delay, seat-limit reached, invitation success/failure, plan-change conflict, and unsupported locale fallback. Do not implement payment entry, a plan checkout flow, or a full settings application.
