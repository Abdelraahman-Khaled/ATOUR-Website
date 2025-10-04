// import videoSrc from "../../../../assets/images/videos/01.mp4";
import { useLanguage } from "Components/Languages/LanguageContext";
import "./SliderHeader.css";

const SliderHeader = ({ biography }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  const welcomeTranslations = {
    en: "Welcome to ",
    ar: "مرحبا بكم في ",
    fr: "Bienvenue à ",
    de: "Willkommen bei ",
    es: "Bienvenido a ",
    tr: "Hoşgeldiniz ",
    ru: "Добро пожаловать в ",
    zh: "欢迎来到 ",
    ko: "환영합니다 ",
    pt: "Bem-vindo a ",
    ur: "خوش آمدید ",
    ja: "ようこそ ",
  };

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
            <img className="w-100 cover h-100" src={biography.image} alt="cover-photo" />
          </div>
          <div className="info-banner position-relative z-1">
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-12">
                <div className="content-slide">
                  <h1 className="title" data-aos="fade-down">
                    {welcomeTranslations[currentLanguage] || welcomeTranslations.en}
                    {biography.title}
                  </h1>
                  <p
                    className="text text-font-400-white font-18 favDev"
                    data-aos="fade-up"
                  >
                    {biography.description}
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
