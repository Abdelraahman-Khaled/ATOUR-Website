import "./ContentInfoDetailsLeft.css";
import UserIcon2 from "assets/Icons/UserIcon2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalAvailableExcursionPrograms from "../../ModalsDetailsTripInfo/ModalAvailableExcursionPrograms";
import { useState } from "react";
import ModalNumberIndividuals from "../../ModalsDetailsTripInfo/ModalNumberIndividuals";
import DatePickerComponent from "Components/Ui/DatePickerComponent/DatePickerComponent";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useBooking } from "context/BookingContext";
import { useEffect } from "react";
import { content } from "./trasnslates"
import { toast } from "react-toastify";
import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";

const ContentInfoDetailsLeft = ({ tripData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { selectedDate, setSelectedDate, numberOfPeople, setNumberOfPeople } = useBooking();


  useEffect(() => {
    if (tripData) {
      if (tripData.is_group === 1) {
        setNumberOfPeople(tripData.group_count);
      } else if (tripData.min_people) {
        setNumberOfPeople(1);
      }
    }
  }, [tripData, setNumberOfPeople]);
  // State for showing/hiding modals
  const [showModalAvailable, setShowModalAvailable] = useState(false);
  const [showModalNumberIndividuals, setShowModalNumberIndividuals] = useState(false);

  // State for number of adults and children
  // const [adultsCount, setAdultsCount] = useState(tripData.min_people);
  const [childrenCount, setChildrenCount] = useState(0);

  // select the day 
  // const [selectedDay, setSelectedDay] = useState(null);
  // Show/hide modals
  const buttonShowModal = () => setShowModalAvailable(true);
  const hideModalAvailable = () => setShowModalAvailable(false);
  const showModalNumberIndividualsButton = () => setShowModalNumberIndividuals(true);
  const hideModalNumberIndividuals = () => {
    setShowModalNumberIndividuals(false);
  };

  // Handle saving the number of adults and children
  const handleSaveIndividuals = (adults) => {
    setNumberOfPeople(adults);
    hideModalNumberIndividuals(); // Close the modal after saving
  };

  // State for auth modal
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Helper to check auth and show modal if needed
  const handleRestrictedAction = (action) => {
    if (isAuthenticated()) {
      action();
    } else {
      toast.error(content[currentLanguage].pleaseLogin);
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <FormAuth showModalForm={showAuthModal} hideModalForm={() => setShowAuthModal(false)} />

      {/* Modals */}
      <ModalAvailableExcursionPrograms
        showModalAvailable={showModalAvailable}
        hideModalAvailable={hideModalAvailable}
        tripData={tripData}
        initialChildren={childrenCount}
      />
      {tripData.is_group !== 1 && (
        <ModalNumberIndividuals
          showModalNumberIndividuals={showModalNumberIndividuals}
          hideModalNumberIndividuals={hideModalNumberIndividuals}
          onSave={handleSaveIndividuals} // Pass the save handler
          initialAdults={numberOfPeople} // Pass initial values
          tripData={tripData}
        />
      )}

      {/* Main Content */}
      <div className="content-info-details-left-trip" data-aos="fade-right">
        <div className="all-box-content-left">
          {/* Date Picker */}

          <div
            className="main-add-place-date main-add-place-date--1 mb-3"
            onClickCapture={(e) => {
              if (!isAuthenticated()) {
                e.preventDefault();
                e.stopPropagation();
                toast.error(content[currentLanguage].pleaseLogin);
                setShowAuthModal(true);
              }
            }}
          >
            <DatePickerComponent
              selectedDay={selectedDate}
              setSelectedDay={setSelectedDate}
              addTextPlaceHolder={content[currentLanguage].selectDate}
              disabled={!isAuthenticated()} // Pass disabled prop if supported, or rely on capture
            />
          </div>

          {/* Number of Individuals Box */}
          {tripData.is_group === 0 && (
            <div
              onClick={() => handleRestrictedAction(showModalNumberIndividualsButton)}
              className="box-one-content cursor-pointer-event mb-3 d-flex justify-content-between align-items-center gap-2 flex-wrap"
            >
              <div className="info-box-right">
                <h2 className="title">
                  {content[currentLanguage].numberOfPeople}
                </h2>
                <p className="text">
                  {numberOfPeople} {content[currentLanguage].people}
                </p>
              </div>
              <div className="icon-box">
                <UserIcon2 />
              </div>
            </div>
          )}

          {/* Show Available Programs Button */}
          <button className="btn-main w-100" onClick={() => handleRestrictedAction(buttonShowModal)}>
            {content[currentLanguage].showPrograms}
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
                  <div className="icon-times bg-secondary icon-check-link ">
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                )}
              </div>
              <span className="title-text">
                {content[currentLanguage].freeCancel}
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
                {content[currentLanguage].payLater}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentInfoDetailsLeft;