# Evaluation prompt: multilingual content administration

Design an authenticated admin experience for a multilingual publishing product. Editors create and revise posts with title, description, rich body, cover media, status, schedule, and revision history. English, German, and Persian content can be drafted and published independently; the administration UI can also switch among those languages. Editors frequently leave a draft open while switching sections or content languages.

The same admin area includes a media library, configurable home-page sections with reorderable cards and promises, and user accounts with invitation, active, locked, disabled, role, last-sign-in, and last-owner constraints. Distinguish first use, filtered empty, permission-limited data, load failure, and true zero. Support desktop, mobile, 200% zoom, keyboard operation, dark/light themes, and RTL.

Produce a framework-agnostic implementation plan. Make command ownership, save/dirty/error/conflict behavior, unsaved-work protection, read-only presentation, record-state-valid actions, content-locale versus UI-locale behavior, tabs/overflow, repeaters, target sizes, contrast, surface nesting, and user-facing copy explicit. Prefer spacing, separators, alignment, and restrained muted/slate grouping over nested bordered cards. Do not design public-facing pages.
