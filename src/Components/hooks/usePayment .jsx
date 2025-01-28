import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import BookingAPI from "api/bookingApi";

const usePayment = (currentLanguage) => {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [processingBooking, setProcessingBooking] = useState(false);
    const timeoutRef = useRef(null);

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
        errorOccurred: {
            ar: "حدث خطأ أثناء الحجز. يرجى المحاولة لاحقًا.",
            en: "An error occurred during the booking process. Please try again later.",
        },
    };

    const handleBooking = async (eventId) => {
        setProcessingBooking(true);
        try {
            const response = await BookingAPI.effectivenePay(eventId);
            if (response.success && response.data?.data?.transaction?.url) {
                setPaymentUrl(response.data.data.transaction.url);
                toast.success(content.paymentInitiated[currentLanguage]);

                // Start timeout to reset the payment process if not completed
                timeoutRef.current = setTimeout(() => {
                    setPaymentUrl(null);
                    toast.error(content.paymentFailed[currentLanguage]);
                    console.warn("Payment process timed out.");
                }, 5 * 60 * 1000); // 5 minutes timeout
            } else {
                toast.error(content.paymentFailed[currentLanguage]);
            }
        } catch (error) {
            console.error("Error during booking:", error);
            toast.error(content.errorOccurred[currentLanguage]);
        } finally {
            setProcessingBooking(false);
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

                if (typeof data === "string") {
                    try {
                        const parsedData = JSON.parse(data);

                        if (parsedData?.result === "SUCCESS") {
                            toast.success(content.paymentSuccess[currentLanguage]);
                            setPaymentUrl(null);
                            clearTimeout(timeoutRef.current); // Clear timeout on success
                        } else if (parsedData?.result === "FAILED") {
                            toast.error(content.paymentFailed[currentLanguage]);
                            setPaymentUrl(null);
                            clearTimeout(timeoutRef.current); // Clear timeout on failure
                        }
                    } catch (error) {
                        console.error("Failed to parse iframe message:", error);
                    }
                }
            } catch (error) {
                console.error("Error handling payment message:", error);
            }
        };

        window.addEventListener("message", handlePaymentMessage);

        return () => {
            window.removeEventListener("message", handlePaymentMessage);
            clearTimeout(timeoutRef.current); // Clear timeout on component unmount
        };
    }, [currentLanguage]);

    const cancelPayment = () => {
        setPaymentUrl(null);
        clearTimeout(timeoutRef.current);
        toast.info(content.paymentFailed[currentLanguage]); // Notify user about cancellation
    };

    return { paymentUrl, processingBooking, handleBooking, cancelPayment };
};

export default usePayment;
