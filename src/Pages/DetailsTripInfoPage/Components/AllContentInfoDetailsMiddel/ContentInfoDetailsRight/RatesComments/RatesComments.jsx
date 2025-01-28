import { Avatar, AvatarGroup } from "@mui/material";
import image1 from "../../../../../../assets/images/users/01.png";
import image2 from "../../../../../../assets/images/users/02.png";
import image3 from "../../../../../../assets/images/users/03.png";
import image4 from "../../../../../../assets/images/users/04.png";
import ProgressBarRates from "Components/Ui/ProgressBarRates/ProgressBarRates";
import AllRatesComments from "./AllRatesComments";
const RatesComments = () => {
  return (
    <div className="all-rates-comments margin-top-1 border-top pt-3">
      {/* =========== START TOP RATES CONTENT ============= */}
      <div className="top-rates-content">
        <h2 className="title">
          التقييمات <span className="num-rates">(2657)</span>
        </h2>
        <div className="main-info-avatar mt-2 d-flex align-items-center gap-4 flex-wrap">
          <AvatarGroup
            renderSurplus={(surplus) => <span>{surplus.toString()[0]}K+</span>}
            total={8000}
            className="all-avatar"
          >
            <Avatar alt="Remy Sharp" src={image1} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image2} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image3} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image4} className="avatar-1" />
          </AvatarGroup>
          <h2 className="text-title">أكثر من 700.00 شخص يثق بجولة</h2>
        </div>
      </div>
      {/* =========== END TOP RATES CONTENT ============= */}
      <ProgressBarRates />
      <AllRatesComments />
    </div>
  );
};

export default RatesComments;
