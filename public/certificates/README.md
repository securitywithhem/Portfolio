# Certificate files

Drop a certificate PDF or image here and a **"View ↗"** link appears next to
that entry in the Credentials section automatically. No code change needed — the
site checks this folder at build time and only shows a link when the file
actually exists, so there are never dead links.

## Naming

Name each file after the credential's `id`, with any of these extensions:
`.pdf` · `.png` · `.jpg` · `.jpeg` · `.webp`

### Certifications (`data/certificates.ts`)

| id                          | file to add                     |
| --------------------------- | ------------------------------- |
| `cert-google-cybersecurity` | `cert-google-cybersecurity.pdf` |
| `cert-aws-ml-foundations`   | `cert-aws-ml-foundations.pdf`   |
| `cert-aws-data-engineering` | `cert-aws-data-engineering.pdf` |

### TryHackMe paths (`data/tryhackme.ts`) — optional

| id                         | file to add                    |
| -------------------------- | ------------------------------ |
| `thm-offensive-pentesting` | `thm-offensive-pentesting.pdf` |
| `thm-web-app-pentesting`   | `thm-web-app-pentesting.pdf`   |
| `thm-jr-pentester`         | `thm-jr-pentester.pdf`         |
| `thm-web-fundamentals`     | `thm-web-fundamentals.pdf`     |
| `thm-cyber-security-101`   | `thm-cyber-security-101.pdf`   |
| `thm-pre-security`         | `thm-pre-security.pdf`         |

A real issuer verification URL always wins over a local file: if you set
`credentialUrl` on an entry in the data file, the link points there instead.
