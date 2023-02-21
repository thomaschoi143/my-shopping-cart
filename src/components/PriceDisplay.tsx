import React from "react";
import { useSelector } from "react-redux";
import { selectCurrencyFilter } from "../features/currencyFilter/currencyFilterSlice";
import { Currency } from "../app/types";

type PriceDisplayProps = {
  price: number;
};

const PriceDisplay = ({ price }: PriceDisplayProps) => {
  const currency = useSelector(selectCurrencyFilter);
  return <span>{getPriceDisplay(price, currency)}</span>;
};

export default PriceDisplay;

const calculatePrice = (price: number, currency: Currency) => {
  switch (currency) {
    case "EUR":
      return price * 0.86;
    case "CAD":
      return price * 1.33;
    default:
      return price;
  }
};

const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case "USD":
    case "CAD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "";
  }
};

export const getPriceDisplay = (price: number, currency: Currency) =>
  `${getCurrencySymbol(currency)}${calculatePrice(price, currency).toFixed(
    2
  )} ${currency}`;
