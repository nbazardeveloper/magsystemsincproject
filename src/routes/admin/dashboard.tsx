import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/site/Button";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

type Tab = "contacts" | "quiz" | "contractors" | "projects" | "testimonials" | "faq";

type ContactLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  message: string | null;
  status: "new" | "in_progress" | "done";
  created_at: string;
};

type QuizLead = {
  id: string;
  name: string;
  phone: string;
  style: string | null;
  size: string | null;
  scope: string[] | null;
  materials: string | null;
  timeline: string | null;
  page_source: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

type Project = {
  id: string;
  title: string | null;
  location: string;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  category: string;
  created_at: string;
};

const DEFAULT_PROJECT_CATEGORIES = [
  "kitchen",
  "bathroom",
  "full-remodel",
  "handyman",
  "tile",
  "flooring",
  "other",
];

type TestimonialRecord = {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
  created_at: string;
};

type ContractorLead = {
  id: string;
  full_name: string;
  company_name: string;
  phone: string;
  email: string;
  specialization: string;
  has_license: string;
  service_area: string;
  status: string;
  created_at: string;
};

type FAQRecord = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
};

function Dashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<Tab>("contacts");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/admin" });
        return;
      }
      setEmail(data.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");
      const admin = !!roles && roles.length > 0;
      setIsAdmin(admin);
      setReady(true);
    })();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin" });
  };

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-semibold">No access</h1>
          <p className="mt-2 text-muted-foreground text-[14px]">
            This account doesn't have admin privileges.
          </p>
          <Button onClick={signOut} className="mt-6" variant="outline">Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[15px] font-semibold tracking-tight">MAG SYSTEM INC</Link>
            <span className="text-[13px] text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-4 text-[13px]">
            <span className="text-muted-foreground hidden sm:inline">{email}</span>
            <button onClick={signOut} className="text-foreground hover:opacity-70">Sign out</button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 flex gap-1">
          {([
            ["contacts", "Leads"],
            ["quiz", "Quiz Leads"],
            ["contractors", "Contractors"],
            ["projects", "Projects"],
            ["testimonials", "Testimonials"],
            ["faq", "FAQ"],
          ] as [Tab, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-3 text-[13px] border-b-2 transition-colors ${
                tab === id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {tab === "contacts" && <ContactsTab />}
        {tab === "quiz" && <QuizTab />}
        {tab === "contractors" && <ContractorsTab />}
        {tab === "projects" && <ProjectsTab />}
        {tab === "testimonials" && <TestimonialsTab />}
        {tab === "faq" && <FAQTab />}
      </main>
    </div>
  );
}

function ContactsTab() {
  const [items, setItems] = useState<ContactLead[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as ContactLead[]);
  }, []);
  useEffect(() => { load(); }, [load]);

  const setStatus = async (id: string, status: ContactLead["status"]) => {
    await supabase.from("contact_leads").update({ status }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("contact_leads").delete().eq("id", id);
    load();
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.length === 0 && <p className="text-muted-foreground text-[14px]">No leads yet.</p>}
      {items.map((l) => (
        <article key={l.id} className="bg-background border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{l.name}</h3>
              <p className="text-[12px] text-muted-foreground">{new Date(l.created_at).toLocaleString()}</p>
            </div>
            <StatusBadge status={l.status} />
          </div>
          <dl className="mt-4 space-y-1.5 text-[13px]">
            <Row k="Phone" v={l.phone} />
            <Row k="Email" v={l.email} />
            <Row k="Type" v={l.project_type} />
            {l.message && <Row k="Message" v={l.message} />}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <select
              value={l.status}
              onChange={(e) => setStatus(l.id, e.target.value as ContactLead["status"])}
              className="text-[12px] border border-border rounded-md px-2 h-8 bg-background"
            >
              <option value="new">New</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
            <button onClick={() => remove(l.id)} className="text-[12px] text-destructive hover:opacity-70">Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function QuizTab() {
  const [items, setItems] = useState<QuizLead[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from("quiz_leads").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as QuizLead[]);
  }, []);
  useEffect(() => { load(); }, [load]);

  const setStatus = async (id: string, status: QuizLead["status"]) => {
    await supabase.from("quiz_leads").update({ status }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("quiz_leads").delete().eq("id", id);
    load();
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.length === 0 && <p className="text-muted-foreground text-[14px]">No quiz leads yet.</p>}
      {items.map((l) => (
        <article key={l.id} className="bg-background border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{l.name}</h3>
              <p className="text-[12px] text-muted-foreground">{new Date(l.created_at).toLocaleString()}</p>
            </div>
            <QuizStatusBadge status={l.status} />
          </div>
          <dl className="mt-4 space-y-1.5 text-[13px]">
            <Row k="Phone" v={l.phone} />
            <Row k="Source" v={`${l.page_source} quiz`} />
            <Row k="Style" v={l.style ?? "—"} />
            <Row k="Size" v={l.size ?? "—"} />
            <Row k="Scope" v={(l.scope ?? []).join(", ") || "—"} />
            <Row k="Materials" v={l.materials ?? "—"} />
            <Row k="Timeline" v={l.timeline ?? "—"} />
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <select
              value={l.status}
              onChange={(e) => setStatus(l.id, e.target.value as QuizLead["status"])}
              className="text-[12px] border border-border rounded-md px-2 h-8 bg-background"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
            <button onClick={() => remove(l.id)} className="text-[12px] text-destructive hover:opacity-70">Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ContractorsTab() {
  const [items, setItems] = useState<ContractorLead[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from("contractor_leads").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as unknown as ContractorLead[]);
  }, []);
  useEffect(() => { load(); }, [load]);

  const setStatus = async (id: string, status: string) => {
    await supabase.from("contractor_leads").update({ status }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this contractor application?")) return;
    await supabase.from("contractor_leads").delete().eq("id", id);
    load();
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.length === 0 && <p className="text-muted-foreground text-[14px]">No contractor applications yet.</p>}
      {items.map((l) => (
        <article key={l.id} className="bg-background border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{l.full_name}</h3>
              <p className="text-[12px] text-muted-foreground">{new Date(l.created_at).toLocaleString()}</p>
            </div>
            <ContractorStatusBadge status={l.status} />
          </div>
          <dl className="mt-4 space-y-1.5 text-[13px]">
            <Row k="Company" v={l.company_name} />
            <Row k="Phone" v={l.phone} />
            <Row k="Email" v={l.email} />
            <Row k="Trade" v={l.specialization} />
            <Row k="License" v={l.has_license} />
            <Row k="Area" v={l.service_area} />
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <select
              value={l.status}
              onChange={(e) => setStatus(l.id, e.target.value)}
              className="text-[12px] border border-border rounded-md px-2 h-8 bg-background"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
            <button onClick={() => remove(l.id)} className="text-[12px] text-destructive hover:opacity-70">Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ContractorStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-primary/10 text-primary",
    contacted: "bg-foreground/10 text-foreground",
    approved: "bg-green-500/10 text-green-700",
    declined: "bg-destructive/10 text-destructive",
  };
  const label: Record<string, string> = {
    new: "New",
    contacted: "Contacted",
    approved: "Approved",
    declined: "Declined",
  };
  return (
    <span className={`text-[11px] px-2 py-1 rounded-full ${map[status] ?? "bg-secondary text-muted-foreground"}`}>
      {label[status] ?? status}
    </span>
  );
}

function ProjectsTab() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const categoryOptions = Array.from(
    new Set([
      ...DEFAULT_PROJECT_CATEGORIES,
      ...items.map((item) => item.category).filter(Boolean),
      editing?.category?.trim() ?? "",
    ].filter(Boolean)),
  );

  const load = useCallback(async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as Project[]);
  }, []);
  useEffect(() => { load(); }, [load]);

  const getProjectSaveErrorMessage = (message: string) => {
    if (message.includes("invalid input value for enum project_category")) {
      return "The database is still using the old fixed category enum. Apply the latest Supabase migration first, then try again.";
    }

    return message;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("project-images").upload(path, file, { cacheControl: "3600" });
    if (error) { alert(error.message); return null; }
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async () => {
    if (!editing) return;
    const title = editing.title?.trim();
    if (!title) {
      alert("Please enter a project title");
      return;
    }
    if (!editing.after_image_url) {
      alert("Please upload a project image");
      return;
    }
    const category = editing.category?.trim();
    if (!category) {
      alert("Please enter a project category");
      return;
    }
    setSaving(true);
    const payload = {
      title,
      location: "",
      description: null,
      before_image_url: null,
      after_image_url: editing.after_image_url,
      category,
    };
    const result = editing.id
      ? await supabase.from("projects").update(payload).eq("id", editing.id)
      : await supabase.from("projects").insert(payload);

    if (result.error) {
      alert(getProjectSaveErrorMessage(result.error.message));
      setSaving(false);
      return;
    }

    setSaving(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button onClick={() => setEditing({ category: "kitchen" })}>+ New project</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 && <p className="text-muted-foreground text-[14px]">No projects yet.</p>}
        {items.map((p) => (
          <article key={p.id} className="bg-background border border-border rounded-xl overflow-hidden">
            <div className="aspect-[4/3] bg-secondary">
              {p.after_image_url && <img src={p.after_image_url} alt={p.title} className="h-full w-full object-cover" />}
            </div>
            <div className="p-5">
              <div className="text-[12px] uppercase tracking-wider text-muted-foreground">{p.category} · {p.location}</div>
              <h3 className="mt-1 font-semibold">{p.title}</h3>
              {p.description && <p className="mt-1 text-[13px] text-muted-foreground line-clamp-2">{p.description}</p>}
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEditing(p)} className="text-[12px] text-foreground hover:opacity-70">Edit</button>
                <button onClick={() => remove(p.id)} className="text-[12px] text-destructive hover:opacity-70">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-background rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">{editing.id ? "Edit project" : "New project"}</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <Input label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <div>
                <label className="block text-[12px] uppercase tracking-wider text-muted-foreground mb-2">Category</label>
                <input
                  list="project-category-options"
                  value={editing.category ?? ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  placeholder="Type a category or choose an existing one"
                  className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[14px]"
                />
                <datalist id="project-category-options">
                  {categoryOptions.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                <p className="mt-2 text-[12px] text-muted-foreground">
                  Includes `other`. You can also type a completely new category here.
                </p>
              </div>
              <ImageField
                label="Project image *"
                url={editing.after_image_url ?? null}
                onUpload={async (f) => {
                  const url = await uploadImage(f);
                  if (url) setEditing({ ...editing, after_image_url: url });
                }}
                onClear={() => setEditing({ ...editing, after_image_url: null })}
              />
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TestimonialsTab() {
  const [items, setItems] = useState<TestimonialRecord[]>([]);
  const [editing, setEditing] = useState<Partial<TestimonialRecord> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as TestimonialRecord[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    if (!editing.name || !editing.city || !editing.text) {
      alert("Name, city, and review text are required");
      return;
    }

    setSaving(true);
    const payload = {
      name: editing.name,
      city: editing.city,
      text: editing.text,
      rating: Math.min(5, Math.max(1, Number(editing.rating ?? 5))),
    };

    if (editing.id) {
      await supabase.from("testimonials").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert(payload);
    }

    setSaving(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <Button onClick={() => setEditing({ rating: 5 })}>+ New testimonial</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 && <p className="text-[14px] text-muted-foreground">No testimonials yet.</p>}
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-[12px] text-muted-foreground">{item.city}</p>
              </div>
              <span className="text-[13px] tracking-[0.18em] text-amber-500">{"★".repeat(item.rating)}</span>
            </div>
            <p className="mt-4 text-[14px] leading-6 text-muted-foreground">{item.text}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setEditing(item)} className="text-[12px] text-foreground hover:opacity-70">Edit</button>
              <button onClick={() => remove(item.id)} className="text-[12px] text-destructive hover:opacity-70">Delete</button>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-6">
              <h3 className="font-semibold">{editing.id ? "Edit testimonial" : "New testimonial"}</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="space-y-4 p-6">
              <Input label="Client name" value={editing.name ?? ""} onChange={(value) => setEditing({ ...editing, name: value })} />
              <Input label="City" value={editing.city ?? ""} onChange={(value) => setEditing({ ...editing, city: value })} />
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-wider text-muted-foreground">Review text</label>
                <textarea
                  value={editing.text ?? ""}
                  onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-[14px]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-wider text-muted-foreground">Star rating</label>
                <select
                  value={editing.rating ?? 5}
                  onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                  className="h-11 w-full rounded-lg border border-border bg-background px-4 text-[14px]"
                >
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border p-6">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FAQTab() {
  const [items, setItems] = useState<FAQRecord[]>([]);
  const [editing, setEditing] = useState<Partial<FAQRecord> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("faq_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    setItems((data ?? []) as FAQRecord[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    if (!editing.question || !editing.answer) {
      alert("Question and answer are required");
      return;
    }

    setSaving(true);
    const payload = {
      question: editing.question,
      answer: editing.answer,
      sort_order: Number.isNaN(Number(editing.sort_order)) ? 0 : Number(editing.sort_order ?? 0),
    };

    if (editing.id) {
      await supabase.from("faq_items").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("faq_items").insert(payload);
    }

    setSaving(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ item?")) return;
    await supabase.from("faq_items").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <Button onClick={() => setEditing({ sort_order: items.length + 1 })}>+ New FAQ item</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.length === 0 && <p className="text-[14px] text-muted-foreground">No FAQ items yet.</p>}
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-6">{item.question}</h3>
              <span className="shrink-0 text-[12px] text-muted-foreground">#{item.sort_order}</span>
            </div>
            <p className="mt-3 text-[14px] leading-6 text-muted-foreground">{item.answer}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setEditing(item)} className="text-[12px] text-foreground hover:opacity-70">Edit</button>
              <button onClick={() => remove(item.id)} className="text-[12px] text-destructive hover:opacity-70">Delete</button>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-6">
              <h3 className="font-semibold">{editing.id ? "Edit FAQ item" : "New FAQ item"}</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="space-y-4 p-6">
              <Input label="Question" value={editing.question ?? ""} onChange={(value) => setEditing({ ...editing, question: value })} />
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-wider text-muted-foreground">Answer</label>
                <textarea
                  value={editing.answer ?? ""}
                  onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
                  rows={6}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-[14px]"
                />
              </div>
              <Input
                label="Sort order"
                type="number"
                value={String(editing.sort_order ?? 0)}
                onChange={(value) => setEditing({ ...editing, sort_order: Number(value) })}
              />
            </div>
            <div className="flex justify-end gap-2 border-t border-border p-6">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function ImageField({
  label, url, onUpload, onClear,
}: {
  label: string;
  url: string | null;
  onUpload: (f: File) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      {url ? (
        <div className="relative">
          <img src={url} alt="" className="w-full aspect-[4/3] object-cover rounded-lg border border-border" />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 bg-background border border-border rounded-md px-2 py-1 text-[12px]"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="block border border-dashed border-border rounded-lg p-6 text-center text-[13px] text-muted-foreground cursor-pointer hover:border-foreground/30">
          Click to upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
            }}
          />
        </label>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-muted-foreground w-20 shrink-0">{k}</dt>
      <dd className="text-foreground break-words">{v}</dd>
    </div>
  );
}

function StatusBadge({ status }: { status: ContactLead["status"] }) {
  const map = {
    new: "bg-primary/10 text-primary",
    in_progress: "bg-foreground/10 text-foreground",
    done: "bg-secondary text-muted-foreground",
  };
  const label = { new: "New", in_progress: "In progress", done: "Done" }[status];
  return <span className={`text-[11px] px-2 py-1 rounded-full ${map[status]}`}>{label}</span>;
}

function QuizStatusBadge({ status }: { status: QuizLead["status"] }) {
  const map = {
    new: "bg-primary/10 text-primary",
    contacted: "bg-foreground/10 text-foreground",
    closed: "bg-secondary text-muted-foreground",
  };
  const label = { new: "New", contacted: "Contacted", closed: "Closed" }[status];
  return <span className={`text-[11px] px-2 py-1 rounded-full ${map[status]}`}>{label}</span>;
}
