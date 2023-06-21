import React, { useState, useEffect } from "react";
import { Navbar, Container, Offcanvas, NavDropdown, Nav, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DarkModeSwitch from "./darkModeSwitch";
import { app } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { selectIsProfileLogin, setUser } from "../features/user/userSlice";

export default function NavBar() {
	const expand = "md";
	const isProfileLogin = useSelector(selectIsProfileLogin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		app.currentUser.logOut();
		dispatch(setUser({ id: "", profile: null }));
	};

	return (
		<Navbar expand={expand}>
			<Container fluid>
				<Link to="/">
					<Navbar.Brand className="h1">My Shopping Cart</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-${expand}`}
					aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
					placement="end"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
							Menu
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link href="#" onClick={() => navigate("/")}>
								Home
							</Nav.Link>

							{isProfileLogin ? (
								<Nav.Item>
									<Button onClick={handleLogout}>Logout</Button>
								</Nav.Item>
							) : (
								<>
									<Link to="/login">
										<Button variant="warning">Register/Login</Button>
									</Link>
								</>
							)}

							{/* <Nav.Link href="#action2">Link</Nav.Link>
							<NavDropdown
								title="Dropdown"
								id={`offcanvasNavbarDropdown-expand-${expand}`}
							>
								<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action5">
									Something else here
								</NavDropdown.Item>
							</NavDropdown> */}
						</Nav>
						<DarkModeSwitch />
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}
