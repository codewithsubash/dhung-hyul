import React from "react";

// Import local images
import galleryImg from "../../../assets/images/gallery.jpeg";
import blogImg from "../../../assets/images/blog.jpeg";
import eventsImg from "../../../assets/images/events.jpeg";
import contactImg from "../../../assets/images/contact.jpeg";
import involvedImg from "../../../assets/images/getInvolved.jpeg";
import eventDetailsImg from "../../../assets/images/eventDetails.jpeg";
import aboutImg from "../../../assets/images/about.jpeg";

const endingCardData = [
  {
    title: "Gallery",
    heading: "Explore Our Visual Journey",
    description: "Discover the moments that define our mission and community.",
    image: galleryImg,
    primaryButton: "View Gallery",
    secondaryButton: "Contact Us"
  },
   {
    title: "About",
    heading: "Explore Our Visual Journey",
    description: "Discover the moments that define our mission and community.",
    image: aboutImg,
    primaryButton: "About Us",
    secondaryButton: "Contact Us"
  },
  {
    title: "Blog",
    heading: "Stay Connected With Our Stories",
    description: "Join our community and never miss an update from our journey.",
    image: blogImg,
    primaryButton: "Read More",
    secondaryButton: "Subscribe"
  },
  {
    title: "Events",
    heading: "Join Us at Our Next Event",
    description: "Be part of the change and connect with like-minded individuals.",
    image: eventsImg,
    primaryButton: "Register Now",
    secondaryButton: "View Calendar"
  },
  {
    title: "Contact",
    heading: "Let's Start a Conversation",
    description: "Reach out to us and discover how we can work together.",
    image: contactImg,
    primaryButton: "Get in Touch",
    secondaryButton: "Learn More"
  },
  {
    title: "Get Involved",
    heading: "Make a Difference Today",
    description: "Your contribution can create lasting change in our community.",
    image: involvedImg,
    primaryButton: "Get Involved",
    secondaryButton: "Donate Now"
  },
  {
    title: "Event Details",
    heading: "Don't Miss This Opportunity",
    description: "Register now and be part of something meaningful.",
    image: eventDetailsImg,
    primaryButton: "Register",
    secondaryButton: "Share Event"
  }
];

const EndingCard = ({ title, heading, description, image, primaryButton, secondaryButton }) => {
  const data = endingCardData.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  const finalHeading = heading || data?.heading || "Be Part of the Change You Want to See";
  const finalDescription = description || data?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in";
  const finalImage = image || data?.image || galleryImg;
  const finalPrimaryButton = primaryButton || data?.primaryButton || "Get Involved";
  const finalSecondaryButton = secondaryButton || data?.secondaryButton || "Contact Us";

  return (
    <div className="relative w-[99%] h-[470px] md:h-[600px] rounded-3xl overflow-hidden m-2">
      {/* Background Image */}
      <img
        src={finalImage}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl leading-tight">
          {finalHeading}
        </h2>
        <p className="max-w-2xl text-lg md:text-xl mb-8 leading-relaxed">
          {finalDescription}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors duration-300">
            {finalPrimaryButton}
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-green-900 text-white font-semibold rounded-lg transition-colors duration-300">
            {finalSecondaryButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndingCard;
