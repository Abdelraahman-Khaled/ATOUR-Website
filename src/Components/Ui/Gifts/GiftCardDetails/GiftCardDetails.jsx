import "./GiftCardDetais.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ContentAPI from "api/contentApi";
import LoaderSvg from "assets/Icons/LoaderSvg";
import { toast } from "react-toastify";
import BookingAPI from "api/bookingApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import CustomModal from "Components/CustomModal/CustomModal";
import DateIcon2 from "assets/Icons/DateIcon2";
import DateDisplay from "Components/DateDisplay/DateDisplay";
import ClockIcon2 from "assets/Icons/ClockIcon2";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";
import GiftModel from "../GiftModel/GiftModel";
const GiftCardDetails = ({ gift }) => {
    const { id } = useParams();
    const { currentLanguage } = useLanguage(); // Get the current language
    const [paymentUrl, setPaymentUrl] = useState(null);

    return (
        <>
            {/* Payment Modal */}
            {paymentUrl && (
                <CustomModal
                    show={!!paymentUrl}
                    onHide={() => setPaymentUrl(null)}
                    title={currentLanguage === "ar" ? "إتمام الدفع" : "Complete Payment"}
                    newClass={"modal-payment"}
                >
                    <iframe
                        src={paymentUrl}
                        id="paymentIframe"
                        style={{ width: "100%", height: "500px", border: "none" }}
                        title="Payment Gateway"
                        allow="payment"
                    />
                </CustomModal>
            )}

            <div className="details-card-page padding-80">
                {/* Header */}
                <div className="header-details-card-page d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h2 className="title">
                        {currentLanguage === "ar" ? gift?.title : gift?.title_en}
                    </h2>
                    <div className="info-right-details d-flex align-items-center gap-3">
                        <div className="num-price-info">
                            <span className="price-num fw-bold">
                                {gift?.price?.slice(0, -3)} {currentLanguage === "ar" ? "ريال" : "SAR"}
                            </span>{" "}
                            / {currentLanguage === "ar" ? "للفرد" : "per person"}
                        </div>
                        <GiftModel giftId={id} />
                    </div>
                </div>

                {/* Date and Time */}
                <div className="date-content-info pt-3">
                    {gift?.from_date && (
                        <div className="date-one d-flex align-items-center gap-2">
                            <DateIcon2 />
                            <DateDisplay from_date={gift.from_date} />
                        </div>
                    )}
                    {gift?.from_time > 0 && (
                        <div className="date-one pt-2 d-flex align-items-center gap-2">
                            <ClockIcon2 />
                            {gift.from_time.slice(0, -3)}
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className="text pt-3">
                    {currentLanguage === "ar" ? gift?.description_ar : gift?.description_en}
                </p>

                {/* Location */}
                <div className="location-content-info pt-4">
                    {gift?.location && (
                        <>
                            <h2 className="title pb-4">
                                {currentLanguage === "ar" ? "الموقع" : "Location"}
                            </h2>
                            <div className="info-location box-border-circle">
                                <p className="text">
                                    {currentLanguage === "en" ? gift.location : gift.location_ar}
                                </p>
                            </div>
                        </>
                    )}
                    <MapLocationInfo tripData={gift} />
                </div>
            </div>
        </>
    );
};

export default GiftCardDetails;