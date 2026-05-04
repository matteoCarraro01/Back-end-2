import Game from "../models/Games.js";
import mongoose from "mongoose";


export async function getReviews(req, res) {
    try {
        const { gameId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            return res.status(400).json({ message: "Invalid game id" });
        }

        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: "game not found" });
        }

        res.status(200).json(game.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function createReview(req, res) {
    try {
        const { gameId } = req.params;


        console.log("BODY:", req.body);
        const { text, username, rating } = req.body;

        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: "game not found" });
        }



        const newReview = {
            text,
            username,
            rating: Number(rating),
        };

        console.log("NEW REVIEW", newReview);

        game.comments.push(newReview);
        await game.save();

        res.status(201).json(game);
    } catch (error) {
        console.log("ERROR:", error)
        res.status(500).json({ message: error.message });
    }
}


export async function deleteReview(req, res) {
    try {
        const { gameId, reviewId } = req.params;

        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: "game not found" });
        }

        const review = game.comments.id(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        review.deleteOne();
        await game.save();

        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}