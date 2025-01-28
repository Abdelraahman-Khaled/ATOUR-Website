import { useState } from "react";
import "./ReadMoreText.css";

const ReadMoreText = ({ text, maxLength,newClass }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <p className={`text-read-more ${newClass}`}>
        {showAll ? text : `${text.slice(0, maxLength)}... `}
        {text.length > maxLength && (
          <span className="link-more-read" onClick={() => setShowAll(!showAll)}>
            {showAll ? "أقل" : "المزيد"}
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMoreText;
