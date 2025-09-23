import React from "react";

const DateDisplay = ({ from_date, language = "ar" }) => {
    // Parse the date from the API response
    const date = new Date(from_date);

    // Define Arabic and English day and month names
    const arabicDays = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
    ];
    const arabicMonths = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
    ];

    const englishDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const englishMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Extract day, month, and year
    const dayName = language === "ar" ? arabicDays[date.getDay()] : englishDays[date.getDay()]; // Get day name
    const dayNumber = date.getDate(); // Get day number
    const monthName = language === "ar" ? arabicMonths[date.getMonth()] : englishMonths[date.getMonth()]; // Get month name
    const year = date.getFullYear(); // Get year

    return (
        <div className="text-date">
            {dayName} <span>{dayNumber}</span> {monthName},{" "}
            <span>{year}</span>
        </div>
    );
};

export default DateDisplay;