//node env is development
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express= require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
// const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl  = process.env.ATLAS_URL;
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError= require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions= {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires : Date.now()+7*24*60*60*1000,
        maxAge: 24*7*60*60*1000,
        httpOnly: true
    }
};
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash
app.use((req, res,next)=>{
    res.locals.success =  req.flash("success");
    res.locals.error= req.flash("error");
    //saving the user in a variable
    res.locals.currUser = req.user;
    next();
});



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//connecting with the db
main().then(()=>{
    console.log("connected to db");
}).catch((err)=> console.log(err));
async function main(){
    await mongoose.connect(dbUrl);
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