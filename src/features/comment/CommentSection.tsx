import React, { useEffect } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectComments, selectIsLoadingComments, loadCommentsByItemName } from "./commentsSlice";
import { Spinner, Alert } from "react-bootstrap";

type CommentSectionProps = {
	itemName: string;
};

const CommentSection = ({ itemName }: CommentSectionProps) => {
	const dispatch = useAppDispatch();

	const comments = useAppSelector(selectComments);
	const isLoadingComments = useAppSelector(selectIsLoadingComments);

	useEffect(() => {
		dispatch(loadCommentsByItemName(itemName));
	}, [dispatch, itemName]);

	return (
		<>
			<h3 className="mt-2">Comments</h3>
			<hr />
			{isLoadingComments ? (
				<div className="p-5 d-flex justify-content-center">
					<Spinner animation="grow" />
				</div>
			) : comments.length > 0 ? (
				comments.map((comment, index) => <CommentItem key={index} comment={comment} />)
			) : (
				<Alert variant="secondary">No comments yet.</Alert>
			)}
			{!isLoadingComments && (
				<>
					<hr />
					<h3 className="mt-4">Write a comment</h3>
					<CommentForm itemName={itemName} />
				</>
			)}
		</>
	);
};

export default CommentSection;
