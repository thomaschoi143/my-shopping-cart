import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../../app/state";

const searchTermSlice = createSlice({
	name: "searchTerm",
	initialState: "",
	reducers: {
		setSearchTerm: (searchTerm, action: PayloadAction<string>) => {
			return action.payload;
		},
		clearSearchTerm: (searchTerm) => {
			return "";
		},
	},
});

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export const selectSearchTerm = (state: State) => state.searchTerm;

export default searchTermSlice.reducer;
