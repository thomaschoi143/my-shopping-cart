import React from "react";
import { Comment } from "../../app/types";
import { Row, Col } from "react-bootstrap";
import { Icon } from "../../utilities/Icon";
import { MAX_REVIEW_STARS_NUM } from "../../app/constants";

type CommentProps = {
	comment: Comment;
};

const CommentItem = ({ comment }: CommentProps) => {
	const { author, text, rating, isRecommend, date } = comment;

	return (
		<Row className="my-4">
			<Col xs={3} sm={4}>
				<p className="h4">{author}</p>
				Product rating:
				<br />
				{[...Array(rating)].map((_, index) => (
					<Icon key={index} iconName="StarFill" className="text-warning" />
				))}
				{[...Array(MAX_REVIEW_STARS_NUM - rating)].map((_, index) => (
					<Icon key={index} iconName="Star" className="text-warning" />
				))}
			</Col>
			<Col>
				<p style={{ wordBreak: "break-word" }}>{text}</p>
				<div className="fw-bold">
					Would you recommend this product? {isRecommend ? "Yes." : "No."}
				</div>
				<div className="text-secondary text-end">{date}</div>
			</Col>
		</Row>
	);
};

export default CommentItem;
