import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import { CurrentWeather } from "./Components/CurrentWeather";
import TempChart from "./Components/TempChart";
import Forecast from "./Components/Forecast";
import Footer from "./Components/Footer";

import Precipitationtotal from "./Components/Precipitationtotal";
import Comparison from "./Components/Comparison";
import PrecipitationToday from "./Components/PrecipitationToday";
import useThemeStore from "./themeStore";
import ThemeToggle from "./ThemeToggle";
import Gemini from "./Components/gemini";


function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state
  const [showPopup, setShowPopup] = useState(false);  // State for showing pop-up
  const [showGemini, setShowGemini] = useState(false);


  const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    document.body.style.backgroundColor = isLightMode ? "#ffffff" : "#1e1e1e";
    document.body.style.color = isLightMode ? "#000000" : "#ffffff";
  }, [isLightMode]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (lat && lon) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no&alerts=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [lat, lon]);

  useEffect(() => {
    if (location) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [location]);

  const currentData = {
    temp: weather?.current?.temp_c,
    location: weather?.location?.name,
    date: weather?.location?.localtime,
    icon: weather?.current?.condition?.icon,
    text: weather?.current?.condition?.text,
  };

  const forecastDays = weather?.forecast?.forecastday;

  const temps = [];
  if (forecastDays) {
    weather?.forecast?.forecastday[0].hour.map((hour) => {
      temps.push(hour.temp_c);
    });
  }

  const eightTemps = temps.filter((_, i) => i % 3 === 0);
  const nineTemps = [...eightTemps, temps[temps.length - 1]];

  const precipitationData = {
    last24Hours: weather?.forecast?.forecastday?.[0]?.day?.totalprecip_mm || 0,
    next24Hours: weather?.forecast?.forecastday?.[1]?.day?.totalprecip_mm || 0,
    nextWeek: weather?.forecast?.forecastday?.reduce(
      (acc, day) => acc + (day.day?.totalprecip_mm || 0),
      0
    ),
    chartData: weather?.forecast?.forecastday?.[0]?.hour?.map((hour) => ({
      time: hour.time.split(" ")[1],
      precipitation: hour.precip_mm || 0,
    })) || [],
  };

  const formatForecastData = () => {
    if (!forecastDays) return [];
    const getDayLabel = (index, date) => {
      if (index === 0) return "Tomorrow";
      const dayMap = {
        0: "Su",
        1: "Mo",
        2: "Tu",
        3: "We",
        4: "Th",
        5: "Fr",
        6: "Sa",
      };
      return dayMap[new Date(date).getDay()];
    };

    return forecastDays.map((day, index) => ({
      day: getDayLabel(index, day.date),
      maxTemp: Math.round(day.day.maxtemp_c),
      minTemp: Math.round(day.day.mintemp_c),
      icon: day.day.condition.text.toLowerCase().includes("rain")
        ? "cloud-rain"
        : day.day.condition.text.toLowerCase().includes("cloud")
        ? "cloud"
        : "sun",
    }));
  };

  const comparisonData = [
    {
      label: "Today",
      minTemp: forecastDays?.[0]?.day?.mintemp_c || 0,
      maxTemp: forecastDays?.[0]?.day?.maxtemp_c || 0,
    },
    {
      label: "Yesterday",
      minTemp: forecastDays?.[1]?.day?.mintemp_c || 0,
      maxTemp: forecastDays?.[1]?.day?.maxtemp_c || 0,
    },
    {
      label: "Tomorrow",
      minTemp: forecastDays?.[2]?.day?.mintemp_c || 0,
      maxTemp: forecastDays?.[2]?.day?.maxtemp_c || 0,
    },
  ];

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  // useEffect(() => {
  //   alert("Show the Pop");
    
  // }, [showPopup]);
  const handleGeminiButtonClick = () => {
    // setShowPopup(!showPopup);
    
  };

  return (
    <div className={`${isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'} App`}>
      <nav
  className={`nav p-4 flex justify-between items-center shadow-md ${
    isLightMode ? "bg-blue-100 text-gray-800" : "bg-gray-800 text-white"
  }`}
>
  {/* Logo */}
  <div className="logo flex items-center space-x-3">
    <div
      className={`rounded-full w-10 h-10 flex items-center justify-center ${
        isLightMode ? "bg-blue-500 text-white" : "bg-blue-700 text-gray-100"
      }`}
    >
      W
    </div>
    <h1 className="logo__text text-2xl font-bold tracking-wide">
      WEATHER.WEATHER
    </h1>
  </div>

  {/* Search Bar */}
  <div className="flex-grow mx-8">
    <SearchBar setCity={setLocation} />
  </div>

  {/* Buttons Section */}
  <div className="flex items-center space-x-4">
    {/* Gemini Button */}
    <button
      className={`p-2 rounded-full flex items-center justify-center border-2 transition-transform duration-300 hover:scale-110 ${
        isLightMode ? "border-gray-500 bg-white" : "border-gray-700 bg-gray-700"
      }`}
      onClick={() => {
        if (location.trim()) {
          setShowGemini(true); // Ensures the Gemini component renders
          setShowPopup(true); // Opens the pop-up

        } else {
          alert("Please enter a location first.");
        }
      }}
    >
      <img src="src/assets/gemini.svg" alt="Gemini" className="w-8 h-8" />
    </button>

    {/* Theme Toggle */}
    <ThemeToggle />
  </div>

  {/* Pop-up Overlay */}
  {showPopup && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-500">
        {showGemini && <Gemini location={location} />}
        <button
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => {setShowGemini
            setShowPopup(false);
            (false);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  )}
</nav>

  
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
  {/* Current Weather */}
  <div className="current-weather col-span-1 lg:col-span-3">
    <CurrentWeather weatherData={currentData} />
  </div>

  {/* Forecast, Precipitation Total, and Comparison */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1 lg:col-span-3">
    <div className="forecast col-span-1">
      <Forecast forecastData={formatForecastData()} />
    </div>
    <div className="precipitation-total col-span-1">
      <Precipitationtotal
        last24Hours={precipitationData.last24Hours}
        next24Hours={precipitationData.next24Hours}
        nextWeek={precipitationData.nextWeek}
      />
    </div>
    <div className="comparison col-span-1">
      <Comparison data={comparisonData} toggle={isLightMode} />
    </div>
  </div>

  {/* TempChart and Precipitation Today */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-1 lg:col-span-3">
    <div className="temperature-chart col-span-1 sm:col-span-1">
      <TempChart tempsData={nineTemps} />
    </div>
    <div className="precipitation-today col-span-1 sm:col-span-1">
      <PrecipitationToday data={precipitationData} />
    </div>
  </div>
</div>


      <Footer />
    </div>
  );
}

export default App;
