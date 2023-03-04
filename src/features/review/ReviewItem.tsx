import React from "react";
import { Review } from "../../app/types";
import { Row, Col } from "react-bootstrap";
import { Icon } from "../../utilities/Icon";
import { MAX_REVIEW_STARS_NUM } from "../../app/constants";
import { getDisplayDatetime } from "../../utilities/utilities";

type CommentProps = {
	review: Review;
};

const CommentItem = ({ review }: CommentProps) => {
	const { name, text, rating, isRecommend, date } = review;

	return (
		<Row className="my-4">
			<Col sm={2}>
				<p className="h4">{name}</p>
			</Col>
			<Col>
				{[...Array(rating)].map((_, index) => (
					<Icon key={index} iconName="StarFill" className="text-warning" />
				))}
				{[...Array(MAX_REVIEW_STARS_NUM - rating)].map((_, index) => (
					<Icon key={index} iconName="Star" className="text-warning" />
				))}
				<p style={{ wordBreak: "break-word" }}>{text}</p>
				<div className="fw-bold mb-1">
					Would you recommend this product? {isRecommend ? "Yes." : "No."}
				</div>
				<div className="text-secondary text-end">{getDisplayDatetime(date)}</div>
			</Col>
		</Row>
	);
};

export default CommentItem;
