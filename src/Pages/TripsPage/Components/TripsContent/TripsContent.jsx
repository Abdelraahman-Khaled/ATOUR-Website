import React, { useEffect, useState } from "react";
import CardsContentTrips from "./CardsContentTrips";
import FilterTripsContent from "./FilterTripsContent";
import "./TripsContent.css";
import GeneralAPI from "api/generalApi";

const TripsContent = ({ tripsData, onSelectSubCategory }) => {

  const [subCategories, setSubCategories] = useState([]);

  // getting categories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await GeneralAPI.getSubCategories();
        setSubCategories(response.data.trips);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, []);
  // SHOW MAP LOCTION
  const [activeMap, setActiveMap] = useState(false);
  const buttonActiveMap = () => {
    setActiveMap(!activeMap);
  };
  return (
    <div className="trips-content--info">
      <FilterTripsContent activeMap={activeMap} subCategories={subCategories} onSelectSubCategory={onSelectSubCategory} />
      <CardsContentTrips tripsData={tripsData} buttonActiveMap={buttonActiveMap} activeMap={activeMap} />
    </div>
  );
};

export default TripsContent;
