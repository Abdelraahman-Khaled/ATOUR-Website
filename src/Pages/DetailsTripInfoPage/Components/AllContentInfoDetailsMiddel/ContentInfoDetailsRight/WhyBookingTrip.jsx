import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "Components/Languages/LanguageContext";
import ReadMoreText from "Components/Ui/ReadMoreText/ReadMoreText";

const WhyBookingTrip = ({ tripData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const services = tripData.features || [];
  return (
    <div className="why-booking-trip pt-3 margin-top-1">
      <h2 className="title">
        {currentLanguage === "ar" ? "لماذا تحجز الرحلة" : "Why Book the Trip"}
      </h2>
      {/* <ReadMoreText newClass="mt-4" text={text} maxLength={120} /> */}
      <div className="list-content-info d-flex align-items-center  gap-5  flex-wrap mt-4">
        <ul className="list-one-info p-0 m-0 d-flex flex-column gap-3">
          {services.length > 0 ? (
            services.map((feature, index) => (
              <ul key={index} className="list-one-info p-0 m-0 d-flex flex-column gap-3">
                <li className="text-title--1 d-flex align-items-center gap-2 ">
                  <div className="icon-times  icon-check-link">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  {feature.title}
                </li>
              </ul>
            ))
          ) : (
            <p className="text-muted">
              {currentLanguage === "ar"
                ? "لا توجد ميزات مضافة لهذه الرحلة."
                : "No features added for this trip."}
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WhyBookingTrip;
