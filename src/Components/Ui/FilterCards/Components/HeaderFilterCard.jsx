import { useLanguage } from "Components/Languages/LanguageContext";

const HeaderFilterCard = () => {
  const { currentLanguage } = useLanguage();

  const content = {
    ar: "تصفية النتائج",
    en: "Filter Results",
    fr: "Filtrer les résultats",
    de: "Ergebnisse filtern",
    es: "Filtrar resultados",
    tr: "Sonuçları Filtrele",
    ru: "Фильтровать результаты",
    zh: "筛选结果",
    ko: "결과 필터링",
    pt: "Filtrar Resultados",
    ur: "نتائج فلٹر کریں",
    ja: "結果を絞り込む",
  };

  return (
    <div className="header-filter-cards border-bottom-card d-flex justify-content-between align-items-center flex-wrap gap-2">
      <h2 className="title">{content[currentLanguage]}</h2>
    </div>
  );
};

export default HeaderFilterCard;
