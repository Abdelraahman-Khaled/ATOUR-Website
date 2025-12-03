import "../AllCardsReservation.css";
import { Link } from "react-router-dom";
import ModalDetailsTrip from "../../ModalsReservation/ModalDetailsTrip";
import { useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import backUP from "../../../../../assets/images/slider/01.png";
import PaginationPage from "Components/Pagination/Pagination";
import GiftCardReservation from "./GiftCardReservation";

const AllCardsResrvationsGift = ({ reservation, refresh }) => {
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
            to: "إلى",
            myself: "استلم الهدية بنفسك من عنوانها",
            delivery: "التوصيل لعنوانك"
        },
        en: {
            noData: "No data available.",
            home: "Home",
            children: "Children",
            adults: "Adults",
            from: "From",
            to: "To",
            myself: "Receive the gift yourself from its address",
            delivery: "Delivery to your address"
        },
        es: {
            noData: "No hay datos disponibles.",
            home: "Inicio",
            children: "Niños",
            adults: "Adultos",
            from: "Desde",
            to: "Hasta",
            myself: "Recibe el regalo tú mismo desde su dirección",
            delivery: "Entrega a tu dirección"
        },
        fr: {
            noData: "Aucune donnée disponible.",
            home: "Accueil",
            children: "Enfants",
            adults: "Adultes",
            from: "De",
            to: "À",
            myself: "Recevez le cadeau vous-même depuis son adresse",
            delivery: "Livraison à votre adresse"
        },
        de: {
            noData: "Keine Daten verfügbar.",
            home: "Startseite",
            children: "Kinder",
            adults: "Erwachsene",
            from: "Von",
            to: "Bis",
            myself: "Empfangen Sie das Geschenk selbst von seiner Adresse",
            delivery: "Lieferung an Ihre Adresse"
        },
        it: {
            noData: "Nessun dato disponibile.",
            home: "Home",
            children: "Bambini",
            adults: "Adulti",
            from: "Da",
            to: "A",
            myself: "Ricevi il regalo tu stesso dal suo indirizzo",
            delivery: "Consegna al tuo indirizzo"
        },
        ru: {
            noData: "Нет доступных данных.",
            home: "Главная",
            children: "Дети",
            adults: "Взрослые",
            from: "От",
            to: "До",
            myself: "Получите подарок самостоятельно по его адресу",
            delivery: "Доставка по вашему адресу"
        },
        zh: {
            noData: "没有可用数据。",
            home: "首页",
            children: "儿童",
            adults: "成人",
            from: "从",
            to: "到",
            myself: "亲自从其地址领取礼物",
            delivery: "送货到您的地址"
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
                                    <GiftCardReservation
                                        image={item.photo || item.gift?.cover || backUP}
                                        typeReservation={item.payment_status}
                                        titleCard={(item.trip || item.effectivene || item.gift)?.title || "Product"}
                                        priceNum={`${item.total}`}
                                        textUserInfo={`${item.delivery_way === "myself" ? text[currentLanguage].myself : text[currentLanguage].delivery}`}
                                        isTrueButtonDetails={true}
                                        buttonDetailsFunction={() => buttonShowDetails(item)} // Pass the selected item
                                        isTrueButtonCancel={false}
                                        buttonCancelReservationFunction={false}
                                        description={item.gift.description}
                                        id={item.gift_id}
                                        countryName={item.gift.city.title}
                                        status={item.status}
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

export default AllCardsResrvationsGift;