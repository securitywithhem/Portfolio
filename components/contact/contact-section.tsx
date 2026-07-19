import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { ContactForm } from "@/components/contact/contact-form";
import { getProfile } from "@/lib/data";

export function ContactSection() {
  const { email, location, socials } = getProfile();
  const linkedin = socials.find((s) => s.label === "LinkedIn")?.url;
  const github = socials.find((s) => s.label === "GitHub")?.url;

  const directContact: { label: string; value: string; href?: string }[] = [
    ...(email
      ? [{ label: "Email", value: email, href: `mailto:${email}` }]
      : []),
    ...(linkedin
      ? [
          {
            label: "LinkedIn",
            value: "linkedin.com/in/hem-nikesh-gabhawala-99a5482a9",
            href: linkedin,
          },
        ]
      : []),
    ...(github
      ? [{ label: "GitHub", value: "github.com/SecurityWithHem", href: github }]
      : []),
    ...(location ? [{ label: "Location", value: location }] : []),
  ];

  return (
    <SectionPremium id="contact" spacing="spacious" accentLine="top">
      <SectionHeader
        eyebrow="Contact"
        index="09"
        title="Looking for GRC or AI Security roles"
        titleAccent="where offensive experience is an asset, not a footnote."
        subtitle="If your team is building either function, I'd like to talk."
      />

      <div className="mx-auto w-full max-w-2xl">
        <p className="mb-12 text-center text-lg leading-relaxed text-text-secondary">
          I&apos;m looking to move from VAPT into Governance, Risk &amp;
          Compliance and AI Security&nbsp;&mdash; roles where understanding how
          systems actually get attacked shapes how they&apos;re governed and
          secured, rather than being separate from it.
        </p>

        <ContactForm />

        {directContact.length > 0 && (
          <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden border-y border-border-subtle sm:grid-cols-2">
            {directContact.map((item) => (
              <div key={item.label} className="bg-bg-base px-5 py-5">
                <dt className="font-mono text-[11px] font-medium tracking-[0.12em] text-text-muted uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm text-text-primary">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        item.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="transition-colors duration-200 hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-12 border-l-2 border-accent pl-6 text-base leading-relaxed text-text-secondary italic">
          Most candidates ask you to imagine they understand risk. This
          portfolio shows the exploits that taught me what to govern, and the
          systems I built once I understood it. If that&apos;s the kind of GRC
          or AI Security hire you&apos;re looking for, let&apos;s talk.
        </p>
      </div>
    </SectionPremium>
  );
}
