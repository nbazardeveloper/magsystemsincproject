import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Projects } from "@/components/site/Projects";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/tile")({
  head: () => ({
    meta: [
      { title: "Tile Replacement & Installation in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Expert tile replacement and installation in Manatee County and Sarasota County, Florida. Floors, walls, showers, and backsplashes done right." },
      { property: "og:title", content: "Tile Replacement & Installation in Manatee & Sarasota — Mag System Inc" },
      { property: "og:description", content: "Expert tile replacement and installation in Manatee County and Sarasota County, Florida. Floors, walls, showers, and backsplashes done right." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/tile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/tile" }],
  }),
  component: TilePage,
});

function TilePage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Tile Replacement & Installation.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              Floors, walls, showers, and backsplashes — precise tile work that stands the test of time.
            </p>
          </div>
        </section>
        <Projects category="tile" heading="Recent tile work." />
      </main>
      <Footer />
    </>
  );
}
