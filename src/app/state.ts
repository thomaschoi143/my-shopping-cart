import { Item, Currency, Comment } from "./types";

export interface StorageSlice<T> {
	storage: T | null;
	isLoading: boolean;
	hasError: boolean;
}

export interface Comments {
	commentsList: Comment[];
	isLoadingComments: boolean;
	failedToLoadComments: boolean;
	createCommentIsPending: boolean;
	failedToCreateComment: boolean;
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
	comments: Comments;
	cart: Cart;
	searchTerm: string;
	currencyFilter: CurrencyFilter;
}
