import React, { useState, useEffect } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';

const RewardsTerms = () => {
  const { currentLanguage } = useLanguage();
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.cardIndex);
            setVisibleCards(prev => [...new Set([...prev, cardIndex])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.terms-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const content = {
    ar: {
      title: 'الشروط والأحكام',
      terms: [
        {
          title: 'كسب النقاط',
          points: [
            'تحصل على نقطة واحدة لكل ريال سعودي تنفقه على الحجوزات المؤهلة.',
            'النقاط تضاف إلى حسابك خلال 24-48 ساعة من إتمام الرحلة.',
            'الحجوزات الملغاة أو المسترد ثمنها لا تكسب نقاط.',
            'النقاط الإضافية متاحة خلال العروض الترويجية المحددة.'
          ]
        },
        {
          title: 'استبدال النقاط',
          points: [
            'الحد الأدنى للاستبدال هو 100 نقطة.',
            'يمكن استبدال النقاط بخصومات أو هدايا مجانية.',
            'النقاط المستبدلة غير قابلة للاسترداد.',
            'لا يمكن تحويل النقاط بين الحسابات المختلفة.'
          ]
        },
        {
          title: 'انتهاء الصلاحية',
          points: [
            'النقاط صالحة لمدة 24 شهراً من تاريخ كسبها.',
            'ستتلقى تذكيراً عبر البريد الإلكتروني قبل انتهاء الصلاحية.',
            'النقاط المنتهية الصلاحية لا يمكن استردادها.',
            'النشاط في الحساب يمدد صلاحية جميع النقاط.'
          ]
        },
        {
          title: 'أحكام عامة',
          points: [
            'يحق للشركة تعديل شروط البرنامج بإشعار مسبق 30 يوماً.',
            'يحق للشركة إلغاء أو تعليق الحسابات المخالفة للشروط.',
            'البرنامج متاح للمقيمين في المملكة العربية السعودية فقط.',
            'في حالة النزاع، تطبق القوانين السعودية.'
          ]
        }
      ]
    },
    en: {
      title: 'Terms & Conditions',
      terms: [
        {
          title: 'Earning Points',
          points: [
            'You earn one point for every Saudi Riyal spent on eligible bookings.',
            'Points are added to your account within 24-48 hours of trip completion.',
            'Cancelled or refunded bookings do not earn points.',
            'Bonus points are available during specified promotional offers.'
          ]
        },
        {
          title: 'Redeeming Points',
          points: [
            'Minimum redemption is 100 points.',
            'Points can be redeemed for discounts or free gifts.',
            'Redeemed points are non-refundable.',
            'Points cannot be transferred between different accounts.'
          ]
        },
        {
          title: 'Expiration',
          points: [
            'Points are valid for 24 months from the date earned.',
            'You will receive an email reminder before expiration.',
            'Expired points cannot be recovered.',
            'Account activity extends the validity of all points.'
          ]
        },
        {
          title: 'General Terms',
          points: [
            'The company reserves the right to modify program terms with 30 days notice.',
            'The company may cancel or suspend accounts that violate terms.',
            'Program is available to residents of Saudi Arabia only.',
            'In case of dispute, Saudi laws apply.'
          ]
        }
      ]
    }
  };

  return (
    <section>
      <div>
        <h2 className='title pb-4'>{content[currentLanguage].title}</h2>
        <div className="row justify-content-center">
          <div>
            <div className="terms-grid">
              {content[currentLanguage].terms.map((section, index) => (
                <div
                  key={index}
                  className={`terms-card ${visibleCards.includes(index) ? 'visible' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
                  data-card-index={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    '--animation-delay': `${index * 0.2}s`
                  }}
                >
                  <div className="terms-card-header">
                    <div className="terms-icon">
                      <i className={`fas ${index === 0 ? 'fa-coins' :
                        index === 1 ? 'fa-gift' :
                          index === 2 ? 'fa-clock' :
                            'fa-file-contract'
                        }`}></i>
                      <div className="icon-particles">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="particle" style={{
                            '--delay': `${i * 0.3}s`,
                            '--angle': `${i * 60}deg`
                          }}>
                            <i className={`fas ${i % 3 === 0 ? 'fa-star' :
                              i % 3 === 1 ? 'fa-heart' :
                                'fa-trophy'
                              }`}></i>
                          </div>
                        ))}
                      </div>
                    </div>
                    <h3>{section.title}</h3>
                    <div className="header-decoration">
                      <div className="decoration-line"></div>
                      <div className="decoration-dot"></div>
                      <div className="decoration-line"></div>
                    </div>
                  </div>
                  <div className="terms-card-body">
                    <ul className="terms-list">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="terms-item" style={{
                          '--item-delay': `${pointIndex * 0.1}s`
                        }}>
                          <div className="check-icon-wrapper">
                            <i className="fas fa-check-circle"></i>
                            <div className="check-ripple"></div>
                          </div>
                          <span className='px-1'>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="card-footer">
                      <div className="progress-indicator">
                        <div className="progress-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default RewardsTerms;