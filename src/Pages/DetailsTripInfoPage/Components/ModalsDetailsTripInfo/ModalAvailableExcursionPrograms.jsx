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
import { Form } from "react-bootstrap";

const ModalAvailableExcursionPrograms = ({
  tripData,
  showModalAvailable,
  hideModalAvailable,
  initialAdults,
  initialChildren,
}) => {
  const iframeRef = useRef(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [paymentWay, setPaymentWay] = useState("online");
  const { currentLanguage } = useLanguage();

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
    paymentWay: {
      ar: "طريقة الدفع",
      en: "Payment Way",
    },
    cash: {
      ar: "نقدي",
      en: "Cash",
    },
    online: {
      ar: "البطاقة البنكية",
      en: "Online",
    },
  };
  console.log(tripData.available_days[selectedDayIndex]);


  const handleTimeClick = (index) => {
    setSelectedTimeIndex(index);
    setSelectedTime(tripData.available_times[index].from_time);
  };

  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
  };

  const buttonActiveBook = async (tripId) => {
    if (selectedTime === null || selectedDayIndex === null) {
      toast.error("Please select both a time and a day before booking.");
      return;
    }

    setIsLoading(true);
    try {
      const bookingDay = tripData.available_days[selectedDayIndex]; // Selected date
      const currentDate = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

      const response = await BookingAPI.bookTrip({
        tripId,
        bookingDay,
        peopleNumber: initialAdults,
        childrenNumber: initialChildren,
        paymentWay,
        time: selectedTime,
        bookingDate: currentDate
      });

      if (response.success) {
        if (paymentWay === "cash") {
          toast.success(content.paymentSuccess[currentLanguage]);
          hideModalAvailable();
        } else if (response.data?.data?.transaction?.url) {
          setPaymentUrl(response.data.data.transaction.url);
          toast.success(content.paymentInitiated[currentLanguage]);
        }
      } else {
        toast.error(response.data?.response?.message || content.paymentFailed[currentLanguage]);
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
      const allowedOrigins = ["https://checkout.tap.company", "http://localhost:3000"];
      if (!allowedOrigins.includes(event.origin)) return;

      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData?.result === "SUCCESS") {
          toast.success(content.paymentSuccess[currentLanguage]);
          setPaymentUrl(null);
        } else if (parsedData?.result === "FAILED") {
          toast.error(content.paymentFailed[currentLanguage]);
          setPaymentUrl(null);
        }
      } catch (error) {
        console.error("Failed to parse iframe message:", error);
      }
    };

    window.addEventListener("message", handlePaymentMessage);
    return () => window.removeEventListener("message", handlePaymentMessage);
  }, [currentLanguage]);

  return (
    <>
      {paymentUrl && (
        <CustomModal
          show={!!paymentUrl}
          onHide={() => setPaymentUrl(null)}
          title={content.paymentInitiated[currentLanguage]}
          newClass="modal-payment"
        >
          <iframe
            src={paymentUrl}
            ref={iframeRef}
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
        newClass="modal-available modal-width-content"
      >
        <div className="all-content-available">
          <div className="details-header">
            <h2>{tripData.title || content.noTitle[currentLanguage]}</h2>
            <p>{tripData.description || content.noDescription[currentLanguage]}</p>
          </div>

          {/* Select Time */}
          <div className="times-trips d-flex align-items-center gap-2 py-3 flex-wrap">
            {tripData.available_times.map((time, index) => (
              <div
                key={index}
                className={`main-btn-filter ${selectedTimeIndex === index ? "active" : ""}`}
                onClick={() => handleTimeClick(index)}
              >
                <ClockIcon /> {time.from_time} - {time.to_time}
              </div>
            ))}
          </div>

          {/* Select Day */}
          <div className="times-trips d-flex align-items-center gap-2 py-3 mb-3 flex-wrap">
            {tripData.available_days.map((day, index) => (
              <div
                key={index}
                className={`main-btn-filter ${selectedDayIndex === index ? "active" : ""}`}
                onClick={() => handleDayClick(index)}
              >
                <ClockIcon /> {day}
              </div>
            ))}
          </div>

          {/* Payment Method */}
          {tripData.pay_later == true && (
            <Form.Group controlId="paymentWay" className="gap-3 my-3">
              <Form.Check
                className="d-flex gap-2"
                type="radio"
                label={content.cash[currentLanguage]}
                name="paymentWay"
                value="cash"
                checked={paymentWay === "cash"}
                onChange={(e) => setPaymentWay(e.target.value)}
              />
              <Form.Check
                className="d-flex gap-2 my-2"
                type="radio"
                label={content.online[currentLanguage]}
                name="paymentWay"
                value="online"
                checked={paymentWay === "online"}
                onChange={(e) => setPaymentWay(e.target.value)}
              />
            </Form.Group>
          )}

          {/* Reserve Button */}
          <button onClick={() => buttonActiveBook(tripData.id)} className="btn-main w-100" disabled={isLoading}>
            {isLoading ? <LoaderSvg /> : content.reserve[currentLanguage]}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default ModalAvailableExcursionPrograms;
