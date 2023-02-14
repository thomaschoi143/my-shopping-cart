import { createSlice } from "@reduxjs/toolkit";

const searchTermSlice = createSlice({
    name: 'searchTerm',
    initialState: '',
    reducers: {
        setSearchTerm: (searchTerm, action) => {
            return action.payload;
        },
        clearSearchTerm: (searchTerm) => {
            return '';
        }
    }
})

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export const selectSearchTerm = (state) => state.searchTerm;

export default searchTermSlice.reducer;