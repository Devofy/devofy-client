import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Activity,
  Key,
  Settings,
  LogOut,
  User,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import logo from "@/assets/logo-removebg-preview.png";

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Webhooks", icon: Workflow, href: "/webhooks" },
  { name: "Monitoring", icon: Activity, href: "/monitoring" },
  { name: "API Keys", icon: Key, href: "/apikeys" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export default function Sidebar({ expanded, setExpanded }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: expanded ? 240 : 80 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col justify-between",
        "bg-gradient-to-b from-white/70 to-gray-100/60 dark:from-gray-950/70 dark:to-gray-900/60",
        "backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 shadow-lg"
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <img src={logo} className="w-8 h-8 rounded-xl shrink-0" />
          <motion.h1
            initial={false}
            animate={{
              opacity: expanded ? 1 : 0,
              width: expanded ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="text-xl font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap overflow-hidden"
          >
            Devofy
          </motion.h1>
        </div>

        {menuItems.map(({ name, icon: Icon, href }) => {
          const isActive = location.pathname === href;

          return (
            <Button
              key={name}
              variant="ghost"
              onClick={() => navigate(href)}
              className={cn(
                "flex items-center gap-3 justify-start px-3 py-2 w-full rounded-xl transition-colors duration-200",
                isActive
                  ? "bg-gray-200/60 dark:bg-gray-800/70 text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800/60"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <motion.span
                initial={false}
                animate={{
                  opacity: expanded ? 1 : 0,
                  width: expanded ? "auto" : 0,
                }}
                transition={{ duration: 0.1 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {name}
              </motion.span>
            </Button>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2 p-3 border-t border-gray-200/50 dark:border-gray-800/50">
        <Button
          variant="ghost"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 justify-start px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800/60 rounded-xl transition-colors duration-200"
        >
          <User className="h-5 w-5 shrink-0" />
          <motion.span
            initial={false}
            animate={{
              opacity: expanded ? 1 : 0,
              width: expanded ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Profile
          </motion.span>
        </Button>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-3 justify-start px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <motion.span
            initial={false}
            animate={{
              opacity: expanded ? 1 : 0,
              width: expanded ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Logout
          </motion.span>
        </Button>
      </div>
    </motion.aside>
  );
}
