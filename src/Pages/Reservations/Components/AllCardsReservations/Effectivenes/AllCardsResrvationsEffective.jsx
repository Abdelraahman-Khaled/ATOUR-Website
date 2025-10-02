import "../AllCardsReservation.css";
import { Link } from "react-router-dom";
import ModalDetailsTrip from "../../ModalsReservation/ModalDetailsTrip";
import { useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import backUP from "../../../../../assets/images/slider/01.png";
import PaginationPage from "Components/Pagination/Pagination";
import EffectiveneCardReservation from "./EffectiveneCardReservation";

const AllCardsResrvationsEffective = ({ reservation, refresh }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    // Pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(reservation.length / perPage);
    const offset = currentPage * perPage;
    const currentPageData = reservation.reverse().slice(offset, offset + perPage);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    // SHOW MODAL DETAILS TRIP
    const [showDetailsTrip, setDetailsTrip] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null); // Store selected reservation

    const buttonShowDetails = (reservationItem) => {
        setSelectedReservation(reservationItem); // Set selected reservation
        setDetailsTrip(true); // Open modal
    };

    const hideDetailsModal = () => {
        setDetailsTrip(false);
        setSelectedReservation(null); // Clear selected reservation when closing
    };

    // Text based on language
    const text = {
        ar: {
            noData: "لا يوجد بيانات متاحة.",
            home: "الصفحة الرئيسية",
            children: "أطفال",
            adults: "بالغين",
            from: "من",
            to: "إلي"
        },
        en: {
            noData: "No data available.",
            home: "Home",
            children: "Children",
            adults: "Adults",
            from: "From",
            to: "To"
        },
        fr: {
            noData: "Aucune donnée disponible.",
            home: "Accueil",
            children: "Enfants",
            adults: "Adultes",
            from: "De",
            to: "À"
        },
        es: {
            noData: "No hay datos disponibles.",
            home: "Inicio",
            children: "Niños",
            adults: "Adultos",
            from: "Desde",
            to: "Hasta"
        },
        de: {
            noData: "Keine Daten verfügbar.",
            home: "Startseite",
            children: "Kinder",
            adults: "Erwachsene",
            from: "Von",
            to: "Bis"
        },
        tr: {
            noData: "Mevcut veri yok.",
            home: "Ana Sayfa",
            children: "Çocuklar",
            adults: "Yetişkinler",
            from: "Den",
            to: "Kadar"
        },
        ru: {
            noData: "Данные недоступны.",
            home: "Главная",
            children: "Дети",
            adults: "Взрослые",
            from: "От",
            to: "До"
        },
        zh: {
            noData: "没有可用数据。",
            home: "首页",
            children: "儿童",
            adults: "成人",
            from: "从",
            to: "到"
        },
        ko: {
            noData: "사용 가능한 데이터가 없습니다.",
            home: "홈",
            children: "아이들",
            adults: "성인",
            from: "부터",
            to: "까지"
        },
        pt: {
            noData: "Nenhum dado disponível.",
            home: "Início",
            children: "Crianças",
            adults: "Adultos",
            from: "De",
            to: "Para"
        },
        ur: {
            noData: "کوئی دستیاب ڈیٹا نہیں۔",
            home: "ہوم",
            children: "بچے",
            adults: "بالغ",
            from: "سے",
            to: "تک"
        },
        ja: {
            noData: "利用可能なデータがありません。",
            home: "ホーム",
            children: "子供",
            adults: "大人",
            from: "から",
            to: "まで"
        }
    };
    return (
        <>
            <ModalDetailsTrip
                showDetailsModal={showDetailsTrip}
                hideDetailsModal={hideDetailsModal}
                reservation={selectedReservation} // Pass the selected reservation
                currentLanguage={currentLanguage} // Pass the current language
                refresh={refresh}
            />
            <div className="all-cards-reservations">
                {/* =============== START ROW ============== */}
                <div className="row g-3">
                    {reservation !== undefined && reservation.length > 0 ? (
                        [...currentPageData].map((item) => {
                            return (
                                <div key={item.id} className="col-12 col-md-6 col-lg-12">
                                    <EffectiveneCardReservation
                                        image={item.photo || item.effectivene?.photo || backUP}
                                        typeReservation={item.payment_status}
                                        countryName={item.effectivene.city.title}
                                        titleCard={(item.trip || item.effectivene || item.gift)?.title || "Ended"}
                                        priceNum={`${item.total}`}
                                        textUserInfo={`${item.people_number || 1} ${text[currentLanguage].adults} `}
                                        dateTime={item.effectivene.from_date}
                                        timeAdd={`${text[currentLanguage].from}  ${item.effectivene.from_time} ${text[currentLanguage].to} ${item.effectivene.to_time}`}
                                        isTrueButtonDetails={true}
                                        buttonDetailsFunction={() => buttonShowDetails(item)} // Pass the selected item
                                        isTrueButtonCancel={false}
                                        buttonCancelReservationFunction={false}
                                        description={item.effectivene.description}
                                        id={item.effectivene_id}
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
                </div>
                {pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />}
                {/* =============== END ROW ============== */}
            </div>
        </>
    );
};

export default AllCardsResrvationsEffective;