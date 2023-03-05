import React from "react";
import { useQuery } from "@apollo/client";
import { FIND_ITEMS } from "../../services/graphQL";
import ItemCard from "../../components/ItemCard";
import { Item } from "../../app/types";
import { Row } from "react-bootstrap";
import PlaceholderCard from "../../components/PlaceholderCard";
import { INVENTORY_PLACEHOLDER_NUM } from "../../app/constants";
import ErrorAlert from "../../components/ErrorAlert";

type InventoryProps = {
	searchParams: URLSearchParams;
};

export default function Inventory({ searchParams }: InventoryProps) {
	const { loading, data, error } = useQuery(FIND_ITEMS, {
		variables: {
			input: {
				page: 0,
				text: searchParams.get("search"),
				category: searchParams.get("category"),
			},
		},
	});

	if (loading) {
		return (
			<Row xs={2} md={4} className="g-md-3 g-2">
				{[...Array(INVENTORY_PLACEHOLDER_NUM)].map((_, index) => (
					<PlaceholderCard key={index} />
				))}
			</Row>
		);
	}

	if (error) {
		return <ErrorAlert message="Failed to load the inventory." />;
	}

	let items: Item[] = [];
	const responseData = data.itemsByPage;
	const { displayResultLength } = responseData;
	items = responseData.items;

	if (displayResultLength === 0) {
		return <p className="h2 mt-5 text-center">Sorry, no products are currently available...</p>;
	}

	return (
		<Row xs={2} md={4} className="g-md-3 g-2">
			{items.map((item, index) => (
				<ItemCard key={index} item={item} />
			))}
		</Row>
	);
}
