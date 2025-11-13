import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSignUp } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo-removebg-preview.png"

export default function VerifyEmail() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  if (!isLoaded) return null;

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 6) {
      alert("Please enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);
      await signUp.attemptEmailAddressVerification({ code: enteredCode });
      await setActive({ session: signUp.createdSessionId });
      window.location.href = "/";
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl bg-white/70 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
          <CardHeader className="text-center">
            <img src={logo} alt="" className="w-12 h-12 mx-auto" />
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight text-center">
              Devofy
            </h2>
            <CardTitle className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Verify your Email
            </CardTitle>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Enter the 6-digit code sent to your email address
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center gap-3 my-6">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el!)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-black dark:focus:border-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-gray-200 rounded-xl transition-all duration-200"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              disabled={loading}
              className="w-full h-11 text-base font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 transition-all duration-200"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Didn’t receive the code?{" "}
              <button
                onClick={() =>
                  signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                  })
                }
                className="text-black dark:text-white font-medium hover:underline"
              >
                Resend
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
