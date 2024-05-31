const User = require("../models/user");
module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm =(req, res)=>{
    res.render("users/login.ejs");
};


module.exports.saveUser = async(req, res)=>{
    try{
        let {username, email, password}=req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{          //after sign up direct login of user
            if(err){
                return next(err);
            }
        });
        req.flash("success", " Welcome to Wanderlust");
        res.redirect("/listings");
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.logoutUser = (req,res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success", "You logged out successfully");
            res.redirect("/listings");
        }
    });
};

