import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Projects } from "@/components/site/Projects";
import { Quiz } from "@/components/site/Quiz";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/full-remodel")({
  head: () => ({
    meta: [
      { title: "Turnkey Remodel in Manatee & Sarasota — Mag System Inc" },
      { name: "description", content: "Stress-free turnkey renovation in Manatee County and Sarasota County, Florida. One team handling every stage on-site." },
      { property: "og:title", content: "Full Remodel — MagSystem Inc" },
      { property: "og:description", content: "Turnkey remodel in Manatee County and Sarasota County, Florida." },
    ],
  }),
  component: FullRemodelPage,
});

function FullRemodelPage() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-background text-center">
          <div className="section-inner">
            <h1 className="type-display type-display-dark reveal md:text-7xl">
              Full Remodel.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6">
              From handyman updates to full turnkey execution, we coordinate every stage so your renovation stays clear and stress-free.
            </p>
          </div>
        </section>
        <Projects category="full-remodel" heading="Recent remodels." />
        <Quiz source="full-remodel" />
      </main>
      <Footer />
    </>
  );
}
