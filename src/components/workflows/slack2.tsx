import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Server, Send, Activity } from "lucide-react";

export default function SlackWorkflow() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white dark:bg-[#0b0c10] text-black dark:text-white overflow-hidden p-3 sm:p-6 rounded-xl shadow-sm">
      {/* Subtle animated grid background */}
      <motion.div
        className="absolute w-full h-full rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Workflow Steps */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 z-10 w-full max-w-5xl">
        <WorkflowCard
          icon={<MessageSquare className="w-6 h-6 text-blue-400 mx-auto" />}
          title="Slack Event"
          desc="Message or action event"
        />

        <Connector />

        <WorkflowCard
          icon={<Send className="w-6 h-6 text-green-400 mx-auto" />}
          title="Webhook Triggered"
          desc="Event sent to our endpoint"
        />

        <Connector />

        <WorkflowCard
          icon={<Server className="w-6 h-6 text-yellow-400 mx-auto" />}
          title="Queue Event"
          desc="Retry failed deliveries"
        />

        <Connector />

        <WorkflowCard
          icon={<Activity className="w-6 h-6 text-purple-400 mx-auto" />}
          title="Notify API"
          desc="Forward to user-defined API"
        />
      </div>
    </div>
  );
}

const WorkflowCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <motion.div
    className="w-full md:w-52 text-center"
    whileHover={{
      scale: 1.04,
      boxShadow: "0px 0px 20px rgba(0,255,255,0.25)",
    }}
    transition={{ type: "spring", stiffness: 180 }}
  >
    <Card className="bg-white dark:bg-[#15191e] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-cyan-500/20 transition-all duration-300">
      <CardHeader className="pb-1">
        <div className="flex justify-center mb-1">{icon}</div>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-gray-600 dark:text-gray-400">
        {desc}
      </CardContent>
    </Card>
  </motion.div>
);

const Connector = () => (
  <>
    {/* Mobile vertical connector */}
    <motion.div
      className="w-0.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full md:hidden"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.7 }}
      style={{ originY: 0 }}
    />
    {/* Desktop horizontal connector */}
    <motion.div
      className="w-10 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full hidden md:block"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7 }}
      style={{ originX: 0 }}
    />
  </>
);
