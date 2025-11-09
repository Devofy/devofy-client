import "./App.css";
import FaqSection from "./components/home/faq";
import Footer from "./components/home/footer";
import Hero from "./components/home/hero";
import PricingSection from "./components/home/pricing";
import WebhookServices from "./components/home/serviceCards";

import WebhookFlow from "./components/home/webhookflow";

import WorkflowLayout from "./pages/home/workflowLayout";

function App() {
  return (
    <>
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
