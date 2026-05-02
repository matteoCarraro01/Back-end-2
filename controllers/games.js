import mongoose from "mongoose";
import Game from "../models/Games.js";



export async function findAll(req, res) {
    try {
        const { page, limit } = req.query;
        const gamesQuery = Game.find();
        if (page && limit) {
            gamesQuery.skip((page - 1) * limit).limit(limit);
        }
        const posts = await gamesQuery;
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export async function findById(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid blog post id' })
        }
        const Game = await Game.findById(id)
        if (!Game) {
            return res.status(404).json({
                message: 'not found'
            });
        }
        res.status(200).json(Game)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

export async function createPost(req, res) {
    try {
        const { category, title, cover, readTime, author, content } =
            req.body
        const Game = new Game({ category, title, cover, readTime, author, content });
        const newGame = await Game.save();

        // const newPost = new Game(req.body) (sconsigliato per via della poca sicurezza informatica);
        // const saved = await newPost.save();

        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export async function remove(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid blog post id' })
        }


        const deletedGame = await Game.findByIdAndDelete(id)


        if (!deletedGame) {
            return res.status(404).json({ message: 'blog post non trovato' })
        }
        res.status(200).json({ message: 'blog post cancellato correttamente' })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function update(req, res) {
    try {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid blog post id' })
        }
        const { category, title, cover, readTime, author, content } =
            req.body
        const updatedGame = await Game.findByIdUpdate(id, { category, title, cover, readTime, author, content }, { returnDocument: 'after' }
        )

        if (!updatedGame) {
            return res.status(404).json({
                message: 'blog post not found'
            })
        }
        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export async function uploadGameAvatar(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid Game id' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Invalid file' });
        }
        const Game = await Game.findByIdAndUpdate(id, { cover: req.file.path }, {
            returnDocument: 'after'
        })
        if (!Game) {
            return res.status(404).json({
                message: 'blog post not found'
            })
        }
        res.status(200).json(Game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};