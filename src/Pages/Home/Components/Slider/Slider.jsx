import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Slider.css";
import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import SearchInputLocation from "Components/Ui/SearchInputLocation/SearchInputLocation";
import { useLanguage } from "Components/Languages/LanguageContext";
import GeneralAPI from "api/generalApi";
import ContentAPI from "api/contentApi";
import { useNavigate } from "react-router-dom";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
// import Loader from "Components/Auth/Components/Loader/Loader";
import { toast } from "react-toastify";

const Slider = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [sliders, setSliders] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // State to track active slide index
  const router = useNavigate(); // Initialize router for navigation

  // open form when it route
  const [showLogin, setShowLogin] = useState(false);
  const hideLogin = () => setShowLogin(false);

  useEffect(() => {
    const fetchSliderData = async () => {
      const cachedSliders = sessionStorage.getItem("sliders");
      const cachedCities = sessionStorage.getItem(`cities-${currentLanguage}`);

      if (cachedSliders && cachedCities) {
        setSliders(JSON.parse(cachedSliders));
        setCities(JSON.parse(cachedCities));
        return;
      }

      try {
        const sliderRes = await GeneralAPI.getSliders(currentLanguage);
        const citiesRes = await ContentAPI.getCities(currentLanguage);

        setSliders(sliderRes.data || []);
        setCities(citiesRes.data || []);

        sessionStorage.setItem("sliders", JSON.stringify(sliderRes.data || []));
        sessionStorage.setItem(`cities-${currentLanguage}`, JSON.stringify(citiesRes.data || []));
      } catch (err) {
        console.error("Error fetching sliders or cities:", err);
        setError("Failed to fetch slider data. Please try again later.");
      }
    };

    fetchSliderData();
  }, [currentLanguage]);


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
          <div className="all-main-content-slider" data-aos="fade-up">
            {/* Display the title of the active slide */}
            {sliders.length > 0 && (
              <h2 className="title-silde">
                {isAuthenticated()
                  ? user && currentLanguage === "ar"
                    ? `مرحبًا ${capitalizeFirstLetter(user?.name)}`
                    : `Hi ${capitalizeFirstLetter(user?.name)}!`
                  : currentLanguage === "ar"
                    ? sliders[activeSlideIndex]?.title_ar
                    : sliders[activeSlideIndex]?.title_en}
              </h2>
            )}
            <div className="main-add-place-date main-add-place-date--1">
              <SearchInputLocation
                setSelectedCity={setSelectedCity}
                cities={cities}
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
                className="btn-main btn-search-submit"
                type="submit"
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
