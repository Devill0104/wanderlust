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
const session = require("express-session");
const flash = require("connect-flash");
const sessionOptions= {
    secret: "mysecretstring",
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
app.use(passport.session);
passport.use(new LocalStrategy(User.authenticate));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash
app.use((req, res,next)=>{
    res.locals.success =  req.flash("success");
    res.locals.error= req.flash("error");
    next();
});



app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

//connecting with the db
main().then(()=>{
    console.log("connected to db");
}).catch((err)=> console.log(err));
async function main(){
    await mongoose.connect(mongo_url);
}

//creating a demo user
app.get("/demouser", (req, res)=>{
    let fakeuser = new User({
        username: "demouser",
        email: "demouser@gmail.com"
    });
    let registeredUser= User.register(fakeuser, "helloworld");
    res.send(registeredUser);
});

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