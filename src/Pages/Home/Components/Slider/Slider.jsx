import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Slider.css";
import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import SearchInputLocation from "Components/Ui/SearchInputLocation/SearchInputLocation";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useHome } from "context/HomeContext";
import { useNavigate } from "react-router-dom";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
// import Loader from "Components/Auth/Components/Loader/Loader";
import { toast } from "react-toastify";
import CountryAPI from "api/country";
import ContentAPI from "api/contentApi";
import content from "./translates";

const Slider = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { sliders, cities, error: contextError } = useHome(); // Use data from HomeContext
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  const [error, setError] = useState(null); // State to handle errors
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // State to track active slide index
  const router = useNavigate(); // Initialize router for navigation

  const [countries, setCountries] = useState([]); // Add countries state
  const [searchableItems, setSearchableItems] = useState([]); // New state for combined data
  const [loading, setLoading] = useState(true);

  // open form when it route
  const [showLogin, setShowLogin] = useState(false);
  const hideLogin = () => setShowLogin(false);

  // Set error from context if available
  useEffect(() => {
    if (contextError) {
      setError(contextError);
    }
  }, [contextError]);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [responseCountries, responseCities] = await Promise.all([
          CountryAPI.getCountries(currentLanguage),
          ContentAPI.getCities(currentLanguage),
        ]);
        setCountries(responseCountries.data || []);
        // Assuming cities from useHome context is not needed anymore, or can be merged
        // For now, let's use the fetched cities directly
        setSearchableItems(responseCities.data || []); // Initialize with cities, will be combined later
      } catch (err) {
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [currentLanguage]);

  useEffect(() => {
    if (countries.length > 0 && cities.length > 0) {
      const combined = cities.map(city => {
        const country = countries.find(c => c.id === city.country_id);
        return {
          ...city,
          countryName: country ? country.title : 'Unknown',
          type: 'city'
        };
      });
      setSearchableItems(combined);
    }
  }, [countries, cities]);

  useEffect(() => {
    if (selectedCity) {
      navigate(`/biographyPage/${selectedCity}`);
      setSelectedCity(null);
    }
  }, [selectedCity, navigate]);

  // Function to handle slide change
  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.activeIndex); // Update the active slide index
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    const user = localStorage.getItem("user"); // Assuming the user data is stored in 'user'
    return user ? true : false;
  };

  // Function to get the user data from localStorage
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  const user = getUser();

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <>
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
      <SwiperSlider
        itemsSlider={sliders}
        sliderNewClass={"slider-home"}
        onSlideChange={handleSlideChange} // Pass the slide change handler
      >

        <div className="content-slider-info">
          <h1 className="title-slogen mb-5">
            {content[currentLanguage].slogan}
          </h1>
          <div className="all-main-content-slider" data-aos="fade-up">
            {/* Display the title of the active slide */}
            {sliders.length > 0 &&
              <h2 className="title-silde">
                {isAuthenticated()
                  ? user && content[currentLanguage].hi + ` ${capitalizeFirstLetter(user?.name)}!`
                  : sliders[activeSlideIndex]?.title
                }
              </h2>
            }


            <div className="main-add-place-date main-add-place-date--1">
              <SearchInputLocation
                setSelectedCity={isAuthenticated() ? setSelectedCity : () => setShowLogin(true)}
                searchItems={searchableItems} // Pass searchableItems instead of cities
              />
              <button
                onClick={() => {
                  if (isAuthenticated()) {
                    if (!selectedCity) {
                      toast.warning(
                        currentLanguage === "ar"
                          ? "هذه المدينة غير متاحة لدينا حاليا"
                          : "This city is not supported yet."
                      );
                    } else if (selectedCity) {
                      router(`/biographyPage/${selectedCity}`); // Navigate to the selected city route
                    }
                  } else {
                    setShowLogin(true);
                  }
                }}
                className={`btn-main btn-search-submit ${!isAuthenticated() ? 'login-required' : ''}`}
                type="submit"
                title={!isAuthenticated() ? (currentLanguage === "ar" ? "يرجى تسجيل الدخول للبحث" : "Please login to search") : ""}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
      </SwiperSlider>
    </>
  );
};

export default Slider;
