import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import * as Realm from "realm-web";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { setUser } from "./features/user/userSlice";
export const app = new Realm.App(process.env.REACT_APP_REALM_APP_ID);
// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
	// Guarantee that there's a logged in user with a valid access token
	if (!app.currentUser) {
		await app.logIn(Realm.Credentials.anonymous());
	} else {
		// An already logged in user's access token might be stale. To guarantee that the token is
		// valid, we refresh the user's custom data which also refreshes their access token.
		await app.currentUser.refreshCustomData();
	}
	store.dispatch(setUser({ id: app.currentUser.id, profile: app.currentUser.profile }));
	return app.currentUser.accessToken;
}

const client = new ApolloClient({
	link: new HttpLink({
		uri: `https://ap-southeast-2.aws.realm.mongodb.com/api/client/v2.0/app/${process.env.REACT_APP_REALM_APP_ID}/graphql`,
		fetch: async (uri, options) => {
			const accessToken = await getValidAccessToken();
			const headersInit: HeadersInit = {};
			options.headers = headersInit;
			options.headers.Authorization = `Bearer ${accessToken}`;
			return fetch(uri, options);
		},
	}),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<App />
			</Provider>
		</ApolloProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
