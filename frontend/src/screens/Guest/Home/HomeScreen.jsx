import React from "react";
import { HeroSection } from "./HeroSection";
import ImpactSection from "./ImpactSection";
import CommunityPage from "./components/CommunitySection";
import Fade from "../../../components/Shared/Fade/Fade";
import EventSection from "../Events/EventSection";

const HomeScreen = () => {
  return (
    <div>
      <HeroSection />

      <CommunityPage />
      <Fade direction="bottom" duration={1.5}>
        <ImpactSection />
      </Fade>

      <EventSection />
    </div>
  );
};

export default HomeScreen;
