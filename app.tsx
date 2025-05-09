import React from 'react';
// import { Button } from '@/components/ui/button'; // Removed problematic import
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Code2, BookOpen } from 'lucide-react';

const HomePage = () => {
  // Replaced Button with a basic button for broader compatibility
  const MyButton = ({ variant, size, className, children, ...props }: React.ComponentProps<'button'>) => {
    const baseClasses = `
      ${className}
      bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white
      hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 shadow-lg
      rounded-md
    `;
    const variantClasses = variant ? (variant === 'outline' ? 'border border-purple-500/30 hover:border-purple-500/50' : '') : '';
    const sizeClasses = size ? (size === 'lg' ? 'px-6 py-3 text-lg' : '') : '';

    return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
    >
      {children}
    </button>
  );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        >
          <span className="block sm:inline">My Awesome</span>
          <span className="block sm:inline"> Homepage</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Welcome to my personal corner of the internet! I'm showcasing my skills, projects, and thoughts here.  Built with React and Vite for a super fast experience.
        </motion.p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Blazing Fast"
            description="Built with Vite, experience lightning-fast load times and optimal performance."
            icon={<Rocket className="w-8 h-8 text-blue-400 mb-4" />}
          />
          <FeatureCard
            title="Modern UI"
            description="Clean, responsive, and visually appealing design with smooth animations."
            icon={<Sparkles className="w-8 h-8 text-purple-400 mb-4" />}
          />
          <FeatureCard
            title="Built with React"
            description="Interactive and dynamic user interfaces powered by React."
            icon={<Code2 className="w-8 h-8 text-green-400 mb-4" />}
          />
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
        >
          <MyButton // Changed to use MyButton
            variant="outline"
            size="lg"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Explore My Work
          </MyButton>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {icon}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default HomePage;
