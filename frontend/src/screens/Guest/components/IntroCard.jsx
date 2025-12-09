import React from "react";
import galleryImg from "../../../assets/images/gallery.jpeg";
import blogImg from "../../../assets/images/blog.jpeg";
import eventsImg from "../../../assets/images/events.jpg";
import contactImg from "../../../assets/images/contact.jpeg";
import involvedImg from "../../../assets/images/getInvolved.jpeg";
import aboutImg from "../../../assets/images/about.jpeg";

const introCardData = [
  {
    title: "Gallery",
    image: galleryImg,
    description:
      "Explore our moments, events, and stories captured through photographs.",
  },
  {
    title: "About",
    image: aboutImg,
    description:
      "Explore our moments, events, and stories captured through photographs.",
  },
  {
    title: "Blog",
    image: blogImg,
    description:
      "Read stories, updates, and insights from our community and volunteers.",
  },
  {
    title: "Events",
    image: eventsImg,
    description:
      "Stay informed about upcoming events, workshops, and special programs.",
  },
  {
    title: "Contact",
    image: contactImg,
    description:
      "Get in touch with us for inquiries, support, or collaboration opportunities.",
  },
  {
    title: "Get Involved",
    image: involvedImg,
    description:
      "Join us as a volunteer, supporter, or partner to make an impact together.",
  },
];

const IntroCard = ({ title, image, description }) => {
  const data = introCardData.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  const finalImage = image || data?.image || "";
  const finalDescription = description || data?.description || "";

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-b-3xl overflow-hidden">
      <img
        src={finalImage}
        alt={title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="max-w-3xl text-lg md:text-xl leading-relaxed">
          {finalDescription}
        </p>
      </div>
    </div>
  );
};

export default IntroCard;
