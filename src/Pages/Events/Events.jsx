import SliderEvents from "./Components/SliderEvents/SliderEvents";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./Events.css";
import AllCardsEvents from "./Components/AllCardsEvents/AllCardsEvents";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useEffect, useState } from "react";
import ContentAPI from "api/contentApi";
import Loader from "Components/Auth/Components/Loader/Loader";
import { toast } from "react-toastify";

const Events = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors


  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await ContentAPI.getEffectiveness(currentLanguage); // Fetch data from the API
        const enrichedData = data.data.map((item) => {
          // Assign categories dynamically based on date or logic
          const now = new Date();
          const eventDate = item.from_date ? new Date(item.from_date) : new Date(); // Use today's date if from_date is null
          let category = "*";

          if (eventDate >= now && eventDate <= new Date(now.setDate(now.getDate() + 7))) {
            category = "category1"; // This week
          } else if (eventDate.getMonth() === new Date().getMonth() && eventDate.getFullYear() === new Date().getFullYear()) {
            category = "category2"; // This month
          } else if (eventDate.getFullYear() === new Date().getFullYear()) {
            category = "category3"; // This year
          } else {
            category = "other"; // Other
          }

          return { ...item, category, from_date: eventDate.toISOString().split("T")[0] }; // Ensure from_date is updated if it was null
        });
        setEventsData(enrichedData)
      } catch (err) {
        console.error("Error fetching home data:", err);
        toast.error("Failed to load home data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchEventsData(); // Call the API on component mount
  }, [currentLanguage]);

  // normalize images
  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };
  const normalizedData = normalizeData(eventsData); // Normalize the data

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return null; // No need to display error here, toast will handle it
  }

  return (
    <>
      <HelmetInfo titlePage={"الفعاليات"} />

      <div className="events-page">
        <header>
          {/* =========== START SLIDER CONTENT ========== */}
          <SliderEvents currentLanguage={currentLanguage} />
          {/* =========== START SLIDER CONTENT ========== */}
        </header>
        <main>
          <ContainerMedia>
            <AllCardsEvents currentLanguage={currentLanguage} eventsData={normalizedData} />
          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default Events;
