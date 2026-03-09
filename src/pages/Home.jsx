import PompHeader from "../components/pomp/header.jsx";
import { useState, useEffect } from "react";
function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("/data/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        setCountries(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, []);

  {
    /* Filter countries by region and search term */
  }
  const filteredCountries = countries
    .filter((country) => {
      if (region === "") return true;
      return country.region === region;
    })
    .filter((country) => {
      if (searchTerm === "") return true;
      return (
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  {
    /*modals*/
  }

  const modals = () => setSelectedCountry(null);

  return (
    <div
      className={`min-h-screen w-full ${darkMode ? "bg-[hsl(209,26%,17%)]" : "bg-[hsl(0,0%,100%)]"} `}
    >
      <PompHeader
        title="Where in the world?"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="w-full p-4 md:p-12 flex flex-col">
        <div className="input  w-full flex flex-col md:flex-row md:justify-between">
          <input
            className={`p-2 h-12 mb-4 rounded text-[12px] md:text-[16px] w-full md:w-[40%] ${darkMode ? "text-[hsl(0,100%,100%)] shadow bg-[hsl(209,23%,22%)] placeholder:text-[hsl(0,100%,100%)]" : "text-[hsl(200,15%,8)] shadow bg-[hsl(0,0%,100%)] placeholder:text-[hsl(200,15%,8)]"}`}
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className={`pl-2 pr-2 w-[40%] text-[12px] md:text-[16px] md:w-[20%] h-12 rounded ${darkMode ? "text-[hsl(0,100%,100%)] shadow bg-[hsl(209,23%,22%)]" : "text-[hsl(200,15%,8)] shadow bg-[hsl(0,0%,100%)]"}`}
            name="filtro"
            id="filtro"
            onChange={handleRegionChange}
          >
            <option
              className={`${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-[hsl(0,0%,100%)]"}`}
              value={region}
              disabled
              selected
            >
              Filter by Region
            </option>

            <option
              className={`${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-[hsl(0,0%,100%)]"}`}
              value="Africa"
            >
              Africa
            </option>
            <option
              className={`${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-[hsl(0,0%,100%)]"}`}
              value="Americas"
            >
              America
            </option>
            <option
              className={`${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-[hsl(0,0%,100%)]"}`}
              value="Asia"
            >
              Asia
            </option>
            <option
              className={`${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-[hsl(0,0%,100%)]"}`}
              value="Europe"
            >
              Europe
            </option>
            <option
              className={`${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-[hsl(0,0%,100%)]"}`}
              value="Oceania"
            >
              Oceania
            </option>
          </select>
        </div>

        <div className="cards w-full mt-8 flex flex-wrap justify-center md:justify-between gap-10">
          {filteredCountries.map((country) => (
            <div
              key={country.name}
              className={`w-60 rounded-md shadow-md overflow-hidden transition-colors ${
                darkMode
                  ? "bg-[hsl(209,23%,22%)] text-white"
                  : "bg-white text-black"
              }`}
            >
              <button
                onClick={() => setSelectedCountry(country)}
                className="cursor-pointer overflow-hidden"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={country.flags.svg || country.flags.png}
                  alt={country.name.common}
                />
              </button>
              {selectedCountry && (
                <div
                  className={`fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10 ${
                    darkMode
                      ? "bg-[hsl(209,23%,22%)] text-white"
                      : "bg-white text-[hsl(200,15%,8%)]"
                  }`}
                >
                  {/* Botón Cerrar */}
                  <button
                    onClick={modals}
                    className="absolute top-8 right-8 text-4xl hover:scale-110 transition-transform"
                  >
                    &times;
                  </button>

                  <div className="w-full max-w-7xl flex flex-col md:flex-row gap-12 items-center">
                    {/* Izquierda: Bandera (Media pantalla en MD) */}
                    <div className="w-full md:w-1/2">
                      <img
                        src={
                          selectedCountry.flags.svg || selectedCountry.flags.png
                        }
                        alt={selectedCountry.name.common}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                      />
                    </div>

                    {/* Derecha: Detalles */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                      <h1 className="text-3xl md:text-4xl font-extrabold">
                        {selectedCountry.name.common || selectedCountry.name}
                      </h1>

                      {/* Grid de detalles en dos columnas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        <div className="space-y-2">
                          <p className="text-base">
                            <span className="font-semibold">Native Name:</span>{" "}
                            {Object.values(
                              selectedCountry.name.nativeName || {},
                            )[0]?.common || "N/A"}
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">Population:</span>{" "}
                            {selectedCountry.population.toLocaleString()}
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">Region:</span>{" "}
                            {selectedCountry.region}
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">Sub Region:</span>{" "}
                            {selectedCountry.subregion}
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">Capital:</span>{" "}
                            {selectedCountry.capital}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-base">
                            <span className="font-semibold">
                              Top Level Domain:
                            </span>{" "}
                            {selectedCountry.tld?.join(", ")}
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">Currencies:</span>{" "}
                            {Object.values(selectedCountry.currencies || {})
                              .map((c) => c.name)
                              .join(", ")}
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">Languages:</span>{" "}
                            {Object.values(
                              selectedCountry.languages || {},
                            ).join(", ")}
                          </p>
                        </div>
                      </div>

                      {/* Bordes separados por botones/etiquetas */}
                      <div className="mt-8">
                        <h3 className="font-semibold mb-3">
                          Border Countries:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCountry.borders ? (
                            selectedCountry.borders.map((border) => (
                              <span
                                key={border}
                                className={`px-4 py-1 text-sm rounded shadow-sm ${
                                  darkMode
                                    ? "bg-[hsl(209,23%,22%)] border border-gray-600"
                                    : "bg-gray-100 border border-gray-200"
                                }`}
                              >
                                {border}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm opacity-70">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="font-bold text-lg mb-4">{country.name}</h3>
                <p className="text-sm">
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
