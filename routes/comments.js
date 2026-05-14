import express from "express";
import { getReviews, createReview, deleteReview } from "../controllers/comments.js";

const router = express.Router();

router.get("/games/:gameId/reviews", getReviews);
router.post("/games/:gameId/reviews", createReview);
router.delete("/games/:gameId/reviews/:reviewId", deleteReview);





export default router;













