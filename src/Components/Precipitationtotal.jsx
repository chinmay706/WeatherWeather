import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import useThemeStore from "../themeStore.js"; // Import the theme store

const Precipitationtotal = ({ last24Hours, next24Hours, nextWeek }) => {
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state

  // Function to determine the icon based on precipitation value
  const getPrecipitationIcon = (value) => {
    if (value > 50) {
      return faCloudShowersHeavy; // Heavy precipitation
    } else if (value > 20) {
      return faCloudRain; // Moderate precipitation
    } else if (value > 0) {
      return faCloudRain; // Light precipitation
    } else {
      return faSun; // No precipitation
    }
  };

  // Precipitation data for rendering dynamically
  const precipitationData = [
    { label: "Last 24 Hours", value: last24Hours },
    { label: "Next 24 Hours", value: next24Hours },
    { label: "Next Week", value: nextWeek },
  ];

  const textColor = isLightMode ? "text-gray-800" : "text-white";
  const bgColor = isLightMode ? "bg-white" : "bg-gray-800";
  const borderColor = isLightMode ? "border-gray-300" : "border-gray-700";

  return (
    <div
      className={`max-w-md mx-auto ${bgColor} rounded-lg shadow-md p-6 space-y-6 border ${borderColor}`}
    >
      {/* Title for Precipitation Total */}
      <h3 className={`text-lg font-semibold ${textColor} mb-4 text-center`}>
        Precipitation Total
      </h3>

      {precipitationData.map((item, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div
            className={`${
              isLightMode ? "bg-blue-100" : "bg-blue-600"
            } p-4 rounded-full`}
          >
            <FontAwesomeIcon
              icon={getPrecipitationIcon(item.value)}
              className={`${
                isLightMode ? "text-blue-500" : "text-blue-200"
              } text-2xl`}
            />
          </div>
          <div>
            <h3
              className={`text-lg font-semibold ${textColor}`}
            >
              {item.label}
            </h3>
            <p
              className={`${
                isLightMode ? "text-gray-600" : "text-gray-400"
              } text-sm`}
            >
              {item.value} mm
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Precipitationtotal;
