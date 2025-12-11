import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Database,
  RotateCw,
  LayoutDashboard,
  Bot,
  ArrowRight,
  Server,
  Zap,
  Activity,
  ShieldCheck,
  Terminal,
} from "lucide-react";
// --- Utility Helper (if you don't have clsx/tailwind-merge) ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function WebhookServices() {
  return (
    <section className="w-full bg-white dark:bg-black mb-32 px-6 md:px-10 flex flex-col items-center justify-center overflow-hidden">
      {/* ======= Header ======= */}
      <div className="max-w-3xl text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
          Infrastructure Level Reliability
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          The Complete Webhook Pipeline
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto"
        >
          Ingest, process, and debug webhooks with an infrastructure designed
          for scale. We handle the plumbing so you can focus on the product.
        </motion.p>
      </div>

      {/* ======= Bento Grid Layout ======= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
        {/* Card 1: The Gateway (Spans 2 columns) */}
        <div className="md:col-span-2 group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
          <div className="p-6 md:p-10 z-10">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Gateway & Persistence
            </h3>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-sm">
              We buffer requests between providers (Stripe, Shopify) and your
              app. If your server blinks, the data is safe.
            </p>
          </div>

          {/* Visual: Animated Beam */}
          <div className="relative h-48 w-full border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center justify-center overflow-hidden">
            <WebhookBeamVisual />
          </div>
        </div>

        {/* Card 2: AI Analysis (Tall card) */}
        <div className="md:col-span-1 md:row-span-2 group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
          <div className="p-6 md:p-8 z-10 flex-1">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <Bot className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              AI Debugger
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Automatic error analysis. We explain failures in plain English and
              suggest code fixes.
            </p>
          </div>
          <div className="relative h-64 w-full bg-neutral-900 p-4 font-mono text-xs text-green-400 flex flex-col gap-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/90 z-20"></div>
            <div className="opacity-50 text-neutral-500">
              $ analyzing payload...
            </div>
            <div className="text-red-400">Error: 400 Bad Request</div>
            <div className="text-neutral-300 pl-2">
              Signature verification failed.
            </div>
            <div className="mt-2 text-purple-400">AI Suggestion:</div>
            <div className="text-neutral-300 pl-2">
              Use the raw body stream for HMAC calculation, not the parsed JSON.
            </div>
            <div className="mt-4 border border-neutral-700 rounded p-2 bg-neutral-800/50">
              <span className="text-blue-300">const</span> raw ={" "}
              <span className="text-yellow-300">await</span> req.buffer();
            </div>
          </div>
        </div>

        {/* Card 3: Retries */}
        <div className="md:col-span-1 group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
          <div className="p-6 z-10">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400">
              <RotateCw className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Smart Retries
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Exponential backoff strategies tailored to your needs.
            </p>
          </div>
          <div className="h-24 w-full relative flex items-center justify-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ height: 10, opacity: 0.3 }}
                animate={{ height: [10, 40, 10], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                className="w-3 rounded-full bg-orange-500"
              />
            ))}
          </div>
        </div>

        {/* Card 4: Dashboard */}
        <div className="md:col-span-1 group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
          <div className="p-6 z-10">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Observability
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Full visibility into every header, payload, and response.
            </p>
          </div>
          <div className="h-24 w-full relative px-4">
            <div className="space-y-2 opacity-60">
              <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-2 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-2 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            </div>
            <div className="absolute bottom-4 right-4 h-8 w-8 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// CUSTOM ANIMATED BEAM IMPLEMENTATION
// A simplified version of Magic UI's Beam to show data flow
// =========================================================================

function WebhookBeamVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null); // Provider
  const div2Ref = useRef<HTMLDivElement>(null); // Gateway
  const div3Ref = useRef<HTMLDivElement>(null); // DB

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-between p-10"
      ref={containerRef}
    >
      {/* Left Node: Provider */}
      <div className="flex flex-col items-center gap-2 z-10">
        <div
          ref={div1Ref}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-black"
        >
          <Zap className="h-5 w-5 text-amber-500" />{" "}
          {/* Stripe/Provider icon */}
        </div>
        <span className="text-[10px] font-medium text-neutral-500">
          Provider
        </span>
      </div>

      {/* Middle Node: Gateway */}
      <div className="flex flex-col items-center gap-2 z-10">
        <div
          ref={div2Ref}
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 p-2 shadow-sm dark:border-blue-900 dark:bg-blue-950"
        >
          <ShieldCheck className="h-6 w-6 text-blue-600" />
        </div>
        <span className="text-[10px] font-medium text-blue-600">Gateway</span>
      </div>

      {/* Right Node: Your App */}
      <div className="flex flex-col items-center gap-2 z-10">
        <div
          ref={div3Ref}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-black"
        >
          <Server className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        </div>
        <span className="text-[10px] font-medium text-neutral-500">
          Your App
        </span>
      </div>

      {/* The Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        duration={2}
        delay={1}
        reverse={false}
      />
    </div>
  );
}

// The Logic for drawing lines between refs
function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  duration = 3,
  delay = 0,
  reverse = false,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  duration?: number;
  delay?: number;
  reverse?: boolean;
}) {
  const [pathD, setPathD] = useState("");

  // Calculate SVG Path on mount/resize
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      const startX = rectA.left - containerRect.left + rectA.width / 2;
      const startY = rectA.top - containerRect.top + rectA.height / 2;
      const endX = rectB.left - containerRect.left + rectB.width / 2;
      const endY = rectB.top - containerRect.top + rectB.height / 2;

      const controlY = startY;
      // Simple quadratic bezier curve looks like a wire
      const d = `M ${startX} ${startY} Q ${
        (startX + endX) / 2
      } ${controlY} ${endX} ${endY}`;
      setPathD(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [containerRef, fromRef, toRef]);

  return (
    <svg
      fill="none"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible"
    >
      {/* Background static line */}
      <path
        d={pathD}
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.1"
        strokeLinecap="round"
        className="text-neutral-400 dark:text-neutral-600"
      />
      {/* Moving gradient line */}
      <path
        d={pathD}
        stroke="url(#gradient-beam)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0, 1000; 1000, 0" // Simulates flow
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          keyTimes="0; 1"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="1000; 0"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <linearGradient id="gradient-beam" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" stopOpacity="0" offset="0" />{" "}
          {/* Blue fade in */}
          <stop stopColor="#3b82f6" offset="0.5" /> {/* Blue center */}
          <stop stopColor="#3b82f6" stopOpacity="0" offset="1" />{" "}
          {/* Blue fade out */}
        </linearGradient>
      </defs>
    </svg>
  );
}
