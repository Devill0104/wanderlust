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
        default : "C:\Users\adity\OneDrive\Desktop\apma\major_project\fernando-alvarez-rodriguez-M7GddPqJowg-unsplash.jpg",
        set: (v) =>v === ""? "https://unsplash.com/photos/soccer-field-6J7eIvNwttQ":v,
    },
    price: Number,
    location: String,
    country: String,
});
const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;