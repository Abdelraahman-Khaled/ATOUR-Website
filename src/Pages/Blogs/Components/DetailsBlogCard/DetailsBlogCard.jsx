
import GeneralAPI from "api/generalApi";
import BannerDetails from "./BannerDetails/BannerDetails";
import InfoBlogDetails from "./BannerDetails/InfoBlogDetails";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";

const DetailsBlogCard = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [blogDetailsCard, setBlogDetailsCard] = useState(null); // State to store fetched data
  const { idCardDetailsBlog } = useParams();

  // Fetch data on component mount
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await GeneralAPI.getBlogDetails(idCardDetailsBlog, currentLanguage); // Replace with your API call
        console.log(response);

        setBlogDetailsCard(response.data); // Store fetched data in state
      } catch (err) {
        console.error("Error fetching trip data:", err);
        setError("Failed to load trip data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTripData();
  }, [idCardDetailsBlog, currentLanguage]);

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
      <HelmetInfo titlePage={currentLanguage === "ar" ? "تفاصيل المدونة" : "Blog Details"} />

      <div className="details-blog-card">
        {/* ========== START SLIDER DETIALS BLOG ============ */}
        <div className="slider-details-blog">
          <BannerDetails img={blogDetailsCard.photo} />
        </div>
        {/* ========== END SLIDER DETIALS BLOG ============ */}
        {/* ========== START CONTAINER ============= */}
        <ContainerMedia>
          <InfoBlogDetails blogDetailsCard={blogDetailsCard} />
        </ContainerMedia>
        {/* ========== END CONTAINER ============= */}
      </div>
    </>
  );
};

export default DetailsBlogCard;
