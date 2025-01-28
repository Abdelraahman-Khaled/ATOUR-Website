import { useLanguage } from "./LanguageContext";
import LanguageIcon from "assets/Icons/LanguageIcon";
import { Dropdown } from "react-bootstrap";

const LanguageSwitcher = () => {
  // SWT CURRENT LANGUAGE
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  // ON CLIK LANG SET LANGUAGE I CLIKED
  const handleLanguageChange = newLanguage => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <Dropdown onSelect={handleLanguageChange}>
      <Dropdown.Toggle id="dropdown-basic" className="drop-lang">
        <div className="lang cursor-pointer-1 d-flex align-items-center gap-1 flex-row-reverse">
          <LanguageIcon />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="en">Eng</Dropdown.Item>
        <Dropdown.Item eventKey="ar">العربية</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
