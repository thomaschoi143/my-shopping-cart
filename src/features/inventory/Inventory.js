import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllInventoryItems } from './inventorySlice';
import Item from '../../components/Item';
import { filterItems } from '../../utilities/utilities';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';
import { Row } from 'react-bootstrap';

export default function Inventory() {
    const items = useSelector(selectAllInventoryItems);
    const searchTerm = useSelector(selectSearchTerm);
    const filteredItems = filterItems(searchTerm, items);

    if (filteredItems.length === 0) {
        return <p className="h2 mt-5 text-center">Sorry, no products are currently available...</p>;
    }

    return (
        <Row xs={1} sm={2} lg={4} className="g-4">
            {filteredItems.map((item, index) => <Item key={index} item={item} />)}
        </Row>
    );
}