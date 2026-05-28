import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "@/hooks/use-reveal";

type Project = {
  id: string;
  title: string | null;
  location: string;
  description: string | null;
  after_image_url: string | null;
  before_image_url: string | null;
  category: string;
};

export function Projects({
  category,
  heading,
  showViewAllLink = false,
  limitOnePerCategory = false,
  compactTopSpacing = false,
  compactBottomSpacing = false,
  topSpacingClassName,
  seamGrid = false,
  showCardProjectsLink = false,
  carousel = false,
  maxItems,
}: {
  category?: string;
  heading?: string;
  showViewAllLink?: boolean;
  limitOnePerCategory?: boolean;
  compactTopSpacing?: boolean;
  compactBottomSpacing?: boolean;
  topSpacingClassName?: string;
  seamGrid?: boolean;
  showCardProjectsLink?: boolean;
  carousel?: boolean;
  maxItems?: number;
}) {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
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
  const visibleItems = typeof maxItems === "number" ? displayItems.slice(0, maxItems) : displayItems;

  const hasHeader = Boolean(heading || showViewAllLink);
  const gridTopSpacing = heading ? "mt-16" : showViewAllLink ? "mt-10" : "mt-0";
  const topSpacing = topSpacingClassName ?? (compactTopSpacing ? "pt-[10px]" : "pt-24 md:pt-28");
  const sectionSpacing = compactTopSpacing || compactBottomSpacing || topSpacingClassName
    ? `${topSpacing} ${compactBottomSpacing ? "pb-0" : "pb-24 md:pb-28"}`
    : "py-24 md:py-28";
  const gridClasses = seamGrid
    ? `${gridTopSpacing} grid gap-[10px] bg-white px-[10px] pb-[10px] md:grid-cols-2`
    : `${gridTopSpacing} grid md:grid-cols-2`;

  const scrollCarousel = (direction: "prev" | "next") => {
    const node = carouselRef.current;
    if (!node) return;
    const cards = Array.from(node.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Container has padding-left: 10px; each card's snap position is
    // card.offsetLeft minus that padding so it aligns with the scroll port.
    const paddingLeft = parseFloat(getComputedStyle(node).paddingLeft) || 0;

    // Determine which card is currently "active" (its snap position ≤ scrollLeft + tolerance)
    const currentScroll = node.scrollLeft;
    let currentIndex = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].offsetLeft - paddingLeft <= currentScroll + 2) {
        currentIndex = i;
      }
    }

    const targetIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, cards.length - 1)
        : Math.max(currentIndex - 1, 0);

    node.scrollTo({ left: cards[targetIndex].offsetLeft - paddingLeft, behavior: "smooth" });
  };

  return (
    <section id="projects" className={`bg-background ${sectionSpacing}`}>
      {hasHeader && (
        <div className="section-inner">
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
        <div className="mt-12 w-full px-6 md:px-12">
          <p className="type-body type-body-dark">
            New projects coming soon.
          </p>
        </div>
      )}

      {carousel ? (
        <div className={`${gridTopSpacing} px-6 md:px-12`}>
          <div className="relative">
            <button
              type="button"
              aria-label="Previous projects"
              onClick={() => scrollCarousel("prev")}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition-colors hover:bg-accent md:left-4"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next projects"
              onClick={() => scrollCarousel("next")}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition-colors hover:bg-accent md:right-4"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div
              ref={carouselRef}
              className="flex snap-x snap-proximity gap-[10px] overflow-x-auto bg-white p-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {visibleItems.map((project) => {
                const imageUrl = project.after_image_url ?? project.before_image_url;

                return (
                  <article
                    key={project.id}
                    className="group relative min-w-[88%] snap-start overflow-hidden bg-secondary md:min-w-[calc((100%-10px)/2)] xl:min-w-[calc((100%-30px)/4)]"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={project.title ?? "Project"}
                          loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="type-kicker flex h-full w-full items-center justify-center bg-[#e9e9ec] text-black/35">
                          Image placeholder
                        </div>
                      )}
                    </div>
                    {showCardProjectsLink ? (
                      <div className="absolute inset-0 flex items-end justify-end bg-black/0 p-6 opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:bg-black/45 md:group-hover:opacity-100">
                        <Link
                          to="/projects"
                          className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 bg-white px-5 text-[14px] font-medium text-[#1a1a18] transition-colors hover:bg-white/90"
                        >
                          See projects
                        </Link>
                      </div>
                    ) : project.title ? (
                      <div className="absolute inset-0 flex items-end bg-black/18 p-8 text-white transition-all duration-300 md:bg-black/0 md:group-hover:bg-black/62">
                        <div>
                          <h3 className="type-card-title mt-2 text-white">{project.title}</h3>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className={gridClasses}>
          {visibleItems.map((project) => {
            const imageUrl = project.after_image_url ?? project.before_image_url;

            return (
              <article key={project.id} className="reveal group relative overflow-hidden bg-secondary">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={project.title ?? "Project"}
                      loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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
      )}
    </section>
  );
}
