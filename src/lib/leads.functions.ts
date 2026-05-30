import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendTelegram } from "./telegram.server";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(255),
  project_type: z.string().trim().min(1).max(60),
  message: z.string().trim().max(2000).optional().default(""),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      project_type: data.project_type,
      message: data.message || null,
    });
    if (error) throw new Error(error.message);

    const msg = [
      "🔔 <b>New lead — MagSystem</b>",
      "",
      `<b>Name:</b> ${escape(data.name)}`,
      `<b>Phone:</b> ${escape(data.phone)}`,
      `<b>Email:</b> ${escape(data.email)}`,
      `<b>Project type:</b> ${escape(data.project_type)}`,
      data.message ? `<b>Message:</b> ${escape(data.message)}` : "",
      "",
      `<b>Time:</b> ${new Date().toLocaleString("en-US")}`,
    ]
      .filter(Boolean)
      .join("\n");
    await sendTelegram(msg);
    return { ok: true };
  });

const quizSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(40),
  style: z.string().trim().max(60).optional().default(""),
  size: z.string().trim().max(60).optional().default(""),
  scope: z.array(z.string().trim().max(60)).max(20).default([]),
  materials: z.string().trim().max(60).optional().default(""),
  timeline: z.string().trim().max(60).optional().default(""),
  page_source: z.enum(["kitchen", "bathroom", "full-remodel", "accent-wall", "water-filtration"]),
});

export const submitQuiz = createServerFn({ method: "POST" })
  .inputValidator((input) => quizSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("quiz_leads").insert({
      name: data.name,
      phone: data.phone,
      style: data.style || null,
      size: data.size || null,
      scope: data.scope,
      materials: data.materials || null,
      timeline: data.timeline || null,
      page_source: data.page_source,
    });
    if (error) throw new Error(error.message);

    const msg = [
      "🔔 <b>New lead — MagSystem</b>",
      "",
      `<b>Name:</b> ${escape(data.name)}`,
      `<b>Phone:</b> ${escape(data.phone)}`,
      `<b>Source:</b> ${escape(data.page_source)} quiz`,
      `<b>Style:</b> ${escape(data.style || "—")}`,
      `<b>Size:</b> ${escape(data.size || "—")}`,
      `<b>Scope:</b> ${escape(data.scope.join(", ") || "—")}`,
      `<b>Materials:</b> ${escape(data.materials || "—")}`,
      `<b>Timeline:</b> ${escape(data.timeline || "—")}`,
      "",
      `<b>Time:</b> ${new Date().toLocaleString("en-US")}`,
    ].join("\n");
    await sendTelegram(msg);
    return { ok: true };
  });

const contractorSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  company_name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(255),
  specialization: z.string().trim().min(1).max(60),
  has_license: z.enum(["Yes", "No", "In progress"]),
  service_area: z.enum(["Sarasota", "Manatee", "Both", "Other"]),
});

export const submitContractorForm = createServerFn({ method: "POST" })
  .inputValidator((input) => contractorSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contractor_leads").insert({
      full_name: data.full_name,
      company_name: data.company_name,
      phone: data.phone,
      email: data.email,
      specialization: data.specialization,
      has_license: data.has_license,
      service_area: data.service_area,
    });
    if (error) throw new Error(error.message);

    const msg = [
      "🔧 <b>New Contractor Application — MagSystem</b>",
      "",
      `<b>Name:</b> ${escape(data.full_name)}`,
      `<b>Company:</b> ${escape(data.company_name)}`,
      `<b>Phone:</b> ${escape(data.phone)}`,
      `<b>Email:</b> ${escape(data.email)}`,
      `<b>Specialization:</b> ${escape(data.specialization)}`,
      `<b>License:</b> ${escape(data.has_license)}`,
      `<b>Service area:</b> ${escape(data.service_area)}`,
      "",
      `<b>Time:</b> ${new Date().toLocaleString("en-US")}`,
    ].join("\n");
    await sendTelegram(msg);
    return { ok: true };
  });
