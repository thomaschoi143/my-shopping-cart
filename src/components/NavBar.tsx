import React from "react";
import { Navbar, Container, Offcanvas, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchTerm from "../features/searchTerm/SearchTerm";

export default function NavBar(): JSX.Element {
	const expand = "md";
	return (
		<Navbar bg="light" expand={expand} className="mb-3">
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
							Offcanvas
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link href="#action1">Home</Nav.Link>
							<Nav.Link href="#action2">Link</Nav.Link>
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
							</NavDropdown>
						</Nav>
						<SearchTerm />
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}
