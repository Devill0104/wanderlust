const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");
const userController = require("../controllers/users")

//sign up route
router.get("/signup", userController.renderSignupForm );

//saving the signed up user
router.post("/signup", wrapAsync(userController.saveUser));

//log in page route
router.get("/login", userController.renderLoginForm );

// post logging in user
router.post("/login", saveRedirectUrl,
            passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}),
            async(req, res)=>{
                req.flash("success","Welcome back to Wanderlust");
                let redirectUrl = res.locals.redirectUrl;
                res.redirect(redirectUrl);
        });

//logout route
router.get("/logout",  userController.logoutUser);

module.exports = router;