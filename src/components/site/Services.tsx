import { Link } from "@tanstack/react-router";
import accentWallImage from "@/images/accent-wall.webp";
import bathroomImage from "@/images/bathroom-service.webp";
import remodelImage from "@/images/full_remodel.webp";
import kitchenImage from "@/images/kitchen.webp";
import waterFiltrationImage from "@/images/water-filtration.webp";

type ServiceItem = {
  to: string;
  title: string;
  description: string;
  theme: "dark" | "light";
  image: string;
  minHeight?: string;
};

const PRIMARY_ITEMS: ServiceItem[] = [
  {
    to: "/kitchen",
    title: "Kitchen Renovation",
    description: "",
    theme: "dark",
    image: kitchenImage,
    minHeight: "min-h-[460px]",
  },
  {
    to: "/bathroom",
    title: "Bathroom Renovation",
    description: "",
    theme: "light",
    image: bathroomImage,
    minHeight: "min-h-[460px]",
  },
];

const SECONDARY_ITEMS: ServiceItem[] = [
  {
    to: "/water-filtration",
    title: "Water Filtration & Softening Systems",
    description: "Cleanly integrated water treatment upgrades planned around your home's plumbing and daily use.",
    theme: "dark",
    image: waterFiltrationImage,
    minHeight: "min-h-[360px]",
  },
  {
    to: "/accent-wall",
    title: "Accent Wall Installation",
    description: "Feature walls with trim, texture, or panel details that sharpen the room without a full remodel.",
    theme: "light",
    image: accentWallImage,
    minHeight: "min-h-[360px]",
  },
];

function ServiceCard({ item }: { item: ServiceItem }) {
  const isDark = item.theme === "dark";
  const overlayClass = isDark ? "bg-black/32" : "bg-white/18";
  const bgClass = isDark ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]";
  const primaryBtnClass = isDark ? "bg-white text-[#1d1d1f]" : "bg-[#1d1d1f] text-white";
  const secondaryBtnClass = isDark
    ? "border-white/30 text-white hover:bg-white/8"
    : "border-black/20 text-[#1d1d1f] hover:bg-black/5";

  return (
    <article className={`group relative flex overflow-hidden ${item.minHeight ?? ""} ${bgClass}`}>
      <Link to={item.to} aria-label={item.title} className="absolute inset-0 z-0" />
      <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="pointer-events-none relative z-10 flex w-full items-center justify-center p-8 md:p-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="type-section-heading text-inherit">{item.title}</h3>
          {item.description && (
            <p className={`type-body mt-3 max-w-md ${isDark ? "text-white/70" : "text-black/55"}`}>
              {item.description}
            </p>
          )}
          <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={item.to}
              className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-[14px] font-medium ${primaryBtnClass}`}
            >
              Get a quote
            </Link>
            <Link
              to="/projects"
              className={`inline-flex h-11 items-center justify-center rounded-full border px-5 text-[14px] font-medium transition-opacity hover:opacity-80 ${secondaryBtnClass}`}
            >
              See projects
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="section-divider bg-[#eadfce]">
      <div className="grid gap-[10px] bg-white p-[10px] md:grid-cols-2">
        {PRIMARY_ITEMS.map((item) => (
          <ServiceCard key={item.title} item={item} />
        ))}
      </div>

      <div className="grid gap-[10px] bg-white px-[10px] pb-[10px] md:grid-cols-2">
        {SECONDARY_ITEMS.map((item) => (
          <ServiceCard key={item.title} item={item} />
        ))}
      </div>

      {/* Full-width remodel feature */}
      <article className="group relative flex min-h-[500px] overflow-hidden bg-[#1d1d1f] text-white md:col-span-2">
        <Link to="/full-remodel" aria-label="Full Remodel" className="absolute inset-0 z-0" />
        <img src={remodelImage} alt="Full Remodel" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-18 text-center md:px-10">
          <p className="type-kicker text-[#f1c7b8]">Whole-home transformation</p>
          <h3 className="type-section-heading type-display-light mt-5">Full Remodel</h3>
          <p className="type-slogan type-slogan-light mt-4 max-w-2xl">
            Turnkey transformations of your entire home, on schedule and on budget.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[14px] font-medium text-[#1d1d1f]"
            >
              Request estimate
            </Link>
            <Link
              to="/projects"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-[14px] font-medium text-white transition-colors hover:bg-white/8"
            >
              See projects
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
