import React, { useState, useEffect } from "react";
import useThemeStore from "../themeStore"; // Importing theme store

const Gemini = ({ location }) => {
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const isLightMode = useThemeStore((state) => state.isLightMode); // Access theme state
  const toggleTheme = useThemeStore((state) => state.toggle); // Toggle theme function
  const geminiApiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY; // Gemini API Key
  const weatherApiKey =  import.meta.env.VITE_REACT_APP_WEATHER_API_KEY; // Weather API Key

  useEffect(() => {
    if (!location) return;

    const fetchClothingRecommendation = async () => {
      setLoading(true); // Show loading state
      try {
        // Fetch weather data for the location
        const weatherResponse = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`
        );
        const weatherData = await weatherResponse.json();

        if (weatherData.error) {
          setRecommendation("Unable to fetch weather data. Please try again.");
          return;
        }

        const temperature = weatherData.current.temp_c;

        if (temperature === undefined) {
          setRecommendation("Temperature data is unavailable.");
          return;
        }

        // Prepare Gemini Payload
        const geminiPayload = {
          contents: [
            {
              parts: [
                {
                  text: `The current temperature in ${location} is ${temperature}°C. Based on this, what clothing would you recommend for today?`
                }
              ]
            }
          ]
        };

        // Send the request to Gemini API
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(geminiPayload),
          }
        );

        if (!geminiResponse.ok) {
          const errorDetails = await geminiResponse.json();
          console.error("Gemini API Error Details:", errorDetails); // Log Gemini API error details
          throw new Error(errorDetails.error.message || "Failed to fetch recommendation.");
        }

        const geminiData = await geminiResponse.json();

        const candidates = geminiData?.candidates;

        if (candidates && candidates.length > 0) {
          const parts = candidates[0]?.content?.parts;

          if (parts && parts.length > 0) {
            const recommendationText = parts[0]?.text;
            if (recommendationText) {
              // Clean up the recommendation text
              const cleanedText = recommendationText.replace(/\*/g, "").replace(/\n/g, "<br>");
              setRecommendation(cleanedText);
            } else {
              setRecommendation("No recommendation available.");
            }
          } else {
            setRecommendation("No recommendation available.");
          }
        } else {
          setRecommendation("No recommendation available.");
        }
      } catch (error) {
        console.error("Error during API request:", error.message);
        setRecommendation("An error occurred. Please try again later.");
      } finally {
        setLoading(false); // Stop loading after the request
      }
    };

    fetchClothingRecommendation(); // Call the function to fetch recommendation
  }, [location]);

  return (
    <div className={`max-w-lg mx-auto mt-10 p-5 ${isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <h1 className="text-2xl font-semibold text-center mb-4">Clothing Recommendation</h1>
      {loading ? (
        <p>Loading...</p> // Show loading message while waiting for the response
      ) : (
        <div>
          {/* Display the recommendation only if it's available */}
          {recommendation && (
            <div
              className={`mb-4 p-4 border rounded-lg shadow-md ${isLightMode ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'}`}
              dangerouslySetInnerHTML={{ __html: recommendation }}
            />
          )}
        </div>
      )}
      
    </div>
  );
};

export default Gemini;
