import { createSlice } from "@reduxjs/toolkit";
import { State, StorageSlice } from "../../app/state";
import { Item } from "../../app/types";

const initialState: StorageSlice<Item[]> = {
	storage: [],
	isLoading: false,
	hasError: false,
};

const inventorySlice = createSlice({
	name: "inventory",
	initialState: initialState,
	reducers: {},
});

export const selectAllInventoryItems = (state: State) => state.inventory.storage;
export const selectIsLoadingInventory = (state: State) => state.inventory.isLoading;
export const selectHasErrorInventory = (state: State) => state.inventory.hasError;

export default inventorySlice.reducer;
