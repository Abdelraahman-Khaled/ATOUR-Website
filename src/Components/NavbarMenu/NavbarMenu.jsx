import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./NavbarMenu.css";
import { useEffect, useState, useRef } from "react";
import LanguageSwitcher from "Components/Languages/LanguageSwitcher";
import CurrencySwitcher from "Components/Currencies/CurrencySwitcher";
import HeartIcon from "assets/Icons/HeartIcon";
import UserDropMenu from "Components/Ui/UserDropMenu/UserDropMenu";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import SearchInputLocation from "Components/Ui/SearchInputLocation/SearchInputLocation";
import ContentAPI from "api/contentApi";
import CountryAPI from "api/country";
import { isAuthenticated } from "api/axiosInstance";
import useTranslation from "Components/Languages/useTranslation";
import ThemeToggle from "Components/ThemeToggle/ThemeToggle";
import { toast } from "react-toastify";
import ToastContainerApp from "Components/ToastContainerApp/ToastContainerApp";
import { useLanguage } from "Components/Languages/LanguageContext";
import NotificationIcon from "assets/Icons/NotificationIcon";
import { useHome } from "context/HomeContext";

const NavbarMenu = () => {
  const { t } = useTranslation(); // Get the translation function
  const [isMenuFixed, setMenuFixed] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]); // Reintroduce cities state
  const [searchableItems, setSearchableItems] = useState([]); // New state for combined data
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  // open form when it route
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const { currentLanguage } = useLanguage()
  const { notification_count } = useHome();


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
    const fetchAllData = async () => {
      try {
        const [responseCountries, responseCities] = await Promise.all([
          CountryAPI.getCountries(currentLanguage),
          ContentAPI.getCities(currentLanguage),
        ]);
        setCountries(responseCountries.data || []);
        setCities(responseCities.data || []);
      } catch (err) {
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [currentLanguage]);

  useEffect(() => {
    if (countries.length > 0 && cities.length > 0) {
      const combined = cities.map(city => {
        const country = countries.find(c => c.id === city.country_id);
        return {
          ...city,
          countryName: country ? country.title : 'Unknown',
          type: 'city'
        };
      });
      setSearchableItems(combined);
    }
  }, [countries, cities]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

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
      <Navbar expanded={expanded} expand="lg" className={`navbar-menu z-3 ${isMenuFixed ? "menu-fixed" : ""}`} ref={navbarRef}>
        <ContainerMedia>
          <Navbar.Brand data-aos="fade-left">
            <Link to="/" className="image-logo">
              <img src={logo} alt="logo" width={"81.59px"} height={"37.52px"} />
            </Link>
          </Navbar.Brand>

          <div className="navbar-search" data-aos="fade-right">
            <SearchInputLocation searchItems={searchableItems} setSelectedCity={setSelectedCity} />
          </div>

          <div className="main-info-left d-flex align-items-center gap-3" data-aos="fade-right">
            <div className="icon-lang icon-border">
              <LanguageSwitcher align="end" popperOffset={[-8, 8]} renderToBody={true} />
            </div>
            <div className="icon-lang icon-border">
              <CurrencySwitcher />
            </div>
            <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} aria-controls="basic-navbar-nav" />
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className="nav-menu">
            <Nav className="me-auto" data-aos="fade-right">

              {/* 
              <NavDropdown title={"استكشف"} id="basic-nav-dropdown">


                <NavDropdown
                  title={"الجولات"}
                  id="basic-nav-dropdown"
                  drop="end" // Makes dropdown menu appear to the right
                >
                  <NavDropdown.Item as={NavLink} to="/trips/sites">
                    جولات مواقع
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/trips/city">
                    جولات المدينة
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/trips/cooking">
                    جولة طهي
                  </NavDropdown.Item>
                </NavDropdown>


                <NavDropdown
                  title={"الفعاليات"}
                  id="basic-nav-dropdown"
                  drop="end" // Makes dropdown menu appear to the right
                >
                  <NavDropdown.Item as={NavLink} to={`/trips/effectiveness/4`}>
                    مخصصة
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to={`/trips/effectiveness/7`}>
                    فعاليات ترفيهية
                  </NavDropdown.Item>
                </NavDropdown>


                <NavDropdown
                  title={"المنتجات"}
                  id="basic-nav-dropdown"
                  drop="end" // Makes dropdown menu appear to the right
                >
                  <NavDropdown.Item as={NavLink} to="/trips/gift/3">
                    هدايا تذكارية
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/trips/gift/5">
                    مستلزمات هايكنق
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/trips/gift/6">
                    مستلزمات غوص
                  </NavDropdown.Item>
                </NavDropdown>

              </NavDropdown> */}



              {/* <NavLink to="/blogsPage" className="nav-link">
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
              </NavLink> */}
              <SearchInputLocation searchItems={searchableItems} setSelectedCity={setSelectedCity} />
            </Nav>

            <div className="left-nav-menu d-flex align-items-center gap-3 ">
              <div className="icon-lang icon-border">
                <LanguageSwitcher align="end" popperOffset={[-8, 8]} renderToBody={true} />
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
                  <Link to="/notification" className="icon-notification icon-border" style={{ position: 'relative' }}>
                    <NotificationIcon />
                    {notification_count > 0 && (

                      <span className="badge">
                        {notification_count}
                      </span>
                    )}
                  </Link>
                  <UserDropMenu />
                </>
              ) : (
                <>
                  <Link to="#" className="icon-heart-fav icon-border" onClick={buttonShowLogin}>
                    <HeartIcon />
                  </Link>
                  <Link to="#" className="icon-notification icon-border" onClick={buttonShowLogin} style={{ position: 'relative' }}>
                    <NotificationIcon />
                  </Link>
                  <button className="btn-main" onClick={buttonShowLogin}>
                    {t('navMenu.login')}
                  </button>

                </>
              )}
            </div>
          </Navbar.Collapse>
        </ContainerMedia>
      </Navbar >
    </>
  );
};

export default NavbarMenu;
