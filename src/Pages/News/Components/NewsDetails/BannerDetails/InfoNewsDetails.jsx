import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
import "./InfoNewsDetails.css";
import TimeGapCalculator from "./calculateTimeGap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DateDisplay from "Components/DateDisplay/DateDisplay";
import SwiperSlider from "Components/Ui/SwiperSlider/SwiperSlider";

const text = {
  ar: {
    noData: "لا يوجد بيانات متاحة.",
    home: "الصفحة الرئيسية",
    from: "من",
    to: "إلى",
  },
  en: {
    noData: "No data available.",
    home: "Home",
    from: "From",
    to: "To",
  },
  fr: {
    noData: "Aucune donnée disponible.",
    home: "Accueil",
    from: "De",
    to: "À",
  },
  de: {
    noData: "Keine Daten verfügbar.",
    home: "Startseite",
    from: "Von",
    to: "Bis",
  },
  es: {
    noData: "No hay datos disponibles.",
    home: "Inicio",
    from: "Desde",
    to: "Hasta",
  },
  tr: {
    noData: "Veri bulunmamaktadır.",
    home: "Ana Sayfa",
    from: "Başlangıç",
    to: "Kadar",
  },
  ru: {
    noData: "Нет доступных данных.",
    home: "Главная",
    from: "От",
    to: "До",
  },
  zh: {
    noData: "暂无可用数据。",
    home: "首页",
    from: "从",
    to: "到",
  },
  ko: {
    noData: "데이터가 없습니다.",
    home: "홈",
    from: "부터",
    to: "까지",
  },
  pt: {
    noData: "Nenhum dado disponível.",
    home: "Início",
    from: "De",
    to: "Até",
  },
  ja: {
    noData: "利用可能なデータがありません。",
    home: "ホーム",
    from: "から",
    to: "まで",
  },
  ur: {
    noData: "کوئی ڈیٹا دستیاب نہیں ہے۔",
    home: "ہوم",
    from: "سے",
    to: "تک",
  },
};


const InfoNewsDetails = ({ newsDetailsCard }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    newsDetailsCard ? (
      <div className="info-details-news">
        {/* ================== START IMAGE NEWS TOP =========== */}
        <div className="image-news-top position-relative">
          <img
            src={newsDetailsCard?.photo}
            alt="newsImage"
            className="w-100 object-fit-cover"
            loading="lazy"
          />
          <div className="date-overlay position-absolute bottom-0 start-0 bg-dark bg-opacity-75 text-white p-2 m-2 rounded">
            <div className="description d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} />  <DateDisplay from_date={newsDetailsCard.start_date} />
            </div>
          </div>
        </div>
        {/* ================== START IMAGE NEWS TOP =========== */}
        {/* ================== START CONTENT NEWS DETAILS ============= */}
        <div className="content-news-details mb-4">
          <h2 className="title">
            {newsDetailsCard.title}
          </h2>
          <p className="description mb-4" dangerouslySetInnerHTML={{ __html: newsDetailsCard.description }}>
          </p>


          <span className="description tags">{newsDetailsCard.tags}</span>
        </div>

        {/* attachments */}

        <div className="attachment-card">
          <div className=" overflow-hidden border rounded rounded-3">
            <SwiperSlider
              itemsSlider={newsDetailsCard.attachments.map((item) => (
                item.file
              ))}
              sliderNewClass={"slider-height slider-details-right  "}
            ></SwiperSlider>
          </div>
        </div>
        {/* ================== END CONTENT NEWS DETAILS ============= */}
      </div>
    )
      :
      (
        <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found vh-100 align-content-center">
          {text[currentLanguage].noData}{" "}
          <Link
            to="/"
            className="fs-6 fw-medium text-danger text-decoration-underline"
          >
            {text[currentLanguage].home}
          </Link>
        </p>
      )
  );
};

export default InfoNewsDetails;