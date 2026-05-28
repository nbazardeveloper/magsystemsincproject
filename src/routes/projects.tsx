import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { Projects } from "@/components/site/Projects";
import { useReveal } from "@/hooks/use-reveal";
import { supabase } from "@/integrations/supabase/client";
import projectHeroImage from "@/images/project-here.webp";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Mag System Inc" },
      {
        name: "description",
        content:
          "Explore kitchen, bathroom, and full remodel projects completed by Mag System Inc across Manatee County and Sarasota County, Florida.",
      },
      { property: "og:title", content: "Renovation Projects in Manatee & Sarasota — Mag System Inc" },
      {
        property: "og:description",
        content:
          "See recent renovation projects from Mag System Inc, including kitchens, bathrooms, and turnkey remodels in Manatee County and Sarasota County, Florida.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/projects" }],
  }),
  component: ProjectsPage,
});

function toLabel(cat: string) {
  return cat
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ProjectsPage() {
  useReveal();
  const [active, setActive] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("category")
      .then(({ data }) => {
        if (!data) return;
        const unique = Array.from(new Set(data.map((r) => r.category as string).filter(Boolean))).sort();
        setCategories(unique);
      });
  }, []);

  return (
    <>
      <Nav />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border/60 px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
          <img
            src={projectHeroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/84" />
          <div className="relative z-10 mx-auto max-w-[1200px]">
            <p className="type-kicker type-kicker-muted reveal">
              Projects
            </p>
            <h1 className="type-display type-display-dark reveal mt-5 max-w-4xl md:text-7xl">
              Recent work across kitchens, bathrooms, and full remodels.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6 max-w-3xl">
              Explore completed renovation projects from MAG SYSTEM INC throughout Manatee County and Sarasota County, Florida.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              <button
                onClick={() => setActive("all")}
                className={`h-9 rounded-full border px-5 text-[13px] font-medium transition-colors ${
                  active === "all"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`h-9 rounded-full border px-5 text-[13px] font-medium transition-colors ${
                    active === cat
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {toLabel(cat)}
                </button>
              ))}
            </div>
          </div>
        </section>

        <Projects
          category={active === "all" ? undefined : active}
          seamGrid
          compactTopSpacing
        />
      </main>
      <Footer />
    </>
  );
}