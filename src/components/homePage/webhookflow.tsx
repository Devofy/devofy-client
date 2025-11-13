import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Zap, Database, Cpu, Send } from "lucide-react";

export default function WebhookFlow() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-black dark:via-blue-950/10 dark:to-black">
      {/* --- HEADER SECTION --- */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6 inline-flex items-center justify-center rounded-full border border-blue-500/40 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-6 py-2 text-sm font-semibold text-blue-600 dark:text-blue-300 shadow-lg shadow-blue-500/10"
        >
          <span className="z-10 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Follow the Flow
          </span>
          <span className="absolute -left-12 w-8 h-px bg-gradient-to-r from-transparent to-blue-400/60"></span>
          <span className="absolute -right-12 w-8 h-px bg-gradient-to-l from-transparent to-blue-400/60"></span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight bg-black dark:bg-white bg-clip-text text-transparent"
        >
          Follow Along the Flow of{" "}
          <span className="bg-blue-500 bg-clip-text text-transparent">
            Devofy
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
        >
          Visualize how Devofy streamlines your webhook lifecycle — from trigger
          to delivery with reliability and insight.
        </motion.p>
      </section>

      {/* --- FLOWCHART SECTION --- */}
      <div
        ref={canvasRef}
        className="relative w-full mx-auto px-4 py-20 overflow-hidden mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
          {/* Stripe */}
          <FlowNode
            label="Stripe"
            icon={<Database className="w-6 h-6" />}
            color="purple"
            delay={0.2}
            canvasRef={canvasRef}
          />

          <FlowArrow direction="right" delay={0.3} />

          {/* Webhook Trigger */}
          <FlowNode
            label="Webhook Trigger"
            icon={<Zap className="w-6 h-6" />}
            color="blue"
            delay={0.4}
            canvasRef={canvasRef}
          />

          <FlowArrow direction="right" delay={0.5} />

          {/* Devofy */}
          <FlowNodeDiamond label="Devofy" delay={0.6} canvasRef={canvasRef} />

          <FlowArrow direction="right" delay={0.7} />

          {/* Event Queue */}
          <FlowNode
            label="Event Queue"
            icon={<Database className="w-6 h-6" />}
            color="cyan"
            delay={0.8}
            canvasRef={canvasRef}
          />

          <FlowArrow direction="right" delay={0.9} />

          {/* Process */}
          <FlowNodeDiamond label="Process" delay={1.0} canvasRef={canvasRef} />

          <FlowArrow direction="right" delay={1.1} />

          {/* User Endpoint */}
          <FlowNode
            label="User Endpoint"
            icon={<Send className="w-6 h-6" />}
            color="green"
            delay={1.2}
            canvasRef={canvasRef}
          />
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
}

// --- Flow Node Component ---
function FlowNode({
  label,
  icon,
  color,
  delay,
  canvasRef,
}: {
  label: string;
  icon: React.ReactNode;
  color: "purple" | "blue" | "cyan" | "green";
  delay: number;
  canvasRef: React.RefObject<HTMLDivElement>;
}) {
  const colorClasses = {
    purple:
      "from-purple-500/20 to-purple-600/30 border-purple-500/40 text-purple-600 dark:text-purple-400",
    blue: "from-blue-500/20 to-blue-600/30 border-blue-500/40 text-blue-600 dark:text-blue-400",
    cyan: "from-cyan-500/20 to-cyan-600/30 border-cyan-500/40 text-cyan-600 dark:text-cyan-400",
    green:
      "from-green-500/20 to-green-600/30 border-green-500/40 text-green-600 dark:text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      drag
      dragConstraints={canvasRef}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative group cursor-grab active:cursor-grabbing flex-shrink-0`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          colorClasses[color].split(" ")[0]
        } ${
          colorClasses[color].split(" ")[1]
        } rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
      ></div>
      <div
        className={`relative w-48 h-28 rounded-2xl border-2 ${colorClasses[color]} bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl flex flex-col items-center justify-center gap-2 transition-all`}
      >
        <div className="opacity-80">{icon}</div>
        <span className="font-bold text-sm">{label}</span>
      </div>
    </motion.div>
  );
}

// --- Diamond Node Component ---
function FlowNodeDiamond({
  label,
  delay,
  canvasRef,
}: {
  label: string;
  delay: number;
  canvasRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 45 }}
      transition={{ duration: 0.5, delay }}
      drag
      dragConstraints={canvasRef}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileHover={{ scale: 1.1 }}
      className="relative group cursor-grab active:cursor-grabbing flex-shrink-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-50 via-blue-200 to-blue-700 shadow-2xl flex items-center justify-center">
        <span className="font-bold text-gray-900 text-sm transform -rotate-45 flex items-center gap-2">
          <Cpu className="w-5 h-5" />
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// --- Arrow Component ---
function FlowArrow({
  direction,
  delay,
}: {
  direction: "right" | "down";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className={`flex-shrink-0 ${
        direction === "down" ? "md:hidden" : "hidden md:block"
      }`}
    >
      <svg
        width="60"
        height="40"
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-60"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 5 20 L 45 20"
          stroke="url(#arrowGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        />
        <motion.path
          d="M 38 13 L 48 20 L 38 27"
          stroke="url(#arrowGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
        />
      </svg>
    </motion.div>
  );
}
