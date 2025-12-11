import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    id: "webhook-workflow",
    question: "What is a webhook workflow?",
    answer:
      "A webhook workflow automates how data moves between apps. When an event occurs (like a payment), Devofy captures the payload, processes it according to your rules, and forwards it to your specific endpoints securely.",
  },
  {
    id: "retry-logic",
    question: "How does the retry logic work?",
    answer:
      "If your server is down, we don't drop the data. We use an exponential backoff strategy (e.g., 1s, 5s, 1m, 1h) to retry delivery up to 15 times over 3 days before moving the event to a Dead Letter Queue.",
  },
  {
    id: "security",
    question: "Is the payload delivery secure?",
    answer:
      "Yes. Every request is signed with a unique secret (HMAC-SHA256). We also support mutual TLS (mTLS) and IP whitelisting to ensure you only accept traffic from our verifiable infrastructure.",
  },
  {
    id: "custom-endpoints",
    question: "Can I filter events by type?",
    answer:
      "Absolutely. You can subscribe specific endpoints to specific events (e.g., `payment.success` goes to Service A, while `user.signup` goes to Service B) directly from the dashboard.",
  },
  {
    id: "downtime",
    question: "What happens during downtime?",
    answer:
      "Our infrastructure is globally distributed. If one region faces issues, traffic is automatically routed to the nearest healthy node. We guarantee 99.99% uptime for webhook ingestion.",
  },
];

export default function FaqSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative w-full py-24 bg-white dark:bg-black px-6 md:px-10 overflow-hidden">
      {/* Background decoration: Subtle Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
          >
            Questions? <br />
            <span className="text-blue-600">
              We've got answers.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400"
          >
            Everything you need to know about integrating with Devofy. Can't
            find what you're looking for? Chat with our team.
          </motion.p>
        </div>

        {/* The "Bento" Grid of FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map through FAQs */}
          {faqs.map((faq, i) => (
            <FaqCard
              key={faq.id}
              faq={faq}
              isOpen={activeId === faq.id}
              onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
              index={i}
            />
          ))}

          {/* The "Contact Support" Card - fits into the grid as the last item */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-blue-600 p-8 text-white shadow-xl dark:bg-blue-700"
          >
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Still have questions?</h3>
              <p className="mt-2 text-blue-100">
                Our support team is available 24/7 to help you with
                integrations.
              </p>
            </div>
            <button className="mt-8 flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
              Contact Support <ArrowRight className="h-4 w-4" />
            </button>

            {/* Decorative circle in the corner */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Individual Card Component ---
function FaqCard({
  faq,
  isOpen,
  onClick,
  index,
}: {
  faq: { id: string; question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-blue-500/50 bg-white dark:bg-neutral-900 shadow-lg shadow-blue-500/10"
          : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-start justify-between p-6 text-left"
      >
        <span
          className={`text-lg font-semibold transition-colors ${
            isOpen
              ? "text-blue-600 dark:text-blue-400"
              : "text-neutral-900 dark:text-white"
          }`}
        >
          {faq.question}
        </span>
        <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          {isOpen ? (
            <Minus className="h-4 w-4 text-blue-500" />
          ) : (
            <Plus className="h-4 w-4 text-neutral-500" />
          )}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
