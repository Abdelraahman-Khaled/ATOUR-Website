import { useState, useEffect, useRef, useMemo } from "react";
import "./SearchInputLocation.css";
import LocationIcon from "assets/Icons/LocationIcon";
import { useLanguage } from "Components/Languages/LanguageContext";
import searchIcon from "../../../../src/assets/images/serachIcon/serachIcon.png";
import { translations } from "./translations";


const SearchInputLocation = ({ searchItems, setSelectedCity }) => {
  const { currentLanguage } = useLanguage();
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef(null);
  const t = (key) =>
    translations[key][currentLanguage] || translations[key]["en"];

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowResults(false);
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
    setShowResults(true);

    if (value) {
      const normalized = normalizeText(value);
      const filtered = searchItems.filter((item) =>
        currentLanguage === "en"
          ? normalizeText(item?.title).includes(normalized)
          : normalizeText(item?.title).includes(normalized)
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  // Handle city selection
  const handleItemClick = (item) => {
    setSelectedCity(item.id);
    setInputValue(""); // Clear input after selection
    setShowResults(false);
    setFilteredItems([]);
  };

  // Decide what to show
  const visibleItems = inputValue ? filteredItems : searchItems;

  // Group cities by country
  const groupedItems = useMemo(() => {
    const groups = {};
    if (visibleItems) { // Add a check for visibleItems
      visibleItems.forEach(item => {
        if (!groups[item.countryName]) {
          groups[item.countryName] = [];
        }
        groups[item.countryName].push(item);
      });
    }
    return groups;
  }, [visibleItems]);

  return (
    <div ref={containerRef} className="all-input-search-city position-relative">
      <div className="input-search-content">
        <input
          type="text"
          className="form-control input-search-location"
          placeholder={t("placeholderSearch")}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
        />
        <div className="icon-location">
          <LocationIcon />
        </div>
      </div>

      {showResults && (
        <div className="all-city-search">
          <div className="city-list-info change-scroll">
            {Object.keys(groupedItems).length > 0 ? (
              Object.keys(groupedItems).map(countryName => (
                <div key={countryName}>
                  <div className="country-name-header p-2 fw-bold">
                    {countryName}
                  </div>
                  {groupedItems[countryName].map((item) => (
                    <div
                      key={item.id}
                      className="city-item-one d-flex align-items-center gap-3"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="icon-air">
                        <img src={searchIcon} alt="search-icon" width={20} />
                      </div>
                      {currentLanguage === "en" ? item?.title : item?.title}
                    </div>
                  ))}
                </div>
              ))
            ) : (inputValue &&
              <div className="no-city-found text-muted p-2">
                {currentLanguage === "en" ? "No results found" : "لا توجد نتائج"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputLocation;
