import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, clearSearchTerm, selectSearchTerm } from "./searchTermSlice";
import { Form, InputGroup, CloseButton, Row, Col, Button } from "react-bootstrap";
import { Icon } from "../../utilities/Icon";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../services/graphQL";

export default function SearchBar() {
	const dispatch = useDispatch();
	const searchTerm = useSelector(selectSearchTerm);

	const { data, loading, error } = useQuery(GET_CATEGORIES);

	let categories: string[] = [];
	if (data) {
		categories = data.categories;
	}

	const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch(setSearchTerm(e.currentTarget.value));
	};

	const onClearHandler = () => {
		dispatch(clearSearchTerm());
	};

	return (
		<Form className="mb-2">
			<Row xs={1} className="g-2">
				<Col md={5}>
					<Form.Control
						type="text"
						onChange={onChangeHandler}
						value={searchTerm}
						placeholder="Search"
						style={{ paddingRight: 46 }}
					></Form.Control>
					{searchTerm.length > 0 && (
						<CloseButton
							onClick={onClearHandler}
							className="position-absolute top-1 end-0"
							style={{ zIndex: 2000, padding: "11px 12px" }}
						/>
					)}
				</Col>
				<Col md={5}>
					<Form.Select aria-label="select category">
						<option>All categories</option>
						{categories.map((category, index) => (
							<option key={index}>{category}</option>
						))}
					</Form.Select>
				</Col>
				<Col md={2}>
					<Button type="submit" variant="outline-success" className="w-100">
						Search
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
