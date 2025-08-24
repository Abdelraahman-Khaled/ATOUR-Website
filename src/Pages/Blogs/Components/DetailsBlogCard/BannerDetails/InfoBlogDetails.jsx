import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
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
const InfoBlogDetails = ({ blogDetailsCard }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

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
            {blogDetailsCard.title}
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
              dangerouslySetInnerHTML={{
                __html: currentLanguage === "ar" ?
                  blogDetailsCard.content_ar : blogDetailsCard.content_en
              }}>
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
