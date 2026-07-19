import { ArrowUp } from "lucide-react";
import { getProfile } from "@/lib/data";

/** Site footer — server-rendered. Contact affordances + telemetry framing. */
export function Footer() {
  const profile = getProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_auto]">
        <div>
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="h-5 w-1.5 rounded-[1px] bg-accent" />
            <span className="font-mono text-sm font-medium tracking-tight text-fg">
              HEM<span className="text-fg-dim">.</span>GABHAWALA
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
            {profile.role}. Based in {profile.location}.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-block text-sm text-fg transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Social links">
          <p className="label-mono mb-4">ELSEWHERE</p>
          <ul className="space-y-2">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-start md:justify-end">
          <a
            href="#hero"
            className="label-mono inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowUp size={14} aria-hidden />
            BACK TO TOP
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-4">
          <span className="label-mono">
            © {year} {profile.name}
          </span>
          <span className="label-mono">BUILT WITH NEXT.JS · UNIT / D-01</span>
        </div>
      </div>
    </footer>
  );
}
