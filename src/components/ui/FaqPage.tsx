"use client";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

type FAQCategory = {
  title: string;
  bgColor: string;
  items: FAQItem[];
};

const faqData: FAQCategory[] = [
  {
    title: "General questions",
    bgColor: "bg-amber-50",
    items: [
      {
        question: "What is your service about?",
        answer: <p>We create personalized books from your photos and stories — no apps, no hassle.</p>,
      },
      {
        question: "Do I need to install anything?",
        answer: <p>No, everything works online without installing apps or plugins.</p>,
      },
    ],
  },
  {
    title: "Customizing Your Product",
    bgColor: "bg-sky-50",
    items: [
      {
        question: "Can I choose my own photos?",
        answer: <p>Yes, you can upload any high-quality photos you like to make the book personal.</p>,
      },
    ],
  },
  {
    title: "Shipping & Handling",
    bgColor: "bg-amber-50",
    items: [
      {
        question: "How long does shipping take?",
        answer: <p>Standard shipping takes 5–7 business days. Express options are available.</p>,
      },
    ],
  },
  {
    title: "Payment & Ordering",
    bgColor: "bg-sky-50",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: (
          <ul className="list-disc list-inside">
            <li>Credit/Debit Cards</li>
            <li>PayPal</li>
            <li>Apple Pay</li>
          </ul>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">FAQ</h1>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.flatMap((cat) =>
              cat.items.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    typeof q.answer === "string"
                      ? q.answer
                      : // Convert JSX to plain text for SEO schema
                        (q.answer as any)?.props?.children || "",
                },
              }))
            ),
          }),
        }}
      />

      {faqData.map((cat, catIndex) => (
        <div key={cat.title} className={`rounded-xl shadow-sm p-4 mb-4 cursor-pointer ${cat.bgColor}`}>
          {/* Category Accordion */}
          <div className="flex justify-between items-center" onClick={() => setOpenCategory(openCategory === catIndex ? null : catIndex)}>
            <h2 className="font-semibold">{cat.title}</h2>
            <span>{openCategory === catIndex ? "−" : "+"}</span>
          </div>

          {/* Questions */}
          {openCategory === catIndex && (
            <div className="mt-3 space-y-2">
              {cat.items.map((faq) => (
                <div key={faq.question}>
                  <div
                    className="flex justify-between items-center px-2 py-1 bg-white rounded cursor-pointer"
                    onClick={() => setOpenQuestion(openQuestion === faq.question ? null : faq.question)}
                  >
                    <span>{faq.question}</span>
                    <span>{openQuestion === faq.question ? "−" : "+"}</span>
                  </div>
                  {openQuestion === faq.question && <div className="px-3 py-2 text-gray-700 bg-white rounded-b">{faq.answer}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
