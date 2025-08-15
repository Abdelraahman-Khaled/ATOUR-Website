import { useLanguage } from "Components/Languages/LanguageContext";
import React, { useState, useEffect } from "react";

// Convert numbers to Arabic numerals
const convertToArabicNumbers = (number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(d => arabicDigits[d] || d).join('');
};

// Translated time units
const timeUnits = {
    en: {
        year: (n) => `${n} year${n > 1 ? 's' : ''}`,
        month: (n) => `${n} month${n > 1 ? 's' : ''}`,
        day: (n) => `${n} day${n > 1 ? 's' : ''}`,
        hour: (n) => `${n} hour${n > 1 ? 's' : ''}`,
        since: "Since"
    },
    ar: {
        year: (n) => `${convertToArabicNumbers(n)} سنة${n > 2 ? '' : n === 2 ? "ين" : n === 1 ? "" : "ات"}`,
        month: (n) => `${convertToArabicNumbers(n)} شهر${n > 2 ? '' : n === 2 ? "ين" : n === 1 ? "" : "ات"}`,
        day: (n) => `${convertToArabicNumbers(n)} يوم${n > 2 ? '' : n === 2 ? "ين" : n === 1 ? "" : "ًا"}`,
        hour: (n) => `${convertToArabicNumbers(n)} ساعة${n > 2 ? '' : n === 2 ? "ين" : n === 1 ? "" : "ات"}`,
        since: "منذ"
    }
};

// Utility function to calculate time difference with translation
const calculateTimeGap = (createdAt, language) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const differenceInMs = now - createdDate;

    const years = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));

    const t = timeUnits[language];

    if (years > 0) return t.year(years);
    if (months > 0) return t.month(months);
    if (days > 0) return t.day(days);
    return t.hour(hours);
};

// TimeGapCalculator component
const TimeGapCalculator = ({ createdAt }) => {
    const { currentLanguage } = useLanguage();
    const [timeGap, setTimeGap] = useState("");

    useEffect(() => {
        const gap = calculateTimeGap(createdAt, currentLanguage);
        setTimeGap(gap);
    }, [createdAt, currentLanguage]);

    return (
        <div>
            <p>{timeUnits[currentLanguage].since} {timeGap}</p>
        </div>
    );
};

export default TimeGapCalculator;
