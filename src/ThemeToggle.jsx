import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useThemeStore from "./themeStore"; // Import the Zustand store

const ThemeToggle = () => {
  const { isLightMode, toggleTheme } = useThemeStore(); // Access state and toggle function

  return (
    <FontAwesomeIcon
      icon="fa-solid fa-circle-half-stroke"
      className={`switch-mode cursor-pointer transition-transform duration-300 ${
        isLightMode ? "text-blue-500" : "text-gray-300"
      }`}
      onClick={toggleTheme} // Call the toggle function from the store
      style={{
        fontSize: "2rem", // Increase size of the icon
        transform: isLightMode ? "scaleX(1)" : "scaleX(-1)",
      }}
    />
  );
};

export default ThemeToggle;
