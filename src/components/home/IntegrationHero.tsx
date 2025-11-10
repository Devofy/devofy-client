import React, { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { User } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGithub,
  faShopify,
  faSlack,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import logo from "@/assets/logo-removebg-preview.png";

interface IconPosition {
  x: number;
  y: number;
}

export default function IntegrationsHero() {
  const [iconPositions, setIconPositions] = useState<
    Record<string, IconPosition>
  >({
    stripe: { x: -100, y: -100 },
    slack: { x: 80, y: -80 },
    shopify: { x: -80, y: 80 },
    discord: { x: 100, y: 60 },
    github: { x: -150, y: 20 },
    userapp: { x: 0, y: 0 },
  });

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-blue-100/20 to-white dark:from-black dark:via-[#10141c] dark:to-[#0e1117] py-24 md:py-32">
      <div className="relative container mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 md:gap-8 relative z-10 min-h-[500px]">
          {/* Left cluster */}
          <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
            <AppCluster
              iconPositions={iconPositions}
              setIconPositions={setIconPositions}
            />
          </div>

          {/* Center icon */}
          <motion.div
            className="relative z-3 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <CentralIcon />
          </motion.div>

          {/* Right cluster */}
          <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
            <AppIcon
              id="userapp"
              icon={<User className="w-8 h-8 text-green-500" />}
              label="User App"
              style={{ x: 0, y: 0 }}
              delay={0.6}
              isDraggable
              dragConstraints={{ left: 0, right: 200, top: -200, bottom: 200 }}
              iconPositions={iconPositions}
              setIconPositions={setIconPositions}
            />
          </div>
        </div>

        {/* Connecting lines */}
        <ConnectingLines iconPositions={iconPositions} />
      </div>
    </section>
  );
}

/* -------- Central Devofy Icon -------- */
function CentralIcon() {
  return (
    <div className="relative flex flex-col items-center group">
      <div className="absolute -inset-3 bg-blue-500/20 dark:bg-blue-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
      <div className="relative flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-gray-900 dark:bg-black rounded-3xl shadow-2xl border border-white/10 dark:border-white/20">
        <img src={logo} className="w-12 h-12 md:w-16 md:h-16" alt="Devofy" />
        <span className="mt-2 font-semibold text-white text-lg">Devofy</span>
      </div>
    </div>
  );
}

/* -------- Left App Cluster -------- */
function AppCluster({
  iconPositions,
  setIconPositions,
}: {
  iconPositions: Record<string, IconPosition>;
  setIconPositions: React.Dispatch<
    React.SetStateAction<Record<string, IconPosition>>
  >;
}) {
  const icons = [
    {
      id: "stripe",
      icon: (
        <FontAwesomeIcon
          icon={faStripe}
          className="text-purple-500"
          size="2x"
        />
      ),
      label: "Stripe",
      pos: { x: -100, y: -100 },
      delay: 0.3,
    },
    {
      id: "github",
      icon: (
        <FontAwesomeIcon
          icon={faGithub}
          className="text-black dark:text-white"
          size="2x"
        />
      ),
      label: "GitHub",
      pos: { x: -150, y: 20 },
      delay: 0.5,
    },
    {
      id: "slack",
      icon: (
        <FontAwesomeIcon icon={faSlack} className="text-blue-500" size="2x" />
      ),
      label: "Slack",
      pos: { x: 80, y: -100 },
      delay: 0.4,
    },
    {
      id: "shopify",
      icon: (
        <FontAwesomeIcon icon={faShopify} className="text-lime-500" size="2x" />
      ),
      label: "Shopify",
      pos: { x: -80, y: 80 },
      delay: 0.5,
    },
    {
      id: "discord",
      icon: (
        <FontAwesomeIcon
          icon={faDiscord}
          className="text-purple-500"
          size="2x"
        />
      ),
      label: "Discord",
      pos: { x: 100, y: 90 },
      delay: 0.6,
    },
  ];

  return (
    <div className="relative w-full h-full">
      {icons.map((item) => (
        <AppIcon
          key={item.label}
          id={item.id}
          icon={item.icon}
          label={item.label}
          style={item.pos}
          delay={item.delay}
          isDraggable
          dragConstraints={{ left: -200, right: 0, top: -250, bottom: 250 }}
          iconPositions={iconPositions}
          setIconPositions={setIconPositions}
        />
      ))}
    </div>
  );
}

/* -------- Individual App Icon -------- */
function AppIcon({
  id,
  icon,
  label,
  style,
  delay,
  isDraggable = false,
  dragConstraints,
  iconPositions,
  setIconPositions,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  style: { x?: number; y?: number };
  delay: number;
  isDraggable?: boolean;
  dragConstraints?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  iconPositions: Record<string, IconPosition>;
  setIconPositions: React.Dispatch<
    React.SetStateAction<Record<string, IconPosition>>
  >;
}) {
  const x = useMotionValue(style.x || 0);
  const y = useMotionValue(style.y || 0);

  useEffect(() => {
    const unsubX = x.on("change", (val) => {
      setIconPositions((prev) => ({ ...prev, [id]: { x: val, y: y.get() } }));
    });
    const unsubY = y.on("change", (val) => {
      setIconPositions((prev) => ({ ...prev, [id]: { x: x.get(), y: val } }));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [id, x, y, setIconPositions]);

  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-grab active:cursor-grabbing"
      style={{ left: "50%", top: "40%", x, y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      drag={isDraggable}
      dragConstraints={dragConstraints}
    >
      <div className="flex items-center justify-center w-18 h-18 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        {icon}
      </div>
      <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </motion.div>
  );
}

/* -------- Connecting Lines -------- */
function ConnectingLines({
  iconPositions,
}: {
  iconPositions: Record<string, IconPosition>;
}) {
  const leftColX = 220;
  const centerX = 600;
  const rightColX = 980;
  const centerY = 300;

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const gradients = [
    ["gradStripe", "#8B5CF6", "#3B82F6"],
    ["gradSlack", "#22C55E", "#3B82F6"],
    ["gradShopify", "#84CC16", "#3B82F6"],
    ["gradDiscord", "#A855F7", "#3B82F6"],
    ["gradGithub", "#6B7280", "#3B82F6"],
    ["gradOutput", "#3B82F6", "#22C55E"],
  ];

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      fill="none"
      initial="hidden"
      animate="visible"
    >
      <defs>
        {gradients.map(([id, start, end]) => (
          <linearGradient key={id} id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={start} stopOpacity="0.6" />
            <stop offset="100%" stopColor={end} stopOpacity="1" />
          </linearGradient>
        ))}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {["stripe", "slack", "shopify", "discord", "github"].map((id, i) => (
        <motion.path
          key={id}
          d={`M ${leftColX + iconPositions[id].x} ${
            centerY + iconPositions[id].y
          } Q ${(leftColX + centerX) / 2} ${centerY} ${centerX} ${centerY}`}
          stroke={`url(#grad${id.charAt(0).toUpperCase() + id.slice(1)})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow)"
          variants={lineVariants}
          transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
        />
      ))}

      {/* Center → User App */}
      <motion.path
        d={`M ${centerX} ${centerY}
     Q ${(centerX + rightColX) / 2 + 60} ${centerY - 30}
     ${rightColX + 140 + iconPositions.userapp.x} ${
          centerY + iconPositions.userapp.y - 10
        }`}
        stroke="url(#gradOutput)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow)"
        variants={lineVariants}
        transition={{ duration: 1.5, delay: 0.9 }}
      />
    </motion.svg>
  );
}
