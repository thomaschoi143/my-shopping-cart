import { Item } from "../app/types";
import { Cart } from "../app/state";
import { stringify } from "querystring";

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

const appendZero = (number: number) => (number <= 9 ? "0" + number : number.toString());

export const getDisplayDatetime = (ISOString: string) => {
	const d = new Date(ISOString);

	const year = d.getFullYear();
	const month = appendZero(d.getMonth() + 1);
	const date = appendZero(d.getDate());
	const hours = appendZero(d.getHours());
	const minutes = appendZero(d.getMinutes());

	return `${year}/${month}/${date} ${hours}:${minutes}`;
};
