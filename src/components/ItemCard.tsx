import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import { Item } from "../app/types";
import PriceDisplay from "./PriceDisplay";

type ItemCardProps = {
	item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
	const { name, price, picture } = item;

	return (
		<Col>
			<Card>
				<Link to={`items/${name}`}>
					<Card.Img variant="top" src={process.env.PUBLIC_URL + picture}></Card.Img>
				</Link>
				<Card.Body>
					<Link to={`items/${name}`}>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle className="mb-3">
							<PriceDisplay price={price} />
						</Card.Subtitle>
					</Link>
					<AddToCartBtn item={item} />
				</Card.Body>
			</Card>
		</Col>
	);
};

export default ItemCard;
