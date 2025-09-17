import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { ClockIcon } from "@mui/x-date-pickers";
import UserIcon2 from "assets/Icons/UserIcon2";
import './BoxOneContent.css'
import { Avatar, AvatarGroup } from "@mui/material";
// import image1 from "../../../../../assets/images/users/01.png";
// import image2 from "../../../../../assets/images/users/02.png";
// import image3 from "../../../../../assets/images/users/03.png";
// import image4 from "../../../../../assets/images/users/04.png";
import ModalProviderInformation from "../../ModalsDetailsTripInfo/ModalProviderInformation/ModalProviderInformation";
import { useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";



const languageNames = {
  en: {
    en: "English",
    ar: "الإنجليزية",
    fr: "Anglais",
    de: "Englisch",
    es: "Inglés",
    tr: "İngilizce",
    ru: "Английский",
    zh: "英语",
    ko: "영어",
    pt: "Inglês",
    ur: "انگریزی",
    ja: "英語",
  },
  ar: {
    en: "Arabic",
    ar: "العربية",
    fr: "Arabe",
    de: "Arabisch",
    es: "Árabe",
    tr: "Arapça",
    ru: "Арабский",
    zh: "阿拉伯语",
    ko: "아랍어",
    pt: "Árabe",
    ur: "عربی",
    ja: "アラビア語",
  },
  fr: {
    en: "French",
    ar: "الفرنسية",
    fr: "Français",
    de: "Französisch",
    es: "Francés",
    tr: "Fransızca",
    ru: "Французский",
    zh: "法语",
    ko: "프랑스어",
    pt: "Francês",
    ur: "فرانسیسی",
    ja: "フランス語",
  },
  de: {
    en: "German",
    ar: "الألمانية",
    fr: "Allemand",
    de: "Deutsch",
    es: "Alemán",
    tr: "Almanca",
    ru: "Немецкий",
    zh: "德语",
    ko: "독일어",
    pt: "Alemão",
    ur: "جرمن",
    ja: "ドイツ語",
  },
  es: {
    en: "Spanish",
    ar: "الإسبانية",
    fr: "Espagnol",
    de: "Spanisch",
    es: "Español",
    tr: "İspanyolca",
    ru: "Испанский",
    zh: "西班牙语",
    ko: "스페인어",
    pt: "Espanhol",
    ur: "ہسپانوی",
    ja: "スペイン語",
  },
  tr: {
    en: "Turkish",
    ar: "التركية",
    fr: "Turc",
    de: "Türkisch",
    es: "Turco",
    tr: "Türkçe",
    ru: "Турецкий",
    zh: "土耳其语",
    ko: "터키어",
    pt: "Turco",
    ur: "ترکی",
    ja: "トルコ語",
  },
  ru: {
    en: "Russian",
    ar: "الروسية",
    fr: "Russe",
    de: "Russisch",
    es: "Ruso",
    tr: "Rusça",
    ru: "Русский",
    zh: "俄语",
    ko: "러시아어",
    pt: "Russo",
    ur: "روسی",
    ja: "ロシア語",
  },
  zh: {
    en: "Chinese",
    ar: "الصينية",
    fr: "Chinois",
    de: "Chinesisch",
    es: "Chino",
    tr: "Çince",
    ru: "Китайский",
    zh: "中文",
    ko: "중국어",
    pt: "Chinês",
    ur: "چینی",
    ja: "中国語",
  },
  ko: {
    en: "Korean",
    ar: "الكورية",
    fr: "Coréen",
    de: "Koreanisch",
    es: "Coreano",
    tr: "Korece",
    ru: "Корейский",
    zh: "韩语",
    ko: "한국어",
    pt: "Coreano",
    ur: "کوریائی",
    ja: "韓国語",
  },
  pt: {
    en: "Portuguese",
    ar: "البرتغالية",
    fr: "Portugais",
    de: "Portugiesisch",
    es: "Portugués",
    tr: "Portekizce",
    ru: "Португальский",
    zh: "葡萄牙语",
    ko: "포르투갈어",
    pt: "Português",
    ur: "پرتگالی",
    ja: "ポルトガル語",
  },
  ur: {
    en: "Urdu",
    ar: "الأوردية",
    fr: "Ourdou",
    de: "Urdu",
    es: "Urdu",
    tr: "Urduca",
    ru: "Урду",
    zh: "乌尔都语",
    ko: "우르두어",
    pt: "Urdu",
    ur: "اردو",
    ja: "ウルドゥー語",
  },
  ja: {
    en: "Japanese",
    ar: "اليابانية",
    fr: "Japonais",
    de: "Japanisch",
    es: "Japonés",
    tr: "Japonca",
    ru: "Японский",
    zh: "日语",
    ko: "일본어",
    pt: "Japonês",
    ur: "جاپانی",
    ja: "日本語",
  },
};



const BoxOneContent = ({ tripData }) => {
  console.log("box", tripData);

  const { currentLanguage } = useLanguage(); // Get the current language
  // SHOW MODAL DETAILS
  const [showModalProviderInformation, setShowModalProviderInformation] =
    useState(false);
  const buttonShow = () => {
    setShowModalProviderInformation(true);
  };
  const buttonHide = () => {
    setShowModalProviderInformation(false);
  };

  return (
    <>
      <ModalProviderInformation
        showModalProviderInformation={showModalProviderInformation}
        hideModalProviderInformation={buttonHide}
      />
      <div className="box-info-one-content">
        {/* ============= START HEADER TOP CONTENT ============= */}
        <div
          onClick={buttonShow}
          className="header-top-content-box d-flex justify-content-between align-items-center gap-2 flex-wrap"
        >
          <div className="company-info d-flex align-items-center gap-2">
            <div className="img-company">
              <img src={tripData.vendor.image} alt="img" />
            </div>
            <div className="info-details-company">
              <h2 className="title">{tripData.vendor.name}</h2>
              {/* <div className="rate-info d-flex align-items-center gap-2 mt-1">
                <div className="icon-star rate-star-icon">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                4.5 {currentLanguage === "ar" ? "تقييم" : "Rate"}
              </div> */}
            </div>
          </div>
          <div className="available-title d-flex align-items-center gap-2">
            <div className="icon-clock">
              {tripData.active === 1 ? < FontAwesomeIcon icon={faClock} /> :
                <FontAwesomeIcon icon={faClock} style={{ color: "gray" }} />}
            </div>
            {tripData.active ? <span className="text p-0 m-0 text-decoration-underline">{currentLanguage === "ar" ? "متاح" : "Available"}</span>
              :
              <span className="text p-0 m-0 text-decoration-underline text-secondary">{currentLanguage === "ar" ? "غير متاح" : "Unavailable"}</span>
            }
          </div>
        </div>
        {/* ============= END HEADER TOP CONTENT ============= */}
        {/* ============= START BOX MIDDEL CONTENT =========== */}
        <div className="box-middel-content mt-3">
          <h2 className="title mb-4">{tripData.title}</h2>
          <p className="text favDev" dangerouslySetInnerHTML={{ __html: tripData.description }}>
          </p>
          {/* <div className="main-info-avatar mt-2 d-flex align-items-center gap-4 flex-wrap">
            <AvatarGroup
              renderSurplus={(surplus) => (
                <span>{surplus.toString()[0]}K+</span>
              )}
              total={8000}
              className="all-avatar"
            >
              <Avatar alt="Remy Sharp" src={image1} className="avatar-1" />
              <Avatar alt="Remy Sharp" src={image2} className="avatar-1" />
              <Avatar alt="Remy Sharp" src={image3} className="avatar-1" />
              <Avatar alt="Remy Sharp" src={image4} className="avatar-1" />
            </AvatarGroup>
            <h2 className="text-title">أكثر من 700.00 شخص يثق بجولة</h2>
          </div> */}
        </div>
        {/* ============= END BOX MIDDEL CONTENT =========== */}
        {/* ============= START END BOX CONTENT ============ */}
        <div className="end-box-content mt-3">
          <h2 className="title">{currentLanguage === "ar" ? "برامج الرحلة" : "Trip Programs"}</h2>
          <div className="content-box-one--1 d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <div className="info-right--1 d-flex align-items-center gap-2">
              <ClockIcon />
              <p className="text">{currentLanguage === "ar" ? "وقت البرنامج" : "Program time"}</p>
            </div>
            <p className="text">{tripData.program_time}</p>
          </div>
          <div className="content-box-one--1 d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <div className="info-right--1 d-flex align-items-center gap-2">
              <UserIcon2 />
              <p className="text">{currentLanguage === "ar" ? "عدد المسافرين" : "Number of passengers"}</p>
            </div>
            <p className="text"> {tripData.group_count} {currentLanguage === "ar" ? "فرد" : "Person"}</p>
          </div>
          <div className="content-box-one--1 d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <div className="info-right--1 d-flex align-items-center gap-2">
              <UserIcon2 />
              <p className="text">{currentLanguage === "ar" ? "لغات الارشاد" : "guide languages"}</p>
            </div>
            <p className="text">
              {tripData.guide_languages.map((lang) => (
                <span key={lang} className="me-2">
                  {languageNames[lang]?.[currentLanguage] || lang}
                </span>
              ))}
            </p>
          </div>
        </div>
        {/* ============= END END BOX CONTENT ============ */}
      </div>
    </>
  );
};

export default BoxOneContent;
