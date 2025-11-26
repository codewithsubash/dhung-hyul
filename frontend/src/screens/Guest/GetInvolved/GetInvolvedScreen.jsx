import React from "react";
import GetInvolved from "./GetInvolved";
import ImpactSection from "../Home/ImpactSection";
import IntroCard from "../components/IntroCard";
import EndingCard from "../components/EndingCard";
import { ContactForm } from "../Contact/ContactForm";
const GetInvolvedScreen = () => {
  return (
    <div>
      <IntroCard title="Get Involved" />
      <GetInvolved />
      <ImpactSection />
      <ContactForm />
      {/* <EndingCard title="Get Involved" /> */}
    </div>
  );
};

export default GetInvolvedScreen;
