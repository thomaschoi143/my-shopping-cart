import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../../app/state";

const initialState = {
	currencies: ["USD", "EUR", "CAD"],
	selected: "USD",
};

const currencyFilterSlice = createSlice({
	name: "currencyFilter",
	initialState: initialState,
	reducers: {
		setCurrencyFilter: (currencyFilter, action: PayloadAction<string>) => {
			currencyFilter.selected = action.payload;
		},
	},
});

export const { setCurrencyFilter } = currencyFilterSlice.actions;
export const selectCurrencyFilter = (state: State) => state.currencyFilter.selected;
export const selectCurrencies = (state: State) => state.currencyFilter.currencies;

export default currencyFilterSlice.reducer;
