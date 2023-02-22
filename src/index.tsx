import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

async function main() {
	if (process.env.NODE_ENV === "development") {
		if (window.location.pathname === process.env.PUBLIC_URL) {
			window.location.pathname = process.env.PUBLIC_URL + "/";
			return;
		}
		const { worker } = require("./mocks/browser");
		await worker.start({
			serviceWorker: {
				url: process.env.PUBLIC_URL + "/mockServiceWorker.js",
			},
		});
	}

	const container = document.getElementById("root") as Element;
	const root = createRoot(container);

	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
main();
