import React from 'react';
import { Heart, Shield, Sprout, Users, Rocket, Globe } from 'lucide-react';
import ValueCard from './components/ValueCard';


// Values Section Component
const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."
    },
    {
      icon: Sprout,
      title: "Sustainability",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."
    },
    {
      icon: Rocket,
      title: "Empowerment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Our Values</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-3xl">
          The Values That Guide Our Work in the Community
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <ValueCard
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;