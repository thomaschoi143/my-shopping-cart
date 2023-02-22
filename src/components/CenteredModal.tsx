import React from "react";
import { Modal, Button } from "react-bootstrap";

type CenteredModalProps = {
	title: string;
	message: string;
	onHide: () => any;
	show: boolean;
};

const CenteredModal = (props: CenteredModalProps) => {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{props.message}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CenteredModal;
