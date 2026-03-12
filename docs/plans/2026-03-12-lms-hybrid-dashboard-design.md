# LMS Hybrid Dashboard Design

## Context

The current `/lms` route is a sales page for LMS development services, not a product UI. It still uses the older dark, neon-heavy visual language, includes a global back helper, and relies on a 3D architecture visual plus terminal-style CTA. The Stitch `LMS Dashboard` export provides a better structural reference: a calm, institutional product interface with clear hierarchy, a side module rail, progress indicators, and a lesson-centric content layout.

The redesign should not turn `/lms` into a literal in-app dashboard. Instead, it should become a hybrid page: a marketing page that uses a product-style dashboard showcase to make Finnitrex's LMS capability feel concrete and credible.

## Goals

- Keep `/lms` as a service and conversion page for custom LMS development.
- Use the Stitch dashboard as the core visual and structural reference.
- Present the page as a hybrid marketing + product-demo experience.
- Preserve the current LMS-specific selling points: scale, SCORM/xAPI, LTI, migration, HRIS/ERP integration, and streaming.
- Keep the existing FAQ content and `/start` conversion path.
- Align the route with the light-first shared shell and optional dark mode.
- Remove the old back-link and neon-heavy presentation.

## Non-Goals

- Do not turn `/lms` into a functioning LMS application.
- Do not paste the Stitch HTML directly into production.
- Do not reuse the Stitch sample copy, which is currently robotics-themed.
- Do not preserve the old 3D hero aesthetic unless it is substantially reframed.

## Reference Use

- Primary structural reference: `doc/stitch-project-8494162079052148458/lms-dashboard.html`
- Screenshot reference: `doc/stitch-project-8494162079052148458/lms-dashboard.png`

The dashboard export should inform layout, hierarchy, surface treatment, and product-UI rhythm. Its sample content should be ignored in favor of Finnitrex LMS messaging.

## Page Role

The page should lead as a premium LMS development offering. The Stitch-inspired dashboard becomes the proof artifact that helps visitors understand what Finnitrex can build. The user should leave with two impressions:

1. Finnitrex can design complex education platforms with institutional clarity.
2. Finnitrex can deliver the backend architecture behind that experience at scale.

## Content Mapping

### Hero

The current broad “Complex Systems / Flawless Execution” hero should be replaced with a lighter editorial hero focused on custom LMS platforms. It should introduce the page as an institutional-grade education technology offering rather than a general full-stack page.

### Dashboard Showcase

The Stitch dashboard structure should be adapted into a showcase section inside `/lms`:

- top navigation references stay part of the shared site shell, not the in-page module system
- the left-side rail becomes an example course/module navigator
- the main viewport becomes the hero product demo area
- syllabus, progress, lesson metadata, and support cards become proof-oriented product UI blocks

This section should feel believable as an LMS interface while still reading as a guided product demo inside a marketing page.

### Architecture Proof

The current capabilities and FAQ content should be reorganized into calmer architecture proof blocks:

- concurrent user scale
- SCORM/xAPI and LTI readiness
- migration and ETL capability
- HRIS/ERP and API integration
- adaptive streaming and secure delivery

These points should sit below or around the dashboard section, reinforcing the system design claims.

### Conversion

The terminal-style CTA should be redesigned into a clean, premium lead-capture component while preserving the existing behavior that pre-fills the `/start` flow.

## Component Direction

### `app/lms/page.js`

This route should be fully recomposed around:

- editorial hero
- Stitch-inspired LMS dashboard showcase
- architecture proof/capability sections
- FAQ section
- redesigned CTA block

### `components/LMSStructure.jsx`

This component should not remain the hero centerpiece. It is visually tied to the old neon system and currently contains a lint issue due to `Math.random()` during render. The recommended path is to remove it from the primary page flow. If retained at all, it should appear as a small secondary visual rather than the core proof element.

### `components/ContactTerminal.jsx`

This should be redesigned into a calmer, light-first conversion block that matches the new shell and page system. Its form behavior and sessionStorage handoff should stay intact.

### `components/FAQSection.tsx`

This component should stay functional, but if its current styling clashes with the new page language, it should receive the minimal visual update needed to fit the route.

## Visual Direction

- light-first, institutional, composed
- restrained green accent usage
- strong typography and layout hierarchy
- subtle product UI surfaces instead of glow-led cards
- no global back helper
- optional dark mode should still render cleanly, but the route should clearly be designed from the light theme outward

## Acceptance Criteria

- `/lms` reads as a service page with a strong product demo center
- the Stitch dashboard layout clearly informs the page structure
- the current LMS-specific sales content is preserved and better organized
- `LMSStructure` is no longer the dominant hero visual
- the CTA matches the new shared design system
- the route works inside the redesigned shell with optional dark mode
- touched files are lint-clean even if unrelated repo-wide lint issues remain
