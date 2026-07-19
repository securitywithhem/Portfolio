import { ArrowUpRight } from "lucide-react";
import { certificatesSorted } from "@/data/certificates";
import { formatMonthYear } from "@/lib/format";

/** Certifications — formal credentials, newest first. Server-rendered. */
export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="border-t border-line py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-3 flex items-center gap-3">
          <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
          CERTIFICATIONS
        </p>
        <h2
          id="certifications-title"
          className="max-w-3xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl"
        >
          Credentials behind the trajectory.
        </h2>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {certificatesSorted.map((cert) => (
            <li key={cert.id} className="flex flex-col gap-3 bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="label-mono">{cert.issuer}</span>
                <time dateTime={cert.date} className="label-mono text-fg-muted">
                  {formatMonthYear(cert.date)}
                </time>
              </div>
              <h3 className="text-base leading-snug font-semibold tracking-tight">
                {cert.title}
              </h3>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  Verify
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
