import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import "./SearchInputLocation.css";
import LocationIcon from "assets/Icons/LocationIcon";
import { useLanguage } from "Components/Languages/LanguageContext";
import searchIcon from "../../../../src/assets/images/serachIcon/serachIcon.png";
import { translations } from "./translations";


const SearchInputLocation = ({ cities, setSelectedCity }) => {
  const { currentLanguage } = useLanguage();
  const [filteredCities, setFilteredCities] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showCities, setShowCities] = useState(false);
  const containerRef = useRef(null);
  const t = (key) =>
    translations[key][currentLanguage] || translations[key]["en"];

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowCities(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Normalize text
  const normalizeText = (text) =>
    text.trim().toLowerCase().replace(/[\u064B-\u0652]/g, "");

  // Handle typing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowCities(true);

    if (value) {
      const normalized = normalizeText(value);
      const filtered = cities.filter((city) =>
        currentLanguage === "en"
          ? normalizeText(city?.title_en).includes(normalized)
          : normalizeText(city?.title_ar).includes(normalized)
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  // Handle city selection
  const handleCityClick = (city) => {
    setSelectedCity(city.id);
    setInputValue(""); // Clear input after selection
    setShowCities(false);
    setFilteredCities([]);
  };

  // Decide what to show
  const visibleCities = inputValue ? filteredCities : cities;

  return (
    <div ref={containerRef} className="all-input-search-city position-relative">
      <div className="input-search-content">
        <input
          type="text"
          className="form-control input-search-location"
          placeholder={t("placeholderSearch")}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowCities(true)}
        />
        <div className="icon-location">
          <LocationIcon />
        </div>
      </div>

      {showCities && (
        <div className="all-city-search">
          <div className="city-list-info change-scroll">
            {visibleCities.length > 0 ? (
              visibleCities.map((city) => (
                <div
                  key={city.id}
                  className="city-item-one d-flex align-items-center gap-3"
                  onClick={() => handleCityClick(city)}
                >
                  <div className="icon-air">
                    <img src={searchIcon} alt="search-icon" width={20} />
                  </div>
                  {currentLanguage === "en" ? city?.title_en : city?.title_ar}
                </div>
              ))
            ) : (
              <div className="no-city-found text-muted p-2">
                {currentLanguage === "en" ? "No cities found" : "هذه المدينة غير متوفرة حاليا"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputLocation;
