<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Commits

Use the pattern `prefix(area): message` with no body/description.

Example: `feat(landing): add hero section`

# Comments

Do not add unnecessary comments, including sectional comments. Only keep comments that clarify non-obvious intent or constraints.

# Page Structure

Pages should be composed from components. If a page needs substantial custom code, move that code into a dedicated component and import it into the page to keep the page modular.

# Verification

Only run `bun run verify` to verify work.
Never run the dev server.
