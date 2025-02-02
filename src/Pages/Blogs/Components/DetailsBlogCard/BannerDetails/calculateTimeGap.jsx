import { useLanguage } from "Components/Languages/LanguageContext";
import React, { useState, useEffect } from "react";

// Utility function to calculate time difference
const calculateTimeGap = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);

    // Calculate the time difference in milliseconds
    const differenceInMs = now - createdDate;

    // Calculate the difference in hours, days, months, and years
    const years = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''}`;
    }
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''}`;
};

// TimeGapCalculator component
const TimeGapCalculator = ({ createdAt }) => {
    const { currentLanguage } = useLanguage(); // Get the current language

    const [timeGap, setTimeGap] = useState("");

    useEffect(() => {
        const gap = calculateTimeGap(createdAt);
        setTimeGap(gap);
    }, [createdAt]);

    return (
        <div>
            <p>{currentLanguage === "ar" ? "منذ" : "Since"} {timeGap}</p>
        </div>
    );
};

export default TimeGapCalculator;
