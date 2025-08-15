import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLanguage } from 'Components/Languages/LanguageContext';
import React from 'react'

const TripRequirement = ({ tripData }) => {
    const { currentLanguage } = useLanguage(); // Get the current language

    const services = tripData.trip_requirements || [];
    return (
        <div className="why-booking-trip pt-3 margin-top-1">
            <h2 className="title">
                {currentLanguage === "ar" ? "متطلبات الرحلة" : "Trip requirement"}
            </h2>
            {/* <ReadMoreText newClass="mt-4" text={text} maxLength={120} /> */}
            <div className="list-content-info d-flex align-items-center  gap-5  flex-wrap mt-4">
                <ul className="list-one-info p-0 m-0 d-flex flex-column gap-3">
                    {services.length > 0 ? (
                        services.map((requirement, index) => (
                            <ul key={index} className="list-one-info p-0 m-0 d-flex flex-column gap-3">
                                <li className="text-title--1 d-flex align-items-center gap-2">
                                    <FontAwesomeIcon icon={faCheck} />{" "}
                                    {requirement.title}
                                </li>
                            </ul>
                        ))
                    ) : (
                        <p className="text-muted">
                            {currentLanguage === "ar"
                                ? "لا توجد ميزات مضافة لهذه الرحلة."
                                : "No requirements added for this trip."}
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TripRequirement