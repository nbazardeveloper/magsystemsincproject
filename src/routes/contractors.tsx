import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/site/Button";
import { submitContractorForm } from "@/lib/leads.functions";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/contractors")({
  head: () => ({
    meta: [
      { title: "Join Our Contractor Network — Mag System Inc" },
      { name: "description", content: "Become a partner contractor with Mag System Inc in Sarasota and Manatee Counties. Get access to structured project requests from verified homeowners." },
      { property: "og:title", content: "Join Our Contractor Network — Mag System Inc" },
      { property: "og:description", content: "Become a partner contractor with Mag System Inc in Sarasota and Manatee Counties." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magsysteminc.com/contractors" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://magsysteminc.com/contractors" }],
  }),
  component: ContractorsPage,
});

const SPECIALIZATIONS = [
  "Tile",
  "Flooring",
  "Painting",
  "Plumbing",
  "Electrical",
  "General",
  "Other",
];

const LICENSE_OPTIONS = ["Yes", "No", "In progress"] as const;
const SERVICE_AREAS = ["Sarasota", "Manatee", "Both", "Other"] as const;

type License = (typeof LICENSE_OPTIONS)[number];
type Area = (typeof SERVICE_AREAS)[number];

function ContractorsPage() {
  useReveal();
  const submit = useServerFn(submitContractorForm);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hasLicense, setHasLicense] = useState<License | "">("");
  const [serviceArea, setServiceArea] = useState<Area | "">("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState("");

  const canSubmit =
    fullName && companyName && phone && email && specialization && hasLicense && serviceArea && agreedToPrivacy;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    setErr("");
    try {
      await submit({
        data: {
          full_name: fullName,
          company_name: companyName,
          phone,
          email,
          specialization,
          has_license: hasLicense as License,
          service_area: serviceArea as Area,
        },
      });
      setStatus("ok");
    } catch (e) {
      setStatus("err");
      setErr(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-16 bg-background text-center">
          <div className="section-inner">
            <p className="type-kicker type-kicker-accent reveal">For contractors</p>
            <h1 className="type-display type-display-dark reveal mt-4 md:text-7xl">
              Join Our Contractor Network.
            </h1>
            <p className="type-slogan type-slogan-dark reveal mt-6 max-w-2xl mx-auto">
              We are expanding our operations across Sarasota and Manatee Counties and invite reliable, quality-focused contractors to join our network. Get access to structured project requests from verified homeowners — no lead fees, no cold calls.
            </p>
          </div>
        </section>

        {/* Form section */}
        <section className="bg-secondary/40 py-24 md:py-28">
          <div className="mx-auto w-full max-w-[700px] px-5 md:px-12">
            {status === "ok" ? (
              <div className="text-center">
                <h2 className="type-section-heading type-display-dark">Application received.</h2>
                <p className="type-slogan type-slogan-dark mt-4">
                  Thank you for applying. We'll review your information and reach out within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="bg-background border border-border rounded-2xl p-8 md:p-12 space-y-6">
                <h2 className="type-card-title text-[#1a1a18]">Apply to become a partner</h2>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField label="Full Name (contact person)" required>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-[14px]"
                    />
                  </FormField>
                  <FormField label="Company Name" required>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-[14px]"
                    />
                  </FormField>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField label="Phone Number" required>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-[14px]"
                    />
                  </FormField>
                  <FormField label="Email" required>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-[14px]"
                    />
                  </FormField>
                </div>

                <FormField label="Specialization" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SPECIALIZATIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSpecialization(s)}
                        className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-all ${
                          specialization === s
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </FormField>

                <FormField label="Do you have a license?" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {LICENSE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setHasLicense(opt)}
                        className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-all ${
                          hasLicense === opt
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/30"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </FormField>

                <FormField label="Service area" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SERVICE_AREAS.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setServiceArea(area)}
                        className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-all ${
                          serviceArea === area
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/30"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </FormField>

                {status === "err" && (
                  <p className="text-[13px] text-destructive">{err}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToPrivacy}
                    onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-primary cursor-pointer"
                  />
                  <span className="text-[13px] text-muted-foreground leading-snug">
                    I have read and agree to the{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-2 hover:opacity-70"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={!canSubmit || status === "sending"}
                    className="w-full"
                  >
                    {status === "sending" ? "Sending…" : "Submit Application →"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-wider text-muted-foreground mb-2">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
