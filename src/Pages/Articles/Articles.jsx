import React, { useState } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './Articles.css';

const Articles = () => {
  const { currentLanguage } = useLanguage();
  const [articles] = useState([
    {
      id: 1,
      titleAr: 'أفضل الوجهات السياحية لعام 2023',
      titleEn: 'Best Travel Destinations for 2023',
      contentAr: 'استكشف أجمل الوجهات السياحية حول العالم لهذا العام. من الشواطئ الاستوائية إلى المدن التاريخية، هناك الكثير لاكتشافه...',
      contentEn: 'Explore the most beautiful tourist destinations around the world this year. From tropical beaches to historic cities, there is much to discover...',
      date: '2023-05-15',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 2,
      titleAr: 'نصائح للسفر بميزانية محدودة',
      titleEn: 'Tips for Budget Travel',
      contentAr: 'السفر لا يجب أن يكون مكلفًا. اكتشف كيفية الاستمتاع برحلاتك دون إنفاق الكثير من المال من خلال هذه النصائح العملية...',
      contentEn: 'Travel doesn\'t have to be expensive. Discover how to enjoy your trips without spending a lot of money with these practical tips...',
      date: '2023-06-22',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 3,
      titleAr: 'أساسيات حقيبة السفر',
      titleEn: 'Travel Packing Essentials',
      contentAr: 'تعرف على العناصر الأساسية التي يجب أن تتضمنها حقيبة سفرك لضمان رحلة مريحة وخالية من المتاعب...',
      contentEn: 'Learn about the essential items that should be included in your travel bag to ensure a comfortable and hassle-free trip...',
      date: '2023-07-10',
      image: 'https://via.placeholder.com/400x250'
    }
  ]);

  return (
    <div className="articles-container">
      <h1 className="articles-title">
        {currentLanguage === 'ar' ? 'المقالات' : 'Articles'}
      </h1>
      <div className="articles-grid">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <div className="article-image">
              <img src={article.image} alt={currentLanguage === 'ar' ? article.titleAr : article.titleEn} />
            </div>
            <div className="article-content">
              <h2>{currentLanguage === 'ar' ? article.titleAr : article.titleEn}</h2>
              <p className="article-date">{article.date}</p>
              <p className="article-excerpt">
                {currentLanguage === 'ar' ? article.contentAr : article.contentEn}
              </p>
              <button className="read-more-btn">
                {currentLanguage === 'ar' ? 'اقرأ المزيد' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;