import React, { useEffect } from "react";
import { Row, Col, Figure, Accordion, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddToCartBtn from "../../components/AddToCartBtn";
import PriceDisplay from "../../components/PriceDisplay";
import {
	loadCurrentItem,
	selectCurrentItem,
	selectHasError,
	selectIsLoading,
} from "./currentItemSlice";

type CurrentItemProps = {
	name: string;
};

const CurrentItem = ({ name }: CurrentItemProps) => {
	const dispatch = useAppDispatch();
	const isLoadingCurrentItem = useAppSelector(selectIsLoading);
	const failedToLoadCurrentItem = useAppSelector(selectHasError);
	const item = useAppSelector(selectCurrentItem);

	useEffect(() => {
		dispatch(loadCurrentItem(name));
	}, [dispatch, name]);

	if (isLoadingCurrentItem) {
		return (
			<div className="d-flex justify-content-center p-5">
				<Spinner animation="grow" />
			</div>
		);
	}

	if (failedToLoadCurrentItem) {
		return <Navigate to={process.env.PUBLIC_URL + "/not-found"} />;
	}

	if (item) {
		const { price, description, picture } = item;
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
	}
};

export default CurrentItem;
