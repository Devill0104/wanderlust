const express= require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");

//connecting with the db
main().then(()=>{
    console.log("connected to db");
}).catch((err)=> console.log(err));
async function main(){
    await mongoose.connect(mongo_url);
}

//insrting the first entry
// app.get("/testlisting", async (req, res)=>{
//     // let sampleListing= new Listing({
//     //     title: "New Villa",
//     //     description: "by the beach",
//     //     price: 1200,
//     //     location: "Goa",
//     //     country: "India",
//     // });
//     // await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sample data saved");
// });


app.listen("8080", ()=>{
    console.log(" server is listening");
})