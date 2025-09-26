import React from 'react'
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SwiperCards = ({ children, swiperId }) => {
    return (
        <div className="all-cards-landmarks all-cards-swiper" data-aos="fade-up">
            <Swiper
                slidesPerView={4}
                spaceBetween={15}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: `.swiper-button-next-${swiperId}`,
                    prevEl: `.swiper-button-prev-${swiperId}`
                }}
                modules={[Navigation, Autoplay]}
                loop={true}
                slidesPerGroup={1}
                centeredSlides={false} // keep normal when enough slides
                centerInsufficientSlides={true} // 🔑 this centers slides if fewer than slidesPerView
                className="mySwiper"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                    },
                    480: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    }
                }}
            >
                {children}
            </Swiper>

            <div
                className="all-arrows-swiper"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '100%',
                    zIndex: '10'
                }}
            >
                <div className={`swiper-button-prev swiper-prev swiper-button-prev-${swiperId}`}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={`swiper-button-next swiper-next swiper-button-next-${swiperId}`}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        </div>
    )
}

export default SwiperCards
