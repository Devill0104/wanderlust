const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isReviewAuthor,isLoggedIn} = require("../middleware.js")
const reviewsController = require("../controllers/reviews.js");



//post comment route
router.post("/",validateReview,wrapAsync(reviewsController.createReview));

//delerte review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewsController.destroyReview));

module.exports = router;