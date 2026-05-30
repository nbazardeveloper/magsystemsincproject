import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Mag System Inc" },
      {
        name: "description",
        content: "Privacy Policy for Mag System Inc — how we collect, use, and protect your personal information.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Privacy Policy — Mag System Inc" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <section className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:px-12 md:pt-44">
          <h1 className="type-display type-display-dark">Privacy Policy</h1>
          <p className="mt-3 text-[13px] text-muted-foreground">Last updated: May 2026</p>

          <div className="mt-12 space-y-8 text-[15px] leading-7 text-foreground/80">

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">1. Introduction</h2>
              <p>
                MAG SYSTEM INC ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information you provide when you visit our website or contact us about our services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li><strong>Contact information</strong> — name, phone number, and email address when you submit a contact form or quiz.</li>
                <li><strong>Project details</strong> — information about your renovation project such as size, style preferences, scope, and timeline.</li>
                <li><strong>Contractor information</strong> — company name, specialization, license status, service area, and contact details submitted through our contractor registration form.</li>
                <li><strong>Usage data</strong> — general information about how you interact with our website (pages visited, browser type).</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Respond to your inquiries and provide free estimates.</li>
                <li>Contact you about your renovation project by phone or text.</li>
                <li>Improve our website and services.</li>
                <li>Send you relevant information about our services (you can opt out at any time).</li>
              </ul>
              <p className="mt-4">
                By submitting your phone number, you consent to receive calls and text messages from MAG System Inc regarding your project inquiry. Message and data rates may apply. You may opt out at any time by replying STOP.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">4. How We Store Your Information</h2>
              <p>
                Your information is stored securely using industry-standard practices. We retain your data only as long as necessary to fulfill the purposes described in this policy or as required by law. We do not sell, trade, or rent your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">5. Sharing of Information</h2>
              <p>
                We do not share your personal information with third parties except as necessary to provide our services (e.g., with service providers who assist us in operating our website) or as required by law.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">6. Cookies</h2>
              <p>
                Our website may use cookies and similar technologies to improve your browsing experience. You can control cookies through your browser settings. Disabling cookies may affect some functionality of the website.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">7. Your Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal information that we hold. To exercise these rights, please contact us at the email below.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">9. Children's Privacy</h2>
              <p>
                Our website is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">10. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please contact us at{" "}
                <a href="mailto:magsysteminc@gmail.com" className="text-foreground underline underline-offset-2 hover:opacity-70">
                  magsysteminc@gmail.com
                </a>.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
