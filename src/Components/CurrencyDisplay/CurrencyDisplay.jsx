import { useCurrency } from "Components/Currencies/CurrencyContext";
import React, { useContext } from "react";
import sarSymbol from "../../assets/images/currency/SAR_sybmol.png";

const currencies = {
    SAR: { name: "SAR", symbol: sarSymbol, isImage: true },
    EUR: { name: "EUR", symbol: "€", isImage: false },
    USD: { name: "USD", symbol: "$", isImage: false },
};

const CurrencyDisplay = ({ price }) => {
    const { currentCurrency } = useCurrency()

    // Default to USD if somehow undefined
    const currency = currencies[currentCurrency] || { name: "USD", symbol: "$", isImage: false };

    return (
        <span>
            {price} {currency.isImage ? (
                <img
                    src={currency.symbol}
                    alt={currency.name}
                    className="currency-image"
                    style={{ minHeight: "16px" }}
                />
            ) : (
                currency.symbol
            )}
        </span>
    );
};

export default CurrencyDisplay;
