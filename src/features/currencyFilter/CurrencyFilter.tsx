import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencies,
  selectCurrencyFilter,
  setCurrencyFilter,
} from "./currencyFilterSlice";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { Currency } from "../../app/types";

const CurrencyFilter = () => {
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrencies);
  const currencyFilter = useSelector(selectCurrencyFilter);

  const onChangeHandler = (value: Currency) => {
    dispatch(setCurrencyFilter(value));
  };

  const createCurrencyElement = (currency: Currency) => {
    return (
      <ToggleButton id={currency} key={currency} value={currency}>
        {currency}
      </ToggleButton>
    );
  };

  return (
    <div className="currencyFilterContainer mb-3">
      <p className="h4">Choose a currency</p>
      <ToggleButtonGroup
        type="radio"
        name="currencyFilters"
        defaultValue={currencyFilter}
        onChange={onChangeHandler}
        size="sm"
      >
        {currencies.map((currency: Currency) =>
          createCurrencyElement(currency)
        )}
      </ToggleButtonGroup>
    </div>
  );
};

export default CurrencyFilter;
