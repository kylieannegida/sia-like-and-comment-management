import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  id: string;  // Custom ID field (String)
  content: string;
  likes: number;
  comments: { userId: string; content: string }[];
  sharedBy: string;
  sharedTo: string[];
  targetType: string;
}

const postSchema = new Schema<IPost>({
  id: { type: String, required: true, unique: true },  // Define the custom 'id' field
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      userId: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  sharedBy: { type: String },
  sharedTo: [{ type: String }],
  targetType: { type: String, enum: ["user", "group"] },
});

// Create the Post model
export const Post = mongoose.model<IPost>("Post", postSchema);
