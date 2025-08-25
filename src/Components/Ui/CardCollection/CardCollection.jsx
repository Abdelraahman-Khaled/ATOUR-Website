import "./CardCollection.css";
import IconLocation from "assets/images/collection/IconLocation";
import IconStarRate from "assets/images/collection/IconStarRate";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useEffect, useState } from "react";
import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import { toast } from "react-toastify";
import Favicon from "Components/FavIcon/Favicon ";

const CardCollection = ({
  itemId,
  imageCard,
  infoPlaceCard,
  numRate,
  titleCard,
  numPriceCard,
  isFav,
  type,
}) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal
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
    } else {
      navigate(`/tripsPage/${itemId}`);
    }
  };

  // Localization object
  const localization = {
    ar: {
      ratingText: "تقييم",
      priceStartText: "تبدأ من",
      perPersonText: "/ للفرد",
    },
    en: {
      ratingText: "Rating",
      priceStartText: "Starting from",
      perPersonText: "/ per person",
    },
    fr: {
      ratingText: "Évaluation",
      priceStartText: "À partir de",
      perPersonText: "/ par personne",
    },
    de: {
      ratingText: "Bewertung",
      priceStartText: "Ab",
      perPersonText: "/ pro Person",
    },
    es: {
      ratingText: "Calificación",
      priceStartText: "Desde",
      perPersonText: "/ por persona",
    },
    tr: {
      ratingText: "Puan",
      priceStartText: "Başlangıç fiyatı",
      perPersonText: "/ kişi başı",
    },
    ru: {
      ratingText: "Рейтинг",
      priceStartText: "Начиная с",
      perPersonText: "/ за человека",
    },
    zh: {
      ratingText: "评分",
      priceStartText: "起价",
      perPersonText: "/ 每人",
    },
    ko: {
      ratingText: "평점",
      priceStartText: "부터 시작",
      perPersonText: "/ 1인당",
    },
    pt: {
      ratingText: "Avaliação",
      priceStartText: "A partir de",
      perPersonText: "/ por pessoa",
    },
    ur: {
      ratingText: "درجہ بندی",
      priceStartText: "سے شروع",
      perPersonText: "/ فی شخص",
    },
    ja: {
      ratingText: "評価",
      priceStartText: "開始価格",
      perPersonText: "/ 1人あたり",
    },
  };


  const { ratingText, priceStartText, perPersonText } = localization[currentLanguage];

  return (
    <>
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />

      {/* ============ START CARD COLLECTION ONE =========== */}
      <div className="card-collection-one">
        {/* =========== START IMAGE COLLECTION =========== */}
        <div className="image-collection overlay-bg">
          <img
            src={imageCard}
            alt="imageCollection"
            loading="lazy"
            className="w-100 h-100 object-fit-cover"
            onClick={handleLinkClick}
          />
          {/* Use the Favicon component here */}
          <Favicon
            modelType={type}
            modelId={itemId}
            initialIsFavorite={isFav}
          />
          <div className="info-text">
            <IconLocation /> {infoPlaceCard}
          </div>
        </div>
        {/* =========== END IMAGE COLLECTION =========== */}
        {/* =========== START CONTENT INFO CARD ========== */}
        <div className="content-info-card pt-3">
          {numRate > 0 && (
            <div className="rate-card d-flex align-items-center gap-1">
              <IconStarRate /> {numRate} {ratingText}
            </div>
          )}
          <h2 className="title">{titleCard}</h2>
          <div className="price-info">
            {priceStartText} <span className="price-num">{numPriceCard}</span> {perPersonText}
          </div>
        </div>
        {/* =========== END CONTENT INFO CARD ========== */}
      </div>
      {/* ============ END CARD COLLECTION ONE =========== */}
    </>
  );
};

export default CardCollection;