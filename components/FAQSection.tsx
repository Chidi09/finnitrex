"use client";

import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQSchema } from "@/components/StructuredData";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  description: string;
  items: FAQItem[];
  variant?: "default" | "editorial";
}

export default function FAQSection({
  title,
  description,
  items,
  variant = "default",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const sectionId = useId();
  const isEditorial = variant === "editorial";

  return (
    <>
      <FAQSchema faqs={items} />

      <section
        className={
          isEditorial
            ? "border-t border-stone-200/80 bg-[#f3eee4] py-16 dark:border-white/10 dark:bg-zinc-900/60 md:py-20"
            : "border-t border-gray-900 bg-black py-24"
        }
      >
        <div className={isEditorial ? "mx-auto max-w-4xl px-6" : "container mx-auto max-w-4xl px-6"}>
          <div className="mb-12">
            {isEditorial ? (
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Technical questions
              </p>
            ) : null}
            <h2
              className={
                isEditorial
                  ? "mb-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white md:text-4xl"
                  : "mb-4 text-3xl font-bold text-white"
              }
            >
              {title}
            </h2>
            <p
              className={
                isEditorial
                  ? "max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300"
                  : "text-gray-400"
              }
            >
              {description}
            </p>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const buttonId = `${sectionId}-trigger-${index}`;
              const panelId = `${sectionId}-panel-${index}`;

              return (
                <div
                  key={index}
                  className={`border transition-all duration-300 ${
                    isEditorial
                      ? `rounded-2xl ${
                          isOpen
                            ? "border-stone-900 bg-white shadow-[0_18px_50px_rgba(28,25,23,0.08)] dark:border-stone-100 dark:bg-white/[0.06] dark:shadow-none"
                            : "border-stone-200 bg-[#faf7f1] hover:border-stone-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
                        }`
                      : isOpen
                        ? "rounded-xl border-lime-500/50 bg-gray-900/40"
                        : "rounded-xl border-gray-800 bg-gray-900/20 hover:border-gray-700"
                  }`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span
                      className={`pr-6 text-lg font-semibold ${
                        isEditorial
                          ? `tracking-[-0.02em] ${
                              isOpen ? "text-stone-950 dark:text-white" : "text-stone-800 dark:text-stone-100"
                            }`
                          : isOpen
                            ? "text-lime-400"
                            : "text-gray-200"
                      }`}
                    >
                      {item.question}
                    </span>
                    {isOpen ? (
                      <Minus
                        className={
                          isEditorial
                            ? "h-5 w-5 shrink-0 text-stone-900 dark:text-stone-100"
                            : "h-5 w-5 shrink-0 text-lime-400"
                        }
                      />
                    ) : (
                      <Plus
                        className={
                          isEditorial
                            ? "h-5 w-5 shrink-0 text-stone-500 dark:text-stone-400"
                            : "h-5 w-5 shrink-0 text-gray-500"
                        }
                      />
                    )}
                  </button>

                  {isOpen ? (
                    <div id={panelId} role="region" aria-labelledby={buttonId} className="overflow-hidden">
                      <div
                        className={
                          isEditorial
                            ? "p-6 pt-0 text-sm leading-7 text-stone-600 dark:text-stone-300"
                            : "p-6 pt-0 leading-relaxed text-gray-400"
                        }
                      >
                        {item.answer}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
