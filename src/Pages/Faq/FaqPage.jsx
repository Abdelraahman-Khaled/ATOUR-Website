import React, { useState, useEffect } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import GeneralAPI from 'api/generalApi';
import './FaqPage.css';

const FaqPage = () => {
  const { currentLanguage } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await GeneralAPI.getFAQs(currentLanguage);
        if (response.success) {
          setFaqs(response.data);
        } else {
          setFaqs([]);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFaqs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, [currentLanguage]);

  const text = {
    ar: {
      faqTitle: 'الأسئلة الشائعة',
      loading: 'جاري التحميل...',
      noData: 'لا يوجد أسئلة شائعة متاحة.',
    },
    en: {
      faqTitle: 'Frequently Asked Questions',
      loading: 'Loading...',
      noData: 'No FAQs available.',
    },
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1 className='mb-3'>{text[currentLanguage].faqTitle}</h1>
        {isLoading ? (
          <p>{text[currentLanguage].loading}</p>
        ) : faqs.length > 0 ? (
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div className={`faq-question ${expandedId === faq.id ? 'expanded' : ''}`} onClick={() => toggleExpand(faq.id)}>
                  <span>{faq.translations.find(t => t.locale === currentLanguage)?.question || faq.question}</span>
                  <i className={`fas ${expandedId === faq.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </div>
                <div className={`faq-answer ${expandedId === faq.id ? 'expanded' : ''}`}>
                  <p>{(faq.translations.find(t => t.locale === currentLanguage)?.answer || faq.answer) || 'No answer content available.'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>{text[currentLanguage].noData}</p>
        )}
      </div>
    </div>
  );
};

export default FaqPage;