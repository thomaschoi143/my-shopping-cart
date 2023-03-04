import React from "react";
import { Row, Col, Figure, Accordion } from "react-bootstrap";
import { Item } from "../../app/types";
import AddToCartBtn from "../../components/AddToCartBtn";
import PriceDisplay from "../../components/PriceDisplay";

type CurrentItemProps = {
	item: Item;
};

const CurrentItem = ({ item }: CurrentItemProps) => {
	const { name, price, description, picture } = item;
	return (
		<Row xs={1} sm={2}>
			<Col className="d-flex justify-content-center">
				<Figure>
					<Figure.Image src={process.env.PUBLIC_URL + picture} />
					<Figure.Caption>{name}</Figure.Caption>
				</Figure>
			</Col>
			<Col className="text-end">
				<h2>{name}</h2>
				<p className="h4 mb-4">
					<PriceDisplay price={price} />
				</p>
				<AddToCartBtn item={item} size="lg" className="w-100" />
				<Accordion className="my-3 text-start">
					<Accordion.Item eventKey="0">
						<Accordion.Header>Description</Accordion.Header>
						<Accordion.Body>{description}</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Col>
		</Row>
	);
};

export default CurrentItem;
