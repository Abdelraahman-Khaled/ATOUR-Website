import CardNewRate from "./CardNewRate";
import "./NewRates.css";

const NewRates = () => {
  return (
    <div className="new-rates-content padding-top">
      {/* ============== START TITLE SECTION ============ */}
      <div className="title-section-info--1" data-aos="fade-left">
        <h2 className="title">أحدث التقييمات التالي</h2>
      </div>
      {/* ============== END TITLE SECTION ============ */}
      {/* ============== START ALL CARDS NEW RATE ============= */}
      <div className="all-cards-new-rates" data-aos="fade-up">
        {/* ============ START ROW ============ */}
        <div className="row g-3">
          {/* =============== START COL ============== */}
          <div className="col-12 col-md-6 col-lg-4">
            <CardNewRate isImageTrue={false} isVideoTrue={true} />
          </div>
          {/* =============== END COL ============== */}
          {/* =============== START COL ============== */}
          <div className="col-12 col-md-6 col-lg-4">
            <CardNewRate isImageTrue={true} isVideoTrue={false} />
          </div>
          {/* =============== END COL ============== */}
          {/* =============== START COL ============== */}
          <div className="col-12 col-md-6 col-lg-4">
            <CardNewRate isImageTrue={true} isVideoTrue={false} />
          </div>
          {/* =============== END COL ============== */}
        </div>
        {/* ============ END ROW ============ */}
      </div>
      {/* ============== END ALL CARDS NEW RATE ============= */}
    </div>
  );
};

export default NewRates;
