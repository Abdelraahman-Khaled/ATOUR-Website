import GeneralAPI from "api/generalApi";
import BannerDetails from "./BannerDetails/BannerDetails";
import InfoNewsDetails from "./BannerDetails/InfoNewsDetails";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewsDetails.css";
import Loader from "Components/Auth/Components/Loader/Loader";

const NewsDetails = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [newsDetailsCard, setNewsDetailsCard] = useState(null); // State to store fetched data
  const { id } = useParams();

  // Fetch data on component mount
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Use the blog API endpoint as requested by the user
        const response = await GeneralAPI.getNewsDetails(id, currentLanguage);
        setNewsDetailsCard(response.data);
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError("Failed to load news data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchNewsData();
  }, [id, currentLanguage]);

  // Display loading state
  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }
  // Display error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <HelmetInfo titlePage={newsDetailsCard.title} description={newsDetailsCard.description} image={newsDetailsCard.photo} url={`news/${id}`} />

      <div className="details-news-card">
        {/* ========== START SLIDER DETIALS NEWS ============ */}
        <div className="slider-details-news">
          <BannerDetails img={newsDetailsCard.photo} />
        </div>
        {/* ========== END SLIDER DETIALS NEWS ============ */}
        {/* ========== START CONTAINER ============= */}
        <ContainerMedia>
          <InfoNewsDetails newsDetailsCard={newsDetailsCard} />
        </ContainerMedia>
        {/* ========== END CONTAINER ============= */}
      </div>
    </>
  );
};

export default NewsDetails;