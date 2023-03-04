import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../features/inventory/inventorySlice";
import cartReducer from "../features/cart/cartSlice";
import searchTermReducer from "../features/searchBar/searchTermSlice";
import currencyFilterReducer from "../features/currencyFilter/currencyFilterSlice";

export const store = configureStore({
	reducer: {
		inventory: inventoryReducer,
		cart: cartReducer,
		searchTerm: searchTermReducer,
		currencyFilter: currencyFilterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
