# LMS Hybrid Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign `/lms` into a light-first LMS development page that uses the Stitch dashboard as a product-style showcase while preserving Finnitrex's existing LMS sales, FAQ, and conversion content.

**Architecture:** Keep the route as a marketing page, not an application page. Rebuild `app/lms/page.js` around a native JSX dashboard-demo section, then align the supporting CTA and any needed FAQ styling with the corrected shared design system. Remove the current hero dependence on `LMSStructure` so the route feels consistent with the rest of the redesign.

**Tech Stack:** Next.js App Router, React 19, JavaScript/TypeScript mixed components, Tailwind CSS v4, Lucide React

---

## Planning Notes

- This repo does not currently include dedicated component tests for page UI.
- Use targeted ESLint checks for touched LMS files, then run `pnpm lint` and `pnpm build` as final whole-repo verification.
- Some repo-wide lint/build issues already exist outside LMS; report them separately from LMS-specific results.
- Do not commit downloaded Stitch exports unless explicitly requested.

### Task 1: Rebuild the LMS route around the hybrid dashboard structure

**Files:**
- Modify: `app/lms/page.js`
- Review: `doc/stitch-project-8494162079052148458/lms-dashboard.html`
- Review: `doc/stitch-project-8494162079052148458/lms-dashboard.png`

**Step 1: Capture the current file-level baseline**

Run: `pnpm exec eslint app/lms/page.js`

Expected: likely FAIL because the current file still uses the old structure and imports that may conflict with the new route composition.

**Step 2: Replace the old hero and back-helper structure**

- Remove the page-level back link from `app/lms/page.js`.
- Remove the old black/neon hero built around `LMSStructure`.
- Replace it with a light-first editorial hero focused on custom LMS architecture, institutional delivery, and platform scale.

**Step 3: Build the Stitch-inspired dashboard showcase natively in JSX**

- Add a dashboard-demo section with:
  - a module rail or section navigator
  - a progress indicator
  - a lesson/video/viewport panel
  - a course/module summary area
  - proof-oriented support blocks
- Use Finnitrex LMS content, not the Stitch robotics sample copy.

**Step 4: Re-map existing selling points into calmer architecture sections**

- Preserve and reorganize the route’s existing capability content:
  - scale and concurrency
  - SCORM/xAPI and LTI
  - migration and ETL
  - HRIS/ERP integrations
  - streaming and secure delivery
- Keep the route clearly focused on LMS development services.

**Step 5: Verify the route file**

Run: `pnpm exec eslint app/lms/page.js`

Expected: PASS.

### Task 2: Redesign the LMS conversion block

**Files:**
- Modify: `components/ContactTerminal.jsx`
- Review: `app/lms/page.js`

**Step 1: Capture the component baseline**

Run: `pnpm exec eslint components/ContactTerminal.jsx`

Expected: PASS or surface any existing issues before styling changes.

**Step 2: Replace the terminal aesthetic with a premium form block**

- Keep the existing fields and `sessionStorage` handoff behavior.
- Remove the faux terminal chrome, scanlines, and neon-heavy treatments.
- Rebuild the component as a clean light-first conversion panel with clear service selection and a stronger fit with the redesigned shell.

**Step 3: Verify the CTA component**

Run: `pnpm exec eslint components/ContactTerminal.jsx app/lms/page.js`

Expected: PASS.

### Task 3: Adjust supporting LMS visuals only if needed

**Files:**
- Modify if needed: `components/FAQSection.tsx`
- Modify if needed: `components/LMSStructure.jsx`

**Step 1: Check whether support components still clash**

- If `FAQSection.tsx` already fits the corrected shell, leave it unchanged.
- If its current styling clashes with the new `/lms` page, apply the smallest visual update needed.
- If `LMSStructure.jsx` is no longer used in `app/lms/page.js`, leave it untouched unless its continued presence breaks lint in touched-file verification.

**Step 2: Avoid unnecessary work**

- Do not redesign `LMSStructure.jsx` unless it is still part of the page or blocks the final LMS implementation.
- Do not introduce extra product-UI components if plain route-local JSX is sufficient.

**Step 3: Verify touched support files**

Run: `pnpm exec eslint app/lms/page.js components/ContactTerminal.jsx components/FAQSection.tsx`

Expected: PASS for the files actually touched.

### Task 4: Final LMS verification and git preparation

**Files:**
- Review: `app/lms/page.js`
- Review: `components/ContactTerminal.jsx`
- Review: `components/FAQSection.tsx`

**Step 1: Run LMS-focused verification**

Run: `pnpm exec eslint app/lms/page.js components/ContactTerminal.jsx components/FAQSection.tsx`

Expected: PASS.

**Step 2: Run full repo verification**

Run: `pnpm lint && pnpm build`

Expected: Report actual result. If repo-wide failures remain outside the LMS work, list them explicitly and separate them from LMS-specific status.

**Step 3: Review git state**

Run: `git status --short`

Expected: confirm the final LMS changes plus the earlier approved redesign changes are the only changes intended for commit.

**Step 4: Commit and push**

Run:

```bash
git add app/about/page.js app/globals.css app/layout.tsx app/lms/page.js app/page.tsx app/robotics/page.js app/works/page.tsx components/ContactTerminal.jsx components/Footer.jsx components/MobileDock.jsx components/Navbar.tsx components/ThemeToggle.tsx docs/plans/2026-03-12-light-first-redesign-design.md docs/plans/2026-03-12-light-first-redesign.md docs/plans/2026-03-12-lms-hybrid-dashboard-design.md docs/plans/2026-03-12-lms-hybrid-dashboard.md
git commit -m "feat: redesign marketing pages with light-first product demos"
git push origin HEAD
```

Expected: commit succeeds and branch is pushed to `origin`.
