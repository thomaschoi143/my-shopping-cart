import http from "../http-common";

class StoreDataService {
	getInventory(page = 0) {
		return http.get(`/inventory?page=${page}`);
	}

	//   get(id) {
	//     return http.get(`/restaurant?id=${id}`);
	//   }

	findInventory(query: string, by = "name", page = 0) {
		return http.get(`/inventory?${by}=${query}&page=${page}`);
	}
}

export default new StoreDataService();
