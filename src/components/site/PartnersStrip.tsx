const partners = [
  {
    name: "Floor & Decor",
    logoUrl:
      "https://www.flooranddecor.com/on/demandware.static/Sites-floor-decor-Site/-/default/dw695f1799/img/default.svg",
    logoClassName: "max-w-[168px]",
  },
  {
    name: "Benjamin Moore",
    logoUrl:
      "https://assets.benjaminmoore.com/transform/0caa7c4e-fbe1-4265-86b8-7f3fa9257d1f/BM_Logo_Black-png",
    logoClassName: "max-w-[164px]",
  },
  {
    name: "Sherwin-Williams",
    logoUrl:
      "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-logo-header-up?scl=1&fmt=png-alpha",
    logoClassName: "max-w-[170px]",
  },
  {
    name: "CabinetsHQ",
    logoUrl:
      "https://cabinetshq.com/cdn/shop/files/logo_logo-color.webp?v=1708028856&width=360",
    logoClassName: "max-w-[156px]",
  },
  {
    name: "Lowe's",
    logoUrl: "https://logos-world.net/wp-content/uploads/2021/03/Lowes-Logo-700x394.png",
    logoClassName: "max-w-[148px]",
  },
];

const marqueePartners = [...partners, ...partners];

export function PartnersStrip() {
  return (
    <section className="overflow-hidden bg-white pb-0 pt-0">
      <div className="hidden md:block">
        <ul className="reveal grid w-full grid-cols-5 gap-[5px] bg-white px-[5px]" aria-label="Trusted material partners">
          {partners.map((partner, index) => (
            <li
              key={partner.name}
              className={`group flex min-h-[140px] items-center justify-center px-8 py-10 transition-all duration-400 ease-out ${
                index % 2 === 0 ? "bg-[#f5f5f7]" : "bg-[#fbfbfc]"
              } hover:bg-[#efeff1]`}
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className={`trust-logo h-auto w-full object-contain opacity-60 transition-all duration-400 ease-out group-hover:opacity-100 ${partner.logoClassName}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal overflow-hidden md:hidden" aria-label="Trusted material partners">
        <div className="trust-marquee-track flex w-max gap-[5px] bg-white pl-[5px]">
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className={`group flex min-h-[108px] min-w-[220px] items-center justify-center px-8 py-8 transition-all duration-400 ease-out ${
                index % 2 === 0 ? "bg-[#f5f5f7]" : "bg-[#fbfbfc]"
              } hover:bg-[#efeff1]`}
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className={`trust-logo h-auto w-full object-contain opacity-60 transition-all duration-400 ease-out group-hover:opacity-100 ${partner.logoClassName}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}