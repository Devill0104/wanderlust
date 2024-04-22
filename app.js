const express= require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");

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
//create route
app.get("/listings/new", (req,res)=>{
    res.render("/listings/new.ejs");
});

//home  route 
app.get("/listings", async (req, res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});



//add route
app.post("/listings", async (req, res)=>{
    let newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});


//show route
app.get("/listings/:id", async (req, res)=>{
    let {id}=req.params;
    // console.log(id);
    let listing= await Listing.findById(id);
    // console.log(listing);
    // res.send(" working");
    res.render("listings/show.ejs",{listing});
});

//edit route
app.get("/listings/:id/edit", async (req, res)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//update route
app.put("/listings/:id", async (req, res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});




app.listen("8080", ()=>{
    console.log(" server is listening");
});