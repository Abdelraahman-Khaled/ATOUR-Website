import React, { useState } from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import "./ImagesCard.css";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";

const ImagesCard = ({ mostVisited }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  // Auth
  const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const hideLogin = () => {
    setShowLogin(false);
  };
  const handleLinkClick = (e) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      handleShowLogin(); // Open login form if not authenticated
    }
  };

  // Localization for section title and description
  const localization = {
    ar: {
      sectionTitle: "الوجهات الأكثر زيارة",
      sectionText:
        "اكتشف جمال العالم من خلال أكثر الوجهات التي تأسر القلوب وتلهم الأرواح. سواء كنت تبحث عن المغامرة، الثقافة، أو الاسترخاء، هذه الأماكن تجمع بين سحر الطبيعة وعبق التاريخ لتقدم لك تجربة لا تُنسى. دعنا نأخذك في رحلة مليئة بالذكريات التي تدوم مدى الحياة."
    },
    en: {
      sectionTitle: "Most Visited Destinations",
      sectionText:
        "Explore the beauty of the world through the most captivating destinations that inspire the soul and touch the heart. Whether you seek adventure, culture, or relaxation, these places combine the charm of nature with the essence of history to offer you an unforgettable experience. Let us take you on a journey filled with lifelong memories."
    },
  };

  const { sectionTitle, sectionText } = localization[currentLanguage]; // Retrieve text based on language

  return (
    <div className="images-card-content padding-top">
      {/* Auth login */}
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
      {/* =========== START SECTION TITLE ========== */}
      <TitleSection title={sectionTitle} text={sectionText} />
      {/* =========== END SECTION TITLE ============ */}

      {/* =========== START ALL IMAGES CARD =========== */}
      <div className="all-images-card" data-aos="fade-up">
        {/* ============ START ROW ========== */}
        <div className="row g-3 justify-content-center">
          {mostVisited.map((item) => {
            return (
              <div key={item.id} className="col-6 col-md-4 col-lg-3">
                <Link to={`/biographyPage/${item.id}`} onClick={handleLinkClick}>
                  {/* ============ START CARD IMAGE ONE =========== */}
                  <div className="card-image-one">
                    <div className="image-card position-relative overlay-bg">
                      <img
                        src={item.photo}
                        alt="imageCard"
                        loading="lazy"
                        className="w-100 h-100 object-fit-cover image-card-src"
                      />
                    </div>
                    <div className="content-info">
                      <h2 className="title">
                        {currentLanguage === "ar" ? item.title_ar : item.title_en}
                      </h2>
                    </div>
                  </div>
                  {/* ============ END CARD IMAGE ONE =========== */}
                </Link>
              </div>
            );
          })}
        </div>
        {/* ============ END ROW ========== */}
      </div>
      {/* =========== END ALL IMAGES CARD =========== */}
    </div>
  );
};

export default ImagesCard;
