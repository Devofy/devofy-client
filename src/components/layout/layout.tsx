import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <motion.div
        initial={false}
        animate={{ marginLeft: expanded ? 240 : 80 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <Header />
        <main className="flex-1 overflow-y-auto px-8 py-6">{children}</main>
      </motion.div>
    </div>
  );
}
