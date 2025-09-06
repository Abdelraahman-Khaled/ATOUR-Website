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

  return (
    <div className="ad-popup-overlay" onClick={handleOverlayClick}>
      <div className="ad-popup-content" onClick={handleContentClick}>
        <AdSwiper adImages={adImages} />
        <p className="text-white py-3">Atour Company</p>
      </div>
    </div>
  );
};

export default AdPopup;