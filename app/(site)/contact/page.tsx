import type { Metadata } from "next";
import PageBanner from "@/components/site/PageBanner";
import ContactForm from "@/components/site/ContactForm";
import Reveal from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Contact · MBH-Friendly ED Design Toolkit",
  description:
    "Get in touch with Clemson University's Center for Health Facilities Design & Testing about the MBH-Friendly ED Design Toolkit.",
};

const details = [
  { label: "Email", value: "chfdt@clemson.edu", href: "mailto:chfdt@clemson.edu" },
  { label: "Center", value: "Center for Health Facilities Design & Testing" },
  { label: "Address", value: "Lee Hall, Clemson University, Clemson, SC 29634" },
  { label: "Response", value: "We typically reply within a few business days." },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Contact"
        title="Talk to the CHFDT team."
        subtitle="Questions about the toolkit, a research collaboration, or applying it to your project — we'd like to hear from you."
      />

      <section>
        <div className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-orange-deep">Reach us</p>
              <h2 className="mt-3 font-display text-display-sm font-normal text-ink-soft">
                Center for Health Facilities Design &amp; Testing
              </h2>
              <dl className="mt-8 space-y-6">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt className="eyebrow text-muted">{d.label}</dt>
                    <dd className="mt-1 text-ink">
                      {d.href ? (
                        <a
                          href={d.href}
                          className="font-medium text-orange-deep underline-offset-4 hover:underline"
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={80}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
