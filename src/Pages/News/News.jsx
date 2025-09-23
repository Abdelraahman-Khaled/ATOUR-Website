import React from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './News.css';
import SliderNews from './Components/SliderNews/SliderNews';
import CardsNews from './Components/CardsNews/CardsNews';
import HelmetInfo from 'Components/HelmetInfo/HelmetInfo';

const News = () => {
  const { currentLanguage } = useLanguage();

  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "الأخبار" : "News"} />
      <div className="news-page">
        {/* ========== START SLIDER NEWS ============ */}
        {/* <SliderNews /> */}
        {/* ========== END SLIDER NEWS ============ */}
        {/* ========== START CARDS NEWS ============ */}
        <CardsNews />
        {/* ========== END CARDS NEWS ============ */}
      </div>
    </>
  )
};

export default News;


