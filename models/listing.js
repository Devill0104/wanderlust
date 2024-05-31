//this file is created for storing the schema


const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,

    image:{
        type: String,
        default : "https://plus.unsplash.com/premium_photo-1661883982941-50af7720a6ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) =>v === ""? "https://plus.unsplash.com/premium_photo-1661883982941-50af7720a6ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    price: Number,
    location: String,
    country: String,
    reviews : [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});
const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;