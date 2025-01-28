import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Fork from "assets/images/IconsHeader/Fork";
import Hotel from "assets/images/IconsHeader/Hotel";
import Tree from "assets/images/IconsHeader/Tree";
import AllCardsReservations from "./AllCardsReservations/AllCardsReservations";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import BookingAPI from "api/bookingApi";
import LoaderSvg from "assets/Icons/LoaderSvg";

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
  const [compleated, setCompleated] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetching All reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await BookingAPI.getBookings(); // Fetch data from the API
        setCurrent(data.data.curren);
        setCompleated(data.data.compleated);
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError("Failed to load home data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchReservations(); // Call the API on component mount
  }, []);

  if (loading) {
    return (
      <div className="text-center m-4">
        <span style={{ scale: "2" }}>
          <LoaderSvg />
        </span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  console.log(curren.trips.length);
  // Dynamically update tabsData based on the active tab
  const tabsData = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> {currentLanguage === "ar" ? "رحلات" : "Trips"}
        </>
      ),
      content: (
        <AllCardsReservations
          reservation={tabs_1[0].active ? curren.trips : compleated.trips}
        />
      ),
    },
    {
      eventKey: "tab2",
      title: (
        <>
          <Hotel /> {currentLanguage === "ar" ? "فعاليات" : "Effectivenes"}
        </>
      ),
      content: <AllCardsReservations
        reservation={tabs_1[0].active ? curren.effectivenes : compleated.effectivenes}

      />,
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Fork /> {currentLanguage === "ar" ? "هدايا" : "Gifts"}
        </>
      ),
      content: <AllCardsReservations
        reservation={tabs_1[0].active ? curren.gifts : compleated.gifts}

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