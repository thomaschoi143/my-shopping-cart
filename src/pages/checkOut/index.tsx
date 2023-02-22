import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CenteredModal from "../../components/CenteredModal";
import { selectCartItems, clearCart } from "../../features/cart/cartSlice";

const CheckOutPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const items = useAppSelector(selectCartItems);
	const [modalShow, setModalShow] = useState<boolean>(false);

	const onSubmitHandler = () => {
		setModalShow(true);
		dispatch(clearCart());
	};

	const modalHideHandler = () => {
		setModalShow(false);
		navigate("/");
	};

	return (
		<>
			<Container>
				<Row xs={1} md={2}>
					<Col>
						<ListGroup as="ol" numbered>
							{Object.keys(items).map((itemName) => {
								return (
									<ListGroup.Item
										as="li"
										key={itemName}
										className="d-flex justify-content-between align-items-start"
									>
										<div className="ms-2 me-auto">
											<div className="fw-bold">{itemName}</div>
										</div>
										<Badge bg="primary" pill>
											{items[itemName].quantity}
										</Badge>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Col>
					<Col>
						<Button onClick={onSubmitHandler} className="w-100">
							CONFIRM
						</Button>
					</Col>
				</Row>
			</Container>
			<CenteredModal
				show={modalShow}
				onHide={modalHideHandler}
				message="We have received your order!"
				title="Thank You!"
			/>
		</>
	);
};

export default CheckOutPage;
