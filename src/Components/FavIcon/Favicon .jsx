import FavouritesAPI from "api/favouritesApi";
import HeartIconCollection from "assets/images/collection/HeartIconCollection";
import { useState } from "react";

const Favicon = ({ modelType, modelId, initialIsFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFavorite = async () => {
        try {
            setIsLoading(true); // Show a loading state
            const data = await FavouritesAPI.toggleFavourite(modelType, modelId);
            setIsFavorite(data.isFavourite); // Update the state based on API response
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setIsLoading(false); // Hide the loading state
        }
    };


    return (
        <div onClick={toggleFavorite} style={{ cursor: isLoading ? "not-allowed" : "pointer" }}>
            {isLoading ? (
                <span>⏳</span> // Loading spinner
            ) : isFavorite ? (
                <div className="icon-heart activeHeart">
                    <HeartIconCollection />
                </div>
            ) : (
                // <span>🤍</span> // Not favorite icon
                <div className="icon-heart ">
                    <HeartIconCollection />
                </div>
            )}
        </div>
    );
};

export default Favicon;
