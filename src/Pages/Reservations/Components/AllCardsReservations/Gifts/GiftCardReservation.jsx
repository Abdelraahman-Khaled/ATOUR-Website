import IconLocation from "assets/images/collection/IconLocation";
import DateIcon from "assets/Icons/DateIcon";
import { ClockIcon } from "@mui/x-date-pickers";
import "../AllCardsReservation.css";
import UserIcon2 from "assets/Icons/UserIcon2";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useNavigate } from "react-router-dom";
import Gift from "assets/images/IconsHeader/Gift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalAddRates from "Pages/DetailsTripInfoPage/Components/ModalsDetailsTripInfo/ModalAddRates/ModalAddRates";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";
import paymentStatus from "../paymentStatus";

const GiftCardReservation = ({
    image,
    typeReservation,
    countryName,
    titleCard,
    priceNum,
    textUserInfo,
    isTrueButtonDetails,
    buttonDetailsFunction,
    isTrueButtonCancel,
    buttonCancelReservationFunction,
    description,
    id, status
}) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    // less description
    const sliceWords = (text) => {
        const words = text.split(" ");
        return words.slice(0, 10).join(" ") + (words.length > 25 ? "..." : "");
    };
    const navigate = useNavigate()
    const navFunction = (id) => {
        navigate(`/gifts/${id}`)
    }
    const [showModalAddRate, setShowModalAddRate] = useState(false);
    const buttonshowModal = () => setShowModalAddRate(true);
    const hideModalAddRate = () => setShowModalAddRate(false);

    return (
        <div className="card-reservation-one d-flex align-items-center gap-3 flex-wrap flex-lg-nowrap">
            <ModalAddRates
                showModalAddRate={showModalAddRate}
                hideModalAddRate={hideModalAddRate}
                modelId={id}
                modelType={"gift"}
            />
            {/* ============ START IMAGE RESERVATION =============== */}
            <div className="image-reservation position-relative overlay-bg" onClick={() => navFunction(id)}>
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
                    <p className="price-num">  <CurrencyDisplay price={priceNum} /></p>
                </div>
                <p className="title">{sliceWords(description || "")}</p>

                <div className="all-ino-content-botom">
                    <div className="info-one-content d-flex align-items-center gap-2">
                        <Gift />
                        {textUserInfo}
                    </div>
                    {/* <div className="info-one-content d-flex align-items-center gap-2">
                        <DateIcon /> {dateTime}
                    </div> */}
                    <div className="bottom-content d-flex justify-content-end align-items-center gap-2 flex-wrap " >
                        <div>
                            {isTrueButtonDetails && (
                                <button onClick={buttonDetailsFunction} className="btn-main btn-details-main">{currentLanguage === "ar" ? "التفاصيل" : "Details"}</button>
                            )}
                            {isTrueButtonCancel && (
                                <button onClick={buttonCancelReservationFunction} className="btn-main btn-details-main btn-cancel-bg">
                                    {currentLanguage === "ar" ? "إلغاء الحجز" : "Cancel Reservation"}
                                </button>
                            )}
                            {status === 4 ? <button
                                onClick={buttonshowModal}
                                className="add-new-rate btn-main mt-3"
                            >
                                <FontAwesomeIcon icon={faPlus} /> {"إضافة تقييم"}
                            </button> : null}
                        </div>
                    </div>
                </div>
            </div>
            {/* ============ END CONTENT INFO CARD =============== */}
        </div>
    );
};

export default GiftCardReservation;
