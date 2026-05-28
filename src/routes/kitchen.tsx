import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Quiz } from "@/components/site/Quiz";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/kitchen")({
  head: () => ({
    meta: [
      { title: "Kitchen Renovation in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Kitchen renovation in Manatee County and Sarasota County, Florida. From planning and material selection to installation and finishing touches." },
      { property: "og:title", content: "Kitchen Renovation in Manatee & Sarasota — Mag System Inc" },
      { property: "og:description", content: "Custom kitchen renovation in Manatee County and Sarasota County, Florida. From planning and material selection to installation and finishing touches." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/kitchen" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/kitchen" }],
  }),
  component: KitchenPage,
});

function KitchenPage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Kitchen Renovation.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              From planning to final touches, we create custom kitchens that balance aesthetics, comfort, and everyday function.
            </p>
          </div>
        </section>
        <Quiz source="kitchen" />
      </main>
      <Footer />
    </>
  );
}
