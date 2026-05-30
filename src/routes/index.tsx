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
import { PromoPopup } from "@/components/site/PromoPopup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mag System Inc — Kitchen & Bathroom Renovation in Manatee & Sarasota, FL" },
      {
        name: "description",
        content:
          "Stress-free kitchen and bathroom renovation, tile, flooring, and handyman services in Manatee County and Sarasota County, Florida. Free estimate. Work done by owners on-site.",
      },
      { property: "og:title", content: "Mag System Inc — Kitchen & Bathroom Renovation in Manatee & Sarasota, FL" },
      {
        property: "og:description",
        content:
          "Stress-free renovation in Manatee County and Sarasota County, Florida. Kitchen, bathroom, tile, flooring, and handyman — all work handled on-site by the owners.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mag System Inc — Kitchen & Bathroom Renovation in Manatee & Sarasota, FL" },
      {
        name: "twitter:description",
        content: "Stress-free renovation in Manatee County and Sarasota County, Florida.",
      },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/" }],
  }),
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
        <Projects
          compactTopSpacing
          compactBottomSpacing
          showCardProjectsLink
          carousel
        />
        <Testimonial compactTopSpacing />
        <Stats />
        <FAQ />
        <Locations />
        <Contact />
      </main>
      <Footer />
      <PromoPopup />
    </>
  );
}
