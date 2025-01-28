import React, { useState, useEffect, useRef } from "react";
import CustomModal from "Components/CustomModal/CustomModal";
import "./ModalsDetailsTripInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ReadMoreText from "Components/Ui/ReadMoreText/ReadMoreText";
import { ClockIcon } from "@mui/x-date-pickers";
import LoaderSvg from "assets/Icons/LoaderSvg";
import BookingAPI from "api/bookingApi";
import { toast } from "react-toastify";
import { useLanguage } from "Components/Languages/LanguageContext";

const ModalAvailableExcursionPrograms = ({
  tripData,
  showModalAvailable,
  hideModalAvailable,
}) => {
  const iframeRef = useRef(null);
  const [activeIndices, setActiveIndices] = useState({});
  const [activeCards, setActiveCards] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const { currentLanguage } = useLanguage(); // Language Context

  const content = {
    paymentInitiated: {
      ar: "تم بدء عملية الدفع. يرجى إتمام الدفع.",
      en: "Payment initiated. Please complete the payment.",
    },
    paymentFailed: {
      ar: "فشلت عملية الدفع. يرجى المحاولة مرة أخرى.",
      en: "Payment failed. Please try again.",
    },
    paymentError: {
      ar: "حدث خطأ أثناء عملية الدفع. يرجى المحاولة لاحقًا.",
      en: "An error occurred during payment. Please try again later.",
    },
    paymentSuccess: {
      ar: "تم عملية الدفع بنجاح.",
      en: "Payment completed successfully.",
    },
    paymentFailure: {
      ar: "فشلت عملية الدفع.",
      en: "Payment failed.",
    },
    availablePrograms: {
      ar: "البرامج المتاحة",
      en: "Available Programs",
    },
    noTitle: {
      ar: "لا يوجد عنوان",
      en: "No Title",
    },
    noDescription: {
      ar: "لا توجد تفاصيل إضافية",
      en: "No Description Available",
    },
    totalPrice: {
      ar: "الإجمالي",
      en: "Total",
    },
    currency: {
      ar: "ريال سعودي",
      en: "SAR",
    },
    reserve: {
      ar: "حجز",
      en: "Reserve",
    },
  };

  const handleClick = (index) => {
    setActiveIndices(index);
  };

  const buttonActiveBook = async (tripId) => {
    setIsLoading(true);
    try {
      const bookingDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD
      const peopleNumber = 2; // Replace with actual number of people
      const childrenNumber = 1; // Replace with actual number of children
      const paymentWay = "online"; // Replace with "online" or another value based on your logic

      const response = await BookingAPI.bookTrip({
        tripId,
        bookingDate,
        peopleNumber,
        childrenNumber,
        paymentWay,
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
      {paymentUrl && (
        <CustomModal
          show={!!paymentUrl}
          onHide={() => setPaymentUrl(null)}
          title={content.paymentInitiated[currentLanguage]}
          newClass={"modal-payment"}
        >
          <iframe
            src={paymentUrl}
            ref={iframeRef}
            id="paymentIframe"
            style={{ width: "100%", height: "500px", border: "none" }}
            title="Payment Gateway"
            allow="payment"
          />
        </CustomModal>
      )}

      <CustomModal
        show={showModalAvailable}
        onHide={hideModalAvailable}
        title={content.availablePrograms[currentLanguage]}
        newClass={"modal-available modal-width-content"}
      >
        <div className="all-content-available">
          <div className="details-header">
            <h2>{tripData.title || content.noTitle[currentLanguage]}</h2>
            <p>{tripData.description || content.noDescription[currentLanguage]}</p>
          </div>

          <div className="row g-3">
            {tripData.available_times.map((time, index) => (
              <div key={index} className="col-12">
                <div
                  className={`card-content-available ${
                    activeCards[index] ? "active" : ""
                  }`}
                >
                  <div className="header-card-available d-flex align-items-center justify-content-between gap-2 flex-wrap">
                    <h2 className="title">{tripData.title}</h2>
                    <div
                      className={`icon-check-link ${
                        activeCards[index] ? "active" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  </div>

                  <div className="content-card-details py-2">
                    <ReadMoreText
                      text={tripData.description || content.noDescription[currentLanguage]}
                      maxLength={100}
                      newClass={"text-card pt-3"}
                    />
                    <div className="times-trips change-scroll d-flex align-items-center gap-2 py-3 flex-wrap">
                      <div
                        className={`main-btn-filter ${
                          activeIndices === index ? "active" : ""
                        }`}
                        onClick={() => handleClick(index)}
                      >
                        <ClockIcon /> {time.from_time} - {time.to_time}
                      </div>
                    </div>

                    <div className="bottom-content-card">
                      <div className="row g-3 align-items-center">
                        <div className="col-12 col-sm-6">
                          <div className="content-right-card">
                            <p className="text">Code: {tripData.id}</p>
                            <div className="total-price">
                              {content.totalPrice[currentLanguage]} {tripData.price || "0"} {content.currency[currentLanguage]}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <button
                            onClick={() => buttonActiveBook(tripData.id)}
                            className={`btn-main w-100 m-0 btn-height`}
                            disabled={isLoading}
                          >
                            {isLoading ? <LoaderSvg /> : content.reserve[currentLanguage]}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default ModalAvailableExcursionPrograms;
