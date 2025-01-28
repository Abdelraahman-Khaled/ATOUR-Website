import ArrowIcon from "assets/images/exploreCountries/Icons/ArrowIcon";
import "./CardExplore.css";
const CardExplore = ({image,title}) => {
  return (
    <div className="card-explore cursor-pointer-event">
      {/* ========== START IMAGE CARD EXPLORE ============ */}
      <div className="image-card-explore position-relative overlay-bg">
        <img
          src={image}
          alt="imageExplore"
          className="w-100 h-100 object-fit-cover image-explore"
          loading="lazy"
        />
      </div>
      {/* ========== END IMAGE CARD EXPLORE ============ */}
      {/* ========== START INF OCONTENT ============== */}
      <div className="info-content-explore d-flex justify-content-between  align-items-center gap-3 flex-wrap">
        <h2 className="title">{title}</h2>
        <div className="icon-explore">
          <ArrowIcon />
        </div>
      </div>
      {/* ========== END INF OCONTENT ============== */}
    </div>
  );
};

export default CardExplore;
