import { Request, Response } from "express";
import { Post } from "../models/post";

export class LikeAndCommentController {
  /**
   * Like a post
   */
  public static async likePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const userId = req.body.userId;  // Assuming the userId is sent in the request body

      // Find the post by _id and update the likes array (instead of a like count)
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },  // Add userId to likes array (avoid duplicates)
        { new: true }
      );

      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.json({ message: "Post liked successfully", post: updatedPost });
    } catch (error: any) {
      console.error("Error liking post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  /**
   * Add a comment to a post
   */
  public static async addComment(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const { comment, userId } = req.body;  // Extract userId and comment from the body

      // Validate comment
      if (!comment || typeof comment !== 'string') {
        res.status(400).json({ message: "Comment is required" });
        return;
      }

      // Find and update the post by _id and add the comment to the comments array
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: { user_id: userId, text: comment, createdAt: new Date() } } },
        { new: true }
      );

      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.json({ message: "Comment added successfully", post: updatedPost });
    } catch (error: any) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  /**
   * Share a post
   */
  public static async sharePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const { sharedBy, sharedTo, targetType, message } = req.body;

      // Validate share data
      if (!sharedBy || !sharedTo || !targetType) {
        res.status(400).json({ message: "Invalid share data" });
        return;
      }

      // Add share to the post (store who shared, when, and with whom)
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            shares: {
              user_id: sharedBy,
              sharedTo,
              targetType,
              message,
              sharedAt: new Date(),
            },
          },
        },
        { new: true }
      );

      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.json({ message: "Post shared successfully", post: updatedPost });
    } catch (error: any) {
      console.error("Error sharing post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
