import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SearchInputLocation.css";
import LocationIcon from "assets/Icons/LocationIcon";
import { useLanguage } from "Components/Languages/LanguageContext"; // Import language context

const SearchInputLocation = ({ cities, setSelectedCity }) => {
  const { currentLanguage } = useLanguage(); // Get the current language from the context
  const [filteredCities, setFilteredCities] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Normalize text for consistent comparison
  const normalizeText = (text) =>
    text.trim().toLowerCase().replace(/[\u064B-\u0652]/g, "");

  // Handle input changes and filter cities
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const normalizedValue = normalizeText(value);
      const filtered = cities.filter((city) =>
        currentLanguage === "en"
          ? normalizeText(city.title_en).includes(normalizedValue)
          : normalizeText(city.title_ar).includes(normalizedValue)
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  // Handle city click
  const handleCityClick = (city) => {
    setInputValue(currentLanguage === "en" ? city.title_en : city.title_ar);
    setSelectedCity(city.id);
    setFilteredCities([]);
  };

  return (
    <div className={`all-input-search-city position-relative`}>
      {/* ======== START SEARCH INPUT ========= */}
      <div className="input-search-content">
        <input
          type="text"
          id="inputField"
          className="form-control input-search-location"
          placeholder={
            currentLanguage === "en" ? "Where to? Specify your destination" : "إلى أين ؟ حدد وجهتك"
          }
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="icon-location">
          <LocationIcon />
        </div>
      </div>
      {/* ======== END SEARCH INPUT ========= */}
      {filteredCities.length > 0 && (
        <div className="all-city-search">
          <div className="city-list-info change-scroll">
            {filteredCities.map((city) => (
              <div
                key={city.id}
                className="city-item-one d-flex align-items-center gap-3"
                onClick={() => handleCityClick(city)}
              >
                <div className="icon-air">
                  <FontAwesomeIcon icon={faPlane} />
                </div>
                {currentLanguage === "en" ? city.title_en : city.title_ar}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputLocation;
