import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import logoFooter from "../../assets/images/logo/logoFooter.svg";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faSnapchat,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import appStore from "../../assets/images/apps/appStorFooter.svg";
import appGoogle from "../../assets/images/apps/googlePlayFooter.svg";
import PhoneIcon from "assets/images/footerIcons/PhoneIcon";
import EmailIcon from "assets/images/footerIcons/EmailIcon";
import WhatsIcon from "assets/images/footerIcons/Whatsapp.Icon";
import { useEffect, useState } from "react";
import GeneralAPI from "api/generalApi";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import { isAuthenticated } from "api/axiosInstance"; // Function to check auth status
import { useLanguage } from "Components/Languages/LanguageContext"; // Import language context
// import Loader from "Components/Auth/Components/Loader/Loader";
const Footer = () => {
  const { currentLanguage } = useLanguage(); // Access the current language from context
  const [footerData, setFooterData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const hideLogin = () => {
    setShowLogin(false);
  };

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await GeneralAPI.getFooterSocial();
        setFooterData(response.data);

      } catch (err) {
        console.error("Failed to fetch footer data:", err);
        setError("Unable to fetch footer data. Please try again later.");
      }
      // finally {
      //   setLoading(false);
      // }
    };
    fetchFooterData();
  }, []);

  // if (loading) {
  //   return (
  //     // <div style={{ margin: "200px 0px" }}>
  //     //   <Loader />
  //     // </div>
  //     <>
  //     </>);
  // }


  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const handleLinkClick = (e) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      handleShowLogin(); // Open login form if not authenticated
    }
  };

  const localizedText = {
    ar: {
      downloadApp: "حمل التطبيق",
      importantLinks: "روابط تهمك",
      contactUs: "تواصل معنا",
      callUs: "إتصل بنا",
      email: "البريد الإلكتروني",
      location: "الموقع",
      rightsReserved: "جميع الحقوق محفوظة",
      home: "الرئيسية",
      offers: "الهدايا",
      events: "الفعاليات",
      blog: "المدونة",
      address: "الرياض , طريق المذنب , السعودية",
      whatsapp: "تواصل معنا"
    },
    en: {
      downloadApp: "Download the App",
      importantLinks: "Important Links",
      contactUs: "Contact Us",
      callUs: "Call Us",
      email: "Email",
      location: "Location",
      rightsReserved: "All rights reserved",
      home: "Home",
      offers: "Gifts",
      events: "Events",
      blog: "Blog",
      address: "Riyadh, Al-Mathnib Road, Saudi Arabia",
      whatsapp: "Contact Us"
    }
  };

  const text = localizedText[currentLanguage] || localizedText.ar;

  return (
    <div className="footer">
      <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />

      {/* =============== START CONTAINER ============== */}
      <ContainerMedia>
        {/* ================= START ALL FOOTER ============== */}
        <div className="all-footer" data-aos="fade-up">
          {/* =============== START ROW ============ */}
          <div className="row  g-4">
            {/* ============= START COL ============= */}
            <div className="col-12 col-sm-6 col-md-5">
              {/* ============ START FOOTER ONE ============ */}
              <div className="footer-one">
                <Link to={"/"}>
                  <img
                    src={logoFooter}
                    alt="logo footer"
                    width={"155px"}
                    height={"71.37px"}
                  />
                </Link>
                <div className="socials-icons">
                  <ul className="list-socials d-flex flex-wrap align-items-center gap-3 p-0 m-0">
                    {footerData?.footer_facebook && (
                      <li>
                        <a
                          href={footerData.footer_facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="link-social-one"
                        >
                          <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                      </li>
                    )}
                    {footerData?.footer_twitter && (
                      <li>
                        <a
                          href={footerData.footer_twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="link-social-one"
                        >
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      </li>
                    )}
                    {footerData?.footer_instagram && (
                      <li>
                        <a
                          href={footerData.footer_instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="link-social-one"
                        >
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      </li>
                    )}
                    {footerData?.footer_snapchat && (
                      <li>
                        <a
                          href={footerData.footer_snapchat}
                          target="_blank"
                          rel="noreferrer"
                          className="link-social-one"
                        >
                          <FontAwesomeIcon icon={faSnapchat} />
                        </a>
                      </li>
                    )}
                    {footerData?.footer_tiktok && (
                      <li>
                        <a
                          href={footerData.footer_tiktok}
                          target="_blank"
                          rel="noreferrer"
                          className="link-social-one"
                        >
                          <FontAwesomeIcon icon={faTiktok} />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                {/* ============= START APPS CONTENT INFO ============ */}
                <div className="apps-content-info">
                  {
                    footerData?.footer_app_store || footerData?.footer_google_play
                      ?
                      <h2 className="title-apps">{text.downloadApp}</h2>
                      : <></>
                  }
                  {/* ============== START APPS LINKS ============= */}
                  <div className="apps-links d-flex align-items-center  gap-3 mt-3">
                    {
                      footerData?.footer_app_store &&
                      <a
                        href={footerData?.footer_app_store}
                        target="_blank"
                        className="link-app-one"
                        rel="noreferrer"
                      >
                        <img src={appStore} alt="app store" />
                      </a>
                    }
                    {
                      footerData?.footer_google_play &&
                      <a
                        href={footerData?.footer_google_play}
                        target="_blank"
                        className="link-app-one"
                        rel="noreferrer"
                      >
                        <img src={appGoogle} alt="app google" />
                      </a>
                    }
                  </div>
                  {/* ============== END APPS LINKS ============= */}
                </div>
                {/* ============= END APPS CONTENT INFO ============ */}
              </div>
              {/* ============ END FOOTER ONE ============ */}
            </div>
            {/* ============= END COL ============= */}
            {/* ============= START COL ============ */}
            <div className="col-12 col-sm-6 col-md-3">
              {/* =========== START FOOTER TWO ========== */}
              <div className="footer-two-links">
                <h2 className="title-footer">{text.importantLinks}</h2>
                <ul className="nav flex-column p-0 m-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      {text.home}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="offers" className="nav-link" onClick={handleLinkClick}>
                      {text.offers}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="eventsPage" className="nav-link" onClick={handleLinkClick}>
                      {text.events}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="blogsPage" className="nav-link" onClick={handleLinkClick}>
                      {text.blog}
                    </Link>
                  </li>
                </ul>
              </div>
              {/* =========== END FOOTER TWO ========== */}
            </div>
            {/* ============= END COL ============ */}
            {/* ============= START COL ============ */}
            <div className="col-12 col-sm-6 col-md-4">
              {/* =========== START FOOTER TWO ========== */}
              <div className="footer-two-links footer-right-contact">
                <h2 className="title-footer">{text.contactUs}</h2>
                {/* =========== START INFO FOOTER CONTENT ========== */}
                <div className="info-footer-content">
                  {/* ========= START INFO CONTACT ONE ========= */}
                  <a
                    href={`tel:${footerData?.phone}`}
                    className="info-contact-one d-flex gap-3"
                    target="_blank"
                  >
                    <div className="icon-foot-contact">
                      <PhoneIcon />
                    </div>
                    <div className="contact-info">
                      <h2 className="title-foot">{text.callUs}</h2>
                      <p className="link-contact">{footerData?.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${footerData?.whatsapp}`}
                    className="info-contact-one d-flex gap-3"
                    target="_blank"
                  >
                    <div className="icon-foot-contact">
                      <WhatsIcon />
                    </div>
                    <div className="contact-info">
                      <h2 className="title-foot">{text.whatsapp}</h2>
                      <p className="link-contact">{footerData?.phone}</p>
                    </div>
                  </a>
                  {/* ========= END INFO CONTACT ONE ========= */}
                  <a
                    href={`mailto:${footerData?.email}?subject=Hello`}
                    className="info-contact-one d-flex gap-3"
                    target="_blank"
                  >
                    <div className="icon-foot-contact">
                      <EmailIcon />
                    </div>
                    <div className="contact-info">
                      <h2 className="title-foot">{text.email}</h2>
                      <p className="link-contact">{footerData?.email}</p>
                    </div>
                  </a>
                  {/* <a href="##" className="info-contact-one d-flex gap-3">
                    <div className="icon-foot-contact">
                      <EmailIcon />
                    </div>
                    <div className="contact-info">
                      <h2 className="title-foot">{text.location}</h2>
                      <p className="link-contact">{text.address}</p>
                    </div>
                  </a> */}
                </div>
                {/* =========== END INFO FOOTER CONTENT ========== */}
              </div>
              {/* =========== END FOOTER TWO ========== */}
            </div>
            {/* ============= END COL ============ */}
          </div>
          {/* =============== END ROW ============ */}
        </div>
        {/* ================= END ALL FOOTER ============== */}
        <div className="final-footer">
          <p className="title-final">
            {text.rightsReserved} ©
            <Link to="/" className="link-web">
              a-tour
            </Link>{" "}
            2024
          </p>
        </div>
      </ContainerMedia>
    </div>
  );
};

export default Footer;
