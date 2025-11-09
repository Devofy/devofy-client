import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bell, Server, Repeat, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function SlackWebhookFlow() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stages = [
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Event Triggered",
      subtitle: "User Action or Alert",
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: "Webhook Received",
      subtitle: "Processed by Platform",
    },
    {
      icon: <Repeat className="w-5 h-5" />,
      title: "Queue & Retry",
      subtitle: "Ensure Delivery",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Slack API",
      subtitle: "Send Notification",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Message Delivered",
      subtitle: "Channel Updated",
    },
  ];

  return (
    <Card className="w-full max-w-md mx-auto mt-10 bg-linear-to-b from-indigo-900 to-gray-800 text-white rounded-2xl shadow-lg p-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold">
          Slack Notification Workflow
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex flex-col items-center space-y-8">
        {stages.map((s, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {i !== 0 && (
              <motion.div
                className="absolute -top-8 h-8 w-0.5 border-l border-dotted border-gray-500"
                animate={{ borderColor: stage === i ? "#818CF8" : "#374151" }}
                transition={{ duration: 0.4 }}
              />
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{
                scale: stage === i ? 1.05 : 0.95,
                opacity: stage === i ? 1 : 0.6,
                boxShadow:
                  stage === i
                    ? "0px 0px 12px rgba(129, 140, 248, 0.6)"
                    : "none",
              }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-xl border border-gray-700 w-64 text-sm"
            >
              <div
                className={`p-2 rounded-full ${
                  stage === i
                    ? "bg-linear-to-r from-indigo-400 to-purple-500"
                    : "bg-gray-700"
                }`}
              >
                {s.icon}
              </div>
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-xs text-gray-400">{s.subtitle}</p>
              </div>
            </motion.div>

            {i < stages.length - 1 && (
              <motion.div
                className="absolute top-18 w-3 h-3 rounded-full bg-indigo-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === i ? [0, 1, 0] : 0 }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
