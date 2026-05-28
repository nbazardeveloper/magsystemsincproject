import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mag System Inc" },
      {
        name: "description",
        content:
          "Contact Mag System Inc for a free consultation and on-site assessment in Manatee County and Sarasota County, Florida.",
      },
      { property: "og:title", content: "Contact Mag System Inc — Free Renovation Estimate in Manatee & Sarasota" },
      {
        property: "og:description",
        content:
          "Reach out to Mag System Inc about kitchen, bathroom, remodeling, handyman, and home improvement projects in Manatee County and Sarasota County, Florida.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  useReveal();

  return (
    <>
      <Nav />
      <main className="bg-background">
        <section className="border-b border-border/60 px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-[1200px]">
            <p className="type-kicker type-kicker-muted reveal">Contact</p>
            <h1 className="type-display type-display-dark reveal mt-5 max-w-4xl md:text-7xl">
              Start with the same form, on a dedicated page.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6 max-w-3xl">
              Tell us about your project and we will follow up with consultation, measurements, and next-step guidance for your scope.
            </p>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}