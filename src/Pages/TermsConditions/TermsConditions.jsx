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
      noData: 'لا يوجد بيانات متاحة.',
      loading: 'جاري التحميل...'
    },
    en: {
      noData: 'No data available.',
      loading: 'Loading...'
    },
    es: {
      noData: 'No hay datos disponibles.',
      loading: 'Cargando...'
    },
    fr: {
      noData: 'Aucune donnée disponible.',
      loading: 'Chargement...'
    },
    de: {
      noData: 'Keine Daten verfügbar.',
      loading: 'Laden...'
    },
    it: {
      noData: 'Nessun dato disponibile.',
      loading: 'Caricamento...'
    },
    pt: {
      noData: 'Nenhum dado disponível.',
      loading: 'Carregando...'
    },
    ru: {
      noData: 'Данные недоступны.',
      loading: 'Загрузка...'
    },
    zh: {
      noData: '无可用数据。',
      loading: '加载中...'
    },
    ja: {
      noData: 'データがありません。',
      loading: '読み込み中...'
    },
    ko: {
      noData: '사용 가능한 데이터가 없습니다.',
      loading: '로딩 중...'
    }
  };
  return (
    <div className="terms-container">
      <div className="terms-content">
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