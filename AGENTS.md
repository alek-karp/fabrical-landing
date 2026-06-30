<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Commits

Use the pattern `prefix(area): message` with no body/description.

Example: `feat(landing): add hero section`

# Comments

Do not add unnecessary comments, including sectional comments. Only keep comments that clarify non-obvious intent or constraints.

# Styling

Avoid custom styling unless explicitly requested. Adding custom background colors or font colors can break existing light/dark pattern support.
Avoid Tailwind arbitrary values for design tokens, such as `text-[#456231]`, unless explicitly requested.

# Page Structure

Pages should be composed from components. If a page needs substantial custom code, move that code into a dedicated component and import it into the page to keep the page modular.
Use kebab-case filenames for components, such as `industrial-research-body.tsx`, and export React components as PascalCase named exports. Keep Next.js reserved route files named exactly as required, such as `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, and `default.tsx`.
Place shared UI in the top-level `components/` directory. Place route-specific UI next to the route in an `_components/` folder when colocation is clearer than sharing it globally.
Prefer arrow functions for new code and refactors, including React components, unless a Next.js convention, library pattern, or hoisting requirement makes a function declaration the better fit.

# Verification

Only run `bun run verify` to verify work.
Never run the dev server.
