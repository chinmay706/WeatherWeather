import React from "react";
import useThemeStore from "../themeStore.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Comparison = ({ data }) => {
  const isLightMode = useThemeStore((state) => state.isLightMode);

  const { textColor, bgColor, borderColor } = isLightMode
    ? { textColor: "text-gray-800", bgColor: "bg-white", borderColor: "border-gray-300" }
    : { textColor: "text-gray-200", bgColor: "bg-gray-800", borderColor: "border-gray-700" };

  const getComparisonText = () => {
    const today = data.find((item) => item.label === "Today");
    const yesterday = data.find((item) => item.label === "Yesterday");
    if (!today || !yesterday) return "";
    return today.maxTemp > yesterday.maxTemp
      ? "higher"
      : today.maxTemp < yesterday.maxTemp
      ? "lower"
      : "the same";
  };

  return (
    <div className={`w-full max-w-lg mx-auto ${bgColor} p-6 rounded-lg shadow-lg border ${borderColor}`}>
      <h3 className={`text-lg font-semibold ${textColor} mb-4 text-center`}>Comparison by Day</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="label" width={80} />
          <Tooltip formatter={(value) => `${value}°`} />
          <Bar
            dataKey="minTemp"
            fill={isLightMode ? "#4F8BFF" : "#1E40AF"}
            background={{ fill: "#E0E0E0" }}
            radius={[0, 10, 10, 0]}
          />
          <Bar
            dataKey="maxTemp"
            fill={isLightMode ? "#FF6A3D" : "#F97316"}
            background={{ fill: "#E0E0E0" }}
            radius={[0, 10, 10, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className={`text-sm ${textColor} text-center mt-6`}>
        The maximum temperature is {getComparisonText()} today than yesterday.
      </p>
    </div>
  );
};

export default Comparison;
