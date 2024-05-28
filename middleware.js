//middleware for login authentication
module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;   //saving redirect link to reach exact page from where we went to login
        req.flash("error","You must be logged in to create a listing");
        res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl || "/listings";
    }
    next();
}