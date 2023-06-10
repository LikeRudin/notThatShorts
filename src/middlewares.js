import multer from "multer";

/**save variables for template engine */
export const localsMiddleware = (req, res, next) => {
    
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "NotThatShorts";
    res.locals.loggedInUser = req.session.user || {};
    next();
};

/**block client not logged in  */
export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/login");
    }
};

/**block client logged in */
export const publicOnlyMiddleware = (req, res, next) =>{
    if(!req.session.loggedIn){
        return next();
    } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
    }
};


export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: { 
        filesize: 10000000,
    },
});


export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
      fileSize: 3000000,
    },
  });