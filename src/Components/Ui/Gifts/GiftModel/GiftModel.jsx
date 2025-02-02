import BookingAPI from "api/bookingApi";
import CustomModal from "Components/CustomModal/CustomModal";
import { useLanguage } from "Components/Languages/LanguageContext";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const GiftModal = ({ giftId }) => {
    const iframeRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const { currentLanguage } = useLanguage();

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
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const buttonActiveBook = async () => {
        setIsLoading(true);
        try {
            const response = await BookingAPI.bookGift({
                giftId,
                paymentWay: "online",
                quantity,
                deliveryWay: deliveryMethod,
                deliveryAddress: deliveryMethod === "delivery" ? address : "",
                number: deliveryMethod === "delivery" ? phoneNumber : "",
                location: deliveryMethod === "delivery" ? address : ""
            });

            if (response.success && response.data?.data?.transaction?.url) {
                setPaymentUrl(response.data.data.transaction.url);
                toast.success(content.paymentInitiated[currentLanguage]);
            } else {
                toast.error(response.data?.response?.message || content.paymentFailed[currentLanguage]);
            }
        } catch (error) {
            toast.error(content.paymentFailed[currentLanguage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        buttonActiveBook();
        handleCloseModal();
    };

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

            <button
                onClick={handleOpenModal}
                className="btn-main "
            >
                {content.bookNow[currentLanguage]}
            </button>

            <Modal show={showModal} onHide={handleCloseModal} dir={isRTL ? "rtl" : "ltr"}>
                <Modal.Header closeButton>
                    <Modal.Title>{content.orderDetails[currentLanguage]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="quantity">
                            <Form.Label>{content.quantity[currentLanguage]}</Form.Label>
                            <div className="d-flex align-items-center gap-3">
                                <Button variant="outline-secondary" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</Button>
                                <span>{quantity}</span>
                                <Button variant="outline-secondary" onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="deliveryMethod" className="mt-3 ">
                            <Form.Label >{content.deliveryMethod[currentLanguage]}</Form.Label>
                            <Form.Check className="d-flex gap-2 mt-1" type="radio" label={content.byMyself[currentLanguage]} name="deliveryMethod" value="myself" checked={deliveryMethod === "myself"} onChange={(e) => setDeliveryMethod(e.target.value)} />
                            <Form.Check className="d-flex gap-2 mt-2" type="radio" label={content.delivery[currentLanguage]} name="deliveryMethod" value="delivery" checked={deliveryMethod === "delivery"} onChange={(e) => setDeliveryMethod(e.target.value)} />
                        </Form.Group>

                        {deliveryMethod === "delivery" && (
                            <>
                                <Form.Group controlId="address" className="mt-3">
                                    <Form.Label>{content.address[currentLanguage]}</Form.Label>
                                    <Form.Control type="text" placeholder={content.address[currentLanguage]} value={address} onChange={(e) => setAddress(e.target.value)} required />
                                </Form.Group>
                                <Form.Group controlId="phoneNumber" className="mt-3">
                                    <Form.Label>{content.phoneNumber[currentLanguage]}</Form.Label>
                                    <Form.Control type="tel" placeholder={content.phoneNumber[currentLanguage]} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                </Form.Group>
                            </>
                        )}

                        <button type="submit" className="mt-3 btn-main w-100">
                            {content.submit[currentLanguage]}
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GiftModal;
