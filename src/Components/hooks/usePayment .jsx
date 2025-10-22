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
            fr: "Paiement initié. Veuillez terminer le paiement.",
            es: "Pago iniciado. Por favor complete el pago.",
            de: "Zahlung gestartet. Bitte schließen Sie die Zahlung ab.",
            it: "Pagamento avviato. Si prega di completare il pagamento.",
            pt: "Pagamento iniciado. Por favor, conclua o pagamento.",
            ru: "Платеж начат. Пожалуйста, завершите оплату.",
            zh: "付款已启动。请完成付款。",
            ja: "支払いが開始されました。支払いを完了してください。",
            ko: "결제가 시작되었습니다. 결제를 완료해주세요.",
            tr: "Ödeme başlatıldı. Lütfen ödemeyi tamamlayın.",
            hi: "भुगतान शुरू हो गया है। कृपया भुगतान पूरा करें।",
            bn: "পেমেন্ট শুরু হয়েছে। অনুগ্রহ করে পেমেন্ট সম্পূর্ণ করুন।",
            ur: "ادائیگی شروع ہوگئی ہے۔ براہ کرم ادائیگی مکمل کریں۔",
            fa: "پرداخت آغاز شد. لطفاً پرداخت را تکمیل کنید.",
            nl: "Betaling gestart. Voltooi alstublieft de betaling.",
            sv: "Betalning startad. Slutför betalningen.",
            el: "Η πληρωμή ξεκίνησε. Παρακαλώ ολοκληρώστε την πληρωμή.",
        },
        paymentSuccess: {
            ar: "تمت عملية الدفع بنجاح.",
            en: "Payment completed successfully.",
            fr: "Paiement effectué avec succès.",
            es: "Pago completado con éxito.",
            de: "Zahlung erfolgreich abgeschlossen.",
            it: "Pagamento completato con successo.",
            pt: "Pagamento concluído com sucesso.",
            ru: "Платеж успешно завершён.",
            zh: "付款成功完成。",
            ja: "支払いが正常に完了しました。",
            ko: "결제가 성공적으로 완료되었습니다.",
            tr: "Ödeme başarıyla tamamlandı.",
            hi: "भुगतान सफलतापूर्वक पूरा हुआ।",
            bn: "পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।",
            ur: "ادائیگی کامیابی سے مکمل ہو گئی۔",
            fa: "پرداخت با موفقیت انجام شد.",
            nl: "Betaling succesvol voltooid.",
            sv: "Betalningen har slutförts framgångsrikt.",
            el: "Η πληρωμή ολοκληρώθηκε με επιτυχία.",
        },
        paymentFailed: {
            ar: "فشلت عملية الدفع. يرجى المحاولة مرة أخرى.",
            en: "Payment failed. Please try again.",
            fr: "Le paiement a échoué. Veuillez réessayer.",
            es: "El pago falló. Por favor, inténtelo de nuevo.",
            de: "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.",
            it: "Pagamento non riuscito. Si prega di riprovare.",
            pt: "O pagamento falhou. Por favor, tente novamente.",
            ru: "Платеж не удался. Пожалуйста, попробуйте снова.",
            zh: "付款失败。请再试一次。",
            ja: "支払いに失敗しました。もう一度お試しください。",
            ko: "결제가 실패했습니다. 다시 시도해주세요.",
            tr: "Ödeme başarısız oldu. Lütfen tekrar deneyin.",
            hi: "भुगतान असफल रहा। कृपया पुनः प्रयास करें।",
            bn: "পেমেন্ট ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
            ur: "ادائیگی ناکام ہوگئی۔ براہ کرم دوبارہ کوشش کریں۔",
            fa: "پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.",
            nl: "Betaling mislukt. Probeer het opnieuw.",
            sv: "Betalningen misslyckades. Försök igen.",
            el: "Η πληρωμή απέτυχε. Παρακαλώ προσπαθήστε ξανά.",
        },
        errorOccurred: {
            ar: "حدث خطأ أثناء الحجز. يرجى المحاولة لاحقًا.",
            en: "An error occurred during the booking process. Please try again later.",
            fr: "Une erreur s'est produite lors du processus de réservation. Veuillez réessayer plus tard.",
            es: "Ocurrió un error durante el proceso de reserva. Por favor, inténtelo más tarde.",
            de: "Während des Buchungsvorgangs ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
            it: "Si è verificato un errore durante la prenotazione. Si prega di riprovare più tardi.",
            pt: "Ocorreu um erro durante o processo de reserva. Por favor, tente novamente mais tarde.",
            ru: "Произошла ошибка во время бронирования. Пожалуйста, попробуйте позже.",
            zh: "预订过程中发生错误。请稍后再试。",
            ja: "予約中にエラーが発生しました。後でもう一度お試しください。",
            ko: "예약 중 오류가 발생했습니다. 나중에 다시 시도해주세요.",
            tr: "Rezervasyon sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
            hi: "बुकिंग के दौरान कोई त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
            bn: "বুকিং প্রক্রিয়ার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে চেষ্টা করুন।",
            ur: "بکنگ کے دوران ایک خرابی پیش آگئی۔ براہ کرم بعد میں کوشش کریں۔",
            fa: "در حین رزرو خطایی رخ داد. لطفاً بعداً دوباره امتحان کنید.",
            nl: "Er is een fout opgetreden tijdens het boekingsproces. Probeer het later opnieuw.",
            sv: "Ett fel uppstod under bokningsprocessen. Försök igen senare.",
            el: "Παρουσιάστηκε σφάλμα κατά τη διαδικασία κράτησης. Παρακαλώ δοκιμάστε αργότερα.",
        },
        bookingOperation: {
            ar: "تمت عملية الحجز بنجاح.",
            en: "Booking completed successfully.",
            fr: "Réservation effectuée avec succès.",
            es: "Reserva completada con éxito.",
            de: "Buchung erfolgreich abgeschlossen.",
            it: "Prenotazione completata con successo.",
            pt: "Reserva concluída com sucesso.",
            ru: "Бронирование успешно завершено.",
            zh: "预订成功完成。",
            ja: "予約が正常に完了しました。",
            ko: "예약이 성공적으로 완료되었습니다.",
            tr: "Rezervasyon başarıyla tamamlandı.",
            hi: "बुकिंग सफलतापूर्वक पूरी हुई।",
            bn: "বুকিং সফলভাবে সম্পন্ন হয়েছে।",
            ur: "بکنگ کامیابی سے مکمل ہوگئی۔",
            fa: "رزرو با موفقیت انجام شد.",
            nl: "Boeking succesvol voltooid.",
            sv: "Bokningen har slutförts framgångsrikt.",
            el: "Η κράτηση ολοκληρώθηκε με επιτυχία.",
        },
        paymentCancelled: {
            ar: "تم إلغاء عملية الدفع.",
            en: "Payment was cancelled.",
            fr: "Le paiement a été annulé.",
            es: "El pago fue cancelado.",
            de: "Zahlung wurde storniert.",
            it: "Il pagamento è stato annullato.",
            pt: "O pagamento foi cancelado.",
            ru: "Платеж был отменён.",
            zh: "付款已取消。",
            ja: "支払いがキャンセルされました。",
            ko: "결제가 취소되었습니다.",
            tr: "Ödeme iptal edildi.",
            hi: "भुगतान रद्द कर दिया गया।",
            bn: "পেমেন্ট বাতিল করা হয়েছে।",
            ur: "ادائیگی منسوخ کر دی گئی۔",
            fa: "پرداخت لغو شد.",
            nl: "Betaling is geannuleerd.",
            sv: "Betalningen avbröts.",
            el: "Η πληρωμή ακυρώθηκε.",
        },
        paymentError: {
            ar: "حدث خطأ أثناء عملية الدفع. يرجى المحاولة لاحقًا.",
            en: "An error occurred during the payment process. Please try again later.",
            fr: "Une erreur s'est produite lors du processus de paiement. Veuillez réessayer plus tard.",
            es: "Ocurrió un error durante el proceso de pago. Por favor, inténtelo más tarde.",
            de: "Während des Zahlungsvorgangs ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
            it: "Si è verificato un errore durante il pagamento. Si prega di riprovare più tardi.",
            pt: "Ocorreu um erro durante o processo de pagamento. Por favor, tente novamente mais tarde.",
            ru: "Во время оплаты произошла ошибка. Пожалуйста, попробуйте позже.",
            zh: "支付过程中发生错误。请稍后再试。",
            ja: "支払い中にエラーが発生しました。後でもう一度お試しください。",
            ko: "결제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.",
            tr: "Ödeme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
            hi: "भुगतान के दौरान कोई त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
            bn: "পেমেন্ট প্রক্রিয়ার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে চেষ্টা করুন।",
            ur: "ادائیگی کے دوران ایک خرابی پیش آگئی۔ براہ کرم بعد میں کوشش کریں۔",
            fa: "در حین پرداخت خطایی رخ داد. لطفاً بعداً دوباره امتحان کنید.",
            nl: "Er is een fout opgetreden tijdens het betalingsproces. Probeer het later opnieuw.",
            sv: "Ett fel uppstod under betalningsprocessen. Försök igen senare.",
            el: "Παρουσιάστηκε σφάλμα κατά τη διαδικασία πληρωμής. Παρακαλώ δοκιμάστε αργότερα.",
        }
    };

    const handleBooking = async (eventId) => {
        setProcessingBooking(true);
        try {
            const response = await BookingAPI.effectivenePay(eventId);
            if (response.success && response.data?.data?.transaction?.url) {
                setPaymentUrl(response.data.data.transaction.url);
                toast.success(content.paymentInitiated[currentLanguage]);

                timeoutRef.current = setTimeout(() => {
                    setPaymentUrl(null);
                    toast.error(content.paymentFailed[currentLanguage]);
                    console.warn("Payment process timed out.");
                }, 5 * 60 * 1000);
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
                            clearTimeout(timeoutRef.current);
                        } else if (parsedData?.result === "FAILED") {
                            toast.error(content.paymentFailed[currentLanguage]);
                            setPaymentUrl(null);
                            clearTimeout(timeoutRef.current);
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
            clearTimeout(timeoutRef.current);
        };
    }, [currentLanguage]);

    const cancelPayment = () => {
        setPaymentUrl(null);
        clearTimeout(timeoutRef.current);
        toast.info(content.paymentFailed[currentLanguage]);
    };

    return { paymentUrl, processingBooking, handleBooking, cancelPayment };
};

export default usePayment;
