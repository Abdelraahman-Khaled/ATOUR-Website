import CustomModal from 'Components/CustomModal/CustomModal';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { useState } from 'react';
import { Form } from "react-bootstrap";
import usePayment from 'hooks/usePayment';

const content = {
    orderDetails: { ar: "تفاصيل الطلب", en: "Order Details" },
    paymentMethod: { ar: "طريقة الدفع", en: "Payment Method" },
    paymentInitiated: { ar: "تم بدء عملية الدفع", en: "Payment initiated" },
    paymentSuccess: { ar: "تمت عملية الدفع بنجاح", en: "Payment completed successfully" },
    paymentCancelled: { ar: "تم الغاء عملية الدفع", en: "Payment cancelled" },
    bookingOperation: { ar: "تم الحجز بنجاح", en: "Booking Successfully" },
    paymentFailed: { ar: "فشلت عملية الدفع", en: "Payment failed" },
    book: { ar: "احجز الآن", en: "Book Now" },
    booking: { ar: "جاري التحميل...", en: "Loading..." },
    completePayment: { ar: "إتمام الدفع", en: "Complete Payment" },
    cash: { ar: "نقدي", en: "Cash" },
    online: { ar: "البطاقة البنكية", en: "Online" },
};

const EffectiveModal = ({ effectiveId, isDirectBooking = false }) => {
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const { currentLanguage } = useLanguage();
    const { isLoading, paymentUrl, initiatePayment, setPaymentUrl } = usePayment(content, currentLanguage);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paymentWay = paymentMethod === "cash" ? "cash" : "online";
        await initiatePayment(effectiveId, paymentWay);
        handleCloseModal();
    };

    const handleDirectBooking = async () => {
        await initiatePayment(effectiveId, "online");
    };

    return (
        <>
            {/* Payment IFrame Modal */}
            {paymentUrl && (
                <CustomModal
                    show={!!paymentUrl}
                    onHide={() => setPaymentUrl(null)}
                    title={content.completePayment[currentLanguage]}
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

            {/* Book Now Button */}
            {isDirectBooking ? (
                <button
                    onClick={handleDirectBooking}
                    className="btn-main"
                    disabled={isLoading}
                >
                    {isLoading ? content.booking[currentLanguage] : content.book[currentLanguage]}
                </button>
            ) : (
                <button onClick={handleOpenModal} className="btn-main">
                    {content.book[currentLanguage]}
                </button>
            )}

            {/* Payment Method Selection Modal */}
            <CustomModal
                show={showModal}
                onHide={handleCloseModal}
                title={content.orderDetails[currentLanguage]}
                newClass="modal-available modal-width-content"
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="paymentMethod" className="mt-3">
                        <Form.Label className="text-black">{content.paymentMethod[currentLanguage]}</Form.Label>
                        <Form.Check
                            className="d-flex gap-2 mt-1"
                            type="radio"
                            label={content.cash[currentLanguage]}
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            className="d-flex gap-2 mt-2"
                            type="radio"
                            label={content.online[currentLanguage]}
                            name="paymentMethod"
                            value="online"
                            checked={paymentMethod === "online"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Form.Group>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-main w-100 my-3"
                    >
                        {isLoading ? content.booking[currentLanguage] : content.book[currentLanguage]}
                    </button>
                </Form>
            </CustomModal>
        </>
    );
};

export default EffectiveModal;