import Game from "../models/Games.js";
import mongoose from "mongoose";


export async function findAll(req, res) {
    try {
        const { GameId } = req.params;
        console.log(req.params)
        if (!mongoose.Types.ObjectId.isValid(GameId)) {
            return res.status(400).json({ message: 'invalid Game id' })
        }
        const post = await Game.findById(GameId);
        if (!post) {
            return res.status(404).json({
                message: 'Game not found'
            })
        }
        res.status(200).json(post.comments);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function findById(req, res) {
    try {
        const { GameId, id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(GameId)) {
            return res.status(400).json({ message: 'invalid Game id' })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid comment id' })
        }
        const Game = await Game.findById(GameId);
        if (!Game) {
            return res.status(404).json({
                message: 'Game not found'
            })
        }
        const comment = Game.comments.id(id);
        if (!comment) {
            return res.status(404).json({
                message: 'comment not found'
            })
        };
        res.status(200).json(comment);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getCancel(req, res) {
    try {
        const { GameId, id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(GameId)) {
            return res.status(400).json({ message: 'invalid Game id' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid comment id' });
        }

        const Game = await Game.findById(GameId);
        if (!Game) {
            return res.status(404).json({
                message: 'Game not found'
            });
        }
        const comment = Game.comments.id(id);
        if (!comment) {
            return res.status(404).json({
                message: 'comment not found'
            })
        };
        comment.deleteOne();
        await Game.save();
        res.status(200).json({ message: 'comment deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function create(req, res) {
    try {
        const { GameId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(GameId)) {
            return res.status(400).json({ message: 'invalid Game id' })
        }
        const { text, author } = req.body;
        const post = await Game.findById(GameId);
        if (!post) {
            return res.status(404).json({ message: 'Game not found' });
        }
        post.comments.push({
            text,
            author
        })
        await post.save();
        res.status(201).json(post.comments[post.comments.length - 1]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function update(req, res) {
    try {
        const { GameId, id } = req.params;
        const { text, author } = req.body;
        if (!mongoose.Types.ObjectId.isValid(GameId)) {
            return res.status(400).json({ message: 'invalid Game id' });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid comment id' });
        };
        const Game = await Game.findById(GameId);
        if (!Game) return res.status(404).json({
            message: 'Game not found'
        });
        const comment = Game.comments.id(id);
        if (!comment) {
            return res.status(404).json({
                message: 'comment not found'
            })
        };
        comment.text = text;
        comment.author = author;
        await Game.save();
        res.status(200).json(comment);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}