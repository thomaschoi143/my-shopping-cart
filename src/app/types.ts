export interface Item {
	_id: string;
	name: string;
	category: string;
	price: number;
	picture: string;
	description: string;
}

export type Currency = string;

export enum Size {
	Small = "Small",
	Medium = "Medium",
	Large = "Large",
}

export interface Review {
	name: string;
	text: string;
	rating: number;
	isRecommend: boolean;
	date: string;
}
