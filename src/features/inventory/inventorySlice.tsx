import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getInventory } from "../../api";
import { State, StorageSlice } from "../../app/state";
import { Item } from "../../app/types";

export const loadInventory = createAsyncThunk("loadInventory", async () => await getInventory());

const initialState: StorageSlice<Item[]> = {
	storage: [],
	isLoading: false,
	hasError: false,
};

const inventorySlice = createSlice({
	name: "inventory",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadInventory.pending, (inventory) => {
				inventory.isLoading = true;
				inventory.hasError = false;
			})
			.addCase(loadInventory.fulfilled, (inventory, action: PayloadAction<Item[]>) => {
				inventory.storage = action.payload;
				inventory.isLoading = false;
				inventory.hasError = false;
			})
			.addCase(loadInventory.rejected, (inventory) => {
				inventory.isLoading = false;
				inventory.hasError = true;
			});
	},
});

export const selectAllInventoryItems = (state: State) => state.inventory.storage;
export const selectIsLoadingInventory = (state: State) => state.inventory.isLoading;
export const selectHasErrorInventory = (state: State) => state.inventory.hasError;

export default inventorySlice.reducer;
