import Car from "assets/images/IconsHeader/Car";
import "./HeaderCard.css";
import Hotel from "assets/images/IconsHeader/Hotel";
import Fork from "assets/images/IconsHeader/Fork";
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
      text: { en: "Trips", ar: "رحلات" },
      icon: <Tree />,
      link: "/tripsPage",
    },
    {
      text: { en: "Events", ar: "فعاليات" },
      icon: <Ticket />,
      link: "/eventsPage",
    },
    {
      text: { en: "Souvenirs", ar: "هدايا تذكارية" },
      icon: <Gift />,
      link: "/offers",
    },
  ];
  return (
    <div data-aos="fade-up" className="all-info-card padding-60 d-flex justify-content-center align-items-center gap-3 flex-wrap">
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
      {allButtons.map((item) => {
        return (
          <button className="btn-card-one">
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
