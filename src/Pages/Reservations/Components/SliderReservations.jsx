import { useLanguage } from "Components/Languages/LanguageContext";
import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";
import imageBanner1 from "../../../assets/images/slider/01.png";
import imageBanner2 from "../../../assets/images/slider/02.png";
import imageBanner3 from "../../../assets/images/slider/03.png";
const SliderReservations = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  const itemsSlider = [
    { id: 1, image: imageBanner1 },
    { id: 2, image: imageBanner2 },
    { id: 3, image: imageBanner3 }
  ];

  return (
    <SwiperSlider
      itemsSlider={itemsSlider}
      sliderNewClass={"slider-height slider-favorite-page"}
    >
      {/* ========== START CONTENT SLIDER INFO ============ */}
      <div className="content-slider-info">
        {/* ========== START CONTAINER ========== */}
        <>
          {/* ========== START ALL MAIN CONTENT SLIDER =========== */}
          <div className="all-main-content-slider" data-aos="fade-left">
            <h2 className="title-silde">{currentLanguage === "ar" ? "حجوزاتي" : "My Bookings"}</h2>
          </div>
          {/* ========== END ALL MAIN CONTENT SLIDER =========== */}
        </>
        {/* ========== END CONTAINER ========== */}
      </div>
      {/* ========== END CONTENT SLIDER INFO ============ */}
    </SwiperSlider>
  );
};

export default SliderReservations;
