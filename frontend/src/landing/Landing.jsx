import Navbar from "./Navbar";
import Hero from "./Hero";
import DashboardPreview from "./DashboardPreview";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import PlacementJourney from "./PlacementJourney";
import CTA from "./CTA";
import Footer from "./Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <DashboardPreview />
      <Features />
      <HowItWorks />
      <PlacementJourney />
      <CTA />
      <Footer />
    </>
  );
}

export default Landing;