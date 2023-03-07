import React from "react";
import { Navigate, useParams } from "react-router-dom";
import CurrencyFilter from "../../features/currencyFilter/CurrencyFilter";
import ReviewsSection from "../../features/review/ReviewsSection";
import { Container, Spinner } from "react-bootstrap";
import CurrentItem from "../../features/currentItem/CurrentItem";
import { useQuery } from "@apollo/client";
import { FIND_ITEM } from "../../services/graphQL";
import ReviewForm from "../../features/review/ReviewForm";

const ItemDetailsPage = () => {
	const { id } = useParams<{ id: string }>();

	const { loading, data, error, refetch } = useQuery(FIND_ITEM, {
		variables: { input: { id } },
	});

	if (loading) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<Spinner className="" animation="grow" />
			</div>
		);
	}

	if (error) {
		return <Navigate to="/not-found" />;
	}

	const item = data.itemDetails;

	return (
		<Container>
			<CurrencyFilter />
			<CurrentItem item={item} />
			<ReviewsSection reviews={item.reviews} />
			<ReviewForm item_id={id} refetch={refetch} />
		</Container>
	);
};

export default ItemDetailsPage;
