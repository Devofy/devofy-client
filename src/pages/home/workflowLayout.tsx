import IntegrationsHero from "@/components/home/IntegrationHero";
import GitHubWorkflow from "@/components/workflows/github2";
import ShopifyWorkflow from "@/components/workflows/shopify2";
import SlackWorkflow from "@/components/workflows/slack2";
import StripeWorkflow from "@/components/workflows/stripe2";
import { motion } from "framer-motion";

export default function WorkflowsSection() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#0b0b0b] overflow-hidden">
      {/* Subtle animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
      />

      {/* Section Header */}
      <div className="relative text-center mb-20 z-10">
        <motion.span
          className="text-xs md:text-sm font-medium tracking-wider uppercase text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Integrate. Automate. Elevate.
        </motion.span>
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Power Your Workflows <br />
          <span className="text-blue-500">Across Every Platform</span>
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          From eCommerce to DevOps, automate complex processes seamlessly with
          Devofy’s event-driven architecture — faster, smarter, and more
          reliable.
        </motion.p>
      </div>

      {/* Workflow Grid */}
      <div className="relative flex flex-col gap-28 md:gap-40 z-10 max-w-7xl mx-auto px-6">
        <IntegrationsHero/>
        {/* GitHub Workflow */}
        {/* <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              GitHub Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect your repositories and automate deployments, CI/CD events,
              and more — all tracked in real time.
            </p>
          </div>
          <div className="md:w-1/2">
            <GitHubWorkflow />
          </div>
        </motion.div> */}

        {/* Shopify Workflow */}
        {/* <motion.div
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Shopify Sync
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Keep your storefront, CRM, and analytics perfectly aligned with
              instant Shopify event syncing.
            </p>
          </div>
          <div className="md:w-1/2">
            <ShopifyWorkflow />
          </div>
        </motion.div> */}

        {/* Stripe Workflow */}
        {/* <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Stripe Automation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Track payments, refunds, and subscriptions automatically with
              secure and reliable event handling.
            </p>
          </div>
          <div className="md:w-1/2">
            <StripeWorkflow />
          </div>
        </motion.div> */}

        {/* Slack Workflow */}
        {/* <motion.div
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Slack Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Instantly notify your teams about key business or system events,
              straight into Slack — stay connected in real time.
            </p>
          </div>
          <div className="md:w-1/2">
            <SlackWorkflow />
          </div>
        </motion.div> */}
      </div>

      {/* Decorative gradient lines */}
      
    </section>
  );
}
