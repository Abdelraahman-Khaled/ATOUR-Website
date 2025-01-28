import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";

import "./FamousLandmarksCards.css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { dataLandMarks } from "./Data/DataLandMarks";
import CardLandmarks from "Components/Ui/CardLandmarks/CardLandmarks";

const FamousLandmarksCards = () => {
  return (
    <div className="all-fanous-landmsrks padding-top">
      {/* ============== START TITLE SECTION ============ */}
      <div className="title-section-info--1" data-aos="fade-left">
        <h2 className="title">أشهر المعالم</h2>
      </div>
      {/* ============== END TITLE SECTION ============ */}
      <div className="all-cards-landmarks all-cards-swiper" data-aos="fade-up">
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          navigation={{
            nextEl: ".swiper-button-prev",
            prevEl: ".swiper-button-next"
          }}
          modules={[Navigation]}
          loop={true}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1
            },

            650: {
              slidesPerView: 2
            },
            767: {
              slidesPerView: 3
            },

            1200: {
              slidesPerView: 4
            }
          }}
        >
          {dataLandMarks.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                {" "}
                <CardLandmarks image={item.image} title={item.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="all-arrows-swiper">
          <div className="swiper-button-prev swiper-prev">
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="swiper-button-next swiper-next">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamousLandmarksCards;
