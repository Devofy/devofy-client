import FaqSection from "@/components/home(401)/faq";
import Footer from "@/components/home(401)/footer";
import Hero from "@/components/home(401)/hero";
import Navbar from "@/components/home(401)/navbar";
import PricingSection from "@/components/home(401)/pricing";
import WebhookServices from "@/components/home(401)/serviceCards";

import WorkflowLayout from "../components/home(401)/workflowLayout";
import TestimonialsSection from "@/components/home(401)/reviews";

function Home() {
  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-7xl z-50">
        <Navbar />
      </div>

      <Hero />
      <WorkflowLayout />
      <div className="">
        <WebhookServices />
      </div>
      <div className="">{/* <WebhookFlow /> */}</div>
      <PricingSection />
      <FaqSection />
      <TestimonialsSection />
      <Footer />

      {/* <GitHubWorkflow />
      <StripeWorkflow />
      <ShopifyWorkflow />
      <SlackWorkflow /> */}
    </>
  );
}

export default Home;
