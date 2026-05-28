import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Projects } from "@/components/site/Projects";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/handyman")({
  head: () => ({
    meta: [
      { title: "Handyman Services in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Professional handyman services in Manatee County and Sarasota County, Florida. Repairs, installations, and maintenance handled by experienced tradespeople." },
      { property: "og:title", content: "Handyman Services in Manatee & Sarasota — Mag System Inc" },
      { property: "og:description", content: "Professional handyman services in Manatee County and Sarasota County, Florida. Repairs, installations, and maintenance handled by experienced tradespeople." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/handyman" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/handyman" }],
  }),
  component: HandymanPage,
});

function HandymanPage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Handyman Services.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              From small repairs to larger installations, our skilled team handles every task with care and precision.
            </p>
          </div>
        </section>
        <Projects category="handyman" heading="Recent work." />
      </main>
      <Footer />
    </>
  );
}
