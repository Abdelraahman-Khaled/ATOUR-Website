// dateUtils.js

const arabicMonths = [
    "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const arabicDays = [
    "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
];

const englishDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export const formatDate = (dateString, language = "en") => {
    const isArabic = language === "ar";

    const months = isArabic ? arabicMonths : englishMonths;
    const days = isArabic ? arabicDays : englishDays;

    // Handle null or undefined dateString
    if (!dateString) {
        const date = new Date(); // Use today's date as fallback
        return {
            dayNumber: date.getDate(), // Today's day number
            dayName: days[date.getDay()], // Today's day name
            monthName: months[date.getMonth()] // Today's month name
        };
    }

    const date = new Date(dateString);

    // Get day number
    const dayNumber = date.getDate();

    // Get day name
    const dayName = days[date.getDay()];

    // Get month name
    const monthName = months[date.getMonth()];

    return { dayNumber, dayName, monthName };
};