"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Globe,
  Server,
  Zap,
  Shield,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* ======= Background: Dotted Grid (Top Half Only) ======= */}
      <div className="absolute inset-0 h-full w-full z-0 pointer-events-none">
        {/* The Dot SVG Pattern */}
        <div className="absolute h-full w-full bg-white dark:bg-black">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white_10%,transparent_60%)]"></div>
        </div>
      </div>

      {/* ======= Background: Spotlight Glow ======= */}
      {/* A soft blue glow behind the text to make it pop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      {/* ======= Floating Icons (High Visibility) ======= */}
      {/* I brightened the dark mode colors (text-blue-400 instead of 900) */}
      <FloatingIcon
        icon={
          <Database className="text-blue-300 dark:text-blue-400 w-12 h-12" />
        }
        top="15%"
        left="10%"
        delay={0}
      />
      <FloatingIcon
        icon={
          <Server className="text-purple-300 dark:text-purple-400 w-10 h-10" />
        }
        bottom="25%"
        right="10%"
        delay={1.5}
      />
      <FloatingIcon
        icon={
          <Code2 className="text-emerald-300 dark:text-emerald-400 w-8 h-8" />
        }
        top="25%"
        right="20%"
        delay={0.5}
      />
      <FloatingIcon
        icon={
          <Shield className="text-orange-300 dark:text-orange-400 w-14 h-14" />
        }
        bottom="15%"
        left="15%"
        delay={2}
      />

      {/* ======= Main Content ======= */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 pt-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm shadow-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-300 uppercase">
            Beta Launching Soon
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white max-w-5xl leading-[1.1]"
        >
          The Infrastructure for <br className="hidden md:block" />
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r bg-blue-500 bg-clip-text text-transparent">
              Modern Webhooks
            </span>
            {/* Underline decoration */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
        >
          Devofy handles the plumbing so you can focus on the code. Ingest,
          process, and debug webhooks with 99.99% uptime and
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">
            {" "}
            zero config
          </span>
          .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button className="h-12 px-8 text-base font-medium rounded-md bg-blue-500 hover:bg-blue-700 text-white transition-all hover:scale-105 active:scale-95 shadow-xl">
            Start Integration
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-12 px-8 text-base font-medium rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
          >
            Read the Docs
          </Button>
        </motion.div>

        {/* Social Proof / Tech Stack (Optional subtle visual at bottom of hero) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 pt-10 border-t border-neutral-200/50 dark:border-neutral-800/50 w-full max-w-4xl flex flex-col items-center"
        >
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-4 font-medium uppercase tracking-widest">
            Trusted by teams at
          </p>
          <div className="flex gap-8 md:gap-16 grayscale opacity-50 dark:opacity-40 mix-blend-luminosity">
            {/* Placeholders for logos - replacing with text for now */}
            <span className="font-bold text-xl">Acme Corp</span>
            <span className="font-bold text-xl">Stripe</span>
            <span className="font-bold text-xl">Vercel</span>
            <span className="font-bold text-xl">Shopify</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

// =========================================================================
// Helper Component: Floating Icon
// =========================================================================

function FloatingIcon({ icon, top, left, right, bottom, delay }: any) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [-15, 15, -15],
        opacity: 1,
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: delay || 0,
        },
        opacity: { duration: 1, delay: delay },
      }}
      className="absolute z-0 blur-[0.5px] drop-shadow-lg"
      style={{ top, left, right, bottom }}
    >
      {/* Inner subtle pulse for life */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
