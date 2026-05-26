import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import reviewImage from "@/images/review.webp";

type TestimonialItem = {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
};

const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "fallback-1",
    name: "Melissa Carter",
    city: "Bradenton",
    text: "Our bathroom finally feels calm and finished. The crew was precise, clean, and the schedule stayed exactly where they said it would.",
    rating: 5,
  },
  {
    id: "fallback-2",
    name: "Daniel Flores",
    city: "Sarasota",
    text: "They took a cramped kitchen and made it work for how our family actually lives. Every trade showed up prepared and the final details were excellent.",
    rating: 5,
  },
  {
    id: "fallback-3",
    name: "Priya Shah",
    city: "Lakewood Ranch",
    text: "Communication was direct, the workmanship was strong, and there were no surprises at the end. That is rare in renovation work.",
    rating: 5,
  },
  {
    id: "fallback-4",
    name: "Robert Klein",
    city: "Venice",
    text: "We hired them for a larger remodel and they kept the process organized from demolition through the finish list. We would use them again.",
    rating: 5,
  },
];

export function Testimonial({ compactTopSpacing = false }: { compactTopSpacing?: boolean }) {
  const [items, setItems] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: true });
      if (!cancelled && data && data.length > 0) {
        setItems(data as TestimonialItem[]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (index >= items.length) {
      setIndex(0);
    }
  }, [index, items.length]);

  const active = items[index] ?? fallbackTestimonials[0];
  const initials = active.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const goTo = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + items.length) % items.length);
  };

  const sectionSpacing = compactTopSpacing ? "pb-24 pt-0 md:pb-28" : "py-24 md:py-28";
  const contentTopSpacing = compactTopSpacing ? "pt-10 md:pt-12" : "";
  const quoteOffset = compactTopSpacing ? "top-10 md:top-12" : "top-0";

  return (
    <section className={`relative overflow-hidden bg-[#f5f5f7] ${sectionSpacing}`}>
      <img
        src={reviewImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/82" />
      <div className="section-inner flex min-h-[560px] items-center justify-center">
        <div className={`relative z-10 flex w-full max-w-4xl flex-col items-center justify-center text-center ${contentTopSpacing}`}>
          <div className={`absolute left-0 ${quoteOffset} text-7xl font-semibold leading-none text-[#d2d2d7] md:text-8xl`}>
            “
          </div>
          <div className="reveal pt-16 text-center">
            <blockquote className="text-2xl font-medium leading-tight tracking-tight text-[#1d1d1f] md:text-[32px]">
              {active.text}
            </blockquote>
            <div className="mt-10 flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d9d9de] text-lg font-semibold text-[#1d1d1f]">
                {initials}
              </div>
              <div className="mt-4 text-lg font-semibold text-[#1d1d1f]">{active.name}</div>
              <div className="mt-1 text-[15px] text-[#6e6e73]">{active.city}</div>
              <div className="mt-3 text-xl tracking-[0.2em] text-[#d4a017]">{"★".repeat(active.rating)}</div>
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => goTo(-1)}
              className="inline-flex h-12 w-12 items-center justify-center border border-[#d2d2d7] bg-white text-[#1d1d1f] transition-colors hover:bg-[#ededf0]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              className="inline-flex h-12 w-12 items-center justify-center border border-[#d2d2d7] bg-white text-[#1d1d1f] transition-colors hover:bg-[#ededf0]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
