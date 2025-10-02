import React, { useState } from "react";
import NotificationIcon from "assets/Icons/NotificationIcon";
import "./SettingsTab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import LanguageIcon from "assets/Icons/LanguageIcon";
import TrashIcon from "assets/Icons/TrashIcon";
import ModalRemove from "Components/Ui/ModalRemove/ModalRemove";
import { useLanguage } from "Components/Languages/LanguageContext";
import LanguageSwitcher from "Components/Languages/LanguageSwitcher";
import translations from "./translations"
const SettingsTab = () => {
  // SHOW MODAL
  const [showModalRemove, setShowModalRemove] = useState(false);
  const buttonShowModal = () => {
    // ADD SHOW MODAL TRUE
    setShowModalRemove(true);
  };
  const hideShowModal = () => {
    // HIDE SHOW MODAL
    setShowModalRemove(false);
  };

  // SWITCH CURRENT LANGUAGE
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  // TRANSLATIONS


  // Language selection handled by LanguageSwitcher component

  return (
    <>
      <ModalRemove
        id={null}
        showModalPayRemove={showModalRemove}
        hideModalPayRemove={hideShowModal}
        titleModal={translations.deleteModalTitle[currentLanguage]}
        title={translations.deleteModalConfirm[currentLanguage]}
        text={translations.deleteModalText[currentLanguage]}
        reservation={null}
        refresh={undefined}
      />
      <div className="setting-tab">
        <h2 className="title title-info-top-account pb-3">
          {translations.settingsTitle[currentLanguage]}
        </h2>

        {/* ============= START ALL SETTINGS TAB =============== */}
        <div className="all-settings-tab">
          {/* ============= START INFO ONE TOP ============== */}
          {/* <div className="info-one-setting d-flex justify-content-between align-items-center gap-3 flex-wrap">
            {/* =========== START RIGHT INFO SETTINGS =========== */}
            {/* <div className="right-info-settings d-flex align-items-center gap-3"> */}
              {/* ========== START ICON SETTING ============ */}
              {/* <div className="icon-setting">
                <BellIcon />
              </div> */}
              {/* ========== END ICON SETTING ============ */}
              {/* ========== START INFO CONTENT ========== */}
              {/* <div className="info-content">
                <h2 className="title">{translations.notifications[currentLanguage]}</h2>
                <p className="text">{translations.notificationDesc[currentLanguage]}</p>
              </div> */}
              {/* ========== END INFO CONTENT ========== */}
            {/* </div> */}
            {/* =========== END RIGHT INFO SETTINGS =========== */}
            {/* <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault--1"
              />
              <label
                className="form-check-label d-none"
                htmlFor="flexSwitchCheckDefault--1"
              ></label>
            </div> */}
          {/* </div> */} 
          {/* ============= END INFO ONE TOP ============== */}
          {/* ============= START INFO ONE TOP ============== */}
          <div className="info-one-setting d-flex justify-content-between align-items-center gap-3 flex-wrap">
            {/* =========== START RIGHT INFO SETTINGS =========== */}
            <div className="right-info-settings d-flex align-items-center gap-3">
              {/* ========== START ICON SETTING ============ */}
              <div className="icon-setting">
                <LanguageSwitcher />
              </div>
              {/* ========== END ICON SETTING ============ */}
              {/* ========== START INFO CONTENT ========== */}
              <div className="info-content">
                <h2 className="title">{translations.language[currentLanguage]}</h2>
                <p className="text">
                  {currentLanguage === "ar" ? "العربية" :
                    currentLanguage === "en" ? "English" : currentLanguage.toUpperCase()}
                </p>
              </div>
              {/* ========== END INFO CONTENT ========== */}
            </div>
            {/* =========== END RIGHT INFO SETTINGS =========== */}
          </div>
          {/* ============= END INFO ONE TOP ============== */}
          <div
            className="remove-account-user d-flex align-items-center gap-3 cursor-pointer-event"
            onClick={buttonShowModal}
          >
            <TrashIcon /> {translations.deleteAccount[currentLanguage]}
          </div>
        </div>
        {/* ============= END ALL SETTINGS TAB =============== */}
      </div>
    </>
  );
};

export default SettingsTab;
