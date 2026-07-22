import { ArrowUpRight } from "lucide-react";
import { certificatesSorted } from "@/data/certificates";
import { tryHackMeSorted } from "@/data/tryhackme";
import { verifyHref } from "@/lib/certificate-files";
import type { Certificate } from "@/lib/types";

/**
 * Plate 5 — paper-2, deliberately dense.
 *
 * This is the specimen's small-size register: after the display scale of the
 * plates above, a tight data block is the counterweight that makes that scale
 * read as a choice. It is also honest about what this content is — credentials
 * corroborate claims already made, so they get precision rather than volume.
 *
 * Each entry that has a verification target — an issuer URL, or a file the owner
 * dropped in public/certificates/ — gets an explicit "View" affordance, so a
 * recruiter can see it is checkable rather than having to guess the title is a
 * link. Entries with neither stay plain text; there are never dead links (see
 * lib/certificate-files.ts).
 *
 * No motion here on purpose. Something has to stay still.
 */
function CredentialColumn({
  heading,
  items,
}: {
  heading: string;
  items: Certificate[];
}) {
  return (
    <div>
      <h3 className="type-data border-b border-rule pb-3 text-ink-dim">
        {heading}
      </h3>
      <ul className="mt-1">
        {items.map((item) => {
          const href = verifyHref(item.id, item.credentialUrl);
          return (
            <li
              key={item.id}
              className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="text-[0.95rem] leading-snug">{item.title}</p>
                <p className="type-data mt-1 text-ink-dim">{item.issuer}</p>
              </div>

              <div className="flex shrink-0 items-baseline gap-4">
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-ink transition-colors hover:text-accent"
                  >
                    <span className="link-underline">View</span>
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
                <span className="type-data text-ink-dim tabular-nums">
                  {item.date.slice(0, 4)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Credentials() {
  return (
    <section className="bg-paper-2 px-6 pb-24 text-ink md:px-10 md:pb-36">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
        <CredentialColumn heading="Certifications" items={certificatesSorted} />
        <CredentialColumn
          heading="TryHackMe paths completed"
          items={tryHackMeSorted}
        />
      </div>
    </section>
  );
}
