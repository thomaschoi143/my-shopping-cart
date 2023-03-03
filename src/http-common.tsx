import axios from "axios";

export default axios.create({
	baseURL: "https://ap-southeast-2.aws.data.mongodb-api.com/app/my-store-znppl/endpoint",
	headers: {
		"Content-type": "application/json",
		// CORS deny: "api-key": process.env.REACT_APP_API_KEY,
	},
});
