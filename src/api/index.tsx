import { Comment } from "../app/types";

export const getInventory = async () => {
	const response = await fetch("/api/inventory", {
		method: "GET",
	});
	return await response.json();
};

export const getItemDetails = async (name: string) => {
	const response = await fetch(`/api/inventory/${name.replace("-", " ")}`, {
		method: "GET",
	});

	return await response.json();
};

export const getCommentsByItemName = async (itemName: string) => {
	const response = await fetch(`/api/comments/${itemName}`, {
		method: "GET",
	});
	return await response.json();
};

export const postCommentForItemName = async (comment: Comment) => {
	const response = await fetch(`/api/comments/${comment.itemName}`, {
		method: "POST",
		body: JSON.stringify({ comment }),
	});
	return await response.json();
};
