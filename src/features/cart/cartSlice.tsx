import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../app/types";
import { State, Cart } from "../../app/state";

const cartSlice = createSlice({
	name: "cart",
	initialState: {} as Cart,
	reducers: {
		addItem: (cart, action: PayloadAction<Item>) => {
			const { name, price } = action.payload;
			const quantity = cart[name] ? cart[name].quantity + 1 : 1;
			const newItem = { price, quantity };
			cart[name] = newItem;
		},
		updateItemQuantity: (cart, action) => {
			const { name, quantity } = action.payload;
			cart[name].quantity = quantity;
		},
		removeItem: (cart, action: PayloadAction<string>) => {
			const name = action.payload;
			if (cart[name]) {
				delete cart[name];
			}
		},
		clearCart: (cart) => {
			return {};
		},
	},
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state: State) => state.cart;

export default cartSlice.reducer;
