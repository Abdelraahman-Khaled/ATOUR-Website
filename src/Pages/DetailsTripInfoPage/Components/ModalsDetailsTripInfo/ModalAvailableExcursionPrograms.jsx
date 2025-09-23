import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "context/BookingContext";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";

const ModalAvailableExcursionPrograms = ({
  tripData,
  showModalAvailable,
  hideModalAvailable,
  // initialAdults,
  initialChildren,
  // selectedDay
}) => {
  const iframeRef = useRef(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [paymentWay, setPaymentWay] = useState("online");
  const { currentLanguage } = useLanguage();
  const { selectedDate, numberOfPeople } = useBooking();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const content = {
    paymentInitiated: {
      ar: "تم بدء عملية الدفع. يرجى إتمام الدفع.",
      en: "Payment initiated. Please complete the payment.",
    },
    paymentFailed: {
      ar: "فشلت عملية الدفع. يرجى المحاولة مرة أخرى.",
      en: "Payment failed. Please try again.",
    },
    paymentCancelled: {
      ar: "تم الغاء عملية الدفع. يرجى المحاولة مرة أخرى.",
      en: "Payment cancelled. Please try again.",
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
    choosePaymentWay: {
      ar: " أختر طريقة الدفع ",
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

  const { id } = useParams();

  const handleTimeClick = (index) => {
    setSelectedTimeIndex(index);
    setSelectedTime(tripData.available_times[index].from_time);
  };


  const buttonActiveBook = async (tripId) => {
    if (!selectedTime || !selectedDate) {
      toast.error(currentLanguage === "en" ? "Please select both a time and a day before booking." : "يرجى تحديد الوقت واليوم قبل الحجز.");
      return;
    }

    setIsLoading(true);
    try {
      const bookingDay = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`; // Format date string
      const currentDate = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"
      const response = await BookingAPI.bookTrip({
        tripId,
        bookingDay,
        peopleNumber: numberOfPeople,
        childrenNumber: initialChildren,
        paymentWay,
        time: selectedTime,
        bookingDate: currentDate,
        language: currentLanguage
      });
      if (response.success) {
        if (paymentWay === "cash") {
          toast.success(content.paymentSuccess[currentLanguage]);
          hideModalAvailable();
          navigate("/reservations")
        } else if (response.data?.data?.transaction?.url) {
          setPaymentUrl(response.data.data.transaction.url);
          toast.success(content.paymentInitiated[currentLanguage]);
        }
      } else {
        toast.error(response.data?.response?.message || content.paymentFailed[currentLanguage]);
        hideModalAvailable();
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentMessage = useCallback(async (event) => {
    const allowedOrigins = [
      "https://checkout.tap.company",
      "https://authentication.staging.tap.company",
      "http://localhost:3000",
    ];

    if (!allowedOrigins.includes(event.origin)) {
      console.warn("Blocked unknown message origin:", event.origin);
      return;
    }

    const { event: eventName, data } = event.data;

    // Prevent duplicate processing
    if (isProcessingPayment) return;
    setIsProcessingPayment(true);

    try {
      if (eventName === "checkout:onSuccess") {
        setPaymentUrl(null);
        hideModalAvailable();
        const response = await BookingAPI.getPaymentStatus("trip-payment", data.chargeId);

        if (response.data?.status === "CAPTURED") {
          toast.success(content.paymentSuccess[currentLanguage]);
          navigate("/reservations");
        } else if (response.data?.status === "DECLINED") {
          toast.error(content.paymentFailed[currentLanguage]);
        } else if (response.data?.status === "CANCELLED") {
          toast.error(content.paymentCancelled[currentLanguage]);
        }
      } else if (
        eventName === "checkout:onFailure" ||
        eventName === "checkout:onClose" ||
        eventName === "checkout:onError"
      ) {
        setPaymentUrl(null);
        toast.warn(content.paymentCancelled[currentLanguage]);
      }
    } finally {
      setIsProcessingPayment(false);
    }
  }, [currentLanguage, isProcessingPayment]);

  useEffect(() => {
    window.addEventListener("message", handlePaymentMessage);
    return () => {
      window.removeEventListener("message", handlePaymentMessage);
    };
  }, [handlePaymentMessage]);


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
        <div className="all-content-available ">
          <div className="details-header mb-4">
            <h2 className="title mb-2">{tripData.title || content.noTitle[currentLanguage]}</h2>
            <p className="text">{tripData.description || content.noDescription[currentLanguage]}</p>
          </div>

          {/* Select Time */}

          {/* Details */}
          <div className="">
            <h2 className="title">تفاصيل الحجز</h2>
            {selectedDate ? (
              <>
                <p className="text">{currentLanguage === "ar" ? "التاريخ المحدد:" : "Selected Date:"} {`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`}</p>
              </>
            )
              : (
                <p className="text">{currentLanguage === "ar" ? "التاريخ المحدد:" : "Selected Date:"} لا يوجد يوم محدد يرجي اختيار اليوم</p>
              )
            }
            <p className="text">{currentLanguage === "ar" ? "العدد" : "Number:"}: {numberOfPeople}</p>
            <p className="text">{currentLanguage === "ar" ? "السعر" : "price:"}: <CurrencyDisplay price={tripData.customer_price} /></p>
            <p className="text">الاوقات المتاحة</p>
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
          </div>
          {/* Select Day */}
          {/* <div className="times-trips d-flex align-items-center gap-2 py-3 mb-3 flex-wrap">
            {tripData.available_days.map((day, index) => (
              <div
                key={index}
                className={`main-btn-filter ${selectedDayIndex === index ? "active" : ""}`}
                onClick={() => handleDayClick(index)}
              >
                <ClockIcon /> {day}
              </div>
            ))}
          </div> */}

          {/* Payment Method */}
          {tripData.pay_later == true && (
            <Form.Group controlId="paymentWay" className="gap-3 mx-1 my-3">
              <Form.Label className="text-black my-2">{content.choosePaymentWay[currentLanguage]}</Form.Label>
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
      </CustomModal >
    </>
  );
};

export default ModalAvailableExcursionPrograms;
