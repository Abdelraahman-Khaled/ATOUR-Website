import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BookingAPI from "api/bookingApi";
import { useBooking } from "context/BookingContext";

const usePayment = (content, currentLanguage) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const navigate = useNavigate();
  const { numberOfPeople } = useBooking();

  const initiatePayment = async (effectiveneId, paymentWay = "online") => {
    setIsLoading(true);
    try {
      const response = await BookingAPI.bookEffectivene({
        effectiveneId,
        paymentWay,
        people_number: numberOfPeople,
      });
      if (response.success && response.data?.data?.transaction?.url) {
        setPaymentUrl(response.data.data.transaction.url);
        toast.success(content.paymentInitiated[currentLanguage]);
      } else if (response.success) {
        navigate("/reservations");
        toast.success(content.bookingOperation[currentLanguage]);
      } else {
        toast.error(
          response.data?.response?.message ||
            content.paymentFailed[currentLanguage]
        );
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error(content.paymentError[currentLanguage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentMessage = useCallback(
    async (event) => {
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

      if (eventName === "checkout:onSuccess") {
        setPaymentUrl(null);
        const response = await BookingAPI.getPaymentStatus(
          "effectivenes-payment",
          data.chargeId
        );
        if (response.data?.status === "CAPTURED") {
          toast.success(content.paymentSuccess[currentLanguage]);
          setPaymentUrl(null);
          navigate("/reservations");
        } else if (response.data?.status === "DECLINED") {
          toast.error(content.paymentFailed[currentLanguage]);
          setPaymentUrl(null);
        } else if (response.data?.status === "CANCELLED") {
          toast.error(content.paymentCancelled[currentLanguage]);
          setPaymentUrl(null);
        }
      } else if (
        eventName === "checkout:onFailure" ||
        eventName === "checkout:onClose" ||
        eventName === "checkout:onError"
      ) {
        toast.warn(content.paymentCancelled[currentLanguage]);
        setPaymentUrl(null);
      }
    },
    [currentLanguage, content]
  );

  useEffect(() => {
    window.addEventListener("message", handlePaymentMessage);

    // Cleanup function
    return () => {
      window.removeEventListener("message", handlePaymentMessage);
    };
  }, [handlePaymentMessage]);

  return { isLoading, paymentUrl, initiatePayment, setPaymentUrl };
};

export default usePayment;
