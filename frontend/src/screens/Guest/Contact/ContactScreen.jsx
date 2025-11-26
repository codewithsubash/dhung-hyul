import React from "react";
import IntroCard from "../components/IntroCard";
import { ContactForm } from "./ContactForm";

const ContactScreen = () => {
  return (
    <div>
      <IntroCard title="Contact" />
      <ContactForm />
    </div>
  );
};

export default ContactScreen;
