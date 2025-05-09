import { Button } from "./components/ui/button"; // Assuming Button component is in this path
import { easeInOut, motion } from "motion/react"; // Animation library
import { Rocket, Sparkles, Code2, User, BookOpen, LogIn, UserPlus, CheckCircle } from "lucide-react"; // Import additional icon
import FeatureCard from "./FeatureCard"; // Import the FeatureCard component
import React, { useState, lazy, Suspense } from 'react'; // Import React, useState, lazy, and Suspense

// Lazy load the components that are not needed on initial load
const Signup = lazy(() => import('./Signup'));
const Login = lazy(() => import('./Login'));
const Dashboard = lazy(() => import('./Dashboard'));


// Component to render the main homepage content
// Wrapped with React.memo for optimization
const MainHomepageContent: React.FC<{ isLoggedIn: boolean; onViewChange: (view: 'home' | 'signup' | 'login' | 'dashboard') => void }> = React.memo(({ isLoggedIn, onViewChange }) => {  
  return (
    <div className="max-w-5xl mx-auto text-center space-y-10">
      {/* Conditional message for logged-in users */}
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-500/20 text-green-200 p-3 rounded-md flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Welcome back! You are logged in.</span>
        </motion.div>
      )}

      {/* Introduction Section */}
      <section>
        {/* User icon with animation */}
        <motion.div
          initial={{ opacity: 0, y: -80 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation target state
          transition={{ duration: 0.9, ease: easeInOut }} // Animation transition properties
          className="mb-6"
        >
          {/* Relative positioning for the sparkle icon */}
          <div className="relative inline-block">
            <User className="w-16 h-16 text-gray-300 rounded-full bg-gray-800 p-2 shadow-md" />
            {/* Sparkle icon with animation */}
            <motion.div
              className="absolute bottom-0 right-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 w-6 h-6 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: 'backInOut', delay: 0.3 }}
            >
              <Sparkles className='w-4 h-4 text-white' />
            </motion.div>
          </div>
        </motion.div>
        {/* Heading with name and animation */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        >
          Hi I'm <span className="block sm:inline">Suman</span>
        </motion.h1>
        {/* Description paragraph with animation */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeInOut, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mt-4"
        >
          A passionate developer showcasing my skills and projects. This site is built with React, Tailwind CSS, and Vite for a smooth and fast experience.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="py-8">
        {/* Section heading with animation */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="text-2xl font-semibold text-white mb-6"
        >
          Features
        </motion.h2>
        {/* Grid for Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FeatureCard components */}
          <FeatureCard
            title="Performance Focused"
            description="Optimized for speed and efficiency using modern web technologies."
            icon={<Rocket className="w-8 h-8 text-blue-400 mb-4" />}
          />
          <FeatureCard
            title="Modern Stack"
            description="Built with React, Tailwind CSS, and Vite for a cutting-edge development experience."
            icon={<Sparkles className="w-8 h-8 text-pink-400 mb-4" />}
          />
          <FeatureCard
            title="Clean Code"
            description="Well-structured and maintainable code following best practices."
            icon={<Code2 className="w-8 h-8 text-green-400 mb-4" />}
          />
        </div>
      </section>

      {/* Portfolio Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Corrected initial y value for animation
        animate={{ opacity: 1, y: 0 }} // Corrected animate y value for animation
        transition={{ duration: 0.6, ease: easeInOut, delay: 0.5 }}
      >
        <Button
          variant='outline'
          size='lg'
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white border-purple-500/30 hover:border-purple-500/50 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 shadow-lg"
        >
          <BookOpen className="mr-2 w-5 h-5" />
          Explore My Portfolio
        </Button>
      </motion.div>

      {/* Navigation Buttons for Signup/Login (only show if not logged in) */}
      {!isLoggedIn && (
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            variant='outline'
            size='sm'
            className="bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50 transition-colors duration-200"
            onClick={() => onViewChange('signup')}
          >
            <UserPlus className="mr-1 w-4 h-4" /> Sign Up
          </Button>
          <Button
            variant='outline'
            size='sm'
            className="bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50 transition-colors duration-200"
            onClick={() => onViewChange('login')}
          >
            <LogIn className="mr-1 w-4 h-4" /> Log In
          </Button>
        </div>
      )}


      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeInOut, delay: 0.5 }}
        className="mt-12 text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} Suman. All rights reserved. {/* Updated name */}
      </motion.footer>

    </div>
  );
});


// The main component that renders either the homepage, signup, login, or dashboard view
const Homepage = () => {
  // State to manage the current view
  const [currentView, setCurrentView] = useState<'home' | 'signup' | 'login' | 'dashboard'>('home');

  // Function to change the current view
  const handleViewChange = (view: 'home' | 'signup' | 'login' | 'dashboard') => {
    setCurrentView(view);
  };

  // Render the appropriate view based on the currentView state
  const renderView = () => {
    switch (currentView) {
      case 'signup':
        // Use Suspense for lazy loaded components
        // The fallback prop shows content while the component code is loading
        return <Suspense fallback={<div>Loading Signup...</div>}><Signup onViewChange={handleViewChange} /></Suspense>;
      case 'login':
        // Use Suspense for lazy loaded components
        // The fallback prop shows content while the component code is loading
        return <Suspense fallback={<div>Loading Login...</div>}><Login onViewChange={handleViewChange} /></Suspense>;
      case 'dashboard':
        // Now correctly rendering the lazy-loaded Dashboard component
        return <Suspense fallback={<div>Loading Dashboard...</div>}><Dashboard onViewChange={handleViewChange} /></Suspense>;
      case 'home':
      default:
        // Default rendering (homepage view for non-logged-in users)
        return <MainHomepageContent isLoggedIn={false} onViewChange={handleViewChange} />;
    }
  };

  return (
    // Main container with background gradient and centering styles
    // This div now wraps the conditional rendering logic
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-6 md:p-70">
      {/* Suspense boundary for lazy loaded components */}
      {/* The fallback here is for components rendered directly within Homepage's return */}
      <Suspense fallback={<div>Loading...</div>}>
         {renderView()} {/* Render the selected view */}
      </Suspense>
    </div>
  );
};

// Export the Homepage component as the default export
export default Homepage;
