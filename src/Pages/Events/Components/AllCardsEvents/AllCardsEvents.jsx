import React, { useEffect, useRef, useState } from "react";
import mixitup from "mixitup";
import CardEvent from "../CardEvent/CardEvent";
import { formatDate } from "./dateUtils";
import PaginationPage from "Components/Pagination/Pagination";
import { Link } from "react-router-dom";

const text = {
  ar: {
    noData: "لا يوجد فعاليات متاحة.",
    home: "الصفحة الرئيسية",
  },
  en: {
    noData: "No effectiveness available.",
    home: "Home",
  },
};

function AllCardsEvents({ currentLanguage, eventsData, className = null }) {
  const containerRef = useRef(null);
  const [mixer, setMixer] = useState(null); // State to hold the MixItUp instance
  const [activeFilter, setActiveFilter] = useState("*"); // BUTTON ACTIVE FILTER active

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // NUMBER OF PAGE ITEMS
  const pageCount = Math.ceil(eventsData.length / perPage);
  const offset = currentPage * perPage;
  const currentPageData = eventsData.slice(offset, offset + perPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

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
  };

  // calculate date 
  const getEventCategory = (eventDate) => {
    const today = new Date(); // تاريخ اليوم
    const event = new Date(eventDate); // تاريخ الحدث
    const diffInMs = event.getTime() - today.getTime(); // الفرق بالميلي ثانية
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // تحويل الفرق إلى أيام
    if (diffInDays >= 0 && diffInDays <= 7) {
      return "category1"; // هذا الأسبوع
    }
    if (diffInDays > 7 && diffInDays <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) {
      return "category2"; // هذا الشهر (بناءً على عدد الأيام الفعلي في الشهر)
    }
    if (diffInDays > new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() && diffInDays <= 365) {
      return "category3"; // هذه السنة
    }
    return ""; // حدث قديم
  };

  return (
    <div className={`all-cards-events h-100 padding-80 ${className}`}>
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
        {eventsData && eventsData.length > 0 ?
          [...currentPageData].reverse().map((item) => {
            const { dayNumber, dayName, monthName } = formatDate(item.from_date, currentLanguage);
            return (
              <div
                key={item.id}
                className={`col-12 col-sm-6 col-lg-12 item-card-mix ${getEventCategory(item.from_date)}`}
              >
                <CardEvent
                  id={item.id}
                  routeCardLink={item.id}
                  titleMonth={monthName}
                  numMonth={dayNumber}
                  titleDay={dayName}
                  image={item.image}
                  nameCountry={item.city !== undefined ? item.city.country_name : currentLanguage === "ar" ? "السعودية" : "Saudi Arabia"}
                  // nameCountry={"السعودية"}
                  titleCard={item.title}
                  numPrice={`${item.customer_price} ${currentLanguage === "ar" ? "ريال" : "SAR"}`}
                  textContent={item.description}
                  functionBookingButton={handleBookingButtonClick}
                  isFavoritePage={item.is_favourit}
                  type={"effectivene"}
                />
              </div>
            )
          }) : (
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

        {pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />}

      </div>
      {/* ============ END ROW =========== */}
    </div>
  );
}

export default AllCardsEvents;
