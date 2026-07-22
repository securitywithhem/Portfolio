"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copy-to-clipboard for the email address. Recruiters copy an address far more
 * often than they compose in a mail client, so this is a real affordance, not a
 * flourish. The only reason the contact plate needs any client JS.
 *
 * Reverts to the idle label after a moment; falls back silently if the
 * clipboard API is unavailable (older browsers, insecure contexts) — the mailto
 * link beside it still works, so copy failing is never a dead end.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no clipboard — the mailto link is the fallback */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-on-close-muted transition-colors hover:text-on-close"
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check size={14} aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Copy size={14} aria-hidden />
          Copy
        </>
      )}
    </button>
  );
}
