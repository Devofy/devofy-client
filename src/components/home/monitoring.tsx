import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code,
  Copy,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  Server,
  Terminal,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- Mock Data ---
const EVENTS = [
  {
    id: "evt_1Nxm3kL",
    status: 200,
    method: "POST",
    source: "Stripe",
    destination: "API /billing",
    timestamp: "Just now",
    latency: "45ms",
    payload: {
      type: "payment_intent.succeeded",
      data: { object: { id: "pi_3Nxm", amount: 2000, currency: "usd" } },
    },
    response: { status: 200, body: { received: true } },
  },
  {
    id: "evt_1Nxm3jK",
    status: 500,
    method: "POST",
    source: "Shopify",
    destination: "API /orders",
    timestamp: "2 mins ago",
    latency: "5002ms",
    payload: {
      id: 820982911946154508,
      email: "jon@doe.ca",
      total_price: "199.00",
    },
    response: { status: 500, body: { error: "Database timeout" } },
  },
  {
    id: "evt_1Nxm2hL",
    status: 200,
    method: "POST",
    source: "GitHub",
    destination: "API /ci-cd",
    timestamp: "15 mins ago",
    latency: "120ms",
    payload: { action: "push", repository: { name: "devofy-web" } },
    response: { status: 200, body: { build_started: true } },
  },
  {
    id: "evt_1Nxm1gM",
    status: 404,
    method: "POST",
    source: "Custom",
    destination: "API /hooks",
    timestamp: "1 hour ago",
    latency: "80ms",
    payload: { event: "user.signup", userId: "u_123" },
    response: { status: 404, body: { error: "Endpoint not found" } },
  },
  {
    id: "evt_1Nxm0fN",
    status: 200,
    method: "POST",
    source: "Stripe",
    destination: "API /billing",
    timestamp: "2 hours ago",
    latency: "55ms",
    payload: { type: "charge.updated" },
    response: { status: 200, body: { ok: true } },
  },
];

export default function Monitoring() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all"); // 'all', 'failed', 'success'

  const selectedEvent = EVENTS.find((e) => e.id === selectedEventId);

  const filteredEvents = EVENTS.filter((evt) => {
    if (filter === "failed") return evt.status >= 400;
    if (filter === "success") return evt.status < 400;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-50 font-sans flex flex-col md:flex-row overflow-hidden">
      {/* ======= Left Panel: Event List ======= */}
      <div
        className={cn(
          "flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300",
          selectedEventId
            ? "md:w-1/2 lg:w-2/5 md:border-r border-neutral-200 dark:border-neutral-800"
            : "w-full"
        )}
      >
        {/* Header / Stats */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Live Monitor
            </h1>
            <div className="flex gap-2">
              <StatusBadge label="98.5% Success" color="green" />
              <StatusBadge label="142ms Avg Latency" color="blue" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search by ID, source..."
                className="pl-9 bg-neutral-100 dark:bg-neutral-800 border-none h-9 text-sm"
              />
            </div>
            <FilterButton
              active={filter === "all"}
              label="All"
              onClick={() => setFilter("all")}
            />
            <FilterButton
              active={filter === "failed"}
              label="Failed"
              isError
              onClick={() => setFilter("failed")}
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 bg-neutral-50 dark:bg-black">
          {filteredEvents.map((evt) => (
            <motion.div
              layoutId={evt.id}
              key={evt.id}
              onClick={() => setSelectedEventId(evt.id)}
              className={cn(
                "group relative p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                selectedEventId === evt.id
                  ? "bg-white dark:bg-neutral-900 border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                  : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <StatusCodeBadge code={evt.status} />
                  <span className="font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    {evt.method}
                  </span>
                </div>
                <span className="text-xs text-neutral-400 tabular-nums">
                  {evt.timestamp}
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="font-medium text-sm text-neutral-900 dark:text-neutral-200 mb-0.5">
                    {evt.source}{" "}
                    <span className="text-neutral-400 mx-1">→</span>{" "}
                    {evt.destination}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono">
                    {evt.id}
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-neutral-300 transition-transform",
                    selectedEventId === evt.id
                      ? "translate-x-1 text-blue-500"
                      : "group-hover:translate-x-1"
                  )}
                />
              </div>
            </motion.div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 text-neutral-500 text-sm">
              No events found matching your filter.
            </div>
          )}
        </div>
      </div>

      {/* ======= Right Panel: Inspector Drawer ======= */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
              mass: 0.8,
            }}
            className="fixed md:relative top-0 right-0 w-full md:w-1/2 lg:w-3/5 h-screen bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 flex flex-col shadow-2xl z-20"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  Event Details
                  <StatusCodeBadge code={selectedEvent.status} />
                </h2>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  {selectedEvent.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-8 text-xs border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedEventId(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* 1. Request Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <DetailItem
                  label="Source"
                  value={selectedEvent.source}
                  icon={<Server className="w-3 h-3" />}
                />
                <DetailItem
                  label="Timestamp"
                  value={selectedEvent.timestamp}
                  icon={<Clock className="w-3 h-3" />}
                />
                <DetailItem
                  label="Latency"
                  value={selectedEvent.latency}
                  icon={<Activity className="w-3 h-3" />}
                />
                <DetailItem
                  label="Attempt"
                  value="#1"
                  icon={<RefreshCw className="w-3 h-3" />}
                />
              </div>

              {/* 2. Payload Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-neutral-900 dark:text-neutral-200">
                    <Code className="w-4 h-4 text-blue-500" /> Payload Body
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] text-neutral-500 gap-1 hover:text-blue-500"
                  >
                    <Copy className="w-3 h-3" /> Copy JSON
                  </Button>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <pre className="p-4 text-xs font-mono text-neutral-700 dark:text-neutral-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(selectedEvent.payload, null, 2)}
                  </pre>
                </div>
              </div>

              {/* 3. Response Section */}
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2 text-neutral-900 dark:text-neutral-200 mb-2">
                  <Terminal className="w-4 h-4 text-purple-500" /> Response
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 flex justify-between">
                    <span className="text-xs font-mono text-neutral-500">
                      HTTP {selectedEvent.response.status}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {selectedEvent.latency}
                    </span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-neutral-700 dark:text-neutral-300 overflow-x-auto">
                    {JSON.stringify(selectedEvent.response.body, null, 2)}
                  </pre>
                </div>
              </div>

              {/* 4. Troubleshooting Hint (Only if failed) */}
              {selectedEvent.status >= 400 && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
                      Potential Issue Detected
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-500/80 leading-relaxed">
                      The destination server responded with a 500 error. This
                      usually indicates a crash on the receiving endpoint. Check
                      the logs on <b>{selectedEvent.destination}</b> or try
                      retrying the event.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function FilterButton({
  active,
  label,
  onClick,
  isError,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  isError?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-9 px-4 rounded-md text-sm font-medium transition-colors border",
        active
          ? isError
            ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900"
            : "bg-white text-neutral-900 border-neutral-300 shadow-sm dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
          : "bg-transparent text-neutral-500 border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900"
      )}
    >
      {label}
    </button>
  );
}

function StatusCodeBadge({ code }: { code: number }) {
  if (code >= 200 && code < 300) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-500/30">
        <CheckCircle2 className="w-3 h-3" /> {code} OK
      </span>
    );
  }
  if (code >= 500) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30">
        <XCircle className="w-3 h-3" /> {code} ERR
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
      <AlertCircle className="w-3 h-3" /> {code}
    </span>
  );
}

function StatusBadge({
  label,
  color,
}: {
  label: string;
  color: "green" | "blue";
}) {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded-md text-[10px] font-medium border hidden md:inline-block",
        color === "green"
          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
          : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900"
      )}
    >
      {label}
    </span>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-100 dark:border-neutral-800">
      <div className="flex items-center gap-2 text-neutral-500 mb-1">
        {icon}
        <span className="text-[10px] uppercase font-semibold tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200 truncate">
        {value}
      </div>
    </div>
  );
}
