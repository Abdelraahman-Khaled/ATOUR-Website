import AdSwiper from "../../../AdPopup/AdSwiper";
import "./ImageLogin.css"

const adImages = [
  require("../../../../assets/images/popupAds/ads(1).png"),
  require("../../../../assets/images/popupAds/ads(2).png"),
  require("../../../../assets/images/popupAds/ads(3).png"),
];

const ImageLogin = () => {
  return (
    <div className="image-login mx-auto ">
      <AdSwiper adImages={adImages} />
    </div>
  );
};

export default ImageLogin;
