const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-4 bg-black/20 p-6 rounded-2xl shadow-md max-w-screen-lg mx-auto transition-all hover:bg-black/30">
      <h3 className="text-center text-white text-sm sm:text-base font-medium">
        Designed and Built by{" "}
        <a
          href="https://github.com/chinmay706"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:text-white transition-colors duration-200"
        >
          Chinmay Oli
        </a>{" "}
        with React, CSS, Chart.js, GeolocationAPI, and WeatherAPI.
      </h3>
    </div>
  );
};

export default Footer;
