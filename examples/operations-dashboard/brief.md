# Brief: multilingual order-exception operations dashboard

## Product and outcome

A marketplace operations team needs to monitor orders that are late, payment-blocked, address-invalid, or awaiting a carrier response, then assign and resolve the highest-risk cases before service-level deadlines.

## Users and permissions

- Global operations lead: all regions, queues, assignments, and aggregate performance.
- Regional agent: assigned markets and queues; can reassign and resolve permitted cases.
- Support observer: read-only case status without payment-risk details or bulk actions.

## Data and workflow

- Near-real-time exception events, order/customer identifiers, reason, severity, owner, market, promised timestamp, remaining SLA, last update, and permitted actions.
- The queue may update while an agent is reviewing it. Concurrent assignments and resolutions are possible.
- Primary actions: claim, reassign, open case, retry carrier check, mark resolved, and bulk assign.
- Markets use different carrier calendars, time zones, languages, address formats, and measurement units.

## Worldwide and experience constraints

- Launch in English, French, Arabic, and Hindi; user/customer content can use any writing direction.
- SLA calculations use the fulfillment center's named time zone and calendar; the viewer may be elsewhere.
- Desktop is primary, but on-call leads triage from a phone.
- Keyboard speed, readable density, live-update stability, and WCAG 2.2 AA are essential.

## Required states and non-goals

Cover initial load, live refresh, paused updates, empty/filtered empty, stale stream, partial carrier outage, optimistic claim, assignment conflict, forbidden action, redacted payment reason, and bulk-action partial failure. The dashboard does not edit orders, customer addresses, or payment instruments.
