import AdSwiper from "../../../AdPopup/AdSwiper";
import "./ImageLogin.css"
import ad1 from "../../../../assets/images/popupAds/ads(1).webp";
import ad2 from "../../../../assets/images/popupAds/ads(2).webp";
import ad3 from "../../../../assets/images/popupAds/ads(3).webp";

const adImages = [ad1, ad2, ad3];

const ImageLogin = () => {
  return (
    <div className="image-login mx-auto ">
      <AdSwiper adImages={adImages} />
    </div>
  );
};

export default ImageLogin;
