import { Router } from "express";
import { LikeAndCommentController } from "../controllers/likeandcommentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Like, Comment, and Share Routes
router.post("/:id/like", authMiddleware, LikeAndCommentController.likePost); // Like a post
router.post("/:id/comment", authMiddleware, LikeAndCommentController.addComment); // Add a comment to a post
router.post("/:id/share", authMiddleware, LikeAndCommentController.sharePost); // Share a post

export default router;
