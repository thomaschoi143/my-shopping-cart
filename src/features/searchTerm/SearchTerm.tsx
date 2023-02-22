import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, clearSearchTerm, selectSearchTerm } from "./searchTermSlice";
import { Form, InputGroup, CloseButton } from "react-bootstrap";
import { Icon } from "../../utilities/Icon";

export default function SearchTerm() {
	const dispatch = useDispatch();
	const searchTerm = useSelector(selectSearchTerm);

	const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch(setSearchTerm(e.currentTarget.value));
	};

	const onClearHandler = () => {
		dispatch(clearSearchTerm());
	};

	return (
		<InputGroup className="position-relative w-auto my-3 my-md-0">
			<InputGroup.Text>
				<Icon iconName="Search" />
			</InputGroup.Text>
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
		</InputGroup>
	);
}
