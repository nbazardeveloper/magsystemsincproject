import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Quiz } from "@/components/site/Quiz";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/water-filtration")({
  head: () => ({
    meta: [
      { title: "Water Filtration & Softening Systems in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Clean water starts at home. We install filtration and softening systems that fit your home, your family and your budget." },
      { property: "og:title", content: "Water Filtration & Softening Systems in Manatee & Sarasota — Mag System Inc" },
      { property: "og:description", content: "Clean water starts at home. We install filtration and softening systems that fit your home, your family and your budget." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/water-filtration" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/water-filtration" }],
  }),
  component: WaterFiltrationPage,
});

function WaterFiltrationPage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Water Filtration & Softening.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              Clean water starts at home. With microplastics, chlorine and hard minerals found in most Florida tap water — a proper filtration system is no longer a luxury, it's a necessity. We install solutions that fit your home, your family and your budget.
            </p>
          </div>
        </section>
        <Quiz source="water-filtration" />
      </main>
      <Footer />
    </>
  );
}
