import { Link } from "@tanstack/react-router";
import { ContactCta } from "@/components/site/ContactCta";
import bathroomImage from "@/images/bathroom-service.webp";
import remodelImage from "@/images/full_remodel.webp";
import kitchenImage from "@/images/kitchen.webp";

const items = [
  {
    to: "/kitchen",
    title: "Kitchen Renovation",
    description: "",
    theme: "dark",
    image: kitchenImage,
  },
  {
    to: "/bathroom",
    title: "Bathroom Renovation",
    description: "",
    theme: "light",
    image: bathroomImage,
  },
];

const remodelItem = {
  to: "/full-remodel",
  title: "Full Remodel",
  description: "Turnkey transformations of your entire home, on schedule and on budget.",
  image: remodelImage,
};

export function Services() {
  return (
    <section id="services" className="section-divider bg-[#eadfce]">
      <div className="grid gap-[10px] bg-white p-[10px] md:grid-cols-2">
        {items.map((item) => {
          const isDark = item.theme === "dark";

          return (
            <article
              key={item.to}
              className={`group relative flex min-h-[460px] overflow-hidden ${
                isDark ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"
              }`}
            >
              <Link
                to={item.to}
                aria-label={item.title}
                className="absolute inset-0 z-0"
              />
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className={`absolute inset-0 ${isDark ? "bg-black/32" : "bg-white/18"}`} />
              <div className="relative z-10 flex w-full items-center justify-center p-8 md:p-10 pointer-events-none">
                <div className="flex flex-col items-center justify-center text-center">
                  <h3 className="type-section-heading text-inherit">{item.title}</h3>
                  {item.description ? (
                    <p className={`type-body mt-3 max-w-md ${isDark ? "text-white/70" : "text-black/55"}`}>
                      {item.description}
                    </p>
                  ) : null}
                  <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/projects"
                      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-[14px] font-medium ${
                        isDark ? "bg-white text-[#1d1d1f]" : "bg-[#1d1d1f] text-white"
                      }`}
                    >
                      See projects
                    </Link>
                    <Link
                      to={item.to}
                      className={`inline-flex h-11 items-center justify-center rounded-full border px-5 text-[14px] font-medium transition-opacity hover:opacity-80 ${
                        isDark ? "border-white/30 text-white" : "border-black/20 text-[#1d1d1f]"
                      }`}
                    >
                      Get a quote
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <article className="group relative flex min-h-[500px] overflow-hidden bg-[#1d1d1f] text-white md:col-span-2">
        <Link to={remodelItem.to} aria-label={remodelItem.title} className="absolute inset-0 z-0" />
        <img src={remodelItem.image} alt={remodelItem.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-18 text-center md:px-10">
          <p className="type-kicker text-[#f1c7b8]">Whole-home transformation</p>
          <h3 className="type-section-heading type-display-light mt-5">{remodelItem.title}</h3>
          <p className="type-slogan type-slogan-light mt-4 max-w-2xl">{remodelItem.description}</p>
          <Link to="/projects" className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[14px] font-medium text-[#1d1d1f]">
            See projects
          </Link>
        </div>
      </article>
    </section>
  );
}
