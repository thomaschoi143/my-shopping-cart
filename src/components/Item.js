import React from "react";
import { addItem } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrencyFilter } from "../features/currencyFilter/currencyFilterSlice";
import { getPriceDisplay } from "../utilities/utilities";
import { Card, Button, Col } from 'react-bootstrap';

export default function Item({ item }) {
    const dispatch = useDispatch();
    const { name, price } = item;
    const quantity = useSelector((state) => state.cart[name]?.quantity);
    const currency = useSelector(selectCurrencyFilter);

    const onClickHandler = (item) => {
        dispatch(addItem(item));
    }

    return (
        <Col>
            <Card >
                <Card.Img variant="top" src="https://picsum.photos/200/150"></Card.Img>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2">{getPriceDisplay(price, currency)}</Card.Subtitle>
                    <Button 
                        onClick={() => onClickHandler(item)}
                        disabled={quantity === 10}
                    >
                    ADD TO CART
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}