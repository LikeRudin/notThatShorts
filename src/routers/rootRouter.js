import express from "express";
import { publicOnlyMiddleware } from "../middlewares";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";
import { getHome, search } from "../controllers/videoController";

const rootRouter = express.Router();


rootRouter.get("/", getHome);
rootRouter.get("/search", search);

rootRouter.route("/login")
    .all(publicOnlyMiddleware)
    .get(getLogin)
    .post(postLogin);

rootRouter.route("/join")
    .all(publicOnlyMiddleware)
    .get(getJoin)
    .post(postJoin);


export default rootRouter;