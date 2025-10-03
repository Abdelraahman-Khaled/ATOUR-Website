import { faCoins, faIcons, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TopContentInfo.css";
import { useLanguage } from "Components/Languages/LanguageContext";
import Favicon from "Components/FavIcon/Favicon ";
import ShareButton from "Components/ShareButton/ShareButton";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";

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

  return (
    <div data-aos="fade-left" className="top-content-info-details d-flex justify-content-between gap-2 flex-wrap">
      <div className="right-info-details">
        <h2 className="title">{tripData.title}</h2>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center justify-content-between gap-2">
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
    </div>
  );
};

export default TopContentInfo;
