import React, { useState, useEffect } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './TermsConditions.css';
import GeneralAPI from 'api/generalApi';

const TermsConditions = () => {
  const { currentLanguage } = useLanguage();
  const [termsContent, setTermsContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await GeneralAPI.getTerms();
        if (response.success) {
          setTermsContent(response.data.content);
        } else {
          setTermsContent(text[currentLanguage].noData);
        }
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
        setTermsContent(text[currentLanguage].noData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, [currentLanguage]);

  const text = {
    ar: {
      termsAndConditions: 'الشروط والأحكام',
      noData: 'لا يوجد بيانات متاحة.',
      loading: 'جاري التحميل...'
    },
    en: {
      termsAndConditions: 'Terms and Conditions',
      noData: 'No data available.',
      loading: 'Loading...'
    },
  };

  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>{text[currentLanguage].termsAndConditions}</h1>
        <div className="terms-section">
          {isLoading ? (
            <p>{text[currentLanguage].loading}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: termsContent }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;