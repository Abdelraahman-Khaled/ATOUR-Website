import ClockIcon2 from "assets/Icons/ClockIcon2";
import DateIcon2 from "assets/Icons/DateIcon2";
import "./DetailsCardPage.css";
import { useEffect, useRef, useState } from "react";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useParams } from "react-router-dom";
import ContentAPI from "api/contentApi";
import LoaderSvg from "assets/Icons/LoaderSvg";
import DateDisplay from "Components/DateDisplay/DateDisplay";
import CustomModal from "Components/CustomModal/CustomModal"; // Import the modal component
import { toast } from "react-toastify";
import BookingAPI from "api/bookingApi";

const DetailsCardPage = ({ effective }) => {
  // Extract the `id` from the URL
  const { id } = useParams();
  // Language
  const { currentLanguage } = useLanguage(); // Get the current language
  // states
  const iframeRef = useRef(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [processingBooking, setProcessingBooking] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);




  const content = {
    paymentInitiated: {
      ar: "تم بدء عملية الدفع. يرجى إتمام العملية.",
      en: "Payment initiated. Please complete the payment.",
    },
    paymentSuccess: {
      ar: "تمت عملية الدفع بنجاح.",
      en: "Payment completed successfully.",
    },
    paymentFailed: {
      ar: "فشلت عملية الدفع. يرجى المحاولة مرة أخرى.",
      en: "Payment failed. Please try again.",
    },
    fetchFailed: {
      ar: "فشل في جلب تفاصيل الفعالية. يرجى المحاولة لاحقًا.",
      en: "Failed to fetch event details. Please try again later.",
    },
    errorOccurred: {
      ar: "حدث خطأ أثناء الحجز. يرجى المحاولة لاحقًا.",
      en: "An error occurred during the booking process. Please try again later.",
    },
    loadingDetails: {
      ar: "جاري تحميل تفاصيل الفعالية...",
      en: "Loading event details...",
    },
    noEventDetails: {
      ar: "تفاصيل الفعالية غير موجودة.",
      en: "Event details not found.",
    },
    book: {
      ar: "حجز",
      en: "Book",
    },
    booking: {
      ar: "جاري التحميل...",
      en: "Loading...",
    },
    completePayment: {
      ar: "إتمام الدفع",
      en: "Complete Payment",
    },
  };


  const buttonActiveBook = async (tripId) => {
    setIsLoading(true);
    try {
      const effectiveneId = id
      const paymentWay = "online"
      const response = await BookingAPI.bookEffectivene({
        effectiveneId,
        paymentWay
      });

      if (response.success && response.data?.data?.transaction?.url) {
        setPaymentUrl(response.data.data.transaction.url);
        toast.success(content.paymentInitiated[currentLanguage]);
      } else {
        toast.error(
          response.data?.response?.message || content.paymentFailed[currentLanguage]
        );
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error(content.paymentError[currentLanguage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handlePaymentMessage = (event) => {
      try {
        const allowedOrigins = [
          "https://checkout.tap.company",
          "https://authentication.staging.tap.company",
          "http://localhost:3000",
        ];

        if (!allowedOrigins.includes(event.origin)) {
          console.warn("Blocked message from unknown origin:", event.origin);
          return;
        }

        const data = event.data;

        console.log("Message received from iframe:", data);

        if (typeof data === "string") {
          try {
            const parsedData = JSON.parse(data);

            if (parsedData?.result === "SUCCESS") {
              toast.success(content.paymentSuccess[currentLanguage]);
              setPaymentUrl(null);
            } else if (parsedData?.result === "FAILED") {
              toast.error(content.paymentFailure[currentLanguage]);
              setPaymentUrl(null);
            }
          } catch (error) {
            console.error("Failed to parse iframe message:", error);
          }
        }
      } catch (error) {
        console.error("Error handling message from iframe:", error);
      }
    };

    window.addEventListener("message", handlePaymentMessage);

    return () => {
      window.removeEventListener("message", handlePaymentMessage);
    };
  }, [currentLanguage]);

  return (
    <>

      {/* Payment Modal */}
      {paymentUrl && (
        <CustomModal
          show={!!paymentUrl}
          onHide={() => setPaymentUrl(null)} // Close the modal and reset paymentUrl
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
            {currentLanguage === "ar" ? effective.title : effective.title_en}
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
              onClick={() => buttonActiveBook(id)} // Trigger payment process
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