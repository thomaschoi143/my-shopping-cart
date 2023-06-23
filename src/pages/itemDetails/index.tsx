import React from "react";
import { Navigate, useParams } from "react-router-dom";
import CurrencyFilter from "../../features/currencyFilter/CurrencyFilter";
import ReviewsSection from "../../features/review/ReviewsSection";
import { Container, Spinner, Alert } from "react-bootstrap";
import CurrentItem from "../../features/currentItem/CurrentItem";
import { useQuery } from "@apollo/client";
import { FIND_ITEM } from "../../services/graphQL";
import ReviewForm from "../../features/review/ReviewForm";
import { useSelector } from "react-redux";
import { selectIsProfileLogin } from "../../features/user/userSlice";

const ItemDetailsPage = () => {
	const isProfileLogin = useSelector(selectIsProfileLogin);
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
			{isProfileLogin ? (
				<ReviewForm item_id={id} refetch={refetch} />
			) : (
				<Alert variant="secondary">Log in to comment.</Alert>
			)}
		</Container>
	);
};

export default ItemDetailsPage;
