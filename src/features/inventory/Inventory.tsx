import React, { useEffect } from "react";
import {
	loadInventory,
	selectAllInventoryItems,
	selectIsLoadingInventory,
	selectHasErrorInventory,
} from "./inventorySlice";
import Item from "../../components/ItemCard";
import { filterItems } from "../../utilities/utilities";
import { selectSearchTerm } from "../searchTerm/searchTermSlice";
import { Row } from "react-bootstrap";
import PlaceholderCard from "../../components/PlaceholderCard";
import { INVENTORY_PLACEHOLDER_NUM } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ErrorAlert from "../../components/ErrorAlert";

export default function Inventory() {
	const dispatch = useAppDispatch();

	const items = useAppSelector(selectAllInventoryItems);
	const searchTerm = useAppSelector(selectSearchTerm);
	const filteredItems = filterItems(searchTerm, items);
	const isLoadingInventory = useAppSelector(selectIsLoadingInventory);
	const failedToLoadInventory = useAppSelector(selectHasErrorInventory);

	useEffect(() => {
		dispatch(loadInventory());
	}, [dispatch]);

	if (failedToLoadInventory) {
		return <ErrorAlert message="Load inventory failed." />;
	}

	if (!isLoadingInventory && filteredItems.length === 0) {
		return <p className="h2 mt-5 text-center">Sorry, no products are currently available...</p>;
	}

	return (
		<Row xs={2} md={4} className="g-md-3 g-2">
			{isLoadingInventory
				? [...Array(INVENTORY_PLACEHOLDER_NUM)].map((_, index) => (
						<PlaceholderCard key={index} />
				  ))
				: filteredItems.map((item, index) => <Item key={index} item={item} />)}
		</Row>
	);
}
