import User from "../models/User";
import bcrypt from "bcrypt";

import flash from "express-flash";

// rootRouter

/**render login page */
export const getLogin = (req, res) =>{
    res.render("login", {pageTitle: "Login"});
};

/**handle postLogin */
export const postLogin = async (req, res) =>{
    const pageTitle = "Login";
    const { username, password} = req.body;
    const user = await User.findOne({ username, socialOnly:false});
    if (!user) {
        return res.status(400).render("login", {
            pageTitle: pageTitle,
            errorMessage: "User doesn't exist using recieved username"
        });}
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login",{
            pageTitle: pageTitle,
            errorMessage: "Wrong password",
        });
    }

    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

/**render join page */
export const getJoin= (req, res) =>{
    return res.render("join", {pageTitle: "Join"});
};
/**handle postJoin*/
export const postJoin= async (req, res) =>{
    const pageTitle="Join";
    const { name, username, email, location, password1, password2} = req.body;
    if (password1 !== password2) {
        return res.status(400).render("join",{
            pageTitle:pageTitle,
            errorMessage: "Password confirmation doesn't match",
        });
    }
    const exists = await User.exists({$or: [{username},{ email}]});
    if (exists) {
        return res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: "This username/email already taken",
        });
    }
    try {
        await User.create({
            name,username,email,password,location,
        });
        return res.redirect("/login")
    } catch (e) {
        return res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: e,
        });
        console.log(e);
    };
};


// userRouter


/**render edit-profile */
export const getEdit = (req, res) =>{
    return res.render("edit-profile", { pageTitle:"Edit profile"});
};

/**handle editing user profile*/
export const postEdit = async (req, res) =>{
    const {
        session: {
            user: { _id, avatarUrl, email:sessionEmail, username:sessionUsername, },
        },
        body: { name, email, username, location },
        file,
    } = req;

    let searchParam = [];

    if (sessionEmail !== email) {
        searchParam.push({ email });
    }
    if (sessionUsername !== username) {
        searchParam.push({ username });
    }
    if (searchParam.length > 0) {
        const foundUser = await User.findOne({ $or: searchParam });
        if (foundUser && foundUser._id.toString() !== _id) {
            return res.status(400).render("edit-profile", {
                pageTitle: "Edit Profile",
                errorMessage: "This username/email is already taken.",
            });
        }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            avatarUrl: file || avatarUrl,
            name,
            email,
            username,
            location, 
        },
        { new: true}
    );
    req.session.user = updatedUser;
    return res.redirect("/users/edit");    
};

/**destroy session */
export const logout = (req, res) =>{
    req.session.destroy();
    req.flash("info", "See you");
    res.redirect("/");

};


export const getChangePassword = (req, res) =>{
    if (req.session.user.socialOnly === true) {
        req.flash("error", "social user cannot change password");
        return res.redirect("/");
    }
    return res.render("users/change-password", { pageTitle: "Change password'"});
};
export const = (req, res) =>{

};
export const = (req, res) =>{

};
export const = (req, res) =>{

};
export const = (req, res) =>{

};



