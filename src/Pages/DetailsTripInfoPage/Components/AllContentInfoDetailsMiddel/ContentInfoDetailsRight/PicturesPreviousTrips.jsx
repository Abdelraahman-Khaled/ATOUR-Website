import image from "../../../../../assets/images/slider/01.png";
const PicturesPreviousTrips = () => {
  return (
    <div className="pictures-perv-trip margin-top-1">
      <h2 className="title">صور الرحلات السابقة</h2>
      {/* ============== START ROW ============= */}
      <div className="row g-3">
        {/* ============ START COL ============= */}
        <div className="col-12 col-sm-6">
          <div className="image-prev-trip position-relative overlay-bg">
            <img src={image} alt="trip" />
          </div>
        </div>
        {/* ============ END COL ============= */}
        {/* ============ START COL ============= */}
        <div className="col-12 col-sm-6">
          {/* ========= START ROW =========== */}
          <div className="row g-3 flex-column">
            <div className="col-12">
              <div className="image-prev-trip position-relative overlay-bg">
                <img src={image} alt="trip" />
              </div>
            </div>
            <div className="col-12">
              <div className="image-prev-trip position-relative overlay-bg">
                <img src={image} alt="trip" />
              </div>
            </div>
          </div>
          {/* ========= END ROW =========== */}
        </div>
        {/* ============ END COL ============= */}
      </div>
      {/* ============== END ROW ============= */}
    </div>
  );
};

export default PicturesPreviousTrips;
