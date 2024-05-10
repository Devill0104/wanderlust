const express= require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError= require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



//connecting with the db
main().then(()=>{
    console.log("connected to db");
}).catch((err)=> console.log(err));
async function main(){
    await mongoose.connect(mongo_url);
}

//middleware for non-existing routes
app.all("*", (req, res)=>{
    throw new ExpressError(404, "Page not found");
});

// Error handling middleware
app.use((err, req, res, next)=>{
    let {statusCode =500, message= "bad request"}=err;
    
    res.status(statusCode).render("error.ejs", {message});
});


app.listen("8080", ()=>{
    console.log(" server is listening");
});