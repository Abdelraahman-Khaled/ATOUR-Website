import { useLanguage } from "./LanguageContext";
import { Dropdown } from "react-bootstrap";
import "./LanguageSwitcher.css";

// Import flag images
import enFlag from "assets/images/flags/en.svg";
import arFlag from "assets/images/flags/ar.svg";
import frFlag from "assets/images/flags/fr.svg";
import deFlag from "assets/images/flags/de.svg";
import esFlag from "assets/images/flags/es.svg";
import trFlag from "assets/images/flags/tr.svg";
import ruFlag from "assets/images/flags/ru.svg";
import zhFlag from "assets/images/flags/zh.svg";
import koFlag from "assets/images/flags/ko.svg";
import ptFlag from "assets/images/flags/pt.svg";
import urFlag from "assets/images/flags/ur.svg";
import jaFlag from "assets/images/flags/ja.svg";

const LanguageSwitcher = () => {
  // SWT CURRENT LANGUAGE
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  // Language options with flags
  const languages = {
    en: { name: "English", flag: enFlag },
    ar: { name: "العربية", flag: arFlag },
    fr: { name: "Français", flag: frFlag },
    de: { name: "Deutsch", flag: deFlag },
    es: { name: "Español", flag: esFlag },
    tr: { name: "Türkçe", flag: trFlag },
    ru: { name: "Русский", flag: ruFlag },
    zh: { name: "中文", flag: zhFlag },
    ko: { name: "한국어", flag: koFlag },
    pt: { name: "Português", flag: ptFlag },
    ur: { name: "اردو", flag: urFlag },
    ja: { name: "日本語", flag: jaFlag },
  };

  // ON CLIK LANG SET LANGUAGE I CLIKED
  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <Dropdown onSelect={handleLanguageChange}>
      <Dropdown.Toggle id="dropdown-basic" className="drop-lang">
        <div className="lang cursor-pointer-1 d-flex align-items-center gap-1 flex-row-reverse">
          {/* <LanguageIcon /> */}
          <img
            src={languages[currentLanguage].flag}
            alt={languages[currentLanguage].name}
            className="current-flag"
          />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="language-dropdown-menu">
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <Dropdown.Item eventKey={code} key={code} className="language-item">
            <img src={flag} alt={name} className="flag-icon" />
            <span>{name}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
