import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact/contact-form";

/**
 * Contact section — final conversion point for recruiters. Per App Flow,
 * this sits just before Resume Download, making it the last touchpoint
 * before they decide to reach out or download your resume.
 *
 * Server Component for metadata; ContactForm is the client boundary
 * (form state, submission).
 *
 * `id="contact"` matches the anchor contract in data/navigation.ts.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="contact-heading"
          eyebrow="Get in touch"
          title="Let's talk"
          className="mb-12"
        />
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 text-center text-muted-foreground">
            Whether you have a project in mind, a security opportunity, or just
            want to chat about cybersecurity, I&apos;d love to hear from you.
          </p>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
