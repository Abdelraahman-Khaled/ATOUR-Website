import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Slider.css";
import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import SearchInputLocation from "Components/Ui/SearchInputLocation/SearchInputLocation";
import { useLanguage } from "Components/Languages/LanguageContext";
import GeneralAPI from "api/generalApi";
import ContentAPI from "api/contentApi";
import LoaderSvg from "assets/Icons/LoaderSvg";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [sliders, setSliders] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // State to track active slide index
  const router = useNavigate(); // Initialize router for navigation

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await GeneralAPI.getSliders();
        const responseCities = await ContentAPI.getCities();
        setCities(responseCities.data || []);
        setSliders(response.data || []);
      } catch (err) {
        setError("Failed to fetch slider data. Please try again later.");
        console.error("Error fetching sliders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders(); // Call the API on component mount
  }, []);

  // Function to handle slide change
  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.activeIndex); // Update the active slide index
  };

  if (loading) {
    return (
      <div className="text-center m-4">
        <span style={{ scale: "2" }}>
          <LoaderSvg />
        </span>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
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
                {currentLanguage === "ar" ? sliders[activeSlideIndex].title_ar : sliders[activeSlideIndex].title_en}
              </h2>
            )}
            {/* <div className="main-info-avatar d-flex align-items-center gap-4 flex-wrap">
              <AvatarGroup
                renderSurplus={(surplus) => (
                  <span>{surplus.toString()[0]}K+</span>
                )}
                total={8000}
                className="all-avatar"
              >
                <Avatar alt="Remy Sharp" src={image1} className="avatar-1" />
                <Avatar alt="Remy Sharp" src={image2} className="avatar-1" />
                <Avatar alt="Remy Sharp" src={image3} className="avatar-1" />
                <Avatar alt="Remy Sharp" src={image4} className="avatar-1" />
              </AvatarGroup>
              <h2 className="text-title">{trustText}</h2>
            </div> */}
            {/* Search Input and Button */}
            <div className="main-add-place-date main-add-place-date--1">
              <SearchInputLocation
                setSelectedCity={setSelectedCity}
                cities={cities}
              />
              <button
                onClick={() => {
                  if (selectedCity) {
                    router(`/biographyPage/${selectedCity}`); // Navigate to the selected city route
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



