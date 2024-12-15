import { Request, Response } from "express";
import { Post } from "../models/post";
import { validatePost } from "../validation/likeandcommentValidation";
import logging from "../config/logging";
import { CustomError } from "../utils/CustomError";

export class LikeAndCommentController {
  public static async likePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const userId = req.userId!;

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
      );

      if (!updatedPost) {
        throw new CustomError("Post not found", 404);
      }

      res.json({ message: "Post liked successfully", post: updatedPost });
    } catch (error) {
      logging.error("Error liking post:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  public static async addComment(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const { content } = req.body;
      const userId = req.userId!;

      const { error } = validatePost({ content });
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { 
          $push: { 
            comments: { 
              userId, 
              content, 
              createdAt: new Date() 
            } 
          } 
        },
        { new: true }
      );

      if (!updatedPost) {
        throw new CustomError("Post not found", 404);
      }

      res.json({ message: "Comment added successfully", post: updatedPost });
    } catch (error) {
      logging.error("Error adding comment:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  public static async sharePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const { sharedTo, targetType } = req.body;
      const sharedBy = req.userId!;

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { 
          $push: { 
            shares: { 
              sharedBy, 
              sharedTo, 
              targetType, 
              sharedAt: new Date() 
            } 
          } 
        },
        { new: true }
      );

      if (!updatedPost) {
        throw new CustomError("Post not found", 404);
      }

      res.json({ message: "Post shared successfully", post: updatedPost });
    } catch (error) {
      logging.error("Error sharing post:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

