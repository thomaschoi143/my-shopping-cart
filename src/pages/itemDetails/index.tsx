import React from "react";
import { useParams } from "react-router-dom";
import CurrencyFilter from "../../features/currencyFilter/CurrencyFilter";
import CommentSection from "../../features/comment/CommentSection";
import { Container } from "react-bootstrap";
import CurrentItem from "../../features/currentItem/CurrentItem";

const ItemDetailsPage = () => {
	const { name } = useParams<{ name: string }>();

	return (
		<Container>
			<CurrencyFilter />
			<CurrentItem name={name} />
			<CommentSection itemName={name} />
		</Container>
	);
};

export default ItemDetailsPage;
