import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [{
        name: 'Apple',
        price: 12
    }, {
        name: 'Orange',
        price: 10
    }, {
        name: 'Pineapple',
        price: 9
    }, {
        name: 'Banana',
        price: 20
    }, {
        name: 'Lemon',
        price: 14
    }],
    isLoading: false,
    hasError: false
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
        
    }
});

export const selectAllInventoryItems = (state) => state.inventory.items;

export default inventorySlice.reducer;