export interface Item {
	_id: string;
	name: string;
	price: number;
	picture: string;
	description: string;
	comments?: Comment[];
	size?: Size[];
}

export type Currency = string;

export enum Size {
	Small = "Small",
	Medium = "Medium",
	Large = "Large",
}

export interface Comment {
	itemName: string;
	author: string;
	text: string;
	rating: number;
	isRecommend: boolean;
	date: string;
}
