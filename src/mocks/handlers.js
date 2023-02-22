import { rest } from "msw";
import inventory from "./data/inventory.json";
import comments from "./data/comments.json";
import { API_DELAY_MS } from "../app/constants";

inventory = inventory.inventory;
comments = comments.comments;

const userComments = {};

export const handlers = [
	rest.get("/api/inventory", (req, res, ctx) => {
		return res(ctx.delay(API_DELAY_MS), ctx.status(200), ctx.json(inventory));
	}),
	rest.get("/api/inventory/:name", (req, res, ctx) => {
		const { name } = req.params;
		let response = inventory.find((item) => item.name === name);
		if (!response) {
			return res(ctx.delay(API_DELAY_MS), ctx.status(404));
		}
		return res(ctx.delay(API_DELAY_MS), ctx.status(200), ctx.json(response));
	}),
	rest.get("/api/comments/:itemName", (req, res, ctx) => {
		const { itemName } = req.params;
		const item = inventory.find((item) => item.name === itemName);

		if (!item) {
			return res(ctx.delay(API_DELAY_MS), ctx.status(404));
		}

		const userItemComments = userComments[itemName] || [];

		const itemComments = comments.filter((comment) => comment.itemName === itemName);

		return res(
			ctx.delay(API_DELAY_MS),
			ctx.status(200),
			ctx.json(itemComments.concat(userItemComments))
		);
	}),
	rest.post("/api/comments/:itemName", async (req, res, ctx) => {
		const { itemName } = req.params;
		const requestBody = await req.json();
		const { comment } = requestBody;

		const item = inventory.find((item) => item.name === itemName);

		if (!item) {
			return res(ctx.delay(API_DELAY_MS), ctx.status(404));
		}

		if (itemName in userComments) {
			userComments[itemName].push(comment);
		} else {
			userComments[itemName] = [comment];
		}

		return res(ctx.delay(API_DELAY_MS), ctx.status(200), ctx.json(comment));
	}),
];
