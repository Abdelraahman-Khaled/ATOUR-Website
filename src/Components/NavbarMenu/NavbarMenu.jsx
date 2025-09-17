import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./NavbarMenu.css";
import { useEffect, useState } from "react";
import LanguageSwitcher from "Components/Languages/LanguageSwitcher";
import CurrencySwitcher from "Components/Currencies/CurrencySwitcher";
import HeartIcon from "assets/Icons/HeartIcon";
import UserDropMenu from "Components/Ui/UserDropMenu/UserDropMenu";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import SearchInputLocation from "Components/Ui/SearchInputLocation/SearchInputLocation";
import ContentAPI from "api/contentApi";
import { isAuthenticated } from "api/axiosInstance";
import useTranslation from "Components/Languages/useTranslation";
import Loader from "Components/Auth/Components/Loader/Loader";
import ThemeToggle from "Components/ThemeToggle/ThemeToggle";
import { toast } from "react-toastify";
import ToastContainerApp from "Components/ToastContainerApp/ToastContainerApp";

const NavbarMenu = () => {
  const { t } = useTranslation(); // Get the translation function
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
        toast.error("Failed to fetch cities. Please try again later.");
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

  // if (loading) {
  //   return (
  //     <div style={{ margin: "200px 0px" }}>
  //       <Loader />
  //     </div>
  //   );
  // }


  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }


  return (
    <>
      <ToastContainerApp />
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
            <div className="icon-lang icon-border">
              <CurrencySwitcher />
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className="nav-menu">
            <Nav className="me-auto" data-aos="fade-right">
              <NavLink to="/blogsPage" className="nav-link">
                {t('navMenu.blog')}
              </NavLink>
              <NavLink to="/news" className="nav-link">
                {t('navMenu.news')}
              </NavLink>
              <NavLink to="/articles" className="nav-link">
                {t('navMenu.articles')}
              </NavLink>
              <NavLink to="/aboutUs" className="nav-link">
                {t('navMenu.aboutUs')}
              </NavLink>
              <NavLink to="/termsConditions" className="nav-link">
                {t('navMenu.termsConditions')}
              </NavLink>
              <SearchInputLocation cities={cities} setSelectedCity={isAuthenticated() ? setSelectedCity : buttonShowLogin} />
            </Nav>

            <div className="left-nav-menu d-flex align-items-center gap-3 ">
              <div className="icon-lang icon-border">
                <LanguageSwitcher />
              </div>
              <div className="icon-lang icon-border">
                <CurrencySwitcher />
              </div>
              <ThemeToggle />
              {isAuthenticated() ? (
                <>
                  <Link to="/favoritePage" className="icon-heart-fav icon-border">
                    <HeartIcon />
                  </Link>
                  <UserDropMenu />
                </>
              ) : (
                <>
                  <Link to="#" className="icon-heart-fav icon-border" onClick={buttonShowLogin}>
                    <HeartIcon />
                  </Link>
                  <button className="btn-main" onClick={buttonShowLogin}>
                    {t('navMenu.login')}
                  </button>

                </>
              )}
            </div>
          </Navbar.Collapse>
        </ContainerMedia>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
