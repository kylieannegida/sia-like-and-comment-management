import { Request, Response } from "express";
import { Post } from "../models/post";
import mongoose from "mongoose";

class AuthController {
  /**
   * Like a post
   */
  async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Validate the post ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      // Increment the like count
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post liked successfully", post: updatedPost });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  /**
   * Add a comment to a post
   */
  async addComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId, content } = req.body;

      // Validate the post ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      // Add the comment to the post
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $push: { comments: { userId, content, createdAt: new Date() } } },
        { new: true, runValidators: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Comment added successfully", post: updatedPost });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  /**
   * Share a post
   */
  async sharePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { sharedBy, sharedTo, targetType, message } = req.body;

      // Validate the post ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Simulate sharing logic (e.g., record the sharing details somewhere)
      const sharedData = {
        sharedBy,
        sharedTo,
        targetType,
        message,
        sharedAt: new Date(),
      };

      // Optionally, save the shared details to the database or log
      console.log("Post shared:", sharedData);

      res.json({ message: "Post shared successfully", post, sharedData });
    } catch (error) {
      console.error("Error sharing post:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}

export default new AuthController();
