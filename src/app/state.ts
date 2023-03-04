import { Item, Currency } from "./types";

export interface StorageSlice<T> {
	storage: T | null;
	isLoading: boolean;
	hasError: boolean;
}

export interface Cart {
	[itemName: string]: {
		price: number;
		quantity: number;
	};
}

export interface CurrencyFilter {
	currencies: Currency[];
	selected: Currency;
}

export interface State {
	inventory: StorageSlice<Item[]>;
	currentItem: StorageSlice<Item>;
	cart: Cart;
	searchTerm: string;
	currencyFilter: CurrencyFilter;
}
