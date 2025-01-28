import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProgressBarRates.css";
import { useState } from "react";
import ModalAddRates from "Pages/DetailsTripInfoPage/Components/ModalsDetailsTripInfo/ModalAddRates/ModalAddRates";
const ProgressBarRates = () => {
  const progressRates = [20, 30, 40, 50, 70]; //  progress rates

  // MODAL ADD NEW RAATE
  const [showModalAddRate, setShowModalAddRate] = useState(false);
  const buttonshowModal = () => {
    setShowModalAddRate(true);
  };
  const hideModalAddRate = () => {
    setShowModalAddRate(false);
  };

  return (
    <>
      <ModalAddRates
        showModalAddRate={showModalAddRate}
        hideModalAddRate={hideModalAddRate}
      />

      <div className="all-content-rate-progress   w-100">
        <div className="row flex-wrap-reverse g-4 align-items-center">
          {/* =========== START COL ============== */}
          <div className="col-12 col-md-7">
            {/* ============ START ALL PROGRESS RATES ============== */}
            <div className="all-progress-rates">
              <div className="progressbar-rate-content">
                {progressRates.map((rate, index) => (
                  <div
                    key={index}
                    className={`progressbar-rate-one d-flex align-items-center gap-2`}
                  >
                    <div className="info-rate-content d-flex align-items-center gap-1">
                      <span className="rate-star-icon">
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span className="num-rate">{index + 1}</span>
                    </div>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={rate}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={buttonshowModal}
                className="add-new-rate btn-main w-100 mt-3"
              >
                {" "}
                <FontAwesomeIcon icon={faPlus} /> إضافة تقييم
              </button>
            </div>
            {/* ============ END ALL PROGRESS RATES ============== */}
          </div>
          {/* =========== END COL ============== */}
          {/* =========== START COL ============== */}
          <div className="col-12 col-md-5">
            <div className="all-num-rates-info d-flex flex-column gap-2  text-center">
              4.5
              <span className="text-num-rate">(1500) تقييم</span>
            </div>
          </div>
          {/* =========== END COL ============== */}
        </div>
      </div>
    </>
  );
};

export default ProgressBarRates;
