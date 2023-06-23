import React from "react";
import CurrencyFilter from "../../features/currencyFilter/CurrencyFilter";
import Inventory from "../../features/inventory/Inventory";
import Cart from "../../features/cart/Cart";
import { Container, Image } from "react-bootstrap";
import SearchBar from "../../features/searchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div className="d-flex flex-column overflow-hidden">
			<div className="flex-auto overflow-scroll">
				<Swiper
					scrollbar={{
						hide: false,
					}}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					loop={true}
					modules={[Scrollbar, Autoplay]}
					className="w-100 h-50"
				>
					{["apple", "orange", "pineapple"].map((product) => (
						<SwiperSlide key={product}>
							<img
								src={process.env.PUBLIC_URL + `/products/${product}.jpeg`}
								className="w-100 h-100"
								style={{ objectFit: "cover" }}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<Container className="pt-2">
					<CurrencyFilter />
					<SearchBar setSearchParams={setSearchParams} />
					<Inventory searchParams={searchParams} />
				</Container>
			</div>
			<footer className="bg-body-tertiary p-4 p-xs-5 position-sticky bottom-0 w-100">
				<Cart />
			</footer>
		</div>
	);
};

export default HomePage;
