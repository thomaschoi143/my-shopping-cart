import React from "react";
import { useQuery } from "@apollo/client";
import { FIND_ITEMS } from "../../services/graphQL";
import ItemCard from "../../components/ItemCard";
import { Item } from "../../app/types";
import { selectSearchTerm } from "../searchBar/searchTermSlice";
import { Row } from "react-bootstrap";
import PlaceholderCard from "../../components/PlaceholderCard";
import { INVENTORY_PLACEHOLDER_NUM } from "../../app/constants";
import { useAppSelector } from "../../app/hooks";
import ErrorAlert from "../../components/ErrorAlert";

export default function Inventory() {
	const searchTerm = useAppSelector(selectSearchTerm);
	const { loading, data, error, refetch } = useQuery(FIND_ITEMS, {
		variables: {
			input: {
				page: 0,
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
		return <ErrorAlert message="Load inventory failed." />;
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
