import TitleSection from "Components/TitleSection/TitleSection";
import CardBook from "./CardBook";
import "./CardsBooks.css";
import { cardsBooks } from "./DataCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useLanguage } from "Components/Languages/LanguageContext";
const text = {
  ar: "لماذا تحجز من جولة؟",
  en: "Why book with Atour?",
  fr: "Pourquoi réserver avec Atour ?",
  de: "Warum bei Atour buchen?",
  es: "¿Por qué reservar con Atour?",
  tr: "Neden Atour ile rezervasyon yapmalısınız?",
  ru: "Почему бронировать через Atour?",
  zh: "为什么选择在 Atour 预订？",
  ko: "왜 Atour에서 예약해야 하나요?",
  pt: "Por que reservar com a Atour?",
  ur: "جولا سے بکنگ کیوں کریں؟",
  ja: "なぜAtourで予約するのですか？"
}

const CardsBooks = () => {
  const { currentLanguage } = useLanguage()
  return (
    <div className="cards-books padding-top">
      {/* =========== START SECTION TITLE ========== */}
      <TitleSection
        title={text[currentLanguage]}
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
            delay: 9000000,
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
                  titleCard={item.title[currentLanguage]}
                  textCard={item.text[currentLanguage]}
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
