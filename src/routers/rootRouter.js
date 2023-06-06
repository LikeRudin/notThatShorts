import express from "express";
import { protectorMiddleware } from "../middlewares";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";
import { getHome, search } from "../controllers/videoController";

const rootRouter = express.Router();


rootRouter.get("/", getHome);
rootRouter.get("/search", search);

rootRouter
    .route("/login")
    .all(protectorMiddleware)
    .get("/login", getLogin)
    .post("/login", postLogin);

rootRouter
    .route("/join")
    .all(protectorMiddleware)
    .get("/join", getJoin)
    .post("/join", postJoin);


export default rootRouter;