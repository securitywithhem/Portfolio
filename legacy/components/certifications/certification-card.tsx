import { ArrowUpRight } from "lucide-react";

import type { Certificate } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * One credential cell in the logo/name grid (Design System v2 §6). Flat and
 * editorial: the issuer reads as a small tracked-out label (the "logo"), the
 * title is the primary type and turns accent on hover. When a verification URL
 * exists the whole cell is a link; otherwise it's a static cell.
 *
 * Server Component — renderable without client JS. Shared by both the
 * Certifications and TryHackMe sections without branching logic.
 */
export function CertificationCard({ cert }: { cert: Certificate }) {
  const { title, issuer, date, credentialUrl } = cert;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const cls =
    "group flex h-full flex-col justify-between gap-6 bg-bg-base p-6 transition-colors duration-200 hover:bg-bg-surface sm:p-8";

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-text-muted font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          {issuer}
        </span>
        {credentialUrl && (
          <ArrowUpRight
            aria-hidden
            className="text-text-muted size-4 shrink-0 opacity-0 transition-all duration-200 group-hover:text-accent group-hover:opacity-100"
          />
        )}
      </div>
      <div>
        <h3
          className={cn(
            "text-text-primary text-base leading-snug font-semibold tracking-tight transition-colors duration-200 sm:text-lg",
            credentialUrl && "group-hover:text-accent",
          )}
        >
          {title}
        </h3>
        <p className="text-text-muted mt-2 text-xs">{formattedDate}</p>
      </div>
    </>
  );

  return credentialUrl ? (
    <a
      href={credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View credential for ${title} (opens in a new tab)`}
      className={cls}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
