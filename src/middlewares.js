
/**save variables for template engine */
export const localsMiddleware = (req, res, next) => {
    
res.locals.loggedIn = Boolean(req.session.loggedIn);
res.locals.siteName = "NotThatShorts";
res.locals.loggedInUser =  req.session.user || {};
};

/**block client not logged in  */
export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedin) {
    return next();
    } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
    }
};

/**block client logged in */
export const publicOnlyMiddleware = (req, res, next) =>{
    if(!req.session.loggedin){
        return next();
    } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
    }
};