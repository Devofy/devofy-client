import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const location = useLocation();

  // Dynamically get the page title from URL path
  const pageTitle = useMemo(() => {
    const path = location.pathname.replace("/", "");
    if (!path || path === "dashboard") return "Dashboard";
    const formatted = path
      .split("/")
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return formatted || "Dashboard";
  }, [location.pathname]);

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
        {pageTitle}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 border-none focus:ring-2 focus:ring-indigo-500 text-sm w-56"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <Avatar className="cursor-pointer border border-gray-200 dark:border-gray-800">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=devofy" />
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
