import React from "react";
import Root from "./components/Root";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/home";
import ItemDetailsPage from "./pages/itemDetails";
import ErrorAlert from "./components/ErrorAlert";
import CheckOutPage from "./pages/checkOut";

const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<HomePage />} />
			<Route path="items/:id" element={<ItemDetailsPage />} />
			<Route path="check-out" element={<CheckOutPage />} />
			<Route path="not-found" element={<ErrorAlert />} />
		</Route>
	),
	{
		basename: process.env.PUBLIC_URL,
	}
);

function App() {
	return <RouterProvider router={appRouter} />;
}

export default App;
