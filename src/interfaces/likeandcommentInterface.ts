import mongoose from "mongoose";

// User Interface
export interface IUser extends mongoose.Document {
  email: string; // User's email address (used for login)
  password: string; // User's hashed password
  firstName: string; // User's first name
  lastName: string; // User's last name
}

// Comment Interface
export interface IComment {
  userId: string; // ID of the user who made the comment
  content: string; // The comment's content
  createdAt: Date; // Timestamp when the comment was created
  updatedAt?: Date; // Optional timestamp if the comment was edited
}

// Share Interface
export interface IShare {
  sharedBy: string; // ID of the user who shared the post
  sharedTo: string | string[]; // ID of the user(s) or group the post was shared with
  sharedAt: Date; // Timestamp when the post was shared
  targetType: "user" | "group"; // Indicates if the share was to a user or a group
}

// Post Interface
export interface IPost extends mongoose.Document {
  _id: string; // Unique identifier for the post
  userId: string; // Reference to the user who created the post
  content: {
    type: "image" | "video" | "text"; // Type of the content
    data: string; // Content data (URL for image/video or text for a text post)
    description?: string; // Optional description for the content
  };
  likes: string[]; // Array of user IDs who liked the post
  comments: IComment[]; // Array of comments on the post
  shares: IShare[]; // Array of share records
  createdAt?: Date; // Timestamp for when the post was created
  updatedAt?: Date; // Timestamp for when the post was last updated
  tags?: string[]; // Optional tags for categorizing the post
}
