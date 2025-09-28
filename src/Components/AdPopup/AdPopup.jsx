import React, { useState, useEffect } from "react";
import AdSwiper from "./AdSwiper";
import GeneralAPI from "../../api/generalApi";

import "swiper/css";
import "swiper/css/pagination";
import Loader from "Components/Auth/Components/Loader/Loader";

const AdPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const response = await GeneralAPI.getAds();
        setAdsData(response.data);
      } catch (err) {
        setError("Error fetching ads: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (!loading && adsData.length > 0) {
      setShowPopup(true);
    }
  }, [loading, adsData]);



  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!showPopup) {
    return null;
  }

  if (loading) {
    return <div style={{ margin: "200px 0px" }}>  <Loader /> </div>; // Or a proper loader component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ad-popup-overlay" onClick={handleOverlayClick}>
      <div className="ad-popup-content" onClick={handleContentClick}>
        <AdSwiper adImages={adsData.map((item) => item.photo)} />
        {adsData.length > 0 && (
          <>
            <h1 className="title text-white py-3">{adsData[0].title}</h1>
            <p className="text-white py-3">{adsData[0].description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdPopup;