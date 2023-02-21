import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../features/inventory/inventorySlice";
import cartReducer from "../features/cart/cartSlice";
import searchTermReducer from "../features/searchTerm/searchTermSlice";
import currencyFilterReducer from "../features/currencyFilter/currencyFilterSlice";
import commentsReducer from "../features/comment/commentsSlice";
import currentItemReducer from "../features/currentItem/currentItemSlice";

export const store = configureStore({
	reducer: {
		inventory: inventoryReducer,
		currentItem: currentItemReducer,
		comments: commentsReducer,
		cart: cartReducer,
		searchTerm: searchTermReducer,
		currencyFilter: currencyFilterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
