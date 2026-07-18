# Semantic color contrast — WCAG AA verification

Measured ratios for every semantic pairing in [globals.css](globals.css),
computed via culori (`wcagContrast`) from the oklch token values. The floor is
**4.5:1** (AA, normal text) for every pair in both themes.

These numbers are a snapshot; the living guarantee is
[lib/design/contrast.test.ts](../lib/design/contrast.test.ts), which parses
`globals.css` on every test run (locally and in CI) and fails if any pair
drops below 4.5:1.

| Pair                                  | Light   | Dark    |
| ------------------------------------- | ------- | ------- |
| foreground on background              | 17.69:1 | 16.78:1 |
| card-foreground on card               | 18.46:1 | 15.49:1 |
| popover-foreground on popover         | 18.46:1 | 15.49:1 |
| primary-foreground on primary         | 7.29:1  | 6.03:1  |
| secondary-foreground on secondary     | 12.81:1 | 12.65:1 |
| muted-foreground on muted             | 6.62:1  | 6.64:1  |
| muted-foreground on background        | 7.12:1  | 7.83:1  |
| accent-foreground on accent           | 10.76:1 | 11.17:1 |
| destructive-foreground on destructive | 6.35:1  | 4.54:1  |
| primary on background                 | 7.29:1  | 5.95:1  |

Notes:

- All pairs pass AA for normal text; all except dark
  `destructive-foreground/destructive` and dark `primary on background` also
  pass AAA (7:1).
- The dark destructive pair (4.54:1) passes but has the least headroom — if
  the dark `--destructive` token is lightened, re-run `npm run test` and
  expect this pair to be the first to fail.
