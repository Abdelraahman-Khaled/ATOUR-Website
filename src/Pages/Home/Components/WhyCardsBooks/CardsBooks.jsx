import TitleSection from "Components/TitleSection/TitleSection";
import CardBook from "./CardBook";
import "./CardsBooks.css";
import { cardsBooks } from "./DataCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
const CardsBooks = () => {
  return (
    <div className="cards-books padding-top">
      {/* =========== START SECTION TITLE ========== */}
      <TitleSection
        title={"لماذا تحجز من جولة؟"}
        text={
          ""}
      />
      {/* =========== END SECTION TITLE ============ */}
      {/* ============ START ALL CARDS BOOKS =========== */}
      <div className="all-cards-books" data-aos="fade-right">
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {cardsBooks.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CardBook
                  iconCard={item.icon}
                  titleCard={item.title}
                  textCard={item.text}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* ============ END ALL CARDS BOOKS =========== */}
    </div>
  );
};

export default CardsBooks;
