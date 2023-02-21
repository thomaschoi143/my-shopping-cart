import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Icon } from "../../utilities/Icon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	createCommentForItemName,
	selectCreateCommentIsPending,
	selectFailedToCreateComment,
	setFailedToCreateComment,
} from "./commentsSlice";
import { Comment } from "../../app/types";
import { Rating } from "react-simple-star-rating";

type CommentFormProps = {
	itemName: string;
};

const CommentForm = ({ itemName }: CommentFormProps) => {
	const dispatch = useAppDispatch();
	const [isRecommend, setIsRecommend] = useState<boolean | null>(null);
	const [text, setText] = useState<string>("");
	const [rating, setRating] = useState<number>(0);
	const [validated, setValidated] = useState<boolean>(false);
	const createCommentIsPending = useAppSelector(selectCreateCommentIsPending);
	const failedToCreateComment = useAppSelector(selectFailedToCreateComment);

	const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		setValidated(true);
		dispatch(setFailedToCreateComment(false));
		if (form.checkValidity() === true && rating > 0 && isRecommend !== null) {
			const comment: Comment = {
				itemName,
				author: "user",
				text,
				rating,
				isRecommend,
				date: getDatetimeNow(),
			};
			dispatch(createCommentForItemName(comment)).then(() => {
				if (!createCommentIsPending && !failedToCreateComment) {
					setIsRecommend(null);
					setText("");
					setRating(0);
					setValidated(false);
				}
			});
		}
	};

	return (
		<Form noValidate validated={validated} onSubmit={submitHandler}>
			<Form.Group as={Row} className="mb-3" controlId="commentInput">
				<Form.Label column="lg" sm={3} lg={2}>
					Comment
				</Form.Label>
				<Col className="pt-sm-3">
					<Form.Control
						required
						as="textarea"
						rows={3}
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">
						Please fill in your comment.
					</Form.Control.Feedback>
				</Col>
			</Form.Group>
			<Form.Group as={Row} className="mb-2">
				<Form.Label as="legend" column="lg" xs sm={3} lg={2}>
					Recommend?
				</Form.Label>
				<Col className="pt-sm-1">
					<span
						className={
							validated && isRecommend === null
								? "border rounded border-danger p-1"
								: ""
						}
					>
						{["Yes", "No"].map((option, index) => {
							const recommendBoolean = option === "Yes";
							return (
								<span key={index}>
									<input
										id={option}
										checked={recommendBoolean === isRecommend}
										type="radio"
										name="isRecommend"
										value={option}
										className="customIconRadio"
										onChange={() => setIsRecommend(recommendBoolean)}
									/>
									<label
										htmlFor={option}
										className="m-1 fs-5"
										style={{ cursor: "pointer" }}
									>
										<Icon
											iconName={`HandThumbs${
												recommendBoolean ? "Up" : "Down"
											}${isRecommend === recommendBoolean ? "Fill" : ""}`}
											className={`text-${
												recommendBoolean ? "success" : "danger"
											} me-1`}
										/>
										{option}
									</label>
								</span>
							);
						})}
					</span>
					{validated && isRecommend === null && (
						<div className="invalid-feedback d-block">
							Would you recommend this product?
						</div>
					)}
				</Col>
			</Form.Group>
			<Form.Group as={Row} className="mb-3">
				<Form.Label as="legend" column="lg" xs sm={3} lg={2}>
					Rating
				</Form.Label>
				<Col className="pt-sm-2">
					<div
						className={
							validated && rating === 0 ? "border rounded border-danger p-1 pt-0" : ""
						}
						style={{ width: 127 }}
					>
						<Rating
							initialValue={rating}
							onClick={(newRating) => setRating(newRating)}
							size={24}
							emptyIcon={<Icon iconName="Star" className="text-warning fs-4" />}
							fillIcon={<Icon iconName="StarFill" className="text-warning fs-4" />}
						/>
					</div>
					{validated && rating === 0 && (
						<div className="invalid-feedback d-block">Please rate this product.</div>
					)}
				</Col>
			</Form.Group>
			<Form.Group as={Row} className="mb-3">
				<Col sm={{ span: 3, offset: 3 }} lg={{ offset: 2 }}>
					<Button type="submit" className="w-100" disabled={createCommentIsPending}>
						{createCommentIsPending ? "Loading..." : "Submit"}
					</Button>
					{!createCommentIsPending && failedToCreateComment && (
						<div className="invalid-feedback d-block">Sorry, something went wrong.</div>
					)}
				</Col>
			</Form.Group>
		</Form>
	);
};

const getDatetimeNow = () => {
	const date = new Date();

	return `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export default CommentForm;
