"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Globe,
  Plus,
  RefreshCw,
  Server,
  ShieldCheck,
  Webhook,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Ensure this helper exists or copy from previous answers

// --- Mock Data for Providers ---
const providers = [
  {
    id: "stripe",
    name: "Stripe",
    color: "bg-indigo-600",
    icon: <Zap className="w-5 h-5 text-white" />,
  },
  {
    id: "shopify",
    name: "Shopify",
    color: "bg-lime-500",
    icon: <Webhook className="w-5 h-5 text-white" />,
  },
  {
    id: "github",
    name: "GitHub",
    color: "bg-neutral-800",
    icon: <Server className="w-5 h-5 text-white" />,
  },
  {
    id: "custom",
    name: "Custom",
    color: "bg-blue-500",
    icon: <Globe className="w-5 h-5 text-white" />,
  },
];

export default function Webhooks() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-50 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Connections
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg">
              Manage your webhook gateways. We sit between your providers and
              your API to ensure 100% delivery reliability.
            </p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" /> New Connection
          </Button>
        </div>

        {/* If creating, show Wizard, else show Explainer/Dashboard */}
        <AnimatePresence mode="wait">
          {isCreating ? (
            <CreateConnectionWizard
              key="wizard"
              onCancel={() => setIsCreating(false)}
            />
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* 1. Explainer Diagram Card */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium mb-4">
                      <ShieldCheck className="w-3 h-3" /> Reliability Layer
                    </div>
                    <h3 className="text-xl font-bold mb-3">How it works</h3>
                    <ul className="space-y-4">
                      <StepItem
                        number="1"
                        title="We give you a unique Gateway URL"
                        desc="You paste this URL into Stripe, Shopify, or any webhook provider instead of your own."
                      />
                      <StepItem
                        number="2"
                        title="We ingest and buffer events"
                        desc="If your server goes down, we hold the data. We handle the traffic spikes."
                      />
                      <StepItem
                        number="3"
                        title="We forward to your API"
                        desc="We deliver the payload to your destination. If it fails, we retry automatically."
                      />
                    </ul>
                  </div>

                  {/* Visual Diagram */}
                  <div className="bg-neutral-100 dark:bg-neutral-950 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between relative">
                    {/* Dotted Line */}
                    <div className="absolute top-1/2 left-6 right-6 h-0.5 border-t border-dashed border-neutral-300 dark:border-neutral-700 -z-0" />

                    <DiagramNode
                      label="Provider"
                      sub="Stripe/Shopify"
                      icon={<Zap className="w-5 h-5 text-amber-500" />}
                    />

                    <div className="z-10 bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-900 px-4 py-2 rounded-lg shadow-sm flex flex-col items-center">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                        DEVOFY GATEWAY
                      </span>
                      <div className="flex gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-150"></span>
                      </div>
                    </div>

                    <DiagramNode
                      label="Your API"
                      sub="Destination"
                      icon={<Server className="w-5 h-5 text-neutral-500" />}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Empty State (or List) */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Active Connections
                </h3>
                <div className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                    <Webhook className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h4 className="text-neutral-900 dark:text-white font-medium mb-2">
                    No connections yet
                  </h4>
                  <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mb-6">
                    Create your first connection to start receiving reliable
                    webhooks from your providers.
                  </p>
                  <Button variant="outline" onClick={() => setIsCreating(true)}>
                    Create Connection
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// WIZARD COMPONENT
// ============================================================================

function CreateConnectionWizard({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [destinationUrl, setDestinationUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const handleNext = () => {
    if (step === 1 && selectedProvider) setStep(2);
    if (step === 2 && destinationUrl) {
      // Mock API Call to generate URL
      setTimeout(() => {
        setGeneratedUrl(
          `https://hooks.devofy.com/v1/gateway/${selectedProvider}_${Math.random()
            .toString(36)
            .substr(2, 9)}`
        );
        setStep(3);
      }, 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Wizard Header */}
      <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-neutral-50/50 dark:bg-neutral-950/50">
        <div>
          <h2 className="text-lg font-bold">New Connection</h2>
          <p className="text-xs text-neutral-500">Step {step} of 3</p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i <= step ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-800"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-8 min-h-[400px]">
        {/* STEP 1: Choose Provider */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              Where are events coming from?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {providers.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProvider(p.id)}
                  className={cn(
                    "cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all hover:scale-[1.02]",
                    selectedProvider === p.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500"
                      : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      p.color
                    )}
                  >
                    {p.icon}
                  </div>
                  <span className="font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Destination URL */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              Where should we forward events?
            </h3>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Your API Endpoint
              </label>
              <Input
                placeholder="https://api.yourcompany.com/webhooks/stripe"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className="h-12 bg-neutral-50 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700 font-mono text-sm"
              />
              <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> We'll verify SSL
                certificates automatically.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Success / Copy URL */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center space-y-6 pt-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Connection Ready!</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm mx-auto">
                Copy the URL below and paste it into your provider's webhook
                settings.
              </p>
            </div>

            <div className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex items-center justify-between gap-4">
              <code className="text-sm font-mono text-neutral-700 dark:text-neutral-300 break-all text-left">
                {generatedUrl}
              </code>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-white dark:hover:bg-neutral-800 shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-xs text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 w-full text-left">
              <span className="font-semibold block mb-1">
                What happens next?
              </span>
              When {selectedProvider} sends an event, we'll receive it, log it,
              and instantly retry forwarding it to your API if it fails.
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="px-8 py-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel}>
          {step === 3 ? "Close" : "Cancel"}
        </Button>
        {step < 3 && (
          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !selectedProvider) ||
              (step === 2 && !destinationUrl)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {step === 3 && (
          <Button
            onClick={onCancel}
            className="bg-neutral-900 dark:bg-white text-white dark:text-black"
          >
            Done
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function StepItem({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-sm border border-neutral-200 dark:border-neutral-700">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
          {desc}
        </p>
      </div>
    </li>
  );
}

function DiagramNode({
  label,
  sub,
  icon,
}: {
  label: string;
  sub: string;
  icon: any;
}) {
  return (
    <div className="z-10 flex flex-col items-center gap-3 bg-white dark:bg-neutral-900 p-2 rounded-xl">
      <div className="w-12 h-12 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black shadow-sm flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <div className="font-semibold text-xs">{label}</div>
        <div className="text-[10px] text-neutral-500">{sub}</div>
      </div>
    </div>
  );
}
