import IconLocation from "assets/images/collection/IconLocation";
import DateIcon from "assets/Icons/DateIcon";
import { ClockIcon } from "@mui/x-date-pickers";
import "./AllCardsReservation.css";
import UserIcon2 from "assets/Icons/UserIcon2";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useNavigate } from "react-router-dom";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalAddRates from "Pages/DetailsTripInfoPage/Components/ModalsDetailsTripInfo/ModalAddRates/ModalAddRates";
import paymentStatus from "./paymentStatus";

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
  status
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
      addRate: "Add Rating",

    },
    ar: {
      details: "التفاصيل",
      cancel: "إلغاء الحجز",
      addRate: "إضافة تقييم",

    },
    fr: {
      details: "Détails",
      cancel: "Annuler la réservation",
      addRate: "Ajouter une évaluation",
    },
    de: {
      details: "Einzelheiten",
      cancel: "Reservierung stornieren",
      addRate: "Bewertung hinzufügen",
    },
    es: {
      details: "Detalles",
      cancel: "Cancelar reserva",
      addRate: "Agregar calificación",
    },
    tr: {
      details: "Detaylar",
      cancel: "Rezervasyonu İptal Et",
      addRate: "Değerlendirme ekle",
    },
    ru: {
      details: "Детали",
      cancel: "Отменить бронирование",
      addRate: "Добавить отзыв",
    },
    zh: {
      details: "详情",
      cancel: "取消预订",
      addRate: "添加评论",
    },
    ko: {
      details: "세부 정보",
      cancel: "예약 취소",
      addRate: "평가 추가",
    },
    pt: {
      details: "Detalhes",
      cancel: "Cancelar Reserva",
      addRate: "Adicionar avaliação",
    },
    ur: {
      details: "تفصیلات",
      cancel: "بکنگ منسوخ کریں",
      addRate: "درجہ بندی شامل کریں",
    },
    ja: {
      details: "詳細",
      cancel: "予約をキャンセル",
      addRate: "評価を追加",
    },
  };

  const t = content[currentLanguage] || content.en;
  // ==================================================
  const [showModalAddRate, setShowModalAddRate] = useState(false);
  const buttonshowModal = () => setShowModalAddRate(true);
  const hideModalAddRate = () => setShowModalAddRate(false);

  return (

    <div className="card-reservation-one d-flex align-items-center gap-3 flex-wrap flex-lg-nowrap">
      <ModalAddRates
        showModalAddRate={showModalAddRate}
        hideModalAddRate={hideModalAddRate}
        modelId={id}
        modelType={"trip"}
      />
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
        <div className={`badge-info btn-main`}>{paymentStatus[typeReservation]?.[currentLanguage]}</div>
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
            <div>
              {isTrueButtonDetails && (
                <button onClick={buttonDetailsFunction} className="btn-main btn-details-main">
                  {t.details}
                </button>
              )}
              {
                isTrueButtonCancel && (
                  <button onClick={buttonCancelReservationFunction} className="btn-main btn-details-main btn-cancel-bg">
                    {t.cancel}
                  </button>
                )
              }

              {status === 4 ?
                <button
                  onClick={buttonshowModal}
                  className="add-new-rate btn-main mt-3"
                >
                  <FontAwesomeIcon icon={faPlus} /> {t.addRate}
                </button> : null
              }
            </div>
          </div>
        </div>
      </div>
      {/* ============ END CONTENT INFO CARD =============== */}
    </div>
  );
};

export default CardReservation;
