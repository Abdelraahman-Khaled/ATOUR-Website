import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import imageBanner1 from "../../../../../../assets/images/slider/01.webp";
import imageBanner2 from "../../../../../../assets/images/slider/02.webp";
import imageBanner3 from "../../../../../../assets/images/slider/03.webp";
const SliderEventCardDetails = ({ image }) => {
  const itemsSlider = [
    { id: 1, image: imageBanner1 },
    { id: 2, image: imageBanner2 },
    { id: 3, image: imageBanner3 }
  ];
  const listImages = image.attachments.map((imageUrl) => ({ image: imageUrl }));
  return (
    <SwiperSlider
      itemsSlider={listImages}
      sliderNewClass={"slider-height slider-blogs-page"}
    >
      {/* ========== START CONTENT SLIDER INFO ============ */}
      <div className="content-slider-info"></div>
      {/* ========== END CONTENT SLIDER INFO ============ */}
    </SwiperSlider>
  );
};

export default SliderEventCardDetails;
