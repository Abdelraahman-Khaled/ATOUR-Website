import { Dropdown } from "react-bootstrap";
import UserIcon from "assets/images/AccountUser/UserIcon";
import DateIcon from "assets/images/IconsBooks/DateIcon";
import LogOutIcon from "assets/images/AccountUser/LogOutIcon";
import { Link } from "react-router-dom";
import useTranslation from "Components/Languages/useTranslation";
const UserDropMenu = () => {
  const { t } = useTranslation(); // Get the translation function and i18n instance

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.reload(); // Redirect to the login page
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
              <UserIcon /> {t('userDropMenu.accountInfo')}
            </Link>
          </Dropdown.Item>

          {/* My Reservations */}
          <Dropdown.Item>
            <Link className="link-drop-item" to="/reservations">
              <DateIcon /> {t('userDropMenu.myReservations')}
            </Link>
          </Dropdown.Item>

          {/* Currency */}
          {/* <Dropdown.Item>
            <img src={flagSa} alt="flag" width={"24px"} height={"24px"} />
            {t('userDropMenu.currency')}
          </Dropdown.Item> */}

          {/* Log Out */}
          <Dropdown.Item>
            <Link
              onClick={handleLogout}
              to="/"
              className="link-drop-item logout-drop"
            >
              <LogOutIcon /> {t('userDropMenu.logout')}
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropMenu;