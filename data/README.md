# /data — static content

Single typed source of truth for site content. Components **never** import
from here — they go through the accessors in
[lib/data/index.ts](../lib/data/index.ts) (`getProjects()`,
`getFeaturedProjects()`, …), so this folder can later be replaced by a CMS or
database without touching components.

## Adding or editing an entry

1. Edit the relevant file (`projects.ts`, `certificates.ts`, `experience.ts`,
   `blog.ts`, `profile.ts`). The `satisfies` assertion gives you full
   autocomplete and immediate type errors.
2. Follow the field docs in [lib/types/](../lib/types/) — e.g. dates are ISO
   strings (`YYYY-MM-DD`; experience uses `YYYY-MM`), `endDate: null` means
   "Present", `featured: true` puts a project on the Home highlight section.
3. Slugs must be unique, lowercase kebab-case — uniqueness is enforced by
   Zod, not convention.
4. Run `npm run test` — `lib/data/data.test.ts` validates every file against
   its Zod schema and fails loudly on any shape/uniqueness violation.

## Before launch (current placeholders to replace)

- Social URLs in `profile.ts` are best-guess handles — verify each one.
- Project `github`/`live` URLs are `null` — add real links.
- Project `images` are empty — add screenshots under
  `/public/images/projects/` and list their paths.
- `certificates.ts` and `experience.ts` contain realistic placeholders —
  replace with actual credentials and roles.
