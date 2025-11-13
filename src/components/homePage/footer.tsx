import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: ["Overview", "Pricing", "Integrations", "Demo"],
    },
    {
      title: "Company",
      links: ["About", "Team", "Careers", "Contact"],
    },
    {
      title: "Resources",
      links: ["Blog", "Docs", "Support", "Community"],
    },
  ];

  return (
    <footer className="relative w-full border-t border-border/50 bg-background text-foreground overflow-hidden">
      {/* Watermark */}
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-[18vw] font-extrabold select-none pointer-events-none"
      >
        DEVOFY
      </motion.h1>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-blue-600">Devofy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Powering your WebHooks with Intelligence and Ownership
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" aria-label="GitHub">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Mail">
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-md uppercase tracking-wide mb-4 text-blue-600 font-bold">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 opacity-60" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Devofy. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
