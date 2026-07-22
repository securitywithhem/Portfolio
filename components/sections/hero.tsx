import { profile } from "@/data/profile";
import { HeroReveal } from "./hero-reveal";
import { ResumeModal } from "@/components/resume/resume-modal";

/**
 * The four figures a recruiter should retain after three seconds. Rendered as
 * a dense condensed data strip along the foot of the plate — the counterweight
 * to the statement above it. Boxing these in stat cards is the SaaS
 * hero-metric template; the numbers carry themselves at this scale.
 */
const PROOF = [
  { value: "Top 2%", label: "TryHackMe, globally" },
  { value: "175+", label: "Hands-on labs" },
  { value: "3", label: "Security platforms built" },
  { value: "1", label: "Live VAPT internship" },
];

/**
 * Plate 1 — paper. Typographic, asymmetric, no portrait.
 *
 * The headline is the positioning rather than the name: the name is in the
 * header, and a recruiter scanning for three seconds needs to know what you do.
 * Set at the specimen's widest and heaviest, which is the one place on the page
 * the type runs at full display scale.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[94svh] flex-col justify-center bg-paper px-6 pt-28 pb-14 text-ink md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <HeroReveal>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="type-data flex items-center gap-2.5 text-accent">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                />
                Available now for security internships &amp; part-time roles
              </p>

              <h1 className="type-statement mt-7 max-w-[16ch]">
                I break systems to understand them, then build what stops them
                breaking.
              </h1>
            </div>

            {/* Sits on the baseline of the statement rather than centred under
                it — the asymmetry is what keeps this from reading as a hero
                template. */}
            <p className="type-body max-w-sm text-ink-muted lg:pb-2 lg:text-right">
              Cybersecurity engineer. Offensive security and VAPT by training,
              moving into governance, risk &amp; compliance and AI security.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-8 border-t border-rule pt-7 md:mt-24 lg:flex-row lg:items-start lg:justify-between">
            <dl className="grid grow grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
              {PROOF.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="type-figure text-[clamp(1.5rem,2.6vw,2rem)] leading-none">
                    {stat.value}
                  </dd>
                  <p className="type-data mt-2 text-ink-dim">{stat.label}</p>
                </div>
              ))}
            </dl>

            <div className="flex shrink-0 flex-wrap items-center gap-6">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent("Security role — let's talk")}`}
                className="inline-flex h-11 items-center rounded-[2px] bg-ink px-6 text-[0.9rem] font-medium text-paper transition-colors hover:bg-accent motion-reduce:transition-none"
              >
                Email me
              </a>
              <ResumeModal />
            </div>
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}
