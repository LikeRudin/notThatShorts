
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
    console.log("search is running");
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
    console.log("getVideoEdit is running");
    const videoId = req.params.id;
    const userId = req.session.user._id;

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
    console.log("postVideoEdit is running");
    const videoId = req.params.id;
    const userId = req.session.user._id;

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

    res.redirect(`/videos/${videoId}`);
};

export const getUploadVideo = (req, res) => {
    console.log("getUploadVideo is running");
    return res.render("upload", { pageTitle: "Upload Video"})

};
export const postUploadVideo = async (req, res) => {
    console.log("postUploadVideo is running");
    const { video, thumb} = req.files;
    const { title, description, hashtags } = req.body;
    const userId = req.session.user._id;

    console.log(`this is video path: ${video[0].path}`);

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
    console.log("deleteVideo is running");
    const videoId = req.params.id;
    const userId = req.session.user._id;
    
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
    console.log("watchVideo is running");
    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate("owner").populate("comments");

    if (!video) {
        return res.render("404", {pageTitle: "Video not found"})
    }
    return res.render("video-page", { pageTitle: `${video.title}`, video: video });

};



//for api Router

export const registerView = async (req,res) => {
    console.log("registerView is running");

    const videoId = req.params.id;
    const video = await Video.findById(videoId);

    if(!video){
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    try{ await video.save();
    return res.sendStatus(200);
    }
    catch (error) {
        console.log("upload meta is failed");
        return res.sendStatus(400);
    }
};

export const uploadComment = async (req,res) =>{
    console.log("uploadComment is running");
    const userId = req.session.user._id;
    const text = req.body.text;
    const videoId = req.params.id;

    const video = await Video.findById(videoId);
    if (!video) {
        return res.sendStatus(404);
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.sendStatus(404);
    }

    const comment = await Comment.create({
        text: text,
        owner: userId,
        video: videoId,
    });
    video.comments.push(comment._id);
    await video.save();
    
    user.comments.push(comment._id);
    await user.save();

    return res.status(201).json( {newCommentId: comment._id} );

};

export const deleteComment = async (req, res) =>{
    console.log("deleteComment is running");
    const userId = req.session.user._id;
    const commentId = req.body.commentId;
    const videoId = req.params.id;
    
    const video = await Video.findById(videoId);
    if (!video) {
        console.log("delete comment failed, video not found");
        return res.sendStatus(404);
      }
    video.comments = video.comments.filter((id) => id !== commentId);
    await video.save();

    const user = await User.findById(userId);
      
    if (!user) {
        console.log("delete comment failed, user not found");
        return res.sendStatus(404);
    }
    user.comments = user.comments.filter((id) => id!== commentId);
    await user.save();

    try{
        await Comment.findByIdAndDelete(commentId);
        return res.sendStatus(200);
    }
    catch (error) {
        console.log("delete comment failed, Comment not found");
        return res.sendStatus(400);
    }


};