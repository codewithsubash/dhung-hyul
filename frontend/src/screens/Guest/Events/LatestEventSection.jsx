import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import LatestEventCard from './components/LatestEventCard';
const LatestEventSection = () => {
  const blogs = [
    {
      image: "https://images.unsplash.com/photo-1593642532871-8b12e02d091c",
      title: "Learning React",
      description: "A quick guide to get started with React components.",
      link: "https://reactjs.org",
      category: "React",
      date: "Nov 10, 2025"
    },
    {
      image: "https://images.unsplash.com/photo-1581091012184-14c23f5df9ae",
      title: "Web Development Tips",
      description: "Improve your web development skills with these tips.",
      link: "https://developer.mozilla.org",
      category: "Web Dev",
      date: "Nov 12, 2025"
    },
    {
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
      title: "CSS Tricks",
      description: "Modern CSS tricks to enhance your website design.",
      link: "https://css-tricks.com",
      category: "CSS",
      date: "Nov 14, 2025"
    },
    {
      image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
      title: "JavaScript Best Practices",
      description: "Write cleaner and more efficient JavaScript code.",
      link: "https://javascript.info",
      category: "JavaScript",
      date: "Nov 15, 2025"
    },
    {
      image: "https://images.unsplash.com/photo-1537432376769-00a0d12a1f0e",
      title: "Frontend Frameworks",
      description: "Compare the most popular frontend frameworks.",
      link: "#",
      category: "Frontend",
      date: "Nov 16, 2025"
    },
    {
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
      title: "UI/UX Design Tips",
      description: "Create user-friendly and attractive interfaces.",
      link: "#",
      category: "Design",
      date: "Nov 17, 2025"
    },
  ];

  return (
    <div className="relative min-h-screen py-16 px-5 flex flex-col items-center  overflow-hidden">
      
      <div className="mb-12 mr-[763px]">
        <p className="text-teal-600 font-medium mb-3">Latest Events</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Key Upcoming Events <br /> You Won't Want to Miss
        </h2>
      </div>


      {/* Decorative blurred shapes */}
      <div className="absolute top-[-100px] left-[-80px] w-72 h-72 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-80px] right-[-100px] w-96 h-96  rounded-full filter blur-3xl opacity-20"></div>

     

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  max-w-9xl mx-auto px-4 md:px-6 lg:px-8">
        {blogs.map((blog, index) => (
          <LatestEventCard
            key={index}
            image={blog.image}
            title={blog.title}
            description={blog.description}
            link={blog.link}
            category={blog.category}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestEventSection;