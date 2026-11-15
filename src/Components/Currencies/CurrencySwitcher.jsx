import { useCurrency } from "./CurrencyContext";
import { Dropdown } from "react-bootstrap";
import "./CurrencySwitcher.css";
import sarSymbol from "../../assets/images/currency/SAR_sybmol.png";

const CurrencySwitcher = () => {
  // SET CURRENT CURRENCY
  const { currentCurrency, setCurrentCurrency } = useCurrency();

  // Currency options with symbols
  const currencies = {
    SAR: { name: "SAR", symbol: sarSymbol, isImage: true },
    EUR: { name: "EUR", symbol: "€", isImage: false },
    USD: { name: "USD", symbol: "$", isImage: false },
  };

  // ON CLICK CURRENCY SET CURRENCY I CLICKED
  const handleCurrencyChange = (newCurrency) => {
    setCurrentCurrency(newCurrency);
  };

  return (
    <Dropdown onSelect={handleCurrencyChange}>
      <Dropdown.Toggle id="dropdown-basic" className="drop-currency">
        <div className="currency cursor-pointer-1 d-flex align-items-center gap-1 flex-row-reverse">
          <span className="current-currency">
            {currencies[currentCurrency].isImage ? (
              <img
                src={currencies[currentCurrency].symbol}
                alt={currencies[currentCurrency].name}
                className="currency-image"
              />
            ) : (
              currencies[currentCurrency].symbol
            )}
          </span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="currency-dropdown-menu">
        {Object.entries(currencies).map(([code, { name, symbol, isImage }]) => (
          <Dropdown.Item eventKey={code} key={code} className="currency-item">
            <span className="currency-symbol text-center w-100">
              {isImage ? (
                <img src={symbol} alt={name} className="currency-image" />
              ) : (
                symbol
              )}
              <span className="px-2">{name}</span>
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CurrencySwitcher;
