import IconLocation from "assets/images/collection/IconLocation";
import DateIcon from "assets/Icons/DateIcon";
import { ClockIcon } from "@mui/x-date-pickers";
import "./AllCardsReservation.css";
import UserIcon2 from "assets/Icons/UserIcon2";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useNavigate } from "react-router-dom";
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
  // Navigate
  const navigate = useNavigate()
  const navFunction = (id) => {
    navigate(`/tripsPage/${id}`)
  }
  return (
    <div className="card-reservation-one d-flex align-items-center gap-3 flex-wrap flex-lg-nowrap">
      {/* ============ START IMAGE RESERVATION =============== */}
      <div className="image-reservation position-relative overlay-bg" onClick={() => navFunction(id)}>
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
          <p className="price-num">{priceNum} {currentLanguage === "ar" ? "ريال" : "SAR"} </p>
        </div>
        <div className="all-ino-content-botom">
          <div className="info-one-content d-flex align-items-center gap-2">
            <UserIcon2 /> {textUserInfo}
          </div>
          <div className="info-one-content d-flex align-items-center gap-2">
            <DateIcon /> {dateTime}
          </div>
          <div className="bottom-content d-flex justify-content-between  align-items-center gap-2 flex-wrap">
            <div className="info-one-content d-flex align-items-center gap-2">
              <ClockIcon /> {timeAdd}
            </div>
            {isTrueButtonDetails && (
              <button onClick={buttonDetailsFunction} className="btn-main btn-details-main">{currentLanguage === "ar" ? "التفاصيل" : "Details"}</button>
            )}
            {isTrueButtonCancel && (
              <button onClick={buttonCancelReservationFunction} className="btn-main btn-details-main btn-cancel-bg">
                {currentLanguage === "ar" ? "إلغاء الحجز" : "Cancel Reservation"}
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
