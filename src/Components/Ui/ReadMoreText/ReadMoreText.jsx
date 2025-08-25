import useTranslation from "Components/Languages/useTranslation";
import { useState } from "react";
import "./ReadMoreText.css";

const ReadMoreText = ({ text, maxLength, newClass }) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation(); // Get the translation function

  return (
    <div>
      <p className={`text-read-more ${newClass}`}>
        {showAll ? text : `${text.slice(0, maxLength)}... `}
        {text.length > maxLength && (
          <span className="link-more-read" onClick={() => setShowAll(!showAll)}>
            {showAll ? t('common.less') : t('common.more')}
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMoreText;
