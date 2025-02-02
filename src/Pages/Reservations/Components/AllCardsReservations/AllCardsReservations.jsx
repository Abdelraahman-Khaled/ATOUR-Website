import "./AllCardsReservation.css";
import CardReservation from "./CardReservation";
import { dataReservation } from "../Data/DataReservation";
import { Link } from "react-router-dom";
import ModalDetailsTrip from "../ModalsReservation/ModalDetailsTrip";
import { useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import backUP from "../../../../assets/images/slider/01.png";

const AllCardsReservations = ({ reservation }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

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
    },
    en: {
      noData: "No data available.",
      home: "Home",
      children: "Children",
      adults: "Adults",
    },
  };

  return (
    <>
      <ModalDetailsTrip
        showDetailsModal={showDetailsTrip}
        hideDetailsModal={hideDetailsModal}
        reservation={selectedReservation} // Pass the selected reservation
        currentLanguage={currentLanguage} // Pass the current language
      />
      <div className="all-cards-reservations">
        {/* =============== START ROW ============== */}
        <div className="row g-3">
          {reservation !== undefined && reservation.length > 0 ? (
            [...reservation].reverse().map((item) => {
              return (
                <div key={item.id} className="col-12 col-md-6 col-lg-12">
                  <CardReservation
                    image={item.photo || backUP}
                    typeReservation={item.payment_status}
                    countryName={item.countryName}
                    titleCard={(item.trip || item.effectivene || item.gift)?.[currentLanguage === "ar" ? "title_ar" : "title_en"] || "Ended"}
                    priceNum={`${item.total}`}
                    textUserInfo={`${text[currentLanguage].children} ${item.children_number}, ${text[currentLanguage].adults} ${item.people_number}`}
                    dateTime={item.booking_date + " " + item.booking_day}
                    timeAdd={item.booking_time}
                    isTrueButtonDetails={true}
                    buttonDetailsFunction={() => buttonShowDetails(item)} // Pass the selected item
                    isTrueButtonCancel={false}
                    buttonCancelReservationFunction={false}
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
        {/* =============== END ROW ============== */}
      </div>
    </>
  );
};

export default AllCardsReservations;