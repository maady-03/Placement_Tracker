import Navbar from "./Navbar";
import Hero from "./Hero";
import DashboardPreview from "./DAshboardPreview";
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
      <DashboardPreview></DashboardPreview>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <PlacementJourney></PlacementJourney>
        <CTA></CTA>
        <Footer></Footer>
    </>
  );
}

export default Landing;