import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./NavbarMenu.css";
import { useEffect, useState } from "react";
import LanguageSwitcher from "Components/Languages/LanguageSwitcher";
import HeartIcon from "assets/Icons/HeartIcon";
import UserDropMenu from "Components/Ui/UserDropMenu/UserDropMenu";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import SearchInputLocation from "Components/Ui/SearchInputLocation/SearchInputLocation";
import ContentAPI from "api/contentApi";
import LoaderSvg from "assets/Icons/LoaderSvg";
import { isAuthenticated } from "api/axiosInstance";
import { useLanguage } from "Components/Languages/LanguageContext";
import Gift from "assets/images/IconsHeader/Gift";

const NavbarMenu = () => {
  const { currentLanguage } = useLanguage(); // Get the current language from the context
  const [isMenuFixed, setMenuFixed] = useState(false);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  // open form when it route
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setMenuFixed(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonShowLogin = () => setShowLogin(true);
  const hideLogin = () => setShowLogin(false);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const responseCities = await ContentAPI.getCities();
        setCities(responseCities.data || []);
      } catch (err) {
        setError("Failed to fetch cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      navigate(`/biographyPage/${selectedCity}`);
      setSelectedCity(null);
    }
  }, [selectedCity, navigate]);

  useEffect(() => {
    if (location.state?.showLogin) {
      setShowLogin(true);
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="flex-center-center h-50vh">
        <span style={{ scale: "1" }}>
          <LoaderSvg />
        </span>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
 

  return (
    <>
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
      <Navbar expand="lg" className={`navbar-menu z-3 ${isMenuFixed ? "menu-fixed" : ""}`}>
        <ContainerMedia>
          <Navbar.Brand data-aos="fade-left">
            <Link to="/" className="image-logo">
              <img src={logo} alt="logo" width={"81.59px"} height={"37.52px"} />
            </Link>
          </Navbar.Brand>

          <div className="navbar-search" data-aos="fade-right">
            <SearchInputLocation cities={cities} setSelectedCity={setSelectedCity} />
          </div>

          <div className="main-info-left d-flex align-items-center gap-3" data-aos="fade-right">
            <div className="icon-lang icon-border">
              <LanguageSwitcher />
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className="nav-menu">
            {isAuthenticated() ? (
              <Nav className="me-auto" data-aos="fade-right">
                {/* <NavLink className="nav-link" to="/eventsPage">
                  {currentLanguage === "en" ? "Events" : "الفعاليات"}
                </NavLink>
                <NavLink className="nav-link" to="/offers">
                  <Gift />
                  {currentLanguage === "en" ? " gifts " : "الهدايا "}
                </NavLink> */}
                <SearchInputLocation cities={cities} setSelectedCity={setSelectedCity} />
              </Nav>
            ) : (
              <Nav className="me-auto" data-aos="fade-right">
                {/* <span className="nav-link pointer" onClick={buttonShowLogin}>
                  {currentLanguage === "en" ? "Events" : "الفعاليات"}
                </span>
                <span className="nav-link pointer" onClick={buttonShowLogin}>
                  <Gift />
                  {currentLanguage === "en" ? " gifts " : "الهدايا "}
                </span> */}
                <SearchInputLocation cities={cities} setSelectedCity={buttonShowLogin} />
              </Nav>
            )}

            <div className="left-nav-menu d-flex align-items-center gap-3">
              <div className="icon-lang icon-border">
                <LanguageSwitcher />
              </div>
              {isAuthenticated() ? (
                <>
                  <Link to="/favoritePage" className="icon-heart-fav icon-border">
                    <HeartIcon />
                  </Link>
                  <UserDropMenu />
                </>
              ) : (
                <button className="btn-main" onClick={buttonShowLogin}>
                  {currentLanguage === "en" ? "Login" : "تسجيل الدخول"}
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </ContainerMedia>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
