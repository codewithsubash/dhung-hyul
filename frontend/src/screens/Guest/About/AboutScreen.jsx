import React from "react";
import IntroCard from "../components/IntroCard";
import MissionVisionSection from "./MissionVisionSection";
import SupporterSection from "./SupporterSection";
import HistorySection from "./HistorySection";
import ImpactSection from "../Home/ImpactSection";
import ValueSection from "./ValueSection";
import TeamSection  from "./TeamSection";
import EndingCard from "../components/EndingCard";


const AboutScreen = () => {
  // Founder Data
  const founderData = {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    name: "John Anderson",
    role: "Founder & CEO",
    description: "With over 15 years of experience in nonprofit leadership, John founded our organization with a vision to create lasting change in communities. His passion for social impact and innovative approaches to problem-solving have been instrumental in our success. Under his leadership, we've expanded our reach to serve thousands of families across the region.",
    socials: [
      { type: "linkedin", url: "#" },
      { type: "twitter", url: "#" },
      { type: "instagram", url: "#" },
      { type: "facebook", url: "#" }
    ]
  };

  // Team Members Data
  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      name: "Lisa White",
      role: "Communications Manager",
      description: "Lorem ipsum dolor sit amet. Ad ipsum magni at autem minus ut tempora distinctio est illo maiores? Ab explicabo sint est reprehenderit possimus at quos...",
      socials: [
        { type: "instagram", url: "#" },
        { type: "linkedin", url: "#" },
        { type: "twitter", url: "#" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      name: "Sara Lee",
      role: "Program Director",
      description: "Et quos quia ut perferendis iste ea neque nemo 33 omnis rerum sit temporibus beatae. A praesertium cumque eos rerum totam ut dolorem asperiores aut...",
      socials: [
        { type: "facebook", url: "#" },
        { type: "linkedin", url: "#" },
        { type: "twitter", url: "#" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      name: "Mike Johnson",
      role: "Fundraising Specialist",
      description: "Qui voluptate repudiandae eum ipsam distinctio ut rerum laborum qui omnis recusandae. Aut nisl ullam id assumenda corporis non accusantium.",
      socials: [
        { type: "facebook", url: "#" },
        { type: "linkedin", url: "#" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      name: "Jane Smith",
      role: "Volunteer Coordinator",
      description: "Et quos quia ut perferendis iste ea neque nemo 33 omnis rerum sit temporibus beatae. A praesertium cumque eos rerum totam ut dolorem asperiores aut...",
      socials: [
        { type: "instagram", url: "#" },
        { type: "linkedin", url: "#" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
      name: "Tom Brown",
      role: "Community Organizer",
      description: "Aut nisl ullam id assumenda corporis non accusantium iste id cumque dolorem eos alias accusamus. Et sint voluptatibus non quia neque quo.",
      socials: [
        { type: "facebook", url: "#" },
        { type: "instagram", url: "#" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      name: "Alex Rivera",
      role: "Operations Manager",
      description: "Dedicated to streamlining processes and ensuring our mission runs smoothly. Alex brings expertise in nonprofit operations and strategic planning.",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "twitter", url: "#" }
      ]
    }
  ];

  return (
    <div>
      <IntroCard title="About" />
      <MissionVisionSection />
      <HistorySection />
      <SupporterSection />
      <ValueSection />
      <ImpactSection />
      {/* Team Section with Founder */}
      <TeamSection
        subtitle="Our Team"
        title={
          <>
            Meet the Dedicated
            <br />
            People Behind the Mission
          </>
        }
        founder={founderData}
        members={teamMembers}
      />

      <EndingCard title="About" />

    </div>
    
  );
};

export default AboutScreen;