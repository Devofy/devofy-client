import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals and small projects to get started.",
    features: [
      "Up to 100 events/month",
      "Basic analytics dashboard",
      "Community support",
      "Webhook delivery monitoring",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "Ideal for growing teams that need reliability and insights.",
    features: [
      "10,000 events/month",
      "Advanced retry logic",
      "Priority email support",
      "Custom integrations",
      "Webhook signing & validation",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Tailored infrastructure and SLAs for large-scale organizations.",
    features: [
      "Unlimited events",
      "Dedicated infrastructure",
      "24/7 priority support",
      "Custom SLAs & onboarding",
      "Advanced security & compliance",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative py-24 px-6 sm:px-10 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0b0c10] dark:via-[#0e1116] dark:to-[#0d1117] overflow-hidden mb-32">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold bg-black bg-clip-text text-transparent"
        >
          Simple,
          <span className="text-blue-600">Transparent pricing</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
        >
          Choose the plan that fits your team. Scale easily as you grow.
        </motion.p>

        {/* Pricing Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`relative border border-gray-200 dark:border-gray-800 backdrop-blur-md transition-all duration-300 ${
                  plan.highlight
                    ? "bg-white/80 dark:bg-[#15191e]/80 shadow-xl scale-[1.02] border-blue-500/40"
                    : "bg-white/60 dark:bg-[#15191e]/60 hover:shadow-lg"
                }`}
              >
                {/* Highlight Glow */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="p-8 text-left flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {plan.description}
                  </p>

                  <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    {plan.price}
                    {plan.price !== "Free" && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">
                        /mo
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-700 dark:text-gray-300"
                      >
                        <Check className="w-5 h-5 text-blue-500 mt-[2px] mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      variant={plan.highlight ? "default" : "outline"}
                      className={`w-full ${
                        plan.highlight
                          ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:opacity-90"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
