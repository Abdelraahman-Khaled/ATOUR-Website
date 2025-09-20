import { useEffect } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import image1 from "../../../../../../assets/images/users/01.png";
import image2 from "../../../../../../assets/images/users/02.png";
import image3 from "../../../../../../assets/images/users/03.png";
import image4 from "../../../../../../assets/images/users/04.png";
import ProgressBarRates from "Components/Ui/ProgressBarRates/ProgressBarRates";
import AllRatesComments from "./AllRatesComments";
import { useRates } from "context/RatesContext";
import { useLanguage } from "Components/Languages/LanguageContext";

const translations = {
  title: {
    ar: "التقييمات",
    en: "Ratings",
    fr: "Évaluations",
    de: "Bewertungen",
    es: "Calificaciones",
    tr: "Değerlendirmeler",
    ru: "Отзывы",
    zh: "评分",
    ko: "평가",
    pt: "Avaliações",
    ur: "درجہ بندیاں",
    ja: "評価",
  },
  trust: {
    ar: "شخص يثق بجولة",
    en: "people trust the tour",
    fr: "personnes font confiance à la visite",
    de: "Personen vertrauen der Tour",
    es: "personas confían en el tour",
    tr: "kişi tura güveniyor",
    ru: "человек доверяют туру",
    zh: "人信任此行程",
    ko: "명이 투어를 신뢰합니다",
    pt: "pessoas confiam no passeio",
    ur: "افراد دورے پر بھروسہ کرتے ہیں",
    ja: "人がツアーを信頼しています",
  },
  loading: {
    ar: "...جاري تحميل التقييمات",
    en: "Loading ratings...",
    fr: "Chargement des évaluations...",
    de: "Bewertungen werden geladen...",
    es: "Cargando calificaciones...",
    tr: "Değerlendirmeler yükleniyor...",
    ru: "Загрузка отзывов...",
    zh: "正在加载评分...",
    ko: "평가 불러오는 중...",
    pt: "Carregando avaliações...",
    ur: "...درجہ بندیاں لوڈ ہو رہی ہیں",
    ja: "評価を読み込み中...",
  },
};

const RatesComments = ({ modelId, modelType }) => {
  const { rates, fetchRates, loading } = useRates();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if (modelId && modelType) {
      fetchRates(modelId, modelType);
    }
  }, [modelId, modelType, fetchRates]);

  return (
    <div className="all-rates-comments margin-top-1 border-top pt-3">
      {/* =========== START TOP RATES CONTENT ============= */}
      <div className="top-rates-content">
        <h2 className="title">
          {translations.title[currentLanguage]}{" "}
          <span className="num-rates">({rates?.length || 0})</span>
        </h2>
        <div className="main-info-avatar mt-2 d-flex align-items-center gap-4 flex-wrap">
          <AvatarGroup
            renderSurplus={(surplus) => <span>{surplus.toString()[0]}K+</span>}
            total={rates?.length || 0}
            className="all-avatar"
          >
            <Avatar alt="Remy Sharp" src={image1} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image2} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image3} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image4} className="avatar-1" />
          </AvatarGroup>
          <h2 className="text-title">
            {currentLanguage === "ar" ? "أكثر من " : "More than "}
            {rates?.length || 0}{" "}
            {translations.trust[currentLanguage]}
          </h2>
        </div>
      </div>
      {/* =========== END TOP RATES CONTENT ============= */}

      {loading ? (
        <p>{translations.loading[currentLanguage]}</p>
      ) : (
        <>
          <ProgressBarRates rates={rates} />
          <AllRatesComments rates={rates} />
        </>
      )}
    </div>
  );
};

export default RatesComments;
