import { Dropdown } from "react-bootstrap";
import imgUser from "../../../assets/images/users/02.png";
import UserIcon from "assets/images/AccountUser/UserIcon";
import DateIcon from "assets/images/IconsBooks/DateIcon";
import flagSa from "../../../assets/images/flag/sa.svg";
import LogOutIcon from "assets/images/AccountUser/LogOutIcon";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext"; // Import the language hook

const UserDropMenu = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.reload(); // Redirect to the login page
  };


// Translations for the dropdown items
const translations = {
  accountInfo: { ar: "معلومات الحساب", en: "Account Information" },
  myReservations: { ar: "حجوزاتي", en: "My Reservations" },
  currency: { ar: "ريال سعودي", en: "Saudi Riyal" },
  logout: { ar: "تسجيل الخروج", en: "Log Out" },
};
  return (
    <div className="dropmenu-user">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic--1" className="drop-user">
          <div className="image-user-login d-flex align-items-center justify-content-center">
            <img
              src={"https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"}
              alt="imgUser"
              width={"45px"}
              height={"45px"}
            />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* Account Information */}
          <Dropdown.Item>
            <Link className="link-drop-item" to="/accountUser">
              <UserIcon /> {translations.accountInfo[currentLanguage]}
            </Link>
          </Dropdown.Item>

          {/* My Reservations */}
          <Dropdown.Item>
            <Link className="link-drop-item" to="/reservations">
              <DateIcon /> {translations.myReservations[currentLanguage]}
            </Link>
          </Dropdown.Item>

          {/* Currency */}
          {/* <Dropdown.Item>
            <img src={flagSa} alt="flag" width={"24px"} height={"24px"} />
            {translations.currency[currentLanguage]}
          </Dropdown.Item> */}

          {/* Log Out */}
          <Dropdown.Item>
            <Link
              onClick={handleLogout}
              to="/"
              className="link-drop-item logout-drop"
            >
              <LogOutIcon /> {translations.logout[currentLanguage]}
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropMenu;