const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const Listing = require("../models/listing.js");
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});

//create route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/").get(wrapAsync(listingController.index))
                 .post(isLoggedIn,validateListing,  wrapAsync(listingController.createListing));



//edit route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

router.route("/:id").get(wrapAsync(listingController.show))
                    .put(isLoggedIn, isOwner,validateListing, wrapAsync(listingController.updateForm))
                    .delete(isOwner,wrapAsync(listingController.destroyListing));

// //home  route 
// router.get("/",  wrapAsync(listingController.index));

//show route
// router.get("/:id", wrapAsync(listingController.show));


// //update route
// router.put("/:id",isLoggedIn, isOwner,validateListing, wrapAsync(listingController.updateForm));

// //delete route
// router.delete("/:id", isOwner,wrapAsync(listingController.destroyListing));



//add route
// router.post("/",validateListing,  wrapAsync(listingController.createListing));



module.exports= router;