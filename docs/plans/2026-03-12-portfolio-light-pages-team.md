# Portfolio Consolidation, White-First Pages, and Team Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Consolidate project proof into `/works`, remove the standalone case-study destination, normalize the remaining public pages to a mostly white light-mode baseline, and add a dedicated `/team` page.

**Architecture:** Treat `/works` as the single proof hub by folding selected case-study depth into the project presentation and redirecting old case-study URLs there. Update the remaining affected public pages to use white as the dominant default surface, add a focused `/team` route, and correct shared metadata and navigation so the whole site reflects the new structure.

**Tech Stack:** Next.js App Router, React 19, TypeScript/JavaScript mixed pages, Tailwind CSS v4, Lucide React

---

## Planning Notes

- Use targeted ESLint on touched files throughout implementation.
- Run `pnpm lint` and `pnpm build` at the end and separate any repo-wide unrelated failures from this batch’s results.
- Keep redirects server-side and minimal.
- Avoid preserving any neon/terminal styling in touched routes.

### Task 1: Consolidate case-study content into the works data model

**Files:**
- Modify: `lib/content/projects.ts`
- Review: `lib/content/caseStudies.ts`

**Step 1: Capture the baseline for the target files**

Run: `pnpm exec eslint lib/content/projects.ts`

Expected: PASS or any existing issue documented before changes.

**Step 2: Add lightweight case-study-style fields to projects**

- Extend the `Project` model with only the extra fields needed to enrich `/works`.
- Reuse the valuable narrative material from `lib/content/caseStudies.ts` where it maps cleanly to existing projects.
- Do not overbuild a second public content system.

**Step 3: Keep the content model simple**

- Prefer compact fields such as challenge, delivery focus, and outcome summary.
- Avoid preserving the separate case-study content shape unless absolutely needed for mapping.

**Step 4: Verify the content model file**

Run: `pnpm exec eslint lib/content/projects.ts`

Expected: PASS.

### Task 2: Rebuild the works page as the single proof hub

**Files:**
- Modify: `app/works/page.tsx`
- Review: `lib/content/projects.ts`

**Step 1: Remove the unwanted aside**

- Delete the current delivery-signal block and its screenshot-framing copy.

**Step 2: Add richer proof framing to project sections**

- Use the new lightweight project fields to make featured and supporting projects read more like mini case studies.
- Keep the page coherent with the existing portfolio redesign.
- Remove any CTA or wording that implies a separate case-study page still exists.

**Step 3: Verify the works page**

Run: `pnpm exec eslint app/works/page.tsx lib/content/projects.ts`

Expected: PASS.

### Task 3: Redirect and clean up the case-study routes

**Files:**
- Modify: `app/case-studies/page.tsx`
- Modify: `app/case-studies/[slug]/page.tsx`
- Modify or delete if appropriate: `app/case-studies/layout.tsx`
- Modify: `app/sitemap.ts`

**Step 1: Replace content pages with redirects**

- Make `/case-studies` redirect to `/works`.
- Make `/case-studies/[slug]` redirect to `/works`.
- Remove unnecessary detail-page logic, metadata generation, and schema that only exist for the old case-study destination.

**Step 2: Clean up sitemap references**

- Remove `/case-studies` from `app/sitemap.ts`.

**Step 3: Verify redirect and sitemap files**

Run: `pnpm exec eslint app/case-studies/page.tsx app/case-studies/[slug]/page.tsx app/case-studies/layout.tsx app/sitemap.ts`

Expected: PASS.

### Task 4: Correct the home-page delivery-view block

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace the current delivery-view copy/content**

- Remove the current “Since 2020”, “Core sectors 3”, “Static-first”, and related filler framing.
- Replace it with more accurate company proof and clearer operational language.

**Step 2: Keep the visual module consistent**

- Maintain the stronger home-page structure while ensuring the panel feels concrete and credible.

**Step 3: Verify the home page file**

Run: `pnpm exec eslint app/page.tsx`

Expected: PASS.

### Task 5: Redesign the fintech page into the white-first system

**Files:**
- Modify: `app/fintech/page.js`
- Review: `components/FAQSection.tsx`

**Step 1: Remove the old black/neon shell**

- Replace the old dark dashboard framing, back helper, and neon cards with a white-first editorial structure.

**Step 2: Preserve fintech-specific content**

- Keep the core predictive analytics, compliance, risk, metrics, and FAQ content.
- Reframe the page so it matches the corrected site system rather than the legacy visual language.

**Step 3: Verify the fintech route**

Run: `pnpm exec eslint app/fintech/page.js`

Expected: PASS.

### Task 6: Redesign the start page into the white-first system

**Files:**
- Modify: `app/start/page.js`
- Review: `components/ProjectPricingWizard.jsx`

**Step 1: Rebuild the route shell**

- Replace the current black background, back helper, and terminal-like framing with a white-first shell.
- Keep the wizard component and flow intact.

**Step 2: Make the page fit the new public-site system**

- Ensure the route feels like part of the redesigned marketing experience rather than the old site aesthetic.

**Step 3: Verify the start route**

Run: `pnpm exec eslint app/start/page.js`

Expected: PASS.

### Task 7: Shift about, LMS, and robotics to a mostly white baseline

**Files:**
- Modify: `app/about/page.js`
- Modify: `app/lms/page.js`
- Modify: `app/robotics/page.js`

**Step 1: Reduce tinted surface dominance**

- Keep the current structural redesigns, but make white the dominant light-mode page background.
- Use neutral/tinted bands more sparingly as separators.

**Step 2: Preserve existing layout improvements**

- Do not restart these pages from scratch.
- Focus on surface, section, and emphasis adjustments that make the light mode read cleaner and brighter.

**Step 3: Verify the page files**

Run: `pnpm exec eslint app/about/page.js app/lms/page.js app/robotics/page.js`

Expected: PASS.

### Task 8: Add the dedicated team page and connect metadata

**Files:**
- Create: `app/team/page.tsx`
- Modify: `app/about/page.js`
- Modify as needed: `components/Navbar.tsx`
- Modify as needed: `components/Footer.jsx`
- Modify: `components/StructuredData.tsx`
- Modify: `app/sitemap.ts`

**Step 1: Create the team route**

- Build a white-first leadership page for:
  - Divine Adoyi Samuel — founder
  - Nneji Chidi Ben — lead developer
- Use concise, credible role framing rather than hype-heavy startup copy.

**Step 2: Connect the route sensibly**

- Link to the team page from About and any shared navigation/footer location that fits the current IA cleanly.

**Step 3: Update organization structured data**

- Replace placeholder founder data with real person entries aligned to the new team page.

**Step 4: Verify the team and metadata files**

Run: `pnpm exec eslint app/team/page.tsx app/about/page.js components/Navbar.tsx components/Footer.jsx components/StructuredData.tsx app/sitemap.ts`

Expected: PASS.

### Task 9: Final verification, commit, and push

**Files:**
- Review all touched files from Tasks 1-8

**Step 1: Run touched-file verification**

Run: `pnpm exec eslint app/page.tsx app/works/page.tsx app/fintech/page.js app/start/page.js app/about/page.js app/lms/page.js app/robotics/page.js app/team/page.tsx app/case-studies/page.tsx app/case-studies/[slug]/page.tsx app/case-studies/layout.tsx app/sitemap.ts lib/content/projects.ts components/Navbar.tsx components/Footer.jsx components/StructuredData.tsx`

Expected: PASS.

**Step 2: Run full repo verification**

Run: `pnpm lint && pnpm build`

Expected: report actual results and clearly separate unrelated pre-existing failures from this batch.

**Step 3: Review git state**

Run: `git status --short`

Expected: only intended files for the current fix batch plus any still-uncommitted logo fix are present.

**Step 4: Commit and push**

Run:

```bash
git add <intended files>
git commit -m "feat: consolidate portfolio proof and add team page"
git push origin HEAD
```

Expected: commit succeeds and `main` is updated on `origin`.
