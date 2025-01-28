import React, { useEffect, useState } from "react";
import SliderOffers from "./Components/SliderOffers/SliderOffers";
import OffersContent from "./Components/OffersContent/OffersContent";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./Offers.css"
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import ContentAPI from "api/contentApi";
import LoaderSvg from "assets/Icons/LoaderSvg";
import { useLanguage } from "Components/Languages/LanguageContext";
const Offers = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // fetching states
  const [gifts, setGifts] = useState([]); // State to store home data
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetching Data
  useEffect(() => {
    const fetchGiftsData = async () => {
      try {
        const data = await ContentAPI.getGifts(currentLanguage); // Fetch data from the API
        setGifts(data.data); // Set the fetched data to 
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError("Failed to load home data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    fetchGiftsData(); // Call the API on component mount
  }, [currentLanguage]);

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
  console.log("gifts:", gifts);
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "الهدايا" : "Gifts"} />

      <div className="offers-page">
        <header>
          <SliderOffers />
        </header>
        <main>
          {/* ============== START CONTAINER ============== */}
          <ContainerMedia>
            <OffersContent gifts={gifts} />
          </ContainerMedia>
          {/* ============== END CONTAINER ============== */}
        </main>
      </div>
    </>
  );
};

export default Offers;
