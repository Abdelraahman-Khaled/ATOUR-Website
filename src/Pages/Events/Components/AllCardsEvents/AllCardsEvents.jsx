import React, { useEffect, useRef, useState } from "react";
import mixitup from "mixitup";
import CardEvent from "../CardEvent/CardEvent";
import { cardsEvents } from "../../Data/DataEvents";
import { formatDate } from "./dateUtils";
import fallbackImage from "./placeholder.png"
import PaginationPage from "Components/Pagination/Pagination";

function AllCardsEvents({ currentLanguage, eventsData }) {
  const containerRef = useRef(null);
  const [mixer, setMixer] = useState(null); // State to hold the MixItUp instance
  const [activeFilter, setActiveFilter] = useState("*"); // BUTTON ACTIVE FILTER active

  // Initialize MixItUp
  useEffect(() => {
    // Initialize MixItUp
    const mixerInstance = mixitup(containerRef.current, {
      selectors: {
        target: ".item-card-mix" // Selector for items
      },
      animation: {
        effects: "fade",
        duration: 600
      }
    });
    setMixer(mixerInstance);
    return () => {
      mixerInstance.destroy();
    };
  }, [eventsData]);

  // Filter Items
  const filterItems = (filter) => {
    if (mixer) {
      mixer.filter(filter); // Apply filter using MixItUp
      setActiveFilter(filter); // Update active filter
    }
  };

  // BUTTON BOOKING EVENTS FUNCTION
  const handleBookingButtonClick = (cardId) => {
    console.log(cardId);
  };



  return (
    <div className="all-cards-events h-100 padding-80">
      {/* =========== START BUTTONS FILTER =========== */}
      <div
        data-aos="fade-left"
        className="all-buttons-filters d-flex align-items-center gap-3"
      >
        <button
          onClick={() => filterItems("*")}
          className={`btn-filter-one main-btn-filter ${activeFilter === "*" ? "active" : ""
            }`}
        >
          {currentLanguage === "ar" ? "الجميع" : "All"}
        </button>
        <button
          onClick={() => filterItems(".category1")}
          className={`btn-filter-one main-btn-filter ${activeFilter === ".category1" ? "active" : ""
            }`}
        >
          {currentLanguage === "ar" ? "هذا الإسبوع" : "This Week"}
        </button>
        <button
          onClick={() => filterItems(".category2")}
          className={`btn-filter-one main-btn-filter ${activeFilter === ".category2" ? "active" : ""
            }`}
        >
          {currentLanguage === "ar" ? "هذا الشهر" : "This Month"}
        </button>
        <button
          onClick={() => filterItems(".category3")}
          className={`btn-filter-one main-btn-filter ${activeFilter === ".category3" ? "active" : ""
            }`}
        >
          {currentLanguage === "ar" ? "هذه السنة" : "This Year"}
        </button>
      </div>
      {/* =========== END BUTTONS FILTER =========== */}

      {/* ============ START ROW =========== */}
      <div data-aos="fade-up" ref={containerRef} className="row g-3">
        {eventsData.map((item) => {
          const { dayNumber, dayName, monthName } = formatDate(item.from_date, currentLanguage);
          return (
            <div
              key={item.id}
              className={`col-12 col-sm-6  col-lg-12 item-card-mix ${item.category}`}
            >
              <CardEvent
                id={item.id}
                routeCardLink={item.id}
                titleMonth={monthName}
                numMonth={dayNumber}
                titleDay={dayName}
                image={item.image}
                nameCountry={item.city !== undefined ? item.city.country_name : "السعودية"}
                // nameCountry={"السعودية"}
                titleCard={currentLanguage === "ar" ? item.title_ar : item.title_en}
                numPrice={`${item.price} ${currentLanguage === "ar" ? "ريال" : "SAR"}`}
                textContent={currentLanguage === "ar" ? item.description_ar : item.description_en}
                functionBookingButton={handleBookingButtonClick}
              />
            </div>
          )
        })}

        {/* {currentPageData.length > 5 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />} */}

      </div>
      {/* ============ END ROW =========== */}
    </div>
  );
}

export default AllCardsEvents;
