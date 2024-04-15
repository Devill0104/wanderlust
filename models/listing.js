//this file is created for storing the schema


const mongoose=require("mongoose");
const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,

    image:{
        type: String,
       set(v){v===""?"C:\Users\adity\Downloads\pexels-pixabay-259588.jpg":v;}
    },
    price: Number,
    location: String,
    country: String,
});
const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;