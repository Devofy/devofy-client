import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Filter,
  Globe,
  Home,
  Key,
  LayoutGrid,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  Terminal,
  Webhook,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Mock Data ---
const recentEvents = [
  {
    id: "evt_109238",
    status: "success",
    method: "POST",
    path: "/api/webhooks/stripe",
    time: "2ms ago",
  },
  {
    id: "evt_109237",
    status: "success",
    method: "POST",
    path: "/api/webhooks/stripe",
    time: "45ms ago",
  },
  {
    id: "evt_109236",
    status: "failed",
    method: "POST",
    path: "/api/webhooks/shopify",
    time: "120ms ago",
  },
  {
    id: "evt_109235",
    status: "success",
    method: "POST",
    path: "/api/webhooks/stripe",
    time: "2s ago",
  },
  {
    id: "evt_109234",
    status: "retrying",
    method: "POST",
    path: "/api/webhooks/github",
    time: "5s ago",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-50 flex font-sans">
      {/* ======= Sidebar Navigation ======= */}
     

      {/* ======= Main Content ======= */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        {/* <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" /> Dashboard
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span className="font-medium text-neutral-900 dark:text-white">
              Overview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
              <Filter className="w-3 h-3" /> Filter
            </Button>
            <Button
              size="sm"
              className="h-8 gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs"
            >
              <Plus className="w-3 h-3" /> New Connection
            </Button>
          </div>
        </header> */}

        {/* Dashboard Content Grid */}
        <div className="p-6 md:p-10 max-w-full mx-auto space-y-6">
          {/* Welcome & Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Requests"
              value="2.4M"
              change="+12.5%"
              trend="up"
            />
            <StatCard
              title="Avg. Latency"
              value="142ms"
              change="-4.1%"
              trend="down"
            />
            <StatCard
              title="Success Rate"
              value="99.98%"
              change="+0.2%"
              trend="up"
            />
            <StatCard
              title="Active Workflows"
              value="14"
              change="0"
              trend="neutral"
            />
          </div>

          {/* The Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-none md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* 1. Main Chart (Traffic Monitor) - Spans 2 cols, 1 row */}
            <Card className="md:col-span-2 md:row-span-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" /> Traffic
                    Monitor
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Real-time webhook ingestion (last 60m)
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-mono text-green-500">LIVE</span>
                </div>
              </div>
              {/* Custom SVG Chart Area */}
              <div className="flex-1 w-full h-full relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <MockChart />
              </div>
            </Card>

            {/* 2. API Keys & Security - Spans 1 col, 1 row */}
            <Card className="md:col-span-1 md:row-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-4">
                  <Key className="w-4 h-4 text-amber-500" /> API Credentials
                </h3>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                    <p className="text-xs font-medium text-neutral-500 mb-1">
                      Public Key (Live)
                    </p>
                    <div className="flex items-center justify-between font-mono text-xs text-neutral-700 dark:text-neutral-300">
                      <span>pk_live_51M...x2d</span>
                      <Copy className="w-3 h-3 cursor-pointer hover:text-blue-500" />
                    </div>
                  </div>
                  <ApiKeyReveal />
                </div>
              </div>
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-4">
                <button className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                  Rotate Secrets <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </Card>

            {/* 3. Recent Activity Log - Spans 1 col, 1 row (Tall on mobile) */}
            <Card className="md:col-span-1 md:row-span-1 overflow-hidden flex flex-col">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-neutral-500" /> Live Logs
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {recentEvents.map((evt, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between p-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon status={evt.status} />
                      <div>
                        <p className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                          {evt.id}
                        </p>
                        <p className="text-[10px] text-neutral-400 uppercase">
                          {evt.method} • {evt.path}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono group-hover:text-neutral-600 dark:group-hover:text-neutral-200">
                      {evt.time}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 4. Webhook Flow Visualizer - Spans 2 cols, 1 row */}
            <Card className="md:col-span-2 md:row-span-1 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 z-10">
                <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span className="text-[10px] font-medium text-green-600 dark:text-green-400">
                    All Systems Operational
                  </span>
                </div>
              </div>

              <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-6">
                <Webhook className="w-4 h-4 text-purple-500" /> Active Pipeline
              </h3>

              {/* Visual Flow Representation */}
              <div className="flex-1 flex items-center justify-between px-4 md:px-12 relative">
                {/* Connecting Line (Behind) */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-200 dark:bg-neutral-800 -z-10"></div>

                {/* Source Node */}
                <FlowNode
                  icon={
                    <Globe className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                  }
                  label="Source"
                  sub="Stripe, Shopify"
                />

                {/* Processing Node */}
                <div className="relative">
                  <FlowNode
                    icon={
                      <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    }
                    label="Transformation"
                    sub="Filtering & Retry"
                    active
                  />
                  {/* Animated pulse ring */}
                  <div className="absolute inset-0 rounded-full border border-blue-500 opacity-20 animate-ping"></div>
                </div>

                {/* Destination Node */}
                <FlowNode
                  icon={
                    <Terminal className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                  }
                  label="Destination"
                  sub="Your API"
                />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= Helper Components ================= */

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}) {
  const isUp = trend === "up";
  const isDown = trend === "down";
  return (
    <Card className="flex flex-col justify-between h-28">
      <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
        {title}
      </span>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          {value}
        </span>
        <span
          className={cn(
            "text-xs font-medium px-1.5 py-0.5 rounded",
            isUp
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : isDown
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
          )}
        >
          {change}
        </span>
      </div>
    </Card>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
        active
          ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white"
          : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
      )}
    >
      {icon}
      <span className="hidden md:block">{label}</span>
    </div>
  );
}

function FlowNode({
  icon,
  label,
  sub,
  active,
}: {
  icon: any;
  label: string;
  sub: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 z-10 bg-white dark:bg-black px-2">
      <div
        className={cn(
          "h-12 w-12 rounded-full border flex items-center justify-center shadow-sm transition-all",
          active
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
            : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
        )}
      >
        {icon}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-neutral-900 dark:text-white">
          {label}
        </p>
        <p className="text-[10px] text-neutral-500">{sub}</p>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "success")
    return (
      <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
    );
  if (status === "failed")
    return (
      <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
    );
  return <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />;
}

function ApiKeyReveal() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs font-medium text-neutral-500">Secret Key</p>
        <button
          onClick={() => setVisible(!visible)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
        >
          {visible ? (
            <EyeOff className="w-3 h-3" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between font-mono text-xs text-neutral-700 dark:text-neutral-300">
        <span className={cn(!visible && "blur-sm select-none")}>
          {visible ? "sk_live_9384209384029384" : "sk_live_••••••••••••••••"}
        </span>
        <Copy className="w-3 h-3 cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  );
}

// Simple Mock SVG Chart using pure CSS/SVG
function MockChart() {
  // Generate some random data points
  const points = [
    10, 25, 18, 30, 45, 35, 55, 40, 60, 75, 50, 65, 80, 70, 90, 85, 95,
  ];
  const max = Math.max(...points);
  const height = 100;
  const width = 100; // percent

  const polylinePoints = points
    .map((val, i) => {
      const x = (i / (points.length - 1)) * 100 * 8; // scale x
      const y = 100 - (val / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 800 100"
      className="w-full h-full absolute bottom-0 left-0 px-2 pb-2"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        points={polylinePoints}
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        fill="url(#gradient)"
        stroke="none"
        points={`0,100 ${polylinePoints} 800,100`}
      />
    </svg>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
