import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Key,
  Lock,
  Plus,
  ShieldAlert,
  Trash2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- Types & Mock Data ---
interface ApiKey {
  id: string;
  label: string;
  token: string;
  created: string;
  lastUsed: string;
  connections: number; // Current active connections on this key
}

const PLAN_LIMITS = {
  maxKeys: 2,
  maxConnectionsPerKey: 3,
  maxRequests: 100000,
  currentRequests: 65420,
};

export default function ApiKeys() {
  // Mock State
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: "key_1",
      label: "Production Server",
      token: "sk_live_9384209384029384",
      created: "Oct 24, 2023",
      lastUsed: "2 mins ago",
      connections: 2,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  // Computed Limits
  const usedKeys = keys.length;
  const isLimitReached = usedKeys >= PLAN_LIMITS.maxKeys;
  const requestPercentage =
    (PLAN_LIMITS.currentRequests / PLAN_LIMITS.maxRequests) * 100;

  // Handlers
  const handleCreateKey = () => {
    if (isLimitReached) return;

    const newKey: ApiKey = {
      id: `key_${Math.random().toString(36).substr(2, 5)}`,
      label: newLabel || "New API Key",
      token: `sk_live_${Math.random().toString(36).substr(2, 18)}`,
      created: "Just now",
      lastUsed: "Never",
      connections: 0,
    };

    setKeys([...keys, newKey]);
    setIsCreating(false);
    setNewLabel("");
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-50 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">API Keys</h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Manage authentication tokens for your backend integrations.
            </p>
          </div>

          <Button
            onClick={() => setIsCreating(true)}
            disabled={isLimitReached}
            className={cn(
              "gap-2 shadow-lg transition-all",
              isLimitReached
                ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
            )}
          >
            {isLimitReached ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {isLimitReached ? "Limit Reached" : "Create New Key"}
          </Button>
        </div>

        {/* Plan Usage Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Request Usage */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Monthly Requests</span>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {PLAN_LIMITS.currentRequests.toLocaleString()} /{" "}
                {PLAN_LIMITS.maxRequests.toLocaleString()}
              </span>
            </div>
            <UsageBar percentage={requestPercentage} color="blue" />
            <p className="text-xs text-neutral-500 mt-3">
              Resets in 14 days.{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Upgrade Plan
              </span>
            </p>
          </div>

          {/* Key Usage Limit */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                  <Key className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Key Limit</span>
              </div>
              <span
                className={cn(
                  "text-xs font-bold",
                  isLimitReached ? "text-amber-500" : "text-neutral-500"
                )}
              >
                {usedKeys} / {PLAN_LIMITS.maxKeys} Active
              </span>
            </div>
            <UsageBar
              percentage={(usedKeys / PLAN_LIMITS.maxKeys) * 100}
              color={isLimitReached ? "amber" : "purple"}
            />
            <p className="text-xs text-neutral-500 mt-3 flex items-center gap-1">
              {isLimitReached && (
                <AlertTriangle className="w-3 h-3 text-amber-500" />
              )}
              {isLimitReached
                ? "Max limit reached. Delete a key to create new."
                : "You can create 1 more key."}
            </p>
          </div>
        </div>

        {/* API Keys List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Active Keys
          </h2>

          <AnimatePresence>
            {keys.map((key) => (
              <ApiKeyCard
                key={key.id}
                data={key}
                onDelete={() => handleDeleteKey(key.id)}
                maxConn={PLAN_LIMITS.maxConnectionsPerKey}
              />
            ))}
          </AnimatePresence>

          {keys.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
              <p className="text-neutral-500">No active API keys found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Key Modal Overlay */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Generate New Key</h3>
                    <p className="text-xs text-neutral-500">
                      This key will have full scope access.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Key Label
                    </label>
                    <Input
                      autoFocus
                      placeholder="e.g., Staging Environment"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="bg-neutral-50 dark:bg-neutral-950"
                    />
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-3 rounded-lg text-xs text-amber-800 dark:text-amber-500 flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    You will only be able to view this key once upon creation.
                    Store it securely.
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateKey}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Generate Key
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function ApiKeyCard({
  data,
  onDelete,
  maxConn,
}: {
  data: ApiKey;
  onDelete: () => void;
  maxConn: number;
}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm hover:border-blue-300 dark:hover:border-blue-900 transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
              {data.label}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900">
              Active
            </span>
          </div>

          {/* Token Mask */}
          <div className="flex items-center gap-2 font-mono text-sm bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 w-full md:w-fit max-w-full">
            <span className="text-neutral-500 select-none">sk_live_</span>
            <span className="truncate">
              {revealed
                ? data.token.replace("sk_live_", "")
                : "••••••••••••••••••••••••"}
            </span>
            <div className="flex items-center gap-1 pl-2 border-l border-neutral-200 dark:border-neutral-800 ml-2">
              <button
                onClick={() => setRevealed(!revealed)}
                className="p-1 hover:text-blue-500 text-neutral-400"
              >
                {revealed ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={handleCopy}
                className="p-1 hover:text-blue-500 text-neutral-400"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-2">
            Created {data.created} • Last used {data.lastUsed}
          </p>
        </div>

        {/* Right: Restrictions & Actions */}
        <div className="flex flex-col md:items-end gap-4 min-w-[200px]">
          {/* Connection Limit Bar */}
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-500">Connections</span>
              <span
                className={cn(
                  "font-medium",
                  data.connections >= maxConn
                    ? "text-red-500"
                    : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                {data.connections} / {maxConn}
              </span>
            </div>
            <UsageBar
              percentage={(data.connections / maxConn) * 100}
              color={data.connections >= maxConn ? "red" : "green"}
              size="sm"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/10 hover:border-red-300 w-full md:w-auto text-xs"
          >
            <Trash2 className="w-3 h-3 mr-2" /> Revoke Key
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function UsageBar({
  percentage,
  color = "blue",
  size = "md",
}: {
  percentage: number;
  color?: "blue" | "purple" | "green" | "red" | "amber";
  size?: "sm" | "md";
}) {
  const colors = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    green: "bg-green-500",
    red: "bg-red-500",
    amber: "bg-amber-500",
  };

  return (
    <div
      className={cn(
        "w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden",
        size === "sm" ? "h-1.5" : "h-2"
      )}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(percentage, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full rounded-full", colors[color])}
      />
    </div>
  );
}
