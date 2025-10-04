import React, { useEffect, useState } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './AboutUs.css';
import GeneralAPI from 'api/generalApi';
const content = {
  ar: { about: "من نحن" },
  en: { about: "About Us" },
  fr: { about: "À propos de nous" },
  de: { about: "Über uns" },
  es: { about: "Sobre nosotros" },
  tr: { about: "Hakkımızda" },
  ru: { about: "О нас" },
  zh: { about: "关于我们" },
  ko: { about: "회사 소개" },
  pt: { about: "Sobre nós" },
  ur: { about: "ہمارے بارے میں" },
  ja: { about: "私たちに関しては" },
};


const AboutUs = () => {
  const { currentLanguage } = useLanguage();
  const [aboutUsContent, setAboutUsContent] = useState("");

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        const response = await GeneralAPI.getAbout(currentLanguage);
        setAboutUsContent(response.data.content)
      } catch (error) {
        console.error('Error fetching About Us content:', error);
      }
    };

    fetchAboutUsContent();
  }, [currentLanguage]);

  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1 className="title">{content[currentLanguage]?.about}</h1>
        <div className="about-us-section" dangerouslySetInnerHTML={{ __html: aboutUsContent || '' }} />
      </div>
    </div>
  );
};

export default AboutUs;