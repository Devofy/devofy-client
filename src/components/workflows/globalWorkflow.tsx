import React from "react";
import { motion } from "framer-motion";

export type Stage = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string; // tailwind gradient suffix or hex fallback
};

type Props = {
  title: string;
  stages: Stage[];
  activeIndex?: number; // optional control externally
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
};

export default function WorkflowCard({
  title,
  stages,
  activeIndex: activeIndexProp,
  autoPlay = true,
  intervalMs = 2400,
  className = "",
}: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (typeof activeIndexProp === "number") {
      setActiveIndex(activeIndexProp);
      return;
    }
    if (!autoPlay) return;
    const id = setInterval(
      () => setActiveIndex((s) => (s + 1) % stages.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [activeIndexProp, autoPlay, intervalMs, stages.length]);

  return (
    <div
      className={`rounded-2xl p-6 bg-linear-to-br from-slate-800 to-slate-900 dark:from-slate-100 dark:to-white/95 text-white dark:text-slate-900 shadow-xl ${className}`}
      role="region"
      aria-label={title}
    >
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* horizontal layout */}
      <div className="flex items-center gap-6 overflow-auto px-2">
        {stages.map((s, i) => {
          const isActive = i === activeIndex;
          const nodeBg =
            s.color ?? "bg-gradient-to-r from-indigo-500 to-indigo-700";
          return (
            <div key={s.id} className="flex items-center gap-4">
              {/* Node */}
              <motion.div
                initial={{ scale: 0.97, opacity: 0.65 }}
                animate={{
                  scale: isActive ? 1.06 : 0.97,
                  opacity: isActive ? 1 : 0.65,
                  boxShadow: isActive
                    ? "0 6px 30px rgba(99,102,241,0.18)"
                    : "none",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className={`min-w-[210px] max-w-[220px] flex items-start gap-3 p-4 rounded-xl ${nodeBg} text-white`}
              >
                <div
                  className={`flex-none p-2 rounded-full bg-white/20 ${
                    isActive ? "ring-2 ring-white/30" : ""
                  }`}
                >
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{s.title}</div>
                  {s.subtitle && (
                    <div className="text-xs opacity-80 mt-1">{s.subtitle}</div>
                  )}
                </div>
              </motion.div>

              {/* connector (except after last) */}
              {i < stages.length - 1 && (
                <Connector
                  active={isActive}
                  nextActive={i + 1 === activeIndex}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Animated connector component: a subtle arrow with pulsing dot when active */
function Connector({
  active,
  nextActive,
}: {
  active: boolean;
  nextActive: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width="48"
        height="28"
        viewBox="0 0 48 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 14 L44 14"
          stroke={active || nextActive ? "#A78BFA" : "#94A3B8"}
          strokeWidth={2}
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        <path
          d="M40 10 L44 14 L40 18"
          fill="none"
          stroke={active || nextActive ? "#A78BFA" : "#94A3B8"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* pulsing dot that travels when this connector is active */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          active
            ? { opacity: [0, 1, 0], y: [-6, 0, -6] }
            : nextActive
            ? { opacity: [0, 1, 0], y: [6, 0, 6] }
            : { opacity: 0 }
        }
        transition={{
          duration: 1.2,
          repeat: active || nextActive ? Infinity : 0,
        }}
        className="w-2 h-2 rounded-full bg-indigo-400 mt-2"
      />
    </div>
  );
}
