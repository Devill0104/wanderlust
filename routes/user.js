const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

//sign up route
router.get("/signup", (req, res)=>{
    res.render("users/signup.ejs");
});

//saving the signed up user
router.post("/signup", wrapAsync(async(req, res)=>{
    try{
        let {username, email, password}=req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", " Welcome to Wanderlust");
    res.redirect("/listings");
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

//log in page route
router.get("/login", (req, res)=>{
    res.render("users/login.ejs");
});

//logging in user
router.post("/login", 
            passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}),
            async(req, res)=>{
                req.flash("success","Welcome back to Wanderlust");
                res.redirect("/listings");
        });

//logout route
router.get("/logout", (req,res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success", "You logged out successfully");
            res.redirect("/listings");
        }
    });
});

module.exports = router;