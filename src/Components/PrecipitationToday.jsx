import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useThemeStore from "../themeStore.js"; // Import the theme store

const PrecipitationToday = ({ data }) => {
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state

  // Chart colors based on light or dark mode
  const { textColor, bgColor, borderColor, lineColor, areaColor } = isLightMode
    ? {
        textColor: "#333",
        bgColor: "bg-white",
        borderColor: "border-gray-300",
        lineColor: "#0056b3",
        areaColor: "rgba(0, 86, 179, 0.2)",
      }
    : {
        textColor: "#ddd",
        bgColor: "bg-gray-800",
        borderColor: "border-gray-700",
        lineColor: "#ff6347",
        areaColor: "rgba(255, 99, 71, 0.2)",
      };

  return (
    <div
      className={`w-full max-w-2xl mx-auto ${bgColor} p-6 rounded-lg shadow-md border ${borderColor}`}
    >
      <h3 className={`text-lg font-semibold text-center mb-4`} style={{ color: textColor }}>
        Precipitation Today
      </h3>

      {/* Min and Max Precipitation Summary */}
      <div className={`flex justify-between items-center text-sm mb-6`} style={{ color: textColor }}>
        <div className="flex flex-col items-center">
          <span className="text-gray-500">Min</span>
          <span className={`text-lg font-bold`} style={{ color: lineColor }}>
            {data.minPrecip} mm
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-500">Max</span>
          <span className={`text-lg font-bold`} style={{ color: "#ff6347" }}>
            {data.maxPrecip} mm
          </span>
        </div>
      </div>

      {/* Line Chart */}
      <div className="rounded-lg overflow-hidden">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data.chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fill: textColor }}
              label={{
                value: "Time",
                position: "insideBottomRight",
                offset: -5,
                fill: textColor,
              }}
            />
            <YAxis
              tick={{ fill: textColor }}
              label={{
                value: "Precipitation (mm)",
                angle: -90,
                position: "insideLeft",
                fill: textColor,
              }}
            />
            <Tooltip formatter={(value) => `${value} mm`} />
            <Line
              type="monotone"
              dataKey="precipitation"
              stroke={lineColor}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrecipitationToday;
