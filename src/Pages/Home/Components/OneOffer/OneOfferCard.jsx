import HeartIconCollection from "assets/images/collection/HeartIconCollection";
import IconLocation from "assets/images/collection/IconLocation";
import IconStarRate from "assets/images/collection/IconStarRate";
import CheckIcon from "assets/Icons/CheckIcon";
import "./OneOfferCard.css";
import { useState } from "react";
const OneOfferCard = ({
    newClassCard,
    idCard,
    image,
    titleCard,
    isTrueNumTwo,
    textContent,
    isTrueTextOneCard_1,
    textCardOne_1,
    isTrueTextOneCard_2,
    textCardOne_2,
    removeFromFavorites,
    isFavoritePage,
    isNewPage,
    wishListCard,
    addToWishList
}) => {
    const [isWishListed, setIsWishListed] = useState(false);

    const wishlistToggle = () => {
        setIsWishListed(!isWishListed);
        if (!isWishListed) {
            removeFromFavorites(idCard);
        }
    };

    // CHECK IF WISHLISTCARD IS AN ARRAY AND IF IT INCLUDES THE CURRENT ITEM'S ID
    const isWishListed_2 =
        wishListCard &&
        Array.isArray(wishListCard) &&
        wishListCard.includes(idCard);

    // TO SLICE WORDS OF TEXT CONTENT

    const sliceWords = (text) => {
        const words = text.split(" ");
        return words.slice(0, 25).join(" ") + (words.length > 25 ? "..." : "");
    };

    return (
        <div
            className={`card-collection-one card-favorite-one  d-flex  h-100 gap-3 ${newClassCard}`}
        >
            {/* =========== START IMAGE CARD FAVORITE =========== */}
            <div className="image-collection overlay-bg">
                <img
                    src={image}
                    alt="imageCollection"
                    loading="lazy"
                    className="w-100 h-100 object-fit-cover"
                />
                {isFavoritePage && (
                    <div
                        className={`icon-heart ${isWishListed ? "" : "activeHeart"}`}
                        onClick={wishlistToggle}
                    >
                        <HeartIconCollection />
                    </div>
                )}
                {isNewPage && (
                    <div
                        className={`icon-heart ${isWishListed_2 ? "activeHeart" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            addToWishList(idCard);
                        }}
                    >
                        <HeartIconCollection />
                    </div>
                )}

            </div>
            {/* =========== END IMAGE COLLECTION =========== */}
            {/* =========== END IMAGE CARD FAVORITE =========== */}
            {/* =========== START INFO CONTENT CARD =========== */}
            <div className="content-info-card info-content-card d-flex flex-column h-100">
                {/* ========== START HEADER TOP CARD ========== */}
                <div className="header-top-card d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h2 className="title">{titleCard}</h2>
                </div>
                {/* ========== END HEADER TOP CARD ========== */}
                
                <p className="text">{sliceWords(textContent)}</p>
                <div className="bottom-content-card mt-auto d-flex gap-3 flex-wrap align-items-center">
                    {isTrueTextOneCard_1 && (
                        <div className="text-one-card d-flex align-items-center gap-2">
                            <CheckIcon /> {textCardOne_1}
                        </div>
                    )}
                    {isTrueTextOneCard_2 && (
                        <div className="text-one-card d-flex align-items-center gap-2">
                            <CheckIcon /> {textCardOne_2}
                        </div>
                    )}
                </div>
            </div>
            {/* =========== END INFO CONTENT CARD =========== */}
        </div>
    );
};

export default OneOfferCard;