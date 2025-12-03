import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "Components/Languages/LanguageContext";
import CardEvent from "../Events/Components/CardEvent/CardEvent";
import { formatDate } from "../Events/Components/AllCardsEvents/dateUtils";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";


const EffectivenessCard = ({ effectivenessData = [] }) => {

    const { currentLanguage } = useLanguage(); // Get the current language
    const text = {
        ar: {
            noData: "لا يوجد فعاليات متاحة.",
            home: "الصفحة الرئيسية",
        },
        en: {
            noData: "No events available.",
            home: "Home",
        },
        fr: {
            noData: "Aucun événement disponible.",
            home: "Accueil",
        },
        es: {
            noData: "No hay eventos disponibles.",
            home: "Inicio",
        },
        de: {
            noData: "Keine Veranstaltungen verfügbar.",
            home: "Startseite",
        },
        it: {
            noData: "Nessun evento disponibile.",
            home: "Home",
        },
        ru: {
            noData: "Нет доступных мероприятий.",
            home: "Главная",
        },
        zh: {
            noData: "暂无可用活动。",
            home: "主页",
        },
        ja: {
            noData: "利用可能なイベントはありません。",
            home: "ホーム",
        },
        ko: {
            noData: "이용 가능한 이벤트가 없습니다.",
            home: "홈",
        },
        hi: {
            noData: "कोई उपलब्ध कार्यक्रम नहीं है।",
            home: "मुखपृष्ठ",
        },
        pt: {
            noData: "Nenhum evento disponível.",
            home: "Início",
        },
    };

    // BUTTON BOOKING EVENTS FUNCTION
    const handleBookingButtonClick = (cardId) => {
    };
    return (
        <div className="cards-trips-content">

            <div className="header-top-trip-cards d-flex  justify-content-between  align-items-center  flex-wrap  gap-2 mb-3">
                {
                    effectivenessData.length > 0 &&
                    <h2 className="title">{currentLanguage === "ar" ? "النتائج" : "Results"} {effectivenessData.length}</h2>
                }
            </div>
            <div className="main-cards-offers">
                {/* ============= START ROW =========== */}
                <div className="row g-3">
                    {effectivenessData.length > 0 ? (
                        effectivenessData.map((item) => {
                            const { dayNumber, dayName, monthName } = formatDate(item.from_date, currentLanguage);
                            return (
                                <div
                                    key={item.id}
                                    className={`col-12 col-sm-6 col-lg-12`}
                                >
                                    <CardEvent
                                        id={item.id}
                                        routeCardLink={item.id}
                                        titleMonth={monthName}
                                        numMonth={dayNumber}
                                        titleDay={dayName}
                                        image={item.image}
                                        nameCountry={item.city !== undefined ? item.city.title : currentLanguage === "ar" ? "السعودية" : "Saudi Arabia"}
                                        titleCard={item.title}
                                        numPrice={<CurrencyDisplay price={item.customer_price} />}
                                        textContent={""}
                                        functionBookingButton={handleBookingButtonClick}
                                        isFavoritePage={item.is_favourit}
                                        type={"effectivene"}
                                        is_group={item.is_group}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found">
                            {text[currentLanguage].noData}{" "}
                            <Link
                                to="/"
                                className="fs-6 fw-medium text-danger text-decoration-underline"
                            >
                                {text[currentLanguage].home}
                            </Link>
                        </p>
                    )}
                </div >
            </div>
        </div>
    );
};

export default EffectivenessCard;
