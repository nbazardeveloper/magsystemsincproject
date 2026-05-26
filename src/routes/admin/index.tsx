import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/site/Button";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/dashboard" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin/dashboard" });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary/30 px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground mb-8">
          ← MAG SYSTEM INC
        </Link>
        <div className="bg-background border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            {mode === "signin" ? "Admin sign in" : "Create admin"}
          </h1>
          <p className="mt-2 text-[13px] text-muted-foreground text-center">
            {mode === "signin" ? "Access the dashboard." : "First-time setup only."}
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {err && <p className="text-destructive text-[13px]">{err}</p>}
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-[13px] text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "Initial setup? Create the admin account →" : "← Back to sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
