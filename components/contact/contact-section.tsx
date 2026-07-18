import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { ContactForm } from "@/components/contact/contact-form";

export function ContactSection() {
  return (
    <SectionPremium id="contact" spacing="spacious" accentLine="top">
      <SectionHeader
        eyebrow="Contact"
        title="Let's work together"
        subtitle="Have a project or opportunity? Get in touch"
        maxWidth="md"
      />
      <div className="mx-auto w-full max-w-2xl">
        <p className="mb-12 text-center text-lg leading-relaxed text-[#8B8D92]">
          Whether you have a security project in mind, a consulting opportunity,
          or just want to discuss cybersecurity—I&apos;d love to hear from you.
        </p>
        <ContactForm />
      </div>
    </SectionPremium>
  );
}
