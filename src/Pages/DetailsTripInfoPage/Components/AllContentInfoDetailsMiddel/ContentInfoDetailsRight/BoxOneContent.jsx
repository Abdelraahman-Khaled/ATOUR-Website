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

import enFlag from "assets/images/flags/en.svg";
import arFlag from "assets/images/flags/ar.svg";
import frFlag from "assets/images/flags/fr.svg";
import deFlag from "assets/images/flags/de.svg";
import esFlag from "assets/images/flags/es.svg";
import trFlag from "assets/images/flags/tr.svg";
import ruFlag from "assets/images/flags/ru.svg";
import zhFlag from "assets/images/flags/zh.svg";
import koFlag from "assets/images/flags/ko.svg";
import ptFlag from "assets/images/flags/pt.svg";
import urFlag from "assets/images/flags/ur.svg";
import jaFlag from "assets/images/flags/ja.svg";
import sgnFlag from "assets/images/flags/sgn.svg";

import GroupOrIndividual from "Components/groupCount/GroupOrIndividual";

const languageFlags = {
  en: enFlag,
  ar: arFlag,
  fr: frFlag,
  de: deFlag,
  es: esFlag,
  tr: trFlag,
  ru: ruFlag,
  zh: zhFlag,
  ko: koFlag,
  pt: ptFlag,
  ur: urFlag,
  ja: jaFlag,
  sgn: sgnFlag,
};
const translations = {
  ar: "لغات الإرشاد",
  en: "Guide Languages",
  fr: "Langues de guide",
  de: "Führersprachen",
  es: "Idiomas del guía",
  tr: "Rehber Dilleri",
  ru: "Языки гида",
  zh: "导游语言",
  ko: "가이드 언어",
  pt: "Idiomas do guia",
  ur: "رہنما کی زبانیں",
  ja: "ガイドの言語",
};



const BoxOneContent = ({ tripData }) => {

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
              <p className="text">
                <GroupOrIndividual isGroup={tripData.group_count > 0} />
              </p>
            </div>
            <p className="text">
              <GroupOrIndividual isGroup={tripData.group_count > 0} />
              {tripData.group_count > 0 && ` (${tripData.group_count})`}
            </p>
          </div>
          <div className="content-box-one--1 d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <div className="info-right--1 d-flex align-items-center gap-2">
              <UserIcon2 />
              <p className="text">{translations[currentLanguage] || "guide languages"}</p>
            </div>
            <p className="text d-flex flex-wrap gap-2">
              {tripData.guide_languages.map((lang) => (
                <span key={lang} className="me-2 d-flex align-items-center">
                  <img
                    src={languageFlags[lang]}
                    alt={lang}
                    style={{ width: "24px", height: "16px" }}
                  />
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
