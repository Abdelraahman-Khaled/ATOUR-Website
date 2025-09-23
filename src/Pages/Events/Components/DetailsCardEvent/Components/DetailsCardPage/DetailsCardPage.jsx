import ClockIcon2 from "assets/Icons/ClockIcon2";
import DateIcon2 from "assets/Icons/DateIcon2";
import "./DetailsCardPage.css";
import { useLanguage } from "Components/Languages/LanguageContext";
import DateDisplay from "Components/DateDisplay/DateDisplay";
import CustomModal from "Components/CustomModal/CustomModal";
import EffectiveModal from "./EffectiveModel/EffectiveModal";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";
import ModalNumberIndividuals from "Pages/DetailsTripInfoPage/Components/ModalsDetailsTripInfo/ModalNumberIndividuals";
import { useEffect, useState } from "react";
import { useBooking } from "context/BookingContext";
import UserIcon2 from "assets/Icons/UserIcon2";
import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import BoxOneContent from "Pages/DetailsTripInfoPage/Components/AllContentInfoDetailsMiddel/ContentInfoDetailsRight/BoxOneContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTicket, faTimes } from "@fortawesome/free-solid-svg-icons";
import Ticket from "assets/images/IconsHeader/Ticket";
import translations from './translates'

const DetailsCardPage = ({ effective }) => {
  const { currentLanguage } = useLanguage();
  const [showModalNumberIndividuals, setShowModalNumberIndividuals] = useState(false);
  const { selectedDate, setSelectedDate, numberOfPeople, setNumberOfPeople } = useBooking();
  const showModalNumberIndividualsButton = () => setShowModalNumberIndividuals(true);

  useEffect(() => {
    if (effective) {
      if (effective.is_group === 1) {
        setNumberOfPeople(effective.group_count);
      } else if (effective.min_people) {
        setNumberOfPeople(effective.min_people);
      }
    }
  }, [effective, setNumberOfPeople]);



  const hideModalNumberIndividuals = () => {
    setShowModalNumberIndividuals(false);
  };
  const handleSaveIndividuals = (adults) => {
    setNumberOfPeople(adults);
    hideModalNumberIndividuals(); // Close the modal after saving
  };

  console.log("Effective data:", effective);
  console.log("effective.is_group:", effective?.is_group);

  return (
    <>
      <div className="details-card-page ">
        <ModalNumberIndividuals
          showModalNumberIndividuals={showModalNumberIndividuals}
          hideModalNumberIndividuals={hideModalNumberIndividuals}
          onSave={handleSaveIndividuals} // Pass the save handler
          initialAdults={numberOfPeople} // Pass initial values
          tripData={effective}
        />

        <div>
          <h2 className="title mb-2">{effective?.title}</h2>
          <p className="text mb-4">{effective.description}</p>
          <div className="num-price-info w-100 d-flex gap-1 justify-content-between mb-4">
            <div className="date-content-info ">
              {effective.from_date && (
                <div className="date-one d-flex align-items-center gap-2 mb-2">
                  <DateIcon2 />
                  <DateDisplay from_date={effective.from_date} />
                </div>
              )}
              {effective.from_time > 0 && (
                <div className="date-one pt-2 d-flex align-items-center gap-2">
                  <ClockIcon2 />
                  {effective.from_time.slice(0, -3)}
                </div>
              )}

              <FontAwesomeIcon icon={faTicket} />  {translations[currentLanguage].bookingsCount} {effective.booking_count}
            </div>
            <span className="price-num ">
              <CurrencyDisplay price={effective.customer_price} />
              / {effective.is_group ? translations[currentLanguage].group : translations[currentLanguage].individual}
            </span>

          </div>
        </div>
        <div className="overflow-hidden border rounded rounded-2 col-12">
          <SwiperSlider
            itemsSlider={effective.attachments}
            sliderNewClass={"slider-height slider-details-right  "}
          ></SwiperSlider>
        </div>
        <div className="all-content-info-details-right d-flex align-items-start gap-2 my-4 flex-column flex-lg-row" data-aos="fade-left">
          <div className="col-12 col-lg-8">
            <BoxOneContent tripData={effective} />
          </div>
          <div className="content-info-details-left-trip aos-init aos-animate col-12 col-lg-4 mt-3 mt-lg-0">
            {effective.is_group == 0 && (
              <div
                onClick={showModalNumberIndividualsButton}
                className="box-one-content cursor-pointer-event mb-3 d-flex justify-content-between align-items-center gap-2 flex-wrap"
              >
                <div className="info-box-right">
                  <h2 className="title">
                    {translations[currentLanguage].numberOfPeople}
                  </h2>
                  <p className="text">
                    {numberOfPeople} {translations[currentLanguage].people}
                  </p>
                </div>
                <div className="icon-box">
                  <UserIcon2 />
                </div>
              </div>
            )}
            <EffectiveModal
              effectiveId={effective.id}
              isDirectBooking={effective.pay_later <= 0}
            />
            <div className="end-info-detials">
              <div className="detials-info-one d-flex align-items-center gap-2">
                <div className="icon-check icon-check-link">
                  {effective.free_cancelation ? (
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
                  {translations[currentLanguage].freeCancelation}
                </span>
              </div>
              <div className="detials-info-one d-flex align-items-center gap-2">
                {effective.pay_later ? (
                  <div className="icon-times  icon-check-link">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                ) : (
                  <div className="icon-times bg-secondary icon-check-link">
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                )}
                <span className="title-text">
                  {translations[currentLanguage].bookNowPayLater}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="info-right-details d-flex align-items-center gap-3 flex-column flex-md-row">
          {/* pick numbers */}

          {/* buy button */}

          <div className="location-content-info pt-4 w-100">

            <MapLocationInfo tripData={effective} />
          </div>
        </div>
        {/* location */}

      </div>







    </>
  );
};

export default DetailsCardPage;