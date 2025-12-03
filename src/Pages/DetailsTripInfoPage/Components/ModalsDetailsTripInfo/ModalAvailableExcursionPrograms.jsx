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

const  translate = {
selectTimeAndDateFirst: {
  en: "Please select the time and date before booking.",
  ar: "يرجى تحديد الوقت واليوم قبل الحجز.",
  fr: "Veuillez sélectionner l'heure et la date avant de réserver.",
  de: "Bitte wählen Sie vor der Buchung Uhrzeit und Datum aus.",
  es: "Por favor seleccione la hora y la fecha antes de reservar.",
  tr: "Lütfen rezervasyondan önce saat ve tarihi seçin.",
  ru: "Пожалуйста, выберите время и дату перед бронированием.",
  zh: "请在预订前选择时间和日期。",
  ko: "예약하기 전에 시간과 날짜를 선택하세요.",
  pt: "Por favor, selecione a hora e a data antes de reservar.",
  ur: "براہ کرم بکنگ سے پہلے وقت اور تاریخ کا انتخاب کریں۔",
  ja: "予約する前に時間と日付を選択してください。",
},

} 

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
      fr: "Paiement initié. Veuillez finaliser le paiement.",
      de: "Zahlung eingeleitet. Bitte schließen Sie die Zahlung ab.",
      es: "Pago iniciado. Por favor complete el pago.",
      tr: "Ödeme başlatıldı. Lütfen ödemeyi tamamlayın.",
      ru: "Платеж начат. Пожалуйста, завершите оплату.",
      zh: "支付已启动。请完成支付。",
      ko: "결제가 시작되었습니다. 결제를 완료해주세요.",
      pt: "Pagamento iniciado. Por favor, conclua o pagamento.",
      ur: "ادائیگی شروع ہو گئی ہے۔ براہ کرم ادائیگی مکمل کریں۔",
      ja: "支払いが開始されました。支払いを完了してください。",
    },
    paymentFailed: {
      ar: "فشلت عملية الدفع. يرجى المحاولة مرة أخرى.",
      en: "Payment failed. Please try again.",
      fr: "Le paiement a échoué. Veuillez réessayer.",
      de: "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      es: "El pago falló. Por favor, inténtelo de nuevo.",
      tr: "Ödeme başarısız oldu. Lütfen tekrar deneyin.",
      ru: "Платеж не прошел. Попробуйте еще раз.",
      zh: "支付失败。请重试。",
      ko: "결제 실패. 다시 시도해주세요.",
      pt: "Falha no pagamento. Tente novamente.",
      ur: "ادائیگی ناکام ہو گئی۔ براہ کرم دوبارہ کوشش کریں۔",
      ja: "支払いに失敗しました。もう一度お試しください。",
    },
    paymentCancelled: {
      ar: "تم الغاء عملية الدفع. يرجى المحاولة مرة أخرى.",
      en: "Payment cancelled. Please try again.",
      fr: "Le paiement a été annulé. Veuillez réessayer.",
      de: "Zahlung storniert. Bitte versuchen Sie es erneut.",
      es: "Pago cancelado. Por favor, inténtelo de nuevo.",
      tr: "Ödeme iptal edildi. Lütfen tekrar deneyin.",
      ru: "Платеж отменен. Попробуйте еще раз.",
      zh: "支付已取消。请重试。",
      ko: "결제가 취소되었습니다. 다시 시도해주세요.",
      pt: "Pagamento cancelado. Tente novamente.",
      ur: "ادائیگی منسوخ کر دی گئی۔ براہ کرم دوبارہ کوشش کریں۔",
      ja: "支払いがキャンセルされました。もう一度お試しください。",
    },
    paymentError: {
      ar: "حدث خطأ أثناء عملية الدفع. يرجى المحاولة لاحقًا.",
      en: "An error occurred during payment. Please try again later.",
      fr: "Une erreur s'est produite lors du paiement. Veuillez réessayer plus tard.",
      de: "Während der Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      es: "Ocurrió un error durante el pago. Por favor, inténtelo más tarde.",
      tr: "Ödeme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      ru: "Произошла ошибка при оплате. Попробуйте позже.",
      zh: "支付过程中出现错误。请稍后再试。",
      ko: "결제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.",
      pt: "Ocorreu um erro durante o pagamento. Por favor, tente novamente mais tarde.",
      ur: "ادائیگی کے دوران ایک خرابی پیش آگئی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
      ja: "支払い中にエラーが発生しました。後でもう一度お試しください。",
    },
    paymentSuccess: {
      ar: "تمت عملية الدفع بنجاح.",
      en: "Payment completed successfully.",
      fr: "Paiement effectué avec succès.",
      de: "Zahlung erfolgreich abgeschlossen.",
      es: "Pago completado con éxito.",
      tr: "Ödeme başarıyla tamamlandı.",
      ru: "Платеж успешно завершен.",
      zh: "支付成功完成。",
      ko: "결제가 성공적으로 완료되었습니다.",
      pt: "Pagamento concluído com sucesso.",
      ur: "ادائیگی کامیابی سے مکمل ہو گئی۔",
      ja: "支払いが正常に完了しました。",
    },
    availablePrograms: {
      ar: "البرامج المتاحة",
      en: "Available Programs",
      fr: "Programmes disponibles",
      de: "Verfügbare Programme",
      es: "Programas disponibles",
      tr: "Mevcut programlar",
      ru: "Доступные программы",
      zh: "可用的行程",
      ko: "이용 가능한 프로그램",
      pt: "Programas disponíveis",
      ur: "دستیاب پروگرام",
      ja: "利用可能なプログラム",
    },
    noTitle: {
      ar: "لا يوجد عنوان",
      en: "No Title",
      fr: "Aucun titre",
      de: "Kein Titel",
      es: "Sin título",
      tr: "Başlık yok",
      ru: "Без названия",
      zh: "无标题",
      ko: "제목 없음",
      pt: "Sem título",
      ur: "کوئی عنوان نہیں",
      ja: "タイトルなし",
    },
    noDescription: {
      ar: "لا توجد تفاصيل إضافية",
      en: "No Description Available",
      fr: "Aucune description disponible",
      de: "Keine Beschreibung verfügbar",
      es: "Sin descripción disponible",
      tr: "Açıklama mevcut değil",
      ru: "Описание недоступно",
      zh: "暂无描述",
      ko: "설명 없음",
      pt: "Sem descrição disponível",
      ur: "کوئی تفصیل دستیاب نہیں",
      ja: "説明がありません",
    },
    totalPrice: {
      ar: "الإجمالي",
      en: "Total",
      fr: "Total",
      de: "Gesamt",
      es: "Total",
      tr: "Toplam",
      ru: "Итого",
      zh: "总计",
      ko: "총합계",
      pt: "Total",
      ur: "کل",
      ja: "合計",
    },
    currency: {
      ar: "ريال سعودي",
      en: "SAR",
      fr: "Riyal saoudien",
      de: "Saudi-Riyal",
      es: "Riyal saudí",
      tr: "Suudi Riyali",
      ru: "Саудовский риял",
      zh: "沙特里亚尔",
      ko: "사우디 리얄",
      pt: "Rial Saudita",
      ur: "سعودی ریال",
      ja: "サウジリヤル",
    },
    reserve: {
      ar: "حجز",
      en: "Reserve",
      fr: "Réserver",
      de: "Reservieren",
      es: "Reservar",
      tr: "Rezervasyon yap",
      ru: "Забронировать",
      zh: "预订",
      ko: "예약",
      pt: "Reservar",
      ur: "بک کریں",
      ja: "予約する",
    },
    choosePaymentWay: {
      ar: "أختر طريقة الدفع",
      en: "Choose Payment Method",
      fr: "Choisissez le mode de paiement",
      de: "Zahlungsmethode wählen",
      es: "Elige el método de pago",
      tr: "Ödeme yöntemini seçin",
      ru: "Выберите способ оплаты",
      zh: "选择付款方式",
      ko: "결제 방법 선택",
      pt: "Escolha o método de pagamento",
      ur: "ادائیگی کا طریقہ منتخب کریں",
      ja: "支払い方法を選択してください",
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
      ur: "نقدی",
      ja: "現金",
    },
    online: {
      ar: "البطاقة البنكية",
      en: "Online",
      fr: "Carte bancaire",
      de: "Online",
      es: "Tarjeta bancaria",
      tr: "Kartla ödeme",
      ru: "Онлайн",
      zh: "银行卡支付",
      ko: "온라인",
      pt: "Online",
      ur: "آن لائن",
      ja: "オンライン",
    },
    selectedDate: {
      ar: "التاريخ المحدد:",
      en: "Selected Date:",
      fr: "Date sélectionnée :",
      de: "Ausgewähltes Datum:",
      es: "Fecha seleccionada:",
      tr: "Seçilen tarih:",
      ru: "Выбранная дата:",
      zh: "选择的日期：",
      ko: "선택된 날짜:",
      pt: "Data selecionada:",
      ur: "منتخب شدہ تاریخ:",
      ja: "選択された日付：",
    },
    noSelectedDay: {
      ar: "لا يوجد يوم محدد يرجى اختيار اليوم",
      en: "No selected day, please choose a day",
      fr: "Aucun jour sélectionné, veuillez en choisir un",
      de: "Kein Tag ausgewählt, bitte wählen Sie einen Tag",
      es: "No hay día seleccionado, por favor elija un día",
      tr: "Seçili gün yok, lütfen bir gün seçin",
      ru: "День не выбран, пожалуйста, выберите день",
      zh: "未选择日期，请选择日期",
      ko: "선택된 날짜가 없습니다. 날짜를 선택해주세요.",
      pt: "Nenhum dia selecionado, escolha um dia",
      ur: "کوئی دن منتخب نہیں کیا گیا، براہ کرم ایک دن منتخب کریں",
      ja: "日付が選択されていません。日付を選択してください。",
    },
    number: {
      ar: "العدد",
      en: "Number:",
      fr: "Nombre :",
      de: "Anzahl:",
      es: "Número:",
      tr: "Sayı:",
      ru: "Количество:",
      zh: "人数：",
      ko: "인원 수:",
      pt: "Número:",
      ur: "تعداد:",
      ja: "人数：",
    },
    price: {
      ar: "السعر",
      en: "Price:",
      fr: "Prix :",
      de: "Preis:",
      es: "Precio:",
      tr: "Fiyat:",
      ru: "Цена:",
      zh: "价格：",
      ko: "가격:",
      pt: "Preço:",
      ur: "قیمت:",
      ja: "価格：",
    },
    availableTimes: {
      ar: "الأوقات المتاحة",
      en: "Available Times",
      fr: "Horaires disponibles",
      de: "Verfügbare Zeiten",
      es: "Horarios disponibles",
      tr: "Mevcut saatler",
      ru: "Доступное время",
      zh: "可用时间",
      ko: "이용 가능한 시간",
      pt: "Horários disponíveis",
      ur: "دستیاب اوقات",
      ja: "利用可能な時間",
    },
  };

  const { id } = useParams();

  const handleTimeClick = (index) => {
    setSelectedTimeIndex(index);
    setSelectedTime(tripData.available_times[index].from_time);
  };

  const buttonActiveBook = async (tripId) => {
    if (!selectedTime || !selectedDate) {
      toast.error(
        translate.selectTimeAndDateFirst[currentLanguage]
      );
      return;
    }

    setIsLoading(true);

    try {
      const bookingDay = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`; // Format date string
      const response = await BookingAPI.bookTrip({
        tripId,
        peopleNumber: numberOfPeople,
        childrenNumber: initialChildren,
        paymentWay,
        time: selectedTime,
        bookingDate: bookingDay,
        language: currentLanguage,
      });
     
      if (response.success) {
        if (paymentWay === "cash") {
          toast.success(content.paymentSuccess[currentLanguage]);
          hideModalAvailable();
          navigate("/reservations");
        } else if (response.data?.data?.transaction?.url) {
          setPaymentUrl(response.data.data.transaction.url);
          toast.success(content.paymentInitiated[currentLanguage]);
        }
      } else {
        toast.error(
          response.data?.response?.message ||
            content.paymentFailed[currentLanguage]
            
          );
          hideModalAvailable();
        }
      } catch (error) {
        console.error("Error during booking:", error);
        
        toast.error(error?.response?.data?.message);
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

      // Prevent duplicate processing
      if (isProcessingPayment) return;
      setIsProcessingPayment(true);

      try {
        if (eventName === "checkout:onSuccess") {
          setPaymentUrl(null);
          hideModalAvailable();
          const response = await BookingAPI.getPaymentStatus(
            "trip-payment",
            data.chargeId
          );

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
    },
    [currentLanguage, isProcessingPayment]
  );

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
            <h2 className="title mb-2">
              {tripData.title || content.noTitle[currentLanguage]}
            </h2>
            <div className="text">
              {tripData.description || content.noDescription[currentLanguage]}
            </div>
          </div>

          {/* Select Time */}

          {/* Details */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>{content.selectedDate[currentLanguage]}</th>
                  <td className={selectedDate ? "" : "text-danger"}>
                    {selectedDate
                      ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`
                      : content.noSelectedDay[currentLanguage]}
                  </td>
                </tr>

                <tr>
                  <th>{content.number[currentLanguage]}</th>
                  <td>{numberOfPeople}</td>
                </tr>

                <tr>
                  <th>{content.price[currentLanguage]}</th>
                  {
                    tripData.is_group === 1 ?
                    <td>
                    <CurrencyDisplay price={tripData.customer_price} />
                  </td>
                  : <td>
                    <CurrencyDisplay price={tripData.customer_price * numberOfPeople} />
                  </td>

                  }
                </tr>

                <tr>
                  <th>{content.availableTimes[currentLanguage]}</th>
                  <td>
                    <div className="times-trips d-flex align-items-center gap-2 flex-wrap">
                      {tripData.available_times.map((time, index) => (
                        <div
                          key={index}
                          className={`main-btn-filter ${
                            selectedTimeIndex === index ? "active" : ""
                          }`}
                          onClick={() => handleTimeClick(index)}
                        >
                          <ClockIcon /> {time.from_time} - {time.to_time}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
              <Form.Label className=" my-2">
                {content.choosePaymentWay[currentLanguage]}
              </Form.Label>
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
          <button
            onClick={() => buttonActiveBook(tripData.id)}
            className="btn-main w-100"
            disabled={isLoading}
          >
            {isLoading ? <LoaderSvg /> : content.reserve[currentLanguage]}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default ModalAvailableExcursionPrograms;
