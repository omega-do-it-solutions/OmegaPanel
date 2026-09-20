# Evaluation prompt: order operations

Design an operations dashboard for a global marketplace team that must resolve late, payment-blocked, address-invalid, and carrier-waiting orders before service-level deadlines. The queue updates in near real time. Agents claim, reassign, retry, resolve, and bulk-assign cases; conflicts are possible.

Roles are global lead, region-limited agent, and read-only observer. Launch languages are English, French, Arabic, and Hindi. SLA deadlines belong to each fulfillment center's named time zone and business calendar. Prioritize desktop keyboard speed but support mobile on-call triage. Cover live updates, stale/paused stream, empty states, carrier partial outage, conflict, forbidden/redacted data, and bulk partial failure. Produce a framework-agnostic implementation plan.
