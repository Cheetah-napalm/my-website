import React, { useState } from 'react';
import { Home } from "lucide-react"; // Import Home icon
import { motion } from "motion/react"; // Import motion for animations

// Define the props interface for the Signup component
interface SignupProps {
  onViewChange?: (view: 'home' | 'signup' | 'login' | 'dashboard') => void; // Made onViewChange optional
  className?: string; // className prop is optional
}

// Signup component for user registration
// It includes logic to send signup data to the backend
// Wrapped with React.memo for optimization
const Signup: React.FC<SignupProps> = React.memo(({ onViewChange, className }) => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null); // State for displaying messages

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    // Basic client-side validation (can add more)
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const userData = { email, password, confirmPassword };

    try {
      // Make a POST request to the backend signup endpoint
      const response = await fetch('YOUR_AZURE_BACKEND_URL/signup', { // Ensure this matches your backend URL and port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send form data as JSON
      });

      const data = await response.json(); // Parse the JSON response from the backend

      if (response.ok) {
        // Handle successful signup
        setMessage(data.message || 'Signup successful!');
        console.log('Signup successful:', data.message);
        // Optionally navigate to the login page after successful signup
        // if (onViewChange) {
        //    onViewChange('login');
        // }
        // Clear the form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Handle signup errors (e.g., email already exists, validation errors from backend)
        setMessage(data.message || 'Signup failed.');
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      // Handle network errors or other exceptions during the fetch
      setMessage('An error occurred during signup. Please try again.');
      console.error('Error during signup:', error);
    }
  };

  return (
    // Main container with centering and background, now accepts className
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-6 ${className || ''}`}>
      {/* Signup form container */}
      <motion.div // Added motion for potential animations
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
      >
        {/* Form title */}
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>

        {/* Display messages (success or error) */}
        {message && (
          <div className={`p-3 rounded-md text-center ${message.includes('successful') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {message}
          </div>
        )}

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input group */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input group */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Confirm Password input group */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* Signup button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>
        {/* Link to login page (using button for view change) */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          {/* Use onViewChange only if it exists */}
          <button onClick={() => onViewChange?.('login')} className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none">Log In</button>
        </p>
        {/* Button to navigate back to home */}
        <div className="text-center mt-4">
           {/* Use onViewChange only if it exists */}
           <button onClick={() => onViewChange?.('home')} className="text-gray-400 hover:text-white focus:outline-none">
             <Home className="inline-block mr-1 w-4 h-4" /> Back to Home
           </button>
         </div>
      </motion.div>
    </div>
  );
});

export default Signup;
