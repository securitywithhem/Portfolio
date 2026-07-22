import { profile } from "@/data/profile";
import { Reveal } from "@/components/shared/reveal";
import { TransitRails } from "@/components/contact/transit-rails";
import { CopyEmail } from "@/components/contact/copy-email";

const SUBJECT = encodeURIComponent("Security role — let's talk");

/** Every way to reach or verify me, in one row. */
const LINKS = [...profile.socials, { label: "Resume", url: profile.resumeUrl }];

/**
 * Plate 6 — deep oxblood, drenched. The closing statement.
 *
 * The ground is the redline's own hue taken to depth: OKLCH hue 30 against the
 * accent's 32, darkened and desaturated. So it reads as related to every accent
 * mark above it without repeating them, and the page ends on something settled
 * rather than something shouting.
 *
 * One clear ask, one obvious action. The email is the single primary target —
 * recruiters copy an address or hit mailto far more often than they fill in a
 * form, so a form here would only compete with the thing that actually gets
 * replies. It is sized to sit on one line and wraps on words, never mid-address.
 *
 * Server component: the only interactive part is the Copy button, which is its
 * own small client island.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-close px-6 py-28 text-on-close md:px-10 md:py-44"
    >
      {/*
        The transit band owns the right 30% of the viewport outright. The
        content container below reserves the space with lg:pr-[34%] rather than
        the band being laid over the text, so nothing ever sits on the pattern.
        Below lg it is not rendered at all — a 30% band on a phone would cost the
        only column that matters.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[30%] overflow-hidden lg:block"
      >
        <TransitRails />
      </div>

      <div className="relative mx-auto max-w-6xl lg:pr-[34%]">
        <Reveal inView>
          <h2 className="type-plate max-w-[16ch]">Open to security roles.</h2>
          <p className="type-body mt-6 text-on-close-muted">
            Available now for internships and part-time roles, remote or
            on-site. A direct email is the fastest way to reach me — I reply to
            every one.
          </p>
        </Reveal>

        <Reveal inView delay={0.12}>
          <div className="mt-14 md:mt-20">
            <a
              href={`mailto:${profile.email}?subject=${SUBJECT}`}
              className="inline-block text-[clamp(1.4rem,3.4vw,2.4rem)] leading-tight font-semibold tracking-[-0.02em] break-words hover:opacity-80 motion-reduce:transition-none"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              {profile.email}
            </a>
            <div className="mt-4 flex items-center gap-5">
              <CopyEmail email={profile.email} />
              <span className="type-data text-on-close-muted">
                {profile.location}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal
          inView
          delay={0.22}
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule-on-close pt-8 md:mt-24"
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={
                link.url.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="link-underline text-[0.95rem]"
            >
              {link.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
