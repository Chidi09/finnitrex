# Light-First Stitch-Aligned Redesign Design

## Context

Finnitrex currently presents its primary marketing pages through a dark, neon-heavy visual system. The strongest issues are a globally dark shell, repeated lime glow treatments, and a global back-button pattern that does not feel properly integrated. The Stitch exports for the landing page, portfolio, about page, and robotics lab provide a better reference: cleaner hierarchy, calmer contrast, lighter surfaces, and more credible enterprise presentation.

The redesign should correct the current visual direction without discarding the existing content model, route structure, or brand identity.

## Goals

- Make light mode the default presentation across the public site.
- Keep dark mode as an optional theme, not the baseline experience.
- Use the Stitch screens as the primary design reference for layout, spacing, hierarchy, and tone.
- Preserve Finnitrex branding, existing routes, and core content.
- Remove the global back-button pattern and rely on proper site navigation instead.
- Replace glow-led emphasis with typography, spacing, contrast, and structured surfaces.
- Redesign shared components so the system feels cohesive, not page-by-page patched.

## Non-Goals

- No content rewrite beyond minor UI copy adjustments needed for layout fit.
- No route restructuring.
- No redesign of admin or portal flows.
- No new visualization-heavy effects added to replace the removed glow.

## Reference Mapping

- `Landing Page Revamp` -> `app/page.tsx`
- `Portfolio Revamp` -> `app/works/page.tsx`
- `About Page Revamp` -> `app/about/page.js`
- `Robotics Lab Revamp` -> `app/robotics/page.js`

The Stitch exports should guide section rhythm, card treatment, spacing, and overall visual restraint. They should not be pasted in directly as final production code; the redesign should be rebuilt using the project's existing Next.js structure and content sources.

## Visual Direction

### Core Tone

The site should shift from "neon lab demo" to "refined technology studio." The pages should feel precise, modern, and premium rather than loud. The memorable quality should come from disciplined composition and strong editorial hierarchy, not bloom effects.

### Color System

- Default background should use a light neutral or soft paper tone instead of pure black.
- Text should move to dark ink/slate values for the default theme.
- Green remains the brand accent, but should be used sparingly for actions, active states, chips, stats, and selective highlights.
- Supporting neutrals should handle most of the interface weight: surfaces, borders, muted copy, dividers, and cards.
- Dark mode should reuse the same system through tokens, but with calmer contrast and reduced glow compared with the current implementation.

### Typography

- Typography should do more of the visual work than effects.
- Headlines should be bold, deliberate, and high contrast.
- Supporting copy should be calmer and more readable, with better spacing and line length.
- Labels, eyebrow text, and category chips should feel systematic, not game-like.

### Surfaces And Depth

- Use layered light surfaces, thin borders, and section bands instead of luminous black panels.
- Depth should come from spacing, contrast, and subtle elevation.
- Remove large blurred lime halos and most shadow-based glow treatments.

### Motion

- Motion should be restrained: fades, lifts, and staggered entrance timing.
- Avoid glowing hover states and dramatic bloom effects.
- Interactive 3D elements, where kept, should support the composition rather than dominate it.

## Theme Behavior

- Light mode is the default site theme.
- Dark mode is optional and user-controlled.
- Theme values should be defined through shared tokens in global styles.
- `app/layout.tsx` must stop hardcoding a black background and white text at the root shell.
- Theme state should be accessible from shared navigation and persist across route changes.

## Navigation Rules

- Remove the global back-button pattern from shared navigation.
- Do not show universal "Back" controls on interior pages.
- Main navigation should provide orientation and return paths.
- If a page ever needs a back or return action later, it should be contextual to that page, not a repeated global control.

## Shared Component Direction

### Components To Redesign

- `components/Navbar.tsx`
- `components/Footer.jsx`
- mobile navigation controls
- CTA buttons and secondary buttons
- chips, badges, and stat pills
- reusable card treatments
- screenshot/media framing around portfolio items

### Shared System Expectations

- Shared components should inherit the same light-first design language.
- Components should use consistent spacing, border radius, border color, and accent usage.
- There should be a reusable set of section, hero, card, and CTA patterns so the four redesigned pages feel like one system.

## Page-Level Direction

### Home

Home should follow the Stitch landing structure: clearer hero hierarchy, lighter surfaces, more disciplined capability sections, and a more editorial technology-stack presentation. Existing messaging can stay, but the current black/neon framing should be removed.

### Works

Works should feel like a refined archive or portfolio index rather than a neon project grid. Screenshots should read as content artifacts. Category coding should remain helpful, but without hover glows or heavy gradients.

### About

About should become more narrative and credibility-driven. The page should emphasize company profile, mission, location, and operating model with calmer layout and more breathing room.

### Robotics

Robotics should remain forward-looking, but the futurism should come from layout, typography, and selective imagery rather than a black-box laboratory aesthetic. It should align with the Stitch robotics reference while keeping the current content focus on research and development.

## Technical Approach

- Keep the existing App Router structure.
- Rebuild the affected pages and components using project-native React/Next.js components.
- Prefer shared tokens and reusable UI patterns over route-specific styling.
- Keep dynamic specialty components only where they still support the redesigned layout.
- Tone down or reframe `NeuralNetwork3D`, `TalentGlobe`, and `ProceduralArm` if they visually overpower the new system.

## Accessibility And Responsive Behavior

- Default light theme must maintain strong text contrast.
- Dark mode must preserve readability without over-saturating accent colors.
- Navigation, theme toggle, and CTA components must remain keyboard accessible.
- The redesigned hierarchy must work cleanly across mobile and desktop.
- The removal of the back button must not reduce navigational clarity.

## Acceptance Criteria

- Public-facing shell defaults to light mode.
- Optional dark mode exists and feels secondary, not primary.
- Global back button is removed.
- Home, Works, About, and Robotics visually align with the corresponding Stitch references.
- Glow-heavy styling is substantially reduced across shared components and target pages.
- Navbar and Footer match the new system.
- The redesign preserves current content and route structure.
