import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "./AdSwiper.css";

const AdSwiper = ({ adImages }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      className="mySwiper "
    >
      {adImages.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Ad ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AdSwiper;