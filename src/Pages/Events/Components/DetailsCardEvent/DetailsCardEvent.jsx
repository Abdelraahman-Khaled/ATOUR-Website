import React, { useEffect, useState } from "react";
import SliderEventCardDetails from "./Components/SliderEventCardDetails/SliderEventCardDetails";
import DetailsCardPage from "./Components/DetailsCardPage/DetailsCardPage";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContentAPI from "api/contentApi";
import Loader from "Components/Auth/Components/Loader/Loader";

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
        const response = await ContentAPI.getEffectivenessById(id, currentLanguage); // Fetch data from the API
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
  }, [id, currentLanguage]); // Re-run the effect if the `id` changes

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }


  if (!effective) {
    return <>
      <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
        {currentLanguage === "ar" ? " هذه الفعالية غير متوافرة" : "This effective not available"}
        <Link
          to="/"
          className="fs-6 fw-medium text-danger text-decoration-underline px-2"
        >
          {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
        </Link>
      </p>
    </>;
  }

  if (error) {
    return <>
      <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
        {currentLanguage === "ar" ? " تفاصيل الفعالية غير متوافرة" : "Effective details not available"}
        <Link
          to="/"
          className="fs-6 fw-medium text-danger text-decoration-underline px-2"
        >
          {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
        </Link>
      </p>
    </>;
  }

  return (
    <>
      <HelmetInfo titlePage={"تفاصيل الفعاليات"} />

      <div className="details-card-event-page">
        {/* =========== START DETAILS CARD EVENT DETAILS ============= */}
        <SliderEventCardDetails image={effective} />
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
