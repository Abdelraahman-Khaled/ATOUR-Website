import BookingAPI from "api/bookingApi";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";


const TripBookingFlow = ({ tripId, currentLanguage }) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [touristInfo, setTouristInfo] = useState({});
  const iframeRef = useRef(null);

  // Function to handle tourist information submission
  const handleTouristInfoSubmit = (values) => {
    setTouristInfo(values);
    toast.success(content.touristInfoSaved[currentLanguage]);
  };

  // Function to book the trip and initiate payment
  const handleBookAndPay = async () => {
    setIsLoading(true);
    try {
      // Step 1: Book the trip
      const bookingResponse = await BookingAPI.bookTrip({
        tripId,
        bookingDate: "2024-05-24", // Replace with dynamic date
        peopleNumber: 2, // Replace with dynamic values
        childrenNumber: 1, // Replace with dynamic values
        paymentWay: "credit_card", // Replace with dynamic values
      });

      if (bookingResponse.success) {
        setBookingData(bookingResponse.data); // Save booking data
        toast.success(content.bookingSuccess[currentLanguage]);

        // Step 2: Initiate payment
        const paymentResponse = await BookingAPI.tripPay(tripId);
        if (paymentResponse.success && paymentResponse.data?.data?.transaction?.url) {
          setPaymentUrl(paymentResponse.data.data.transaction.url);
          toast.success(content.paymentInitiated[currentLanguage]);
        } else {
          toast.error(
            paymentResponse.data?.response?.message ||
              content.paymentFailed[currentLanguage]
          );
        }
      } else {
        toast.error(
          bookingResponse.data?.response?.message ||
            content.bookingFailed[currentLanguage]
        );
      }
    } catch (error) {
      console.error("Error during booking or payment:", error);
      toast.error(content.bookingOrPaymentError[currentLanguage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for messages from the payment gateway iframe
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
              // Optionally, you can redirect the user or show a confirmation page here
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
    <div className="trip-booking-flow">
      {/* Step 1: Tourist Information Form */}
      <div className="tourist-info-section">
        <h2>Tourist Information</h2>
        <TouristInformationForm onSubmit={handleTouristInfoSubmit} />
      </div>

      {/* Step 2: Trip Details */}
      <div className="trip-details-section">
        <h2>Trip Details</h2>
        <ProductDetailsPay />
        <DetailsPay />
      </div>

      {/* Step 3: Book and Pay Button */}
      <div className="book-and-pay-section">
        <button
          onClick={handleBookAndPay}
          disabled={isLoading || !touristInfo.name} // Disable if tourist info is not filled
        >
          {isLoading ? "Processing..." : "Book and Pay"}
        </button>
      </div>

      {/* Payment Modal */}
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
    </div>
  );
};

export default TripBookingFlow;