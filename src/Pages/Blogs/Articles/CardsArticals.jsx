import { useEffect, useState } from "react";
import GeneralAPI from "api/generalApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
import "./CardsNews.css";
import Loader from "Components/Auth/Components/Loader/Loader";
import CardNews from "Pages/News/Components/CardNews/CardNews";

const text = {
    ar: {
        noData: "لا يوجد بيانات متاحة.",
        home: "الصفحة الرئيسية",
    },
    en: {
        noData: "No data available.",
        home: "Home",
    },
    fr: {
        noData: "Aucune donnée disponible.",
        home: "Accueil",
    },
    de: {
        noData: "Keine Daten verfügbar.",
        home: "Startseite",
    },
    es: {
        noData: "No hay datos disponibles.",
        home: "Inicio",
    },
    tr: {
        noData: "Veri bulunmamaktadır.",
        home: "Ana Sayfa",
    },
    ru: {
        noData: "Нет доступных данных.",
        home: "Главная",
    },
    zh: {
        noData: "暂无可用数据。",
        home: "首页",
    },
    ko: {
        noData: "데이터가 없습니다.",
        home: "홈",
    },
    pt: {
        noData: "Nenhum dado disponível.",
        home: "Início",
    },
    ja: {
        noData: "利用可能なデータがありません。",
        home: "ホーム",
    },
    ur: {
        noData: "کوئی ڈیٹا دستیاب نہیں ہے۔",
        home: "ہوم",
    },
};

const CardsArticals = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    const [articals, setArticals] = useState([]); // State to store news data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetcharticals = async () => {
            try {
                // Use the blog API endpoint as requested by the user
                const data = await GeneralAPI.getArticles(currentLanguage);
                setArticals(data.data);
            } catch (err) {
                console.error("Error fetching news data:", err);
                setError("Failed to load news data. Please try again later.");

            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetcharticals(); // Call the API on component mount
    }, [currentLanguage]);

    if (loading) {
        return (
            <div style={{ margin: "200px 0px" }}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>; // Display error message if fetching fails
    }

    return (
        <div className="cards-news-container">
            {/* =========== START CARDS GRID =========== */}
            {articals.length <= 0 ? (
                <p className="text-center w-100  my-4">
                    {text[currentLanguage].noData}{" "}
                    <Link
                        to="/"
                        className="fs-6 fw-medium text-danger text-decoration-underline"
                    >
                        {text[currentLanguage].home}
                    </Link>
                </p>
            ) : (
                <div className="cards-news-grid">
                    {articals.map((item) => (
                        <div key={item.id}>
                            <CardNews
                                routeNewsCard={`/articals/${item.id}`}
                                imageNews={item.photo}
                                titleNews={item.title}
                                tags={item.tags}
                                timeAddedNews={item.start_date}
                                endTimeAddedNews={item.end_date}
                                description={item.description}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardsArticals;