import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SignIn } from "@clerk/clerk-react";
import logo from "@/assets/logo-removebg-preview.png";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#e6f7ff] blur-3xl opacity-50" />
      <div className="absolute bottom-[-120px] right-[-80px] w-[250px] h-[250px] bg-[#fff0f0] blur-3xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <CardHeader className="text-center pt-8 mb-10">
          <img src={logo} alt="" className="w-12 h-12 mx-auto" />
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Let's continue where you left off.
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-black hover:bg-gray-800 text-white rounded-xl h-11 transition-all duration-300",
                formFieldInput: "",
                footerActionLink: "text-black font-medium hover:underline",
                border: "",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "iconButton",
              },
            }}
            routing="path"
            path="/login"
            signUpUrl="/signup"
            afterSignInUrl="/dashboard"
          />
        </CardContent>
      </motion.div>
    </div>
  );
}
