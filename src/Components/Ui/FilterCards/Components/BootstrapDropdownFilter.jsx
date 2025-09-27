import { useLanguage } from 'Components/Languages/LanguageContext';
import React from 'react';

const content = {
  ar: {
    all: "الجميع",
  },
  en: {
    all: "All",
  },
  fr: {
    all: "Tous",
  },
  de: {
    all: "Alle",
  },
  es: {
    all: "Todos",
  },
  tr: {
    all: "Hepsi",
  },
  ru: {
    all: "Все",
  },
  zh: {
    all: "所有",
  },
  ko: {
    all: "전체",
  },
  pt: {
    all: "Todos",
  },
  ur: {
    all: "سب",
  },
  ja: {
    all: "すべて",
  },
};

const BootstrapDropdownFilter = ({ label, options, onSelect, selectedValue }) => {
  const { currentLanguage } = useLanguage();
  const handleChange = (event) => {
    const value = event.target.value;
    onSelect(options.find(option => option.id === parseInt(value)));
  };

  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">{label}:</label>
      <select id={label} className="form-select" value={selectedValue || ''} onChange={handleChange}>
        <option value="">{content[currentLanguage].all}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name || option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BootstrapDropdownFilter;