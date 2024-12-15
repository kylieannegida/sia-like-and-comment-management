import Joi from "joi";

const postValidationSchema = Joi.object({
  user_id: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),

  content: Joi.object({
    type: Joi.string()
      .valid("image", "video", "text")
      .required()
      .messages({
        "any.only": "Content type must be one of 'image', 'video', or 'text'",
        "any.required": "Content type is required",
      }),
    data: Joi.string().required().messages({
      "any.required": "Content data is required",
    }),
  }).required().messages({
    "any.required": "Content is required",
  }),

  likes: Joi.number().integer().min(0).default(0).messages({
    "number.base": "Likes must be a number",
    "number.min": "Likes cannot be negative",
  }),

  comments: Joi.array()
    .items(
      Joi.object({
        user_id: Joi.string().required().messages({
          "any.required": "Comment user ID is required",
        }),
        text: Joi.string().required().messages({
          "any.required": "Comment text is required",
        }),
        createdAt: Joi.date().iso().required().messages({
          "any.required": "Comment creation date is required",
        }),
      })
    )
    .default([]).messages({
      "array.base": "Comments must be an array",
    }),

  shares: Joi.number().integer().min(0).default(0).messages({
    "number.base": "Shares must be a number",
    "number.min": "Shares cannot be negative",
  }),
});

export const validatePost = (postData: any) => {
  return postValidationSchema.validate(postData, { abortEarly: false });
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - user_id
 *         - email
 *         - password
 *         - content
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID of the user creating the post
 *           example: "507f1f77bcf86cd799439011"
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user creating the post
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user creating the post
 *           example: "securepassword123"
 *         content:
 *           type: object
 *           required:
 *             - type
 *             - data
 *           properties:
 *             type:
 *               type: string
 *               enum: [image, video, text]
 *               description: Type of the content
 *               example: "text"
 *             data:
 *               type: string
 *               description: Actual content data (e.g., text, URL for media)
 *               example: "This is a sample post."
 *         likes:
 *           type: integer
 *           description: Number of likes on the post
 *           example: 25
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user commenting
 *                 example: "507f1f77bcf86cd799439011"
 *               text:
 *                 type: string
 *                 description: Comment text
 *                 example: "Nice post!"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp of the comment
 *                 example: "2024-12-12T12:34:56Z"
 *         shares:
 *           type: integer
 *           description: Number of times the post has been shared
 *           example: 10
 */

