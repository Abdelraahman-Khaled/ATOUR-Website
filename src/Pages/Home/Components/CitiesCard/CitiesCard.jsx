import  { useState, useEffect } from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import "./CitiesCard.css";
import { Link } from "react-router-dom";
import useTranslation from "Components/Languages/useTranslation";
import "./CitiesCardFilter.css";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SwiperCards from "Components/Ui/SwiperCards/SwiperCards";

const CitiesCard = ({ CityData }) => {
  const { t } = useTranslation(); // Get the translation function
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCityData, setFilteredCityData] = useState(CityData);
  const [availableCountries, setAvailableCountries] = useState([]);

  useEffect(() => {
    const uniqueCountries = Array.from(new Set(CityData.map(item => item.country_name)))
      .map((countryName, index) => ({ id: index + 1, title: countryName }));
    setAvailableCountries(uniqueCountries);
    if (uniqueCountries.length > 0) {
      setSelectedCountry(uniqueCountries[0].title); // Set the first country as selected by default
    }
  }, [CityData]);

  useEffect(() => {
    if (selectedCountry) {
      setFilteredCityData(
        CityData.filter(
          (item) => item.country_name.toLowerCase() === selectedCountry.toLowerCase()
        )
      );
    } else {
      setFilteredCityData(CityData);
    }
  }, [CityData, selectedCountry]);

  // Get translated section title and description
  const sectionTitle = t('homePage.mostVisitedDestinations.sectionTitle');
  const sectionText = t('homePage.mostVisitedDestinations.sectionText');

  return (
    <div className="city-card-content padding-top">
      {/* =========== START SECTION TITLE ========== */}
      <TitleSection title={sectionTitle} text={sectionText} />
      {/* =========== END SECTION TITLE ============ */}

      {/* Filter buttons */}
      <div className="container mb-4">
        <div className="d-flex overflow-x-auto gap-2 all-info-card pb-3">
          <div className="d-flex gap-2 flex-nowrap mx-auto">
            {availableCountries.map((country) => (
              <button
                key={country.id}
                className={`btn ${selectedCountry === country.title ? "btn-card-one active" : "btn-card-one"}`}
                onClick={() => setSelectedCountry(country.title)}
              >
                {country.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========== START ALL IMAGES CARD =========== */}
      <div className="all-images-card" data-aos="fade-up">
        {/* ============ START ROW ========== */}
        <SwiperCards swiperId="cities-card-swiper">
          {filteredCityData.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="w-auto" >
                  <Link to={`/biographyPage/${item.id}`}>
                    {/* ============ START CARD IMAGE ONE =========== */}
                    <div className="city-image-one">
                      <div className="image-card position-relative overlay-bg circular-image">
                        <img
                          src={item.image}
                          alt="imageCard"
                          loading="lazy"
                          className="w-100 h-100 object-fit-cover image-card-src"
                        />
                      </div>
                      <h2 className="title">
                        {item.title}
                      </h2>
                    </div>
                    {/* ============ END CARD IMAGE ONE =========== */}
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperCards>
        {/* ============ END ROW ========== */}
      </div>
      {/* =========== END ALL IMAGES CARD =========== */}
    </div>
  );
};

export default CitiesCard;
