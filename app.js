const express= require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const methodOverride=require("method-override");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

//connecting with the db
main().then(()=>{
    console.log("connected to db");
}).catch((err)=> console.log(err));
async function main(){
    await mongoose.connect(mongo_url);
}

//home  route 
app.get("/listings", async (req, res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
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
app.post("/listings/:id", async (req, res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.listen("8080", ()=>{
    console.log(" server is listening");
})