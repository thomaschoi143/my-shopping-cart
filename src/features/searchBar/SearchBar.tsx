import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../services/graphQL";

type SearchBarProps = {
	setSearchParams: any;
};

export default function SearchBar({ setSearchParams }: SearchBarProps) {
	// TODO: don't use state for each input
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	const { data } = useQuery(GET_CATEGORIES);

	let categories: string[] = [];
	if (data) {
		categories = data.categories;
	}

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let queries: { [key: string]: string } = {};
		if (searchTerm) {
			queries.search = searchTerm;
		}
		if (category) {
			queries.category = category;
		}
		setSearchParams("?" + new URLSearchParams(queries).toString());
	};

	return (
		<Form className="mb-2" onSubmit={onSubmitHandler}>
			<Row xs={1} className="g-2">
				<Col md={5}>
					<Form.Control
						type="text"
						onChange={({ target }) => setSearchTerm(target.value)}
						value={searchTerm}
						placeholder="Search"
					/>
				</Col>
				<Col md={5}>
					<Form.Select
						aria-label="select category"
						onChange={({ target }) => setCategory(target.value)}
					>
						<option value="">All categories</option>
						{categories.map((category, index) => (
							<option key={index} value={category}>
								{category}
							</option>
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
