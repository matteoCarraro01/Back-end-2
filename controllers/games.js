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
            return res.status(400).json({ message: 'invalid game id' })
        }
        const game = await Game.findById(id)
        if (!game) {
            return res.status(404).json({
                message: 'not found'
            });
        }
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

export async function createPost(req, res) {
    try {

        console.log(req.authUser)
        const { title, price, image, description, genre } =
            req.body
        const game = new Game({ title, price, image, description, genre });
        const newgame = await game.save();


        res.status(201).json(newgame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export async function remove(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid game id' })
        }


        const deletedgame = await Game.findByIdAndDelete(id)


        if (!deletedgame) {
            return res.status(404).json({ message: 'game not found' })
        }
        res.status(200).json({ message: 'game deleted' })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function update(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid game id' })
        }
        const { title, price, image, description, genre } =
            req.body
        const updatedGame = await Game.findByIdAndUpdate(id, { title, price, image, description, genre }, { returnDocument: 'after' }
        )

        if (!updatedGame) {
            return res.status(404).json({
                message: 'Game not found'
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
            return res.status(400).json({ message: 'invalid game id' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Invalid file' });
        }
        const game = await Game.findByIdAndUpdate(id, { cover: req.file.path }, {
            returnDocument: 'after'
        })
        if (!game) {
            return res.status(404).json({
                message: 'Game not found'
            })
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};