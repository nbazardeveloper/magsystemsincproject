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
import { Button } from "./Button";

type Source = "kitchen" | "bathroom" | "full-remodel";

const STYLE_OPTIONS = [
  { name: "Modern", image: modernStyleImage },
  { name: "Scandinavian", image: scandinavianStyleImage },
  { name: "Classic", image: classicStyleImage },
  { name: "Industrial", image: industrialStyleImage },
  { name: "Minimalist", image: minimalistStyleImage },
  { name: "Contemporary", image: contemporaryStyleImage },
] as const;
const BATHROOM_STYLE_OPTIONS = [
  { name: "Modern", image: bathroomModernStyleImage },
  { name: "Scandinavian", image: bathroomScandinavianStyleImage },
  { name: "Classic", image: bathroomClassicStyleImage },
  { name: "Industrial", image: bathroomIndustrialStyleImage },
  { name: "Minimalist", image: bathroomMinimalistStyleImage },
  { name: "Spa / Zen", image: bathroomSpaStyleImage },
] as const;
const SIZES = ["Under 50 sq ft", "50–80 sq ft", "80–120 sq ft", "Over 120 sq ft"];
const SCOPE = ["Full remodel", "Just tile", "Plumbing fixtures", "Cabinets & vanity", "Shower / bathtub", "Lighting"];
const TIMELINE = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring options"];

export function Quiz({ source }: { source: Source }) {
  const submit = useServerFn(submitQuiz);
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [scope, setScope] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState("");

  const total = 5;
  const progress = ((step + 1) / total) * 100;
  const styleOptions = source === "bathroom" ? BATHROOM_STYLE_OPTIONS : STYLE_OPTIONS;

  const toggleScope = (s: string) =>
    setScope((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const canNext = () => {
    if (step === 0) return !!style;
    if (step === 1) return !!size;
    if (step === 2) return scope.length > 0;
    if (step === 3) return !!timeline;
    return true;
  };

  const onSubmit = async () => {
    if (!name || !phone) return;
    setStatus("sending");
    setErr("");
    try {
      await submit({ data: { name, phone, style, size, scope, timeline, page_source: source } });
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
            Answer 5 questions and find out the cost of your renovation
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
          {step === 0 && (
            <>
              <h3 className="type-card-title text-[#1a1a18]">Which style do you like most?</h3>
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
                    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                      <img src={option.image} alt={option.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="px-2 py-3 text-[14px] font-medium text-[#1a1a18]">{option.name}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="type-card-title text-[#1a1a18]">What's the size of your {source === "kitchen" ? "kitchen" : "space"}?</h3>
              <div className="mt-8 grid gap-3 flex-1">
                {SIZES.map((s) => (
                  <Tile key={s} active={size === s} onClick={() => setSize(s)}>{s}</Tile>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="type-card-title text-[#1a1a18]">What do you plan to update?</h3>
              <p className="type-body type-body-dark mt-2">Select all that apply.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 flex-1">
                {SCOPE.map((s) => (
                  <Tile key={s} active={scope.includes(s)} onClick={() => toggleScope(s)}>{s}</Tile>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="type-card-title text-[#1a1a18]">When are you planning to start?</h3>
              <div className="mt-8 grid gap-3 flex-1">
                {TIMELINE.map((t) => (
                  <Tile key={t} active={timeline === t} onClick={() => setTimeline(t)}>{t}</Tile>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3 className="type-card-title text-[#1a1a18]">Almost done! Where should we send your estimate?</h3>
              <div className="mt-8 space-y-4 flex-1">
                <div>
                  <label className="type-form-label">
                    First name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="type-form-label">
                    Phone number
                  </label>
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
            {step < total - 1 ? (
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
