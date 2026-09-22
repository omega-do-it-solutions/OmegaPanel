# Initial application loader

Read this reference when a dashboard needs one branded loading surface from static HTML startup through its first usable route. This is the boot loader for the whole application, not a later route fallback, table skeleton, background-refresh indicator, or button spinner.

## Lifecycle contract

Render the boot loader in the static HTML shell so it appears before the JavaScript bundle, framework runtime, authentication bootstrap, feature chunks, or mock/service worker is ready. Keep it outside the framework root and mark the application root `aria-busy="true"` and `inert` while the overlay owns the screen.

Do not remove the overlay merely because the root provider tree mounted. Keep it as the only visible startup surface while required bootstrap work, authentication/session restoration, render-time redirects, and the initial lazy route resolve. Remove it from a controller that commits with the final usable initial route, then clear `aria-busy` and `inert` from the application root.

Do not remove the loader when the bundle merely starts executing or when an intermediate provider/guard tree commits. Do not use a timer as proof that the application is ready, and do not add an artificial minimum display duration. If startup is fast, the loader may appear only briefly.

Use this sequence:

```text
HTML parsed → boot loader visible → bootstrap dependencies initialize
→ session/auth state resolves → startup redirects settle → initial lazy route commits
→ route-ready controller removes loader and activates the application root
```

If optional bootstrap infrastructure fails, prefer mounting the application with its normal error states rather than leaving an endless loader. For a truly fatal bootstrap failure, replace the loader status with a concise failure message and recovery action or reload guidance.

## Visual contract

- Fill the viewport with the application canvas color and center one compact brand lockup.
- Use the actual product logo/wordmark, not a generic spinner, third-party logo, or unrelated reference brand.
- Place one small indeterminate heartbeat indicator below the logo. Use three 12 px circular dots, a 0.6 s alternating beat that moves each dot upward by about 0.37 rem while fading toward 10% opacity, and 0.2 s/0.4 s delays on the second and third dots. Keep the dots in the loader’s current foreground/accent color.
- Keep the composition calm: no dashboard skeleton, marketing copy, percentage, progress bar, or multiple animations unless startup has real measurable stages.
- Reserve exact logo and indicator dimensions so nothing shifts while assets load. Prefer a small inline SVG or other immediately available asset; do not make the loader depend on the main JavaScript/CSS bundle.
- Use light/dark canvas, ink, muted, and primary tokens that match the application. Resolve the persisted/system theme in a tiny head script before the loader paints to prevent a light-theme flash in dark mode.
- Keep the loader above the application while booting. Remove its DOM node after mount rather than leaving a hidden overlay that can intercept focus or pointer input.

The screenshot-inspired baseline is a mostly empty viewport, centered wordmark, and a three-dot heartbeat beneath it. Adapt its branding and colors to the current product instead of copying the reference logo.

## Accessibility and motion

- Give the loader one `role="status"` with a concise accessible label such as “Loading Northstar MCN”. Do not expose each animated dot to assistive technology.
- Use `aria-live="polite"`; avoid repeated announcements as dots animate.
- The logo may be decorative inside the labeled status. If it carries the only product name, include that name in the status label.
- Under `prefers-reduced-motion: reduce`, stop the pulse animation and show a static three-dot state with clear contrast.
- Do not make the boot loader focusable. The first application screen owns focus after mount.
- Preserve a solid background and usable contrast in forced-colors mode.

## Framework integration

Keep the behavior framework-neutral:

- **React:** place loader markup beside `#root`; use `Suspense`/router fallbacks that render nothing while the static overlay is present, return `null` from unresolved startup guards, and remove the overlay from an effect that commits with the final initial route after session restoration and redirects.
- **Vue:** place loader markup beside the mount target and remove it from the resolved initial route view after required guards and async components finish, not from the root component's first `onMounted` alone.
- **Svelte:** place it beside the target and remove it after startup session work and the initial route component are ready, not merely from the root `onMount`.
- **SolidJS:** keep it through required resource/route resolution and remove it from the committed initial route boundary.
- **Angular:** keep it outside the bootstrapped root and remove it after initial navigation and required guards/resolvers complete.

Do not duplicate the boot loader as a framework spinner or router lazy-route fallback. While startup is unresolved, the static overlay remains the fallback. After it has been removed, later route transitions use contextual navigation progress or page/region skeletons rather than recreating a full-screen boot loader.

## Acceptance checks

- The loader is present in raw static HTML before framework code runs.
- It remains the only visible startup surface through required bootstrap, session restoration, startup redirects, and the committed initial lazy route.
- The application root stays busy/inert until overlay dismissal, then those attributes and the overlay node are removed together.
- No framework-level default spinner or second loading screen appears between static startup and the usable initial route.
- The real product brand and theme tokens are used in both light and dark modes without a theme flash.
- The indicator has a reduced-motion fallback and produces only one polite loading announcement.
- The heartbeat uses three 12 px dots with a 0.6 s sequential upward/fade beat and a static reduced-motion fallback.
- No artificial delay, stale hidden overlay, scroll jump, focus capture, or layout shift remains after removal.
- Bootstrap failure cannot strand users indefinitely on an unexplained animation.
