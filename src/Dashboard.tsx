import React from 'react';
import { LogOut, User, Clock, Link } from "lucide-react"; // Import additional icons
import { motion } from "motion/react"; // Import motion for animations

// Define the props interface for the Dashboard component
interface DashboardProps {
  // This prop will be used to navigate back (e.g., to home or login)
  onViewChange?: (view: 'home' | 'signup' | 'login' | 'dashboard') => void;
}

// Dashboard component - the page users see after logging in
// Wrapped with React.memo for optimization
const Dashboard: React.FC<DashboardProps> = React.memo(({ onViewChange }) => {

  // Function to handle logout (placeholder)
  const handleLogout = () => {
    console.log('Logging out...');
    // In a real application, you would clear the authentication token
    // and redirect the user to the login page or homepage
    if (onViewChange) {
      onViewChange('home'); // Example: redirect to home after logout
    }
  };

  return (
    // Main container with centering and background
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-6">
      {/* Dashboard content container */}
      <motion.div // Added motion for potential animations
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-lg p-8 space-y-8 text-white" // Increased max-w and adjusted spacing
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h2>

        {/* User Profile Section */}
        <section className="bg-gray-700/50 rounded-lg p-6 flex items-center space-x-6">
            <User className="w-12 h-12 text-blue-400"/>
            <div>
                <h3 className="text-xl font-semibold">Profile Information</h3>
                <p className="text-gray-300">Placeholder for user details like name, email, etc.</p>
                {/* Add more user details here */}
            </div>
        </section>

        {/* Recent Activity Section */}
        <section className="bg-gray-700/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold flex items-center">
                <Clock className="w-6 h-6 text-green-400 mr-2"/> Recent Activity
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Logged in successfully.</li>
                <li>Updated profile information.</li>
                <li>Viewed project reports.</li>
                {/* Add more recent activity items here */}
            </ul>
        </section>

        {/* Quick Links Section */}
         <section className="bg-gray-700/50 rounded-lg p-6 space-y-4">
             <h3 className="text-xl font-semibold flex items-center">
                 <Link className="w-6 h-6 text-purple-400 mr-2"/> Quick Links
             </h3>
             <div className="flex flex-wrap gap-4">
                 {/* Placeholder buttons for quick links */}
                 <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors duration-200">View Projects</button>
                 <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors duration-200">Manage Settings</button>
                 <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors duration-200">Download Reports</button>
             </div>
         </section>


        {/* Logout button (placeholder) */}
        <div className="mt-8 text-center"> {/* Centered the logout button */}
           <button
             onClick={handleLogout}
             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
           >
             <LogOut className="mr-2 w-4 h-4" /> Log Out
           </button>
         </div>

      </motion.div>
    </div>
  );
});

export default Dashboard;
