import { useLanguage } from "Components/Languages/LanguageContext";
import { useState } from "react";
import "./ReadMoreText.css";

const ReadMoreText = ({ text, maxLength, newClass }) => {
  const [showAll, setShowAll] = useState(false);
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <div>
      <p className={`text-read-more ${newClass}`}>
        {showAll ? text : `${text.slice(0, maxLength)}... `}
        {text.length > maxLength && (
          <span className="link-more-read" onClick={() => setShowAll(!showAll)}>
            {
              showAll
                ? currentLanguage === "ar"
                  ? "أقل" // "Less" in Arabic
                  : "Less" // "Less" in English
                : currentLanguage === "ar"
                  ? "المزيد" // "More" in Arabic
                  : "More" // "More" in English
            }
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMoreText;
