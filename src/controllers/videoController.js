
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

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



/**
 * videoid : req.params
 * userid: req.session
 * 
 * etc: req.body
 */


export const getVideoEdit = async (req, res) => {
    const videoId = req.params.id;
    const userId = req.session.user.id;

    const video = await Video.findById(videoId);
    
    if (!video) {
        return res.status(404).render("404", {pageTitle: 'video not found'});
    }

    if ( String(video.owner) !== String(userId)) {
        req.flash("error", "authorized video owner only");
        return res.status(403).redirect("/")
    }

    return res.render("edit-video", { 
        pageTitle: `Edit ${video.title}`,
        video: video,
        });
};

export const postVideoEdit = async (req, res) => {
    const videoId = req.params.id;
    const userId = req.session.user.id;

    const { title, description, hashtags} = req.body;

    const video = await Video.findById(videoId);
    
    if (!video) {
        return res.status(404).render("404", {pageTitle: 'video not found'});
    }

    if ( String(video.owner) !== String(userId)) {
        req.flash("error", "authorized for only video uploader");
        return res.status(403).redirect("/");
    }

    await Video.findByIdAndUpdate(videoId, {
        title,
        description,
        hashtags,
    });

    req.flash("success", "successfully updated video data");

    res.redirect(`/videos${videoId}`);
};

export const getUploadVideo = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video"})

};
export const postUploadVideo = async (req, res) => {
    const { video, thumb} = req.files;
    const { title, description, hashtags } = req.body;
    const userId = req.session.user.id;

    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: video[0].path,
            thumbUrl: thumb[0].path,
            hashtags: Video.formatHashtags(hashtags),
            owner: userId,
        });
        const user = await User.findById(userId);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    }   catch (error) {
        console.log(error);

        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message
        });
    }
};

export const deleteVideo = async (req, res) => {
    const videoId = req.params.id;
    const userId = req.session.user.id;
    
    const video = await Video.findById(videoId);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found" });
    }
    if (String(video.owner) !== String(userId)) {
        return res.status(404).redirect("/");
    }
    try {await Video.findByIdAndDelete(videoId);
        req.flash("success", "Video is succefully deleted");
        return res.redirect("/");
    }
    catch (error) {
        req.flash("error", "video is not deleted");
        return res.redirect("/");
    }

};

export const watchVideo = async (req, res) => {
    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate("owner").populate("comments");

    if (!video) {
        return res.render("404", {pageTitle: "Video not found"})
    }
    return res.render("video-page", { pageTitle: `${video.title}`, video: video });

};



