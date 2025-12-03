import { useState } from "react";
import UserCommentRate from "./UserCommentRate";
import PaginationPage from "Components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import { formatTimeAgo } from "utils/timeAgo";

const translations = {
  noComments: {
    ar: "لا يوجد تعليقات جديدة.",
    en: "There are no new comments.",
    fr: "Il n'y a pas de nouveaux commentaires.",
    de: "Es gibt keine neuen Kommentare.",
    es: "No hay comentarios nuevos.",
    tr: "Yeni yorum yok.",
    ru: "Новых комментариев нет.",
    zh: "没有新的评论。",
    ko: "새로운 댓글이 없습니다.",
    pt: "Não há novos comentários.",
    ur: "کوئی نئی تبصرے نہیں ہیں۔",
    ja: "新しいコメントはありません。",
  },
  home: {
    ar: "الصفحة الرئيسية",
    en: "Home",
    fr: "Accueil",
    de: "Startseite",
    es: "Inicio",
    tr: "Ana Sayfa",
    ru: "Главная",
    zh: "首页",
    ko: "홈",
    pt: "Início",
    ur: "مرکزی صفحہ",
    ja: "ホーム",
  },
};

const AllRatesComments = ({ rates }) => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;

  const pageCount = Math.ceil((Array.isArray(rates) ? rates.length : 0) / perPage);
  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  const offset = currentPage * perPage;
  const currentPageData = Array.isArray(rates) ? [...rates].reverse().slice(offset, offset + perPage) : [];

  return (
    <div className="all-rates-comment-data margin-top-1">
      <div className="row g-3">
        {currentPageData.length > 0 ? (
          currentPageData
            .map((item) => (
              <div key={item.id} className="col-12">
                <UserCommentRate
                  imageUser={item.created_by_image}
                  userName={` ${item.created_by}`}
                  timeAdd={formatTimeAgo(item.created_at, currentLanguage)}
                  comment={item.comment}
                  rate={item.rate}
                  images={item.images}
                />
              </div>
            ))
        ) : (
          <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found">
            {translations.noComments[currentLanguage]}{" "}
            <Link
              to="/"
              className="fs-6 fw-medium text-danger text-decoration-underline"
            >
              {translations.home[currentLanguage]}
            </Link>
          </p>
        )}
      </div>
      <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default AllRatesComments;
