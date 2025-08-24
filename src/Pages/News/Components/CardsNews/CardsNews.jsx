import CardNews from "../CardNews/CardNews";
import { useEffect, useState } from "react";
import GeneralAPI from "api/generalApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
import "./CardsNews.css";

const text = {
  ar: {
    noData: "لا يوجد بيانات متاحة.",
    home: "الصفحة الرئيسية",
  },
  en: {
    noData: "No data available.",
    home: "Home",
  },
};

const CardsNews = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  const [newsData, setNewsData] = useState([]); // State to store news data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Use the blog API endpoint as requested by the user
        const data = await GeneralAPI.getBlogs(currentLanguage);
        setNewsData(data.data);

        // If the API is not yet implemented, fall back to mock data
        if (!data.data || data.data.length === 0) {
          // Set empty data state when no data is available
          setNewsData([]);
          // You may want to add a state for the "no data" image
          // and use it in the render method like:
          // <img src="/images/no-data-found.png" alt="No data found" />
        }
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError("Failed to load news data. Please try again later.");

      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchNewsData(); // Call the API on component mount
  }, [currentLanguage]);

  if (loading) {
    return (
      <div className="airPlan-dot" />
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div className="cards-news-container">
      {/* =========== START CARDS GRID =========== */}
      {newsData.length <= 0 ? (
        <p className="text-center w-100  my-4">
          {text[currentLanguage].noData}{" "}
          <Link
            to="/"
            className="fs-6 fw-medium text-danger text-decoration-underline"
          >
            {text[currentLanguage].home}
          </Link>
        </p>
      ) : (
        <div className="cards-news-grid">
          {newsData.map((item) => (
            <div key={item.id}>
              <CardNews
                routeNewsCard={`/news/${item.id}`}
                imageNews={item.photo}
                titleNews={item.title}
                imageUserNews={item.publisherphoto}
                nameUserNews={item.publisher_name}
                timeAddedNews={item.created_at}
                description={item.content}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsNews;