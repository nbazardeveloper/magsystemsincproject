import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuiz } from "@/lib/leads.functions";
import bathroomClassicStyleImage from "@/images/quiz_bathroom/Classic-bathroom.webp";
import bathroomIndustrialStyleImage from "@/images/quiz_bathroom/Industrial-bathroom.webp";
import bathroomMinimalistStyleImage from "@/images/quiz_bathroom/minimalist-bathroom.webp";
import bathroomModernStyleImage from "@/images/quiz_bathroom/Modern-bathroom.webp";
import bathroomScandinavianStyleImage from "@/images/quiz_bathroom/Scandinavian-bathroom.webp";
import bathroomSpaStyleImage from "@/images/quiz_bathroom/spa-bathroom.webp";
import classicStyleImage from "@/images/quiz_kitchen/Classic.webp";
import contemporaryStyleImage from "@/images/quiz_kitchen/Contemporary.webp";
import industrialStyleImage from "@/images/quiz_kitchen/Industrial.webp";
import minimalistStyleImage from "@/images/quiz_kitchen/Minimalist.webp";
import modernStyleImage from "@/images/quiz_kitchen/Modern.webp";
import scandinavianStyleImage from "@/images/quiz_kitchen/Scandinavian.webp";
import kitchenOneWallImage from "@/images/quiz_kitchen/one-wall.webp";
import kitchenLShapeImage from "@/images/quiz_kitchen/L-shape.webp";
import kitchenUShapeImage from "@/images/quiz_kitchen/U-shape.webp";
import kitchenIslandImage from "@/images/quiz_kitchen/with-an-island.webp";
import accentGeometricImage from "@/images/quiz_accent/geometric.webp";
import accentNaturalImage from "@/images/quiz_accent/natural.webp";
import accentVenetianImage from "@/images/quiz_accent/venetian.webp";
import accentBoldImage from "@/images/quiz_accent/bold.webp";
import accentWoodImage from "@/images/quiz_accent/wood.webp";
import accentDecorativeImage from "@/images/quiz_accent/decorative.webp";
import accentStoneImage from "@/images/quiz_accent/stone.webp";
import accentTextureImage from "@/images/quiz_accent/texture.webp";
import { Button } from "./Button";

type Source = "kitchen" | "bathroom" | "full-remodel" | "accent-wall" | "water-filtration";
type StyleOption = {
  name: string;
  image?: string;
  placeholder?: boolean;
};

const KITCHEN_STYLE_OPTIONS: StyleOption[] = [
  { name: "Modern", image: modernStyleImage },
  { name: "Scandinavian", image: scandinavianStyleImage },
  { name: "Classic", image: classicStyleImage },
  { name: "Industrial", image: industrialStyleImage },
  { name: "Minimalist", image: minimalistStyleImage },
  { name: "Contemporary", image: contemporaryStyleImage },
  { name: "Not sure" },
];
const BATHROOM_STYLE_OPTIONS: StyleOption[] = [
  { name: "Modern", image: bathroomModernStyleImage },
  { name: "Scandinavian", image: bathroomScandinavianStyleImage },
  { name: "Classic", image: bathroomClassicStyleImage },
  { name: "Industrial", image: bathroomIndustrialStyleImage },
  { name: "Minimalist", image: bathroomMinimalistStyleImage },
  { name: "Spa / Zen", image: bathroomSpaStyleImage },
  { name: "Not sure yet" },
];
const ACCENT_WALL_STYLE_OPTIONS: StyleOption[] = [
  { name: "Modern / Geometric", image: accentGeometricImage },
  { name: "Natural / Wood panels", image: accentNaturalImage },
  { name: "Venetian plaster / Textured", image: accentVenetianImage },
  { name: "Bold / Statement", image: accentBoldImage },
  { name: "Not sure yet" },
];
const ACCENT_WALL_FINISH_OPTIONS: StyleOption[] = [
  { name: "Wood slats / Panels", image: accentWoodImage },
  { name: "Decorative plaster", image: accentDecorativeImage },
  { name: "Tile / Stone look", image: accentStoneImage },
  { name: "Paint with texture", image: accentTextureImage },
  { name: "Not sure" },
];

const DEFAULT_SIZES = ["Under 50 sq ft", "50–80 sq ft", "80–120 sq ft", "Over 120 sq ft"];
const KITCHEN_SIZES = ["Less than 150 sq ft", "150-180 sq ft", "180-210 sq ft", "More than 210 sq ft"];
const ACCENT_WALL_SIZES = ["Small (up to 8 ft wide)", "Medium (8–12 ft wide)", "Large (12+ ft wide)"];
const WATER_FILTRATION_PEOPLE = ["1–2 people", "3–4 people", "5 or more"];

const DEFAULT_SCOPE = ["Full remodel", "Just tile", "Plumbing", "Cabinets & vanity", "Shower / bathtub", "Lighting / mirror", "Other"];
const KITCHEN_LAYOUT_OPTIONS: StyleOption[] = [
  { name: "One-wall", image: kitchenOneWallImage },
  { name: "L-shape", image: kitchenLShapeImage },
  { name: "U-shape", image: kitchenUShapeImage },
  { name: "With an island", image: kitchenIslandImage },
  { name: "Not sure" },
];
const ACCENT_WALL_ROOMS = ["Living room", "Master bedroom", "Dining room", "Other room"];
const WATER_FILTRATION_CONCERNS = ["Taste and odor", "Hard water / scale buildup", "Health & safety / contaminants", "Full water quality improvement"];

const KITCHEN_MATERIALS = ["MDF", "Solid wood", "Laminate", "Acrylic", "Not sure yet"];
const WATER_FILTRATION_EXISTING = ["No, starting from scratch", "Yes, looking to upgrade", "Not sure"];

const TIMELINE = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring options"];
const WATER_FILTRATION_BUDGET = [
  "Under $1,000 (basic under-sink filter)",
  "$1,000 – $3,000 (mid-range system)",
  "$3,000 – $7,000 (whole-house filtration)",
  "$7,000+ (premium whole-house with softener)",
  "Not sure — need consultation",
];
const WATER_FILTRATION_SYSTEM_TYPES = [
  "Under-sink filter (kitchen)",
  "Whole-house filtration",
  "Reverse osmosis system",
  "Water softener",
  "Not sure — need advice",
];

export function Quiz({ source }: { source: Source }) {
  const submit = useServerFn(submitQuiz);
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [scope, setScope] = useState<string[]>([]);
  const [materials, setMaterials] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState("");

  const isKitchen = source === "kitchen";
  const isAccentWall = source === "accent-wall";
  const isWaterFiltration = source === "water-filtration";
  // bathroom and full-remodel keep their original 5-step flow
  const isLegacy = source === "bathroom" || source === "full-remodel";

  // kitchen, accent-wall, water-filtration = 6 steps; bathroom/full-remodel = 5
  const total = isLegacy ? 5 : 6;
  const contactStep = total - 1;
  const progress = ((step + 1) / total) * 100;

  const styleOptions =
    source === "bathroom"
      ? BATHROOM_STYLE_OPTIONS
      : isAccentWall
        ? ACCENT_WALL_STYLE_OPTIONS
        : KITCHEN_STYLE_OPTIONS;

  const toggleScope = (s: string) =>
    setScope((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  // ── canNext per step ──
  const canNext = () => {
    if (step === 0) return !!style;
    if (isLegacy) {
      if (step === 1) return !!size;
      if (step === 2) return scope.length > 0;
      if (step === 3) return !!timeline;
      return true;
    }
    if (isKitchen) {
      if (step === 1) return !!size;
      if (step === 2) return scope.length > 0;
      if (step === 3) return !!materials;
      if (step === 4) return !!timeline;
      return true;
    }
    if (isAccentWall) {
      if (step === 1) return scope.length > 0;
      if (step === 2) return !!size;
      if (step === 3) return !!materials;
      if (step === 4) return !!timeline;
      return true;
    }
    if (isWaterFiltration) {
      if (step === 1) return scope.length > 0;
      if (step === 2) return !!size;
      if (step === 3) return !!materials;
      if (step === 4) return !!timeline;
      return true;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!name || !phone) return;
    setStatus("sending");
    setErr("");
    try {
      await submit({ data: { name, phone, style, size, scope, materials, timeline, page_source: source } });
      setStatus("ok");
    } catch (e) {
      setStatus("err");
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  if (status === "ok") {
    return (
      <section className="bg-secondary/40 py-24 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 text-center md:px-12">
          <h2 className="type-section-heading type-display-dark">Thank you.</h2>
          <p className="type-slogan type-slogan-dark mt-4">
            Your estimate is on the way. We'll text you within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary/40 py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-12">
        <div className="text-center mb-12">
          <h2 className="type-section-heading type-display-dark">
            Answer {total} questions and find out the cost of your renovation
          </h2>
          <p className="type-slogan type-slogan-dark mt-3">
            Get a free custom design and a $1,000 discount.
          </p>
        </div>

        <div className="mb-10">
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="type-label type-label-muted mt-2 text-right">
            Step {step + 1} of {total}
          </div>
        </div>

        <div className="bg-background border border-border rounded-2xl p-8 md:p-12 min-h-[420px] flex flex-col">

          {/* ── STEP 0 — Style / System type ── */}
          {step === 0 && (
            <>
              <h3 className="type-card-title text-[#1a1a18]">
                {isWaterFiltration
                  ? "What type of system are you interested in?"
                  : "Which style do you like most?"}
              </h3>
              {isWaterFiltration ? (
                <div className="mt-8 grid gap-3 flex-1">
                  {WATER_FILTRATION_SYSTEM_TYPES.map((s) => (
                    <Tile key={s} active={style === s} onClick={() => setStyle(s)}>{s}</Tile>
                  ))}
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                  {styleOptions.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setStyle(option.name)}
                      className={`rounded-xl border-2 transition-all p-1 text-left ${
                        style === option.name ? "border-primary" : "border-border hover:border-foreground/30"
                      }`}
                    >
                      {option.image ? (
                        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                          <img src={option.image} alt={option.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary px-4 text-center text-[16px] font-medium text-[#1a1a18]">
                          {option.name}
                        </div>
                      )}
                      <div className="px-2 py-3 text-[14px] font-medium text-[#1a1a18]">{option.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              {(isLegacy || isKitchen) && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What's the size of your {isKitchen ? "kitchen" : "space"}?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {(isKitchen ? KITCHEN_SIZES : DEFAULT_SIZES).map((s) => (
                      <Tile key={s} active={size === s} onClick={() => setSize(s)}>{s}</Tile>
                    ))}
                  </div>
                </>
              )}
              {isAccentWall && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">Which room is the accent wall in?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {ACCENT_WALL_ROOMS.map((s) => (
                      <Tile key={s} active={scope.includes(s)} onClick={() => setScope([s])}>{s}</Tile>
                    ))}
                  </div>
                </>
              )}
              {isWaterFiltration && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What is your main concern?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {WATER_FILTRATION_CONCERNS.map((s) => (
                      <Tile key={s} active={scope.includes(s)} onClick={() => setScope([s])}>{s}</Tile>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              {isLegacy && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What do you plan to update?</h3>
                  <p className="type-body type-body-dark mt-2">Select all that apply.</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2 flex-1">
                    {DEFAULT_SCOPE.map((s) => (
                      <Tile key={s} active={scope.includes(s)} onClick={() => toggleScope(s)}>{s}</Tile>
                    ))}
                  </div>
                </>
              )}
              {isKitchen && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What do you plan to update?</h3>
                  <p className="type-body type-body-dark mt-2">Choose the closest option.</p>
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                    {KITCHEN_LAYOUT_OPTIONS.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setScope([option.name])}
                        className={`rounded-xl border-2 transition-all p-1 text-left ${
                          scope.includes(option.name) ? "border-primary" : "border-border hover:border-foreground/30"
                        }`}
                      >
                        {option.image ? (
                          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                            <img src={option.image} alt={option.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary px-4 text-center text-[16px] font-medium text-[#1a1a18]">
                            {option.name}
                          </div>
                        )}
                        <div className="px-2 py-3 text-[14px] font-medium text-[#1a1a18]">{option.name}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {isAccentWall && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What is the wall size?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {ACCENT_WALL_SIZES.map((s) => (
                      <Tile key={s} active={size === s} onClick={() => setSize(s)}>{s}</Tile>
                    ))}
                  </div>
                </>
              )}
              {isWaterFiltration && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">How many people live in your home?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {WATER_FILTRATION_PEOPLE.map((s) => (
                      <Tile key={s} active={size === s} onClick={() => setSize(s)}>{s}</Tile>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              {isLegacy && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">When are you planning to start?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {TIMELINE.map((t) => (
                      <Tile key={t} active={timeline === t} onClick={() => setTimeline(t)}>{t}</Tile>
                    ))}
                  </div>
                </>
              )}
              {isKitchen && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What materials do you prefer?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {KITCHEN_MATERIALS.map((m) => (
                      <Tile key={m} active={materials === m} onClick={() => setMaterials(m)}>{m}</Tile>
                    ))}
                  </div>
                </>
              )}
              {isAccentWall && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What finish do you prefer?</h3>
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                    {ACCENT_WALL_FINISH_OPTIONS.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setMaterials(option.name)}
                        className={`rounded-xl border-2 transition-all p-1 text-left ${
                          materials === option.name ? "border-primary" : "border-border hover:border-foreground/30"
                        }`}
                      >
                        {option.image ? (
                          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                            <img src={option.image} alt={option.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary px-4 text-center text-[16px] font-medium text-[#1a1a18]">
                            {option.name}
                          </div>
                        )}
                        <div className="px-2 py-3 text-[14px] font-medium text-[#1a1a18]">{option.name}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {isWaterFiltration && (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">Do you currently have any filtration system?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {WATER_FILTRATION_EXISTING.map((s) => (
                      <Tile key={s} active={materials === s} onClick={() => setMaterials(s)}>{s}</Tile>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── STEP 4 — (kitchen/accent-wall/water-filtration only) ── */}
          {step === 4 && !isLegacy && (
            <>
              {isWaterFiltration ? (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">What is your budget range?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {WATER_FILTRATION_BUDGET.map((t) => (
                      <Tile key={t} active={timeline === t} onClick={() => setTimeline(t)}>{t}</Tile>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="type-card-title text-[#1a1a18]">When are you planning to start?</h3>
                  <div className="mt-8 grid gap-3 flex-1">
                    {TIMELINE.map((t) => (
                      <Tile key={t} active={timeline === t} onClick={() => setTimeline(t)}>{t}</Tile>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── CONTACT STEP (last step for all sources) ── */}
          {step === contactStep && (
            <>
              <h3 className="type-card-title text-[#1a1a18]">Almost done! Where should we send your estimate?</h3>
              <div className="mt-8 space-y-4 flex-1">
                <div>
                  <label className="type-form-label">First name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="type-form-label">Phone number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                {status === "err" && <p className="text-[13px] text-destructive">{err}</p>}
              </div>
            </>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-[14px] text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              ← Back
            </button>
            {step < contactStep ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
                Continue
              </Button>
            ) : (
              <Button onClick={onSubmit} disabled={!name || !phone || status === "sending"}>
                {status === "sending" ? "Sending…" : "Get my free estimate →"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImagePlaceholder() {
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary/60 border border-dashed border-border px-4 text-center text-[13px] text-muted-foreground">
      <span>Photo coming soon</span>
    </div>
  );
}

function Tile({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`type-body w-full rounded-xl border-2 px-5 py-4 text-left transition-all ${
        active
          ? "border-primary bg-primary/5"
          : "border-border hover:border-foreground/30"
      }`}
    >
      {children}
    </button>
  );
}
