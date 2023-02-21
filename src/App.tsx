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
import NotFoundPage from "./pages/notFound";

if (process.env.NODE_ENV === "development") {
}

const { worker } = require("./mocks/browser");
worker.start();

const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<HomePage />} />
			<Route path="items/:name" element={<ItemDetailsPage />} />
			<Route path="not-found" element={<NotFoundPage />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={appRouter} />;
}

export default App;
