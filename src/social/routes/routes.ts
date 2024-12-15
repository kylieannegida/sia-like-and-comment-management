import { Router } from "express";
import likeAndCommentRoutes from "./likeandcomment";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use("/posts", authMiddleware, likeAndCommentRoutes);

export default router;

