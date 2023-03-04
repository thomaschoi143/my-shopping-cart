import React from "react";
import ReviewItem from "./ReviewItem";
import { Alert } from "react-bootstrap";
import { Review } from "../../app/types";

type ReviewsSectionProps = {
	reviews: Review[];
};

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
	return (
		<>
			<h3 className="mt-2">Comments</h3>
			<hr />
			{reviews.length > 0 ? (
				reviews.map((review, index) => <ReviewItem key={index} review={review} />)
			) : (
				<Alert variant="secondary">No comments yet.</Alert>
			)}
		</>
	);
};

export default ReviewsSection;
