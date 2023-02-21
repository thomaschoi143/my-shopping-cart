import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadInventory,
  selectAllInventoryItems,
  selectIsLoadingInventory,
} from "./inventorySlice";
import Item from "../../components/ItemCard";
import { filterItems } from "../../utilities/utilities";
import { selectSearchTerm } from "../searchTerm/searchTermSlice";
import { Row } from "react-bootstrap";
import PlaceholderCard from "../../components/PlaceholderCard";
import { INVENTORY_PLACEHOLDER_NUM } from "../../app/constants";

export default function Inventory() {
  const dispatch = useDispatch();

  const items = useSelector(selectAllInventoryItems);
  const searchTerm = useSelector(selectSearchTerm);
  const filteredItems = filterItems(searchTerm, items);
  const isLoadingInventory = useSelector(selectIsLoadingInventory);

  useEffect(() => {
    dispatch(loadInventory());
  }, [dispatch]);

  if (!isLoadingInventory && filteredItems.length === 0) {
    return (
      <p className="h2 mt-5 text-center">
        Sorry, no products are currently available...
      </p>
    );
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
