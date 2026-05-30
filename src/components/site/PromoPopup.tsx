import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import popupImage from "@/images/popup.webp";

const DELAY_MS = 6000;

export function PromoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-10 flex w-full max-w-[480px] overflow-hidden rounded-2xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white transition-opacity hover:opacity-80"
        >
          ✕
        </button>

        {/* Image — right half */}
        <div className="hidden w-[45%] shrink-0 sm:block">
          <img
            src={popupImage}
            alt="Free estimate"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-start justify-center px-7 py-8">
          <p className="type-kicker type-kicker-accent mb-2 text-[11px]">Limited offer</p>
          <h2 className="text-[22px] font-bold leading-snug text-foreground">
            Get a Free Estimate & Save <span className="text-primary">$1,000</span>
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
            Answer 5 quick questions about your project — we'll send you a custom estimate within 24 hours.
          </p>

          <Link
            to="/services"
            onClick={close}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Take the quiz →
          </Link>

          <button
            type="button"
            onClick={close}
            className="mt-3 w-full text-center text-[12px] text-muted-foreground underline-offset-2 hover:underline"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
