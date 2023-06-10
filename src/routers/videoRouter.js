import express from "express";
import { protectorMiddleware, videoUpload } from "../middlewares";

import { getVideoEdit, postVideoEdit, watchVideo, getUploadVideo, postUploadVideo, deleteVideo } from"../controllers/videoController";


const videoRouter = express.Router();

//upload, edit, delete

// "/:id([0-9a-f]{24})"
videoRouter.get("/:id([0-9a-f]{24})", watchVideo);

videoRouter
    .route("/:id([0-9a-f]{24})/edit")
    .all(protectorMiddleware)
    .get(getVideoEdit)
    .post(postVideoEdit);

videoRouter
    .route("/:id([0-9a-f]{24})/delete")
    .all(protectorMiddleware)
    .get(deleteVideo);

videoRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(getUploadVideo)
    .post(videoUpload.fields([ {name: "video"}, { name:"thumb"} ]), postUploadVideo);


export default videoRouter;