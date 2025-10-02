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
import { useLanguage } from "Components/Languages/LanguageContext"; // Import language context
import localizedText from "../../translations/footerTranslations";
import { useFooter } from "../../context/FooterContext"; // Import the FooterContext
const Footer = () => {
  const { currentLanguage } = useLanguage(); // Access the current language from context
  const { footerData, error } = useFooter(); // Use the FooterContext

  // if (loading) {
  //   return (
  //     <div style={{ margin: "200px 0px" }}>
  //       <Loader />
  //     </div>
  //   );
  // }


  if (error) {
    return null; // No need to display error here, toast will handle it
  }



  const text = localizedText[currentLanguage] || localizedText.ar;

  return (
    <div className="footer">

      {/* =============== START CONTAINER ============== */}
      <ContainerMedia>
        {/* ================= START ALL FOOTER ============== */}
        <div className="all-footer" data-aos="fade-up">
          {/* =============== START ROW ============ */}
          <div className="row  g-4">
            {/* ============= START COL ============= */}
            <div className="col-12 col-sm-6 col-md-4">
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
                    <Link to="offers" className="nav-link" >
                      {text.offers}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="eventsPage" className="nav-link" >
                      {text.events}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="blogsPage" className="nav-link" >
                      {text.blog}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="articals" className="nav-link" >
                      {text.articles}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="news" className="nav-link" >
                      {text.news}
                    </Link>
                  </li>

                </ul>
              </div>
              {/* =========== END FOOTER TWO ========== */}
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              {/* =========== START FOOTER TWO ========== */}
              <div className="footer-two-links">
                <h2 className="title-footer">{text.helpfulLinks}</h2>
                <ul className="nav flex-column p-0 m-0">
                  <li className="nav-item">
                    <Link to="/faq" className="nav-link" >
                      {text.faq}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/aboutUs" className="nav-link" >
                      {text.aboutUs}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/termsConditions" className="nav-link" >
                      {text.cancelTerms}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contactUs" className="nav-link" >
                      {text.contactUs}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/help" className="nav-link" >
                      {text.help}
                    </Link>
                  </li>
                </ul>
              </div>
              {/* =========== END FOOTER TWO ========== */}
            </div>
            {/* ============= END COL ============ */}
            {/* ============= START COL ============ */}
            <div className="col-12 col-sm-6 col-md-2">
              {/* =========== START FOOTER TWO ========== */}
              <div className="footer-two-links footer-right-contact">
                <h2 className="title-footer">{text.whatsapp}</h2>
                {/* =========== START INFO FOOTER CONTENT ========== */}
                <div className="info-footer-content">
                  {/* ========= START INFO CONTACT ONE ========= */}
                  <a
                    href={`tel:${footerData?.phone}`}
                    className="info-contact-one d-flex gap-3 align-items-center"
                    target="_blank"
                  >
                    <div className="icon-foot-contact">
                      <PhoneIcon />
                    </div>
                    <div className="contact-info">
                      <p className="link-contact">{footerData?.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${footerData?.whatsapp}`}
                    className="info-contact-one d-flex gap-3 align-items-center"
                    target="_blank"
                  >
                    <div className="icon-foot-contact">
                      <WhatsIcon />
                    </div>
                    <div className="contact-info">
                      <p className="link-contact">{footerData?.whatsapp}</p>
                    </div>
                  </a>
                  {/* ========= END INFO CONTACT ONE ========= */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${footerData?.email}&su=Hello`}
                    className="info-contact-one d-flex gap-3 align-items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="icon-foot-contact">
                      <EmailIcon />
                    </div>
                    <div className="contact-info">
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
          <p className="title-final mb-3">
            {text.rightsReserved} ©
            <Link to="/" className="link-web">
              a-tour
            </Link>{" "}
            2024
          </p>
          <div className="license-number-footer">
            <span className="license-number-text">
              <p>{text.travelLicenseNumber}</p>
              <p>73106456</p>
            </span>
            <span className="license-number-text">
              <p>{text.commercialRegistrationNumber}</p>
              <p>7038542556</p>
            </span>
            <span className="license-number-text">
              <p>{text.category}</p>
              <p>{text.generalTravelTourismService}</p>
            </span>
          </div>
        </div>
      </ContainerMedia>
    </div>
  );
};

export default Footer;
