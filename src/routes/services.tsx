import { Link, createFileRoute } from "@tanstack/react-router";
import { ContactCta } from "@/components/site/ContactCta";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { useReveal } from "@/hooks/use-reveal";

const primaryServices = [
  {
    title: "Kitchen renovation",
    description:
      "From planning and material selection to installation and finishing touches, we build kitchens around how you live every day.",
    to: "/kitchen",
    tone: "dark",
  },
  {
    title: "Bathroom renovation",
    description:
      "Modern layouts, precise tile work, updated fixtures, and clean detailing handled start to finish on-site.",
    to: "/bathroom",
    tone: "light",
  },
  {
    title: "Turnkey remodel",
    description:
      "From targeted upgrades to full-home execution, one team coordinates the work so the process stays clear and stress-free.",
    to: "/full-remodel",
    tone: "accent",
  },
];

const additionalServices = [
  {
    title: "Handyman service",
    description: "Reliable small repairs, finishing work, updates, and practical improvements that keep your home in shape.",
  },
  {
    title: "Tile installation",
    description: "Walls, floors, showers, and backsplashes installed with clean alignment, durable prep, and careful finishing.",
  },
  {
    title: "Flooring installation",
    description: "New flooring planned and installed to match the space, traffic, and finish level you want.",
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Mag System Inc" },
      {
        name: "description",
        content:
          "Explore renovation services from Mag System Inc in Manatee County and Sarasota County, Florida, including kitchens, bathrooms, turnkey remodels, tile, flooring, and handyman work.",
      },
      { property: "og:title", content: "Services — Mag System Inc" },
      {
        property: "og:description",
        content:
          "Kitchen renovation, bathroom renovation, turnkey remodels, tile installation, flooring installation, and handyman services in Manatee and Sarasota.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  useReveal();

  return (
    <>
      <Nav />
      <main className="bg-background">
        <section className="border-b border-border/60 px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-[1200px]">
            <p className="type-kicker type-kicker-muted reveal">
              Services
            </p>
            <h1 className="type-display type-display-dark reveal mt-5 max-w-4xl md:text-7xl">
              Renovation services designed to work as one clear process.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6 max-w-3xl">
              We serve Manatee County and Sarasota County, Florida with kitchen and bathroom renovation,
              turnkey remodel execution, tile installation, flooring installation, and dependable handyman work.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-3">
            {primaryServices.map((service) => {
              const isDark = service.tone === "dark";
              const isAccent = service.tone === "accent";

              return (
                <Link
                  key={service.title}
                  to={service.to}
                  className={`reveal flex min-h-[340px] flex-col justify-between rounded-[30px] p-8 transition-transform duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "bg-[#1d1d1f] text-white"
                      : isAccent
                        ? "bg-primary text-primary-foreground"
                        : "bg-[#f5f5f7] text-[#1d1d1f]"
                  }`}
                >
                  <div>
                    <p
                      className={`type-kicker ${
                        isDark || isAccent ? "text-white/60" : "text-black/45"
                      }`}
                    >
                      Core service
                    </p>
                    <h2 className="type-card-title mt-8">{service.title}</h2>
                    <p
                      className={`type-body mt-4 ${
                        isDark || isAccent ? "text-white/72" : "text-black/60"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                  <span
                    className={`mt-8 inline-flex h-11 items-center text-sm font-medium ${
                      isDark || isAccent ? "text-white" : "text-[#1d1d1f]"
                    }`}
                  >
                    View service
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="px-6 pb-16 md:px-12 md:pb-20">
          <div className="mx-auto max-w-[1200px] rounded-[34px] bg-[#f5f5f7] px-6 py-8 md:px-8 md:py-10">
            <div className="reveal flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <p className="type-kicker type-kicker-muted">
                  Additional services
                </p>
                <h2 className="type-card-title mt-4 text-foreground">
                  Smaller scopes, finishing work, and specialty installation.
                </h2>
              </div>
              <ContactCta variant="outline" className="border-black/15 px-5 text-sm text-foreground hover:bg-white">
                Get a quote
              </ContactCta>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {additionalServices.map((service) => (
                <article key={service.title} className="reveal rounded-[26px] bg-white px-5 py-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{service.title}</h3>
                  <p className="type-body type-body-dark mt-3 text-sm leading-6">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}