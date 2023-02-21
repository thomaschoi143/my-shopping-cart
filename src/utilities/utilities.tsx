import { Item } from "../app/types";
import { Cart } from "../app/state";

export const calculateTotal = (cart: Cart) => {
	let total = 0;
	Object.keys(cart).forEach((name) => {
		total += cart[name].price * cart[name].quantity;
	});
	return total;
};

export const filterItems = (searchTerm: string, items: Item[]) => {
	return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
};
