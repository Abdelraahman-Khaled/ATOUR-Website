import "./GiftCardDetais.css";
import { useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import CustomModal from "Components/CustomModal/CustomModal";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";
import GiftModel from "../GiftModel/GiftModel";
import { Link } from "react-router-dom";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";
import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCoins, faLocation, faTicket, faTimes } from "@fortawesome/free-solid-svg-icons";
import MainSlider from "Components/Ui/MainSlider/MainSlider";
import BoxOneContent from "Pages/DetailsTripInfoPage/Components/AllContentInfoDetailsMiddel/ContentInfoDetailsRight/BoxOneContent";
import ShareButton from "Components/ShareButton/ShareButton";
import Favicon from "Components/FavIcon/Favicon ";


const content = {
    notFound: {
        en: "Gift details not available",
        ar: "تفاصيل الهدية غير متوافرة",
        fr: "Détails du cadeau non disponibles",
        de: "Geschenkdetails nicht verfügbar",
        es: "Detalles del regalo no disponibles",
        tr: "Hediye detayları mevcut değil",
        ru: "Детали подарка недоступны",
        zh: "礼物详情不可用",
        ko: "선물 세부 정보 없음",
        pt: "Detalhes do presente não disponíveis",
        ur: "تحفے کی تفصیلات دستیاب نہیں ہیں",
        ja: "ギフトの詳細は利用できません",
    },
    home: {
        en: "Home",
        ar: "الصفحة الرئيسية",
        fr: "Accueil",
        de: "Startseite",
        es: "Inicio",
        tr: "Ana Sayfa",
        ru: "Главная",
        zh: "主页",
        ko: "홈",
        pt: "Início",
        ur: "ہوم",
        ja: "ホーム",
    },
    modalTitle: {
        en: "Complete Payment",
        ar: "إتمام الدفع",
        fr: "Terminer le paiement",
        de: "Zahlung abschließen",
        es: "Completar el pago",
        tr: "Ödemeyi Tamamla",
        ru: "Завершить оплату",
        zh: "完成付款",
        ko: "결제 완료",
        pt: "Concluir Pagamento",
        ur: "ادائیگی مکمل کریں",
        ja: "支払いを完了する",
    },
    bookingCount: {
        en: "Purchase count",
        ar: "عدد الشراء",
        fr: "Nombre d'achats",
        de: "Anzahl der Käufe",
        es: "Número de compras",
        tr: "Satın Alma Sayısı",
        ru: "Количество покупок",
        zh: "购买次数",
        ko: "구매 횟수",
        pt: "Contagem de compras",
        ur: "خریداری کی تعداد",
        ja: "購入回数",
    },
    freeCancel: {
        en: "Free cancellation available",
        ar: "متاح إلغاء الحجز مجانا",
        fr: "Annulation gratuite disponible",
        de: "Kostenlose Stornierung verfügbar",
        es: "Cancelación gratuita disponible",
        tr: "Ücretsiz iptal mevcut",
        ru: "Бесплатная отмена доступна",
        zh: "可免费取消",
        ko: "무료 취소 가능",
        pt: "Cancelamento gratuito disponível",
        ur: "مفت منسوخی دستیاب ہے",
        ja: "無料キャンセル可",
    },
    payLater: {
        en: "Book now, pay later",
        ar: "إحجز الآن إدفع لاحقا",
        fr: "Réservez maintenant, payez plus tard",
        de: "Jetzt buchen, später bezahlen",
        es: "Reserva ahora, paga después",
        tr: "Şimdi Rezerv Et, Sonra Öde",
        ru: "Забронируйте сейчас, оплатите позже",
        zh: "现在预订，稍后付款",
        ko: "지금 예약하고 나중에 결제",
        pt: "Reserve agora, pague depois",
        ur: "ابھی بک کریں، بعد میں ادائیگی کریں",
        ja: "今すぐ予約、後で支払い",
    },
};


const GiftCardDetails = ({ gift }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [paymentUrl, setPaymentUrl] = useState(null);
    console.log(gift);

    if (!gift) {
        return <>
            <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
                {content.notFound[currentLanguage]}
                <Link
                    to="/"
                    className="fs-6 fw-medium text-danger text-decoration-underline px-2"
                >
                    {content.home[currentLanguage]}
                </Link>
            </p>
        </>;
    }
    return (
        <>
            {/* Payment Modal */}
            {paymentUrl && (
                <CustomModal
                    show={!!paymentUrl}
                    onHide={() => setPaymentUrl(null)}
                    title={content.modalTitle[currentLanguage]}
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
            <div className="details-card-page ">
                <div className="top-content-info-details d-flex justify-content-between align-items-center w-100 right-info-details">
                    <div className="right-info-details">
                        <h2 className="title ">{gift?.title}</h2>
                    </div>
                    <div className="num-price-info d-flex gap-1 justify-content-between ">
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex flex-row align-items-center justify-content-between gap-2">
                                <ShareButton
                                    url={window.location.href}
                                    title={gift.title}
                                    text={currentLanguage === "ar" ? "شارك هذه الرحلة" : "Share this trip"}
                                />
                                <div className="favicon-cover">
                                    <Favicon
                                        modelType={"gift"}
                                        modelId={gift.id}
                                        initialIsFavorite={gift.is_favourit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MainSlider images={gift.attachments} />
                <div className="all-content-info-details-right d-flex align-items-start gap-2 my-4 flex-column flex-lg-row aos-init aos-animate">

                    <div className="col-12 col-lg-8" data-aos="fade-left">
                        <BoxOneContent tripData={gift} />
                    </div>
                    <div className="content-info-details-left-trip aos-init aos-animate col-12 col-lg-4 mt-3 mt-lg-0">
                        <div className="end-info-detials">
                            {/* modal */}
                            <GiftModel gift={gift} />
                            <div className="detials-info-one d-flex align-items-center gap-2">

                                <div className="icon-check icon-check-link">
                                    {gift.free_cancelation ? (
                                        <div className="icon-times  icon-check-link">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                    ) : (
                                        <div className="icon-times bg-secondary icon-check-link ">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </div>
                                    )}
                                </div>
                                <span className="title-text">
                                    {content.freeCancel[currentLanguage]}
                                </span>
                            </div>
                            <div className="detials-info-one d-flex align-items-center gap-2">
                                {gift.pay_later ? (
                                    <div className="icon-times  icon-check-link">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                ) : (
                                    <div className="icon-times bg-secondary icon-check-link">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </div>
                                )}
                                <span className="title-text">
                                    {content.payLater[currentLanguage]}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Location */}
            <div className="location-content-info pt-4">
                <MapLocationInfo tripData={gift} />
            </div>
        </>
    );
};

export default GiftCardDetails;