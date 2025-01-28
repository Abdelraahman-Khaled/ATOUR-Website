import React, { useState } from "react";

const MapLocationInfo = ({ tripData }) => {
  return (
    <>
      {/* ============== START GOOGLE MAP ============= */}
      <div className="google-map mt-4">
        <iframe
          style={{
            height: "400px",
            width: "100%",
            border: 0,
            borderRadius: "12px",
          }}
          className="iframe-map"
          frameBorder={0}
          src={
            tripData?.lat && tripData?.long
              ? `https://www.google.com/maps/embed/v1/place?q=${tripData.lat},${tripData.long}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
              : tripData?.start_lat && tripData?.start_long && tripData?.end_lat && tripData?.end_long
                ? `https://www.google.com/maps/embed/v1/directions?origin=${tripData.start_lat},${tripData.start_long}&destination=${tripData.end_lat},${tripData.end_long}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
                : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2223493.47904912!2d46.17788591953957!3d23.754085971515458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2seg!4v1737953063927!5m2!1sen!2seg`
          }
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {/* ============== END GOOGLE MAP ============= */}
    </>
  );
};

export default MapLocationInfo;
