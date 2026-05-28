import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Quiz } from "@/components/site/Quiz";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/bathroom")({
  head: () => ({
    meta: [
      { title: "Bathroom Renovation in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Bathroom renovation in Manatee County and Sarasota County, Florida. Tile, fixtures, lighting, and finishing work handled start to finish." },
      { property: "og:title", content: "Bathroom Renovation in Manatee & Sarasota — Mag System Inc" },
      { property: "og:description", content: "Bathroom renovation in Manatee County and Sarasota County, Florida. Tile, fixtures, lighting, and finishing work handled start to finish." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/bathroom" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/bathroom" }],
  }),
  component: BathroomPage,
});

function BathroomPage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Bathroom Renovation.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              Modern bathrooms, precise tile work, and clean finishing details designed for comfort and built for daily use.
            </p>
          </div>
        </section>
        <Quiz source="bathroom" />
      </main>
      <Footer />
    </>
  );
}
