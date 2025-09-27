import IconLocation from "assets/images/collection/IconLocation";
import DateIcon from "assets/Icons/DateIcon";
import { ClockIcon } from "@mui/x-date-pickers";
import "./AllCardsReservation.css";
import UserIcon2 from "assets/Icons/UserIcon2";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useNavigate } from "react-router-dom";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";

const CardReservation = ({
  image,
  typeReservation,
  countryName,
  titleCard,
  priceNum,
  textUserInfo,
  dateTime,
  timeAdd,
  isTrueButtonDetails,
  buttonDetailsFunction,
  isTrueButtonCancel,
  buttonCancelReservationFunction,
  id,
}) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const navigate = useNavigate();

  const navFunction = (id) => {
    navigate(`/tripsPage/${id}`);
  };

  // ================== TRANSLATIONS ==================
  const content = {
    en: {
      details: "Details",
      cancel: "Cancel Reservation",
    },
    ar: {
      details: "التفاصيل",
      cancel: "إلغاء الحجز",
    },
    fr: {
      details: "Détails",
      cancel: "Annuler la réservation",
    },
    de: {
      details: "Einzelheiten",
      cancel: "Reservierung stornieren",
    },
    es: {
      details: "Detalles",
      cancel: "Cancelar reserva",
    },
    tr: {
      details: "Detaylar",
      cancel: "Rezervasyonu İptal Et",
    },
    ru: {
      details: "Детали",
      cancel: "Отменить бронирование",
    },
    zh: {
      details: "详情",
      cancel: "取消预订",
    },
    ko: {
      details: "세부 정보",
      cancel: "예약 취소",
    },
    pt: {
      details: "Detalhes",
      cancel: "Cancelar Reserva",
    },
    ur: {
      details: "تفصیلات",
      cancel: "بکنگ منسوخ کریں",
    },
    ja: {
      details: "詳細",
      cancel: "予約をキャンセル",
    },
  };

  const t = content[currentLanguage] || content.en;
  // ==================================================

  return (
    <div className="card-reservation-one d-flex align-items-center gap-3 flex-wrap flex-lg-nowrap">
      {/* ============ START IMAGE RESERVATION =============== */}
      <div
        className="image-reservation position-relative overlay-bg"
        onClick={() => navFunction(id)}
      >
        <img
          src={image}
          alt="imageReservation"
          loading="lazy"
          className="w-100 h-100 object-fit-cover"
        />
        <div className={`badge-info btn-main`}>{typeReservation}</div>
        <div className="info-text title-country-bg">
          <IconLocation /> {countryName}
        </div>
      </div>
      {/* ============ END IMAGE RESERVATION =============== */}

      {/* ============ START CONTENT INFO CARD =============== */}
      <div className="content-info-card">
        <div className="info-top-card pb-2 d-flex justify-content-between align-items-center gap-2 flex-wrap">
          <h2 className="title">{titleCard}</h2>
          <p className="price-num"><CurrencyDisplay price={priceNum} /></p>
        </div>
        <div className="all-ino-content-botom">
          <div className="info-one-content d-flex align-items-center gap-2">
            <UserIcon2 /> {textUserInfo}
          </div>
          <div className="info-one-content d-flex align-items-center gap-2">
            <DateIcon /> {dateTime}
          </div>
          <div className="bottom-content d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <div className="info-one-content d-flex align-items-center gap-2">
              <ClockIcon /> {timeAdd}
            </div>
            {isTrueButtonDetails && (
              <button onClick={buttonDetailsFunction} className="btn-main btn-details-main">
                {t.details}
              </button>
            )}
            {isTrueButtonCancel && (
              <button onClick={buttonCancelReservationFunction} className="btn-main btn-details-main btn-cancel-bg">
                {t.cancel}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* ============ END CONTENT INFO CARD =============== */}
    </div>
  );
};

export default CardReservation;
