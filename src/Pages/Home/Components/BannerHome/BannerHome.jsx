import React from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import imageBannerHome from "../../../../assets/images/bannerHome/01.png";
import appStore from "../../../../assets/images/apps/appstore.svg";
import appGoogle from "../../../../assets/images/apps/googleplay.svg";
import "./BannerHome.css";
import { useLanguage } from "Components/Languages/LanguageContext";

const BannerHome = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // Localization for text content
  const localization = {
    ar: {
      title: "هل لديك خدمة يمكنك عرضها ؟",
      description:
        "اغتنم الفرصة وكن جزءًا من عالم مليء بالإبداع والتواصل! إذا كنت تمتلك خدمة فريدة أو فكرة مبتكرة، فقد حان الوقت لتشاركها مع الآخرين. دعنا نساعدك في الوصول إلى جمهور أوسع وبناء تجربة تلبي تطلعاتك. كل ما عليك هو تحميل التطبيق، تسجيل خدمتك، والانطلاق نحو النجاح!",
      appsTitle: "حمل التطبيق وسجل الآن",
    },
    en: {
      title: "Do you have a service to offer?",
      description:
        "Seize the opportunity and become part of a world full of creativity and connection! If you have a unique service or an innovative idea, now is the time to share it with others. Let us help you reach a wider audience and create an experience that meets your aspirations. All you need to do is download the app, register your service, and embark on the journey to success!",
      appsTitle: "Download the app and register now",
    },
  };

  const { title, description, appsTitle } = localization[currentLanguage]; // Retrieve localized text

  return (
    <div className="banner-home padding-top">
      {/* ========== START ALL BANNER HOME ========= */}
      <div className="all-banner-home">
        {/* =========== START ROW ========= */}
        <div className="row g-4 g-md-3 align-items-center">
          {/* ============ START COL ============ */}
          <div className="col-12 col-md-7">
            {/* ============ START INFO BANNER CONTENT =========== */}
            <div className="info-banner-content" data-aos="fade-left">
              <TitleSection title={title} text={description} />
              {/* ============= START APPS CONTENT INFO ============ */}
              <div className="apps-content-info">
                <h2 className="title-apps">{appsTitle}</h2>
                {/* ============== START APPS LINKS ============= */}
                <div className="apps-links d-flex align-items-center  gap-3 mt-3">
                  <a
                    href="https://apps.apple.com/us/app/atour/id6743371891"
                    target="_blank"
                    className="link-app-one"
                    rel="noreferrer"
                  >
                    <img src={appStore} alt="app store" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.app.atour"
                    target="_blank"
                    className="link-app-one"
                    rel="noreferrer"
                  >
                    <img src={appGoogle} alt="google play" />
                  </a>
                </div>
                {/* ============== END APPS LINKS ============= */}
              </div>
              {/* ============= END APPS CONTENT INFO ============ */}
            </div>
            {/* ============ END INFO BANNER CONTENT =========== */}
          </div>
          {/* ============ END COL ============ */}
          {/* ============ START COL ============ */}
          <div className="col-12 col-md-5">
            {/* =========== START IMAGE BANNER ============= */}
            <div className="image-banner-home">
              <img
                data-aos="fade-right"
                src={imageBannerHome}
                alt="imageBannerHome"
                className="object-fit-cover"
                height={"482.04px"}
                width={"399.71px"}
              />
            </div>
            {/* =========== END IMAGE BANNER ============= */}
          </div>
          {/* ============ END COL ============ */}
        </div>
        {/* =========== END ROW ========= */}
      </div>
      {/* ========== END ALL BANNER HOME ========= */}
    </div>
  );
};

export default BannerHome;
