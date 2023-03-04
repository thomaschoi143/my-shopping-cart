import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../services/graphQL";
import Item from "../../components/ItemCard";
import { filterItems } from "../../utilities/utilities";
import { selectSearchTerm } from "../searchBar/searchTermSlice";
import { Row } from "react-bootstrap";
import PlaceholderCard from "../../components/PlaceholderCard";
import { INVENTORY_PLACEHOLDER_NUM } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ErrorAlert from "../../components/ErrorAlert";

export default function Inventory() {
	const searchTerm = useAppSelector(selectSearchTerm);
	const { loading, data, error } = useQuery(GET_ITEMS);

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

	const { items } = data;
	const filteredItems = filterItems(searchTerm, items);

	if (filteredItems.length === 0) {
		return <p className="h2 mt-5 text-center">Sorry, no products are currently available...</p>;
	}

	return (
		<Row xs={2} md={4} className="g-md-3 g-2">
			{filteredItems.map((item, index) => (
				<Item key={index} item={item} />
			))}
		</Row>
	);
}
