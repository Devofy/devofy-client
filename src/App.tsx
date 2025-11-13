import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import SignupPage from "./components/auth/signup";
import LoginPage from "./components/auth/login";
import VerifyEmail from "./components/auth/verfyEmail";
import ForgotPassword from "./components/auth/forgetPassword";
// Layout + dashboard pages
import Layout from "./components/layout/layout";
import Dashboard from "./components/home/dashboard";
import Webhooks from "./components/home/webHooks";
import Monitoring from "./components/home/monitoring";
import ApiKeys from "./components/home/apiKeys";
import Settings from "./components/home/settings";
import FactorOne from "./components/auth/factor-one";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/verify-email-address" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/factor-one" element={<FactorOne />} />

        {/* Dashboard Layout (Protected) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/webhooks" element={<Webhooks />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/api-keys" element={<ApiKeys />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
