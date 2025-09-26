import React, { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import GeneralAPI from "api/generalApi";

const WhyBookingAtour = () => {
  const { currentLanguage } = useLanguage();
  const [whyBookings, setWhyBookings] = useState([]);

  useEffect(() => {
    const fetchWhyBookings = async () => {
      try {
        const response = await GeneralAPI.getWhyBookings()
        if (response.success && response.data.length > 0) {
          setWhyBookings(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching why bookings:", error);
      }
    };
    fetchWhyBookings();
  }, []);

  const getTranslatedContent = (item, key) => {
    if (!item || !item.translations) return "";
    const translation = item.translations.find(
      (t) => t.locale === currentLanguage
    );
    return translation ? translation[key] : item[key];
  };

  const title = getTranslatedContent(whyBookings, "title");
  const description = getTranslatedContent(whyBookings, "description");

  return (
    <div className="all-text-content-info margin-top-1 d-flex flex-column gap-3">
      {title && <h2 className="title">{title}</h2>}
      {description && (
        <div className="list-content-info d-flex align-items-center gap-5 flex-wrap mt-1">
          <ul className="list-one-info p-0 m-0 d-flex flex-column gap-3">
            {description.split(/\r\n|\n/).map((item, index) => (
              <li key={index} className="text-title--1 d-flex align-items-center gap-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WhyBookingAtour;