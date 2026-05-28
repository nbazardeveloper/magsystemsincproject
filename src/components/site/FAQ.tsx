import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

const fallbackFaqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "How much does a bathroom renovation cost?",
    answer: "Bathroom renovation pricing depends on layout changes, tile selections, fixtures, and the condition behind the walls. After a walkthrough, we provide a clear scope and line-item estimate so you know exactly what drives the total.",
    sort_order: 1,
  },
  {
    id: "faq-2",
    question: "How long does a kitchen renovation take?",
    answer: "Most kitchen projects take several weeks once materials are on site. Final timing depends on custom cabinetry, inspection schedules, and whether structural or electrical updates are required.",
    sort_order: 2,
  },
  {
    id: "faq-3",
    question: "Do you provide a warranty on your work?",
    answer: "Yes. We stand behind our workmanship and review warranty coverage with you before the project starts so expectations are clear from day one.",
    sort_order: 3,
  },
  {
    id: "faq-4",
    question: "What areas do you serve?",
    answer: "We serve homeowners in Manatee County and Sarasota County, Florida. If you are unsure whether your location is within range, send us the address and we will confirm quickly.",
    sort_order: 4,
  },
  {
    id: "faq-5",
    question: "Do I need to buy materials myself?",
    answer: "No. We can handle sourcing and coordination for the major finish selections, or work with materials you already want to use. The right split depends on your timeline and priorities.",
    sort_order: 5,
  },
  {
    id: "faq-6",
    question: "Can I see examples of your previous projects?",
    answer: "Yes. We can walk you through completed kitchens, bathrooms, and full remodels so you can compare layout ideas, finish combinations, and workmanship details.",
    sort_order: 6,
  },
  {
    id: "faq-7",
    question: "How do I get started?",
    answer: "Start with a quick call or the contact form. We will schedule a consultation, review the space, and outline the next steps for design, pricing, and construction timing.",
    sort_order: 7,
  },
];

export function FAQ() {
  const [items, setItems] = useState<FAQItem[]>(fallbackFaqItems);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data } = await supabase
        .from("faq_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (!cancelled && data && data.length > 0) {
        setItems(data as FAQItem[]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-divider bg-[#f5f2ee]">
      <div className="px-8 pb-12 pt-20 md:px-12 md:pb-8">
        <div className="section-heading mx-auto max-w-[900px]">
          <h2 className="type-section-heading type-display-dark reveal">
            Frequently asked questions
          </h2>
          <p className="type-slogan type-slogan-dark reveal max-w-2xl">
            Clear answers before the first day on site.
          </p>
        </div>
      </div>

      <div className="bg-white p-[5px]">
        <Accordion type="single" collapsible className="w-full bg-[#f5f2ee] px-6 py-4 md:px-8">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-[#d2d2d7]">
              <AccordionTrigger className="py-6 text-lg font-medium text-[#1d1d1f] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="type-body type-body-dark pb-6 pr-10">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}