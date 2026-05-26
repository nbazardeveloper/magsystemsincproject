import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "@/hooks/use-reveal";

type Project = {
  id: string;
  title: string | null;
  location: string;
  description: string | null;
  after_image_url: string | null;
  before_image_url: string | null;
  category: "kitchen" | "bathroom" | "full-remodel" | "handyman" | "tile" | "flooring";
};

const categoryRoutes: Record<Project["category"], string> = {
  kitchen: "/kitchen",
  bathroom: "/bathroom",
  "full-remodel": "/full-remodel",
  handyman: "/handyman",
  tile: "/tile",
  flooring: "/flooring",
};

export function Projects({
  category,
  heading,
  showViewAllLink = false,
  limitOnePerCategory = false,
  compactTopSpacing = false,
  compactBottomSpacing = false,
  seamGrid = false,
  showCardProjectsLink = false,
}: {
  category?: Project["category"];
  heading?: string;
  showViewAllLink?: boolean;
  limitOnePerCategory?: boolean;
  compactTopSpacing?: boolean;
  compactBottomSpacing?: boolean;
  seamGrid?: boolean;
  showCardProjectsLink?: boolean;
}) {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useReveal();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let q = supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (category) q = q.eq("category", category);
      const { data } = await q;
      if (!cancelled) {
        setItems((data ?? []) as Project[]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [category]);

  const displayItems = limitOnePerCategory
    ? items.filter((project, index, allProjects) =>
        allProjects.findIndex((candidate) => candidate.category === project.category) === index,
      )
    : items;

  const hasHeader = Boolean(heading || showViewAllLink);
  const gridTopSpacing = heading ? "mt-16" : showViewAllLink ? "mt-10" : "mt-0";
  const sectionSpacing = compactTopSpacing || compactBottomSpacing
    ? `${compactTopSpacing ? "pt-[10px]" : "pt-24 md:pt-28"} ${compactBottomSpacing ? "pb-0" : "pb-24 md:pb-28"}`
    : "py-24 md:py-28";
  const gridClasses = seamGrid
    ? `${gridTopSpacing} grid gap-[10px] bg-white px-[10px] pb-[10px] md:grid-cols-2`
    : `${gridTopSpacing} grid md:grid-cols-2`;

  return (
    <section id="projects" className={`bg-background ${sectionSpacing}`}>
      {hasHeader && (
        <div className="w-full px-12">
          <div className={`flex flex-col gap-8 ${heading ? "md:flex-row md:items-end md:justify-between" : "md:items-end md:justify-end"}`}>
            {heading ? (
              <h2 className="type-section-heading type-display-dark reveal">
                {heading}
              </h2>
            ) : null}

            {showViewAllLink && (
              <Link
                to="/projects"
                className="reveal inline-flex h-11 items-center justify-center self-start rounded-full border border-border px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-accent md:self-auto"
              >
                View all projects
              </Link>
            )}
          </div>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="mt-12 w-full px-12">
          <p className="type-body type-body-dark">
            New projects coming soon.
          </p>
        </div>
      )}

      <div className={gridClasses}>
        {displayItems.map((project) => {
          const imageUrl = project.after_image_url ?? project.before_image_url;

          return (
            <article key={project.id} className="reveal group relative overflow-hidden bg-secondary">
              <div className="aspect-[4/3] w-full overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="type-kicker flex h-full w-full items-center justify-center bg-[#e9e9ec] text-black/35">
                    Image placeholder
                  </div>
                )}
              </div>
              {project.title && (
                <div className="absolute inset-0 flex items-end bg-black/0 p-8 text-white opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:bg-black/62 md:group-hover:opacity-100">
                  <div>
                    <h3 className="type-card-title mt-2 text-white">{project.title}</h3>
                    {showCardProjectsLink && (
                      <Link
                        to="/projects"
                        className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-white/70 bg-white px-5 text-[14px] font-medium text-[#1a1a18] transition-colors hover:bg-white/90"
                      >
                        See projects
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
