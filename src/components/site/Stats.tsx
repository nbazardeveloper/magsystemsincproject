const STATS = [
  { value: "500+", label: "Projects" },
  { value: "5", label: "Year Warranty" },
  { value: "30", label: "Days Average" },
];

export function Stats() {
  return (
    <section id="about" className="section-divider bg-[#1d1d1f] text-white">
      <div className="px-8 pb-10 pt-16 text-center md:px-12 md:pb-8 md:pt-18">
        <div className="mx-auto max-w-[780px]">
          <h2 className="type-section-heading type-display-light reveal">Built on consistency.</h2>
          <p className="type-slogan type-slogan-light reveal mt-3 mx-auto max-w-2xl">
            Numbers that reflect speed, accountability, and finished work that holds up.
          </p>
        </div>
      </div>

      <div className="grid gap-[5px] bg-white p-[5px] md:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="reveal bg-[#1d1d1f] px-8 py-12 text-center md:py-14">
            <div className="text-6xl font-semibold tracking-tight md:text-7xl">{s.value}</div>
            <div className="type-kicker mt-3 text-white/55">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
