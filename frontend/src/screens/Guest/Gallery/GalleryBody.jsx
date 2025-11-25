import GalleryCard from "./components/GalleryCard";
import { motion } from "framer-motion";

const GalleryBody = () => {
  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      title: "Nature Beauty",
      description: "A peaceful and stunning view of nature captured at sunrise."
    },
    {
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
      title: "City Lights",
      description: "A vibrant skyline glowing with life & modern architecture."
    },
    {
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
      title: "Creative Art",
      description: "A burst of artistic expression through bold shapes and colors."
    },
    {
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      title: "Mountains & Clouds",
      description: "A breathtaking landscape showcasing nature’s calmness."
    },
    {
      image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
      title: "Ocean Waves",
      description: "Soft waves crashing gently on a peaceful shoreline."
    },
    {
      image: "https://images.unsplash.com/photo-1517816428104-797678c7cf0c",
      title: "Night Sky",
      description: "A starlit sky that reminds us of the beauty of the universe."
    }
  ];

  return (
    <div className="relative min-h-screen py-20 px-6 md:px-16 lg:px-28 bg-gradient-to-b from-indigo-50 via-green-50 to-green-50 overflow-hidden">
      
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-20"></div>

      <h1 className="text-center text-gray-600 mb-14 text-5xl">
        A collection of moments, inspiration, and beauty captured around us.
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <GalleryCard
              image={item.image}
              title={item.title}
              description={item.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryBody;
