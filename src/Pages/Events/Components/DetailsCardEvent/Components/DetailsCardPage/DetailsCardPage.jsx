import ClockIcon2 from "assets/Icons/ClockIcon2";
import DateIcon2 from "assets/Icons/DateIcon2";
import "./DetailsCardPage.css";
import { useLanguage } from "Components/Languages/LanguageContext";
import DateDisplay from "Components/DateDisplay/DateDisplay";
import CustomModal from "Components/CustomModal/CustomModal";
import EffectiveModal from "./EffectiveModel/EffectiveModal";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";

const DetailsCardPage = ({ effective }) => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="details-card-page padding-80">
      <div className="header-details-card-page d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h2 className="title">{effective?.title}</h2>
        <div className="info-right-details d-flex align-items-center gap-3">
          <div className="num-price-info">
            <span className="price-num fw-bold">
              {effective.customer_price} {currentLanguage === "ar" ? "ريال" : "SAR"}
            </span>
            / {currentLanguage === "ar" ? "للفرد" : "per person"}
          </div>
          <EffectiveModal
            effectiveId={effective.id}
            isDirectBooking={effective.pay_later <= 0}
          />
        </div>
      </div>

      <div className="date-content-info pt-3">
        {effective.from_date && (
          <div className="date-one d-flex align-items-center gap-2">
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
      </div>

      <p className="text pt-3">
        {currentLanguage === "ar" ? effective.description_ar : effective.description_en}
      </p>

      <div className="location-content-info pt-4">
        {effective.location !== null && (
          <>
            <h2 className="title pb-4">
              {currentLanguage === "ar" ? "الموقع" : "Location"}
            </h2>
            <div className="info-location box-border-circle">
              <h2 className="title-text">{effective?.title}</h2>
            </div>
          </>
        )}
        <MapLocationInfo tripData={effective} />
      </div>
    </div>
  );
};

export default DetailsCardPage;