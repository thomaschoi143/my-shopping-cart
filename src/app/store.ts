import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import currencyFilterReducer from "../features/currencyFilter/currencyFilterSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		currencyFilter: currencyFilterReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
