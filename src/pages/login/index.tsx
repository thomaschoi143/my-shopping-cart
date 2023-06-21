import React, { FormEventHandler, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { app } from "../../index";
import * as Realm from "realm-web";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectIsProfileLogin } from "../../features/user/userSlice";

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isProfileLogin = useSelector(selectIsProfileLogin);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState(false);

	async function loginEmailPassword(email: string, password: string) {
		// Create an email/password credential
		const credentials = Realm.Credentials.emailPassword(email, password);

		try {
			// Authenticate the user
			const user: Realm.User = await app.logIn(credentials);
			// `App.currentUser` updates to match the logged in user
			console.assert(user.id === app.currentUser.id);
			dispatch(setUser({ id: user.id, profile: user.profile }));
			return user;
		} catch (error) {
			console.log(error);
		}
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const user = await loginEmailPassword(email, password);
		if (!user) {
			setLoginError(true);
		} else {
			navigate(-1);
		}
	};

	return (
		<>
			<Container>
				<h2>Login</h2>
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
					</Form.Group>

					<Row xs={1} sm={2}>
						<Col>
							<Button variant="primary" type="submit" className="w-100">
								Submit
							</Button>
							{loginError && (
								<div className="invalid-feedback d-block">
									Incorrect email/password. Please try again.
								</div>
							)}
						</Col>
						<Col className="mt-2 mt-sm-0">
							<Button
								variant="secondary"
								onClick={() => navigate("/register")}
								className="w-100"
							>
								Register Now!
							</Button>
						</Col>
					</Row>
				</Form>
				<Alert className="mt-3" variant="success">
					Login Hints:
					<br />
					Email: testing@testing.com
					<br />
					pwd: 123456
				</Alert>
			</Container>
		</>
	);
};

export default LoginPage;
