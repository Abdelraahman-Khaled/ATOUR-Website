import "./ContentInfoDetailsLeft.css";
import UserIcon2 from "assets/Icons/UserIcon2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalAvailableExcursionPrograms from "../../ModalsDetailsTripInfo/ModalAvailableExcursionPrograms";
import { useState } from "react";
import ModalNumberIndividuals from "../../ModalsDetailsTripInfo/ModalNumberIndividuals";
import DatePickerComponent from "Components/Ui/DatePickerComponent/DatePickerComponent";
import { useLanguage } from "Components/Languages/LanguageContext";

const ContentInfoDetailsLeft = ({ tripData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // State for showing/hiding modals
  const [showModalAvailable, setShowModalAvailable] = useState(false);
  const [showModalNumberIndividuals, setShowModalNumberIndividuals] = useState(false);

  // State for number of adults and children
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  // select the day 
  const [selectedDay, setSelectedDay] = useState(null);
  // Show/hide modals
  const buttonShowModal = () => setShowModalAvailable(true);
  const hideModalAvailable = () => setShowModalAvailable(false);
  const showModalNumberIndividualsButton = () => setShowModalNumberIndividuals(true);
  const hideModalNumberIndividuals = () => setShowModalNumberIndividuals(false);

  // Handle saving the number of adults and children
  const handleSaveIndividuals = (adults, children) => {
    setAdultsCount(adults);
    setChildrenCount(children);
    hideModalNumberIndividuals(); // Close the modal after saving
  };

  return (
    <>
      {/* Modals */}
      <ModalAvailableExcursionPrograms
        showModalAvailable={showModalAvailable}
        hideModalAvailable={hideModalAvailable}
        tripData={tripData}
        initialAdults={adultsCount} // Pass initial values
        initialChildren={childrenCount}
        selectedDay={selectedDay}
      />
      <ModalNumberIndividuals
        showModalNumberIndividuals={showModalNumberIndividuals}
        hideModalNumberIndividuals={hideModalNumberIndividuals}
        onSave={handleSaveIndividuals} // Pass the save handler
        initialAdults={adultsCount} // Pass initial values
        initialChildren={childrenCount}
      />

      {/* Main Content */}
      <div className="content-info-details-left-trip" data-aos="fade-right">
        {/* <h2 className="title">حدد التاريخ المناسب لك</h2> */}
        <div className="all-box-content-left">
          {/* Date Picker */}
          <div className="main-add-place-date main-add-place-date--1">
            <DatePickerComponent
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              addTextPlaceHolder={currentLanguage === "ar" ? "حدد تاريخ الرحلة " : "Select a trip date"} />
          </div>

          {/* Number of Individuals Box */}

          <div
            onClick={showModalNumberIndividualsButton}
            className="box-one-content cursor-pointer-event mb-3 d-flex justify-content-between align-items-center gap-2 flex-wrap"
          >
            <div className="info-box-right">
              <h2 className="title">
                {currentLanguage === "ar" ? "عدد الأفراد" : "Number of people"}
              </h2>
              <p className="text">
                {adultsCount} {currentLanguage === "ar" ? "بالغ" : "adult"} , {childrenCount} {currentLanguage === "ar" ? "أطفال" : "children"}
              </p>
            </div>
            <div className="icon-box">
              <UserIcon2 />
            </div>
          </div>

          {/* Show Available Programs Button */}
          <button className="btn-main w-100" onClick={buttonShowModal}>
            {currentLanguage === "ar" ? "إظهر البرامج المتاحة" : "Show available programs"}
          </button>

          {/* Additional Info */}
          <div className="end-info-detials">
            <div className="detials-info-one d-flex align-items-center gap-2">
              <div className="icon-check icon-check-link">
                {tripData.free_cancelation ? (
                  <div className="icon-times  icon-check-link">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                ) : (
                  <div className="icon-times bg-secondary icon-check-link">
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                )}
              </div>
              <span className="title-text">
                {currentLanguage === "ar"
                  ? "متاح إلغاء الحجز مجانا"
                  : "Free cancellation is available."}
              </span>
            </div>
            <div className="detials-info-one d-flex align-items-center gap-2">
              {tripData.pay_later ? (
                <div className="icon-times  icon-check-link">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              ) : (
                <div className="icon-times bg-secondary icon-check-link">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              )}
              <span className="title-text">
                {currentLanguage === "ar" ? "إحجز الآن إدفع لاحقا" : "Book now pay later"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentInfoDetailsLeft;