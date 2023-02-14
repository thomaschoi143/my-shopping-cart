import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencies: ['USD', 'EUR', 'CAD'],
    selected: 'USD'
}

const currencyFilterSlice = createSlice({
    name: 'currencyFilter',
    initialState: initialState,
    reducers: {
        setCurrencyFilter: (currencyFilter, action) => {
            currencyFilter.selected = action.payload;
        }
    }
})

export const { setCurrencyFilter } = currencyFilterSlice.actions;
export const selectCurrencyFilter = (state) => state.currencyFilter.selected;
export const selectCurrencies = (state) => state.currencyFilter.currencies

export default currencyFilterSlice.reducer;