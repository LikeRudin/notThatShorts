import express from "express";
import { protectorMiddleware } from "../middlewares";
import { deleteComment, registerView, uploadComment } from "../controllers/videoController";


const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", protectorMiddleware, uploadComment);
apiRouter.delete("/videos/:id([0-9a-f]{24})/comment/delete", protectorMiddleware, deleteComment);


export default apiRouter;