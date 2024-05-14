const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

//schema validation middleware for new listing
const validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
};

//home  route 
router.get("/",  wrapAsync(async (req, res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//create route
router.get("/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//add route
router.post("/",validateListing,  wrapAsync(async (req, res)=>{
    let newListing= new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created Successfully");
    res.redirect("/listings");
}));


//show route
router.get("/:id", wrapAsync( async (req, res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}));

//edit route
router.get("/:id/edit",  wrapAsync(async (req, res)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//update route
router.put("/:id", validateListing, wrapAsync(async (req, res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", wrapAsync(async (req, res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listings");
}));

module.exports= router;