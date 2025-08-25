import React from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import imageBannerHome from "../../../../assets/images/bannerHome/01.png";
import appStore from "../../../../assets/images/apps/appstore.svg";
import appGoogle from "../../../../assets/images/apps/googleplay.svg";
import "./BannerHome.css";
import useTranslation from "Components/Languages/useTranslation";

const BannerHome = () => {
  const { t } = useTranslation(); // Get the translation function

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
              <TitleSection title={t('homePage.bannerHome.title')} text={t('homePage.bannerHome.description')} />
              {/* ============= START APPS CONTENT INFO ============ */}
              <div className="apps-content-info">
                <h2 className="title-apps">{t('homePage.bannerHome.appsTitle')}</h2>
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
