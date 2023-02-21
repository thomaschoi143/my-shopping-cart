import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { postCommentForItemName, getCommentsByItemName } from "../../api";
import { Comments, State } from "../../app/state";
import { Comment } from "../../app/types";

export const loadCommentsByItemName = createAsyncThunk(
	"loadCommentsByItemNameHi",
	async (itemName: string) => await getCommentsByItemName(itemName)
);

export const createCommentForItemName = createAsyncThunk(
	"createComment",
	async (comment: Comment) => await postCommentForItemName(comment)
);

const initialState: Comments = {
	commentsList: [],
	isLoadingComments: false,
	failedToLoadComments: false,
	createCommentIsPending: false,
	failedToCreateComment: false,
};

const commentsSlice = createSlice({
	name: "comments",
	initialState: initialState,
	reducers: {
		setFailedToCreateComment: (comments, action: PayloadAction<boolean>) => {
			comments.failedToCreateComment = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCommentsByItemName.pending, (comments) => {
				comments.isLoadingComments = true;
				comments.failedToLoadComments = false;
			})
			.addCase(loadCommentsByItemName.fulfilled, (comments, action: PayloadAction<Comment[]>) => {
				comments.commentsList = action.payload;
				comments.isLoadingComments = false;
				comments.failedToLoadComments = false;
			})
			.addCase(loadCommentsByItemName.rejected, (comments) => {
				comments.isLoadingComments = false;
				comments.failedToLoadComments = true;
			})
			.addCase(createCommentForItemName.pending, (comments) => {
				comments.createCommentIsPending = true;
				comments.failedToCreateComment = false;
			})
			.addCase(createCommentForItemName.fulfilled, (comments, action: PayloadAction<Comment>) => {
				comments.commentsList.push(action.payload);
				comments.createCommentIsPending = false;
				comments.failedToCreateComment = false;
			})
			.addCase(createCommentForItemName.rejected, (comments) => {
				comments.createCommentIsPending = false;
				comments.failedToCreateComment = true;
			});
	},
});

export const { setFailedToCreateComment } = commentsSlice.actions;

export const selectComments = (state: State) => state.comments.commentsList;
export const selectIsLoadingComments = (state: State) => state.comments.isLoadingComments;
export const selectCreateCommentIsPending = (state: State) => state.comments.createCommentIsPending;
export const selectFailedToCreateComment = (state: State) => state.comments.failedToCreateComment;

export default commentsSlice.reducer;
