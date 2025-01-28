import Car from "assets/images/IconsHeader/Car";
import "./HeaderCard.css";
import Hotel from "assets/images/IconsHeader/Hotel";
import Fork from "assets/images/IconsHeader/Fork";
import Tree from "assets/images/IconsHeader/Tree";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";

const HeaderCard = () => {

  const { currentLanguage } = useLanguage(); // Get the current language

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
      {allButtons.map((item) => {
        return (
          <button className="btn-card-one">
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
