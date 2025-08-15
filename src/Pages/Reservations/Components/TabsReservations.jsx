import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Tree from "assets/images/IconsHeader/Tree";
import AllCardsReservations from "./AllCardsReservations/AllCardsReservations";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import BookingAPI from "api/bookingApi";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import Loader from "Components/Auth/Components/Loader/Loader";
import AllCardsResrvationsEffective from "./AllCardsReservations/Effectivenes/AllCardsResrvationsEffective";
import AllCardsResrvationsGift from "./AllCardsReservations/Gifts/AllCardsResrvationsGift";

const TabsReservations = () => {

  // State for buttons
  const [tabs_1, setTabs_1] = useState([
    { id: 1, title: { ar: "الحالية", en: "Current" }, icon: "", active: true },
    { id: 2, title: { ar: "المنتهية", en: "Completed" }, icon: "", active: false },
  ]);

  const handleTabClick = (id) => {
    setTabs_1(
      tabs_1.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

  // State for fetching
  const { currentLanguage } = useLanguage(); // Get the current language
  const [curren, setCurrent] = useState(null);
  const [compleated, setCompleted] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [refresh, setRefresh] = useState(false)

  // refresh on deleting reservation
  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };
  // Fetching All reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await BookingAPI.getBookings(currentLanguage); // Fetch data from the API
        setCurrent(data.data.curren);
        setCompleted(data.data.compleated);
      } catch (err) {
        console.error("Error fetching reservation data:", err);
        setError("Failed to load reservation data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchReservations(); // Call the API on component mount
  }, [currentLanguage, refresh]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  // Dynamically update tabsData based on the active tab
  const tabsData = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> {currentLanguage === "ar" ? "جَوْلات " : "Experiences"}
        </>
      ),
      content: (
        <AllCardsReservations
          reservation={tabs_1[0].active ? curren.trips : compleated.trips}
          refresh={handleRefresh}
        />
      ),
    },
    {
      eventKey: "tab2",
      title: (
        <>
          <Ticket /> {currentLanguage === "ar" ? "فعاليات" : "Effectivenes"}
        </>
      ),
      content: <AllCardsResrvationsEffective
        reservation={tabs_1[0].active ? curren.effectivenes : compleated.effectivenes}
        refresh={handleRefresh}

      />,
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Gift /> {currentLanguage === "ar" ? "هدايا" : "Gifts"}
        </>
      ),
      content: <AllCardsResrvationsGift
        reservation={tabs_1[0].active ? curren.gifts : compleated.gifts}
        refresh={handleRefresh}

      />,
    },
  ];

  return (
    <div className="all-tabs-reservation padding-80">
      <ContainerMedia>
        <div className="all-tabs-reservation-info" data-aos="fade-right">
          <ul
            className="nav nav-content--2 nav-pills gap-3 flex-wrap nav-pills border-account-user h-100"
            id="pills-tab"
            role="tablist"
          >
            {tabs_1.map((tab) => (
              <li
                key={tab.id}
                className="nav-item nav-item-info"
                role="presentation"
              >
                <button
                  className={`nav-link main-btn-filter--1 ${tab.active ? "active" : ""
                    } position-relative`}
                  id={`pills-${tab.title.ar}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-${tab.title.ar.toLowerCase()}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-${tab.title.ar.toLowerCase()}`}
                  aria-selected={tab.active ? "true" : "false"}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.icon} {currentLanguage === "ar" ? tab.title.ar : tab.title.en}
                </button>
              </li>
            ))}
          </ul>

          {/* ============ START CONTENT INFO TABS ACCOUNT =============== */}
          <div
            className="tab-content w-100 border-account-user h-100"
            id="pills-tabContent"
          >
            {tabs_1.map((tab) => (
              <div
                key={tab.id}
                className={`tab-pane fade ${tab.active ? "show active" : ""}`}
                id={`pills-${tab.title.ar.toLowerCase()}`}
                role="tabpanel"
                aria-labelledby={`pills-${tab.title.ar.toLowerCase()}-tab`}
              >
                {/* Content for each tab */}
                {tab.title.ar === "الحالية" && (
                  <>
                    <TabsContent
                      tabsData={tabsData}
                      newClassTabsContent={"tabs-reservations-content-1"}
                    />
                  </>
                )}
                {tab.title.ar === "المنتهية" && (
                  <>
                    <TabsContent
                      tabsData={tabsData}
                      newClassTabsContent={"tabs-reservations-content-1"}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          {/* ============ END CONTENT INFO TABS ACCOUNT =============== */}
        </div>
      </ContainerMedia>
    </div>
  );
};

export default TabsReservations;