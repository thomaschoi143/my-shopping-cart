import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        addItem: (state, action) => {
            const { name, price } = action.payload;
            const quantity = state[name] ? state[name].quantity + 1 : 1;
            const newItem = {price, quantity};
            state[name] = newItem;
        }, 
        updateItemQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            state[name].quantity = quantity;
        },
        removeItem: (state, action) => {
            const name = action.payload;
            if (state[name]) {
                delete state[name];
            }
        }
    }
})

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export const selectCartItems = (state) => state.cart;

export default cartSlice.reducer;