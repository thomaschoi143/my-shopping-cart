import React from "react";
import { Card, Placeholder, Col } from "react-bootstrap";

const PlaceholderCard = () => {
	return (
		<Col>
			<Card>
				<Card.Img
					variant="top"
					src={process.env.PUBLIC_URL + "/placeholder200x150.png"}
				></Card.Img>
				<Card.Body>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Subtitle} animation="glow" className="my-2">
						<Placeholder xs={3} />
					</Placeholder>
					<Placeholder.Button variant="primary" xs={8} />
				</Card.Body>
			</Card>
		</Col>
	);
};

export default PlaceholderCard;
