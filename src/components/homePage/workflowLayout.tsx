import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Globe, Layout, Smartphone } from "lucide-react";
import {
  faDiscord,
  faGithub,
  faShopify,
  faSlack,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "@/assets/logo-removebg-preview.png";

export default function WorkflowsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Input Refs
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full py-24 mb-32 bg-white dark:bg-black overflow-hidden flex flex-col items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>

      {/* Header */}
      <div className="relative text-center mb-16 z-10 max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
        >
          <span>Unified Pipeline</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Connect Your Entire Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-neutral-600 dark:text-neutral-400"
        >
          Devofy acts as the central nervous system for your webhooks. Ingest
          events from anywhere, process them, and deliver to your app reliably.
        </motion.p>
      </div>

      {/* ======= The Responsive Diagram ======= */}
      <div
        className="relative z-10 w-full max-w-[1000px] px-4"
        ref={containerRef}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 min-h-[500px] w-full p-8 md:p-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm shadow-xl">
          {/* Column 1: Sources (Inputs) */}
          <div className="flex flex-row md:flex-col justify-center gap-4 md:gap-8 w-full md:w-auto">
            <Circle ref={div1Ref}>
              <FontAwesomeIcon icon={faStripe} />
            </Circle>
            <Circle ref={div2Ref}>
              <FontAwesomeIcon icon={faGithub} />
            </Circle>
            <Circle ref={div3Ref}>
              <FontAwesomeIcon icon={faDiscord} />
            </Circle>
            <Circle ref={div4Ref}>
              <FontAwesomeIcon icon={faShopify} />
            </Circle>
            <Circle ref={div5Ref}>
              <FontAwesomeIcon icon={faSlack} />
            </Circle>
          </div>

          {/* Column 2: Central Hub */}
          <div className="relative z-90 flex flex-col items-center justify-center p-4 ">
            <div
              ref={centerRef}
              className="h-24 w-24 rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-blue-500/30 border-4 border-white dark:border-neutral-900 relative"
            >
              {/* Pulsing effect */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500 animate-ping opacity-20"></div>
              <img src={logo} alt="" />
            </div>
          </div>

          {/* Column 3: Destination (Output) */}
          <div className="flex flex-col justify-center items-center w-full md:w-auto">
            <div
              ref={endRef}
              className="flex flex-col items-center gap-2 p-6 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-900/50"
            >
              <div className="h-14 w-14 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm border border-neutral-200 dark:border-neutral-700">
                <User className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
              </div>
              <span className="text-sm font-medium text-neutral-500">
                Your App
              </span>
            </div>
          </div>
        </div>

        {/* Animated Beams Layer */}
        {/* We map inputs to center, then center to output */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={centerRef}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={centerRef}
          duration={3}
          delay={0.5}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={centerRef}
          duration={3}
          delay={1}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={centerRef}
          duration={3}
          delay={1.5}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={centerRef}
          duration={3}
          delay={2}
        />

        {/* Output Beam (Center -> End) */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={centerRef}
          toRef={endRef}
          duration={2}
        />
      </div>
    </section>
  );
}

// =========================================================================
// Helper Components
// =========================================================================

// 1. The Circle Container for Icons
const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:border-neutral-800 dark:bg-neutral-950 hover:scale-110 transition-transform duration-200 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

// 2. The Animated Beam Logic
function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  duration = 3,
  delay = 0,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  duration?: number;
  delay?: number;
}) {
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Calculate path dynamically
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });

      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      // Get relative coordinates inside the container
      const startX = rectA.left - containerRect.left + rectA.width / 2;
      const startY = rectA.top - containerRect.top + rectA.height / 2;
      const endX = rectB.left - containerRect.left + rectB.width / 2;
      const endY = rectB.top - containerRect.top + rectB.height / 2;

      // Draw a Bezier Curve
      // Control points depend on horizontal vs vertical layout
      const isHorizontal = Math.abs(endX - startX) > Math.abs(endY - startY);

      let d = "";
      if (isHorizontal) {
        // Horizontal flow control points
        const controlX1 = startX + (endX - startX) * 0.5;
        const controlX2 = endX - (endX - startX) * 0.5;
        d = `M ${startX} ${startY} C ${controlX1} ${startY} ${controlX2} ${endY} ${endX} ${endY}`;
      } else {
        // Vertical flow control points (for mobile)
        const controlY1 = startY + (endY - startY) * 0.5;
        const controlY2 = endY - (endY - startY) * 0.5;
        d = `M ${startX} ${startY} C ${startX} ${controlY1} ${endX} ${controlY2} ${endX} ${endY}`;
      }

      setPathD(d);
    };

    // Observers to handle resizing gracefully
    const resizeObserver = new ResizeObserver((entries) => {
      // Debounce slightly or just call update
      requestAnimationFrame(updatePath);
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Initial call
    const timer = setTimeout(updatePath, 100);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [containerRef, fromRef, toRef]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute left-0 top-0 z-0 transform-gpu"
    >
      <path
        d={pathD}
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.1"
        strokeLinecap="round"
        className="text-neutral-400 dark:text-neutral-600"
      />
      <path
        d={pathD}
        stroke="url(#gradient-workflow)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0, 1500; 1500, 0"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          keyTimes="0; 1"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="1500; 0"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <linearGradient id="gradient-workflow" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" stopOpacity="0" offset="0" />
          <stop stopColor="#6366f1" offset="0.5" />
          <stop stopColor="#3b82f6" stopOpacity="0" offset="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Utility function for classes (if not already imported)
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
