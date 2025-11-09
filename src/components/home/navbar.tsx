"use client";

import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../utils/theme-provider";
import { motion } from "framer-motion"; // ✅ Correct import (you had "* as motion" earlier)

export function Navbar() {
  const [stars, setStars] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();
  const [themeRotation, setThemeRotation] = useState(0);
  const [menuRotation, setMenuRotation] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Fetch GitHub stars (optional)
  useEffect(() => {
    fetch("https://api.github.com/repos/yourusername/yourrepo")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(20));
  }, []);

  const navItems = [
    { label: "Overview" },
    { label: "Docs" },
    { label: "Pricing" },
    { label: "About us" },
  ];

  const starCount = stars ? (stars / 1000).toFixed(2) + "k" : "0.02k";

  return (
    <header className="max-w-7xl mx-auto backdrop-blur-lg border border-white/30 dark:border-white/20 bg-transparent bg-blend-overlay shadow-sm rounded-3xl">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 text-foreground">
        {/* ✅ Logo */}
        <div className="flex gap-2 sm:gap-3 items-center">
          <img src={logo} className="w-8 h-8" alt="Logo" />
          <div className="text-xl sm:text-2xl font-semibold font-[cursive] tracking-wide">
            Devofy
          </div>
        </div>

        {/* ✅ Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-12 text-md font-semibold">
          {navItems.map((nav) => (
            <li key={nav.label}>
              <button className="hover:opacity-80 focus:outline-none transition">
                {nav.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ✅ Right Side: GitHub + Theme Toggle + CTA + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* ✅ GitHub Badge */}
          <a
            href="https://github.com/yourusername/yourrepo"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-gray-800 text-white rounded-full px-3 py-1.5 text-sm hover:opacity-90 transition"
          >
            <Github size={16} />
            <span className="ml-2 bg-yellow-400 text-black font-semibold px-2 py-0.5 rounded-full text-xs">
              {starCount}
            </span>
          </a>

          {/* ✅ Theme Toggle */}
          <motion.div
            style={{ display: "inline-block" }}
            animate={{ rotate: themeRotation }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={() => setThemeRotation((prev) => prev + 360)}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="border-border relative"
            >
              <Sun
                className={`h-[1.2rem] w-[1.2rem] transition-all ${
                  theme === "light"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
              />
              <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                  theme === "dark"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-0"
                }`}
              />
            </Button>
          </motion.div>

          {/* ✅ CTA Button */}
          <motion.div className="hidden sm:block">
            <Button className="text-black primary">
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* ✅ Mobile Menu Toggle */}
          <motion.div
            style={{ display: "inline-block" }}
            animate={{ rotate: menuRotation }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={() => setMenuRotation((prev) => prev + 360)}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
              className="lg:hidden border-border"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-white/30 dark:border-white/20"
        >
          <div className="px-4 sm:px-6 py-4 space-y-4">
            {/* Nav Items */}
            <ul className="space-y-3">
              {navItems.map((nav) => (
                <li key={nav.label}>
                  <button className="w-full text-left py-2 hover:opacity-80 font-semibold">
                    {nav.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* ✅ GitHub Badge (Mobile) */}
            <a
              href="https://github.com/yourusername/yourrepo"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden flex items-center gap-2 bg-gray-800 text-white rounded-full px-3 py-2 text-sm hover:opacity-90 transition w-fit"
            >
              <Github size={16} />
              <span className="ml-2 bg-yellow-400 text-black font-semibold px-2 py-0.5 rounded-full text-xs">
                {starCount}
              </span>
            </a>

            {/* ✅ CTA Button (Mobile) */}
            <Button className="sm:hidden w-full text-black primary">
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
