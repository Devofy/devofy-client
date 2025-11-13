import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Activity, Code2, Zap, Server, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-r from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100/50 dark:border-gray-800"
      >
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Welcome back,{" "}
          <span className="text-blue-600 dark:text-blue-400">Neekunj 👋</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Here’s an overview of your recent activity and webhook performance.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Active Webhooks",
            value: "12",
            icon: <Zap className="h-6 w-6 text-blue-500" />,
          },
          {
            title: "Total Requests",
            value: "8.2k",
            icon: <Server className="h-6 w-6 text-purple-500" />,
          },
          {
            title: "Avg. Response Time",
            value: "242ms",
            icon: <Activity className="h-6 w-6 text-green-500" />,
          },
          {
            title: "Error Rate",
            value: "0.4%",
            icon: <TrendingUp className="h-6 w-6 text-red-500" />,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl border-none shadow-md hover:shadow-lg bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl transition">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-none rounded-2xl shadow-md bg-white/80 dark:bg-gray-900/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Activity
            </CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Latest webhook triggers from your applications
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                event: "User Signup",
                status: "Success",
                time: "2 min ago",
                icon: <Code2 className="h-5 w-5 text-green-500" />,
              },
              {
                event: "Payment Processed",
                status: "Success",
                time: "10 min ago",
                icon: <Code2 className="h-5 w-5 text-blue-500" />,
              },
              {
                event: "Webhook Timeout",
                status: "Failed",
                time: "1 hr ago",
                icon: <Code2 className="h-5 w-5 text-red-500" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {item.event}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    item.status === "Success"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
