import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProgressBarRates.css";
import { useState, useMemo } from "react";
import ModalAddRates from "Pages/DetailsTripInfoPage/Components/ModalsDetailsTripInfo/ModalAddRates/ModalAddRates";
import { useParams } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";

const translations = {
  addRate: {
    ar: "إضافة تقييم",
    en: "Add Rating",
    fr: "Ajouter une évaluation",
    de: "Bewertung hinzufügen",
    es: "Agregar calificación",
    tr: "Değerlendirme ekle",
    ru: "Добавить отзыв",
    zh: "添加评分",
    ko: "평가 추가",
    pt: "Adicionar avaliação",
    ur: "درجہ بندی شامل کریں",
    ja: "評価を追加",
  },
  total: {
    ar: "تقييم",
    en: "ratings",
    fr: "évaluations",
    de: "Bewertungen",
    es: "calificaciones",
    tr: "değerlendirme",
    ru: "отзывов",
    zh: "评分",
    ko: "평가",
    pt: "avaliações",
    ur: "درجہ بندیاں",
    ja: "評価",
  },
};

const ProgressBarRates = ({ rates = [] }) => {
  const { currentLanguage } = useLanguage()
  const { id } = useParams();
  // Convert rates to numbers
  const numericRates = rates.map(r => Number(r.rate));
  const total = numericRates.length;

  // Calculate average and distribution
  const { average, distribution } = useMemo(() => {
    if (total === 0) {
      return { average: 0, distribution: [] };
    }

    const avg = (
      numericRates.reduce((a, b) => a + b, 0) / total
    ).toFixed(1);

    const dist = [5, 4, 3, 2, 1].map(star => {
      const count = numericRates.filter(r => r === star).length;
      return {
        star,
        count,
        percent: total > 0 ? (count / total) * 100 : 0,
      };
    });

    return { average: avg, distribution: dist };
  }, [rates, total, numericRates]);

  // MODAL ADD NEW RATE
  const [showModalAddRate, setShowModalAddRate] = useState(false);
  const buttonshowModal = () => setShowModalAddRate(true);
  const hideModalAddRate = () => setShowModalAddRate(false);

  return (
    <>
      <ModalAddRates
        showModalAddRate={showModalAddRate}
        hideModalAddRate={hideModalAddRate}
        modelId={id}
        modelType={"trip"}
      />

      <div className="all-content-rate-progress w-100">
        <div className="row flex-wrap-reverse g-4 align-items-center">
          {/* =========== START COL ============== */}
          <div className="col-12 col-md-7">
            {/* ============ START ALL PROGRESS RATES ============== */}
            <div className="all-progress-rates">
              <div className="progressbar-rate-content">
                {distribution.map((item, index) => (
                  <div
                    key={index}
                    className="progressbar-rate-one d-flex align-items-center gap-2"
                  >
                    <div className="info-rate-content d-flex align-items-center gap-1">
                      <span className="rate-star-icon">
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span className="num-rate">{item.star}</span>
                    </div>
                    <div
                      className="progress flex-grow-1"
                      role="progressbar"
                      aria-label={`${item.star} stars`}
                      aria-valuenow={item.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className="count">({item.count})</span>
                  </div>
                ))}
              </div>
              {/* <button
                onClick={buttonshowModal}
                className="add-new-rate btn-main w-100 mt-3"
              >
                <FontAwesomeIcon icon={faPlus} /> {translations.addRate[currentLanguage]}
              </button> */}
            </div>
            {/* ============ END ALL PROGRESS RATES ============== */}
          </div>
          {/* =========== END COL ============== */}
          {/* =========== START COL ============== */}
          <div className="col-12 col-md-5">
            <div className="all-num-rates-info d-flex flex-column gap-2 text-center">
              <span className="average-rate">{average}</span>
              <span className="text-num-rate">
                ({total}) {translations.total[currentLanguage]}
              </span>
            </div>
          </div>
          {/* =========== END COL ============== */}
        </div>
      </div>
    </>
  );
};

export default ProgressBarRates;
