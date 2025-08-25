import React, { useState, useEffect } from "react";
import AdSwiper from "./AdSwiper";

import "swiper/css";
import "swiper/css/pagination";

const AdPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true); // Simulate loading state

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowPopup(true);
    }
  }, [loading]);

  const adImages = [
    require("../../assets/images/popupAds/ads(1).png"),
    require("../../assets/images/popupAds/ads(2).png"),
    require("../../assets/images/popupAds/ads(3).png"),
  ];

  if (!showPopup) {
    return null;
  }

  return (
    <div className="ad-popup-overlay">
      <div className="ad-popup-content">
        <button className="ad-popup-close" onClick={() => setShowPopup(false)}>
          &times;
        </button>
        <h1>Atour Company</h1>
        <AdSwiper adImages={adImages} />
        <button className="ad-popup-button">Learn More</button>
      </div>
    </div>
  );
};

export default AdPopup;