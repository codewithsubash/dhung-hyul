import React from "react";
import { HeroSection } from "./HeroSection";
import ImpactSection from "./ImpactSection";
import CommunityPage from "./components/CommunitySection";
import Fade from "../../../components/Shared/Fade/Fade";

const HomeScreen = () => {
  return (
    <div>
      <HeroSection />

      <CommunityPage />
      <Fade direction="bottom" duration={1.5}>
        <ImpactSection />
      </Fade>
    </div>
  );
};

export default HomeScreen;
