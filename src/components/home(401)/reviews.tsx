import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Devofy completely eliminated our webhook anxiety. We used to spend hours debugging failed deliveries; now it's all automated and visible instantly.",
    name: "Sarah Chen",
    role: "CTO at FinTechX",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    companyLogo: "/logos/fintechx.svg", // Replace with actual logo paths
  },
  {
    id: 2,
    quote:
      "The reliability layer is incredible. Integrating Stripe and Shopify used to be a fragile mess, but Devofy acts as the perfect buffer. A must-have for scaling teams.",
    name: "Marcus Rodriguez",
    role: "Lead Engineer at CommerceFlow",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    companyLogo: "/logos/commerceflow.svg",
  },
  {
    id: 3,
    quote:
      "I didn't realize how much engineering time we wasted building our own retry logic until we switched. The ROI was immediate. It just works.",
    name: "Alex Kim",
    role: "Founder at SaaSify",
    avatar: "https://i.pravatar.cc/150?u=alex",
    companyLogo: "/logos/saasify.svg",
  },
  {
    id: 4,
    quote:
      "The observability is unmatched. Being able to trace a single webhook payload through its entire lifecycle has saved us countless support hours.",
    name: "Emily Davis",
    role: "VP of Engineering at BuildTool",
    avatar: "https://i.pravatar.cc/150?u=emily",
    companyLogo: "/logos/buildtool.svg",
  },
  {
    id: 5,
    quote:
      "Setting up secure, verifiable webhook endpoints for our partners went from taking weeks to taking minutes. Our security team loves it.",
    name: "James Wilson",
    role: "Security Architect at DataSync",
    avatar: "https://i.pravatar.cc/150?u=james",
    companyLogo: "/logos/datasync.svg",
  },
];

export default function TestimonialsSection() {
  // We duplicate the list to create the seamless infinite loop effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative w-full py-24 bg-white dark:bg-neutral-950 overflow-hidden mb-24">
      {/* Subtle background texture to match the hero */}
      {/* <div className="absolute inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div> */}

      <div className="relative z-10 container mx-auto px-4 mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-sm font-medium tracking-wider uppercase text-blue-400 mb-4 block"
        >
          
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight"
        >
          Trusted by the teams <br /> <span className="text-blue-600">building the future.</span>
        </motion.h2>
      </div>

      {/* Marquee Container with faded edges mask */}
      <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <div className="flex overflow-hidden">
          {/* The animated track */}
          <motion.div
            className="flex gap-6 py-4 pl-4"
            animate={{
              x: ["0%", "-50%"], // Move halfway, which is the end of the first set
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // Adjust speed here (higher = slower)
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Individual Card Component ---
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div
      className="
        relative flex-shrink-0 w-[350px] md:w-[450px]
        rounded-2xl p-8
        border border-white/10 bg-white/5 
        backdrop-blur-md shadow-xl
        flex flex-col justify-between
        group hover:border-white/20 transition-colors duration-300
      "
    >
      {/* Subtle quote icon in background */}
      <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-500/20 fill-current pointer-events-none group-hover:text-blue-500/30 transition-colors" />

      <div>
        <p className="text-lg text-black dark:text-neutral-300 leading-relaxed font-medium">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar using standard img tag for demo, use next/image in real app */}
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full border-2 border-white/10"
          />
          <div>
            <h4 className="text-blue-600 font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-neutral-400">{testimonial.role}</p>
          </div>
        </div>

        {/* Optional: Company Logo Placeholder - Replace with actual Image component */}
        {/* <div className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
             <Image src={testimonial.companyLogo} width={80} height={30} alt="Company" />
        </div> */}
      </div>
    </div>
  );
}
