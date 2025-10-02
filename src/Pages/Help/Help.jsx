import React, { useEffect, useState } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './Help.css';
import GeneralAPI from 'api/generalApi';
const content = {
  ar: { about: "المساعدة" },
  en: { about: "Help" },
  fr: { about: "Aide" },
  es: { about: "Ayuda" },
  de: { about: "Hilfe" },
  it: { about: "Aiuto" },
  pt: { about: "Ajuda" },
  ru: { about: "Помощь" },
  zh: { about: "帮助" },
  ja: { about: "ヘルプ" },

};


const Help = () => {
  const { currentLanguage } = useLanguage();
  const [aboutUsContent, setAboutUsContent] = useState("");

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        const response = await GeneralAPI.getHelp(currentLanguage);
        console.log(response.data.content);
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

export default Help;