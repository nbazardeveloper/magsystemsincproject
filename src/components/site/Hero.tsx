import { Button } from "./Button";
import { ContactCta } from "./ContactCta";
import heroImage from "@/images/hero.webp";
import mobileHeroImage from "@/images/hero-mobil.webp";

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-background">
      <img
        src={mobileHeroImage}
        alt="hero bathtub"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      />
      <img
        src={heroImage}
        alt="hero bathtub"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
        <h1 className="type-display type-display-dark reveal md:text-7xl">
          Kitchen & Bath.
          <br />
          Reimagined.
        </h1>
        <p className="type-slogan reveal mt-6 max-w-[34rem] px-6 text-foreground/85 md:px-0">
          Where renovation becomes MAGic.
          <br />
          Serving Manatee County & Sarasota County, Florida.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <ContactCta className="border border-accent-brand bg-accent-brand text-white hover:bg-accent-brand-hover">
            Get a quote
          </ContactCta>
          <Button href="/#projects" variant="outline" className="border-foreground/25 text-foreground hover:bg-foreground/6">See our work</Button>
        </div>
      </div>
    </section>
  );
}
