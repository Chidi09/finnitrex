"use client";

import { useState } from "react";
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
}

export default function FAQSection({ title, description, items }: FAQSectionProps) {
  // Track open index (-1 means all closed)
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <>
      {/* 1. Inject Schema for Google */}
      <FAQSchema faqs={items} />

      {/* 2. Visual Component */}
      <section className="py-24 border-t border-gray-900 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
            <p className="text-gray-400">{description}</p>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-300 ${
                  openIndex === index
                    ? "border-lime-500/50 bg-gray-900/40"
                    : "border-gray-800 bg-gray-900/20 hover:border-gray-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className={`font-semibold text-lg ${openIndex === index ? 'text-lime-400' : 'text-gray-200'}`}>
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-lime-400 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
