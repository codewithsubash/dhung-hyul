import React, { useEffect } from "react";
import EventDetailBody from "./components/EventDetailBody";
import EndingCard from "../components/EndingCard";

const EventDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <EventDetailBody />
      <EndingCard title="Event Details" />
    </div>
  );
};

export default EventDetails;
