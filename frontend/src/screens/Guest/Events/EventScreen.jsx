import React from "react";
import LatestEventSection from "./LatestEventSection";
import IntroCard from "../components/IntroCard";
import EndingCard from "../components/EndingCard";

const EventScreen = () => {
  return (
    <div>
      <IntroCard title="Events" />
      <LatestEventSection />
      <EndingCard title="Events" />
    </div>
  );
};

export default EventScreen;
