# Portfolio Consolidation, White-First Pages, and Team Page Design

## Context

The public marketing experience has been redesigned toward a lighter and more editorial system, but several inconsistencies remain:

- `/works` still contains an unnecessary delivery-signal aside and does not yet absorb the useful narrative depth from the old case-study content.
- `/case-studies` and `/case-studies/[slug]` still exist as separate routes even though the preferred public proof hub is now `/works`.
- the home-page delivery-view panel reads like generic framing rather than concrete company proof.
- `/fintech` and `/start` still use the old black/neon system.
- `/about`, `/lms`, and `/robotics` are light-first, but their default appearance still leans too heavily on warm tinted surfaces instead of a mostly white baseline.
- there is no public team page yet, and structured data still contains placeholder founder information.

This batch should finish the visual consolidation by making `/works` the single proof destination, pushing the remaining public pages toward a mostly white default light mode, and adding a dedicated team page.

## Goals

- Remove the standalone case-study experience as a public content destination.
- Redirect old case-study URLs to `/works`.
- Expand `/works` so featured and supporting projects carry enough narrative depth to act like compact case studies.
- Remove the current delivery-signal aside from `/works`.
- Correct the home-page delivery-view content so it is more concrete and less self-referential.
- Redesign `/fintech` and `/start` into the corrected white-first system.
- Shift `/about`, `/lms`, and `/robotics` to a mostly white default baseline with restrained neutral section bands.
- Add a dedicated `/team` page featuring Divine Adoyi Samuel and Nneji Chidi Ben.
- Replace placeholder founder data in structured metadata with real people.

## Non-Goals

- No new case-study detail route should replace the old case-study pages.
- No large expansion into a full multi-person directory; the team page should stay focused on the two named leadership profiles.
- No return to the old neon shell or heavy visual effects.

## Content Strategy

### Works As The Proof Hub

`/works` becomes the single public destination for project proof and delivery credibility. Instead of forcing users into separate case-study detail pages, the useful challenge/solution/result material should be folded directly into the works page.

Featured projects should gain extra depth such as:

- challenge context
- delivery focus
- outcomes or evidence signals
- stronger project framing language

Supporting cards can remain more compact, but should still feel closer to mini case studies than simple portfolio tiles.

### Case-Study Route Handling

The old routes should no longer act as content destinations. Existing `/case-studies` and `/case-studies/[slug]` URLs should redirect to `/works` so historical links and search traffic still land on relevant proof.

### Team Page

A dedicated `/team` page should introduce the two named people clearly and credibly:

- Divine Adoyi Samuel — founder
- Nneji Chidi Ben — lead developer

The page should feel like a company leadership page, not a startup hype section. It should use the same white-first system as the corrected marketing site and focus on role, contribution, leadership posture, and delivery relevance.

## Visual Direction

### White-First Baseline

The default light theme should be mostly white across the affected pages. Soft editorial neutrals can still appear, but mainly as section bands, cards, or support surfaces rather than the dominant page background.

This especially applies to:

- `app/about/page.js`
- `app/lms/page.js`
- `app/robotics/page.js`
- `app/fintech/page.js`
- `app/start/page.js`

### Works Page Tone

The current extra aside on `/works` should be removed. The page should feel more confident through the project content itself rather than meta-commentary about delivery signals or screenshot treatment.

### Home Page Delivery View

The delivery-view module on the home page should read as real proof of operating style and domain focus, not generic marketing filler. It should use accurate company framing and stronger delivery language.

## Page-Level Direction

### `app/works/page.tsx`

- remove the current delivery-signal aside
- add richer project framing drawn from the case-study material where useful
- remove or rewrite CTAs that imply a separate case-study destination
- keep the page coherent with the existing light-first portfolio redesign

### `app/fintech/page.js`

- rebuild from the old black/neon shell into the corrected white-first editorial system
- preserve the fintech-specific service positioning, FAQ content, and visual proof areas, but calm the page substantially

### `app/start/page.js`

- move the start-project page out of the old black terminal-like shell
- preserve the wizard behavior and flow, but make the route visually consistent with the rest of the redesigned site

### `app/about/page.js`, `app/lms/page.js`, `app/robotics/page.js`

- keep the current structural redesigns
- reduce beige/stone dominance so white becomes the main default surface
- retain restrained accent use and optional dark mode support

### `app/team/page.*`

- create a dedicated team page
- present the founder and lead developer as the core leadership layer
- connect the page from About and/or shared navigation/footer where appropriate

## SEO And Structured Data

- remove `/case-studies` from the sitemap
- stop treating case studies as a separate public destination in metadata and schema
- update organization structured data so the founder field no longer uses placeholder company text and instead reflects the real team information

## Acceptance Criteria

- `/case-studies` and `/case-studies/[slug]` redirect to `/works`
- `/works` absorbs the useful case-study narrative and no longer shows the current delivery-signal aside
- the home-page delivery-view block is corrected and more concrete
- `/fintech` and `/start` are redesigned into the white-first system
- `/about`, `/lms`, and `/robotics` read mostly white by default
- `/team` exists with the two named people and fits the corrected design system
- structured data no longer contains fake founder placeholder text
