# Evaluation prompt: SaaS workspace management

Design a workspace dashboard for a B2B collaboration product. Workspace owners need adoption, seats, billing, and security health. Billing admins need seats/plan/invoices but no security controls. Product admins need adoption/team detail but no billing amounts or plan changes.

Data includes assigned/purchased seats, invitations, weekly activity, activation, feature adoption, team onboarding stage, subscription currency, renewal date, invoices, payment state, and security checks. Launch locales are English, Spanish, Japanese, and Arabic, with more later. Currency belongs to the subscription; renewal is a billing date in the subscription business zone. Cover desktop/tablet/mobile plus trial, no activity, analytics delay, hidden billing, overdue payment, seat limit, invite results, plan conflict, and locale fallback. Do not design checkout or full settings.
