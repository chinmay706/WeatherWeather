# WeatherWeather - Weather Forecast Website

WeatherWeather is a weather forecast web application that not only provides weather data but also offers smart clothing recommendations based on the current weather. Built with modern web technologies, the app uses **Vite**, **React**, **Zustand**, **Immer**, **Axios**, and integrates with the **Gemini API** for clothing suggestions.

## Live Demo

You can access the live application here:  
[WeatherWeather](https://weather-weather-nine.vercel.app/)

### Application Screenshots

- **Light Mode**
  
  [![light.jpg](https://i.postimg.cc/J4nKbR9R/light.jpg)](https://postimg.cc/G9WkRnLf)

- **Dark Mode**
  
  [![dark.jpg](https://i.postimg.cc/X7CBMh5w/dark.jpg)](https://postimg.cc/Whs1g5X3)

- **Recommendation Screen**
  
  [![recom.jpg](https://i.postimg.cc/nLzQWLGL/recom.jpg)](https://postimg.cc/k2046qZr)



## Features
- **Weather Data**: Fetches current weather and 5-day forecast from a weather API.
- **Smart Clothing Recommendations**: Offers clothing suggestions based on the weather data using the Gemini API.
- **User-friendly UI**: Simple and responsive interface built with **React** and **Tailwind CSS**.
- **State Management**: Uses **Zustand** for global state management with **Immer** to handle immutability.
- **API Calls**: Managed with **Axios** for efficient data fetching.

## Technologies Used

- **React**: Front-end library for building UI components.
- **Vite**: Build tool for fast development.
- **Zustand**: Lightweight state management for handling application state.
- **Immer**: Used with Zustand to handle immutable state updates.
- **Axios**: HTTP client for making API requests.
- **Gemini API**: Provides smart clothing recommendations based on weather.
- **Tailwind CSS**: Utility-first CSS framework for fast styling.
- **Vercel**: Deployment platform for continuous deployment and hosting.
- **Recharts**: 

## Setup Instructions

### Prerequisites

Before running the project locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Clone the Repository

```bash
git clone https://github.com/chinmay706/WeatherWeather.git
cd WeatherWeather
```

### Install Dependencies
Install the project dependencies:

```bash
npm install
```
### Set Up Environment Variables
Create a .env file in the project root and add the necessary API keys:

```bash
echo 'VITE_REACT_APP_GEMINI_API_KEY="your-gemini-api-key"' >> .env
echo 'VITE_REACT_APP_WEATHER_API_KEY="your-weather-api-key"' >> .env
```
Replace "your-gemini-api-key" and "your-weather-api-key" with the actual API keys.

### Run the Development Server
Start the development server:

```bash
npm run dev
```
The app will run at http://localhost:3000.

### Build the Project for Production
To build the project for production deployment:

```bash
npm run build
```
The build output will be stored in the dist folder.

### Preview the Production Build
You can preview the production build locally using:

```bash
npm run preview
```
### Deployment
The project is deployed on Vercel. If you want to deploy the project yourself:

1. Log in to Vercel.
2. Import the GitHub repository.
3. Set the environment variables (VITE_REACT_APP_GEMINI_API_KEY and VITE_REACT_APP_WEATHER_API_KEY) in the Vercel dashboard.
4. Use the build command: npm run build.
5. Deploy the project.

## Implementation Choices

1. State Management: Used Zustand with Immer for lightweight, immutable state updates.
2. API Integration: Leveraged Axios for efficient API calls to fetch weather data and clothing recommendations via the Gemini API.
3. Data Visualization: Recharts visualizes weather trends with responsive and customizable charts.
4. Frontend Framework: Chose React with Vite for fast development, HMR, and optimized production builds.
5. Styling: Tailwind CSS enables rapid and consistent styling with utility-first classes.
6. Environment Variables: Sensitive keys are secured in .env for environment-specific configurations.
7. Deployment: Used Vercel for seamless GitHub integration, automated builds, and fast global CDN delivery.
