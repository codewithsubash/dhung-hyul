import React from "react";
import { HeroSection } from "./HeroSection";
import ImpactSection from "./ImpactSection";
import CommunityPage from "./components/CommunitySection";

const HomeScreen = () => {
  return (
    <div>
      <HeroSection />
      <CommunityPage />
      <ImpactSection />
    </div>
  );
};

export default HomeScreen;
