import React, { useState, useRef, useEffect } from 'react';
import './mainSlider.css';
import CustomModal from '../../CustomModal/CustomModal';
import { Thumb } from './EmblaCarouselThumbsButton';
import CameraICon from 'assets/Icons/CameraIcon';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const MainSlider = ({
    images = [],
    className = ''
}) => {

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const thumbnailRef = useRef(null);
    const mainSwiperRef = useRef(null);

    // Default images if none provided
    const defaultImages = [
        'https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+1',
        'https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+2',
        'https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+3'
    ];

    const displayImages = images.length > 0 ? images : defaultImages;
    const thumbnailImages = displayImages;
    const hasMoreImages = displayImages.length > 3;

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    // Update swiper when modal opens
    useEffect(() => {
        if (showModal && mainSwiperRef.current && mainSwiperRef.current.swiper) {
            mainSwiperRef.current.swiper.slideTo(selectedImageIndex, 0);
        }
    }, [showModal, selectedImageIndex]);

    // Drag scroll handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.pageY - thumbnailRef.current.offsetTop);
        setScrollTop(thumbnailRef.current.scrollTop);
        thumbnailRef.current.style.cursor = 'grabbing';
        thumbnailRef.current.style.userSelect = 'none';
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        if (thumbnailRef.current) {
            thumbnailRef.current.style.cursor = 'grab';
            thumbnailRef.current.style.userSelect = 'auto';
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (thumbnailRef.current) {
            thumbnailRef.current.style.cursor = 'grab';
            thumbnailRef.current.style.userSelect = 'auto';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.pageY - thumbnailRef.current.offsetTop;
        const walk = (y - startY) * 2; // Scroll speed multiplier
        thumbnailRef.current.scrollTop = scrollTop - walk;
    };

    // Touch handlers for mobile
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartY(e.touches[0].pageY - thumbnailRef.current.offsetTop);
        setScrollTop(thumbnailRef.current.scrollTop);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.touches[0].pageY - thumbnailRef.current.offsetTop;
        const walk = (y - startY) * 2;
        thumbnailRef.current.scrollTop = scrollTop - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };


    return (
        <div className="property-showcase mt-4">
            {/* Thumbnail Gallery - Left Side */}
            <div
                className="thumbnail-gallery"
                ref={thumbnailRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: 'grab' }}
            >
                {thumbnailImages.map((image, index) => {
                    const isLastThumbnail = index === thumbnailImages.length - 1;
                    return (
                        <div key={index} className="thumbnail-wrapper" style={{ position: 'relative' }}>
                            <Thumb
                                selected={index === selectedImageIndex}
                                onClick={() => handleThumbnailClick(index)}
                                imgSrc={image}
                            />
                            {isLastThumbnail && (
                                <div className="camera-icon-overlay-thumbnail">
                                    <span className="camera-icon b-16 d-flex space-2 align-items-center" onClick={() => setShowModal(true)}>
                                        {displayImages.length}
                                        <CameraICon />
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}


            </div>

            {/* Main Image Display - Right Side */}
            <div className="main-image-container">
                <div className="main-image-wrapper">
                    <img
                        src={displayImages[selectedImageIndex]}
                        alt="Main property view"
                        className="main-image"
                        onClick={() => setShowModal(true)}
                    />
                    {displayImages.length > 0 && (
                        <div className="camera-icon-overlay-main">
                            <span className="camera-icon b-16 d-flex space-2 align-items-center" onClick={() => setShowModal(true)}>
                                {displayImages.length}
                                <CameraICon />
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Modal for Lightbox */}
            <CustomModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setThumbsSwiper(null);
                }}
                title={"الصور"}
                newClass={"images-modal lightbox-modal"}
            >
                <div className="lightbox-container">
                    {/* Main Swiper */}
                    <Swiper
                        ref={mainSwiperRef}
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="main-swiper"
                        onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
                        initialSlide={selectedImageIndex}
                    >
                        {displayImages.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img src={src} alt={`Slide ${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Thumbs Swiper */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="thumbs-swiper"
                        breakpoints={{
                            640: {
                                slidesPerView: 4,
                            },
                            768: {
                                slidesPerView: 6,
                            },
                            1024: {
                                slidesPerView: 8,
                            },
                        }}
                    >
                        {displayImages.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img src={src} alt={`Thumbnail ${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </CustomModal>
        </div>
    );
};

export default MainSlider;