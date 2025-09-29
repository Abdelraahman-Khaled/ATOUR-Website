import Car from "assets/images/IconsHeader/Car";
import "./HeaderCard.css";
import Tree from "assets/images/IconsHeader/Tree";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";

const HeaderCard = () => {

  const { currentLanguage } = useLanguage(); // Get the current language

  const allButtons = [
    {
      text: {
        en: "Experiences",
        ar: "جَوْلات",
        fr: "Expériences",
        de: "Erlebnisse",
        es: "Experiencias",
        tr: "Deneyimler",
        ru: "Впечатления",
        zh: "体验",
        ko: "경험",
        pt: "Experiências",
        ur: "تجربات",
        ja: "体験",
      },
      icon: <Tree />,
      link: "/tripsPage",
    },
    {
      text: {
        en: "Events",
        ar: "فعاليات",
        fr: "Événements",
        de: "Veranstaltungen",
        es: "Eventos",
        tr: "Etkinlikler",
        ru: "События",
        zh: "活动",
        ko: "이벤트",
        pt: "Eventos",
        ur: "تقریبات",
        ja: "イベント",
      },
      icon: <Ticket />,
      link: "/eventsPage",
    },
    {
      text: {
        ar: "المنتجات",
        en: "Products",
        fr: "Produits",
        de: "Produkte",
        es: "Productos",
        tr: "Ürünler",
        ru: "Продукты",
        zh: "产品",
        ko: "제품",
        pt: "Produtos",
        ur: "مصنوعات",
        ja: "製品",
      },
      icon: <Gift />,
      link: "/offers",
    },
  ];

  return (
    <div data-aos="fade-up" className="all-info-card padding-60 d-flex justify-content-center align-items-center gap-3 flex-wrap">
      {allButtons.map((item, index) => {
        return (
          <button key={index} className="btn-card-one">
            <Link className="text-black" to={item.link}>
              {item.icon} {item.text[currentLanguage]}
            </Link>
          </button>
        );
      })}
    </div>
  );
};

export default HeaderCard;
