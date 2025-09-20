import React, { useState, useEffect } from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import "./ImagesCard.css";
import { Link } from "react-router-dom";
import useTranslation from "Components/Languages/useTranslation";
import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import "./ImagesCardFilter.css";

const ImagesCard = ({ mostVisited }) => {
  const { t } = useTranslation(); // Get the translation function
  const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredMostVisited, setFilteredMostVisited] = useState(mostVisited);
  const [availableCountries, setAvailableCountries] = useState([]);

  useEffect(() => {
    const uniqueCountries = Array.from(new Set(mostVisited.map(item => item.country_name)))
      .map((countryName, index) => ({ id: index + 1, title: countryName }));
    setAvailableCountries(uniqueCountries);
  }, [mostVisited]);

  useEffect(() => {
    if (selectedCountry) {
      setFilteredMostVisited(
        mostVisited.filter(
          (item) => item.country_name.toLowerCase() === selectedCountry.toLowerCase()
        )
      );
    } else {
      setFilteredMostVisited(mostVisited);
    }
  }, [mostVisited, selectedCountry]);

  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const hideLogin = () => {
    setShowLogin(false);
  };
  const handleLinkClick = (e) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      handleShowLogin(); // Open login form if not authenticated
    }
  };

  // Get translated section title and description
  const sectionTitle = t('homePage.mostVisitedDestinations.sectionTitle');
  const sectionText = t('homePage.mostVisitedDestinations.sectionText');

  return (
    <div className="images-card-content padding-top">
      {/* Auth login */}
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
      {/* =========== START SECTION TITLE ========== */}
      <TitleSection title={sectionTitle} text={sectionText} />
      {/* =========== END SECTION TITLE ============ */}

      {/* Filter buttons */}
      <div className="container mb-4">
        <div className="d-flex flex-wrap justify-content-center gap-2 all-info-card ">
          <button
            className={`btn ${selectedCountry === "" ? "btn-card-one active" : "btn-card-one"} `}
            onClick={() => setSelectedCountry("")}
          >
            {t('common.all')}
          </button>
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

      {/* =========== START ALL IMAGES CARD =========== */}
      <div className="all-images-card" data-aos="fade-up">
        {/* ============ START ROW ========== */}
        <div className="row g-3 justify-content-center">
          {filteredMostVisited.map((item) => {
            return (
              <div key={item.id} className="col-6 col-md-4 col-lg-3">
                <Link to={`/biographyPage/${item.id}`} onClick={handleLinkClick}>
                  {/* ============ START CARD IMAGE ONE =========== */}
                  <div className="card-image-one">
                    <div className="image-card position-relative overlay-bg">
                      <img
                        src={item.image}
                        alt="imageCard"
                        loading="lazy"
                        className="w-100 h-100 object-fit-cover image-card-src"
                      />
                    </div>
                    <div className="content-info">
                      <h2 className="title">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                  {/* ============ END CARD IMAGE ONE =========== */}
                </Link>
              </div>
            );
          })}
        </div>
        {/* ============ END ROW ========== */}
      </div>
      {/* =========== END ALL IMAGES CARD =========== */}
    </div>
  );
};

export default ImagesCard;
