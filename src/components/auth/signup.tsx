import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import logo from "@/assets/logo-removebg-preview.png";
import { SignUp } from "@clerk/clerk-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100">
      {/* Left Section (50%) */}
      <div className="w-full lg:w-1/2 hidden md:flex flex-col justify-center items-center text-center px-8 py-16 bg-linear-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#e6f0ff] blur-3xl opacity-60" />
        <div className="absolute bottom-[-120px] -left-20 w-[250px] h-[250px] bg-[#fff5e6] blur-3xl opacity-50" />

        <motion.img
          src={logo}
          alt="Logo"
          className="w-20 h-20 mb-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h1
          className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to <span className="text-black font-bold">Devofy</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-gray-600 max-w-md text-base z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Build, automate, and scale your webhooks effortlessly.
        </motion.p>
      </div>

      {/* Right Section (50%) - Clerk Signup */}
      <div className="w-full min-h-screen lg:w-1/2 flex justify-center items-center py-16 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* <CardHeader className="text-center pt-8">
              
             
              <p className="text-gray-500 text-sm mt-2">
                Create your account below
              </p>
            </CardHeader> */}
          <div className="md:hidden block mb-8">
            <img src={logo} alt="" className="w-12 h-12 mx-auto" />
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight text-center">
              Devofy
            </h2>
          </div>

          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-500 hover:bg-gray-800 text-white rounded-xl h-11",
                formFieldInput:
                  "border-gray-300 focus:ring-2 focus:ring-black/80",
                footerActionLink: "text-black font-medium hover:underline",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "iconButton",
              },
            }}
            routing="path"
            path="/signup"
            signInUrl="/login"
            redirectUrl="/dashboard"
          />
        </motion.div>
      </div>
    </div>
  );
}
