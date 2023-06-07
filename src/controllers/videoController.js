
import Video from "../models/Video"

//for RootRouter

/**render home */
export const getHome = async (req, res)=> {
    console.log("get Home is running");
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", {pageTitle:"Home", videos: videos});
};

/**handle get search and render search*/
export const search = async (req,res)=> {
    const {keyword} = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "i"),
            },

        }).populate("owner")
    }
    return res.render("search", {pageTitle:"Search", videos: videos});
};


//for videoRouter