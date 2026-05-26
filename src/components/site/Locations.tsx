import { ContactCta } from "@/components/site/ContactCta";

const serviceAreaLines = [
  ["Sarasota", "Siesta Key"],
  ["Longboat Key", "Lakewood Ranch"],
  ["Bradenton", "Palmetto"],
  ["Osprey", "Nokomis", "Venice"],
];

export function Locations() {
  return (
    <section id="service-areas" className="bg-[#1d1d1f] px-6 py-[120px] md:px-12">
      <div className="mx-auto max-w-[1200px] text-center">
        <h2 className="type-section-heading type-display-light reveal mt-4">
          We come to you.
        </h2>

        <div className="reveal mt-12 text-center text-[32px] font-light leading-[1.8] text-white md:mt-16 md:text-[56px]">
          {serviceAreaLines.map((line, index) => (
            <p key={index}>
              {line.map((city, cityIndex) => (
                <span key={city}>
                  {cityIndex > 0 && <span className="px-[0.35em] text-[#ff4e27]">&middot;</span>}
                  <span>{city}</span>
                </span>
              ))}
            </p>
          ))}
        </div>

        <p className="type-slogan type-slogan-light reveal mt-10 italic">
          and surrounding areas
        </p>

        <ContactCta className="reveal mt-8 px-5 text-sm hover:bg-[#e74824]">
          Check if we serve your area →
        </ContactCta>
      </div>
    </section>
  );
}