import CustomModal from 'Components/CustomModal/CustomModal';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { useState } from 'react';
import { Form } from "react-bootstrap";
import usePayment from 'hooks/usePayment';

const content = {
    orderDetails: {
        ar: "تفاصيل الطلب",
        en: "Order Details",
        fr: "Détails de la commande",
        de: "Bestelldetails",
        es: "Detalles del pedido",
        tr: "Sipariş Detayları",
        ru: "Детали заказа",
        zh: "订单详情",
        ko: "주문 세부 정보",
        pt: "Detalhes do pedido",
        ur: "آرڈر کی تفصیلات",
        ja: "注文の詳細",
    },
    paymentMethod: {
        ar: "طريقة الدفع",
        en: "Payment Method",
        fr: "Méthode de paiement",
        de: "Zahlungsmethode",
        es: "Método de pago",
        tr: "Ödeme Yöntemi",
        ru: "Способ оплаты",
        zh: "支付方式",
        ko: "결제 방법",
        pt: "Método de pagamento",
        ur: "ادائیگی کا طریقہ",
        ja: "支払い方法",
    },
    paymentInitiated: {
        ar: "تم بدء عملية الدفع",
        en: "Payment initiated",
        fr: "Paiement initié",
        de: "Zahlung eingeleitet",
        es: "Pago iniciado",
        tr: "Ödeme başlatıldı",
        ru: "Оплата инициирована",
        zh: "付款已启动",
        ko: "결제가 시작되었습니다",
        pt: "Pagamento iniciado",
        ur: "ادائیگی شروع ہوگئی ہے",
        ja: "支払いが開始されました",
    },
    paymentSuccess: {
        ar: "تمت عملية الدفع بنجاح",
        en: "Payment completed successfully",
        fr: "Paiement effectué avec succès",
        de: "Zahlung erfolgreich abgeschlossen",
        es: "Pago completado con éxito",
        tr: "Ödeme başarıyla tamamlandı",
        ru: "Оплата успешно завершена",
        zh: "付款成功完成",
        ko: "결제가 성공적으로 완료되었습니다",
        pt: "Pagamento concluído com sucesso",
        ur: "ادائیگی کامیابی کے ساتھ مکمل ہوگئی ہے",
        ja: "支払いが正常に完了しました",
    },
    paymentCancelled: {
        ar: "تم الغاء عملية الدفع",
        en: "Payment cancelled",
        fr: "Paiement annulé",
        de: "Zahlung storniert",
        es: "Pago cancelado",
        tr: "Ödeme iptal edildi",
        ru: "Оплата отменена",
        zh: "付款已取消",
        ko: "결제가 취소되었습니다",
        pt: "Pagamento cancelado",
        ur: "ادائیگی منسوخ کر دی گئی ہے",
        ja: "支払いがキャンセルされました",
    },
    bookingOperation: {
        ar: "تم الحجز بنجاح",
        en: "Booking successfully",
        fr: "Réservation réussie",
        de: "Buchung erfolgreich",
        es: "Reserva realizada con éxito",
        tr: "Rezervasyon başarıyla yapıldı",
        ru: "Бронирование успешно",
        zh: "预订成功",
        ko: "예약이 성공적으로 완료되었습니다",
        pt: "Reserva concluída com sucesso",
        ur: "بکنگ کامیابی کے ساتھ مکمل ہوگئی ہے",
        ja: "予約が正常に完了しました",
    },
    paymentFailed: {
        ar: "فشلت عملية الدفع",
        en: "Payment failed",
        fr: "Échec du paiement",
        de: "Zahlung fehlgeschlagen",
        es: "Pago fallido",
        tr: "Ödeme başarısız oldu",
        ru: "Ошибка оплаты",
        zh: "付款失败",
        ko: "결제 실패",
        pt: "Falha no pagamento",
        ur: "ادائیگی ناکام ہوگئی ہے",
        ja: "支払いに失敗しました",
    },
    book: {
        ar: "احجز الآن",
        en: "Book Now",
        fr: "Réserver maintenant",
        de: "Jetzt buchen",
        es: "Reservar ahora",
        tr: "Şimdi Rezerv Et",
        ru: "Забронировать сейчас",
        zh: "立即预订",
        ko: "지금 예약",
        pt: "Reservar agora",
        ur: "ابھی بک کریں",
        ja: "今すぐ予約",
    },
    booking: {
        ar: "جاري التحميل...",
        en: "Loading...",
        fr: "Chargement...",
        de: "Wird geladen...",
        es: "Cargando...",
        tr: "Yükleniyor...",
        ru: "Загрузка...",
        zh: "加载中...",
        ko: "로딩 중...",
        pt: "Carregando...",
        ur: "لوڈ ہو رہا ہے...",
        ja: "読み込み中...",
    },
    completePayment: {
        ar: "إتمام الدفع",
        en: "Complete Payment",
        fr: "Finaliser le paiement",
        de: "Zahlung abschließen",
        es: "Completar el pago",
        tr: "Ödemeyi Tamamla",
        ru: "Завершить оплату",
        zh: "完成付款",
        ko: "결제 완료",
        pt: "Concluir pagamento",
        ur: "ادائیگی مکمل کریں",
        ja: "支払いを完了する",
    },
    cash: {
        ar: "نقدي",
        en: "Cash",
        fr: "Espèces",
        de: "Barzahlung",
        es: "Efectivo",
        tr: "Nakit",
        ru: "Наличные",
        zh: "现金",
        ko: "현금",
        pt: "Dinheiro",
        ur: "نقد",
        ja: "現金",
    },
    online: {
        ar: "البطاقة البنكية",
        en: "Online",
        fr: "En ligne",
        de: "Online",
        es: "En línea",
        tr: "Online",
        ru: "Онлайн",
        zh: "在线",
        ko: "온라인",
        pt: "Online",
        ur: "آن لائن",
        ja: "オンライン",
    },
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
                    className="btn-main w-100"
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