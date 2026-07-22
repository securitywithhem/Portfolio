import { readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Maps a credential id to a verification file in public/certificates/, if one
 * has been added. Server-only — read at build time.
 *
 * The point is the same safety rule the Dharma project link follows: never
 * render a link that 404s. Rather than assuming a file exists, the directory is
 * read once and only ids with a real matching file get a link. Drop a file in
 * and its "View" affordance appears on the next build; remove it and the link
 * disappears — it cannot go stale.
 */

const DIR = join(process.cwd(), "public", "certificates");
const EXTENSIONS = new Set([".pdf", ".png", ".jpg", ".jpeg", ".webp"]);

/** id → public path (e.g. "/certificates/cert-google-cybersecurity.pdf"). */
function readCertificateFiles(): Map<string, string> {
  const map = new Map<string, string>();
  let entries: string[];
  try {
    entries = readdirSync(DIR);
  } catch {
    // Folder absent or unreadable — no local verifications, never throw.
    return map;
  }

  for (const name of entries) {
    const dot = name.lastIndexOf(".");
    if (dot <= 0) continue;
    const ext = name.slice(dot).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;
    const id = name.slice(0, dot);
    // First match wins; a given id should have one file.
    if (!map.has(id)) map.set(id, `/certificates/${name}`);
  }
  return map;
}

const files = readCertificateFiles();

/**
 * The best verification target for a credential: an explicit issuer URL wins,
 * then a local file, then none.
 */
export function verifyHref(
  id: string,
  credentialUrl: string | null,
): string | null {
  if (credentialUrl) return credentialUrl;
  return files.get(id) ?? null;
}
