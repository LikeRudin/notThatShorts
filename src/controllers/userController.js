import User from "../models/User";

import bcrypt from "bcrypt";
import fetch from "node-fetch";


// rootRouter

/**render login page */
export const getLogin = (req, res) =>{
    return res.render("login", { pageTitle: "Login"});
};

/**handle postLogin */
export const postLogin = async (req, res) => {
    const pageTitle = "Login";
    const { username, password } = req.body;

    //check username
    const user = await User.findOne({ username, socialOnly: false });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle: pageTitle,
            errorMessage: "User doesn't exist using recieved username"
        });
    }

    //check password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
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
    return res.render("join", { pageTitle: "Join" });
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
    const exists = await User.exists({$or: [{ username },{ email }]});
    if (exists) {
        return res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: "This username/email already taken",
        });
    }
    try {
        await User.create({
            name,
            username,
            email,
            password: password1,
            location,
        });
        return res.redirect("/login")
    } catch (e) {
        console.log(e);
        return res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: e,
        });
    };
};



// userRouter


/**render edit-profile */
export const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTitle:"Edit profile"});
};

/**handle editing user profile*/
export const postEdit = async(req, res) =>{
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
            avatarUrl: file.path || avatarUrl,
            name,
            email,
            username,
            location, 
        },
        { new: true }
    );
    req.session.user = updatedUser;
    return res.redirect("/users/edit");    
};

/**destroy session */
export const logout = (req, res) => {
    console.log("logout is running");
    
    req.session.user = null;
    res.locals.loggedInUser = req.session.user;
    req.session.loggedIn = false;

    req.flash("info", "See you");
    
    return res.redirect("/");
};

/** block the social user -github user*/
export const getChangePassword = (req, res) =>{
    if (req.session.user.socialOnly === true) {
        req.flash("error", "social user cannot change password");
        return res.redirect("/");
    }
    return res.render("users/change-password", { pageTitle: "Change password'"});
};

/** check presentPassword is correct and two password are same*/
export const postChangePassword = async(req, res) =>{ 
    const {
        session: {
            user: _id,
        },
        body: { presentPassword, newPassword, newPassword2 },
    } = req;
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(presentPassword, user.password);
    if (!ok) {
        res.status(400).render("users/change-password", {
            pageTitle:"changePassword",
            errorMessage: "The current password is incorrect",
        });
    }
    
    if (newPassword !== newPassword2) {
        res.status(400).render("users/change-password", {
            pageTitle:"changePassword",
            errorMessage: "The password does not match the confirmation",
        });
    }
    user.password = newPassword;
    await user.save();

    req.flash("info", "Password updated");

    return res.redirect("/users/logout");    
};

export const startGithubLogin = (req, res) => {
    console.log("startGithubLogin is running");
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };

    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    console.log("finishGithubLogin is running");
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();

    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await ( await fetch(finalUrl, {
        method:"POST",
        headers: {
            Accept: "application/json",
        },
    })).json();

    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com/user";
        const userData = await (await fetch(`${apiUrl}`, {
            headers: {
                Authorization: `token ${access_token}`,
        }}
        )
        ).json();
        const emailData = await ( 
            await fetch(`${apiUrl}/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                },
            })
        ).json();

        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true 
            );
            if (!emailObj) {
                return res.redirect("/login");
            }

            let user = await User.findOne({ email: emailObj.email});

            if(!user) {
                user = await User.create({
                    avatarUrl: userData.avatarUrl,
                    name : userData.name? userData.name : userData.login,
                    username: userData.login,
                    email: emailObj.email,
                    password: "",
                    socialOnly: true,
                    location: userData.location,
                });
            }

            req.session.loggedIn = true;
            req.session.user = user;

            return res.redirect("/");
          } else {
            return res.redirect("/login");
        }
    };


export const see = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate({
        path: "videos",
        populate: {
            path: "owner",
            mode: "User",
        },
    });
    if (!user) {
        return res.status(404).render("404", {pageTitle: "User not found"});
    }
    return res.render("users/profile", {
        pageTitle: user.name,
        user,
    });
};



export const getProfile = async (req, res) =>{
    const { id } = req.params; // get access by .:id

    //check user exists
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).render("404", {pageTitle: "User not found"});
    }
    return res.render("users/profile", {
        pageTitle: `${user.name}'s page`,
        user: user
    });
};