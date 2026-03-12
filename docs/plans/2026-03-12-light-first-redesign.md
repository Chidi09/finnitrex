# Light-First Stitch-Aligned Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the public-facing Finnitrex experience to be light-first, Stitch-aligned, and less neon-heavy while preserving existing routes, branding, and content.

**Architecture:** Keep the App Router structure and existing content sources, but move the visual system to shared theme tokens and reusable page primitives. Redesign the shared shell first, then rebuild the Home, Works, About, and Robotics pages around the Stitch references so the result feels like one coherent product.

**Tech Stack:** Next.js App Router, React 19, TypeScript/JavaScript mixed pages, Tailwind CSS v4, Framer Motion, Lucide React

---

## Planning Notes

- This repo does not currently include a dedicated component or browser test runner.
- For this redesign, use `pnpm lint`, `pnpm build`, and route-by-route manual QA as the verification baseline instead of adding new test tooling.
- Do not reintroduce the global back-button pattern during refactors.
- Use the exported Stitch files in `doc/stitch-project-8494162079052148458/` as visual references, not production source.

### Task 1: Create the shared light-first theme foundation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Capture the current failing baseline**

Run: `pnpm lint`

Expected: existing code passes or reports only pre-existing issues. Record the baseline before making design changes.

**Step 2: Replace hardcoded dark root tokens with theme tokens**

- Define a fuller token set in `app/globals.css` for light and dark themes: page background, elevated surface, card surface, text, muted text, border, accent, accent-contrast, and selection.
- Make light mode the default in `:root`.
- Add dark theme token overrides via a root class or data attribute.

**Step 3: Update the root shell to consume the new tokens**

- Remove hardcoded `bg-black text-white` styling from `app/layout.tsx`.
- Update `<meta name="theme-color">` to reflect the light-first default.
- Ensure the body uses token-backed colors and a neutral selection state.

**Step 4: Verify the theme foundation**

Run: `pnpm lint`

Expected: PASS.

### Task 2: Add optional dark mode and remove the global back-button pattern

**Files:**
- Create: `components/ThemeToggle.tsx`
- Modify: `components/Navbar.tsx`
- Modify: `app/layout.tsx`

**Step 1: Confirm current broken behavior against the approved design**

- Read `components/Navbar.tsx` and confirm it still uses `router.back()` and `ArrowLeft` as a shared global control.
- Treat that as the behavior to remove.

**Step 2: Implement theme persistence**

- Add a small client-side theme toggle component that switches between default light mode and optional dark mode.
- Persist the selection in `localStorage`.
- Apply the theme before or at hydration in a way that avoids obvious flash where practical.

**Step 3: Refactor the navbar**

- Remove `useRouter`, `ArrowLeft`, and the shared back-button UI.
- Keep the logo, main route links, CTA, and mobile menu.
- Add the theme toggle to the navbar in both desktop and mobile patterns.
- Restyle the navbar for the new light-first system.

**Step 4: Verify navigation and theme behavior**

Run: `pnpm lint`

Expected: PASS.

Manual QA:
- Home loads in light mode by default.
- Theme toggle changes the shell theme.
- Theme choice persists after refresh.
- No public page shows a global back button.

### Task 3: Redesign shared shell components

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.jsx`
- Modify: `components/MobileDock.jsx`
- Modify: `app/layout.tsx`

**Step 1: Refine the top-level component styles**

- Update navbar surfaces, borders, active states, and CTA styling to match the Stitch-inspired light system.
- Rework footer layout, spacing, and color usage so it reads as an enterprise footer rather than a neon terminal block.
- Make sure the mobile dock does not feel visually disconnected from the new shell.

**Step 2: Normalize shared visual primitives inside these components**

- Use consistent accent treatment for active nav links, footer links, and CTA buttons.
- Reduce decorative backgrounds and glows.
- Keep mobile and desktop treatments consistent.

**Step 3: Verify shell cohesion**

Run: `pnpm lint`

Expected: PASS.

Manual QA:
- Shell feels coherent in both light and dark themes.
- Footer remains readable and balanced on mobile.
- Navigation remains usable without the removed back button.

### Task 4: Rebuild the Home page around the Stitch landing reference

**Files:**
- Modify: `app/page.tsx`
- Review: `doc/stitch-project-8494162079052148458/landing-page-revamp.html`
- Review: `doc/stitch-project-8494162079052148458/landing-page-revamp.png`

**Step 1: Remove glow-led hero styling**

- Replace the black/neon hero with a lighter, calmer hero structure.
- Keep Finnitrex brand messaging, but rebuild the hierarchy around typography and spacing.
- Reassess whether `NeuralNetwork3D` should remain visible by default, be toned down, or be removed from the hero.

**Step 2: Rework supporting sections**

- Redesign capabilities, tech stack, and works preview sections to align with the exported Stitch landing page rhythm.
- Replace glow-based hover effects with cleaner borders, subtle lifts, and surface changes.
- Keep current data-driven project preview behavior intact.

**Step 3: Verify the page**

Run: `pnpm lint`

Expected: PASS.

Manual QA:
- Home reads clearly in light mode.
- Accent green is controlled and not dominant.
- Hero, cards, and CTA bands match the approved direction.

### Task 5: Rebuild the Works page around the Stitch portfolio reference

**Files:**
- Modify: `app/works/page.tsx`
- Review: `doc/stitch-project-8494162079052148458/portfolio-revamp.html`
- Review: `doc/stitch-project-8494162079052148458/portfolio-revamp.png`

**Step 1: Redesign the archive structure**

- Keep the existing project data flow from `@/lib/content/projects`.
- Shift the page from a neon showcase to a refined portfolio archive.
- Reframe featured and non-featured cards with lighter surfaces and clearer hierarchy.

**Step 2: Simplify category and hover treatments**

- Remove the gradient glow overlays tied to category styles.
- Keep category differentiation through border, label, and accent color.
- Make screenshots feel editorial and integrated into the card layout.

**Step 3: Verify the page**

Run: `pnpm lint`

Expected: PASS.

Manual QA:
- Featured and secondary project cards feel like one system.
- Screenshots, chips, and CTA links are readable in both themes.
- No hover state relies on neon glow.

### Task 6: Rebuild the About page around the Stitch about reference

**Files:**
- Modify: `app/about/page.js`
- Review: `doc/stitch-project-8494162079052148458/about-page-revamp.html`
- Review: `doc/stitch-project-8494162079052148458/about-page-revamp.png`

**Step 1: Remove the page-level back link and dark control-room framing**

- Delete the current "Return to Hub" treatment.
- Rebuild the page to feel narrative, credible, and spacious.

**Step 2: Recompose the content blocks**

- Keep the company profile, location, mission, talent, compliance, and capabilities content.
- Present it using calmer sections, cards, and stat/credibility treatments inspired by the Stitch about reference.
- Reevaluate whether `TalentGlobe` remains useful or needs toning down/reframing.

**Step 3: Verify the page**

Run: `pnpm lint`

Expected: PASS.

Manual QA:
- About reads as a company credibility page, not a dark tech dashboard.
- There is no page-specific back helper.
- Typography and spacing carry the design more than effects.

### Task 7: Rebuild the Robotics page around the Stitch lab reference

**Files:**
- Modify: `app/robotics/page.js`
- Review: `doc/stitch-project-8494162079052148458/robotics-lab-revamp.html`
- Review: `doc/stitch-project-8494162079052148458/robotics-lab-revamp.png`

**Step 1: Remove the page-level back link and heavy black-box styling**

- Delete the current "Back to Hub" treatment.
- Replace the dark split layout with a lighter lab/research presentation.

**Step 2: Reframe the interactive visual**

- Decide whether `ProceduralArm` stays as a subdued supporting visual or becomes a secondary section element.
- Keep the industries and R&D narrative, but present them through calmer cards and structured sections.

**Step 3: Verify the page**

Run: `pnpm lint`

Expected: PASS.

Manual QA:
- Robotics still feels advanced, but not neon-heavy.
- The page aligns with the Stitch lab reference.
- Content remains clear on mobile.

### Task 8: Final responsive and production verification

**Files:**
- Review: `app/layout.tsx`
- Review: `app/page.tsx`
- Review: `app/works/page.tsx`
- Review: `app/about/page.js`
- Review: `app/robotics/page.js`
- Review: `components/Navbar.tsx`
- Review: `components/Footer.jsx`
- Review: `components/MobileDock.jsx`

**Step 1: Run full automated verification**

Run: `pnpm lint && pnpm build`

Expected: full PASS.

**Step 2: Run final manual QA on target routes**

Check:
- `/`
- `/works`
- `/about`
- `/robotics`

Manual checklist:
- Light mode is the default everywhere.
- Dark mode is optional and visually calmer than the previous design.
- The shell, pages, and shared components feel like one system.
- The global back button is fully removed.
- Glow is restrained and no longer the primary visual device.
- Desktop and mobile layouts both read cleanly.

**Step 3: Prepare commit**

Run: `git status`

Expected: only intended redesign files are changed.
