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
                        <p className="text-section-api fs-6 fw-medium text-center pt-5">
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