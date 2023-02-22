import React from "react";
import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Alert, Container, Button } from "react-bootstrap";

type ErrorAlertProps = {
	message?: string;
};

const ErrorAlert = ({
	message = "Oh snap! Sorry, it seems we cannot find the page for you.",
}: ErrorAlertProps) => {
	const navigate = useNavigate();
	const error = useRouteError();

	return (
		<Container>
			<Alert variant="danger" className="mt-4">
				{isRouteErrorResponse(error) ? (
					<Alert.Heading>
						{document.title}: {error.status} {error.statusText}
					</Alert.Heading>
				) : (
					<>
						<Alert.Heading>{document.title}: 404 NOT FOUND</Alert.Heading>
						<p>{message}</p>
					</>
				)}

				<hr />
				<div className="d-flex justify-content-center">
					<Button onClick={() => navigate("/")} variant="outline-danger">
						HOME PAGE
					</Button>
				</div>
			</Alert>
		</Container>
	);
};

export default ErrorAlert;
