import DateDisplay from "Components/DateDisplay/DateDisplay";
import { Link } from "react-router-dom";
const CardArticles = ({
    routeArticleCard,
    description,
    imageArticle,
    titleArticle,
    imageUserArticle,
    nameUserArticle,
    timeAddedArticle
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
        <Link to={routeArticleCard} className="card-blog-one">
            {/* ============= START IMAGE CARD BLOG ============== */}
            <div className="image-card-blog position-relative overlay-bg">
                <img
                    src={imageArticle}
                    alt="img blog"
                    className="image-blog-src object-fit-cover"
                />
            </div>
            {/* ============= END IMAGE CARD BLOG ============== */}
            {/* ============= START CONTENT INFO CARD BLOG ========== */}
            <div className="content-info-card-blog">
                <div className="mb-3">
                    <h2 className="title mb-3">{titleArticle}</h2>
                    <p
                        className="description"
                        dangerouslySetInnerHTML={{ __html: truncateDescription(description) }}
                    ></p>
                </div>
                <div className="author-info">
                    <img
                        src={imageUserArticle}
                        alt={nameUserArticle}
                        className="author-image"
                    />
                    <div className="author-details ">
                        <h3 className="author-name">{nameUserArticle}</h3>
                        <div className="time-add">{<DateDisplay from_date={timeAddedArticle} />}</div>
                    </div>
                </div>
            </div>
            {/* ============= END CONTENT INFO CARD BLOG ========== */}
        </Link>
    );
};

export default CardArticles;
