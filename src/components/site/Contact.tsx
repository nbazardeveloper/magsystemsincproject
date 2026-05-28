import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/leads.functions";
import { Button } from "./Button";

export function Contact() {
  const submit = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        data: {
          name: String(fd.get("name") || ""),
          phone: String(fd.get("phone") || ""),
          email: String(fd.get("email") || ""),
          project_type: String(fd.get("project_type") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (e2: unknown) {
      setStatus("err");
      setErr(e2 instanceof Error ? e2.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" className="section-divider bg-[#f5f2ee]">
      <div className="px-8 pb-12 pt-20 md:px-12 md:pb-8">
        <div className="section-heading mx-auto max-w-[900px]">
          <h2 className="type-section-heading type-display-dark reveal">
            Tell us about your project.
          </h2>
          <p className="type-slogan type-slogan-dark reveal max-w-2xl">
            Free consultation and on-site assessment in Manatee County and Sarasota County, Florida.
          </p>
        </div>
      </div>

      <div className="grid gap-[5px] bg-white p-[5px] md:grid-cols-2">
        <div className="reveal bg-[#f5f2ee] px-7 py-8 md:px-8 md:py-10">
          <div className="space-y-4 type-body text-foreground">
            <div>
              <div className="type-form-label">Phone</div>
              <a href="tel:+17542869559" className="mt-1 block font-medium">+1 (754) 286-9559</a>
            </div>
            <div>
              <div className="type-form-label">Email</div>
              <a href="mailto:magsysteminc@gmail.com" className="mt-1 block font-medium">
                magsysteminc@gmail.com
              </a>
            </div>
            <div>
              <div className="type-form-label">Area</div>
              <div className="mt-1 font-medium">Manatee County & Sarasota County, Florida</div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="reveal space-y-4 bg-white px-7 py-8 md:px-8 md:py-10">
          <Field label="Name" name="name" required />
          <Field label="Phone" name="phone" type="tel" required />
          <Field label="Email" name="email" type="email" required />
          <div>
            <label htmlFor="project_type" className="type-form-label">
              Project type
            </label>
            <select
              id="project_type"
              name="project_type"
              required
              defaultValue=""
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>Select…</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Full remodel">Full remodel</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="type-form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="pt-2 flex items-center gap-4">
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send request"}
            </Button>
            {status === "ok" && <span className="text-[13px] text-foreground/70">Thanks — we'll be in touch.</span>}
            {status === "err" && <span className="text-[13px] text-destructive">{err}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="type-form-label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
