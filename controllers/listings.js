const Listing = require("../models/listing");

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
    let newListing= new Listing(req.body.listing);
    newListing.owner = req.user._id;   //adding the user for newly created listing which would be the curr user
    await newListing.save();
    req.flash("success", "New Listing Created Successfully");
    res.redirect("/listings");
};

//for edit route
module.exports.renderNewForm = async (req, res)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
};

//for update route
module.exports.updateForm = async (req, res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
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