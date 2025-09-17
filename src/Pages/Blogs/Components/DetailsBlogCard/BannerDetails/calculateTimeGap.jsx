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
    },
    tr: {
        year: (n) => `${n} yıl${n > 1 ? 'lar' : ''}`,
        month: (n) => `${n} ay${n > 1 ? 'lar' : ''}`,
        day: (n) => `${n} gün${n > 1 ? 'ler' : ''}`,
        hour: (n) => `${n} saat${n > 1 ? 'ler' : ''}`,
        since: "Önce"
    },
    fr: {
        year: (n) => `${n} an${n > 1 ? 's' : ''}`,
        month: (n) => `${n} moi${n > 1 ? 's' : ''}`,
        day: (n) => `${n} jour${n > 1 ? 's' : ''}`,
        hour: (n) => `${n} heure${n > 1 ? 's' : ''}`,
        since: "Depuis"
    },
    de: {
        year: (n) => `${n} Jahr${n > 1 ? 'e' : ''}`,
        month: (n) => `${n} Monat${n > 1 ? 'e' : ''}`,
        day: (n) => `${n} Tag${n > 1 ? 'e' : ''}`,
        hour: (n) => `${n} Stunde${n > 1 ? 'n' : ''}`,
        since: "Seit"
    },
    es: {
        year: (n) => `${n} año${n > 1 ? 's' : ''}`,
        month: (n) => `${n} mes${n > 1 ? 'es' : ''}`,
        day: (n) => `${n} día${n > 1 ? 's' : ''}`,
        hour: (n) => `${n} hora${n > 1 ? 's' : ''}`,
        since: "Desde"
    },
    ru: {
        year: (n) => `${n} год${n > 1 ? 'а' : ''}`,
        month: (n) => `${n} месяц${n > 1 ? 'а' : ''}`,
        day: (n) => `${n} день${n > 1 ? 'я' : ''}`,
        hour: (n) => `${n} час${n > 1 ? 'а' : ''}`,
        since: "С"
    },
    zh: {
        year: (n) => `${n} 年`,
        month: (n) => `${n} 月`,
        day: (n) => `${n} 天`,
        hour: (n) => `${n} 小时`,
        since: "自"
    },
    ko: {
        year: (n) => `${n} 년`,
        month: (n) => `${n} 개월`,
        day: (n) => `${n} 일`,
        hour: (n) => `${n} 시간`,
        since: "부터"
    },
    pt: {
        year: (n) => `${n} ano${n > 1 ? 's' : ''}`,
        month: (n) => `${n} mês${n > 1 ? 'es' : ''}`,
        day: (n) => `${n} dia${n > 1 ? 's' : ''}`,
        hour: (n) => `${n} hora${n > 1 ? 's' : ''}`,
        since: "Desde"
    },
    ur: {
        year: (n) => `${n} سال`,
        month: (n) => `${n} مہینہ`,
        day: (n) => `${n} دن`,
        hour: (n) => `${n} گھنٹہ`,
        since: "کے بعد"
    },
    ja: {
        year: (n) => `${n} 年`,
        month: (n) => `${n} ヶ月`,
        day: (n) => `${n} 日`,
        hour: (n) => `${n} 時間`,
        since: "以来"
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
            <p>{timeUnits[currentLanguage].since  } {timeGap}</p>
        </div>
    );
};

export default TimeGapCalculator;
