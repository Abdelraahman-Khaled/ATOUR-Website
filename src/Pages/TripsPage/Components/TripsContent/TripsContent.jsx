import React, { useState } from "react";
import CardsContentTrips from "./CardsContentTrips";
import FilterTripsContent from "./FilterTripsContent";
import "./TripsContent.css";

const TripsContent = ({tripsData}) => {
  // SHOW MAP LOCTION
  const [activeMap, setActiveMap] = useState(true);
  const buttonActiveMap = () => {
    setActiveMap(!activeMap);
  };
  return (
    <div className="trips-content--info">
      <FilterTripsContent activeMap={activeMap} />
      <CardsContentTrips tripsData={tripsData} buttonActiveMap={buttonActiveMap} activeMap={activeMap} />
    </div>
  );
};

export default TripsContent;
