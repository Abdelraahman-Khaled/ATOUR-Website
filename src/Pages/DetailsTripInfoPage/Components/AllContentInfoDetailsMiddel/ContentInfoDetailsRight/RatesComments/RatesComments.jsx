import { Avatar, AvatarGroup } from "@mui/material";
import image1 from "../../../../../../assets/images/users/01.png";
import image2 from "../../../../../../assets/images/users/02.png";
import image3 from "../../../../../../assets/images/users/03.png";
import image4 from "../../../../../../assets/images/users/04.png";
import ProgressBarRates from "Components/Ui/ProgressBarRates/ProgressBarRates";
import AllRatesComments from "./AllRatesComments";
import { useQuery } from "@tanstack/react-query";
import RatesAPI from "api/ratesApi";
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
  more: {
    ar: "أكثر من ",
    en: "More than ",
    fr: "Plus de ",
    de: "Mehr als ",
    es: "Más de ",
    tr: "Daha fazla ",
    ru: "Больше чем ",
    zh: "更多 ",
    ko: "더 많이 ",
    pt: "Mais de ",
    ur: "بہت سے ",
    ja: "評価が多い ",
  }
};

const RatesComments = ({ modelId, modelType }) => {
  const { currentLanguage } = useLanguage();
  // Fetch rates using React Query
  const {
    data: rates = [],
    isPending: loading
  } = useQuery({
    queryKey: ['rates', modelId, modelType],
    queryFn: async () => {
      const response = await RatesAPI.getRates(modelId, modelType);
      return response.data;
    },
    enabled: !!modelId && !!modelType, // Only run if IDs are present
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="all-rates-comments margin-top-1 border-top pt-3">
      {/* =========== START TOP RATES CONTENT ============= */}
      <div className="top-rates-content">
        <h2 className="title">
          {translations.title[currentLanguage]}{" "}
          <span className="num-rates">({rates?.statistics?.total_ratings || 0})</span>
        </h2>
        <div className="main-info-avatar mt-2 d-flex align-items-center gap-4 flex-wrap">
          <AvatarGroup
            renderSurplus={(surplus) => <span>{surplus.toString()[0]}K+</span>}
            total={(rates?.statistics?.total_ratings || 0)}
            className="all-avatar"
          >
            <Avatar alt="Remy Sharp" src={image1} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image2} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image3} className="avatar-1" />
            <Avatar alt="Remy Sharp" src={image4} className="avatar-1" />
          </AvatarGroup>
          <h2 className="text-title">
            {translations.more[currentLanguage]}
            {(rates?.statistics?.total_ratings || 0) || 0}{" "}
            {translations.trust[currentLanguage]}
          </h2>
        </div>
      </div>
      {/* =========== END TOP RATES CONTENT ============= */}

      {loading ? (
        <p>{translations.loading[currentLanguage]}</p>
      ) : (
        <>
          <ProgressBarRates rates={rates.ratings} />
          <AllRatesComments rates={rates.ratings} />
        </>
      )}
    </div>
  );
};

export default RatesComments;
