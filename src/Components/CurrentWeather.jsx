import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useThemeStore from "../themeStore.js"; // Import theme store

// Function to find the correct icon for the current weather condition
const findIcon = (condition) => {
  let icon;
  switch (condition) {
    case "Clear":
      icon = "fa-cloud";
      break;
    case "Sunny":
      icon = "fa-sun";
      break;
    case "Mist":
      icon = "fa-cloud-meatball";
      break;
    case "Cloudy":
      icon = "fa-cloud";
      break;
    case "Partly cloudy":
      icon = "fa-cloud-sun";
      break;
    case "Overcast":
      icon = "fa-smog";
      break;
    case "Blizzard":
      icon = "fa-meteor";
      break;
    case "Fog":
      icon = "fa-smog";
      break;
    case "Light rain":
      icon = "fa-cloud-rain";
      break;
    case "Medium rain":
      icon = "fa-cloud-rain";
      break;
    case "Heavy rain":
      icon = "fa-cloud-showers-heavy";
      break;
    case "Light snow":
      icon = "fa-snowflake";
      break;
    case "Medium snow":
      icon = "fa-snowflake";
      break;
    case "Heavy snow":
      icon = "fa-icicles";
      break;
    default:
      icon = "fa-cloud";
  }
  return icon;
};

const CurrentWeather = ({ weatherData, weeklyWeatherData }) => {
  const condition = weatherData?.text;
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state

  // Format the time and date
  const time = new Date().toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to generate an array of days (Yesterday + 7 days)
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    
    // Adding the next 7 days with the first letter of the day and their respective dates
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const dayName = nextDay.toLocaleDateString("en-us", { weekday: "short" }).charAt(0).toUpperCase();
      const dayDate = nextDay.getDate();
      days.push({ dayName, dayDate, isToday: i === 0 });
    }
    
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div
      className={`flex justify-between items-center p-6 rounded-xl shadow-md ${
        isLightMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
      }`}
    >
      {/* Left Side - Current Weather */}
      <div className="flex flex-col space-y-4">
        {/* City Name */}
        <h1 className="text-2xl font-bold tracking-wide">
          {weatherData?.location || "City Name"}
        </h1>
        <div className="flex items-center space-x-4">
          {/* Weather Icon */}
          <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-yellow-400 w-16 h-16">
            <FontAwesomeIcon
              icon={`fa-solid ${findIcon(condition)}`}
              className="text-2xl text-white"
            />
          </div>
          {/* Weather Details */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold">{weatherData?.text}</h1>
              <h1 className="text-3xl font-bold">{weatherData?.temp}°</h1>
            </div>
            <p className="text-lg font-medium">
              {date === "today" ? "Today" : date}
            </p>
          </div>
        </div>
      </div>
  
      {/* Right Side - Weekly Forecast */}
      <div className="flex items-center space-x-4">
        {weekDays.map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
                day.isToday
                  ? isLightMode
                    ? "bg-blue-500"
                    : "bg-blue-700"
                  : isLightMode
                  ? "bg-gray-300"
                  : "bg-gray-600"
              }`}
            >
              {day.dayDate}
            </div>
            <p className="text-sm">{day.dayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export { CurrentWeather, findIcon };
