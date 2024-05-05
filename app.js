const express= require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");
const listingSchema = require("./schema.js");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);



//connecting with the db
main().then(()=>{
    console.log("connected to db");
}).catch((err)=> console.log(err));
async function main(){
    await mongoose.connect(mongo_url);
}


//home  route 
app.get("/listings",  wrapAsync(async (req, res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//create route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//add route
app.post("/listings",  wrapAsync(async (req, res)=>{
    let newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//show route
app.get("/listings/:id", wrapAsync( async (req, res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//edit route
app.get("/listings/:id/edit",  wrapAsync(async (req, res)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//update route
app.put("/listings/:id",  wrapAsync(async (req, res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id", wrapAsync(async (req, res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

//middleware for non-existing routes
app.all("*", (req, res)=>{
    throw new ExpressError(404, "Page not found");
});

//schema validation middleware
const validateSchema = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
};

// Error handling middleware
app.use((err, req, res, next)=>{
    let {statusCode, message}=err;
    res.status(statusCode).render("error.ejs", {message});
});

app.listen("8080", ()=>{
    console.log(" server is listening");
});