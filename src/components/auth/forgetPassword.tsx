import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo-removebg-preview.png";

export default function ForgotPassword() {
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"email" | "code" | "reset">("email");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  if (!isLoaded) return null;

  const handleSendCode = async () => {
    if (!email) return alert("Please enter your email");
    try {
      setLoading(true);
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("code");
    } catch (err) {
      console.error("Error sending reset email:", err);
      alert("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value: string, index: number) => {
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

  const handleVerifyCode = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 6) return alert("Please enter the 6-digit code");

    try {
      setLoading(true);
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: enteredCode,
      });

      if (result.status === "needs_new_password") {
        setStep("reset");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) return alert("Please enter your new password");

    try {
      setLoading(true);
      await signIn.resetPassword({ password: newPassword });
      alert("Password successfully reset! You can now log in.");
      window.location.href = "/sign-in";
    } catch (err) {
      console.error("Password reset failed:", err);
      alert("Failed to reset password. Please try again.");
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
          <img src={logo} alt="" className="w-12 h-12 mx-auto" />
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight text-center">
            Devofy
          </h2>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {step === "email"
                ? "Forgot Password"
                : step === "code"
                ? "Enter Verification Code"
                : "Reset Your Password"}
            </CardTitle>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {step === "email" &&
                "Enter your email address to receive a password reset code."}
              {step === "code" &&
                "Enter the 6-digit code sent to your email address."}
              {step === "reset" &&
                "Enter your new password below to complete the reset."}
            </p>
          </CardHeader>

          <CardContent>
            {step === "email" && (
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-base border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-gray-200"
                />
                <Button
                  onClick={handleSendCode}
                  disabled={loading}
                  className="w-full h-11 text-base font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 transition-all duration-200"
                >
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </div>
            )}

            {step === "code" && (
              <div>
                <div className="flex justify-center gap-3 my-6">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el!)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-xl font-semibold border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-black dark:focus:border-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-gray-200 rounded-xl transition-all duration-200"
                    />
                  ))}
                </div>
                <Button
                  onClick={handleVerifyCode}
                  disabled={loading}
                  className="w-full h-11 text-base font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 transition-all duration-200"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>
              </div>
            )}

            {step === "reset" && (
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 text-base border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-gray-200"
                />
                <Button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full h-11 text-base font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 transition-all duration-200"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
