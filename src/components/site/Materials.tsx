import { Button } from "@/components/site/Button";
import { ContactCta } from "@/components/site/ContactCta";
import assemblyInstallationImage from "@/images/assembly_installation.webp";
import homeImprovementsImage from "@/images/home_improvements.png";
import repairsMaintenanceImage from "@/images/repairs_maintenance.webp";

const items = [
  {
    number: "01",
    title: "Repairs & Maintenance",
    image: repairsMaintenanceImage,
    points: [
      "Drywall patching and painting",
      "Door and window repairs",
      "Lock and hinge adjustments",
    ],
  },
  {
    number: "02",
    title: "Home Improvements",
    image: homeImprovementsImage,
    points: [
      "Kitchen and bathroom updates",
      "Backslash installation",
      "Vanity and mirror installation",
      "Trim and moulding work",
      "Small carpentry projects",
    ],
  },
  {
    number: "03",
    title: "Assembly & Installation",
    image: assemblyInstallationImage,
    points: [
      "Furniture assembly",
      "TV wall mounting",
      "Light fixture replacement",
      "Curtain rod and blind installation",
      "Shelf and storage system mounting",
      "Appliance hookups",
    ],
  },
];

export function Materials() {
  return (
    <section className="section-divider bg-[#f5f2ee]">
      <div className="px-8 pb-12 pt-20 md:px-12 md:pb-8">
        <div className="section-heading mx-auto max-w-[900px]">
          <h2 className="type-section-heading type-display-dark reveal">
            Handyman service.
          </h2>
          <p className="type-slogan type-slogan-dark reveal max-w-2xl">
            We&apos;ll take care of it for you! Your all-in-one home helper — from minor repairs to furniture assembly.
          </p>
          <div className="section-pills reveal">
            <ContactCta className="border border-accent-brand bg-accent-brand text-white hover:bg-accent-brand-hover">
              Get a quote
            </ContactCta>
            <Button href="/#projects" variant="outline" className="border-foreground/18 text-foreground hover:bg-white/50">
              See our work
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-[5px] bg-white md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="reveal bg-[#f5f2ee]">
            <div className="h-[280px] w-full overflow-hidden">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 px-7 pb-10 pt-8">
              <p className="type-kicker type-kicker-accent">{item.number}</p>
              <h3 className="type-body font-bold text-foreground">{item.title}</h3>
              <ul className="flex flex-col gap-2 text-[13px] leading-relaxed text-muted-foreground">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="shrink-0 text-accent-brand">–</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
