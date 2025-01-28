import React, { useEffect, useState } from "react";
import SliderEventCardDetails from "./Components/SliderEventCardDetails/SliderEventCardDetails";
import DetailsCardPage from "./Components/DetailsCardPage/DetailsCardPage";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useParams } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import LoaderSvg from "assets/Icons/LoaderSvg";
import ContentAPI from "api/contentApi";

const DetailsCardEvent = () => {
  // Extract the `id` from the URL
  const { id } = useParams();
  // language
  const { currentLanguage } = useLanguage(); // Get the current language
  // states
  const [effective, setEffective] = useState(null); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  // fetching Data
  useEffect(() => {
    const fetchEffective = async () => {
      try {
        const response = await ContentAPI.getEffectivenessById(id); // Fetch data from the API
        const data = response.data; // Extract the data from the response
        if (data) {
          setEffective(data); // Set the fetched data to state
        } else {
          setError("Effective not found."); // Handle case where the ID doesn't match any item
        }
      } catch (err) {
        console.error("Error fetching effective data:", err);
        setError("Failed to load effective data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchEffective(); // Call the API on component mount
  }, [id]); // Re-run the effect if the `id` changes

  if (loading) {
    return (
      <div className="text-center m-4">
        <span style={{ scale: "2" }}>
          <LoaderSvg />
        </span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }
  return (
    <>
      <HelmetInfo titlePage={"تفاصيل الفعاليات"} />

      <div className="details-card-event-page">
        {/* =========== START DETAILS CARD EVENT DETAILS ============= */}
        <SliderEventCardDetails image={effective}/>
        {/* =========== END DETAILS CARD EVENT DETAILS ============= */}
        {/* =========== START CONTAINER ============ */}
        <ContainerMedia>
          <DetailsCardPage effective={effective} />
        </ContainerMedia>
        {/* =========== END CONTAINER ============ */}
      </div>
    </>
  );
};

export default DetailsCardEvent;
