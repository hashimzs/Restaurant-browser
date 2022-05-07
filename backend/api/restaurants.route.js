import  Express  from "express";
import RestaurantsController from "../api/restaurants.controller.js";
import ReviewsController from "../api/reviews.controller.js";
const router = Express.Router()

router.route("/").get(RestaurantsController.apiGetRestaurants)

router.route("/id/:id").get(RestaurantsController.apiGetRestaurantById)

router.route("/cuisines").get(RestaurantsController.apiGetCusines)

router
    .route("/reviews")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router