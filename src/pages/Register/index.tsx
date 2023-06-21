import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { app } from "../../index";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		await app.emailPasswordAuth.registerUser({ email, password });
		navigate("/login");
	};

	return (
		<Container>
			<h2>Register</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Form.Text id="passwordHelpBlock" muted>
						Your password must be 6-128 characters long.
					</Form.Text>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default RegisterPage;
