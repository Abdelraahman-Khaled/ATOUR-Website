import BookingAPI from "api/bookingApi";
import CustomModal from "Components/CustomModal/CustomModal";
import { useLanguage } from "Components/Languages/LanguageContext";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GiftModal = ({ gift }) => {
    const iframeRef = useRef(null);
    const paymentProcessed = useRef(false);
    const [showModal, setShowModal] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [paymentWay, setPaymentWay] = useState("online");
    const { currentLanguage } = useLanguage();
    const navigate = useNavigate();
    const isRTL = currentLanguage === "ar";

    const content = {
        bookNow: { ar: "احجز الآن", en: "Book Now" },
        orderDetails: { ar: "تفاصيل الطلب", en: "Order Details" },
        quantity: { ar: "الكمية", en: "Quantity" },
        deliveryMethod: { ar: "طريقة التوصيل", en: "Delivery Method" },
        byMyself: { ar: "سأستلمها بنفسي", en: "By Myself" },
        delivery: { ar: "التوصيل", en: "Delivery" },
        address: { ar: "العنوان", en: "Address" },
        phoneNumber: { ar: "رقم الهاتف", en: "Phone Number" },
        submit: { ar: "بدأ الدفع", en: "Starting Payment" },
        paymentInitiated: { ar: "تم بدء عملية الدفع.", en: "Payment initiated." },
        paymentFailed: { ar: "فشلت عملية الدفع.", en: "Payment failed." },
        paymentSuccess: { ar: "تمت عملية الدفع بنجاح.", en: "Payment successful." },
        paymentCancelled: {
            ar: "تم الغاء عملية الدفع. يرجى المحاولة مرة أخرى.",
            en: "Payment cancelled. Please try again.",
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

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const processPaymentResponse = useCallback(async (chargeId) => {
        if (paymentProcessed.current) return;
        paymentProcessed.current = true;

        try {
            const response = await BookingAPI.getPaymentStatus("gift-payment", chargeId);

            if (response.data?.status === "CAPTURED") {
                toast.success(content.paymentSuccess[currentLanguage]);
                navigate("/reservations");
            } else if (response.data?.status === "DECLINED") {
                toast.error(content.paymentFailed[currentLanguage]);
            } else if (response.data?.status === "CANCELLED") {
                toast.error(content.paymentCancelled[currentLanguage]);
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(content.paymentFailed[currentLanguage]);
        } finally {
            setPaymentUrl(null);
            handleCloseModal();
        }
    }, [currentLanguage]);

    const handlePaymentMessage = useCallback((event) => {
        const allowedOrigins = [
            "https://checkout.tap.company",
            "https://authentication.staging.tap.company",
            "http://localhost:3000",
        ];

        if (!allowedOrigins.includes(event.origin)) {
            console.warn("Blocked unknown origin:", event.origin);
            return;
        }

        const { event: eventName, data } = event.data;

        if (eventName === "checkout:onSuccess") {
            processPaymentResponse(data.chargeId);
        } else if (eventName === "checkout:onFailure" || eventName === "checkout:onClose" || eventName === "checkout:onError") {
            setPaymentUrl(null);
            toast.warn(content.paymentCancelled[currentLanguage]);
            handleCloseModal();
        }
    }, [processPaymentResponse]);

    const buttonActiveBook = async () => {
        if (deliveryMethod === "delivery" && (!address || !phoneNumber)) {
            toast.error(currentLanguage === "ar"
                ? "الرجاء إدخال العنوان ورقم الهاتف"
                : "Please enter address and phone number");
            return;
        }

        setIsLoading(true);
        try {
            const response = await BookingAPI.bookGift({
                giftId: gift.id,
                paymentWay,
                quantity,
                deliveryWay: deliveryMethod,
                deliveryAddress: deliveryMethod === "delivery" ? address : "",
                number: deliveryMethod === "delivery" ? phoneNumber : "",
                location: deliveryMethod === "delivery" ? address : "",
            });

            if (response.success) {
                if (paymentWay === "cash") {
                    toast.success(content.paymentSuccess[currentLanguage]);
                    navigate("/reservations");
                } else if (response.data?.data?.transaction?.url) {
                    paymentProcessed.current = false;
                    setPaymentUrl(response.data.data.transaction.url);
                    toast.success(content.paymentInitiated[currentLanguage]);
                }
            } else {
                toast.error(response.data?.response?.message || content.paymentFailed[currentLanguage]);
            }
        } catch (error) {
            console.error("Booking failed:", error);
            toast.error(error.response?.data?.message || content.paymentFailed[currentLanguage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        buttonActiveBook();
    };

    useEffect(() => {
        window.addEventListener("message", handlePaymentMessage);
        return () => {
            window.removeEventListener("message", handlePaymentMessage);
        };
    }, [handlePaymentMessage]);

    return (
        <div className={`text-${isRTL ? "right" : "left"}`}>
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

            <button onClick={handleOpenModal} className="btn-main">
                {content.bookNow[currentLanguage]}
            </button>

            <CustomModal
                show={showModal}
                onHide={handleCloseModal}
                title={content.orderDetails[currentLanguage]}
                newClass="modal-available modal-width-content"
            >
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="quantity">
                            <Form.Label>{content.quantity[currentLanguage]}</Form.Label>
                            <div className="d-flex align-items-center gap-3">
                                <Button
                                    className="btn-close-icon"
                                    variant="outline-secondary"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                >
                                    -
                                </Button>
                                <span>{quantity}</span>
                                <Button
                                    className="btn-close-icon"
                                    variant="outline-secondary"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="deliveryMethod" className="mt-3">
                            <Form.Label className="text-black">{content.deliveryMethod[currentLanguage]}</Form.Label>
                            <Form.Check
                                className="d-flex gap-2 mt-1"
                                type="radio"
                                label={content.byMyself[currentLanguage]}
                                name="deliveryMethod"
                                value="myself"
                                checked={deliveryMethod === "myself"}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                            />
                            <Form.Check
                                className="d-flex gap-2 mt-2"
                                type="radio"
                                label={content.delivery[currentLanguage]}
                                name="deliveryMethod"
                                value="delivery"
                                checked={deliveryMethod === "delivery"}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                            />
                        </Form.Group>

                        {deliveryMethod === "delivery" && (
                            <>
                                <Form.Group controlId="address" className="mt-3">
                                    <Form.Label>{content.address[currentLanguage]}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={content.address[currentLanguage]}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="phoneNumber" className="mt-3">
                                    <Form.Label>{content.phoneNumber[currentLanguage]}</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder={content.phoneNumber[currentLanguage]}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}

                        {gift.pay_later == true && (
                            <Form.Group controlId="paymentWay" className="gap-3 mx-1 my-3">
                                <Form.Label className="text-black">{content.choosePaymentWay[currentLanguage]}</Form.Label>
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

                        <button
                            type="submit"
                            className="mt-3 btn-main w-100"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? (currentLanguage === "ar" ? "جاري المعالجة..." : "Processing...")
                                : content.submit[currentLanguage]}
                        </button>
                    </Form>
                </Modal.Body>
            </CustomModal>
        </div>
    );
};

export default GiftModal;