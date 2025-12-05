import FaqSection from "@/components/homePage/faq";
import Footer from "@/components/homePage/footer";
import Hero from "@/components/homePage/hero";
import Navbar from "@/components/homePage/navbar";
import PricingSection from "@/components/homePage/pricing";
import WebhookServices from "@/components/homePage/serviceCards";
import WebhookFlow from "@/components/homePage/webhookflow";
import WorkflowLayout from "../components/workflows/workflowLayout";

function Home() {
  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-7xl z-50">
        <Navbar />
      </div>

      <Hero />
      <WorkflowLayout />
      <div className="">
        {/* <WebhookServices /> */}
      </div>
      <div className="">
        {/* <WebhookFlow /> */}
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

export default Home;
