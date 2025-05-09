import React from 'react';
import { motion } from "motion/react";

// Define the props for the FeatureCard component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Represents the icon element
}

// FeatureCard component displays a feature with an icon, title, and description.
// Wrapped with React.memo for optimization (helps with rendering performance, indirectly affects perceived load)
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ title, description, icon }) => {
  return (
    // motion.div is used for animations (from 'motion/react' library)
    <motion.div
      whileHover={{ scale: 1.08, y: 1 }} // Scale up and move slightly on hover
      transition={{ type: 'spring', stiffness: 200, damping: 30 }} // Spring animation effect
      className="rounded-xl p-8 shadow-lg transition-all duration-300 flex flex-col items-center text-center bg-gray-800/50" // Styling with Tailwind CSS
    >
      {/* Container for the icon */}
      <div className="mb-4">{icon}</div>
      {/* Feature title */}
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      {/* Feature description */}
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
});

// Export the FeatureCard component for use in other files
export default FeatureCard;