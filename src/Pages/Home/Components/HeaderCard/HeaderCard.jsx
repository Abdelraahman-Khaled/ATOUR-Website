import Car from "assets/images/IconsHeader/Car";
import "./HeaderCard.css";
import Tree from "assets/images/IconsHeader/Tree";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import { isAuthenticated } from "api/axiosInstance";
import { useState } from "react";
import FormAuth from "Components/Auth/FormAuth/FormAuth";

const HeaderCard = () => {

  const { currentLanguage } = useLanguage(); // Get the current language
  // checking auth
  const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal
  // handle show login form
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const hideLogin = () => {
    setShowLogin(false);
  };
  // checking to login or navigate
  const handleLinkClick = (e) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      handleShowLogin(); // Open login form if not authenticated
    }
  };

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
        en: "Souvenirs",
        ar: "هدايا تذكارية",
        fr: "Souvenirs",
        de: "Souvenirs",
        es: "Recuerdos",
        tr: "Hediyelik Eşyalar",
        ru: "Сувениры",
        zh: "纪念品",
        ko: "기념품",
        pt: "Lembranças",
        ur: "یادگاری تحائف",
        ja: "お土産",
      },
      icon: <Gift />,
      link: "/offers",
    },
  ];

  return (
    <div data-aos="fade-up" className="all-info-card padding-60 d-flex justify-content-center align-items-center gap-3 flex-wrap">
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
      {allButtons.map((item, index) => {
        return (
          <button key={index} className="btn-card-one">
            <Link className="text-black" to={item.link} onClick={handleLinkClick}>
              {item.icon} {item.text[currentLanguage]}
            </Link>
          </button>
        );
      })}
    </div>
  );
};

export default HeaderCard;
