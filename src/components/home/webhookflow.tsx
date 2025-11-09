"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

export default function WebhookFlow() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <StyleSheet />

      {/* --- HEADER SECTION --- */}
      <section className="flex flex-col items-center justify-center text-center py-12 px-4 border-t border-border/70">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-4 inline-flex items-center justify-center rounded-full border border-blue-500/40 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950/30 dark:text-blue-300"
        >
          <span className="z-10">Follow the Flow</span>
          {/* Decorative lines (like in the image) */}
          <span className="absolute -left-8 w-6 h-px bg-blue-300/60 dark:bg-blue-600"></span>
          <span className="absolute -right-8 w-6 h-px bg-blue-300/60 dark:bg-blue-600"></span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white"
        >
          Follow Along the Flow of{" "}
          <span className="text-blue-600 dark:text-blue-400">Devofy</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400"
        >
          Visualize how Devofy streamlines your webhook lifecycle — from trigger
          to delivery with reliability and insight.
        </motion.p>
      </section>

      {/* --- FLOWCHART SECTION (UNCHANGED) --- */}
      <div
        ref={canvasRef}
        id="webhook-canvas"
        className="transition-colors duration-300"
        style={styles.canvas}
      >
        {/* Stripe */}
        <motion.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
          style={{ ...styles.box, background: "var(--color-stripe)" }}
        >
          Stripe
        </motion.div>

        <Arrow />

        {/* Webhook Trigger */}
        <motion.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          style={{ ...styles.box, background: "var(--color-box-bg)" }}
        >
          Webhook Trigger
        </motion.div>

        <Arrow />

        {/* Devofy */}
        <motion.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          style={{ ...styles.diamond, background: "var(--color-accent)" }}
        >
          <span style={styles.diamondText}>Devofy</span>
        </motion.div>

        <Arrow />

        {/* Event Queue */}
        <motion.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          style={{ ...styles.box, background: "var(--color-box-bg)" }}
        >
          Event Queue
        </motion.div>

        <Arrow />

        {/* Process */}
        <motion.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          style={{ ...styles.diamond, background: "var(--color-accent)" }}
        >
          <span style={styles.diamondText}>Process</span>
        </motion.div>

        <Arrow />

        {/* User Endpoint */}
        <motion.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          style={{ ...styles.box, background: "var(--color-box-bg)" }}
        >
          User Endpoint
        </motion.div>
      </div>
    </>
  );
}

// --- Arrow Component ---
function Arrow() {
  return (
    <motion.div
      id="#webhook-canvas"
      className="webhook-arrow"
      drag
      dragElastic={0.1}
      // dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      style={styles.arrow}
    >
      →
    </motion.div>
  );
}

// --- Styles ---
const styles: Record<string, React.CSSProperties> = {
  canvas: {
    width: "100%",
    minHeight: "400px",
    padding: "40px 20px",
    background: "var(--color-canvas-bg)",
    color: "var(--color-text)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    position: "relative",
    fontFamily: "sans-serif",
    overflow: "hidden",
    borderRadius: "12px",
    flexWrap: "wrap",
  },
  box: {
    width: 140,
    height: 80,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "grab",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    flexShrink: 0,
  },
  diamond: {
    width: 100,
    height: 100,
    transform: "rotate(45deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "grab",
    color: "#000",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    flexShrink: 0,
  },
  diamondText: {
    transform: "rotate(-45deg)",
  },
  arrow: {
    fontSize: 32,
    color: "var(--color-arrow)",
    transition: "transform 0.3s ease",
    cursor: "grab",
    padding: "10px",
    userSelect: "none",
  },
};

// --- Theme-Aware CSS Variables ---
function StyleSheet() {
  return (
    <style>{`
      :root {
        --color-canvas-bg: #f3f6f4;
        --color-text: #1c1c1c;
        --color-box-bg: #f1f1f1;
        --color-stripe: #e0eeff;
        --color-accent: #f5d047;
        --color-arrow: #555;
      }

      .dark {
        --color-canvas-bg: #000000;
        --color-text: #f9fafb;
        --color-box-bg: #333;
        --color-stripe: #2a3a50;
        --color-accent: #f5d047;
        --color-arrow: #bbb;
      }

      @media (max-width: 992px) {
        #webhook-canvas {
          flex-direction: column;
          height: auto;
          gap: 20px;
          padding: 20px;
        }

        .webhook-arrow {
          transform: rotate(90deg);
        }
      }
    `}</style>
  );
}
