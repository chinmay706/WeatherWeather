import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import useThemeStore from "../themeStore.js";

// Register the chart.js plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
  "24:00",
];

// Chart.js options function to support light/dark mode
export const options = (isLightMode) => ({
  scales: {
    y: {
      display: false,
    },
    x: {
      border: {
        display: false,
        width: 10,
      },
      grid: {
        display: true,
        color: isLightMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)", // Dynamic grid line color
      },
      ticks: {
        color: isLightMode ? "#000" : "#fff", // Dynamic tick color
        font: {
          family: '"Fira Sans", sans-serif',
          weight: 600,
          size: 14,
        },
      },
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: isLightMode ? "rgba(3, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.8)", // Tooltip background color
      titleFont: {
        family: '"Fira Sans", sans-serif',
        size: 16,
      },
      bodyFont: {
        family: '"Fira Sans", sans-serif',
        size: 14,
      },
      padding: 20,
      caretSize: 10,
      displayColors: false,
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: isLightMode ? "#000" : "#fff", // Dynamic legend text color
        font: {
          family: '"Fira Sans", sans-serif',
          weight: 600,
          size: 16,
        },
        pointStyle: "circle",
      },
    },
    title: {
      display: false,
      text: "Weather Chart",
    },
  },
});

const TempChart = ({ tempsData }) => {
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state

  const newData = {
    labels,
    datasets: [
      {
        fill: true,
        tension: 0.35,
        label: "Temperature (°C)",
        data: tempsData,
        borderColor: isLightMode ? "rgba(73, 133, 224, 1)" : "rgba(255, 99, 132, 1)", // Border color
        backgroundColor: isLightMode
          ? "rgba(73, 133, 224, 0.5)"
          : "rgba(255, 99, 132, 0.5)", // Background color
        borderWidth: 5,
        radius: 3,
        hoverRadius: 10,
        hitRadius: 100,
        pointStyle: "circle",
        color: "#fff",
      },
    ],
  };

  return (
    <div
      className={`w-full ${isLightMode ? "bg-white" : "bg-gray-900"} rounded-xl shadow-xl p-6 flex flex-col items-center`}
    >
      <div className="flex justify-center items-center mb-6">
        <h2 className={`${isLightMode ? "text-black" : "text-white"} text-3xl font-semibold`}>
          Temperature Chart
        </h2>
      </div>
      <div
        className={`p-6 rounded-lg ${isLightMode ? "bg-gray-100" : "bg-gray-800"} w-full`}
        style={{
          maxWidth: "800px", // Limit chart width for centering
          boxShadow: isLightMode
            ? "0 4px 12px rgba(0, 0, 0, 0.1)"
            : "0 4px 12px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex justify-center items-center">
          <Line options={options(isLightMode)} data={newData} />
        </div>
      </div>
    </div>
  );
};

export default TempChart;
