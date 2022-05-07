import http from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  get(id) {
    return http.get(`restaurants/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("restaurants/reviews", data);
  }

  updateReview(data) {
    return http.put("restaurants/reviews", data);
  }

  deleteReview(id, userId) {
    return http.delete(`restaurants/reviews`, {data:{user_id: userId,review_id: id}});
  }

  getCuisines(id) {
    return http.get(`restaurants/cuisines`);
  }

}

export default new RestaurantDataService();