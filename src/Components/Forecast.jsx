import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudRain } from "@fortawesome/free-solid-svg-icons";
import useThemeStore from "../themeStore.js"; // Importing theme store

const Forecast = ({ forecastData = [], toggle }) => {
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state

  const getWeatherIcon = (conditionText) => {
    if (conditionText.toLowerCase().includes("sun")) return faSun;
    if (conditionText.toLowerCase().includes("cloud")) return faCloud;
    if (conditionText.toLowerCase().includes("rain")) return faCloudRain;
    return faSun; // Default icon
  };

  const textColor = isLightMode ? "text-black" : "text-white";
  const bgColor = isLightMode ? "bg-gray-100" : "bg-gray-800";
  const cardColor = isLightMode ? "bg-gray-200" : "bg-gray-700";
  const barColor = isLightMode
    ? "bg-gradient-to-r from-blue-300 to-blue-500"
    : "bg-gradient-to-r from-blue-500 to-indigo-600";
  const iconColor = isLightMode ? "text-yellow-600" : "text-yellow-400";

  if (!forecastData.length) {
    return (
      <div className={`text-center text-sm ${textColor}`}>
        No forecast data available
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>
      <h3 className={`text-lg font-semibold text-center mb-4 ${textColor}`}>
        Forecast
      </h3>
      <div className="space-y-4">
        {forecastData.map((data, index) => {
          // Ensure fallback if properties are missing
          const day = data.day || "Unknown Day";
          const iconCondition = data.icon || "Unknown";
          const maxTemp = data.maxTemp ?? "N/A"; // Default to "N/A" if missing
          const minTemp = data.minTemp ?? "N/A";

          // Calculate clamped values for bar positioning
          const leftPercent = Math.min(
            100,
            Math.max(0, minTemp !== "N/A" ? (minTemp / 30) * 100 : 0)
          );
          const widthPercent = Math.min(
            100 - leftPercent,
            Math.max(
              0,
              maxTemp !== "N/A" && minTemp !== "N/A"
                ? ((maxTemp - minTemp) / 30) * 100
                : 0
            )
          );

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg shadow-sm ${cardColor}`}
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={getWeatherIcon(iconCondition)}
                  className={`text-2xl ${iconColor}`}
                />
                <span className={textColor}>{day}</span>
              </div>

              <div
                className={`flex-1 relative w-full h-2 mx-2 rounded-lg ${
                  isLightMode ? "bg-gray-300" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0 left-0 h-full rounded-lg ${barColor}`}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                ></div>
              </div>

              <div className={textColor}>
                <span>{maxTemp !== "N/A" ? `${maxTemp}°` : "N/A"}</span>
                <span className="ml-2">
                  {minTemp !== "N/A" ? `${minTemp}°` : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
