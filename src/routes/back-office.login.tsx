import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { FormField, fieldInputClass } from "@/components/form-field";
import { ActionButton } from "@/components/action-button";

export const Route = createFileRoute("/back-office/login")({
  head: () => ({
    meta: [
      { title: "Back Office Sign In - Mauritius Gymkhana Club" },
      {
        name: "description",
        content: "Staff and committee sign-in for the Mauritius Gymkhana Club back office.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BackOfficeLoginPage,
});

function BackOfficeLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // No back-office API is wired up yet; this is a ready-to-connect UI shell.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("error"), 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-pine px-12 py-12 lg:flex">
        <div className="absolute inset-0 bg-linear-to-br from-pine via-pine to-pine/85" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,#E8B04B_1px,transparent_1px)] [background-size:14px_14px]" />
        <Link to="/" className="relative z-10 mb-10 inline-flex w-fit items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
          <img src="/mcg-logo.png" alt="Mauritius Gymkhana Club" className="h-24 w-auto" />
        </Link>
        <div className="relative z-10">
          <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            Staff & Committee
          </span>
          <h1 className="max-w-md font-serif text-5xl leading-tight text-cream text-balance">
            The Back Office
          </h1>
          <p className="mt-4 max-w-sm leading-relaxed text-cream/75">
            A private area for MGC staff and committee members to manage memberships, events and
            club operations.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3 text-cream/60">
          <ShieldCheck className="size-5 text-gold" strokeWidth={1.75} />
          <span className="text-xs uppercase tracking-widest">Since 1849 · Vacoas, Mauritius</span>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Link to="/" className="mb-6 inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
              <img src="/mcg-logo.png" alt="Mauritius Gymkhana Club" className="h-20 w-auto" />
            </Link>
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Lock className="size-3.5" strokeWidth={2.25} /> Staff & Committee
            </span>
          </div>

          <h2 className="mb-2 font-serif text-3xl text-pine">Back Office sign in</h2>
          <p className="mb-8 text-sm text-ink/60">
            Restricted to authorised MGC staff and committee members.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <FormField label="Username or email" required>
              <input
                type="text"
                name="identifier"
                required
                autoComplete="username"
                className={fieldInputClass}
              />
            </FormField>

            <FormField label="Password" required>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  className={`${fieldInputClass} pr-9`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-0 -translate-y-1/2 text-ink/40 hover:text-pine focus-visible:outline-none focus-visible:text-pine"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </FormField>

            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-ink/60">
                <input
                  type="checkbox"
                  name="remember"
                  className="size-3.5 rounded-sm border-pine/30 text-pine focus:ring-pine"
                />
                Keep me signed in
              </label>
              <a
                href="mailto:it@gymkhana.mu"
                className="text-pine transition-colors hover:text-gold"
              >
                Forgot password?
              </a>
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-destructive">
                We couldn't sign you in. Check your details or contact IT support.
              </p>
            )}

            <ActionButton
              type="submit"
              variant="pine"
              disabled={status === "loading"}
              className="w-full justify-center"
            >
              {status === "loading" ? "Signing in…" : "Sign in"} <ArrowRight />
            </ActionButton>
          </form>

          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50 transition-colors hover:text-pine"
          >
            ← Back to the club website
          </Link>
        </div>
      </div>
    </div>
  );
}
