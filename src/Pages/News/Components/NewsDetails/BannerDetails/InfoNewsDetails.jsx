import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
import "./InfoNewsDetails.css";
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

const InfoNewsDetails = ({ newsDetailsCard }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    newsDetailsCard ? (
      <div className="info-details-news">
        {/* ================== START IMAGE NEWS TOP =========== */}
        <div className="image-news-top">
          <img
            src={newsDetailsCard.photo}
            alt="newsImage"
            className="w-100 object-fit-cover"
            loading="lazy"
          />
        </div>
        {/* ================== START IMAGE NEWS TOP =========== */}
        {/* ================== START CONTENT NEWS DETAILS ============= */}
        <div className="content-news-details">
          <h2 className="title">
            {newsDetailsCard.title}
          </h2>
          {/* ============ START INFO NEWS ADDED =========== */}
          <div className="info-news-added d-flex align-items-center gap-3">
            <img
              src={newsDetailsCard.publisherphoto}
              alt="img person"
              className="object-fit-cover"
              width={"45px"}
              height={"45px"}
            />
            <div className="content-info">
              <h2 className="name">{newsDetailsCard.publisher_name}</h2>
              <div className="time-add"><TimeGapCalculator createdAt={newsDetailsCard.created_at} />
              </div>
            </div>
          </div>
          {/* ============ END INFO NEWS ADDED =========== */}
          {/* ============ START CONTENT TEXT ============ */}
          <div className="content-text">
            <p className="text"
              dangerouslySetInnerHTML={{
                __html: currentLanguage === "ar" ?
                  newsDetailsCard.content_ar : newsDetailsCard.content_en
              }}>
            </p>
          </div>
          {/* ============ END CONTENT TEXT ============ */}
        </div>
        {/* ================== END CONTENT NEWS DETAILS ============= */}
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

export default InfoNewsDetails;