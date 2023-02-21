import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getItemDetails } from "../../api";
import { StorageSlice, State } from "../../app/state";
import { Item } from "../../app/types";

export const loadCurrentItem = createAsyncThunk(
	"loadCurrentItem",
	async (name: string) => await getItemDetails(name)
);

const initialState: StorageSlice<Item> = {
	storage: null,
	isLoading: false,
	hasError: false,
};

const currentItemSlice = createSlice({
	name: "currentItem",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadCurrentItem.pending, (currentItem) => {
				currentItem.isLoading = true;
				currentItem.hasError = false;
			})
			.addCase(loadCurrentItem.fulfilled, (currentItem, action: PayloadAction<Item>) => {
				currentItem.storage = action.payload;
				currentItem.isLoading = false;
				currentItem.hasError = false;
			})
			.addCase(loadCurrentItem.rejected, (currentItem) => {
				currentItem.isLoading = false;
				currentItem.hasError = true;
			});
	},
});

export const selectCurrentItem = (state: State) => state.currentItem.storage;
export const selectIsLoading = (state: State) => state.currentItem.isLoading;
export const selectHasError = (state: State) => state.currentItem.hasError;

export default currentItemSlice.reducer;
