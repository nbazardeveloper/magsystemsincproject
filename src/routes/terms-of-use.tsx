import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Mag System Inc" },
      {
        name: "description",
        content: "Terms of Use for Mag System Inc website and services.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Terms of Use — Mag System Inc" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/terms-of-use" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/terms-of-use" }],
  }),
  component: TermsOfUsePage,
});

function TermsOfUsePage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <section className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:px-12 md:pt-44">
          <h1 className="type-display type-display-dark">Terms of Use</h1>
          <p className="mt-3 text-[13px] text-muted-foreground">Last updated: May 2026</p>

          <div className="prose-legal mt-12 space-y-8 text-[15px] leading-7 text-foreground/80">

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the MAG SYSTEM INC website (magsysteminc.com), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">2. Use of the Website</h2>
              <p>
                You may use this website for lawful purposes only. You agree not to use the site in any way that violates applicable local, state, national, or international laws or regulations. You agree not to transmit any unsolicited or unauthorized advertising or promotional material.
              </p>
              <p className="mt-4">
                Contractor registrations submitted through this website do not constitute a formal agreement or guarantee of work assignments. MAG System Inc reserves the right to accept or decline any contractor application at its sole discretion.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">3. Intellectual Property</h2>
              <p>
                All content on this website — including text, images, logos, graphics, and design — is the property of MAG SYSTEM INC and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">4. Estimates and Quotes</h2>
              <p>
                Any estimates or cost ranges provided through our website or quiz forms are for informational purposes only and do not constitute a binding contract or guarantee of final pricing. Final pricing is determined after an on-site assessment by our team.
              </p>
              <p className="mt-4">
                Visual examples, project photos, and style references shown on this website are for inspiration purposes only and may not reflect the exact outcome of your project.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">5. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. These links are provided for your convenience only. MAG SYSTEM INC has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, MAG SYSTEM INC shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website or our services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">7. Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated date. Your continued use of the website after any changes constitutes your acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">8. Contact</h2>
              <p>
                If you have any questions about these Terms of Use, please contact us at{" "}
                <a href="mailto:magsysteminc@gmail.com" className="text-foreground underline underline-offset-2 hover:opacity-70">
                  magsysteminc@gmail.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[18px] font-semibold text-foreground">9. Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of the State of Florida, United States. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Sarasota County, Florida.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
