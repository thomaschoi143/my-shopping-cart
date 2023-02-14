import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "./cartSlice";
import { updateItemQuantity, removeItem } from "./cartSlice";
import { calculateTotal, getPriceDisplay } from "../../utilities/utilities";
import { selectCurrencyFilter } from "../currencyFilter/currencyFilterSlice";
import { Button, Form, ListGroup, Col, Row } from "react-bootstrap";
import { Icon } from "../../utilities/Icon";

export default function Cart() {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const currency = useSelector(selectCurrencyFilter);
    const totalAmount = calculateTotal(items, currency);

    const quantityOnChangeHandler = (name, quantity) => {
        quantity = Number(quantity);
        dispatch(updateItemQuantity({
            name, quantity
        }));
    };

    const removeOnClickHandler = (name) => {
        dispatch(removeItem(name))
    };

    const checkOutHandler = () => {
        alert(`Total: ${totalAmount}`);
    }

    const createCartElement = (name) => {
        const {quantity, price} = items[name];

        return (
        <ListGroup.Item key={name} className="h5 m-0 bg-transparent border-0 px-0 px-sm-2" style={{lineHeight: 1.7}}>
            {name}
            <span className="float-end">
                <span className="text-secondary fw-normal me-2">@{getPriceDisplay(price, currency)}</span>
                <Form.Select 
                    value={quantity}
                    onChange={(e) => quantityOnChangeHandler(name, e.target.value)}
                    className="w-auto d-inline-block me-2"
                >
                    {[...Array(10).keys()].map((x) => ++x).map((x) => (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    ))}
                </Form.Select>
                <Button
                    variant="danger" 
                    onClick={() => removeOnClickHandler(name)}
                >
                    <Icon iconName="Trash3Fill" className="iconCenter"/>
                </Button>
            </span>
        </ListGroup.Item>
        )
    };

    const cartElements = [];
    for (let itemName in items) {
        cartElements.push(createCartElement(itemName));
    }

    return (
        <div>
            <ListGroup as="ol" numbered className="mb-4">{cartElements}</ListGroup>
            <p className="h1">
                Total
                <span className="float-end">{totalAmount}</span>
            </p>
            <Row sm={3} lg={4} className="flex-row-reverse">
                <Col>
                    <Button 
                        onClick={checkOutHandler}
                        className={`p-2 p-sm-1 fs-4 fw-bold w-100 ${Object.keys(items).length === 0 ? "disabled" : undefined}`}
                    >
                        CHECK-OUT
                    </Button>
                </Col>
            </Row>
        </div>
    );


}