import React from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './AboutUs.css';

const AboutUs = () => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>{currentLanguage === 'ar' ? 'من نحن' : 'About Us'}</h1>
        <div className="about-us-section">
          {currentLanguage === 'ar' ? (
            <>
              <p>مرحبًا بكم في موقع Atour، وجهتكم المفضلة لاستكشاف أفضل الرحلات والمغامرات حول العالم.</p>
              <p>نحن فريق من المتحمسين للسفر والمغامرة، نسعى لتقديم تجارب سفر فريدة ومميزة لعملائنا. تأسست شركتنا بهدف مساعدة المسافرين على اكتشاف وجهات جديدة وثقافات مختلفة بطريقة سهلة وممتعة.</p>
              <p>نفتخر بتقديم خدمات متميزة تشمل:</p>
              <ul>
                <li>رحلات مخصصة تناسب اهتماماتك واحتياجاتك</li>
                <li>مرشدين سياحيين محترفين ذوي خبرة واسعة</li>
                <li>أسعار تنافسية وعروض حصرية</li>
                <li>دعم على مدار الساعة لضمان تجربة سفر مريحة وآمنة</li>
              </ul>
              <p>رؤيتنا هي أن نصبح الشريك المفضل لكل من يبحث عن مغامرات فريدة وتجارب سفر لا تُنسى.</p>
            </>
          ) : (
            <>
              <p>Welcome to Atour, your preferred destination for exploring the best trips and adventures around the world.</p>
              <p>We are a team of travel and adventure enthusiasts, seeking to provide unique and distinctive travel experiences for our customers. Our company was founded with the aim of helping travelers discover new destinations and different cultures in an easy and enjoyable way.</p>
              <p>We are proud to offer outstanding services including:</p>
              <ul>
                <li>Customized trips that suit your interests and needs</li>
                <li>Professional tour guides with extensive experience</li>
                <li>Competitive prices and exclusive offers</li>
                <li>24/7 support to ensure a comfortable and safe travel experience</li>
              </ul>
              <p>Our vision is to become the preferred partner for everyone looking for unique adventures and unforgettable travel experiences.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;