import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreDataService from "../../services";
import { State, StorageSlice } from "../../app/state";
import { Item } from "../../app/types";

export const loadInventory = createAsyncThunk("inventory/loadInventory", async () => {
	return (await StoreDataService.getInventory()).data;
});

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
			.addCase(loadInventory.fulfilled, (inventory, { payload }) => {
				inventory.storage = payload.inventory;
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
