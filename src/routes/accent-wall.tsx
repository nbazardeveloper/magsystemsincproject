import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Quiz } from "@/components/site/Quiz";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/accent-wall")({
  head: () => ({
    meta: [
      { title: "Accent Wall Installation in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Transform any room with a custom feature wall — wood panels, textured plaster, geometric patterns or bold paint. No full remodel needed." },
      { property: "og:title", content: "Accent Wall Installation in Manatee & Sarasota — Mag System Inc" },
      { property: "og:description", content: "Transform any room with a custom feature wall — wood panels, textured plaster, geometric patterns or bold paint. No full remodel needed." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/accent-wall" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/accent-wall" }],
  }),
  component: AccentWallPage,
});

function AccentWallPage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Accent Wall Installation.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              Transform any room with a custom feature wall — wood panels, textured plaster, geometric patterns or bold paint. No full remodel needed.
            </p>
          </div>
        </section>
        <Quiz source="accent-wall" />
      </main>
      <Footer />
    </>
  );
}
