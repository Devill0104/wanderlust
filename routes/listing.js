const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const Listing = require("../models/listing.js");
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const {cloudinary,storage} = require("../cloudconfig.js");
const upload = multer({storage});



router.route("/").get(wrapAsync(listingController.index))
                 .post(isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

//create route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id").get(wrapAsync(listingController.show))
                    .put(isLoggedIn, isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
                    .delete(isOwner,wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

module.exports= router;