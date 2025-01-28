import ToggleBars from "assets/Icons/ToggleBars";
import { Link } from "react-router-dom";
import "./BreadcrumbsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import { useLanguage } from "Components/Languages/LanguageContext";

const BreadcrumbsPage = ({
  newClassBreadHeader,
  routeTitleTwoBread,
  titleTwoBread,
  textBreadActive,
}) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <div
      data-aos="fade-left"
      className={`breadcrumb-page position-relative z-1 ${newClassBreadHeader}`}
    >
      <ContainerMedia>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb gap-1">
            {/* First Breadcrumb: Home */}
            <li className="breadcrumb-item">
              <Link
                to="/"
                className="link-bread d-flex align-items-center gap-2"
              >
                <ToggleBars />
                {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
              </Link>
            </li>

            {/* Chevron Icon */}
            <li className="breadcrumb-item">
              <div className="icon-chevron--1">
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            </li>

            {/* Second Breadcrumb: Conditional Rendering for titleTwoBread */}
            {titleTwoBread && (
              <>
                <li className="breadcrumb-item">
                  <Link
                    to={routeTitleTwoBread}
                    className="link-bread d-flex align-items-center gap-2"
                  >
                    {titleTwoBread}
                  </Link>
                </li>

                {/* Chevron Icon */}
                <li className="breadcrumb-item">
                  <div className="icon-chevron--1">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                </li>
              </>
            )}
            {/* Active Breadcrumb */}
            <li
              className="breadcrumb-item active d-flex align-items-center gap-2"
              aria-current="page"
            >
              {textBreadActive}
            </li>
          </ol>
        </nav>
      </ContainerMedia>
    </div>
  );
};

// Default Props (Optional)
BreadcrumbsPage.defaultProps = {
  routeTitleTwoBread: "/", // Default route if not provided
  titleTwoBread: null, // Default to null if not provided
};

export default BreadcrumbsPage;