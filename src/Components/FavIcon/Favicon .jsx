import FavouritesAPI from "api/favouritesApi";
import HeartIconCollection from "assets/images/collection/HeartIconCollection";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import './Favicon.css'
const content = {
    ar: {
        addToFavorites: "تم الاضافة الى المفضلة.",
        removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
        addToFavorites: "Added to favorites.",
        removeFromFavorites: "Removed from favorites.",
    },
};

const Favicon = ({ modelType, modelId, initialIsFavorite, refresh }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const [isLoading, setIsLoading] = useState(false);

    // Sync state with prop when it changes (especially after a refresh)
    useEffect(() => {
        setIsFavorite(initialIsFavorite);
    }, [initialIsFavorite]);

    const toggleFavorite = async (e) => {
        e.preventDefault(); // Prevent default behavior
        e.stopPropagation(); // Prevent event propagation
        if (isLoading) return; // Prevent multiple clicks while loading
        try {
            setIsLoading(true);
            const response = await FavouritesAPI.toggleFavourite(modelType, modelId);
            if (response.success) {
                const newStatus = Boolean(response.data.status); // Ensure it's a boolean
                setIsFavorite(newStatus);
                // Show toast based on new favorite status
                toast.success(newStatus ? content[currentLanguage].addToFavorites : content[currentLanguage].removeFromFavorites);
                if (refresh) {
                    refresh((prev) => !prev); // Call refresh to trigger re-fetch in parent
                }
            } else {
                toast.error(currentLanguage === "ar" ? "حدث خطأ، حاول مرة أخرى." : "An error occurred, please try again.");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error(currentLanguage === "ar" ? "فشل في تحديث المفضلة." : "Failed to update favorites.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            onClick={toggleFavorite}
            style={{ cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.6 : 1 }}
            aria-disabled={isLoading}
        >
            <div className={`icon-heart ${isFavorite ? "activeHeart" : ""}`}>
                <HeartIconCollection />
            </div>
        </div>
    );
};

export default Favicon;