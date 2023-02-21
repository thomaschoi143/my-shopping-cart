import React from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { WEBSITE_TITLE } from "../../app/constants";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>{WEBSITE_TITLE}: 404 NOT FOUND</Alert.Heading>
        <p>Oh snap! Sorry, it seems we cannot find the page for you.</p>
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

export default NotFoundPage;
