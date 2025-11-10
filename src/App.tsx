import "./App.css";
import FaqSection from "./components/home/faq";
import Footer from "./components/home/footer";
import Hero from "./components/home/hero";
import Navbar from "./components/home/navbar";
import PricingSection from "./components/home/pricing";
import WebhookServices from "./components/home/serviceCards";

import WebhookFlow from "./components/home/webhookflow";

import WorkflowLayout from "./pages/home/workflowLayout";

function App() {
  return (
    <>
      <div className="max-w-7xl w-6xl fixed top-8 z-50 mx-auto left-1/2 -translate-x-1/2">
        <Navbar />
      </div>
      <Hero />
      <WorkflowLayout />
      <div className="">
        <WebhookServices />
      </div>
      <div className="">
        <WebhookFlow />
      </div>
      <PricingSection />
      <FaqSection />
      <Footer />

      {/* <GitHubWorkflow />
      <StripeWorkflow />
      <ShopifyWorkflow />
      <SlackWorkflow /> */}
    </>
  );
}

export default App;
