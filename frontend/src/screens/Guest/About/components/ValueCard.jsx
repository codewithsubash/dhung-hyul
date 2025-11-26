

// ValueCard Component
const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-12 h-12 mb-6">
        <Icon className="w-full h-full text-gray-600" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default ValueCard;