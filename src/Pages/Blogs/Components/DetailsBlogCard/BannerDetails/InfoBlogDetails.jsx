import GeneralAPI from "api/generalApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import img from "../../../../../assets/images/blogs/01.png";
import imgUser from "../../../../../assets/images/users/01.png";
import "./BannerDetails.css";
import TimeGapCalculator from "./calculateTimeGap";

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
const InfoBlogDetails = () => {
  const [blogDetailsCard, setBlogDetailsCard] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const { currentLanguage } = useLanguage(); // Get the current language
  const { idCardDetailsBlog } = useParams();

  // Fetch data on component mount
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await GeneralAPI.getBlogDetails(idCardDetailsBlog); // Replace with your API call
        setBlogDetailsCard(response.data); // Store fetched data in state
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching trip data:", err);
        setError("Failed to load trip data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTripData();
  }, [idCardDetailsBlog]);

  // Display loading state
  if (loading) {
    return (
      <div className="airPlan-dot" />

    );
  }
  // Display error state
  if (error) {
    return <div>{error}</div>;
  }
  console.log(blogDetailsCard);
  return (

    blogDetailsCard ? (
      <div className="info-details-blog">
        {/* ================== START IMAGE BLOG TOP =========== */}
        <div className="image-blog-top">
          <img
            src={blogDetailsCard.photo}
            alt="blogImage"
            className="w-100  object-fit-cover"
            loading="lazy"
          />
        </div>
        {/* ================== START IMAGE BLOG TOP =========== */}
        {/* ================== START CONTENT BLOG DETAILS ============= */}
        <div className="content-blog-details">
          <h2 className="title">
            {currentLanguage === "ar" ? blogDetailsCard.title_ar.slice(1, -1) : blogDetailsCard.title_en.slice(1, -1)}
          </h2>
          {/* ============ START INFO BLOG ADDED =========== */}
          <div className="info-blog-added d-flex align-items-center gap-3">
            <img
              src={blogDetailsCard.publisherphoto}
              alt="img person"
              className="object-fit-cover"
              width={"45px"}
              height={"45px"}
            />
            <div className="content-info">
              <h2 className="name">{blogDetailsCard.publisher_name}</h2>
              <div className="time-add"><TimeGapCalculator createdAt={blogDetailsCard.created_at} />
              </div>
            </div>
          </div>
          {/* ============ END INFO BLOG ADDED =========== */}
          {/* ============ START CONTENT TEXT ============ */}
          <div className="content-text">
            <p className="text" 
            dangerouslySetInnerHTML={{ __html: currentLanguage === "ar" ? 
            blogDetailsCard.content_ar : blogDetailsCard.content_en }}>
            </p>
          </div>
          {/* ============ END CONTENT TEXT ============ */}
        </div>
        {/* ================== END CONTENT BLOG DETAILS ============= */}
      </div>
    )
      :
      (
        <p className="text-section-api fs-6 fw-medium text-center pt-5">
          {text[currentLanguage].noData}{" "}
          <Link
            to="/"
            className="fs-6 fw-medium text-danger text-decoration-underline"
          >
            {text[currentLanguage].home}
          </Link>
        </p>
      )
  );
};

export default InfoBlogDetails;
