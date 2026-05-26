import { Button } from "@/components/site/Button";
import { ContactCta } from "@/components/site/ContactCta";

const items = [
  {
    number: "01",
    title: "Personally On-Site Every Day",
    text:
      "We're not just contractors — we personally carry out all the work on-site. From tile installation to furniture assembly, quality control is ensured at every stage. You can trust us to work as if we were designing for our own home.",
  },
  {
    number: "02",
    title: "Comprehensive Solutions",
    text:
      "We offer a full range of services. You won't need to look for specialists in different areas, source materials, or worry about running out of supplies. Everything will be handled efficiently and seamlessly.",
  },
  {
    number: "03",
    title: "Wide Range of Materials & Expert Guidance",
    text:
      "We provide a guarantee on both the materials and the work performed, ensuring top-notch results every time.",
  },
  {
    number: "04",
    title: "Free Consultation & On-Site Assessment",
    text:
      "Within Manatee County and Sarasota County, we offer a free on-site visit for measurements, cost estimation, and consultation. You'll receive precise information before the work begins — no surprises, just clarity.",
  },
];

export function WhyMagSystem() {
  return (
    <section className="section-divider border-t-[10px] border-white bg-[#1d1d1f]">
      <div className="px-8 py-8 md:px-12 md:py-10">
        <div className="mx-auto max-w-[960px]">
          <div className="flex flex-col items-center text-center">
            <h2 className="type-section-heading type-display-light reveal mt-3">
              Where Professionalism Meets <span className="text-[#ff4e27]">MAGic</span>
            </h2>
            <p className="type-slogan type-slogan-light reveal mt-3 max-w-2xl">
              We work as if it's for ourselves — attention to every detail
            </p>
            <div className="section-pills reveal mt-6">
              <Button href="/#projects" className="border border-[#c0583a] bg-[#c0583a] text-white hover:bg-[#a54a31]">
                See our work
              </Button>
              <ContactCta variant="outline" className="border-white/30 text-white hover:bg-white/8">
                Get a free consultation
              </ContactCta>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-[5px] bg-white p-[5px] md:grid-cols-2">
          {items.map((item) => (
            <div key={item.number} className="bg-[#1d1d1f] p-8 md:p-10">
              <p className="type-kicker type-kicker-accent">{item.number}</p>
              <h3 className="type-card-title mt-4 text-white">{item.title}</h3>
              <p className="type-body type-body-light mt-4 max-w-[34rem]">{item.text}</p>
            </div>
          ))}
      </div>
    </section>
  );
}