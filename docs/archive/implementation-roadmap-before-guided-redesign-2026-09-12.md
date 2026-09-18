# Career Compass OS — Implementation Roadmap

## Execution update — 2026-09-12

Production PWA shell caching, manifest and generated icons are implemented. Browser test covers a new offline tab with restored IndexedDB answers. Deployment and actual device installation remain pending. See `docs/phase-2.md` for scope and limitations. Studio snapshot target is now `ai-studio-for-making-digital-product/releases/career-compass-0.2.0`.

## Execution update — 2026-09-10

Stage 1 now has a working exercise → visualization → reflection flow, Dexie autosave, session hydration, JSON backup/restore, validated YAML content, and a shared npm workspace package. Six engine tests and a Chrome end-to-end test pass; lint, typecheck and production build pass. Actual module boundaries are in `docs/architecture.md`; the next tasks are in `studio/backlog.md`. The content remains explicitly labeled a prototype pending book review. PWA installation and offline cold start are still pending. Studio 0.1.0 is a real source snapshot, not merely a list of planned components.

Date: 2026-09-05

This document translates the existing Blueprint into an executable plan for a modern, offline-first, Duolingo-inspired PWA.

## Fixed product decisions

- Preserve the book's nine-stage structure.
- Every stage follows Exercise → Visualization → Reflection.
- AI Coach becomes available only after Reflection is saved.
- Inputs auto-save; there is no mandatory Save button.
- Book content lives in YAML, separate from React components.
- Dexie/IndexedDB is the first storage implementation.
- Domain code stays independent of providers and databases.
- The first UI is mobile-first and RTL Persian, with room for English later.

## MVP outcome

Users can follow the nine-stage path, complete scenes, resume after refresh, work offline, receive a mock or real AI report after Reflection, generate Career Purpose / Plan A / Plan B / 90-day roadmap, and export their data as JSON.

## Phases

### Phase 0 — Foundation

Create Next.js App Router, TypeScript strict mode, Tailwind, RTL setup, design tokens, lint/typecheck/build, project architecture docs, and a mobile shell with header, progress and navigation.

### Phase 1 — Offline data core

Define `src/types/compass.ts`; create Dexie migrations and repositories for `profile`, `progress`, `reflection`, `aiReports`, `settings`, and `syncQueue`; add Zustand hydration, debounced persistence, and offline/online error states.

### Phase 2 — Content and narrative engines

Add schema-validated YAML content, a type-safe loader, and an engine for stages, scenes, unlocks and completion. Suggested files are `content/fa/stages/stage-01-setting-out.yml` through `stage-09-action-plan.yml`.

### Phase 3 — Complete Stage 1 vertical slice

Build the path screen, stage cards, Exercise/Visualization/Reflection scenes, Card Choice, Slider, Text Reflection and Continue components, progress, locking, auto-save and resume behavior.

### Phase 4 — Visual system

Create stage themes with CSS variables, Rough.js decorations, success/error/focus states, restrained motion, keyboard support, contrast and reduced-motion handling.

### Phase 5 — Stages 2–5

Implement History; Preferences & Possibilities; Work/Life Wheel; Choices in Context, including Timeline, Wheel, Drag Bucket and weighting interactions.

### Phase 6 — Stages 6–9

Implement Networking Map; A Day in the Life; Path Exploration; Action Plan, including network map, workday scenario, path comparison and 90-day plan.

### Phase 7 — Provider-agnostic AI

Define `AIProvider`, ship a Mock provider, then add a server-side adapter for the selected provider. Use structured contracts for Stage Analysis and Master Blueprint. The app must remain complete without AI.

### Phase 8 — PWA, export and analytics

Add manifest, service worker, install prompt, cache strategy, JSON export/import, PDF Master Blueprint, analytics abstraction and GitHub Actions for typecheck, lint, build and deploy.

### Phase 9 — Hardening and release

Test hydration, refresh persistence, offline transitions, RTL layouts, migrations, incomplete data, accessibility and Lighthouse performance. Prepare release checklist and backup strategy.

## Recommended build order

1. Project skeleton and architecture files.
2. Types, Dexie and repositories.
3. Content engine with Stage 1 only.
4. App shell and path screen.
5. Complete Stage 1.
6. Stabilize the design system.
7. Add remaining stages in two batches.
8. Add Mock AI, then real provider.
9. Add PWA, export/PDF and analytics.
10. Run release validation.

Each step should produce a runnable vertical slice.

## Suggested folders

```text
src/app/  src/components/  src/content/  src/domain/  src/application/
src/infrastructure/db/  src/infrastructure/providers/  src/infrastructure/repositories/
src/stores/  src/types/  src/lib/  src/styles/
content/fa/stages/  content/en/stages/
public/icons/  public/fonts/  public/illustrations/
docs/architecture.md  docs/implementation-roadmap.md  docs/assets-inventory.md
```

## Asset inventory

The MVP must work without external artwork. Assets improve polish and can be added incrementally.

| Asset | Path | Filename | Priority |
|---|---|---|---|
| PWA icons | `public/icons/` | `icon-192.png`, `icon-512.png`, `maskable-512.png` | Required for release |
| Favicon | `public/` | `favicon.ico`, `favicon.svg` | Required for release |
| Persian web font | `public/fonts/` | `Vazirmatn-Regular.woff2`, `Vazirmatn-SemiBold.woff2`, `Vazirmatn-Bold.woff2` | Required |
| Brand logo | `public/brand/` | `logo.svg`, `wordmark.svg` | Recommended |
| Sketch icons | `public/illustrations/icons/` | `compass.svg`, `path.svg`, `reflection.svg`, `plan.svg` | Recommended |
| Coach character | `public/illustrations/coach/` | `coach-idle.svg`, `coach-celebrate.svg`, `coach-thinking.svg` | Optional |
| Paper texture | `public/textures/` | `paper-noise.webp` | Optional |
| Success sound | `public/audio/` | `stage-complete.ogg` | Optional |
| Unlock sound | `public/audio/` | `stage-unlock.ogg` | Optional |
| UI error sound | `public/audio/` | `ui-error.ogg` | Optional |

Audio must be muted by default or user-toggleable, lightweight, and never required for comprehension.

## Open decisions

- Final product name and brand direction.
- Persian-only first release or Persian + English.
- SVG/CSS illustration only or bitmap additions.
- Final font choice.
- AI provider and deployment target.
- Backup and export policy.

## Definition of Done

Every feature must work on mobile, handle loading/error/empty states, auto-save and restore after refresh, behave predictably offline, keep UI text in content files, pass typecheck/lint/build, and be checked for RTL and keyboard use where relevant.
