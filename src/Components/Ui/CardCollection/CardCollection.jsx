import "./CardCollection.css";
import IconLocation from "assets/images/collection/IconLocation";
import IconStarRate from "assets/images/collection/IconStarRate";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useState } from "react";
import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import Favicon from "Components/FavIcon/Favicon ";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLanguage, faTicket, faTimes } from '@fortawesome/free-solid-svg-icons';
import enFlag from "assets/images/flags/en.svg";
import arFlag from "assets/images/flags/ar.svg";
import frFlag from "assets/images/flags/fr.svg";
import deFlag from "assets/images/flags/de.svg";
import esFlag from "assets/images/flags/es.svg";
import trFlag from "assets/images/flags/tr.svg";
import ruFlag from "assets/images/flags/ru.svg";
import zhFlag from "assets/images/flags/zh.svg";
import koFlag from "assets/images/flags/ko.svg";
import ptFlag from "assets/images/flags/pt.svg";
import urFlag from "assets/images/flags/ur.svg";
import jaFlag from "assets/images/flags/ja.svg";
import sgnFlag from "assets/images/flags/sgn.svg";

const languageFlags = {
  en: enFlag,
  ar: arFlag,
  fr: frFlag,
  de: deFlag,
  es: esFlag,
  tr: trFlag,
  ru: ruFlag,
  zh: zhFlag,
  ko: koFlag,
  pt: ptFlag,
  ur: urFlag,
  ja: jaFlag,
  sgn: sgnFlag,
};


const CardCollection = ({
  itemId,
  imageCard,
  infoPlaceCard,
  numRate,
  titleCard,
  numPriceCard = false,
  isFav,
  type,
  is_group,
  showFavIcon = true,
  hasFreeCancellation = false,
  hasPayLater = false,
  guide_languages = [],
  booking_count = null,
  discount = null,
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
    } else if (type === "trip") {
      navigate(`/tripsPage/${itemId}`);

    } else if (type === "gift") {
      navigate(`/gifts/${itemId}`);
    } else {
      navigate(`/eventsPage/${itemId}`);
    }
  };

  // Localization object
  const localization = {
    ar: {
      ratingText: "تقييم",
      perPersonText: "/ للفرد",
      forGroup: "/ للمجموعة",
      instedOF: "بدلاً من",
      times: "مرة",
      freeCancel: "إلغاء مجاني",
      payLater: "ادفع لاحقًا",
    },
    en: {
      ratingText: "Rating",
      perPersonText: "/ per person",
      forGroup: "/ per group",
      instedOF: "instead of",
      times: "times",
      freeCancel: "Free Cancellation",
      payLater: "Book now, pay later",
    },
    fr: {
      ratingText: "Évaluation",
      perPersonText: "/ par personne",
      forGroup: "/ par groupe",
      instedOF: "au lieu de",
      times: "fois",
      freeCancel: "Annulation gratuite",
      payLater: "Réservez maintenant, payez plus tard",
    },
    de: {
      ratingText: "Bewertung",
      perPersonText: "/ pro Person",
      forGroup: "/ pro Gruppe",
      instedOF: "anstatt",
      times: "Mal",
      freeCancel: "Kostenlose Stornierung",
      payLater: "Jetzt buchen, später bezahlen",
    },
    es: {
      ratingText: "Calificación",
      perPersonText: "/ por persona",
      forGroup: "/ por grupo",
      instedOF: "en lugar de",
      times: "veces",
      freeCancel: "Cancelación gratuita",
      payLater: "Reserva ahora, paga después",
    },
    tr: {
      ratingText: "Puan",
      perPersonText: "/ kişi başı",
      forGroup: "/ grup başına",
      instedOF: "yerine",
      times: "kez",
      freeCancel: "Ücretsiz iptal",
      payLater: "Şimdi rezervasyon yap, sonra öde",
    },
    ru: {
      ratingText: "Рейтинг",
      perPersonText: "/ за человека",
      forGroup: "/ за группу",
      instedOF: "вместо",
      times: "раз",
      freeCancel: "Бесплатная отмена",
      payLater: "Забронируйте сейчас, оплатите позже",
    },
    zh: {
      ratingText: "评分",
      perPersonText: "/ 每人",
      forGroup: "/ 每组",
      instedOF: "代替",
      times: "次",
      freeCancel: "免费取消",
      payLater: "立即预订，稍后付款",
    },
    ko: {
      ratingText: "평점",
      perPersonText: "/ 1인당",
      forGroup: "/ 그룹당",
      instedOF: "대신",
      times: "회",
      freeCancel: "무료 취소",
      payLater: "지금 예약하고 나중에 결제",
    },
    pt: {
      ratingText: "Avaliação",
      perPersonText: "/ por pessoa",
      forGroup: "/ por grupo",
      instedOF: "em vez de",
      times: "vezes",
      freeCancel: "Cancelamento gratuito",
      payLater: "Reserve agora, pague depois",
    },
    ur: {
      ratingText: "درجہ بندی",
      perPersonText: "/ فی شخص",
      forGroup: "/ فی گروپ",
      instedOF: "کے بجائے",
      times: "بار",
      freeCancel: "مفت منسوخی",
      payLater: "اب بک کریں، بعد میں ادا کریں",
    },
    ja: {
      ratingText: "評価",
      perPersonText: "/ 1人あたり",
      forGroup: "/ グループあたり",
      instedOF: "の代わりに",
      times: "回",
      freeCancel: "無料キャンセル",
      payLater: "今すぐ予約、後払い",
    },
    sgn: {
      ratingText: "Rating (Sign)",
      perPersonText: "/ per person (Sign)",
      forGroup: "/ per group (Sign)",
      instedOF: "instead of (Sign)",
      times: "times (Sign)",
      freeCancel: "Free Cancellation (Sign)",
      payLater: "Book now, pay later (Sign)",
    }
  };


  const { ratingText, perPersonText, forGroup, instedOF, times, freeCancel, payLater } = localization[currentLanguage];

  return (
    <>
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />

      {/* ============ START CARD COLLECTION ONE =========== */}
      <div className={`card-collection-one ${discount === null && "border-0 p-0" }`}>
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
          {
            showFavIcon && (
              <Favicon
                modelType={type}
                modelId={itemId}
                initialIsFavorite={isFav}
              />
            )
          }
          <div className="info-text">
            <IconLocation /> {infoPlaceCard}
          </div>
        </div>
        {/* =========== END IMAGE COLLECTION =========== */}
        {/* =========== START CONTENT INFO CARD ========== */}
        <div className="content-info-card pt-3">

          <div className="d-flex align-items-center justify-content-between gap-4">
            <h2 className="title">{titleCard}</h2>
            {booking_count && (
              <div className="d-flex align-items-center gap-1 " style={{ minWidth: "max-content", fontSize: "12px" }}>
                <FontAwesomeIcon icon={faTicket} />
                <span>
                  {booking_count}
                  {" "}
                  {times}
                </span>
              </div>
            )}
          </div>
          {discount && discount < numPriceCard ? (
            <div className="price-info pb-2">
              <span className="price-num ">
                <CurrencyDisplay price={discount} />
                {"  "}  {instedOF}
                <span className="text-danger text-decoration-line-through fw-bold"> <CurrencyDisplay price={numPriceCard} /></span>
                <span>{is_group ? forGroup : perPersonText}</span>
              </span>
            </div>
          ) : (
            numPriceCard ? (

              <div className="price-info pb-2">
                <span className="price-num ">
                  <CurrencyDisplay price={numPriceCard} />
                </span>
                <span>{is_group ? forGroup : perPersonText}</span>
              </div>
            ) : null
          )}

          <div className="d-flex flex-wrap align-items-center gap-2 pb-2 ">
            {numRate > 0 && (
              <div className="rate-card d-flex align-items-center gap-1">
                <IconStarRate /> {numRate?.toFixed(1)} {ratingText}
              </div>
            )}
            {hasFreeCancellation ? (
              <div className="detials-info-one d-flex align-items-center gap-2">
                {hasFreeCancellation ? (
                  <div className="icon-times  icon-check-link">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                ) : (
                  <div className="icon-times bg-secondary icon-check-link">
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                )}
                <span className="title-text">
                  {freeCancel}
                </span>
              </div>
            ) : null}
            {hasPayLater ? (
              <div className="detials-info-one d-flex align-items-center gap-2">
                {hasPayLater ? (
                  <div className="icon-times  icon-check-link">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                ) : (
                  <div className="icon-times bg-secondary icon-check-link">
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                )}
                <span className="title-text">
                  {payLater}
                </span>
              </div>
            ) : null}

          </div>
          {
            guide_languages && guide_languages.length > 0 ? (
              <div className="d-flex gap-3 align-items-center ">
                <FontAwesomeIcon icon={faLanguage} />
                <div className="text d-flex flex-wrap gap-2 ">
                  {guide_languages.map((lang) => (
                    <span key={lang} className="me-2 d-flex align-items-center flags">
                      <img
                        src={languageFlags[lang]}
                        alt={lang}
                        style={{ width: "20px", height: "14px" }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            ) : null
          }
        </div>
        {/* =========== END CONTENT INFO CARD ========== */}
      </div >
      {/* ============ END CARD COLLECTION ONE =========== */}
    </>
  );
};

export default CardCollection;