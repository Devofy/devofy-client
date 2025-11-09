import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Webhook, Repeat, CheckCircle, Activity } from "lucide-react";

export default function StripeWorkflow() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white dark:bg-[#0b0c10] text-black dark:text-white overflow-hidden p-3 sm:p-6 rounded-xl shadow-sm">
      {/* Subtle animated grid background */}
      <motion.div
        className="absolute w-full h-full opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      ></motion.div>

      {/* Workflow cards (horizontal compact layout) */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 z-10 w-full max-w-5xl">
        <WorkflowCard
          icon={<Server className="w-5 h-5 text-blue-400" />}
          title="Stripe Server"
          desc="Webhook triggered"
        />

        <Connector />

        <WorkflowCard
          icon={<Webhook className="w-5 h-5 text-green-400" />}
          title="Our Platform"
          desc="Receives webhook"
        />

        <Connector />

        <WorkflowCard
          icon={<Activity className="w-5 h-5 text-yellow-400" />}
          title="Queue System"
          desc="Insert & retry if failed"
        />

        <Connector />

        <WorkflowCard
          icon={<Repeat className="w-5 h-5 text-cyan-400" />}
          title="Delivery Check"
          desc="Retry or forward event"
        />

        <Connector />

        <WorkflowCard
          icon={<CheckCircle className="w-5 h-5 text-purple-400" />}
          title="User API"
          desc="Update successful"
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
    className="w-full md:w-44 text-center"
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0,255,255,0.2)" }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <Card className="bg-white dark:bg-[#15191e] border border-gray-300 dark:border-gray-800 shadow-sm hover:shadow-cyan-500/20 transition-all duration-300 rounded-lg">
      <CardHeader className="p-3">
        <div className="flex justify-center mb-1">{icon}</div>
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-gray-600 dark:text-gray-400 px-3 pb-3">
        {desc}
      </CardContent>
    </Card>
  </motion.div>
);

const Connector = () => (
  <>
    {/* Mobile vertical connector */}
    <motion.div
      className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full md:hidden"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8 }}
      style={{ originY: 0 }}
    />
    {/* Desktop horizontal connector */}
    <motion.div
      className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full hidden md:block"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
      style={{ originX: 0 }}
    />
  </>
);
