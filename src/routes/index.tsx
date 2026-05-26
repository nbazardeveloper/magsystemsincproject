import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyMagSystem } from "@/components/site/WhyMagSystem";
import { Materials } from "@/components/site/Materials";
import { PartnersStrip } from "@/components/site/PartnersStrip";
import { Projects } from "@/components/site/Projects";
import { Stats } from "@/components/site/Stats";
import { Testimonial } from "@/components/site/Testimonial";
import { Contact } from "@/components/site/Contact";
import { FAQ } from "@/components/site/FAQ";
import { Locations } from "@/components/site/Locations";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyMagSystem />
        <Materials />
        <PartnersStrip />
        <Projects limitOnePerCategory compactTopSpacing compactBottomSpacing seamGrid showCardProjectsLink />
        <Testimonial compactTopSpacing />
        <Stats />
        <FAQ />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
