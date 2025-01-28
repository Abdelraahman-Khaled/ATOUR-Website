import UserIcon2 from "assets/Icons/UserIcon2";
import image from "../../../../assets/images/slider/01.png";
import DateIcon from "assets/Icons/DateIcon";
import { ClockIcon } from "@mui/x-date-pickers";
import EditIconUser from "assets/images/AccountUser/EditIconUser";
import "./DetailsPaymentInfo.css"
const ProductDetailsPay = () => {
  return (
    <>
      <div className="card-details-pay-one d-flex align-items-center gap-3">
        {/* ============ START IMAGE RESERVATION =============== */}
        <div className="image-details">
          <img
            src={image}
            alt="imageDetails"
            loading="lazy"
            className="object-fit-cover"
          />
        </div>
        {/* ============ END IMAGE RESERVATION =============== */}
        {/* ============ START CONTENT INFO CARD =============== */}
        <div className="content-info-card">
          <div className="info-top-card pb-2 d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <h2 className="title">رحلة على اليخت</h2>
            <p className="price-num">53 ريال</p>
          </div>
          <div className="all-ino-content-botom">
            <div className="info-one-content mb-2 d-flex align-items-center gap-2">
              <UserIcon2 /> 2 بالغين , 3 أطفال
            </div>
            <div className="info-one-content mb-2 d-flex align-items-center gap-2">
              <DateIcon /> الثلاثاء 24 مايو, 2024
            </div>
            <div className="bottom-content d-flex justify-content-between  align-items-center gap-2 flex-wrap">
              <div className="info-one-content d-flex align-items-center gap-2">
                <ClockIcon /> 8:30 م
              </div>
              <button className="btn-main edit-product">
                <EditIconUser /> تعديل
              </button>
            </div>
          </div>
        </div>
        {/* ============ END CONTENT INFO CARD =============== */}
      </div>
    </>
  );
};

export default ProductDetailsPay;
