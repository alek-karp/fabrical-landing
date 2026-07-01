<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `bunx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture

Read `ARCHITECTURE.md` before adding data-fetching code, API endpoints, or server actions.
All domain data flows through tRPC — components, pages, and server actions call procedures
(via the server `caller` or the client `useTRPC()` hooks), never Supabase or the `lib/` data
layer directly. Keep that single data path intact and update `ARCHITECTURE.md` when it changes.

# Commits

Use the pattern `prefix(area): message` with no body/description.

Example: `feat(landing): add hero section`

Do not create a new branch unless explicitly asked.

When asked to commit or stage changes, only commit or stage files modified in the current session, not all outstanding changes in the working tree, unless explicitly told otherwise.

# Comments

Do not add unnecessary comments, including sectional comments. Only keep comments that clarify non-obvious intent or constraints.

# Styling

Avoid custom styling unless explicitly requested. Adding custom background colors or font colors can break existing light/dark pattern support.
Avoid Tailwind arbitrary values for design tokens, such as `text-[#456231]`, unless explicitly requested.

# Components

Do not modify files in `components/ui/` — these are shadcn-generated primitives. Add or update them via the shadcn CLI, and adjust behavior at the call site (props, wrappers) instead.

# Errors

Always surface user-facing errors as shadcn (sonner) toasts via `toast.error(...)`, not inline on cards or forms.

# Page Structure

Pages should be composed from components. If a page needs substantial custom code, move that code into a dedicated component and import it into the page to keep the page modular.
Use kebab-case filenames for components, such as `industrial-research-body.tsx`, and export React components as PascalCase named exports. Keep Next.js reserved route files named exactly as required, such as `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, and `default.tsx`.
Place shared UI in the top-level `components/` directory. Place route-specific UI next to the route in an `_components/` folder when colocation is clearer than sharing it globally.
Prefer arrow functions for new code and refactors, including React components, unless a Next.js convention, library pattern, or hoisting requirement makes a function declaration the better fit.

# Verification

Only run `bun run verify` to verify work.
Never run the dev server.

# Environment Variables

When adding or changing environment variables, update `.env.example` in the same change.

# Types

Prefer `as const` objects for enum-like values and derive the union type from them, rather than writing string literal unions directly.

```ts
export const ACTIVITY_ENTITY_TYPES = {
  Project: "project",
  Procurement: "procurement",
} as const;

export type ActivityEntityType =
  (typeof ACTIVITY_ENTITY_TYPES)[keyof typeof ACTIVITY_ENTITY_TYPES];
```

This keeps the runtime values and the type in sync without duplication.

Never use `any`. It signals poor typing — use a precise type, `unknown` with narrowing, or a generic instead.
