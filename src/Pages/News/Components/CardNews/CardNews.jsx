import DateDisplay from "Components/DateDisplay/DateDisplay";
import { Link } from "react-router-dom";
import "./CardNews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const CardNews = ({
  routeNewsCard,
  description,
  imageNews,
  titleNews,
  timeAddedNews,
  tags,
  endTimeAddedNews
}) => {
  // Safely truncate HTML content while preserving entities
  const truncateDescription = (text, maxLength = 320) => {
    if (!text) return "";

    // For short text, just return as is
    if (text.length <= maxLength) return text;

    // For longer text, we'll try to truncate safely
    // This approach preserves HTML entities like &ndash;
    let truncated = text;

    // If text is very long, truncate it
    if (text.length > maxLength) {
      // Find the last space before maxLength to avoid cutting words
      const lastSpace = text.lastIndexOf(' ', maxLength);
      const cutPoint = lastSpace > 0 ? lastSpace : maxLength;

      // Cut the text and add ellipsis
      truncated = text.substring(0, cutPoint) + '...';

      // Make sure we don't cut in the middle of an HTML entity
      // If the truncated text ends with '&' or '&#' or '&n', it might be cutting an entity
      if (truncated.match(/&[#a-zA-Z0-9]{0,6}$/)) {
        // Find the last safe point before any HTML entity
        const lastSafePoint = truncated.lastIndexOf(' ', truncated.length - 10);
        if (lastSafePoint > 0) {
          truncated = truncated.substring(0, lastSafePoint) + '...';
        }
      }
    }

    return truncated;
  };

  // Truncate title to a shorter length
  const truncateTitle = (text, maxLength = 60) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Link to={routeNewsCard} className="card-news-one">
      {/* ============= START IMAGE CARD NEWS ============== */}
      <div className="image-card-news position-relative overlay-bg">
        <img
          src={imageNews}
          alt="img news"
          className="image-news-src"
        />
      </div>
      {/* ============= END IMAGE CARD NEWS ============== */}
      {/* ============= START CONTENT INFO CARD NEWS ========== */}
      <div className="content-info-card-news">
        <div>
          <h2 className="title">{titleNews}</h2>
        </div>
      </div>
      {/* ============= END CONTENT INFO CARD NEWS ========== */}
    </Link >
  );
};

export default CardNews;