import { useLanguage } from "Components/Languages/LanguageContext";
import { useEffect, useState } from "react";

const TimeGapCalculator = ({ createdAt }) => {
  const { currentLanguage } = useLanguage();
  const [timeGap, setTimeGap] = useState("");

  useEffect(() => {
    if (!createdAt) return;

    const calculateTimeGap = () => {
      const now = new Date();
      const createdDate = new Date(createdAt);
      const diffInMilliseconds = now - createdDate;
      const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInMonths / 12);

      if (diffInYears > 0) {
        setTimeGap(
          `${diffInYears} ${currentLanguage === "ar" ? "سنة" : "year"}${diffInYears > 1 && currentLanguage === "en" ? "s" : ""} ${currentLanguage === "ar" ? "مضت" : "ago"}`
        );
      } else if (diffInMonths > 0) {
        setTimeGap(
          `${diffInMonths} ${currentLanguage === "ar" ? "شهر" : "month"}${diffInMonths > 1 && currentLanguage === "en" ? "s" : ""} ${currentLanguage === "ar" ? "مضت" : "ago"}`
        );
      } else if (diffInDays > 0) {
        setTimeGap(
          `${diffInDays} ${currentLanguage === "ar" ? "يوم" : "day"}${diffInDays > 1 && currentLanguage === "en" ? "s" : ""} ${currentLanguage === "ar" ? "مضت" : "ago"}`
        );
      } else if (diffInHours > 0) {
        setTimeGap(
          `${diffInHours} ${currentLanguage === "ar" ? "ساعة" : "hour"}${diffInHours > 1 && currentLanguage === "en" ? "s" : ""} ${currentLanguage === "ar" ? "مضت" : "ago"}`
        );
      } else if (diffInMinutes > 0) {
        setTimeGap(
          `${diffInMinutes} ${currentLanguage === "ar" ? "دقيقة" : "minute"}${diffInMinutes > 1 && currentLanguage === "en" ? "s" : ""} ${currentLanguage === "ar" ? "مضت" : "ago"}`
        );
      } else {
        setTimeGap(
          `${diffInSeconds} ${currentLanguage === "ar" ? "ثانية" : "second"}${diffInSeconds > 1 && currentLanguage === "en" ? "s" : ""} ${currentLanguage === "ar" ? "مضت" : "ago"}`
        );
      }
    };

    calculateTimeGap();
    const intervalId = setInterval(calculateTimeGap, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [createdAt, currentLanguage]);

  return <>{timeGap}</>;
};

export default TimeGapCalculator;