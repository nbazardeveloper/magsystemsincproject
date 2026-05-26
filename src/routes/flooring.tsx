import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Projects } from "@/components/site/Projects";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/flooring")({
  head: () => ({
    meta: [
      { title: "Flooring Installation in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Professional flooring installation in Manatee County and Sarasota County, Florida. Hardwood, LVP, tile, and more." },
      { property: "og:title", content: "Flooring Installation — MagSystem Inc" },
      { property: "og:description", content: "Professional flooring installation in Manatee County and Sarasota County, Florida." },
    ],
  }),
  component: FlooringPage,
});

function FlooringPage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Flooring Installation.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              Hardwood, LVP, tile, and more — beautiful floors installed with attention to every detail.
            </p>
          </div>
        </section>
        <Projects category="flooring" heading="Recent flooring projects." />
      </main>
      <Footer />
    </>
  );
}
