import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TopContentInfo.css";
import { useLanguage } from "Components/Languages/LanguageContext";
import Favicon from "Components/FavIcon/Favicon ";
import ShareButton from "Components/ShareButton/ShareButton";

const translations = {
  en: "Top rated",
  ar: "الأعلى تقييماً",
  fr: "Les mieux notés",
  de: "Bestbewertet",
  es: "Mejor valorados",
  tr: "En yüksek puanlı",
  ru: "Самые высоко оцененные",
  zh: "评分最高",
  ko: "최고 평점",
  pt: "Mais bem avaliados",
  ur: "اعلی درجہ بندی",
  ja: "最高評価"
};


const TopContentInfo = ({ tripData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  console.log(tripData);

  return (
    <div data-aos="fade-left" className="top-content-info-details d-flex justify-content-between gap-2 flex-wrap">
      <div className="right-info-details">
        <h2 className="title">{tripData.title}</h2>
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
          {tripData.total_rates > 0 && (
            <>
              <div className="rate-num d-flex align-items-center gap-2">
                <span className="fw-bold">
                  {tripData.total_rates ? tripData.total_rates.toFixed(1) : 0}
                </span>{" "}
              </div>
              <div className="badge-top">
                {tripData.total_rates > 4
                  &&
                  translations[currentLanguage]
                }
              </div>
            </>
          )
          }


        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2">
        <ShareButton
          url={window.location.href}
          title={tripData.title}
          text={currentLanguage === "ar" ? "شارك هذه الرحلة" : "Share this trip"}
        />
        <div className="favicon-cover">
          <Favicon
            modelType={"trip"}
            modelId={tripData.id}
            initialIsFavorite={tripData.is_favourit}
          />
        </div>
      </div>
    </div>
  );
};

export default TopContentInfo;
