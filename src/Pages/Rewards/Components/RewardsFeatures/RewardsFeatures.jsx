import React from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faStar, faPercent, faCrown } from '@fortawesome/free-solid-svg-icons';

const RewardsFeatures = () => {
  const { currentLanguage } = useLanguage();

  const content = {
    ar: {
      title: 'مميزات برنامج المكافآت',
      features: [
        {
          icon: faStar,
          title: 'اكسب النقاط',
          description: 'احصل على نقاط مع كل حجز تقوم به. كلما حجزت أكثر، كلما حصلت على نقاط أكثر.'
        },
        {
          icon: faGift,
          title: 'مكافآت حصرية',
          description: 'استبدل نقاطك بهدايا مجانية، ترقيات، وتجارب سياحية حصرية.'
        },
        {
          icon: faPercent,
          title: 'خصومات مميزة',
          description: 'احصل على خصومات تصل إلى 30% على حجوزاتك القادمة باستخدام نقاطك.'
        },
        {
          icon: faCrown,
          title: 'عضوية VIP',
          description: 'اوصل لمستوى VIP واستمتع بخدمة عملاء مخصصة وعروض حصرية.'
        }
      ]
    },
    en: {
      title: 'Rewards Program Benefits',
      features: [
        {
          icon: faStar,
          title: 'Earn Points',
          description: 'Get points with every booking you make. The more you book, the more points you earn.'
        },
        {
          icon: faGift,
          title: 'Exclusive Rewards',
          description: 'Redeem your points for free gifts, upgrades, and exclusive travel experiences.'
        },
        {
          icon: faPercent,
          title: 'Special Discounts',
          description: 'Get discounts up to 30% on your future bookings using your earned points.'
        },
        {
          icon: faCrown,
          title: 'VIP Membership',
          description: 'Reach VIP level and enjoy dedicated customer service and exclusive offers.'
        }
      ]
    }
  };

  return (
    <section className="rewards-features">
      <div className="container">
        <h2 className='title pb-4'>{content[currentLanguage].title}</h2>
        <div className="row g-4">
          {content[currentLanguage].features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className='fs-5'>{feature.title}</h3>
                <p className='text'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RewardsFeatures;