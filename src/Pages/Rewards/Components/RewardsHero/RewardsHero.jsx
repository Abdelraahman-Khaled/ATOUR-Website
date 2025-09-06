import React from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { Link } from 'react-router-dom';
import SwiperSlider from 'Components/Ui/SwiperSlider/SwiperSlider';
import videoSlider from '../../../../assets/images/videos/01.mp4';
import './RewardsHero.css';

const RewardsHero = () => {
  const { currentLanguage } = useLanguage();

  const content = {
    ar: {
      title: 'برنامج المكافآت',
      subtitle: 'اكسب نقاط مع كل حجز واستمتع بمكافآت حصرية',
      description: 'انضم إلى برنامج المكافآت الخاص بنا واحصل على نقاط مع كل رحلة تحجزها. استبدل نقاطك بخصومات وعروض حصرية.',
      joinButton: 'انضم الآن مجاناً'
    },
    en: {
      title: 'Rewards Program',
      subtitle: 'Earn points with every booking and enjoy exclusive rewards',
      description: 'Join our rewards program and earn points with every trip you book. Redeem your points for discounts and exclusive offers.',
      joinButton: 'Join Now for Free'
    }
  };

  // Single video slide only
  const videoSliderData = [
    { id: 1, video: videoSlider }
  ];

  return (
    <SwiperSlider
      itemsSlider={videoSliderData}
      sliderNewClass={"slider-height rewards-slider"}
    >
      {/* ========== START CONTENT SLIDER INFO ============ */}
      <div className="content-slider-info">
        <div className="container">
          <div className="rewards-hero-content">
            <div className="all-main-content-slider" data-aos="fade-down">
              <h1 className="title-silde">{content[currentLanguage].title}</h1>
              <p className="lead">{content[currentLanguage].subtitle}</p>
              <p>{content[currentLanguage].description}</p>
              <Link to="/auth" className="rewards-cta-btn">
                {content[currentLanguage].joinButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ========== END CONTENT SLIDER INFO ============ */}
    </SwiperSlider>
  );
};

export default RewardsHero;