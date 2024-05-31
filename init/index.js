const mongoose=require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing.js");
const initData= require("./data.js");

//connecting to the database 
main().then(()=>{
    console.log("connected to db");
}).catch((err)=> console.log(err));
async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map(
        (obj)=>({...obj,owner:"664b75cac8a7a5e3bb15a5c8"})
    );
    await Listing.insertMany(initData.data);
    console.log("data inserted successfully");
}

initDB();
