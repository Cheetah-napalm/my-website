import React, { useState } from 'react';
import { Home } from "lucide-react"; // Import Home icon
import { motion } from "motion/react"; // Import motion for animations

// Define the props interface for the Login component
interface LoginProps {
  // Updated onViewChange prop type to include 'dashboard'
  onViewChange?: (view: 'home' | 'signup' | 'login' | 'dashboard') => void;
  className?: string; // className prop is optional
}

// Login component for user authentication
// It includes logic to send login data to the backend and redirect on success
// Wrapped with React.memo for optimization
const Login: React.FC<LoginProps> = React.memo(({ onViewChange, className }) => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null); // State for displaying messages

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    const userData = { email, password };

    try {
      // Make a POST request to the backend login endpoint
      const response = await fetch('YOUR_AZURE_BACKEND_URL/login', { // Ensure this matches your backend URL and port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send form data as JSON
      });

      const data = await response.json(); // Parse the JSON response from the backend

      if (response.ok) {
        // Handle successful login
        setMessage(data.message || 'Login successful!');
        console.log('Login successful:', data.message, 'User:', data.user);
        // In a real application, you would typically store the authentication token
        // and THEN redirect the user to a protected route (e.g., dashboard)
        if (onViewChange) {
           onViewChange('dashboard'); // Redirect to the dashboard page
        }
        // Clear the form (optional, depending on desired behavior)
        setEmail('');
        setPassword('');
      } else {
        // Handle login errors (e.g., invalid credentials)
        setMessage(data.message || 'Login failed.');
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      // Handle network errors or other exceptions during the fetch
      setMessage('An error occurred during login. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    // Main container with centering and background, now accepts className
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-6 ${className || ''}`}>
      {/* Login form container */}
       <motion.div // Added motion for potential animations
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
       >
        {/* Form title */}
        <h2 className="text-3xl font-bold text-center text-white">Log In</h2>

        {/* Display messages (success or error) */}
        {message && (
          <div className={`p-3 rounded-md text-center ${message.includes('successful') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {message}
          </div>
        )}

        {/* Login form */}
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
          {/* Login button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Log In
          </button>
        </form>
        {/* Link to signup page (using button for view change) */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          {/* Use onViewChange only if it exists */}
          <button onClick={() => onViewChange?.('signup')} className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none">Sign Up</button>
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

export default Login;
