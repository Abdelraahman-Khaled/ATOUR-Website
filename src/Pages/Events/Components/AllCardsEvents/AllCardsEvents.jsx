import React, { useEffect, useRef, useState } from "react";
import mixitup from "mixitup";
import CardEvent from "../CardEvent/CardEvent";
import { formatDate } from "./dateUtils";
import PaginationPage from "Components/Pagination/Pagination";
import { Link } from "react-router-dom";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";

const text = {
  ar: {
    noData: "لا يوجد فعاليات متاحة.",
    home: "الصفحة الرئيسية",
    filters: {
      all: "الجميع",
      week: "هذا الإسبوع",
      month: "هذا الشهر",
      year: "هذه السنة"
    }
  },
  en: {
    noData: "No events available.",
    home: "Home",
    filters: {
      all: "All",
      week: "This Week",
      month: "This Month",
      year: "This Year"
    }
  },
  fr: {
    noData: "Aucun événement disponible.",
    home: "Accueil",
    filters: {
      all: "Tous",
      week: "Cette semaine",
      month: "Ce mois-ci",
      year: "Cette année"
    }
  },
  de: {
    noData: "Keine Veranstaltungen verfügbar.",
    home: "Startseite",
    filters: {
      all: "Alle",
      week: "Diese Woche",
      month: "Diesen Monat",
      year: "Dieses Jahr"
    }
  },
  es: {
    noData: "No hay eventos disponibles.",
    home: "Inicio",
    filters: {
      all: "Todos",
      week: "Esta semana",
      month: "Este mes",
      year: "Este año"
    }
  },
  tr: {
    noData: "Mevcut etkinlik yok.",
    home: "Ana Sayfa",
    filters: {
      all: "Tümü",
      week: "Bu hafta",
      month: "Bu ay",
      year: "Bu yıl"
    }
  },
  ru: {
    noData: "Нет доступных мероприятий.",
    home: "Главная",
    filters: {
      all: "Все",
      week: "На этой неделе",
      month: "В этом месяце",
      year: "В этом году"
    }
  },
  zh: {
    noData: "暂无可用活动。",
    home: "首页",
    filters: {
      all: "全部",
      week: "本周",
      month: "本月",
      year: "今年"
    }
  },
  ko: {
    noData: "이용 가능한 이벤트가 없습니다.",
    home: "홈",
    filters: {
      all: "전체",
      week: "이번 주",
      month: "이번 달",
      year: "올해"
    }
  },
  pt: {
    noData: "Nenhum evento disponível.",
    home: "Início",
    filters: {
      all: "Todos",
      week: "Esta semana",
      month: "Este mês",
      year: "Este ano"
    }
  },
  ur: {
    noData: "کوئی ایونٹس دستیاب نہیں ہیں۔",
    home: "ہوم",
    filters: {
      all: "سب",
      week: "اس ہفتے",
      month: "اس مہینے",
      year: "اس سال"
    }
  },
  ja: {
    noData: "利用可能なイベントはありません。",
    home: "ホーム",
    filters: {
      all: "すべて",
      week: "今週",
      month: "今月",
      year: "今年"
    }
  }
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
    const today = new Date();
    const event = new Date(eventDate);
    const diffInMs = event.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    // This week
    if (diffInDays >= 0 && diffInDays <= 7) {
      return "category1";
    }

    // This month
    if (
      event.getMonth() === today.getMonth() &&
      event.getFullYear() === today.getFullYear()
    ) {
      return "category2";
    }

    // This year (any month/week within the same year)
    if (event.getFullYear() === today.getFullYear()) {
      return "category3";
    }

    return ""; // old events or different years
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
          {text[currentLanguage].filters.all}
        </button>
        <button
          onClick={() => filterItems(".category1")}
          className={`btn-filter-one main-btn-filter ${activeFilter === ".category1" ? "active" : ""
            }`}
        >
          {text[currentLanguage].filters.week}
        </button>
        <button
          onClick={() => filterItems(".category2")}
          className={`btn-filter-one main-btn-filter ${activeFilter === ".category2" ? "active" : ""
            }`}
        >
          {text[currentLanguage].filters.month}
        </button>
        {/* <button
          onClick={() => filterItems(".category3")}
          className={`btn-filter-one main-btn-filter ${activeFilter === ".category3" ? "active" : ""
            }`}
        >
          {currentLanguage === "ar" ? "هذه السنة" : "This Year"}
        </button> */}
      </div>
      {/* =========== END BUTTONS FILTER =========== */}

      {/* ============ START ROW =========== */}
      <div data-aos="fade-up" ref={containerRef} className="row g-3">
        {eventsData && eventsData.length > 0 ?
          currentPageData.map((item) => {
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
                  numPrice={<CurrencyDisplay price={item.customer_price} />}
                  textContent={""}
                  functionBookingButton={handleBookingButtonClick}
                  isFavoritePage={item.is_favourit}
                  type={"effectivene"}
                  is_group={item.is_group}
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
