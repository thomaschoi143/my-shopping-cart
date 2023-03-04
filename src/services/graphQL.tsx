import gql from "graphql-tag";

export const GET_ITEMS = gql`
	query items($query: ItemQueryInput, $limit: Int, $sortBy: ItemSortByInput) {
		items(query: $query, limit: $limit, sortBy: $sortBy) {
			_id
			category
			description
			name
			picture
			price
		}
	}
`;

export const FIND_ITEM = gql`
	query itemDetails($input: ItemDetailsInput) {
		itemDetails(input: $input) {
			_id
			category
			description
			name
			picture
			price
			reviews {
				date
				isRecommend
				name
				rating
				text
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query categories {
		categories
	}
`;

export const ADD_REVIEW = gql`
	mutation insertOneReview($data: ReviewInsertInput!) {
		insertOneReview(data: $data) {
			userId
			name
			text
			rating
			isRecommend
			date
			item_id
		}
	}
`;
