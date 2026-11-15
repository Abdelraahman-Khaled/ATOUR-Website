import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import imageBanner1 from "../../../../../assets/images/slider/01.webp";
import imageBanner2 from "../../../../../assets/images/slider/02.webp";
import imageBanner3 from "../../../../../assets/images/slider/03.webp";

const SliderDetailsContentRight = ({ tripData }) => {
  // Default slider images
  const defaultItemsSlider = [
    { id: 1, imageUrl: imageBanner1 },
    { id: 2, imageUrl: imageBanner2 },
    { id: 3, imageUrl: imageBanner3 },
  ];

  // Determine which images to use
  const itemsSlider = tripData
    ? [{ id: 1, image: tripData.city.image }] // Use tripData.city.image if available
    : defaultItemsSlider; // Use default images if tripData is not available

  return (
    <SwiperSlider
      itemsSlider={itemsSlider}
      sliderNewClass={"slider-height slider-details-right margin-top-1 "}
    >
      { }
    </SwiperSlider>
  );
};

export default SliderDetailsContentRight;