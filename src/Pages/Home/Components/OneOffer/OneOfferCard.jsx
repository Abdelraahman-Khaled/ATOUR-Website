const OneOfferCard = ({
    imageCard,
    // infoPlaceCard,
    // numRate,
    titleCard,
    description,
}) => {
    return (
        <>
            {/* ============ START CARD COLLECTION ONE =========== */}
            <div className="card-collection-one">
                {/* =========== START IMAGE COLLECTION =========== */}
                <div className="image-collection overlay-bg">
                    <img
                        src={imageCard}
                        alt="imageCollection"
                        loading="lazy"
                        className="w-100 h-100 object-fit-cover"
                    />
                    {/* Use the Favicon component here */}

                    {/* <div className="info-text">
                        <IconLocation /> {infoPlaceCard}
                    </div> */}
                </div>
                {/* =========== END IMAGE COLLECTION =========== */}
                {/* =========== START CONTENT INFO CARD ========== */}
                <div className="content-info-card pt-3">
                    {/* {numRate > 0 && (
                        <div className="rate-card d-flex align-items-center gap-1">
                            <IconStarRate /> {numRate} {ratingText}
                        </div>
                    )} */}
                    <h2 className="title">{titleCard}</h2>
                    <div className="price-info">
                        <span className="price-num" style={{
                            color: "#148035"
                        }}>{description}</span>
                    </div>
                </div>
                {/* =========== END CONTENT INFO CARD ========== */}
            </div>
            {/* ============ END CARD COLLECTION ONE =========== */}
        </>
    );
};

export default OneOfferCard;