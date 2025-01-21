import { useState } from "react";
import useThemeStore from "../themeStore.js"; // Import the theme store

const SearchBar = ({ setCity, toggle }) => {
  const [location, setLocation] = useState("");
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(location);
    setLocation(""); // Clear the input field after submission
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <form onSubmit={handleSubmit} className="relative w-80">
        {/* Input Container */}
        <div className="relative">
          {/* Input Field */}
          <input
            type="text"
            name="Location"
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg py-3 px-5 shadow-sm transition-all ${
              isLightMode
                ? "bg-blue-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-400"
                : "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-600"
            }`}
            placeholder="Enter location"
          />
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 pointer-events-none transition-all ${
              isLightMode ? "text-gray-500" : "text-gray-400"
            }`}
            viewBox="0 0 384 512"
          >
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
          </svg>
        </div>
      </form>
    </div>
  );
  
};

export default SearchBar;
