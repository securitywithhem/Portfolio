import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { CertificationGrid } from "@/components/certifications/certification-grid";
import { getProfile, getTryHackMeAchievements } from "@/lib/data";

const THM_STATS = [
  { value: "Top 2%", label: "Global ranking" },
  { value: "175+", label: "Labs completed" },
  { value: "6", label: "Learning paths completed" },
] as const;

export function TryHackMeSection() {
  const achievements = getTryHackMeAchievements();
  const thmUrl = getProfile().socials.find((s) => s.label === "TryHackMe")?.url;

  return (
    <SectionPremium id="tryhackme" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="TryHackMe"
        index="07"
        title="Top 2%."
        titleAccent="The offensive credibility behind the pivot."
        subtitle="The hands-on ranking that makes the GRC and AI Security move credible, not theoretical."
      />

      <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-text-secondary">
        Anyone can say they understand risk. Landing in the top 2% of TryHackMe
        after 175+ completed labs&nbsp;&mdash; competing against working
        security professionals on privilege escalation, Active Directory
        compromise, and real web exploitation&nbsp;&mdash; is what makes that
        understanding credible instead of theoretical.
      </p>

      <div className="mx-auto mb-12 grid max-w-3xl grid-cols-1 gap-px overflow-hidden border-y border-border-subtle sm:grid-cols-3">
        {THM_STATS.map((stat) => (
          <div key={stat.label} className="bg-bg-base px-4 py-6 text-center">
            <div className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 text-xs tracking-[0.1em] text-text-muted uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <CertificationGrid certs={achievements} />

      {thmUrl && (
        <div className="mt-10 text-center">
          <a
            href={thmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            View TryHackMe profile →
          </a>
        </div>
      )}
    </SectionPremium>
  );
}
