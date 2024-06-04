const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

//creating a geocoding client
const geoCodingClient = mbxGeocoding({accessToken: mapToken});

//for new route
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

//for home route
module.exports.index = async (req, res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};



//for show route
module.exports.show =  async (req, res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id).populate({path: "reviews", populate:{path: "author"},}).populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

//for create route
module.exports.createListing = async (req, res)=>{
    let response = await geoCodingClient.forwardGeocode({
        query: "New Delhi,India",
        limit: 1,
    }).send();
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing= new Listing(req.body.listing);       //req.body.listing;  
    newListing.owner = req.user._id;   //adding the user for newly created listing which would be the curr user
    newListing.image= {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(response.body.features[0].geometry);
    req.flash("success", "New Listing Created Successfully");
    res.redirect("/listings");
};

//for edit route
module.exports.renderEditForm = async (req, res)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};

//for update route
module.exports.updateListing = async (req, res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof(req.file) != "undefined"){
        let filename = req.file.filename;

        let url = req.file.path;
        listing.image = {filename, url};
        await listing.save();
    }
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
};

//for delete route
module.exports.destroyListing = async (req, res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listings");
};