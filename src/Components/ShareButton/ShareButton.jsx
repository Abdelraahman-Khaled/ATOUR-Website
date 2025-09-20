import React, { useState } from "react";
import "./ShareButton.css";
import ShareIcon from "../../assets/Icons/ShareIcon";

const ShareButton = ({ url, title, text, className = "", onShare = null }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
                if (onShare) onShare();
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // fallback (copy link)
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div
            onClick={handleShare}
            className={` share-button ${className}`}
        >
            <ShareIcon />
        </div>
    );
};

export default ShareButton;
