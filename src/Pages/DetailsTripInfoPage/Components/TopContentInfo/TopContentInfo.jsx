import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TopContentInfo.css";
import { useLanguage } from "Components/Languages/LanguageContext";
import Favicon from "Components/FavIcon/Favicon ";
const TopContentInfo = ({ tripData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <div data-aos="fade-left" className="top-content-info-details d-flex justify-content-between gap-2 flex-wrap">
      <div className="right-info-details">
        <h2 className="title">{tripData.description}</h2>
        <div className="d-flex flex-wrap gap-3 mt-3">
          {tripData.total_rates > 0 &&
            <div className="rate-stars-details d-flex align-items-center gap-1">
              <span className="icon-star-details rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon-star-details rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon-star-details rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon-star-details rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon-star-details rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>

          }
          {tripData.total_rates > 0 &&
            <div className="rate-num d-flex align-items-center gap-2">
              <span className="fw-blod">{tripData.total_rates} </span> {currentLanguage === "ar" ? "تقييم" : "Rates"}
            </div>
          }
          <div className="badge-top">
            {tripData.price
              ? currentLanguage === "ar"
                ? "مدفوعة"
                : "Paid"
              : currentLanguage === "ar"
                ? "مجانية"
                : "Free"}
          </div>
        </div>
      </div>
      <div className="favicon-cover">
        <Favicon
          modelType={"trip"}
          modelId={tripData.id}
          initialIsFavorite={tripData.is_favourit}
        />
      </div>
    </div>
  );
};

export default TopContentInfo;
