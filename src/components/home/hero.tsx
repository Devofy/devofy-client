import Navbar from "./navbar";
import lightBg from "@/assets/lightHero.jpg";
import darkBg from "@/assets/darkHero.jpg";
import { useTheme } from "../utils/theme-provider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function Hero() {
  const { theme } = useTheme();
  const bgImage = theme === "dark" ? darkBg : lightBg;

  return (
    <section
      className="relative h-screen w-full bg-cover bg-center transition-all duration-500 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backdropFilter: "blur(145px)",
      }}
    >
      {/* Navbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
        <Navbar />
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-[2px]" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-white/80 dark:bg-blue-600/30 backdrop-blur-md border border-gray-200 dark:border-white/20 text-gray-800 dark:text-gray-200"
        >
          Next-Gen Web Infrastructure for Developers 🚀
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
        >
          Power Your Apps <br />
          With{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Intelligent Webhooks
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="max-w-2xl mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          Devofy helps developers manage, store, and monitor webhooks with
          AI-powered insights and real-time visibility — so your integrations
          never miss a beat.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Button className="px-6 py-3 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-lg rounded-full border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
