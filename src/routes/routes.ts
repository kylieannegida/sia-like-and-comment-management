import { Router } from "express";
import postRoutes from "./likeandcommentRoutes";

const router = Router();

// Post Management Routes
router.use("/api/posts", postRoutes);

export default router;
