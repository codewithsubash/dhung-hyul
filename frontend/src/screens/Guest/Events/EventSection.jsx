import React from "react";
import EventCard from "./components/EventCard";

const EventSection = () => {
  const events = [
    {
      image: "https://images.unsplash.com/photo-1498409785966-ab341407de6e?w=1200",
      category: "Gardening",
      date: "October 1, 2024",
      title: "Cultivating Shared Green Spaces That Connect Communities",
      description:
        "Ab aliquid aut nobis dolor et natus internos eum reprehenderit molestiae vel dolores quia. Et quia incidunt aut facilis delectus.",
      link: "#",
      size: "large",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200",
      category: "Mentorship",
      date: "September 15, 2024",
      title: "Nurturing the Next Generation Through Long-Term Youth Mentorship",
      description: "",
      link: "#",
      size: "small",
    },
    {
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200",
      category: "Water Access",
      date: "August 20, 2024",
      title: "Delivering Safe, Reliable Water Infrastructure",
      description: "",
      link: "#",
      size: "small",
    }
  ];

  return (
   <div className="min-h-screen bg-gray-50 py-16 px-5 md:px-10">

  {/* Width Container */}
  <div className="max-w-9xl mx-auto">

    {/* Shared Padding for Header + Grid */}
    <div className="px-4 md:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-12">
        <p className="text-teal-600 font-medium mb-3">Featured Events</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Key Upcoming Events <br /> You Won't Want to Miss
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Large Card */}
        <div className="lg:row-span-2">
          <EventCard {...events[0]} />
        </div>

        {/* Right Two Cards */}
        <div className="space-y-8">
          <EventCard {...events[1]} />
          <EventCard {...events[2]} />
        </div>

      </div>

    </div>

  </div>

</div>

  );
};

export default EventSection;
