// import videoSrc from "../../../../assets/images/videos/01.mp4";
import { useLanguage } from "Components/Languages/LanguageContext";
import "./SliderHeader.css";

const SliderHeader = ({ biography }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const description = currentLanguage === "en" ? biography.description_en : biography.description_ar;

  return (
    <>
      <div className="banner-main-area--1">
        <div className="banner-one section-padding bg-image">
          <div className="video-bg overlay-bg">
            {/* <video
              autoPlay
              className="video-src"
              loop
              muted
              // @ts-ignore
              playsInline=""
              preload="auto"
              poster={biography.photo}
            >
              <source src={videoSrc} type="video/mp4" />
            </video> */}
            <img className="w-100 cover h-100" src={biography.photo} alt="cover-photo" />
          </div>
          <div className="info-banner position-relative z-1">
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-12">
                <div className="content-slide">
                  <h1 className="title" data-aos="fade-down">
                    {currentLanguage === "ar" ? "مرحبا بكم في " + biography.title_ar : "Welcome to " + biography.title_en}
                  </h1>
                  <p
                    className="text text-font-400-white font-18"
                    data-aos="fade-up"
                    dangerouslySetInnerHTML={{ __html: description }}
                  >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderHeader;
