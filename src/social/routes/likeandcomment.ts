import { Router } from "express";
import { LikeAndCommentController } from "../controllers/likeandcommentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post endpoints for liking, commenting, and sharing
 */

/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     summary: Like a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post liked successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/posts/{id}/comment:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - userId
 *               - content
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/posts/{id}/share:
 *   post:
 *     summary: Share a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sharedBy:
 *                 type: string
 *               sharedTo:
 *                 type: array
 *                 items:
 *                   type: string
 *               targetType:
 *                 type: string
 *                 enum: [user, group]
 *               message:
 *                 type: string
 *             required:
 *               - sharedBy
 *               - sharedTo
 *               - targetType
 *     responses:
 *       200:
 *         description: Post shared successfully
 *       404:
 *         description: Post not found
 */

router.post("/:id/like", authMiddleware, LikeAndCommentController.likePost);
router.post("/:id/comment", authMiddleware, LikeAndCommentController.addComment);
router.post("/:id/share", authMiddleware, LikeAndCommentController.sharePost);

export default router;

