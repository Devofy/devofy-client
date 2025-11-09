import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Database, RotateCw, LayoutDashboard, Bot } from "lucide-react";
import React from "react";

export default function WebhookServices() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-6 sm:px-10 py-24 mb-6 border-t border-border/70">
      {/* ======= Intro Section ======= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-3xl text-center mb-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-4 inline-flex items-center justify-center rounded-full border border-blue-500/40 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950/30 dark:text-blue-300"
        >
          <span className="z-10">Own Your Webhooks</span>
          {/* Decorative lines (like in the image) */}
          <span className="absolute -left-8 w-6 h-px bg-blue-300/60 dark:bg-blue-600"></span>
          <span className="absolute -right-8 w-6 h-px bg-blue-300/60 dark:bg-blue-600"></span>
        </motion.div>
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          // initial={{ opacity: 0, y: 20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ delay: 0.2 }}
        >
          Built for Modern Webhooks
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // transition={{ delay: 0.4 }}
        >
          Power your integrations with bulletproof webhook delivery, real-time
          monitoring, and AI-assisted debugging. We handle the infrastructure so
          your app can focus on what truly matters — the experience.
        </motion.p>
      </motion.div>

      {/* ======= Services Grid ======= */}
      <div style={container}>
        {services.map((srv, i) => (
          <ServiceCard
            key={srv.title}
            i={i}
            title={srv.title}
            desc={srv.desc}
            icon={srv.icon}
            hueA={srv.hueA}
            hueB={srv.hueB}
          />
        ))}
      </div>

      {/* ======= Outro Line ======= */}
      <motion.div
        className="max-w-2xl text-center"
        // initial={{ opacity: 0, y: 30 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.6 }}
      >
        <p className="text-gray-600 dark:text-gray-400 text-md">
          From capturing every webhook to AI-powered insights — our platform
          keeps your integrations fast, reliable, and future-proof.
        </p>
      </motion.div>
    </section>
  );
}

/* ======== Service Card ======== */
interface ServiceCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  hueA: number;
  hueB: number;
  i: number;
}

function ServiceCard({ title, desc, icon, hueA, hueB, i }: ServiceCardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      exit="offscreen"
      viewport={{ amount: 0.5, once: false }}
    >
      <div style={{ ...splash, background }} />
      <motion.div
        style={card}
        variants={cardVariants}
        className="relative overflow-hidden card backdrop-blur-lg bg-gray-50 dark:bg-black"
      >
        <div className="flex flex-col items-center text-center p-6 z-10">
          <div className="bg-white/30 dark:bg-white/10 p-3 rounded-full mb-4 shadow-md">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-700 mt-3 leading-relaxed max-w-xs dark:text-gray-300">
            {desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ======== Animations ======== */
const cardVariants: Variants = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -3,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.9,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

/* ======== Styles ======== */
const container: React.CSSProperties = {
  margin: "60px auto",
  maxWidth: 1200,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: 80,
  paddingBottom: 200,
  width: "100%",
};

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 40,
  marginBottom: -100,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
  width: 360,
  height: 400,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 24,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  transformOrigin: "10% 60%",
};

/* ======== Data ======== */
const services = [
  {
    title: "Webhook Gateway & Storage",
    desc: "We act as a buffer between your providers (Stripe, Shopify) and your app — capturing, storing, and forwarding every webhook safely. Never lose a webhook again, even if your server is down.",
    icon: <Database className="w-8 h-8 text-gray-900 dark:text-gray-100" />,
    hueA: 220,
    hueB: 260,
  },
  {
    title: "Automatic Retries",
    desc: "Failed deliveries are retried automatically with exponential backoff. Every attempt is logged — from immediate retries to final dead-letter handling.",
    icon: <RotateCw className="w-8 h-8 text-gray-900 dark:text-gray-100" />,
    hueA: 180,
    hueB: 210,
  },
  {
    title: "Basic Dashboard",
    desc: "A clean, real-time dashboard showing webhook history, delivery status, and detailed payloads. Full visibility into every event, with filters and search.",
    icon: (
      <LayoutDashboard className="w-8 h-8 text-gray-900 dark:text-gray-100" />
    ),
    hueA: 40,
    hueB: 80,
  },
  {
    title: "AI Error Analysis",
    desc: "Our AI automatically analyzes failed webhooks, explains the issue in plain English, and suggests fixes — so you debug in minutes, not hours.",
    icon: <Bot className="w-8 h-8 text-gray-900 dark:text-gray-100" />,
    hueA: 330,
    hueB: 360,
  },
];
