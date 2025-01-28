import ClockIcon2 from "assets/Icons/ClockIcon2";
import DateIcon2 from "assets/Icons/DateIcon2";
import "./DetailsCardPage.css";
import { useEffect, useState } from "react";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useParams } from "react-router-dom";
import ContentAPI from "api/contentApi";
import LoaderSvg from "assets/Icons/LoaderSvg";
import DateDisplay from "Components/DateDisplay/DateDisplay";
import CustomModal from "Components/CustomModal/CustomModal"; // Import the modal component
import usePayment from "Components/hooks/usePayment ";

const DetailsCardPage = ({ effective }) => {
  // Extract the `id` from the URL
  const { id } = useParams();
  // Language
  const { currentLanguage } = useLanguage(); // Get the current language
  // states
  // const [effective, setEffective] = useState(null); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  // Use the custom payment hook
  const { paymentUrl, processingBooking, handleBooking } = usePayment(currentLanguage);


  return (
    <>

      {/* Payment Modal */}
      {paymentUrl && (
        <CustomModal
          show={!!paymentUrl}
          onHide={() => handleBooking(null)} // Close the modal and reset paymentUrl
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
        {/* ============= START HEADER DETAILS CARD PAGE =========== */}
        <div className="header-details-card-page d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h2 className="title">
            {currentLanguage === "ar" ? effective.title_ar : effective.title_en}
          </h2>
          {/* =============== START INFO RIGHT DETAILS ============== */}
          <div className="info-right-details d-flex align-items-center gap-3">
            <div className="num-price-info">
              <span className="price-num fw-bold">
                {effective.price.slice(0, -3)}{" "}
                {currentLanguage === "ar" ? "ريال" : "SAR"}
              </span>{" "}
              / {currentLanguage === "ar" ? "للفرد" : "per person"}
            </div>
            <button
              onClick={() => handleBooking(id)} // Trigger payment process
              disabled={processingBooking}
              className="btn-main"
            >
              {processingBooking
                ? currentLanguage === "ar"
                  ? "جاري التحميل..."
                  : "Loading..."
                : currentLanguage === "ar"
                  ? "حجز"
                  : "Book"}
            </button>
          </div>
          {/* =============== END INFO RIGHT DETAILS ============== */}
        </div>
        {/* ============= END HEADER DETAILS CARD PAGE =========== */}
        {/* ============= START DATE CONTENT INFO =============== */}
        <div className="date-content-info pt-3">
          {/* ========= START DATE  ONE ========== */}
          {effective.from_date && (
            <div className="date-one d-flex align-items-center gap-2">
              <DateIcon2 />
              <DateDisplay from_date={effective.from_date} />
            </div>
          )}
          {/* ========= END DATE  ONE ========== */}
          {/* ========= START DATE  ONE ========== */}
          {effective.from_time > 0 && (
            <div className="date-one pt-2 d-flex align-items-center gap-2">
              <ClockIcon2 />
              {effective.from_time.slice(0, -3)}
            </div>
          )}
          {/* ========= END DATE  ONE ========== */}
        </div>
        {/* ============= END DATE CONTENT INFO =============== */}
        <p className="text pt-3">
          {currentLanguage === "ar"
            ? effective.description_ar
            : effective.description_en}
        </p>
        {/* ============== START LOCATION CONTENT =============== */}
        <div className="location-content-info pt-4">
          {effective.location !== null && (
            <>
              <h2 className="title pb-4">
                {currentLanguage === "ar" ? "الموقع" : "Location"}
              </h2>
              <div className="info-location box-border-circle">
                {/* <h2 className="title-text">{effective.city.title}</h2> */}
                <p className="text">{currentLanguage === "en" ? effective.location : effective.location_ar}</p>
              </div>
            </>
          )}

          <MapLocationInfo tripData={effective} />
        </div>
        {/* ============== END LOCATION CONTENT =============== */}
      </div>
    </>
  );
};

export default DetailsCardPage;