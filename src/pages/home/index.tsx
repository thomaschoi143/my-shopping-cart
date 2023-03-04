import React from "react";
import CurrencyFilter from "../../features/currencyFilter/CurrencyFilter";
import Inventory from "../../features/inventory/Inventory";
import Cart from "../../features/cart/Cart";
import { Container } from "react-bootstrap";
import SearchBar from "../../features/searchBar/SearchBar";

const HomePage = () => {
	return (
		<>
			<Container className="flex-grow-1 overflow-scroll pt-2">
				<SearchBar />
				<CurrencyFilter />
				<Inventory />
			</Container>
			<footer className="bg-body-tertiary p-4 p-xs-5 position-sticky bottom-0 w-100">
				<Cart />
			</footer>
		</>
	);
};

export default HomePage;
