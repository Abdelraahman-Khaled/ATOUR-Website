import React, { useState } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const RewardsFAQ = () => {
  const { currentLanguage } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const content = {
    ar: {
      title: 'الأسئلة الشائعة',
      faqs: [
        {
          question: 'كيف يمكنني الانضمام لبرنامج المكافآت؟',
          answer: 'يمكنك الانضمام مجاناً عن طريق إنشاء حساب جديد أو تسجيل الدخول إلى حسابك الحالي. ستبدأ في كسب النقاط فوراً مع أول حجز.'
        },
        {
          question: 'كم نقطة أحصل عليها مع كل حجز؟',
          answer: 'تحصل على نقطة واحدة لكل ريال تنفقه. بالإضافة إلى نقاط إضافية في المناسبات الخاصة والعروض الترويجية.'
        },
        {
          question: 'كيف يمكنني استبدال نقاطي؟',
          answer: 'يمكنك استبدال نقاطك من خلال حسابك الشخصي. اختر المكافأة التي تريدها وستطبق تلقائياً على حجزك القادم.'
        },
        {
          question: 'هل تنتهي صلاحية النقاط؟',
          answer: 'النقاط صالحة لمدة سنتين من تاريخ كسبها. ستتلقى تذكيراً قبل انتهاء صلاحيتها بشهر.'
        },
        {
          question: 'ما هي مستويات العضوية المتاحة؟',
          answer: 'لدينا ثلاث مستويات: البرونزي (0-999 نقطة)، الفضي (1000-4999 نقطة)، والذهبي VIP (5000+ نقطة). كل مستوى له مميزات خاصة.'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How can I join the rewards program?',
          answer: 'You can join for free by creating a new account or logging into your existing account. You will start earning points immediately with your first booking.'
        },
        {
          question: 'How many points do I get per booking?',
          answer: 'You earn one point for every SAR you spend. Plus bonus points during special occasions and promotional offers.'
        },
        {
          question: 'How can I redeem my points?',
          answer: 'You can redeem your points through your personal account. Choose the reward you want and it will be automatically applied to your next booking.'
        },
        {
          question: 'Do points expire?',
          answer: 'Points are valid for two years from the date they were earned. You will receive a reminder one month before they expire.'
        },
        {
          question: 'What membership levels are available?',
          answer: 'We have three levels: Bronze (0-999 points), Silver (1000-4999 points), and Gold VIP (5000+ points). Each level has special benefits.'
        }
      ]
    }
  };

  return (
    <section className="rewards-faq">
      <div className="container">
        <h2 className='title'>{content[currentLanguage].title}</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {content[currentLanguage].faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className='text'>{faq.question}</span>
                  <FontAwesomeIcon
                    icon={activeIndex === index ? faChevronUp : faChevronDown}
                  />
                </button>
                <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                  <p className='py-4'>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsFAQ;