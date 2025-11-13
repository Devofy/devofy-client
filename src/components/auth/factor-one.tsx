import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-removebg-preview.png";

export default function FactorOne() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  if (!isLoaded) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const attempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        window.location.href = "/dashboard";
      } else {
        console.log(attempt);
      }
    } catch (err: any) {
      alert(err.errors?.[0]?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-[#6d28d9]/30 blur-3xl opacity-60" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-[#2563eb]/30 blur-3xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-gradient-to-b from-gray-900/80 to-gray-950/80 p-8 rounded-2xl shadow-2xl border border-gray-800"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-12 h-12 mb-3" />
          <h2 className="text-xl font-semibold">Enter your password</h2>
          <p className="text-gray-400 text-sm mt-1">
            Enter the password associated with your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Email address
            </label>
            <Input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="you@example.com"
              className="bg-gray-800 border-gray-700 text-gray-100"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-gray-800 border-gray-700 text-gray-100"
              required
            />
            <div className="text-right mt-1">
              <a
                href="/forgot-password"
                className="text-sm text-indigo-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl transition-all"
          >
            {loading ? "Signing in..." : "Continue"}
          </Button>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-gray-400 hover:text-gray-200 transition-all"
            >
              Use another method
            </a>
          </div>
        </form>

        <div className="text-xs text-center text-gray-500 mt-8">
          Secured by <span className="text-white font-medium">Clerk</span>
          <br />
          <span className="text-orange-400">Development mode</span>
        </div>
      </motion.div>
    </div>
  );
}
