import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// --- Mock Card Component ---
const Card = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};
// ----------------------------

const faqs = [
  {
    question: "What is a webhook workflow?",
    answer:
      "A webhook workflow automates how data moves between apps and APIs. When an event occurs, it sends a payload to a specified endpoint for real-time processing or updates.",
  },
  {
    question: "How does retry logic work in event queues?",
    answer:
      "When a delivery fails due to timeout or network issues, the event is placed in a retry queue. The system attempts redelivery at scheduled intervals until it succeeds or reaches the retry limit.",
  },
  {
    question: "Is the workflow secure?",
    answer:
      "Yes. Each webhook delivery can be signed and verified using shared secrets. Payloads are encrypted in transit via HTTPS and optionally at rest for sensitive data.",
  },
  {
    question: "Can I customize webhook endpoints per client?",
    answer:
      "Absolutely. Each client can define unique endpoints, authentication headers, and delivery preferences through your platform’s dashboard or API.",
  },
  {
    question: "What happens if my API is temporarily down?",
    answer:
      "The system automatically detects delivery failures, logs them, and retries after exponential backoff intervals until successful or marked as permanently failed.",
  },
  {
    question: "Can I monitor webhook performance?",
    answer:
      "Yes. You can track success rates, latency, retries, and endpoint health in real-time through the analytics dashboard or via API endpoints.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="
        relative w-full 
        bg-gradient-to-b 
        from-white via-blue-100/40 to-white 
        dark:from-[#0e1117] dark:via-[#10141c] dark:to-[#0e1117]
        py-16 px-6 sm:px-10 mb-6
      "
    >
      {/* Subtle background grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6 bg-blue-600 bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-400 mb-10"
        >
          Everything you need to know about our workflow and delivery system.
        </motion.p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="
                border border-gray-200 dark:border-gray-800 
                bg-white/60 dark:bg-white/5
                backdrop-blur-md transition-all 
                rounded-lg overflow-hidden
              "
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center px-4 py-4 md:px-6 md:py-5 text-left"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
