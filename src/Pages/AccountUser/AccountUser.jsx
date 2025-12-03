import "./AccountUser.css";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import { useEffect, useState } from "react";
import UserInfo from "./Components/UserInfo";
import LogOutIcon from "assets/images/AccountUser/LogOutIcon";
import PersonalInformation from "./Components/TabsContentAccount/PersonalInformation/PersonalInformation";
import AccountInformationContent from "./Components/TabsContentAccount/AccountInformationContent/AccountInformationContent";
import SettingsTab from "./Components/TabsContentAccount/SettingsTab/SettingsTab";
import { Link } from "react-router-dom";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext"; // Import Language Context
import translations from "./translations";

const AccountUser = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };


  const [tabs, setTabs] = useState([]);

  // Update tabs state when the language changes
  useEffect(() => {
    const updatedTabs = translations.tabs.map((tab) => ({
      ...tab,
      title: tab.title[currentLanguage],
      active: tab.id === 1, // Set the first tab as active by default
    }));
    setTabs(updatedTabs);
  }, [currentLanguage]);

  const handleTabClick = (id) => {
    setTabs(
      tabs.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

  return (
    <>
      <HelmetInfo titlePage={translations.accountTitle[currentLanguage]} />
      <main>
        <div className="account-user-content padding-80">
          <ContainerMedia>
            <div className="all-tabs-content-account">
              <div className="row g-3 align-items-start">
                <div className="col-12 col-md-4 col-xl-3">
                  <ul
                    data-aos="fade-down"
                    className="nav nav-pills flex-column nav-pills border-account-user h-100"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <UserInfo />
                    </li>
                    {tabs.map((tab) => (
                      <li
                        key={tab.id}
                        className="nav-item nav-item-info"
                        role="presentation"
                      >
                        <button
                          className={`nav-link ${tab.active ? "active" : ""
                            } position-relative`}
                          id={`pills-${tab.id}-tab`}
                          data-bs-toggle="pill"
                          data-bs-target={`#pills-${tab.id}`}
                          type="button"
                          role="tab"
                          aria-controls={`pills-${tab.id}`}
                          aria-selected={tab.active ? "true" : "false"}
                          onClick={() => handleTabClick(tab.id)}
                        >
                          {tab.icon} {tab.title}
                        </button>
                      </li>
                    ))}
                    <li className="nav-item" role="presentation">
                      <Link
                        onClick={handleLogout}
                        to="/"
                        className="logout-button d-flex align-items-center gap-2"
                      >
                        <LogOutIcon /> {translations.logout[currentLanguage]}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-8 col-xl-9">
                  <div
                    className="tab-content w-100 border-account-user h-100"
                    id="pills-tabContent"
                    data-aos="fade-up"
                  >
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={`tab-pane fade ${tab.active ? "show active" : ""
                          }`}
                        id={`pills-${tab.id}`}
                        role="tabpanel"
                        aria-labelledby={`pills-${tab.id}-tab`}
                      >
                        {tab.title === translations.tabs[0].title[currentLanguage] && (
                          <PersonalInformation />
                        )}
                        {tab.title === translations.tabs[1].title[currentLanguage] && (
                          <AccountInformationContent />
                        )}
                        {/* {tab.title === translations.tabs[2].title[currentLanguage] && (
                          <PayInformationTab />
                        )} */}
                        {tab.title === translations.tabs[2].title[currentLanguage] && (
                          <SettingsTab />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContainerMedia>
        </div>
      </main>
    </>
  );
};

export default AccountUser;
