import express from "express";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";
import { finishGithubLogin, getChangePassword, getEdit, postChangePassword, postEdit, startGithubLogin, logout, getProfile } from "../controllers/userController";

const userRouter = express.Router();

userRouter
    .get("/logout", protectorMiddleware, logout);

userRouter
    .route("/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(avatarUpload.single("avatar"), postEdit);

userRouter
    .route("/change-password")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);



userRouter
    .get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter
    .get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter.get("/:id", getProfile);

export default userRouter;