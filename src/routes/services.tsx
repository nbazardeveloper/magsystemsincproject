import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ContactCta } from "@/components/site/ContactCta";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { useReveal } from "@/hooks/use-reveal";
import accentWallImage from "@/images/accent-wall.webp";
import assemblyInstallationImage from "@/images/assembly_installation.webp";
import bathroomImage from "@/images/bathroom-service.webp";
import fullRemodelImage from "@/images/full_remodel.webp";
import homeImprovementsImage from "@/images/home_improvements.webp";
import kitchenImage from "@/images/kitchen.webp";
import repairsMaintenanceImage from "@/images/repairs_maintenance.webp";
import waterFiltrationImage from "@/images/water-filtration.webp";
import spaBathroomImage from "@/images/spa-bathroom.webp";

type ServiceSection = {
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  pageTo?: string;
  quizTo?: string; // when set — primary button says "Get a quote" and links here
};

const services: ServiceSection[] = [
  {
    title: "Kitchen Renovation",
    eyebrow: "Planned around daily use",
    description:
      "Full-service kitchen renovation from planning and material selection to installation and finishing. The goal is a kitchen that feels clean, current, and built around how you actually live.",
    bullets: [
      "Flooring, plumbing, cabinets, lighting, and surface updates managed as one coordinated scope.",
      "A balance of aesthetics and function so the layout works as well as it looks.",
      "Old fixtures removal, installation, finishing details, and cleanup handled on-site.",
    ],
    image: kitchenImage,
    imageAlt: "Kitchen renovation service",
    quizTo: "/kitchen",
  },
  {
    title: "Bathroom Renovation",
    eyebrow: "Comfort, detail, and durability",
    description:
      "Modern bathroom renovation with precise tile work, updated fixtures, lighting, and clean finishing details. Each decision is aimed at making the room easier to use and better to live with every day.",
    bullets: [
      "Tile, plumbing fixtures, lighting, vanity work, and finish updates completed as one process.",
      "Careful detailing in wet areas, edges, transitions, and material alignment.",
      "A fully updated bathroom delivered with practical layouts and a polished finish.",
    ],
    image: bathroomImage,
    imageAlt: "Bathroom renovation service",
    quizTo: "/bathroom",
  },
  {
    title: "Water Filtration & Softening Systems",
    eyebrow: "Cleaner water throughout the home",
    description:
      "Water treatment upgrades designed to improve daily water quality, protect fixtures, and support the way your home is actually used. We plan the installation cleanly around the existing plumbing and equipment layout.",
    bullets: [
      "Whole-home filtration and softening solutions matched to the needs of the property.",
      "Installations planned to stay accessible, serviceable, and visually clean.",
      "A practical upgrade for water quality, fixture longevity, and everyday comfort.",
    ],
    image: waterFiltrationImage,
    imageAlt: "Water filtration and softening system service",
    quizTo: "/water-filtration",
  },
  {
    title: "Accent Wall Installation",
    eyebrow: "Targeted visual upgrade",
    description:
      "Accent wall installation for homeowners who want a room to feel sharper without committing to a full remodel. We create focused feature surfaces that bring more structure, texture, and character into the space.",
    bullets: [
      "Trim, panel, texture, and finish-forward wall concepts tailored to the room.",
      "A fast way to add depth and visual interest to living rooms, bedrooms, offices, or entry areas.",
      "Installed with clean lines and finishing details that make the feature feel intentional.",
    ],
    image: accentWallImage,
    imageAlt: "Accent wall installation service",
    quizTo: "/accent-wall",
  },
  {
    title: "Handyman Service",
    eyebrow: "Everyday home tasks",
    description:
      "A practical all-in-one service for busy homeowners who do not want to spend weekends on minor repairs, mounting, assembly, and finish work. We handle the small jobs that keep your home working and looking right.",
    bullets: [
      "Drywall patching, painting touch-ups, door and window repairs, and hardware adjustments.",
      "Furniture assembly, TV wall mounting, shelving, blinds, light fixtures, and appliance hookups.",
      "Trim work, vanity and mirror installation, backsplash updates, and small carpentry improvements.",
    ],
    image: assemblyInstallationImage,
    imageAlt: "Handyman repairs and maintenance service",
    pageTo: "/handyman",
  },
  {
    title: "Tile Installation",
    eyebrow: "Walls, floors, showers, backsplashes",
    description:
      "Professional tile installation for kitchens, bathrooms, hallways, walls, and floors. The work is planned for durability, clean alignment, and a finished look that holds up in everyday use.",
    bullets: [
      "Ceramic, porcelain, mosaic, stone, and other tile types installed with attention to layout and style.",
      "Level surfaces, precise joints, and careful finishing even in more difficult areas.",
      "Selections guided by your interior style, technical conditions, and budget.",
    ],
    image: spaBathroomImage,
    imageAlt: "Tile installation service",
    pageTo: "/tile",
  },
  {
    title: "Flooring Installation",
    eyebrow: "Built for traffic and finish level",
    description:
      "Flooring installation matched to your interior, wear level, and budget. We help choose the right material, prepare the base correctly, and finish the floor so it looks clean and lasts.",
    bullets: [
      "Wood-look tile, vinyl, laminate, and other flooring options installed professionally.",
      "Material guidance based on style, foot traffic, maintenance, and cost.",
      "Base levelling, technical prep, installation, and finishing handled with precision.",
    ],
    image: homeImprovementsImage,
    imageAlt: "Flooring installation service",
    pageTo: "/flooring",
  },
  {
    title: "Full Remodel",
    eyebrow: "Turnkey execution",
    description:
      "A comprehensive remodel where one team coordinates the work from first measurements to final touch-ups. This is the clearest path for larger projects that need planning, sequencing, and consistent on-site execution.",
    bullets: [
      "On-site visit, measurements, planning, material selection, and staged execution.",
      "Renovation scopes coordinated without forcing you to manage multiple trades separately.",
      "A stress-reduced process focused on timeline clarity, finish quality, and clean delivery.",
    ],
    image: fullRemodelImage,
    imageAlt: "Full remodel service",
    pageTo: "/full-remodel",
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Mag System Inc" },
      {
        name: "description",
        content:
          "Explore handyman work, kitchen and bathroom renovation, tile, flooring, water filtration, accent walls, and full remodel services from Mag System Inc in Manatee County and Sarasota County, Florida.",
      },
      { property: "og:title", content: "Renovation Services in Manatee & Sarasota — Mag System Inc" },
      {
        property: "og:description",
        content:
          "Kitchen, bathroom, tile, flooring, handyman, and full remodel services from Mag System Inc in Manatee County and Sarasota County, Florida.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/services" }],
  }),
  component: ServicesPage,
});

const QUIZ_SERVICES = [
  { label: "Kitchen Renovation", to: "/kitchen" },
  { label: "Bathroom Renovation", to: "/bathroom" },
  { label: "Water Filtration", to: "/water-filtration" },
  { label: "Accent Wall", to: "/accent-wall" },
] as const;

function QuizPickerModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const pick = (to: string) => {
    onClose();
    navigate({ to });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl bg-background p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
        <h3 className="text-[18px] font-bold text-foreground">Choose your service</h3>
        <p className="mt-1 text-[13px] text-muted-foreground">We'll take you to a short quiz to get your estimate.</p>
        <div className="mt-6 grid gap-3">
          {QUIZ_SERVICES.map((s) => (
            <button
              key={s.to}
              type="button"
              onClick={() => pick(s.to)}
              className="w-full rounded-xl border-2 border-border px-5 py-4 text-left text-[15px] font-medium text-foreground transition-all hover:border-foreground/40 hover:bg-secondary/50"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  useReveal();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <Nav />
      {pickerOpen && <QuizPickerModal onClose={() => setPickerOpen(false)} />}
      <main className="bg-background">
        <section className="border-b border-border/50 bg-[#f3ecdf] px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-[1200px]">
            <p className="type-kicker reveal text-[#7d5a44]">Services</p>
            <h1 className="type-display type-display-dark reveal mt-5 max-w-5xl md:text-7xl">
              Stress-free renovation and home improvement, arranged as one clear process.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6 max-w-3xl">
              We serve Manatee County and Sarasota County, Florida with hands-on work carried out on-site. From handyman tasks and installation work to kitchen, bathroom, and full remodel scopes, each service is planned to stay practical, organized, and finish strong.
            </p>
            <div className="reveal mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="btn-shimmer inline-flex h-11 items-center justify-center rounded-full px-6 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Take a short quiz — save $1,000
              </button>
              <ContactCta variant="outline" className="border-foreground/20 px-6 text-[14px] text-foreground hover:bg-black/5">
                Request estimate
              </ContactCta>
            </div>
          </div>
        </section>

        {services.map((service, index) => {
          const reverse = index % 2 === 1;

          return (
            <section
              key={service.title}
              className={`border-b border-border/40 ${index % 2 === 0 ? "bg-white" : "bg-[#f7f3eb]"}`}
            >
              <div className="grid min-h-[680px] lg:grid-cols-2">
                <div className={`reveal flex items-center ${reverse ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="w-full px-6 py-14 md:px-12 md:py-18 lg:px-16 xl:px-20">
                    <p className="type-kicker text-[#8a674f]">{service.eyebrow}</p>
                    <h2 className="type-display type-display-dark mt-5 text-4xl md:text-6xl">
                      {service.title}
                    </h2>
                    <p className="type-slogan type-slogan-dark mt-6 max-w-2xl text-base md:text-lg">
                      {service.description}
                    </p>
                    <div className="mt-8 space-y-4">
                      {service.bullets.map((bullet) => (
                        <div key={bullet} className="flex gap-3 text-left">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d08f73]" />
                          <p className="type-body type-body-dark leading-7 text-foreground/80">{bullet}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 flex flex-wrap gap-3">
                      {service.quizTo ? (
                        <>
                          <Link
                            to={service.quizTo}
                            className="inline-flex h-11 items-center justify-center rounded-full bg-[#1d1d1f] px-6 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                          >
                            Get a quote
                          </Link>
                          <ContactCta variant="outline" className="border-black/15 px-6 text-[14px] text-foreground hover:bg-black/5">
                            Request estimate
                          </ContactCta>
                        </>
                      ) : (
                        <ContactCta className="px-6 text-[14px]">Request estimate</ContactCta>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`reveal relative min-h-[340px] overflow-hidden lg:min-h-[680px] ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                  <img src={service.image} alt={service.imageAlt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
            </section>
          );
        })}

        <section className="bg-[#1d1d1f] px-6 py-16 text-white md:px-12 md:py-20">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="type-kicker text-[#f1c7b8]">Consultation</p>
              <h2 className="type-display type-display-light mt-5 text-4xl md:text-6xl">
                Tell us the scope. We will help define the cleanest path forward.
              </h2>
              <p className="type-slogan type-slogan-light mt-6 max-w-2xl">
                We offer on-site consultation, measurements, and estimate guidance across Manatee County and Sarasota County, Florida.
              </p>
            </div>
            <ContactCta className="px-6 text-[14px]">Get a price estimate</ContactCta>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}